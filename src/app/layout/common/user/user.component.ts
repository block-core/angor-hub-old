import {
    AngorConfig,
    AngorConfigService,
    Scheme,
    Theme,
} from '@angor/services/config';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
    effect,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from 'app/services/storage.service';
import { SignerService } from 'app/services/signer.service';
import { NostrLoginService } from 'app/services/nostr-login.service';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        CommonModule,
        RouterModule,
    ],
})
export class UserComponent {
    // Signals
    user = signal<{ picture?: string; display_name?: string; name?: string } | null>(null);
    config = signal<AngorConfig | null>(null);
    userPubKey = signal<string>('');

    private signerService = inject(SignerService);
    private storageService = inject(StorageService);
    private angorConfigService = inject(AngorConfigService);
    private router = inject(Router);
    private sanitizer = inject(DomSanitizer);
    private nostrLoginService = inject(NostrLoginService);
    public authService = inject(AuthService);

    constructor() {
        // Initialize userPubKey signal
        this.userPubKey.set(this.signerService.getPublicKey());

        // Check if user is logged in
        if (this.authService.isLoggedIn()) {
            // Load user profile
            this.loadUserProfile();
        }

        // Subscribe to configuration changes
        effect(() => {
            this.config.set(this.angorConfigService.config);
            if (this.config()) {
                localStorage.setItem(
                    'angorConfig',
                    JSON.stringify(this.config())
                );
            }
        });

        // Listen to profile changes from the storage service
        this.storageService.profile$.subscribe((data) => {
            if (data && data.pubKey === this.userPubKey()) {
                this.user.set(data.metadata || {});
            }
        });
    }

    private loadUserProfile(): void {
        this.storageService.getProfile(this.userPubKey()).then((metadata) => {
            this.user.set(metadata || {});
        });
    }

    logout(): void {
        this.router.navigate(['/logout']);
    }

    Switch(): void {
        this.nostrLoginService.switchAccount();
    }

    profile(): void {
        this.router.navigate(['/profile']);
    }

    setScheme(scheme: Scheme): void {
        this.angorConfigService.config = { scheme };
    }

    setTheme(theme: Theme): void {
        this.angorConfigService.config = { theme };
    }

    getSafeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    switchAccount(): void {
        this.nostrLoginService.switchAccount();
    }
}
