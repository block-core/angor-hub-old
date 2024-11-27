import { AngorCardComponent } from '@angor/components/card';
import { AngorConfigService } from '@angor/services/config';
import { AngorConfirmationService } from '@angor/services/confirmation';
import { Clipboard } from '@angular/cdk/clipboard';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { PostComponent } from 'app/layout/common/post/post.component';
import { BookmarkService } from 'app/services/bookmark.service';
import { EventService } from 'app/services/event.service';
import { ZapDialogData } from 'app/services/interfaces';
import { ParseContentService } from 'app/services/parse-content.service';
import { SignerService } from 'app/services/signer.service';
import { ContactEvent, StorageService } from 'app/services/storage.service';
import { SubscriptionService } from 'app/services/subscription.service';
import { ZapDialogComponent } from 'app/shared/zap-dialog/zap-dialog.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Filter, NostrEvent } from 'nostr-tools';
import { Observable, Subject } from 'rxjs';
interface Chip {
    color?: string;
    selected?: string;
    name: string;
}

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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
        NgClass,
        CommonModule,
        FormsModule,
        PickerComponent,
        MatSlideToggle,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        MatIconModule,
        MatExpansionModule,
        MatSidenavModule,
        PostComponent,
    ],
})
export class ProfileComponent implements OnInit, OnDestroy {
    @ViewChild('eventInput', { static: false }) eventInput: ElementRef;
    @ViewChild('commentInput') commentInput: ElementRef;

    darkMode: boolean = false;
    isLoading: boolean = true;
    errorMessage: string | null = null;

    profileUser: any;

    currentUser: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public currentUserPubKey: string;
    public routePubKey;

    allPublicKeys: string[] = [];
    isCurrentUserProfile: Boolean = false;
    isFollowing = false;

    showEmojiPicker = false;
    showCommentEmojiPicker = false;
    sats: string;
    paymentInvoice: string = '';
    invoiceAmount: string = '?';
    isLiked = false;
    isPreview = false;
    posts: any[] = [];

    currentPage = 1;
    loading = false;
    myLikes: NostrEvent[] = [];
    myLikedNoteIds: string[] = [];

    isLoadingPosts: boolean = true;
    noEventsMessage: string = '';
    loadingTimeout: any;

    subscriptionId: string;
    postsSubscriptionId: string;

    public hasMorePosts: boolean = true;

    followersList: ContactEvent[] = [];
    followingList: ContactEvent[] = [];
    aboutExpanded: boolean = true;

    stats$!: Observable<{
        pubKey: string;
        totalContacts: number;
        followersCount: number;
        followingCount: number;
    }>;

