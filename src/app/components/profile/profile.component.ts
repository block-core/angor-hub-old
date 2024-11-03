import { AngorCardComponent } from '@angor/components/card';
import { AngorConfigService } from '@angor/services/config';
import { AngorConfirmationService } from '@angor/services/confirmation';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { bech32 } from '@scure/base';
import { QRCodeModule } from 'angularx-qrcode';
import { PaginatedEventService } from 'app/services/event.service';
import { LightningService } from 'app/services/lightning.service';
import { SignerService } from 'app/services/signer.service';
import { SocialService } from 'app/services/social.service';
import { StorageService } from 'app/services/storage.service';
import { SafeUrlPipe } from 'app/shared/pipes/safe-url.pipe';
import { LightningInvoice, LightningResponse, Post } from 'app/types/post';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Filter, NostrEvent } from 'nostr-tools';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EventListComponent } from '../event-list/event-list.component';
import { ReceiveDialogComponent } from './zap/receive-dialog/receive-dialog.component';
import { SendDialogComponent } from './zap/send-dialog/send-dialog.component';
import { SubscriptionService } from 'app/services/subscription.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParseContentService } from 'app/services/parse-content.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactInfoComponent } from '../chat/contact-info/contact-info.component';
import { AgoPipe } from 'app/shared/pipes/ago.pipe';
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
        QRCodeModule,
        PickerComponent,
        MatSlideToggle,
        SafeUrlPipe,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        EventListComponent,
        MatIconModule,
        MatExpansionModule,
        MatSidenavModule,
        ContactInfoComponent,
        NgTemplateOutlet,
        DatePipe,
        AgoPipe,

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
    lightningResponse: LightningResponse | null = null;
    lightningInvoice: LightningInvoice | null = null;
    sats: string;
    paymentInvoice: string = '';
    invoiceAmount: string = '?';
    isLiked = false;
    isPreview = false;
    posts: any[] = [];
    likes: any[] = [];

    currentPage = 1;
    loading = false;
    myLikes: NostrEvent[] = [];
    myLikedNoteIds: string[] = [];

    isLoadingPosts: boolean = true;
    noEventsMessage: string = '';
    loadingTimeout: any;

    subscriptionId: string;

    totalContacts: number = 0;
    followersCount: number = 0;
    followingCount: number = 0;
    aboutExpanded: boolean = true;


    stats$!: Observable<{ pubKey: string, totalContacts: number, followersCount: number, followingCount: number }>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _signerService: SignerService,
        private _storageService: StorageService,
        private _sanitizer: DomSanitizer,
        private _route: ActivatedRoute,
        private _router: Router,
        private _socialService: SocialService,
        private _snackBar: MatSnackBar,
        private _lightning: LightningService,
        private _dialog: MatDialog,
        private _angorConfigService: AngorConfigService,
        private _angorConfirmationService: AngorConfirmationService,
        private _eventService: PaginatedEventService,
        private _subscriptionService: SubscriptionService,
        private _clipboard: Clipboard,
        private parseContent: ParseContentService
    ) { }

    async ngOnInit(): Promise<void> {

        this._angorConfigService.config$.subscribe((config) => {
            if (config.scheme === 'auto') {
                this.detectSystemTheme();
            } else {
                this.darkMode = config.scheme === 'dark';
            }
        });
        this._route.paramMap.subscribe((params) => {
            const routePubKey = params.get('pubkey');
            if (!routePubKey) {
                this.isCurrentUserProfile = true;
                const currentUserPubKey = this._signerService.getPublicKey();

                this.routePubKey = currentUserPubKey;
            }
            else {
                this.routePubKey = routePubKey;
            }
            this.loadProfileUser(this.routePubKey);

            this.stats$ = this._storageService.getContactStats$(this.routePubKey);

        });
        this.loadInitialPosts();
        this.subscribeToNewPosts();

    }

    private async loadInitialPosts(): Promise<void> {
        this.loading = true;
        try {
            await this._storageService.loadPosts(this.currentPage);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            this.loading = false;
        }
        this._changeDetectorRef.detectChanges();
    }


    private subscribeToNewPosts(): void {
        this._storageService.posts$.subscribe((newPost) => {
            if (newPost && !this.posts.some((p) => p.id === newPost.id)) {
                this.posts.push(newPost);
                this.posts.sort((a, b) => b.created_at - a.created_at);
                this._changeDetectorRef.detectChanges();
            }
        });
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
            this._subscriptionService.removeSubscriptionById(this.subscriptionId);
        }
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    async loadProfileUser(publicKey: string): Promise<void> {
        this.isLoading = true;
        this.errorMessage = null;
        this.profileUser = null;

        this._changeDetectorRef.detectChanges();

        if (!publicKey) {
            this.errorMessage = 'No public key found. Please log in again.';
            this.isLoading = false;
            this._changeDetectorRef.detectChanges();
            return;
        }


        try {

            const cachedMetadata = await this._storageService.getProfile(publicKey);
            if (cachedMetadata) {
                this.profileUser = cachedMetadata;
                this._changeDetectorRef.detectChanges();
            }


            this.subscribeToUserProfile(publicKey);
        } catch (error) {
            console.error('Error loading user profile:', error);
        }

    }


    private subscribeToUserProfile(pubKey: string): void {
        const filters: Filter[] = [
            { authors: [pubKey], kinds: [0], limit: 1 }
        ];

        this.subscriptionId = this._subscriptionService.addSubscriptions(filters, async (event: NostrEvent) => {
            try {
                const newMetadata = JSON.parse(event.content);
                this.profileUser = newMetadata;

                // Set followers and following counts, ensure they're integers and not null or undefined
                this.followersCount = newMetadata.followersCount ?? 0;
                this.followingCount = newMetadata.followingCount ?? 0;

                // Save profile data
                await this._storageService.saveProfile(pubKey, newMetadata);

                // Mark for check to force UI update
                this._changeDetectorRef.markForCheck();
            } catch (error) {
                console.error('Error processing metadata event:', error);
            }
        });
    }



    getSafeUrl(url: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(url);
    }

    async toggleFollow(): Promise<void> {
        try {
            const userPubKey = this._signerService.getPublicKey();
            const routePubKey = this.routePubKey || this.currentUserPubKey;

            if (!routePubKey || !userPubKey) {
                console.error('Public key missing. Unable to toggle follow.');
                return;
            }

            if (this.isFollowing) {
                await this._socialService.unfollow(routePubKey);
                console.log(`Unfollowed ${routePubKey}`);

            } else {
                await this._socialService.follow(routePubKey);
                console.log(`Followed ${routePubKey}`);
            }

            this.isFollowing = !this.isFollowing;

            this._changeDetectorRef.detectChanges();
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, { duration: 1300 });
    }

    getLightningInfo() {
        let lightningAddress = '';
        if (this.profileUser?.lud06) {
            const { words } = bech32.decode(this.profileUser.lud06, 5000);
            const data = new Uint8Array(bech32.fromWords(words));
            lightningAddress = new TextDecoder().decode(Uint8Array.from(data));
        } else if (this.profileUser?.lud16?.toLowerCase().startsWith('lnurl')) {
            const { words } = bech32.decode(this.profileUser.lud16, 5000);
            const data = new Uint8Array(bech32.fromWords(words));
            lightningAddress = new TextDecoder().decode(Uint8Array.from(data));
        } else if (this.profileUser?.lud16) {
            lightningAddress = this._lightning.getLightningAddress(
                this.profileUser.lud16
            );
        }
        if (lightningAddress !== '') {
            this._lightning
                .getLightning(lightningAddress)
                .subscribe((response) => {
                    this.lightningResponse = response;
                    if (this.lightningResponse.status === 'Failed') {
                        this.openSnackBar(
                            'Failed to lookup lightning address',
                            'dismiss'
                        );
                    } else if (this.lightningResponse.callback) {
                        this.openZapDialog();
                    } else {
                        this.openSnackBar(
                            "couldn't find user's lightning address",
                            'dismiss'
                        );
                    }
                });
        } else {
            this.openSnackBar('No lightning address found', 'dismiss');
        }
    }

    async zap() {
        if (
            this.profileUser &&
            (this.profileUser.lud06 || this.profileUser.lud16)
        ) {
            this.getLightningInfo();
        } else {
            this.openSnackBar("user can't receive zaps", 'dismiss');
        }
    }

    openZapDialog(): void {
        this._dialog.open(SendDialogComponent, {
            width: '405px',
            maxHeight: '90vh',
            data: this.profileUser,
        });
    }

    openReceiveZapDialog(): void {
        this._dialog.open(ReceiveDialogComponent, {
            width: '405px',
            maxHeight: '90vh',
            data: this.profileUser,
        });
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
        var npub = this._signerService.getNpubFromPubkey(this.routePubKey)
        this._clipboard.copy(npub);
        this.openSnackBar('npub public key copied', 'dismiss');
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
}
