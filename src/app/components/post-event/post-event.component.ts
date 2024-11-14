import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription, BehaviorSubject, Subject, from } from 'rxjs';
import { concatMap, delay, takeUntil } from 'rxjs/operators';
import { StorageService } from 'app/services/storage.service';
import { SubscriptionService } from 'app/services/subscription.service';
import { MetadataService } from 'app/services/metadata.service';
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
import { AgoPipe } from "../../shared/pipes/ago.pipe";
import { ParseContentService } from 'app/services/parse-content.service';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ContactInfoComponent } from '../chat/contact-info/contact-info.component';
import { Filter, NostrEvent } from 'nostr-tools';
import { ReplayProfileComponent } from './replay-profile/replay-profile.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



export interface PostReaction {
    pubkey: string;
    created_at: number;
    content?: string;
}

@Component({
    selector: 'app-post-event',
    standalone: true,
    imports: [
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
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        MatExpansionModule,
        MatSidenavModule,
        AgoPipe,
        MatProgressSpinnerModule,
        ReplayProfileComponent,

    ],
    templateUrl: './post-event.component.html',
    styleUrls: ['./post-event.component.scss']
})
export class PostEventComponent implements OnInit, OnDestroy {
    postId: string | null = null;
    post: any = null;
    user:any = null;
    loading = true;
    loadingReactions = true;
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    likes: PostReaction[] = [];
    reposts: PostReaction[] = [];
    zaps: PostReaction[] = [];
    replies: PostReaction[] = [];
    subscriptionId: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _storageService: StorageService,
        private subscriptionService: SubscriptionService,
        private metadataQueueService: MetadataService,
        private _changeDetectorRef: ChangeDetectorRef,
        public parseContent: ParseContentService,
        private _sanitizer: DomSanitizer,

    ) { }

    ngOnInit(): void {
        this._route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
            this.postId = params.get('id');
            if (this.postId) {
                this.loadPost(this.postId);
                this.subscribeToReactions(this.postId);
            }
        });

    }


    private async loadUserProfile(): Promise<void> {

        this._storageService.getProfile(this.post.pubkey).then((metadata) => {
            this.user = metadata;
            console.log(this.user);

            this._changeDetectorRef.detectChanges();
        });

    }

    async loadPost(postId: string): Promise<void> {
        try {
            this.loading = true;
            this.post = await this._storageService.getPostById(postId);

            this.loadUserProfile();

            this._storageService.profile$.subscribe((data) => {
                if (data && data.pubKey === this.post.pubkey) {
                    this.user = data.metadata;
                    this._changeDetectorRef.detectChanges();
                }
            });

            this.loading = false;
        } catch (error) {
            console.error('Error loading post:', error);
            this._router.navigate(['/404']);
        }
    }

    getSafeUrl(url: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(url);
    }

    private subscribeToReactions(postId: string): void {
        this.loadingReactions = true;

        let loadingTimeout: any;


        loadingTimeout = setTimeout(() => {
            this.loadingReactions = false;
        }, 3000);

        const filter: Filter[] = [
            { '#e': [postId], kinds: [1,7,9735,6] }
        ];

        this.subscriptionId = this.subscriptionService.addSubscriptions(filter, async (event: NostrEvent) => {
            if (this.loadingReactions) {
                this.loadingReactions = false;
                clearTimeout(loadingTimeout);
            }

             const reaction: PostReaction = {
                pubkey: event.pubkey,
                 created_at: event.created_at,
                content: event.kind === 1 ? event.content : undefined
            };

            this.addReaction(postId, event.kind, reaction);
        });
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

        if (this.subscriptionId) {
            this.subscriptionService.removeSubscriptionById(this.subscriptionId);
        }
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
