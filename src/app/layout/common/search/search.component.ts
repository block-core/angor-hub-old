import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ElementRef,
    OnDestroy,
    OnInit,
    inject,
    signal,
} from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import { MatAutocompleteModule, MatAutocomplete } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { StorageService } from 'app/services/storage.service';
import { Subject, debounceTime, filter, map, takeUntil } from 'rxjs';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatOptionModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
    ],
})
export class SearchComponent implements OnInit, OnDestroy {
    @Input() appearance: 'basic' | 'bar' = 'basic';
    @Input() debounce: number = 300;
    @Input() minLength: number = 2;
    @Output() search = new EventEmitter<any>();

    searchControl = new UntypedFormControl();
    resultSets = signal<any[]>([]);
    opened = signal<boolean>(false);

    private unsubscribeAll = new Subject<void>();
    private storageService = inject(StorageService);

    @ViewChild('barSearchInput') barSearchInput!: ElementRef;
    @ViewChild('matAutocomplete') matAutocomplete!: MatAutocomplete;

    ngOnInit(): void {
        this.initializeSearch();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    initializeSearch(): void {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this.unsubscribeAll),
                map((value) => {
                    if (!value || value.length < this.minLength) {
                        this.resultSets.set([]);
                    }
                    return value;
                }),
                filter((value) => value && value.length >= this.minLength)
            )
            .subscribe(async (value) => {
                const results = await this.storageService.searchProfile(value);
                const mappedResults = results.map((result) => ({
                    label: 'Project',
                    results: [
                        {
                            name: result.profile.name || result.profile.displayName || result.pubKey,
                            pubkey: result.pubKey,
                            about: result.profile.about?.replace(/<\/?[^>]+(>|$)/g, '') || '',
                            avatar: result.profile.picture || null,
                            link: `/profile/${result.pubKey}`,
                        },
                    ],
                }));
                this.resultSets.set(mappedResults);
                this.search.emit(mappedResults);
            });
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open(): void {
        if (this.opened()) return;
        this.opened.set(true);
    }

    close(): void {
        if (!this.opened()) return;
        this.searchControl.setValue('');
        this.opened.set(false);
    }

    handleImageError(event: Event): void {
        const target = event.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'images/avatars/avatar-placeholder.png';
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
