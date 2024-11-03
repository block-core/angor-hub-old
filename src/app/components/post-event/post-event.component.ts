import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, BehaviorSubject, Subject, from } from 'rxjs';
import { concatMap, delay, takeUntil } from 'rxjs/operators';
import { StorageService } from 'app/services/storage.service';
import { SubscriptionService } from 'app/services/subscription.service';
import { MetadataQueueService } from 'app/services/metadata-queue.service';
import { AngorCardComponent } from '@angor/components/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrlPipe } from 'app/shared/pipes/safe-url.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EventListComponent } from '../event-list/event-list.component';
import { AgoPipe } from "../../shared/pipes/ago.pipe";
import { ParseContentService } from 'app/services/parse-content.service';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ContactInfoComponent } from '../chat/contact-info/contact-info.component';
import { Filter, NostrEvent } from 'nostr-tools';

export interface UserProfile {
    name?: string;
    picture?: string;
    pubkey: string;
}

export interface PostReaction {
    user: UserProfile;
    created_at: number;
    content?: string;
}

@Component({
    selector: 'app-post-event',
    standalone: true,
    imports: [
        RouterLink,
        AngorCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatDividerModule,
        MatTooltipModule,
        CommonModule,
        FormsModule,
        QRCodeModule,
        PickerComponent,
        MatSlideToggle,
        SafeUrlPipe,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        EventListComponent,
        MatExpansionModule,
        MatSidenavModule,
        ContactInfoComponent,
        DatePipe,
        AgoPipe,
    ],
    templateUrl: './post-event.component.html',
    styleUrls: ['./post-event.component.scss']
})
export class PostEventComponent implements OnInit, OnDestroy {
    postId: string | null = null;
    post: any = null;
    loading = true;
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    likes: PostReaction[] = [];
    reposts: PostReaction[] = [];
    zaps: PostReaction[] = [];
    replies: PostReaction[] = [];
    private reactionQueue: Set<string> = new Set();
    private processingQueue = false;
    private reactionBatchSize = 5;
    private debounceDelay = 3000;
    subscriptionId:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _storageService: StorageService,
        private subscriptionService: SubscriptionService,
        private metadataQueueService: MetadataQueueService,
        private _changeDetectorRef: ChangeDetectorRef,
        public parseContent: ParseContentService
    ) {}

    ngOnInit(): void {
        this._route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
            this.postId = params.get('id');
            if (this.postId) {
                this.loadPost(this.postId);
                this.addToQueue(this.postId);
                this.processQueue();
            }
        });
    }

    async loadPost(postId: string): Promise<void> {
        try {
            this.loading = true;
            this.post = await this._storageService.getPostById(postId);
            this.loading = false;
        } catch (error) {
            console.error('Error loading post:', error);
            this._router.navigate(['/404']);
        }
    }

    private addToQueue(postId: string): void {
        if (!this.reactionQueue.has(postId)) {
            this.reactionQueue.add(postId);
        }
    }

    private processQueue(): void {
        if (this.processingQueue || this.reactionQueue.size === 0) return;

        this.processingQueue = true;
        const postIdsToProcess = Array.from(this.reactionQueue).slice(0, this.reactionBatchSize);
        this.reactionQueue = new Set(Array.from(this.reactionQueue).slice(this.reactionBatchSize));

        from(postIdsToProcess).pipe(
            concatMap(postId => this.subscribeToReactions(postId).pipe(delay(this.debounceDelay))),
            takeUntil(this._unsubscribeAll)
        ).subscribe({
            complete: () => {
                this.processingQueue = false;
                if (this.reactionQueue.size > 0) {
                    this.processQueue();
                }
            }
        });
    }

    private subscribeToReactions(postId: string): Subject<void> {
        const subject = new Subject<void>();

        const filter: Filter[] = [
            { '#e': [postId], kinds: [1] },
            { '#e': [postId], kinds: [7] },
            { '#e': [postId], kinds: [9735] },
            { '#e': [postId], kinds: [6] }
        ];

        this.subscriptionId = this.subscriptionService.addSubscriptions(filter, async (event: NostrEvent) => {
            const userProfile = await this.getUserProfile(event.pubkey);
            const reaction: PostReaction = {
                user: userProfile,
                created_at: event.created_at,
                content: event.kind === 1 ? event.content : undefined
            };

            this.addReaction(postId, event.kind, reaction);
            this.metadataQueueService.addPublicKey(event.pubkey);
            subject.next();

            if (this.reactionQueue.has(postId)) {
                this.reactionQueue.delete(postId);
            }

            this.subscriptionService.removeSubscriptionById(this.subscriptionId);
            subject.complete();
        });

        return subject;
    }

    private async getUserProfile(pubkey: string): Promise<UserProfile> {
        const profile = await this._storageService.getProfile(pubkey);
        return profile || { pubkey, name: 'Loading...', picture: '/images/avatars/avatar-placeholder.png' };
    }

    private addReaction(postId: string, kind: number, reaction: PostReaction): void {
        switch (kind) {
            case 1:
                this.replies.push(reaction);
                this.replies.sort((a, b) => b.created_at - a.created_at);
                break;
            case 7:
                this.likes.push(reaction);
                break;
            case 9735:
                this.zaps.push(reaction);
                break;
            case 6:
                this.reposts.push(reaction);
                break;
        }
        this._changeDetectorRef.detectChanges();
    }


    isSingleEmojiOrWord(token: string): boolean {
        const trimmedToken = token.trim();
        const isSingleWord = /^\w+$/.test(trimmedToken);
        const isSingleEmoji = /^[\p{Emoji}]+$/u.test(trimmedToken);
        return isSingleWord || isSingleEmoji;
    }

    ngOnDestroy(): void {
        this.subscriptionService.removeSubscriptionById(this.subscriptionId);
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
