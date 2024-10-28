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
import { Subject, takeUntil } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
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

    filteredProjects: Project[] = [];
    showCloseSearchButton: boolean = false;




    projects: Project[] = [];
    loading: boolean = false;
    errorMessage: string = '';
    noMoreProjects: boolean = false; // Track if more projects are available
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _projectsService: ProjectsService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadInitialProjects();
        this.subscribeToProjects();
        this.subscribeToLoading();
        this.subscribeToNoMoreProjects();
    }

    // Load initial projects and reset state
    private loadInitialProjects(): void {
        this._projectsService.resetProjects(); // Reset service state to start fresh
        this._projectsService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (projects: Project[]) => {
                this.projects = projects;
                console.log('Initial projects loaded:', projects);
                this._changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage = 'Error loading projects';
                console.error(this.errorMessage, error);
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    // Load the next page of projects and add them to the existing list
    loadMoreProjects(): void {
        this._projectsService.fetchProjects().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            next: (newProjects: Project[]) => {
                if (newProjects.length > 0) {
                    // Filter out duplicate projects
                    const uniqueNewProjects = newProjects.filter(newProject =>
                        !this.projects.some(existingProject =>
                            existingProject.projectIdentifier === newProject.projectIdentifier
                        )
                    );
                    // Add only unique new projects to the list
                    this.projects = [...this.projects, ...uniqueNewProjects];
                    console.log('Loaded more projects:', uniqueNewProjects);
                } else {
                    this.noMoreProjects = true; // No more projects to load
                }
                this._changeDetectorRef.detectChanges();
            },
            error: (error) => {
                this.errorMessage = 'Error loading more projects';
                console.error(this.errorMessage, error);
                this._changeDetectorRef.detectChanges();
            }
        });
    }

    // Subscribe to projects observable for updates
    private subscribeToProjects(): void {
        this._projectsService.projects$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((projects) => {
                this.projects = projects;
                this._changeDetectorRef.detectChanges();
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

    trackByFn(index: number, item: Project): string | number {
        return item.projectIdentifier || index;
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}
