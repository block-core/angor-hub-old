import { Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NostrEvent, SimplePool, Filter } from 'nostr-tools';
import { BehaviorSubject, Observable, Subject, timer, from, of, merge, catchError, map, switchAll, retryWhen, delay, take, takeWhile, exhaustMap } from 'rxjs';
import { filter, tap, finalize } from 'rxjs/operators';
import { Inject, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

interface Relay {
    url: string;
    connected: boolean;
    retries: number;
    retryTimeout: any;
    accessType: 'read' | 'write' | 'read-write';
    ws?: WebSocket;
}

@Injectable({
    providedIn: 'root',
})
export class RelayService implements OnDestroy {
    private pool: SimplePool = new SimplePool();
    private relays: Relay[] = [];
    private readonly maxRetries = 10;
    private readonly retryDelay = 15000;
    private readonly eventSubject = new BehaviorSubject<NostrEvent | null>(null);
    private readonly relaysSubject = new BehaviorSubject<Relay[]>([]);
    private readonly destroy$ = new Subject<void>();

    constructor(@Optional() @Inject(DOCUMENT) private document: any, @Inject(PLATFORM_ID) private platformId: Object) {
        this.initializeRelays();
        this.setupVisibilityHandling();
    }

    private initializeRelays(): void {
        this.relays = this.loadRelaysFromLocalStorage();
        this.connectToRelays();
        this.relaysSubject.next(this.relays);
    }

    private loadRelaysFromLocalStorage(): Relay[] {
        const storedRelays = JSON.parse(localStorage.getItem('nostrRelays') || '[]');
        const defaultRelays: Relay[] = [
            { url: 'wss://relay.primal.net', connected: false, retries: 0, retryTimeout: null, accessType: 'read-write' },
            { url: 'wss://nos.lol', connected: false, retries: 0, retryTimeout: null, accessType: 'read-write' },
            { url: 'wss://relay.angor.io', connected: false, retries: 0, retryTimeout: null, accessType: 'read-write' },
            { url: 'wss://relay2.angor.io', connected: false, retries: 0, retryTimeout: null, accessType: 'read-write' }
        ];

        return storedRelays.length > 0
            ? storedRelays.map(relay => ({ ...relay, connected: false, retries: 0, retryTimeout: null, ws: undefined }))
            : defaultRelays;
    }

    private saveRelaysToLocalStorage(): void {
        const relaysToSave = this.relays.map(relay => ({ url: relay.url, accessType: relay.accessType, connected: relay.connected, retries: relay.retries, retryTimeout: relay.retryTimeout }));
        localStorage.setItem('nostrRelays', JSON.stringify(relaysToSave));
        this.relaysSubject.next(this.relays);
    }

    private connectToRelay(relay: Relay): void {
        if (relay.connected) return;

        relay.ws = new WebSocket(relay.url);

        relay.ws.onopen = () => {
            relay.connected = true;
            relay.retries = 0;
            clearTimeout(relay.retryTimeout);
            this.saveRelaysToLocalStorage();
        };

        relay.ws.onerror = () => this.handleRelayError(relay);

        relay.ws.onclose = () => {
            relay.connected = false;
            this.handleRelayError(relay);
        };

        relay.ws.onmessage = ({ data }) => {
            try {
                const parsedData = JSON.parse(typeof data === 'string' ? data : data.toString('utf-8'));
                this.eventSubject.next(parsedData);
            } catch (error) {
                console.warn('Error parsing WebSocket message:', error);
            }
        };
    }

    private handleRelayError(relay: Relay): void {
        if (relay.retries >= this.maxRetries) {
            console.warn(`Max retries reached for relay: ${relay.url}. No further attempts will be made.`);
            return;
        }

        relay.retries++;
        relay.retryTimeout = setTimeout(() => this.connectToRelay(relay), this.retryDelay * relay.retries);
    }

    public connectToRelays(): void {
        this.relays.forEach(relay => !relay.connected && this.connectToRelay(relay));
    }

    public async ensureConnectedRelays(): Promise<void> {
        this.connectToRelays();
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this.getConnectedRelays().length > 0) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
    }

    private setupVisibilityHandling(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.document.addEventListener('visibilitychange', () => {
                if (this.document.visibilityState === 'visible') {
                    this.connectToRelays();
                }
            });

            window.addEventListener('beforeunload', () => {
                this.relays.forEach(relay => relay.ws?.close());
            });
        }
    }

    public getConnectedRelays(): string[] {
        return this.relays.filter(relay => relay.connected).map(relay => relay.url);
    }

    public getRelays(): Observable<Relay[]> {
        return this.relaysSubject.asObservable();
    }

    public async publishEventToWriteRelays(event: NostrEvent): Promise<NostrEvent> {
        const writeRelays = this.relays.filter(relay => ['write', 'read-write'].includes(relay.accessType) && relay.connected);
        if (!writeRelays.length) throw new Error('No connected write relays available');

        try {
            await Promise.any(writeRelays.map(relay => this.pool.publish([relay.url], event)));
            this.eventSubject.next(event);
            return event;
        } catch (error) {
            console.error('Failed to publish event to relays:', error);
            throw error;
        }
    }

    public addRelay(url: string, accessType: 'read' | 'write' | 'read-write' = 'read-write'): void {
        if (!this.relays.some(relay => relay.url === url)) {
            const newRelay: Relay = { url, connected: false, retries: 0, retryTimeout: null, accessType };
            this.relays.push(newRelay);
            this.connectToRelay(newRelay);
            this.saveRelaysToLocalStorage();
        }
    }

    public removeRelay(url: string): void {
        const relay = this.relays.find(r => r.url === url);
        if (relay) {
            relay.ws?.close();
            clearTimeout(relay.retryTimeout);
        }
        this.relays = this.relays.filter(relay => relay.url !== url);
        this.saveRelaysToLocalStorage();
    }

    public removeAllCustomRelays(): void {
        const defaultRelays = ['wss://relay.angor.io', 'wss://relay2.angor.io'];
        this.relays.forEach(relay => {
            if (!defaultRelays.includes(relay.url)) {
                relay.ws?.close();
                clearTimeout(relay.retryTimeout);
            }
        });
        this.relays = this.relays.filter(relay => defaultRelays.includes(relay.url));
        this.saveRelaysToLocalStorage();
    }

    public updateRelayAccessType(url: string, accessType: 'read' | 'write' | 'read-write'): void {
        const relay = this.relays.find(relay => relay.url === url);
        if (relay) {
            relay.accessType = accessType;
            this.saveRelaysToLocalStorage();
        }
    }

    public getPool(): SimplePool {
        return this.pool;
    }

    public getEventStream(): Observable<NostrEvent | null> {
        return this.eventSubject.asObservable();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.relays.forEach(relay => relay.ws?.close());
    }
}
