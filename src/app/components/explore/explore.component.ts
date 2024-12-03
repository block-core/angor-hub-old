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
    ]
})
export class ExploreComponent implements OnInit, OnDestroy {


    projects: Project[] = [];
    projectDetails: ProjectDetails[] = [];

    filteredProjects: ProjectDetails[] = []
    loading: boolean = false;
    errorMessage: string = '';
    noMoreProjects: boolean = false;
    showCloseSearchButton: boolean;
    bookmarks$: Observable<string[]>;
    bookmarkedProjectNpubs: string[] = [];
    initialLoadComplete: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _projectsService: ProjectsService,
        private _storageService: StorageService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _bookmarkService: BookmarkService,
    ) {

        this.bookmarks$ = this._bookmarkService.bookmarks$;
    }

    async ngOnInit(): Promise<void> {
        await this._bookmarkService.initializeForCurrentUser();
        this.loadInitialProjects();
        this.subscribeToProjectsUpdates();
        this.subscribeToLoading();
        this.subscribeToNoMoreProjects();
        this.subscribeToBookmarkChanges();

    }


    private loadInitialProjects(): void {
        this._projectsService.resetProjects();
        this.loading = true;
        this.initialLoadComplete = false;
        this._projectsService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (projects: Project[]) => {
                this.projects = projects;
                this.filteredProjects = this.projectDetails;
                this.updateBookmarkStatus();
                this.fetchProjectDetails(projects);
                this.initialLoadComplete = true;
                this._changeDetectorRef.detectChanges();

                console.log(projects);

            }
        });
    }

    private subscribeToBookmarkChanges(): void {
        this.bookmarks$.pipe(takeUntil(this._unsubscribeAll)).subscribe(bookmarkIds => {
            this.bookmarkedProjectNpubs = bookmarkIds;
            this.updateBookmarkStatus();
            this._changeDetectorRef.detectChanges();
        });
    }

    private updateBookmarkStatus(): void {
        this.projectDetails.forEach(project => {
            project.isBookmarked = this.bookmarkedProjectNpubs.includes(project.nostrPubKey);
        });
        this.filteredProjects = [...this.projectDetails];

    }


    private async fetchMetadataForProjects(projects: ProjectDetails[]): Promise<void> {
        for (const project of projects) {
            try {
                const profileMetadata = await this._storageService.getProfile(project.nostrPubKey);
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

                const projectDetails = await this._storageService.getProjectDetails(project.projectIdentifier);

                if (projectDetails) {
                    this.projectDetails.push(projectDetails);
                    const metadata = await this._storageService.getProfile(projectDetails.nostrPubKey);
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
        this._storageService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                if (data && data.pubKey) {
                    const project = this.projectDetails.find(proj => proj.nostrPubKey === data.pubKey);
                    if (project) {
                        this.updateProjectMetadata(project, data.metadata);
                        this._changeDetectorRef.detectChanges();
                    }
                }
            });
    }


    private updateProjectMetadata(project: ProjectDetails, metadata: any): void {
        project.displayName = metadata.name || project.displayName;
        project.about = metadata.about || project.about;
        project.picture = metadata.picture || project.picture;
        project.banner= metadata.banner || project.banner;
    }


    loadMoreProjects(): void {
        this._projectsService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (newProjects: Project[]) => {
                const uniqueNewProjects = newProjects.filter(newProject =>
                    !this.projects.some(existingProject =>
                        existingProject.projectIdentifier === newProject.projectIdentifier
                    )
                );
                this.projects = [...this.projects, ...uniqueNewProjects];
                this.filteredProjects = [...this.projectDetails];
                this.fetchProjectDetails(uniqueNewProjects);
                this._changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage = 'Error loading more projects';
                this._changeDetectorRef.detectChanges();
            }
        });
    }


    private subscribeToLoading(): void {
        this._projectsService.loading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((loading) => {
                this.loading = loading;
                this._changeDetectorRef.detectChanges();
            });
    }


    private subscribeToNoMoreProjects(): void {
        this._projectsService.noMoreProjects$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((noMore) => {
                this.noMoreProjects = noMore;
                this._changeDetectorRef.detectChanges();
            });
    }

    trackByFn(index: number, item: Project): string | number {
        return item.projectIdentifier || index;
    }

   goToProjectDetails(project: ProjectDetails): void {
    this._projectsService.fetchProjectStats(project.projectIdentifier).pipe(
        tap((stats: ProjectStatistics) => {

            this._storageService.saveProjectStats(project.projectIdentifier, stats);
        }),
        tap(() => {

            this._router.navigate(['/profile', project.nostrPubKey, project.projectIdentifier]);
        }),
        catchError((error) => {
            console.error(`Failed to navigate to project details for ${project.projectIdentifier}:`, error);
            return of(null);
        })
    ).subscribe();
}


    filterByQuery(query: string): void {
        if (!query || query.trim() === '') {
            this.filteredProjects = [...this.projectDetails];
            this.showCloseSearchButton = false;
            this._changeDetectorRef.detectChanges();
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        this.filteredProjects = this.projectDetails.filter((project) => {
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

        this.showCloseSearchButton = this.projects.length > 0;

        this._changeDetectorRef.detectChanges();
    }

    resetSearch(queryInput: HTMLInputElement): void {
        queryInput.value = '';
        this.filterByQuery('');
        this.showCloseSearchButton = false;
    }

    async toggleBookmark(projectNpub: string): Promise<void> {
        const isBookmarked = await this._bookmarkService.isBookmarked(projectNpub);
        if (isBookmarked) {
            await this._bookmarkService.removeBookmark(projectNpub);
        } else {
            await this._bookmarkService.addBookmark(projectNpub);
        }
    }

    async isProjectBookmarked(projectNpub: string): Promise<boolean> {
        return await this._bookmarkService.isBookmarked(projectNpub);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
