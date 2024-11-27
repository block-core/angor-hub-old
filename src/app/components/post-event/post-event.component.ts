import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from 'app/services/storage.service';
import { SubscriptionService } from 'app/services/subscription.service';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgoPipe } from "../../shared/pipes/ago.pipe";
import { ParseContentService } from 'app/services/parse-content.service';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Filter, NostrEvent } from 'nostr-tools';
import { ReplayProfileComponent } from './replay-profile/replay-profile.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PostComponent } from 'app/layout/common/post/post.component';
import { EventService } from 'app/services/event.service';
import { AngorConfirmationService } from '@angor/services/confirmation';
import { ZapService } from 'app/services/zap.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';


export interface PostReaction {
    pubkey: string;
    created_at: number;
    content?: string;
}

@Component({
    selector: 'app-post-event',
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
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        MatExpansionModule,
        MatSidenavModule,
        AgoPipe,
        MatProgressSpinnerModule,
        ReplayProfileComponent,
        PostComponent,
        PickerComponent,
    ],
    templateUrl: './post-event.component.html',
    styleUrls: ['./post-event.component.scss']
})
export class PostEventComponent implements OnInit, OnDestroy {
    postId: string | null = null;
    post: any = null;
    user: any = null;
    loading = true;
    loadingReactions = true;
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    private subscription: Subscription = new Subscription();

    // TODO: This should obviously not be on the component but come from some service. Added to fix strict mode.
    darkMode: boolean = false;

    likes: PostReaction[] = [];
    reposts: PostReaction[] = [];
    zaps: PostReaction[] = [];
    replies: PostReaction[] = [];
    subscriptionId: string;
    isLiked = false;
    showEmojiPicker: boolean;
    comment: string;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _storageService: StorageService,
        private _subscriptionService: SubscriptionService,
        private _changeDetectorRef: ChangeDetectorRef,
        public  _parseContent: ParseContentService,
        private _sanitizer: DomSanitizer,
        private _eventService: EventService,
        private _angorConfirmationService: AngorConfirmationService,
        private _zapService: ZapService

    ) { }

    ngOnInit(): void {
        this._route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
            this.postId = params.get('id');
            if (this.postId) {
                this.loadPost(this.postId);
                this.subscribeToReactions(this.postId);
            }
        });

        this.subscription = this._storageService.myLikes$.subscribe((likes: string[]) => {
            if (likes && likes.includes(this.postId)) {
                this.isLiked = true;
                this._changeDetectorRef.detectChanges();
            } else {
                this.isLiked = false;
            }
        });
    }


    private async loadUserProfile(): Promise<void> {

        this._storageService.getProfile(this.post.pubkey).then((metadata) => {
            this.user = metadata;
            this._changeDetectorRef.detectChanges();
        });

    }

    async loadPost(postId: string): Promise<void> {
        try {
            this.loading = true;

            this.post = await this._storageService.getPostById(postId);

            if (!this.post) {
                const filter: Filter[] = [
                    { ids: [postId], kinds: [1], limit: 1 }
                ];

                const subscriptionId = this._subscriptionService.addSubscriptions(filter, async (event: NostrEvent) => {
                    this.post = event;
                    console.log( this.post);

                    this._changeDetectorRef.detectChanges();

                    await this._storageService.savePost(event);

                    this._changeDetectorRef.detectChanges();

                    if (subscriptionId) {
                        this._subscriptionService.removeSubscriptionById(subscriptionId);
                    }
                    this.loading = false;
                });
            } else {
                this.loading = false;
                await this.loadUserProfile();
            }


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
            { '#e': [postId], kinds: [1, 7, 9735, 6] }
        ];

        this.subscriptionId = this._subscriptionService.addSubscriptions(filter, async (event: NostrEvent) => {
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

    sendLike(event: NostrEvent): void {
        if (!this.isLiked) {
          this._eventService.sendLikeEvent(event).then(() => {
             this.isLiked = true;
             this._changeDetectorRef.detectChanges();
          }).catch(error => console.error('Failed to send like:', error));
        }
      }

      toggleLike(event: NostrEvent): void {
        this.sendLike(event);
      }

      onShare(event: NostrEvent): void {
        const dialogRef = this._angorConfirmationService.open({
            title: 'Share',
            message:
                'Are you sure you want to share this post on your profile? <span class="font-medium">This action is permanent and cannot be undone.</span>',
            icon: {
                show: true,
                name: 'heroicons_solid:share',
                color: 'primary',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Yes, Share',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result === "confirmed") {
                 this._eventService.shareEvent(event).then(() => {
                     this._changeDetectorRef.detectChanges();
                 }).catch(error => console.error('Failed to share post', error));

            }
        });
    }


    openZapDialog() {
        this._zapService.openZapDialog(this.postId, this.user);
    }


    sendComment(event: NostrEvent): void {
         if (this.comment.trim() !== '') {
          this._eventService.sendReplyEvent(event, this.comment).then(() => {
            this.comment = '';
            this._changeDetectorRef.markForCheck();
          });
        }
      }

      toggleEmojiPicker(): void {
        this.showEmojiPicker = !this.showEmojiPicker;
      }

      addEmoji(event: any): void {
        if (event && event.emoji && event.emoji.native) {
            this.comment = (this.comment || '') + event.emoji.native;
        }
        this.showEmojiPicker = false;
    }

    ngOnDestroy(): void {

        if (this.subscriptionId) {
            this._subscriptionService.removeSubscriptionById(this.subscriptionId);
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
