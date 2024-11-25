import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { NostrEvent } from 'nostr-tools';
import { AngorCardComponent } from '@angor/components/card';
import { AngorConfigService } from '@angor/services/config';
import { AngorConfirmationService } from '@angor/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ParseContentService } from 'app/services/parse-content.service';
import { SignerService } from 'app/services/signer.service';
import { SocialService } from 'app/services/social.service';
import { StorageService } from 'app/services/storage.service';
import { SubscriptionService } from 'app/services/subscription.service';
import { AgoPipe } from 'app/shared/pipes/ago.pipe';
import { PostProfileComponent } from '../post-event/post-profile/post-profile.component';
import { PostComponent } from 'app/layout/common/post/post.component';

@Component({
    selector: 'help-center',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        InfiniteScrollModule,
        PostComponent
    ]
})
export class LandingHomeComponent implements OnInit, OnDestroy {
    posts: NostrEvent[] = [];
    likes: any[] = [];
    hasMorePosts: boolean = true;
    currentPage: number = 1;
    loading: boolean = false;
    myLikes: NostrEvent[] = [];
    private subscriptions: Subscription[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _storageService: StorageService,
        private _sanitizer: DomSanitizer,

        private parseContent: ParseContentService
    ) {}

    ngOnInit(): void {
        this.loadInitialPosts();
        this.subscribeToNewPosts();
    }

    private async loadInitialPosts(): Promise<void> {
        this.loading = true;
        const maxAttempts = 5;
        const delay = 3000;

        try {
            for (let attemptCount = 0; attemptCount < maxAttempts; attemptCount++) {
                const additionalPosts = await this._storageService.getAllPostsWithPagination(
                    this.currentPage,
                    10
                );

                if (additionalPosts.length > 0) {
                    const posts = [...this.posts, ...additionalPosts].sort((a, b) => b.created_at - a.created_at);
                    this.posts = posts;
                    break;
                } else {
                    if (attemptCount < maxAttempts - 1) {
                        console.warn(`Attempt ${attemptCount + 1} failed, retrying in ${delay / 1000}s.`);
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
            this._changeDetectorRef.detectChanges();
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    getSafeUrl(url: string): SafeUrl {
        return this._sanitizer.bypassSecurityTrustUrl(url);
    }

    isSingleEmojiOrWord(token: string): boolean {
        const trimmedToken = token.trim();
        const isSingleWord = /^\w+$/.test(trimmedToken);
        const isSingleEmoji = /^[\p{Emoji}]+$/u.test(trimmedToken);
        return isSingleWord || isSingleEmoji;
    }

    private subscribeToNewPosts(): void {
        const subscription = this._storageService.posts$.subscribe((newPost) => {
            if (newPost) {
                this.posts.unshift(newPost);
                this.posts.sort((a, b) => b.created_at - a.created_at);
                this._changeDetectorRef.detectChanges();
            }
        });
        this.subscriptions.push(subscription);
    }

    loadNextPage(): void {
        if (this.loading) return;
        this.currentPage++;
        this.loadInitialPosts();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }


    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
