import { Injectable } from '@angular/core';
import { hexToBytes } from '@noble/hashes/utils';
import { NewEvent } from 'app/types/NewEvent';
import { Filter, finalizeEvent, NostrEvent } from 'nostr-tools';
import { BehaviorSubject, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { RelayService } from './relay.service';
import { SignerService } from './signer.service';
import { QueueService } from './queue-service.service';

interface Job {
    eventId: string;
}

@Injectable({
    providedIn: 'root',
})
export class PaginatedEventService {
    private eventsSubject = new BehaviorSubject<NewEvent[]>([]);
    private isLoading = new BehaviorSubject<boolean>(false);
    private lastLoadedEventTime: number | null = null;
    private pageSize = 10;
    private noMoreEvents = new BehaviorSubject<boolean>(false);
    private seenEventIds = new Set<string>();

    private likesMap = new Map<string, string[]>();
    private repliesMap = new Map<string, NewEvent[]>();
    private zapsMap = new Map<string, string[]>();
    private repostsMap = new Map<string, string[]>();
    private hasLikedMap = new Map<string, boolean>();
    private hasRepostedMap = new Map<string, boolean>();

    private jobQueue: Job[] = [];
    private isProcessingQueue = false;

    myLikedNoteIds: string[] = [];

    constructor(
        private relayService: RelayService,
        private signerService: SignerService,
        private queueService: QueueService
    ) {
    }


    async subscribeToEvents(pubkeys: string[]): Promise<void> {
        await this.relayService.ensureConnectedRelays();
        const connectedRelays = this.relayService.getConnectedRelays().slice(0, 3);

        if (!connectedRelays || connectedRelays.length === 0) {
            console.error('No connected relays available.');
            return;
        }

        const filters: Filter[] = [
            {
                kinds: [1],
                authors: pubkeys,
                limit: this.pageSize,
            },
            {
                '#p': pubkeys,
                limit: 1,
            },
        ];

       const sub= this.relayService.getPool().subscribeMany(connectedRelays, filters, {
            onevent: (event: NostrEvent) => {
                if (!this.isReply(event)) {
                    this.handleNewOrUpdatedEvent(event);
                }

                const parentEventId = this.getParentEventId(event);
                if (parentEventId) {
                    this.enqueueJob(parentEventId);
                }

                switch (event.kind) {
                    case 7:
                        this.enqueueJob(parentEventId);
                        break;
                    case 9735:
                        this.enqueueJob(parentEventId);
                        break;
                    case 6:
                        this.enqueueJob(parentEventId);
                        break;
                    default:
                }
            },
            oneose: () => {

            },
        });
    }

    private getParentEventId(event: NostrEvent): string | null {
        const replyTag = event.tags.find((tag) => tag[0] === 'e');
        return replyTag ? replyTag[1] : null;
    }

    private async handleNewOrUpdatedEvent(event: NostrEvent): Promise<void> {
        switch (event.kind) {
            case 1:
                if (!this.seenEventIds.has(event.id)) {
                    this.seenEventIds.add(event.id);
                    const newEvent = await this.createNewEvent(event);
                    this.eventsSubject.next([newEvent]);
                    this.updateEventInSubject(event.id);
                }
                break;

            case 7:
                this.handleLikeEvent(event);
                break;

            case 9735:
                this.handleZapEvent(event);
                break;

            case 6:
                this.handleRepostEvent(event);
                break;

            case 4:
                this.handleReplyEvent(event);
                break;

            default:
        }
    }

    private handleLikeEvent(event: NostrEvent): void {
        const eventId = event.tags.find((tag) => tag[0] === 'e')?.[1];
        if (eventId) {
            const currentEvents = this.eventsSubject.getValue();
            const updatedEvent = currentEvents.find((e) => e.id === eventId);
            if (updatedEvent) {
                updatedEvent.likeCount += 1;
                updatedEvent.likers = [...(updatedEvent.likers || []), event.pubkey];
                this.eventsSubject.next([updatedEvent]);
            }
        }
    }

    private handleZapEvent(event: NostrEvent): void {
        const eventId = event.tags.find((tag) => tag[0] === 'e')?.[1];
        if (eventId) {
            const currentEvents = this.eventsSubject.getValue();
            const updatedEvent = currentEvents.find((e) => e.id === eventId);
            if (updatedEvent) {
                updatedEvent.zapCount += 1;
                updatedEvent.zappers = [...(updatedEvent.zappers || []), event.pubkey];
                this.eventsSubject.next([updatedEvent]);
            }
        }
    }

    private handleRepostEvent(event: NostrEvent): void {
        const eventId = event.tags.find((tag) => tag[0] === 'e')?.[1];
        if (eventId) {
            const currentEvents = this.eventsSubject.getValue();
            const updatedEvent = currentEvents.find((e) => e.id === eventId);
            if (updatedEvent) {
                updatedEvent.repostCount += 1;
                updatedEvent.reposters = [...(updatedEvent.reposters || []), event.pubkey];
                this.eventsSubject.next([updatedEvent]);
            }
        }
    }

    private async handleReplyEvent(event: NostrEvent): Promise<void> {
        const eventId = event.tags.find((tag) => tag[0] === 'e')?.[1];
        if (eventId) {
            const replyEvent = await this.createNewEvent(event);
            const currentEvents = this.eventsSubject.getValue();
            const updatedEvent = currentEvents.find((e) => e.id === eventId);
            if (updatedEvent) {
                updatedEvent.replyCount += 1;
                updatedEvent.replies = [...(updatedEvent.replies || []), replyEvent];
                this.eventsSubject.next([updatedEvent]);
            }
        }
    }


    private isReply(event: NostrEvent): boolean {
        const replyTags = event.tags.filter(
            (tag) => tag[0] === 'e' || tag[0] === 'p'
        );
        return replyTags.length > 0;
    }

    private async getMyLikes(): Promise<string[]> {
        const myLikesFilter: Filter = {
            kinds: [7],
            authors: [this.signerService.getPublicKey()]
        };

        try {
            const likeEvents = await this.fetchFilteredEvents(myLikesFilter);
            likeEvents.forEach((like) => {
                const eventIdTag = like.tags.find(tag => tag[0] === 'e');
                if (eventIdTag) {
                    const eventId = eventIdTag[1];
                    this.myLikedNoteIds.push(eventId);
                }
            });

            return this.myLikedNoteIds;
        } catch (error) {
            console.error('Failed to get user likes:', error);
            return [];
        }
    }

    async loadMoreEvents(pubkeys: string[]): Promise<void> {
        if (this.isLoading.value || this.noMoreEvents.value) return;

        this.isLoading.next(true);

        const filter: Filter = {
            authors: pubkeys,
            kinds: [1],
            until: this.lastLoadedEventTime || Math.floor(Date.now() / 1000),
            limit: this.pageSize,
        };

        try {
            const events = await this.fetchFilteredEvents(filter);

            if (events.length < this.pageSize) {
                this.noMoreEvents.next(true);
            }

            if (events.length > 0) {
                this.lastLoadedEventTime = events[events.length - 1].created_at;

                const uniqueEvents = events.filter(
                    (event) => !this.seenEventIds.has(event.id) && !this.isReply(event)
                );
                uniqueEvents.forEach((event) => this.seenEventIds.add(event.id));

                const newEvents = await Promise.all(
                    uniqueEvents.map((event) => this.createNewEvent(event))
                );

                this.eventsSubject.next(
                    [...this.eventsSubject.getValue(), ...newEvents].sort(
                        (a, b) => b.createdAt - a.createdAt
                    )
                );
            } else {
                this.noMoreEvents.next(true);
            }
        } catch (error) {
            console.error('Error loading more events:', error);
        } finally {
            this.isLoading.next(false);
        }
    }

    private async fetchFilteredEvents(filter: Filter): Promise<NostrEvent[]> {
        return new Promise((resolve, reject) => {

            const eventsMap = new Map<string, NostrEvent>();
            const eventsArray: NostrEvent[] = [];


            this.queueService.addRequestToQueue([filter]).subscribe({

                next: (event: NostrEvent) => {

                    if (!eventsMap.has(event.id)) {
                        eventsMap.set(event.id, event);
                        eventsArray.push(event);
                    }
                },

                error: (error) => {
                    console.error('Error fetching events:', error);
                    reject(error);
                },

                complete: () => {
                    console.log('All events fetched and completed');
                    resolve(eventsArray);
                }
            });
        });
    }


    private async createNewEvent(event: NostrEvent): Promise<NewEvent> {
        const newEvent = new NewEvent(
            event.id,
            event.kind,
            event.pubkey,
            event.content,
            event.id,
            event.created_at,
            event.tags
        );

         this.enqueueJob(event.id);
        await this.processJobQueue();

        newEvent.likedByMe = this.myLikedNoteIds.includes(event.id);



        return newEvent;
    }


    private enqueueJob(
        eventId: string
    ): void {
        if (
            !this.jobQueue.some(
                (job) => job.eventId === eventId
            )
        ) {
            this.jobQueue.push({ eventId });
            if (!this.isProcessingQueue) {
                this.processJobQueue();
            }
        }
    }
    private async processJobQueue(): Promise<void> {
        if (this.isProcessingQueue) return;
        this.isProcessingQueue = true;

        const activeJobs: Promise<void>[] = [];
        while (this.jobQueue.length > 0 || activeJobs.length > 0) {
            while (this.jobQueue.length > 0 && activeJobs.length < 10) {
                const job = this.jobQueue.shift();
                if (!job) break;
                await this.delay(1000);


                const jobPromise = this.processJobWithQueueService(job);
                activeJobs.push(jobPromise);

                jobPromise
                    .then(() => {
                        activeJobs.splice(activeJobs.indexOf(jobPromise), 1);
                    })
                    .catch((error) => {
                        console.error('Error processing job:', error);
                        activeJobs.splice(activeJobs.indexOf(jobPromise), 1);
                    });
            }
            await Promise.race(activeJobs);
        }

        this.isProcessingQueue = false;
    }

    private async processJobWithQueueService(job: Job): Promise<void> {
        try {
            const multiFilterResult = await this.fetchMultiFilterEvents(job.eventId);

            this.repliesMap.set(job.eventId, multiFilterResult.replies);
            this.likesMap.set(job.eventId, multiFilterResult.likers);
            this.zapsMap.set(job.eventId, multiFilterResult.zappers);
            this.repostsMap.set(job.eventId, multiFilterResult.reposters);

            this.updateEventInSubject(job.eventId);
        } catch (error) {
            console.error('Error processing job with QueueService:', error);
            throw error;
        }
    }




    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private updateEventInSubject(eventId: string): void {
        const currentEvents = this.eventsSubject.getValue();
        const updatedEvents = currentEvents.map((event) => {
            if (event.id === eventId) {
                event.replyCount = this.getRepliesCount(eventId);
                event.replies = this.repliesMap.get(eventId) || [];
                event.likeCount = this.getLikesCount(eventId);
                event.likers = this.likesMap.get(eventId) || [];
                event.zapCount = this.getZapsCount(eventId);
                event.zappers = this.zapsMap.get(eventId) || [];
                event.repostCount = this.getRepostsCount(eventId);
                event.reposters = this.repostsMap.get(eventId) || [];
            }
            return event;
        });
        this.eventsSubject.next(updatedEvents);
    }

    private async fetchMultiFilterEvents(eventId: string): Promise<any> {
        const multiFilter: Filter[] = [
            { '#e': [eventId], kinds: [1] },
            { '#e': [eventId], kinds: [7] },
            { '#e': [eventId], kinds: [9735] },
            { '#e': [eventId], kinds: [6] }
        ];

        const eventMap = new Map<string, NostrEvent>();

        const replies: NewEvent[] = [];
        const likers: string[] = [];
        const zappers: string[] = [];
        const reposters: string[] = [];

         const eventObservable = this.queueService.addRequestToQueue(multiFilter);

        return new Promise((resolve, reject) => {
            eventObservable.subscribe({
                next: async (event: NostrEvent) => {
                    if (!eventMap.has(event.id)) {
                        eventMap.set(event.id, event);
                    }

                     if (event.kind === 1) {
                        const newEvent = await this.createNewEvent(event);
                        replies.push(newEvent);
                    } else if (event.kind === 7) {
                        likers.push(event.pubkey);
                    } else if (event.kind === 9735) {
                        zappers.push(event.pubkey);
                    } else if (event.kind === 6) {
                        reposters.push(event.pubkey);
                    }
                },
                error: (err) => {
                    console.error('Error fetching events:', err);
                    reject(err);
                },
                complete: () => {
                     resolve({
                        replies: replies,
                        likers: likers,
                        zappers: zappers,
                        reposters: reposters
                    });
                }
            });
        });
    }



    getRepliesCount(eventId: string): number {
        return (this.repliesMap.get(eventId) || []).length;
    }

    getLikesCount(eventId: string): number {
        return (this.likesMap.get(eventId) || []).length;
    }

    getZapsCount(eventId: string): number {
        return (this.zapsMap.get(eventId) || []).length;
    }

    getRepostsCount(eventId: string): number {
        return (this.repostsMap.get(eventId) || []).length;
    }

    hasUserLiked(eventId: string): boolean {
        return this.hasLikedMap.get(eventId) || false;
    }

    hasUserReposted(eventId: string): boolean {
        return this.hasRepostedMap.get(eventId) || false;
    }

    getEventStream(): Observable<NewEvent[]> {
        return this.eventsSubject.asObservable().pipe(throttleTime(1000));
    }

    hasMoreEvents(): Observable<boolean> {
        return this.noMoreEvents.asObservable();
    }

    async sendTextEvent(content: string): Promise<void> {
        if (!content) return;

        try {
            const tags: string[][] = [];

            const unsignedEvent = this.signerService.getUnsignedEvent(
                1,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
        } catch (error) {
            console.error('Failed to send text event:', error);
        }
    }

    async sendLikeEvent(event: NewEvent): Promise<void> {
        if (!event) return;

        try {
            const tags = [
                ['e', event.id],
                ['p', event.pubkey],
            ];
            const content = '+';

            const unsignedEvent = this.signerService.getUnsignedEvent(
                7,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);

            this.likesMap.set(event.id, [
                ...(this.likesMap.get(event.id) || []),
                this.signerService.getPublicKey(),
            ]);
            this.hasLikedMap.set(event.id, true);
        } catch (error) {
            console.error('Failed to send like event:', error);
        }
    }

    async sendZapEvent(event: NewEvent, zapAmount: number): Promise<void> {
        if (!event || zapAmount <= 0) return;

        try {
            const tags = [
                ['e', event.id],
                ['p', event.pubkey],
                ['amount', zapAmount.toString()],
            ];
            const content = `Zapped with ${zapAmount} sats`;

            const unsignedEvent = this.signerService.getUnsignedEvent(
                9735,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
        } catch (error) {
            console.error('Failed to send zap event:', error);
        }
    }

    async sendReplyEvent(
        parentEvent: NewEvent,
        replyContent: string
    ): Promise<void> {
        if (!parentEvent) return;

        try {
            const tags = [
                ['e', parentEvent.id],
                ['p', parentEvent.pubkey],
            ];

            const unsignedEvent = this.signerService.getUnsignedEvent(
                1,
                tags,
                replyContent
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
        } catch (error) {
            console.error('Failed to send reply event:', error);
        }
    }

    clearEvents(): void {
        this.eventsSubject.next([]);
        this.seenEventIds.clear();
        this.lastLoadedEventTime = null;
        this.noMoreEvents.next(false);
    }
}
