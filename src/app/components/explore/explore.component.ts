import { AngorCardComponent } from '@angor/components/card';
import { AngorFindByKeyPipe } from '@angor/pipes/find-by-key';
import { CdkScrollable } from '@angular/cdk/scrolling';
import {
    CommonModule,
    I18nPluralPipe,
    NgClass,
    PercentPipe,
} from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    inject,
    signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
 import { StorageService } from 'app/services/storage.service';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
 import { BookmarkService } from 'app/services/bookmark.service';
import { Project, ProjectDetails, ProjectStatistics } from 'app/interface/project.interface';
import { ProjectsService } from 'app/services/projects.service';
import { CountdownTimerComponent } from '../../layout/common/countdown-timer/countdown-timer.component';
import { IndexerService } from 'app/services/indexer.service';

@Component({
    selector: 'explore',
    templateUrl: './explore.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        AngorCardComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatProgressBarModule,
        CommonModule,
        MatProgressSpinnerModule,
        CountdownTimerComponent,
    ]
})
export class ExploreComponent implements OnInit, OnDestroy {

    projectService = inject(ProjectsService);
    storageService = inject(StorageService);
    changeDetectorRef = inject(ChangeDetectorRef);
    router = inject(Router);
    bookmarkService = inject(BookmarkService);
    indexerService = inject(IndexerService);
    protected Math = Math;

    projects: Project[] = [];
    projectDetails = signal<ProjectDetails[]>([]);
    filteredProjects: ProjectDetails[] = [];
    loading = signal(false);
    errorMessage = signal('');
    noMoreProjects: boolean = false;
    showCloseSearchButton = signal(false);
    bookmarks$: Observable<string[]>;
    bookmarkedProjectNpubs: string[] = [];
    initialLoadComplete = signal(false);
    projectStats: Record<string, ProjectStatistics> = {};

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor() {
        this.bookmarks$ = this.bookmarkService.bookmarks$;
    }

    async ngOnInit(): Promise<void> {
        await this.bookmarkService.initializeForCurrentUser();
        this.loadInitialProjects();
        this.subscribeToProjectsUpdates();
        this.subscribeToLoading();
        this.subscribeToNoMoreProjects();
        this.subscribeToBookmarkChanges();
        this.projectService.projectStats$.subscribe(stats => {
            this.projectStats = stats;
        });
    }

