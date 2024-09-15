import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { AngorConfig, AngorConfigService, Scheme, Theme, Themes } from '@angor/services/config';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { SignerService } from 'app/services/signer.service';
import { NgClass, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MetadataService } from 'app/services/metadata-service.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        NgClass,
        MatDividerModule,
        CommonModule
    ],
})
export class UserComponent implements OnInit, OnDestroy {
    user: any;
    isLoading: boolean = true;
    errorMessage: string | null = null;
    metadata: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    config: AngorConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _angorConfigService: AngorConfigService,
        private _metadataService: MetadataService,
        private _signerService: SignerService
    ) { }

    ngOnInit(): void {
        this.loadUserProfile();

        // Subscribe to config changes
        this._angorConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AngorConfig) => {
                localStorage.setItem('angorConfig', JSON.stringify(config));
                this.config = config;
            });
    }

    private async loadUserProfile(): Promise<void> {
        this.isLoading = true;
        this.errorMessage = null;
        const publicKey = this._signerService.getPublicKey();

        if (!publicKey) {
            this.errorMessage = 'No public key found. Please log in again.';
            this.isLoading = false;
            return;
        }

        try {
            const metadata = await this._metadataService.fetchMetadataWithCache(publicKey);
            this.metadata = metadata;
            this._changeDetectorRef.markForCheck();

            this._metadataService.getMetadataStream().pipe(takeUntil(this._unsubscribeAll))
                .subscribe((updatedMetadata) => {
                    this.metadata = updatedMetadata;
                    this._changeDetectorRef.markForCheck();
                });
        } catch (error) {
            console.error('Failed to load profile data:', error);
            this.errorMessage = 'Failed to load profile data. Please try again later.';
        } finally {
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
        }
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    logout(): void {
        this._router.navigate(['/logout']);
    }

    profile(): void {
        this._router.navigate(['/profile']);
    }

    setLayout(layout: string): void {
        this._angorConfigService.config = { layout };
    }

    setScheme(scheme: Scheme): void {
        this._angorConfigService.config = { scheme };
    }

    setTheme(theme: Theme): void {
        this._angorConfigService.config = { theme };
    }
}
