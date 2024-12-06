import { CommonModule, TitleCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    NgZone,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
    inject,
    signal,
    effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RelayService } from 'app/services/relay.service';

@Component({
    selector: 'settings-relay',
    templateUrl: './relay.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        TitleCasePipe,
        CommonModule,
        FormsModule,
    ],
})
export class SettingsRelayComponent implements OnInit {
    private readonly _relayService = inject(RelayService);
    private readonly _zone = inject(NgZone);
    private readonly _sanitizer = inject(DomSanitizer);
    private readonly _cdr = inject(ChangeDetectorRef);

    // Signals for state management
    relays = signal<any[]>([]);
    newRelayUrl = signal<string>('');
    accessOptions = signal<any[]>([
        {
            label: 'Read',
            value: 'read',
            description:
                'Reads only, does not write, unless explicitly specified on publish action.',
        },
        {
            label: 'Write',
            value: 'write',
            description:
                'Writes your events, profile, and other metadata updates. Connects on-demand.',
        },
        {
            label: 'Read and Write',
            value: 'read-write',
            description:
                'Reads and writes events, profiles, and other metadata. Always connected.',
        },
    ]);

    private relayIconsCache = new Map<string, SafeUrl>();

    constructor() {
        // Effect to sync relays with service
        effect(() => {
            this._relayService.getRelays().subscribe((relays) => {
                this._zone.run(() => {
                    this.relays.set(relays);
                    this._cdr.markForCheck();
                });
            });
        });
    }

    ngOnInit(): void {}

    addRelay(): void {
        if (this.newRelayUrl().trim()) {
            this._relayService.addRelay(this.newRelayUrl().trim());
            this.newRelayUrl.set('');
            this._cdr.markForCheck();
        }
    }

    updateRelayAccess(relay: any): void {
        console.log('Relay Access Updated:', relay.url, relay.accessType);
        this._relayService.updateRelayAccessType(relay.url, relay.accessType);
        this._cdr.markForCheck();
    }

    removeRelay(url: string): void {
        this._relayService.removeRelay(url);
        this._cdr.markForCheck();
    }

    trackByFn(index: number, item: any): any {
        return item.url || index;
    }

    getRelayStatus(relay: any): string {
        return relay.connected ? 'Connected' : 'Disconnected';
    }

    getRelayStatusClass(relay: any): string {
        return relay.connected ? 'text-green-700' : 'text-red-700';
    }

    relayFavIcon(url: string): SafeUrl {
        if (this.relayIconsCache.has(url)) {
            return this.relayIconsCache.get(url)!;
        }
        const sanitizedUrl = this._sanitizer.bypassSecurityTrustUrl(
            url.replace('wss://', 'https://').replace('ws://', 'https://') + '/favicon.ico'
        );
        this.relayIconsCache.set(url, sanitizedUrl);
        return sanitizedUrl;
    }

    getSafeUrl(url: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(url);
    }

    onImageError(event: Event): void {
        (event.target as HTMLImageElement).src = '/images/avatars/avatar-placeholder.png';
    }
}