    private loadInitialProjects(): void {
        this.projectService.resetProjects();
        this.loading.set(true);
        this.initialLoadComplete.set(false);
        this.projectService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (projects: Project[]) => {
                this.projects = projects;
                this.filteredProjects = this.projectDetails();
                this.updateBookmarkStatus();
                this.fetchProjectDetails(projects);
                this.initialLoadComplete.set(true);
                this.changeDetectorRef.detectChanges();
                console.log(projects);
            }
        });
    }

    private subscribeToBookmarkChanges(): void {
        this.bookmarks$.pipe(takeUntil(this._unsubscribeAll)).subscribe(bookmarkIds => {
            this.bookmarkedProjectNpubs = bookmarkIds;
            this.updateBookmarkStatus();
            this.changeDetectorRef.detectChanges();
        });
    }

    private updateBookmarkStatus(): void {
        this.projectDetails().forEach(project => {
            project.isBookmarked = this.bookmarkedProjectNpubs.includes(project.nostrPubKey);
        });
        this.filteredProjects = [...this.projectDetails()];
    }

    private async fetchMetadataForProjects(projects: ProjectDetails[]): Promise<void> {
        for (const project of projects) {
            try {
                const profileMetadata = await this.storageService.getProfile(project.nostrPubKey);
                if (profileMetadata) {
                    this.updateProjectMetadata(project, profileMetadata);
                } else {
                    console.warn(`No metadata found for project with pubKey: ${project.nostrPubKey}`);
                }
            } catch (error) {
                console.error(`Error fetching metadata for pubKey: ${project.nostrPubKey}`, error);
            }
        }
    }

    private async fetchProjectDetails(projects: Project[]): Promise<void> {
        for (const project of projects) {
            try {
                const projectDetails = await this.storageService.getProjectDetails(project.projectIdentifier);
                if (projectDetails) {
                    this.projectDetails.update(details => [...details, projectDetails]);
                    const metadata = await this.storageService.getProfile(projectDetails.nostrPubKey);
                    if (metadata) {
                        this.updateProjectMetadata(projectDetails, metadata);
                    } else {
                        console.warn(`No metadata found for project with nostrPubKey: ${projectDetails.nostrPubKey}`);
                    }
                } else {
                    console.warn(`No details found for project with eventId: ${project.nostrEventId}`);
                }
            } catch (error) {
                console.error(`Error fetching details for eventId: ${project.nostrEventId}`, error);
            }
        }
    }

    private subscribeToProjectsUpdates(): void {
        this.storageService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                if (data && data.pubKey) {
                    const project = this.projectDetails().find(proj => proj.nostrPubKey === data.pubKey);
                    if (project) {
                        this.updateProjectMetadata(project, data.metadata);
                        this.changeDetectorRef.detectChanges();
                    }
                }
            });
    }

    private updateProjectMetadata(project: ProjectDetails, metadata: any): void {
        project.displayName = metadata.name || project.displayName;
        project.about = metadata.about || project.about;
        project.picture = metadata.picture || project.picture;
        project.banner = metadata.banner || project.banner;
    }

    loadMoreProjects(): void {
        this.projectService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (newProjects: Project[]) => {
                const uniqueNewProjects = newProjects.filter(newProject =>
                    !this.projects.some(existingProject =>
                        existingProject.projectIdentifier === newProject.projectIdentifier
                    )
                );
                this.projects = [...this.projects, ...uniqueNewProjects];
                this.filteredProjects = [...this.projectDetails()];
                this.fetchProjectDetails(uniqueNewProjects);
                this.changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage.set('Error loading more projects');
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    private subscribeToLoading(): void {
        this.projectService.loading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((loading) => {
                this.loading.set(loading);
                this.changeDetectorRef.detectChanges();
            });
    }

    private subscribeToNoMoreProjects(): void {
        this.projectService.noMoreProjects$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((noMore) => {
                this.noMoreProjects = noMore;
                this.changeDetectorRef.detectChanges();
            });
    }

    trackByFn(index: number, item: Project): string | number {
        return item.projectIdentifier || index;
    }

    goToProjectDetails(project: ProjectDetails): void {
        const network = this.indexerService.getNetwork();
        const baseUrl = network === 'mainnet' ? 'https://beta.angor.io/view/' : 'https://test.angor.io/view/';
        this.projectService.fetchProjectStats(project.projectIdentifier).pipe(
            tap((stats: ProjectStatistics) => {
                this.storageService.saveProjectStats(project.projectIdentifier, stats);
            }),
            tap(() => {
                this.router.navigate(['/profile', project.nostrPubKey, project.projectIdentifier]);
            }),
            catchError((error) => {
                console.error(`Failed to navigate to project details for ${project.projectIdentifier}:`, error);
                return of(null);
            })
        ).subscribe();
    }

    filterByQuery(query: string): void {
        if (!query || query.trim() === '') {
            this.filteredProjects = [...this.projectDetails()];
            this.showCloseSearchButton.set(false);
            this.changeDetectorRef.detectChanges();
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        this.filteredProjects = this.projectDetails().filter((project) => {
            return (
                (project.displayName &&
                    project.displayName
                        .toLowerCase()
                        .includes(lowerCaseQuery)) ||
                (project.about &&
                    project.about.toLowerCase().includes(lowerCaseQuery)) ||
                (project.displayName &&
                    project.displayName
                        .toLowerCase()
                        .includes(lowerCaseQuery)) ||
                (project.nostrPubKey &&
                    project.nostrPubKey
                        .toLowerCase()
                        .includes(lowerCaseQuery)) ||
                (project.projectIdentifier &&
                    project.projectIdentifier
                        .toLowerCase()
                        .includes(lowerCaseQuery))
            );
        });

        this.showCloseSearchButton.set(this.projects.length > 0);

        this.changeDetectorRef.detectChanges();
    }

    resetSearch(queryInput: HTMLInputElement): void {
        queryInput.value = '';
        this.filterByQuery('');
        this.showCloseSearchButton.set(false);
    }

    async toggleBookmark(projectNpub: string): Promise<void> {
        const isBookmarked = await this.bookmarkService.isBookmarked(projectNpub);
        if (isBookmarked) {
            await this.bookmarkService.removeBookmark(projectNpub);
        } else {
            await this.bookmarkService.addBookmark(projectNpub);
        }
    }

    async isProjectBookmarked(projectNpub: string): Promise<boolean> {
        return await this.bookmarkService.isBookmarked(projectNpub);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}

