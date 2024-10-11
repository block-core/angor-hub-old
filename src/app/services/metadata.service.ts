import { Injectable } from '@angular/core';
import { Filter, NostrEvent } from 'nostr-tools';
import { BehaviorSubject, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { IndexedDBService } from './indexed-db.service';
import { RelayService } from './relay.service';

interface MetadataRequest {
    pubkey: string;
    isUrgent: boolean;
    isGroup: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class MetadataService {
    private metadataSubject = new BehaviorSubject<any>(null);
    private requestQueue: Set<MetadataRequest> = new Set();
    private isProcessingQueue = false;
    private maxRequestsPerBatch = 3;
    private requestDelay = 5000;

    constructor(
        private indexedDBService: IndexedDBService,
        private relayService: RelayService
    ) {}

    getMetadataStream(): Observable<any> {
        return this.metadataSubject.asObservable().pipe(throttleTime(2000));
    }

    enqueueRequest(pubkey: string, isUrgent: boolean = false, isGroup: boolean = false): void {
        const request: MetadataRequest = { pubkey, isUrgent, isGroup };
        if (isUrgent) {
           
            this.requestQueue = new Set([request, ...Array.from(this.requestQueue)]);
        } else {
            this.requestQueue.add(request);
        }
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.isProcessingQueue || this.requestQueue.size === 0) {
            return;
        }

        this.isProcessingQueue = true;

        while (this.requestQueue.size > 0) {

            const urgentRequests = Array.from(this.requestQueue).filter(req => req.isUrgent);
            const batch = urgentRequests.length > 0
                ? urgentRequests.slice(0, this.maxRequestsPerBatch)
                : Array.from(this.requestQueue).slice(0, this.maxRequestsPerBatch);

            this.requestQueue = new Set(
                Array.from(this.requestQueue).slice(this.maxRequestsPerBatch)
            );

            await Promise.all(
                batch.map(async (request) => {
                    try {
                        const updatedMetadata = request.isGroup
                            ? await this.fetchMetadataForMultipleKeys([request.pubkey])
                            : await this.fetchMetadataRealtime(request.pubkey);
                        if (updatedMetadata) {
                            await this.indexedDBService.saveUserMetadata(request.pubkey, updatedMetadata);
                            this.metadataSubject.next(updatedMetadata);
                        }
                    } catch (error) {
                        console.error(`Failed to update metadata for user: ${request.pubkey}`, error);
                    }
                })
            );

            await new Promise((resolve) => setTimeout(resolve, this.requestDelay));
        }

        this.isProcessingQueue = false;
    }

    async fetchMetadataForMultipleKeys(pubkeys: string[]): Promise<any[]> {
        const filter: Filter = {
            kinds: [0],
            authors: pubkeys,
        };

        try {
            await this.relayService.ensureConnectedRelays();
            const connectedRelays = this.relayService.getConnectedRelays();

            if (connectedRelays.length === 0) {
                console.error('No relays are connected.');
                return [];
            }

            const metadataList: any[] = [];

            const sub = this.relayService
                .getPool()
                .subscribeMany(connectedRelays, [filter], {
                    onevent: async (event: NostrEvent) => {
                        if (event.kind === 0) {
                            try {
                                const metadata = JSON.parse(event.content);
                                await this.indexedDBService.saveUserMetadata(
                                    event.pubkey,
                                    metadata
                                );
                                metadataList.push({
                                    pubkey: event.pubkey,
                                    metadata,
                                });
                            } catch (error) {
                                console.error('Error parsing metadata:', error);
                            }
                        }
                    },
                    oneose: () => {},
                });

            setTimeout(() => {
                sub.close();
            }, 1000);

            return metadataList;
        } catch (error) {
            console.error('Failed to fetch metadata for multiple keys:', error);
            return [];
        }
    }

    async fetchMetadataWithCache(pubkey: string): Promise<any> {

        const cachedMetadata = await this.indexedDBService.getUserMetadata(pubkey);


        if (cachedMetadata) {
            return cachedMetadata;
        }


        return new Promise((resolve, reject) => {

            this.enqueueRequest(pubkey);


            const subscription = this.metadataSubject.asObservable().subscribe({
                next: (updatedMetadata) => {
                    if (updatedMetadata && updatedMetadata.pubkey === pubkey) {

                        resolve(updatedMetadata);
                        subscription.unsubscribe();
                    }
                },
                error: (error) => {
                    console.error('Error fetching metadata:', error);
                    reject(error);
                    subscription.unsubscribe();
                }
            });
        });
    }


    private subscribeToMetadataUpdates(pubkey: string): void {
        this.relayService.ensureConnectedRelays().then(() => {
            const filter: Filter = { authors: [pubkey], kinds: [0] };

            this.relayService
                .getPool()
                .subscribeMany(
                    this.relayService.getConnectedRelays(),
                    [filter],
                    {
                        onevent: async (event: NostrEvent) => {
                            if (event.pubkey === pubkey && event.kind === 0) {
                                try {
                                    const updatedMetadata = JSON.parse(
                                        event.content
                                    );
                                    await this.indexedDBService.saveUserMetadata(
                                        pubkey,
                                        updatedMetadata
                                    );
                                    this.metadataSubject.next(updatedMetadata);
                                } catch (error) {
                                    console.error(
                                        'Error parsing updated metadata:',
                                        error
                                    );
                                }
                            }
                        },
                        oneose() {},
                    }
                );
        });
    }

    async fetchMetadataRealtime(pubkey: string): Promise<any> {
        await this.relayService.ensureConnectedRelays();
        const connectedRelays = this.relayService.getConnectedRelays();

        if (connectedRelays.length === 0) {
            throw new Error('No connected relays');
        }

        return new Promise<any>((resolve) => {
            const sub = this.relayService
                .getPool()
                .subscribeMany(
                    connectedRelays,
                    [{ authors: [pubkey], kinds: [0] }],
                    {
                        onevent: (event: NostrEvent) => {
                            if (event.pubkey === pubkey && event.kind === 0) {
                                try {
                                    const content = JSON.parse(event.content);
                                    resolve(content);
                                } catch (error) {
                                    console.error(
                                        'Error parsing event content:',
                                        error
                                    );
                                    resolve(null);
                                } finally {
                                    sub.close();
                                }
                            }
                        },
                        oneose() {
                            sub.close();
                            resolve(null);
                        },
                    }
                );
        });
    }

    async refreshAllStoredMetadata(): Promise<void> {
        const storedUsers = await this.indexedDBService.getAllUsers();
        if (!storedUsers || storedUsers.length === 0) {
            return;
        }

        storedUsers.forEach((user) => this.enqueueRequest(user.pubkey));
    }

    async getUserMetadata(pubkey: string): Promise<any> {
        try {
            const cachedMetadata =
                await this.indexedDBService.getUserMetadata(pubkey);
            if (cachedMetadata) {
                return cachedMetadata;
            }

            const liveMetadata = await this.fetchMetadataRealtime(pubkey);
            if (liveMetadata) {
                await this.indexedDBService.saveUserMetadata(
                    pubkey,
                    liveMetadata
                );
                return liveMetadata;
            }

            return null;
        } catch (error) {
            console.error(`Error fetching metadata for user ${pubkey}:`, error);
            return null;
        }
    }


    private async fetchFilteredEvents(filter: Filter): Promise<NostrEvent[]> {
        await this.relayService.ensureConnectedRelays();
        const connectedRelays = this.relayService.getConnectedRelays();

        const eventMap = new Map<string, NostrEvent>();
        const pool = this.relayService.getPool();

        await Promise.all(
            connectedRelays.map(async (relay) => {
                const events = await pool.querySync([relay], filter);
                events.forEach((event) => {
                    if (!eventMap.has(event.id)) {
                        eventMap.set(event.id, event);
                    }
                });
            })
        );

        return Array.from(eventMap.values());
    }
}
