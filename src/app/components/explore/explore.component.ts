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
import { Router, RouterLink } from '@angular/router';
import { Project } from 'app/interface/project.interface';
import { StorageService } from 'app/services/storage.service';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { ProjectsService, ProjectStats } from '../../services/projects.service';
import { BookmarkService } from 'app/services/bookmark.service';

@Component({
    selector: 'explore',
    standalone: true,
    templateUrl: './explore.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
    MatButtonModule,
    RouterLink,
    MatIconModule,
    AngorCardComponent,
    CdkScrollable,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatSlideToggleModule,
    NgClass,
    MatTooltipModule,
    MatProgressBarModule,
    AngorFindByKeyPipe,
    PercentPipe,
    I18nPluralPipe,
    CommonModule,

],
})
export class ExploreComponent implements OnInit, OnDestroy {


    projects: Project[] = [];
    filteredProjects: Project[] = []
    loading: boolean = false;
    errorMessage: string = '';
    noMoreProjects: boolean = false;
    showCloseSearchButton: boolean;
    bookmarks$: Observable<string[]>;
    bookmarkedProjectIds: string[] = [];

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
        this._projectsService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (projects: Project[]) => {
                this.projects = projects;
                this.filteredProjects = this.projects;
                this.updateBookmarkStatus();
                this.fetchMetadataForProjects(projects);
                this._changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage = 'Error loading projects';
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    private subscribeToBookmarkChanges(): void {
        this.bookmarks$.pipe(takeUntil(this._unsubscribeAll)).subscribe(bookmarkIds => {
            this.bookmarkedProjectIds = bookmarkIds;
            this.updateBookmarkStatus();
            this._changeDetectorRef.detectChanges();
        });
    }

    private updateBookmarkStatus(): void {
        this.projects.forEach(project => {
            project.isBookmarked = this.bookmarkedProjectIds.includes(project.projectIdentifier);
        });
        this.filteredProjects = [...this.projects];

    }


    private fetchMetadataForProjects(projects: Project[]): void {
        projects.forEach(project => {
            this._storageService.getProfile(project.nostrPubKey)
                .then(profileMetadata => {
                    if (profileMetadata) {
                        this.updateProjectMetadata(project, profileMetadata);
                    }
                });
        });
    }


    private subscribeToProjectsUpdates(): void {
        this._storageService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                if (data && data.pubKey) {
                    const project = this.projects.find(proj => proj.nostrPubKey === data.pubKey);
                    if (project) {
                        this.updateProjectMetadata(project, data.metadata);
                        this._changeDetectorRef.detectChanges();
                    }
                }
            });
    }


    private updateProjectMetadata(project: Project, metadata: any): void {
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
                this.filteredProjects = [...this.projects];
                this.fetchMetadataForProjects(uniqueNewProjects);
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


    openChat(pubKey : string): void
    {
        this._router.navigate(['/chat', pubKey]);
    }



   goToProjectDetails(project: Project): void {
    this._projectsService.fetchProjectStats(project.projectIdentifier).pipe(
        tap((stats: ProjectStats) => {

            this._storageService.saveProjectStats(project.projectIdentifier, stats);
        }),
        tap(() => {

            this._router.navigate(['/profile', project.nostrPubKey]);
        }),
        catchError((error) => {
            console.error(`Failed to navigate to project details for ${project.projectIdentifier}:`, error);
            return of(null);
        })
    ).subscribe();
}


    filterByQuery(query: string): void {
        if (!query || query.trim() === '') {
            this.filteredProjects = [...this.projects];
            this.showCloseSearchButton = false;
            this._changeDetectorRef.detectChanges();
            return;
        }

        const lowerCaseQuery = query.toLowerCase();

        this.filteredProjects = this.projects.filter((project) => {
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

    async toggleBookmark(projectId: string): Promise<void> {
        const isBookmarked = await this._bookmarkService.isBookmarked(projectId);
        if (isBookmarked) {
            await this._bookmarkService.removeBookmark(projectId);
        } else {
            await this._bookmarkService.addBookmark(projectId);
        }
    }

    async isProjectBookmarked(projectId: string): Promise<boolean> {
        return await this._bookmarkService.isBookmarked(projectId);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
