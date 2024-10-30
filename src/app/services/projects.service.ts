import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, toArray, filter } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { IndexerService } from './indexer.service';
import { SubscriptionService } from './subscription.service';

export interface Project {
    founderKey: string;
    nostrPubKey: string;
    projectIdentifier: string;
    createdOnBlock: number;
    trxId: string;
    totalInvestmentsCount: number;
    isBookmarked: boolean
}

export interface ProjectStats {
    investorCount: number;
    amountInvested: number;
    amountSpentSoFarByFounder: number;
    amountInPenalties: number;
    countInPenalties: number;
}

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    private offset = 0;
    private limit = 50;
    private totalProjects = 0;
    private loading = false;
    private noMoreProjects = false;
    private totalProjectsFetched = false;
    private selectedNetwork: 'mainnet' | 'testnet' = 'testnet';

    // BehaviorSubjects to manage state and updates
    private projectsSubject = new BehaviorSubject<Project[]>([]);
    public projects$: Observable<Project[]> = this.projectsSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$: Observable<boolean> = this.loadingSubject.asObservable();

    private noMoreProjectsSubject = new BehaviorSubject<boolean>(false);
    public noMoreProjects$: Observable<boolean> = this.noMoreProjectsSubject.asObservable();

    private projectStatsSubject = new BehaviorSubject<{ [key: string]: ProjectStats }>({});
    public projectStats$: Observable<{ [key: string]: ProjectStats }> = this.projectStatsSubject.asObservable();

    constructor(
        private http: HttpClient,
        private indexerService: IndexerService,
        private storageService: StorageService,
        private subscriptionService: SubscriptionService // Adding subscription service
    ) {
        this.loadNetwork();
    }

    // Load network type from indexerService (mainnet/testnet)
    loadNetwork() {
        this.selectedNetwork = this.indexerService.getNetwork();
        console.log('Selected network:', this.selectedNetwork);
    }

    // Fetch projects from the API and update the BehaviorSubject
    fetchProjects(): Observable<Project[]> {
        if (this.loading || this.noMoreProjects) {
            console.log('Skipping fetch: Already loading or no more projects.');
            return of([]);
        }

        this.loadingSubject.next(true);
        const indexerUrl = this.indexerService.getPrimaryIndexer(this.selectedNetwork);
        const url = this.totalProjectsFetched
            ? `${indexerUrl}api/query/Angor/projects?offset=${this.offset}&limit=${this.limit}`
            : `${indexerUrl}api/query/Angor/projects?limit=${this.limit}`;

        return this.http.get<Project[]>(url, { observe: 'response' }).pipe(
            tap((response) => {
                if (!this.totalProjectsFetched && response && response.headers) {
                    const paginationTotal = response.headers.get('pagination-total');
                    this.totalProjects = paginationTotal ? +paginationTotal : 0;
                    this.totalProjectsFetched = true;
                    this.offset = Math.max(this.totalProjects - this.limit, 0);
                }
            }),
            map((response) => response.body || []),
            mergeMap((newProjects) => from(newProjects).pipe(
                filter(newProject =>
                    !this.projectsSubject.value.some(
                        (existingProject) =>
                            existingProject.projectIdentifier === newProject.projectIdentifier
                    )
                ),
                toArray()
            )),
            switchMap((uniqueNewProjects) => {
                if (!uniqueNewProjects.length) {
                    this.noMoreProjectsSubject.next(true);
                    return of([]);
                }

                const saveProjects$ = from(uniqueNewProjects).pipe(
                    mergeMap(project => from(this.storageService.saveProject(project))),
                    toArray()
                );

                const projectDetails$ = from(uniqueNewProjects).pipe(
                    mergeMap(project =>
                        from(this.storageService.getProjectStats(project.projectIdentifier)).pipe(
                            map((projectStats: ProjectStats) => {
                                project.totalInvestmentsCount = projectStats?.investorCount ?? 0;

                                const currentStats = this.projectStatsSubject.value;
                                this.projectStatsSubject.next({
                                    ...currentStats,
                                    [project.projectIdentifier]: projectStats
                                });

                                return project;
                            }),
                            catchError(error => {
                                console.error(`Error fetching details for project ${project.projectIdentifier}:`, error);
                                return of(project);
                            })
                        )
                    ),
                    toArray()
                );

                return saveProjects$.pipe(
                    switchMap(() => projectDetails$),
                    map((updatedProjects) => {
                        const updatedProjectList = [...this.projectsSubject.value, ...uniqueNewProjects];
                        this.projectsSubject.next(updatedProjectList);

                        this.subscribeToProjectsMetadata(uniqueNewProjects.map(proj => proj.nostrPubKey));

                        this.offset = Math.max(this.offset - this.limit, 0);
                        return updatedProjects;
                    })
                );
            }),
            catchError((error) => {
                console.error('Error fetching projects:', error);
                return of([]);
            }),
            tap(() => this.loadingSubject.next(false))
        );
    }

    // Subscribe to metadata for all nostrPubKeys
    private subscribeToProjectsMetadata(pubKeys: string[]): void {
        const metadataFilter = { kinds: [0], authors: pubKeys };
        this.subscriptionService.addSubscriptions([metadataFilter], (event) => {
            const metadata = this.parseMetadataEvent(event);
            this.storageService.saveProfile(event.pubkey, metadata); // Save each metadata in database
        });
    }

    // Example: Parsing metadata event from Nostr
    private parseMetadataEvent(event: any): any {
        try {
            return JSON.parse(event.content);
        } catch (e) {
            console.error('Error parsing metadata event:', e);
            return {};
        }
    }

    // Fetch project stats and save them to storage
    fetchProjectStats(projectIdentifier: string): Observable<ProjectStats> {
        const indexerUrl = this.indexerService.getPrimaryIndexer(this.selectedNetwork);
        const url = `${indexerUrl}api/query/Angor/projects/${projectIdentifier}/stats`;
        return this.http.get<ProjectStats>(url).pipe(
            tap((stats) => {
                const currentStats = this.projectStatsSubject.value;
                this.projectStatsSubject.next({
                    ...currentStats,
                    [projectIdentifier]: stats
                });
            }),
            catchError((error) => {
                console.error(`Error fetching stats for project ${projectIdentifier}:`, error);
                return of({} as ProjectStats);
            })
        );
    }

    // Fetch project details by projectIdentifier
    fetchProjectDetails(projectIdentifier: string): Observable<Project> {
        const indexerUrl = this.indexerService.getPrimaryIndexer(this.selectedNetwork);
        const url = `${indexerUrl}api/query/Angor/projects/${projectIdentifier}`;
        return this.http.get<Project>(url).pipe(
            catchError((error) => {
                console.error(`Error fetching details for project ${projectIdentifier}:`, error);
                return of({} as Project);
            })
        );
    }

    // Reset all project data
    resetProjects(): void {
        this.projectsSubject.next([]);
        this.noMoreProjectsSubject.next(false);
        this.loadingSubject.next(false);
        this.projectStatsSubject.next({});
        this.offset = 0;
        this.totalProjectsFetched = false;
    }
}
