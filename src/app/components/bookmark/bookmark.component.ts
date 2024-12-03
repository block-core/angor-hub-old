import { AngorCardComponent } from '@angor/components/card';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { Project, ProjectDetails, ProjectStatistics } from 'app/interface/project.interface';
import { BookmarkService } from 'app/services/bookmark.service';
import { ProjectsService } from 'app/services/projects.service';
import { StorageService } from 'app/services/storage.service';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-bookmark',
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
    ],
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit, OnDestroy {
    savedProjects: Project[] = [];
    savedProjectDetailes: ProjectDetails[] = [];
    bookmarks$: Observable<string[]>;
    isLoading = true;
    private _unsubscribeAll = new Subject<any>();

    constructor(
        private _bookmarkService: BookmarkService,
        private _storageService: StorageService,
        private _router: Router,
        private _projectsService: ProjectsService,
    ) {
        this.bookmarks$ = this._bookmarkService.bookmarks$;
    }

    async ngOnInit(): Promise<void> {
        try {
            await this._bookmarkService.initializeForCurrentUser();
            await this.loadBookmarkedProjects();
            this.subscribeToBookmarkChanges();
            this.isLoading = false;
        } catch (error) {
            console.error('Error during initialization:', error);
            this.isLoading = false;
        }
    }


    trackByFn(index: number, item: ProjectDetails): string | number {
        return item.nostrPubKey || index;
    }

    private async loadBookmarkedProjects(): Promise<void> {
        this.isLoading = true;
        try {
            const bookmarkIds = await this._bookmarkService.getBookmarks();
            const projects = await this._storageService.getProjectsByNostrPubKeys(bookmarkIds);
            this.savedProjectDetailes = projects;
            this.isLoading = false;
        } catch (error) {
            console.error('Error loading bookmarked projects:', error);
            this.isLoading = false;
        }
    }


    private subscribeToBookmarkChanges(): void {
        this.bookmarks$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async (bookmarkIds) => {
                try {
                    const projects = await this._storageService.getProjectsByNostrPubKeys(bookmarkIds);
                    this.savedProjectDetailes = projects;
                    this.fetchMetadataForProjects(this.savedProjectDetailes);
                    this.isLoading = false;
                } catch (error) {
                    console.error('Error updating bookmarks:', error);
                    this.isLoading = false;
                }
            });
    }


    private fetchMetadataForProjects(projects: ProjectDetails[]): void {
        projects.forEach((project) => {
            this._storageService
                .getProfile(project.nostrPubKey)
                .then((profileMetadata) => {
                    if (profileMetadata) {
                        this.updateProjectMetadata(project, profileMetadata);
                    }
                });
        });
    }

    private updateProjectMetadata(project: ProjectDetails, metadata: any): void {
        project.displayName = metadata.name || project.displayName;
        project.about = metadata.about || project.about;
        project.picture = metadata.picture || project.picture;
        project.banner = metadata.banner || project.banner;
    }

    async toggleBookmark(projectNpub: string): Promise<void> {
        const isBookmarked =
            await this._bookmarkService.isBookmarked(projectNpub);
        if (isBookmarked) {
            await this._bookmarkService.removeBookmark(projectNpub);
        } else {
            await this._bookmarkService.addBookmark(projectNpub);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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
}
