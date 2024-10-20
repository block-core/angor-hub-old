import {
    AngorConfig,
    AngorConfigService,
    Scheme,
    Theme,
    Themes,
} from '@angor/services/config';
import { CommonModule, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StorageService } from 'app/services/storage.service';
import { MetadataService } from 'app/services/metadata.service';
import { SignerService } from 'app/services/signer.service';
import { SubscriptionService } from 'app/services/subscription.service';
import { Filter, NostrEvent } from 'nostr-tools';
import { Subject, takeUntil } from 'rxjs';
import { StateService } from 'app/services/state.service';

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
        CommonModule,
    ],
})
export class UserComponent implements OnInit, OnDestroy {
    user: any;
    isLoading: boolean = true;
    errorMessage: string | null = null;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    config: AngorConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    userPubKey: string;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _angorConfigService: AngorConfigService,
        private _signerService: SignerService,
        private _storageService: StorageService,
        private sanitizer: DomSanitizer,
        private _changeDetectorRefef: ChangeDetectorRef,
    ) { }


    ngOnInit(): void {
        this.userPubKey = this._signerService.getPublicKey()

        this._angorConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AngorConfig) => {
                localStorage.setItem('angorConfig', JSON.stringify(config));
                this.config = config;
                this._changeDetectorRef.detectChanges();
            });

            this._storageService.profile$.subscribe((data) => {
                if (data && data.pubKey === this.userPubKey) {
                  this.user = data.metadata;
                  this._changeDetectorRefef.detectChanges();
                }
              });



        this.loadUserProfile();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private async loadUserProfile(): Promise<void> {

        this._storageService.getProfile(this.userPubKey).then((metadata) => {
            this.user = metadata;
            this._changeDetectorRefef.detectChanges();
        });

    }

    logout(): void {
        this._router.navigate(['/logout']);
    }

    profile(): void {
        this._router.navigate(['/profile']);
    }

    setLayout(layout: string): void {
        this._angorConfigService.config = { layout };
        this._changeDetectorRef.detectChanges();
    }

    setScheme(scheme: Scheme): void {
        this._angorConfigService.config = { scheme };
        this._changeDetectorRef.detectChanges();
    }

    setTheme(theme: Theme): void {
        this._angorConfigService.config = { theme };
        this._changeDetectorRef.detectChanges();
    }

    getSafeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
}
