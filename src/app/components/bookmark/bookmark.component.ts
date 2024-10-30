import { AngorCardComponent } from '@angor/components/card';
import { AngorFindByKeyPipe } from '@angor/pipes/find-by-key';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass, PercentPipe, I18nPluralPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { BookmarkService } from 'app/services/bookmark.service';
import { Project } from 'app/interface/project.interface';
import { StorageService } from 'app/services/storage.service';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bookmark',
  standalone: true,
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
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit, OnDestroy {
    savedProjects: Project[] = [];
    bookmarks$: Observable<string[]>;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _bookmarkService: BookmarkService,
        private _storageService: StorageService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.bookmarks$ = this._bookmarkService.bookmarks$;
    }

    ngOnInit(): void {
        this.loadBookmarkedProjects();
        this.subscribeToBookmarkChanges();
    }


    private loadBookmarkedProjects(): void {
        const bookmarkIds = this._bookmarkService.getBookmarks();
        this._storageService.getProjectsByIds(bookmarkIds).then((projects: Project[]) => {
            this.savedProjects = projects;
            this.fetchMetadataForProjects(this.savedProjects);
        });
    }


    trackByFn(index: number, item: Project): string | number {
        return item.projectIdentifier || index;
    }

    private subscribeToBookmarkChanges(): void {
        this.bookmarks$.pipe(takeUntil(this._unsubscribeAll)).subscribe((bookmarkIds: string[]) => {
            this._storageService.getProjectsByIds(bookmarkIds).then((projects: Project[]) => {
                this.savedProjects = projects;
                this.fetchMetadataForProjects(this.savedProjects);
            });
        });
    }


    private fetchMetadataForProjects(projects: Project[]): void {
        projects.forEach(project => {
            this._storageService.getProfile(project.nostrPubKey).then(profileMetadata => {
                if (profileMetadata) {
                    this.updateProjectMetadata(project, profileMetadata);
                    this._changeDetectorRef.detectChanges();
                }
            });
        });
    }

    private updateProjectMetadata(project: Project, metadata: any): void {
        project.displayName = metadata.name || project.displayName;
        project.about = metadata.about || project.about;
        project.picture = metadata.picture || project.picture;
        project.banner = metadata.banner || project.banner;
    }

    toggleBookmark(projectId: string): void {
        if (this._bookmarkService.isBookmarked(projectId)) {
            this._bookmarkService.removeBookmark(projectId);
        } else {
            this._bookmarkService.addBookmark(projectId);
        }
    }

    isProjectBookmarked(projectId: string): boolean {
        return this._bookmarkService.isBookmarked(projectId);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
