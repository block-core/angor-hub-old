import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, toArray, filter, retry, shareReplay } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { IndexerService } from './indexer.service';
import { SubscriptionService } from './subscription.service';
import { Project, ProjectDetails, ProjectStatistics } from 'app/interface/project.interface';


@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    private readonly INITIAL_OFFSET = 0;
    private readonly LIMIT = 50;
    private offset = this.INITIAL_OFFSET;
    private totalProjects = 0;
    private totalProjectsFetched = false;

    private projectsSubject = new BehaviorSubject<Project[]>([]);

    public projects$ = this.projectsSubject.asObservable().pipe(shareReplay(1));

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private noMoreProjectsSubject = new BehaviorSubject<boolean>(false);
    public noMoreProjects$ = this.noMoreProjectsSubject.asObservable();

    private projectStatsSubject = new BehaviorSubject<Record<string, ProjectStatistics>>({});
    public projectStats$ = this.projectStatsSubject.asObservable().pipe(shareReplay(1));

    private selectedNetwork: 'mainnet' | 'testnet';

    constructor(
        private http: HttpClient,
        private indexerService: IndexerService,
        private storageService: StorageService,
        private subscriptionService: SubscriptionService
    ) {
        this.selectedNetwork = this.indexerService.getNetwork();
        console.log('Selected network:', this.selectedNetwork);
    }

    fetchProjects(): Observable<Project[]> {
        if (this.loadingSubject.value || this.noMoreProjectsSubject.value) {
            console.log('Skipping fetch: Already loading or no more projects.');
            return of([]);
        }

        this.loadingSubject.next(true);
        const indexerUrl = this.indexerService.getPrimaryIndexer(this.selectedNetwork);
        const url = `${indexerUrl}api/query/Angor/projects?${this.totalProjectsFetched ? `offset=${this.offset}&` : ''}limit=${this.LIMIT}`;

        return this.http.get<Project[]>(url, { observe: 'response' }).pipe(
            retry(3),
            tap(response => this.handlePaginationResponse(response)),
            map(response => response.body || []),
            mergeMap(this.filterUniqueProjects.bind(this)),
            switchMap(this.processNewProjects.bind(this)),
            catchError(this.handleError.bind(this)),
            tap(() => this.loadingSubject.next(false))
        );
    }

    private handlePaginationResponse(response: any): void {
        if (!this.totalProjectsFetched && response?.headers) {
            const paginationTotal = response.headers.get('pagination-total');
            this.totalProjects = paginationTotal ? +paginationTotal : 0;
            this.totalProjectsFetched = true;
            this.offset = Math.max(this.totalProjects - this.LIMIT, 0);
        }
    }

    private filterUniqueProjects(newProjects: Project[]): Observable<Project[]> {
        return from(newProjects).pipe(
            filter(newProject => !this.projectsSubject.value.some(
                existingProject => existingProject.projectIdentifier === newProject.projectIdentifier
            )),
            toArray()
        );
    }

    private processNewProjects(uniqueNewProjects: Project[]): Observable<Project[]> {
        if (!uniqueNewProjects.length) {
            this.noMoreProjectsSubject.next(true);
            return of([]);
        }

        const saveProjects$ = from(uniqueNewProjects).pipe(
            mergeMap(project => from(this.storageService.saveProject(project))),
            toArray()
        );

        const projectDetails$ = from(uniqueNewProjects).pipe(
            mergeMap(this.fetchProjectDetails.bind(this)),
            toArray()
        );

        return saveProjects$.pipe(
            switchMap(() => projectDetails$),
            tap(this.updateProjectsList.bind(this))
        );
    }

    private fetchProjectDetails(project: Project): Observable<Project> {
        return from(this.storageService.getProjectStats(project.projectIdentifier)).pipe(
            map((projectStats: ProjectStatistics) => {
                this.updateProjectStats(project.projectIdentifier, projectStats);
                return project;
            }),
            catchError(error => {
                console.error(`Error fetching details for project ${project.projectIdentifier}:`, error);
                return of(project);
            })
        );
    }

    private updateProjectsList(updatedProjects: Project[]): void {
        const updatedProjectList = [...this.projectsSubject.value, ...updatedProjects];
        this.projectsSubject.next(updatedProjectList);
        this.subscribeToProjectDetails(updatedProjects.map(proj => proj.nostrEventId));
        this.offset = Math.max(this.offset - this.LIMIT, 0);
    }

    private updateProjectStats(projectIdentifier: string, projectStats: ProjectStatistics): void {
        const currentStats = this.projectStatsSubject.value;
        this.projectStatsSubject.next({
            ...currentStats,
            [projectIdentifier]: projectStats
        });
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Error fetching projects:', error);
        this.loadingSubject.next(false);
        return throwError(() => new Error('Failed to fetch projects. Please try again later.'));
    }

    private subscribeToProjectsMetadata(pubKeys: string[]): void {
        const metadataFilter = { kinds: [0], authors: pubKeys };
        this.subscriptionService.addSubscriptions([metadataFilter], (event) => {
            const metadata = this.parseMetadataEvent(event);
            this.storageService.saveProfile(event.pubkey, metadata);
        });
    }

    private subscribeToProjectDetails(ids: string[]): void {
        const projectDetailsFilter = { kinds: [30078], ids: ids };

        this.subscriptionService.addSubscriptions([projectDetailsFilter], async (events) => {
            try {
                const eventArray = Array.isArray(events) ? events : [events];
                const nostrPubKeys: string[] = [];

                for (const event of eventArray) {
                    const projectDetails = this.parseMetadataEvent(event);

                    await this.storageService.saveProjectDetails(projectDetails);

                    if (projectDetails.nostrPubKey && !nostrPubKeys.includes(projectDetails.nostrPubKey)) {
                        nostrPubKeys.push(projectDetails.nostrPubKey);
                    }
                }

                if (nostrPubKeys.length > 0) {
                    this.subscribeToProjectsMetadata(nostrPubKeys);
                }
            } catch (error) {
                console.error('Error handling project details subscription:', error);
            }
        });
    }



    private parseMetadataEvent(event: any): any {
        try {
            return JSON.parse(event.content);
        } catch (e) {
            console.error('Error parsing metadata event:', e);
            return {};
        }
    }

    fetchProjectStats(projectIdentifier: string): Observable<ProjectStatistics> {
        const indexerUrl = this.indexerService.getPrimaryIndexer(this.selectedNetwork);
        const url = `${indexerUrl}api/query/Angor/projects/${projectIdentifier}/stats`;
        return this.http.get<ProjectStatistics>(url).pipe(
            tap(stats => this.updateProjectStats(projectIdentifier, stats)),
            catchError(error => {
                console.error(`Error fetching stats for project ${projectIdentifier}:`, error);
                return of({} as ProjectStatistics);
            })
        );
    }



    resetProjects(): void {
        this.projectsSubject.next([]);
        this.noMoreProjectsSubject.next(false);
        this.loadingSubject.next(false);
        this.projectStatsSubject.next({});
        this.offset = this.INITIAL_OFFSET;
        this.totalProjectsFetched = false;
    }
}
