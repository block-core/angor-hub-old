import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, toArray, filter } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { IndexerService } from './indexer.service';

export interface Project {
    founderKey: string;
    nostrPubKey: string;
    projectIdentifier: string;
    createdOnBlock: number;
    trxId: string;
    totalInvestmentsCount: number;
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

    // BehaviorSubjects for managing project data and loading status
    private projectsSubject = new BehaviorSubject<Project[]>([]);
    public projects$: Observable<Project[]> = this.projectsSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$: Observable<boolean> = this.loadingSubject.asObservable();

    private noMoreProjectsSubject = new BehaviorSubject<boolean>(false);
    public noMoreProjects$: Observable<boolean> = this.noMoreProjectsSubject.asObservable();

    // BehaviorSubject to store project statistics
    private projectStatsSubject = new BehaviorSubject<{ [key: string]: ProjectStats }>({});
    public projectStats$: Observable<{ [key: string]: ProjectStats }> = this.projectStatsSubject.asObservable();

    constructor(
        private http: HttpClient,
        private indexerService: IndexerService,
        private storageService: StorageService
    ) {
        this.loadNetwork();
    }

    // Load network type from indexerService (mainnet/testnet)
    loadNetwork() {
        this.selectedNetwork = this.indexerService.getNetwork();
        console.log('Selected network:', this.selectedNetwork); // Log the selected network
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
                console.log('Received project data from API:', response.body);
                if (!this.totalProjectsFetched && response && response.headers) {
                    const paginationTotal = response.headers.get('pagination-total');
                    this.totalProjects = paginationTotal ? +paginationTotal : 0;
                    this.totalProjectsFetched = true;
                    this.offset = Math.max(this.totalProjects - this.limit, 0);
                    console.log('Total projects available:', this.totalProjects);
                }
            }),
            map((response) => response.body || []),
            // Filter out duplicate projects
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

                // Save new projects to storage
                const saveProjects$ = from(uniqueNewProjects).pipe(
                    mergeMap(project => from(this.storageService.saveProject(project))),
                    toArray()
                );

                // Load additional stats for each project
                const projectDetails$ = from(uniqueNewProjects).pipe(
                    mergeMap(project =>
                        from(this.storageService.getProjectStats(project.projectIdentifier)).pipe(
                            map((projectStats: ProjectStats) => {
                                project.totalInvestmentsCount = projectStats?.investorCount ?? 0;

                                // Update project stats subject
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
                        this.offset = Math.max(this.offset - this.limit, 0);
                        console.log('Updated projects list:', updatedProjectList);
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
                console.log('Fetched stats for project:', projectIdentifier, stats);
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
        console.log('Projects and states have been reset.');
    }
}