    bookmarks$: Observable<string[]>;
    bookmarkedProjectNpubs: string[] = [];
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _signerService: SignerService,
        private _storageService: StorageService,
        private _sanitizer: DomSanitizer,
        private _route: ActivatedRoute,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _angorConfigService: AngorConfigService,
        private _angorConfirmationService: AngorConfirmationService,
        private _eventService: EventService,
        private _subscriptionService: SubscriptionService,
        private _clipboard: Clipboard,
        public parseContent: ParseContentService,
        private _bookmarkService: BookmarkService
    ) {
        this.bookmarks$ = this._bookmarkService.bookmarks$;
    }

    async ngOnInit(): Promise<void> {
        this.initializeTheme();
        this.processRouteParams();
        this.loadInitialPosts();
        this.subscribeToNewPosts();
    }

    private initializeTheme(): void {
        this._angorConfigService.config$.subscribe((config) => {
            if (config.scheme === 'auto') {
                this.detectSystemTheme();
            } else {
                this.darkMode = config.scheme === 'dark';
            }
        });
    }

    trackByFn(index: number, item: any): number {
        return index;
    }

    private checkIfRoutePubKeyIsFollowing(): void {
        if (!this.routePubKey || !this.followersList) {
            this.isFollowing = false;
            return;
        }

        this.isFollowing = this.followersList.some(
            (follower) => follower.pubkey === this.routePubKey
        );
    }

    private processRouteParams(): void {
        this._route.paramMap.subscribe((params) => {
            const routeKey = params.get('pubkey') || '';

            if (routeKey) {
                const hexPubKey = this._signerService.processKey(routeKey);
                if (hexPubKey) {
                    this.routePubKey = hexPubKey;
                    this.isCurrentUserProfile = false;
                } else {
                    this.errorMessage =
                        'Public key is invalid. Please check your input.';
                    this.setCurrentUserProfile();
                }
            } else {
                this.setCurrentUserProfile();
            }

            this.loadUserProfileData(this.routePubKey);
        });
    }

    private setCurrentUserProfile(): void {
        this.isCurrentUserProfile = true;
        this.routePubKey = this._signerService.getPublicKey();
    }

    private loadUserProfileData(pubKey: string): void {
        this.loadUserProfile(pubKey);
    }

    private isValidHexPubkey(pubkey: string): boolean {
        const hexPattern = /^[a-fA-F0-9]{64}$/;
        return hexPattern.test(pubkey);
    }

    private async loadInitialPosts(): Promise<void> {
        this.loading = true;
        let attemptCount = 0;
        const maxAttempts = 5;
        const delay = 3000;

        try {
            while (attemptCount < maxAttempts) {
                const additionalPosts =
                    await this._storageService.getPostsByPubKeysWithPagination(
                        [this.routePubKey],
                        this.currentPage,
                        10
                    );

                if (additionalPosts.length > 0) {
                    this.posts = [...this.posts, ...additionalPosts];
                    this.posts.sort((a, b) => b.created_at - a.created_at);
                    break;
                } else {
                    attemptCount++;
                    if (attemptCount < maxAttempts) {
                        await this.delay(delay);
                    }
                }
            }

            this.hasMorePosts = this.posts.length > 0;
            if (!this.hasMorePosts) {
                console.log('This user has no posts.');
            }
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            this.loading = false;
        }

        this.refreshUI();
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private subscribeToNewPosts(): void {
        if (!this.isCurrentUserProfile) {
            const filters: Filter[] = [
                { authors: [this.routePubKey], kinds: [1] },
            ];
            this.postsSubscriptionId =
                this._subscriptionService.addSubscriptions(
                    filters,
                    async (event: NostrEvent) => {
                        if (!this.isReply(event)) {
                            this._storageService.savePost(event);
                        }
                    }
                );
        } else {
            this._storageService.posts$.subscribe((newPost) => {
                if (newPost) {
                    if (newPost.pubkey === this.routePubKey) {
                        this.posts.unshift(newPost);
                        this.posts.sort((a, b) => b.created_at - a.created_at);
                        this.refreshUI();
                    }
                }
            });
        }
    }

    private isReply(event: NostrEvent): boolean {
        const replyTags = event.tags.filter(
            (tag) => tag[0] === 'e' || tag[0] === 'p'
        );
        return replyTags.length > 0;
    }

    loadNextPage(): void {
        if (this.loading) return;
        this.currentPage++;
        this.loadInitialPosts();
    }

    toggleAbout(): void {
        this.aboutExpanded = !this.aboutExpanded;
    }

    ngOnDestroy(): void {
        if (this.subscriptionId) {
            this._subscriptionService.removeSubscriptionById(
                this.subscriptionId
            );
        }
        if (this.postsSubscriptionId) {
            this._subscriptionService.removeSubscriptionById(
                this.postsSubscriptionId
            );
        }

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    async loadUserProfile(publicKey: string): Promise<void> {
        this.isLoading = true;
        this.errorMessage = null;
        this.profileUser = null;

        this.refreshUI();

        if (!publicKey) {
            this.errorMessage = 'No public key found. Please log in again.';
            this.isLoading = false;
            this.refreshUI();
            return;
        }
        try {
            const cachedMetadata =
                await this._storageService.getProfile(publicKey);
            if (cachedMetadata) {
                this.profileUser = cachedMetadata;
                this.refreshUI();
            }

            this.subscribeToUserProfileAndContacts(publicKey);
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    private async subscribeToUserProfileAndContacts(
        pubKey: string
    ): Promise<void> {
        const combinedFilters: Filter[] = [
            // Profile filter (kind 0)
            { authors: [pubKey], kinds: [0], limit: 1 },
        ];

        this.subscriptionId = this._subscriptionService.addSubscriptions(
            combinedFilters,
            async (event: NostrEvent) => {
                // Handle profile metadata
                await this.processProfileMetadata(event, pubKey);
            }
        );
    }

    private async processProfileMetadata(
        event: NostrEvent,
        pubKey: string
    ): Promise<void> {
        try {
            const newMetadata = JSON.parse(event.content);
            this.profileUser = newMetadata;
            // Save profile data
            await this._storageService.saveProfile(pubKey, newMetadata);

            // Trigger UI update
            this._changeDetectorRef.markForCheck();
        } catch (error) {
            console.error('Error processing metadata event:', error);
        }
    }

    getSafeUrl(url: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(url);
    }

    private refreshUI(): void {
        this._changeDetectorRef.detectChanges();
    }

    openSnackBar(message: string, action: string = 'dismiss'): void {
        this._snackBar.open(message, action, { duration: 3000 });
    }

    async canUseZap(): Promise<boolean> {
        const canReceiveZap =
            this.profileUser &&
            (this.profileUser.lud06 || this.profileUser.lud16);
        if (canReceiveZap) {
            return true;
        } else {
            this.openSnackBar(
                'Using Zap is not possible. Please complete your profile to include lud06 or lud16.'
            );
            return false;
        }
    }

    async openZapDialog(eventId: string = ''): Promise<void> {
        const canZap = await this.canUseZap();
        if (canZap) {
            const zapData: ZapDialogData = {
                lud16: this.profileUser.lud16,
                lud06: this.profileUser.lud06,
                pubkey: this.profileUser.pubkey,
                eventId: eventId,
            };

            // Open dialog with mapped data
            this._dialog.open(ZapDialogComponent, {
                width: '405px',
                maxHeight: '90vh',
                data: zapData,
            });
        }
    }

    toggleLike() {
        this.isLiked = !this.isLiked;

        if (this.isLiked) {
            setTimeout(() => {
                this.isLiked = false;
                this.isLiked = true;
            }, 300);
        }
    }

    addEmoji(event: any) {
        this.eventInput.nativeElement.value += event.emoji.native;
        this.showEmojiPicker = false;
    }

    toggleEmojiPicker() {
        this.showCommentEmojiPicker = false;
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    addEmojiTocomment(event: any) {
        this.commentInput.nativeElement.value += event.emoji.native;
        this.showCommentEmojiPicker = false;
    }

    detectSystemTheme() {
        const darkSchemeMedia = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        this.darkMode = darkSchemeMedia.matches;

        darkSchemeMedia.addEventListener('change', (event) => {
            this.darkMode = event.matches;
        });
    }

    togglePreview() {
        this.isPreview = !this.isPreview;
    }

    sendEvent() {
        if (this.eventInput.nativeElement.value != '') {
            this._eventService
                .sendTextEvent(this.eventInput.nativeElement.value)
                .then(() => {
                    this.eventInput.nativeElement.value = '';
                    this._changeDetectorRef.markForCheck();
                })
                .catch((error) => {
                    console.error('Failed to send Event:', error);
                });
        }
    }

    copyHex() {
        this._clipboard.copy(this.routePubKey);
        this.openSnackBar('hex public key copied', 'dismiss');
    }

    copyNpub() {
        var npub = this._signerService.getNpubFromPubkey(this.routePubKey);
        this._clipboard.copy(npub);
        this.openSnackBar('npub public key copied', 'dismiss');
    }

    copyKey(keyType: string) {
        if (keyType === 'hex') {
            this._clipboard.copy(this.routePubKey);
            this.openSnackBar('hex public key copied', 'dismiss');
        } else if (keyType === 'npub') {
            const npub = this._signerService.getNpubFromPubkey(
                this.routePubKey
            );
            this._clipboard.copy(npub);
            this.openSnackBar('npub public key copied', 'dismiss');
        }
    }

    isSingleEmojiOrWord(token: string): boolean {
        const trimmedToken = token.trim();
        const isSingleWord = /^\w+$/.test(trimmedToken);

        const isSingleEmoji = /^[\p{Emoji}]+$/u.test(trimmedToken);

        return isSingleWord || isSingleEmoji;
    }

    openPost(postId: string): void {
        this._router.navigate(['/post', postId]);
    }

    async toggleBookmark(projectNpub: string): Promise<void> {
        const isBookmarked =
            await this._bookmarkService.isBookmarked(projectNpub);
        if (isBookmarked) {
            await this._bookmarkService.removeBookmark(projectNpub);
        } else {
            await this._bookmarkService.addBookmark(projectNpub);
        }
    }

    async isProjectBookmarked(projectNpub: string): Promise<boolean> {
        return await this._bookmarkService.isBookmarked(projectNpub);
    }
}
