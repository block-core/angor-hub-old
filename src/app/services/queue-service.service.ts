import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter, NostrEvent } from 'nostr-tools';
import { RelayService } from './relay.service';

interface QueueRequest {
    filters: Filter[];
    subject: Subject<NostrEvent>;
}

@Injectable({
    providedIn: 'root',
})
export class QueueService {
    private requestQueue: QueueRequest[] = [];
    private isProcessingQueue = false;
    private maxConcurrentRequests = 5;
    private currentRequestCount = 0;

    constructor(private relayService: RelayService) {}


    public addRequestToQueue(filters: Filter[]): Observable<NostrEvent> {
        const subject = new Subject<NostrEvent>();
        const request: QueueRequest = { filters, subject };
        this.requestQueue.push(request);
        this.processQueue();
        return subject.asObservable();
    }


    private async processQueue(): Promise<void> {
        if (this.isProcessingQueue) return;
        this.isProcessingQueue = true;

        while (this.requestQueue.length > 0 && this.currentRequestCount < this.maxConcurrentRequests) {
            const request = this.requestQueue.shift();
            if (!request) break;

            try {
                this.currentRequestCount++;
                await this.fetchEvents(request.filters, request.subject);
            } catch (error) {
                request.subject.error(error);
            } finally {
                this.currentRequestCount--;
            }
        }

        this.isProcessingQueue = false;
    }


    private async fetchEvents(filters: Filter[], subject: Subject<NostrEvent>): Promise<void> {
        await this.relayService.ensureConnectedRelays();
        const connectedRelays = this.relayService.getConnectedRelays();

        if (connectedRelays.length === 0) {
            throw new Error('No connected relays');
        }

        const pool = this.relayService.getPool();

        const sub = pool.subscribeMany(connectedRelays, filters, {
            onevent: (event: NostrEvent) => {
                subject.next(event);
            },
            oneose: () => {
                sub.close();
                subject.complete();
            },
        });


        setTimeout(() => {
            sub.close();
            subject.complete();
        }, 2000);
    }
}
