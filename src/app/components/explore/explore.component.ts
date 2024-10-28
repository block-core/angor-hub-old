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
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Project } from 'app/interface/project.interface';
import { StorageService } from 'app/services/storage.service';
import { MetadataService } from 'app/services/metadata.service';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { ProjectsService, ProjectStats } from '../../services/projects.service';
import { ChatService } from '../chat/chat.service';
import { Contact } from '../chat/chat.types';

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
    loading: boolean = false;
    errorMessage: string = '';
    noMoreProjects: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _projectsService: ProjectsService,
        private _storageService: StorageService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
    ) {}

    ngOnInit(): void {
        this.loadInitialProjects();
        this.subscribeToProjectsUpdates();
        this.subscribeToLoading();
        this.subscribeToNoMoreProjects();
    }

    // Load initial projects and fetch metadata for each
    private loadInitialProjects(): void {
        this._projectsService.resetProjects();
        this._projectsService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (projects: Project[]) => {
                this.projects = projects;
                this.fetchMetadataForProjects(projects);
                this._changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage = 'Error loading projects';
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    // Load metadata for each project by public key
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

    // Real-time subscription to updates on project metadata
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

    // Method to update project metadata
    private updateProjectMetadata(project: Project, metadata: any): void {
        project.displayName = metadata.name || project.displayName;
        project.about = metadata.about || project.about;
        project.picture = metadata.picture || project.picture;
        project.banner= metadata.banner || project.banner;
    }

    // Load the next page of projects and add them to the existing list
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
                this.fetchMetadataForProjects(uniqueNewProjects);
                this._changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage = 'Error loading more projects';
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    // Subscribe to loading status observable for updates
    private subscribeToLoading(): void {
        this._projectsService.loading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((loading) => {
                this.loading = loading;
                this._changeDetectorRef.detectChanges();
            });
    }

    // Subscribe to noMoreProjects to hide Load More button when no more data is available
    private subscribeToNoMoreProjects(): void {
        this._projectsService.noMoreProjects$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((noMore) => {
                this.noMoreProjects = noMore;
                this._changeDetectorRef.detectChanges();
            });
    }

    // Track by function for ngFor to optimize rendering
    trackByFn(index: number, item: Project): string | number {
        return item.projectIdentifier || index;
    }

    // Implementation for opening chat with the specified public key
    openChat(pubKey: string): void {

    }


   // Navigate to project details page with the specified project
   goToProjectDetails(project: Project): void {
    this._projectsService.fetchProjectStats(project.projectIdentifier).pipe(
        tap((stats: ProjectStats) => {
            // Save stats in storage before navigating
            this._storageService.saveProjectStats(project.projectIdentifier, stats);
        }),
        tap(() => {
            // Navigate to the profile/details page once stats are saved
            this._router.navigate(['/profile', project.nostrPubKey]);
        }),
        catchError((error) => {
            console.error(`Failed to navigate to project details for ${project.projectIdentifier}:`, error);
            return of(null);
        })
    ).subscribe();
}


    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
