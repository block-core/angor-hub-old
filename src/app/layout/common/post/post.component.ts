import { AngorCardComponent } from '@angor/components/card';
import { AngorConfig } from '@angor/services/config';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { PostProfileComponent } from 'app/components/post-event/post-profile/post-profile.component';
import { EventService } from 'app/services/event.service';
import {
    ParseContentService,
    ParsedToken,
} from 'app/services/parse-content.service';
import { StorageService } from 'app/services/storage.service';
import { ZapService } from 'app/services/zap.service';
import { NewEvent } from 'app/types/NewEvent';
import { Subscription, takeUntil } from 'rxjs';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [
        AngorCardComponent,
        PostProfileComponent,
        MatIconModule,
        MatDividerModule,
        MatMenuModule,
        RouterModule,
        CommonModule,
        MatButton,
    ],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit, OnDestroy {

    private _item: any;

    @Input()
    get item(): any {
        return this._item;
    }

    set item(value: any) {
        this._item = value;
        this.onItemChange();
    }

    @Input()
    actions = true;

    @Input()
    more = true;

    @Output() user = new EventEmitter<any>();

    storageService = inject(StorageService);
    zapService = inject(ZapService);
    parseContent = inject(ParseContentService);
    eventService= inject(EventService);
    changeDetectorRef= inject(ChangeDetectorRef);


    private subscription: Subscription = new Subscription();

    profileUser: any;
    tokens = signal<(string | ParsedToken)[]>([]);

    private isLiked = false;

    ngOnInit(): void {
        this.subscription = this.storageService.myLikes$.subscribe((likes: string[]) => {
            this.isLiked = likes?.includes(this.item.id) || false;
            this.changeDetectorRef.detectChanges();
        });
    }


    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    openZapDialog(eventId?: string, user?: any) {
        this.zapService.openZapDialog(eventId, user);
    }

    getProfile() {
        // const cachedMetadata = await this.storageService.getProfile(publicKey);
        // if (cachedMetadata) {
        //     this.profileUser = cachedMetadata;
        //     this._changeDetectorRef.detectChanges();
        // }
    }

    isSingleEmojiOrWord(token: string): boolean {
        const trimmedToken = token.trim();
        const isSingleWord = /^\w+$/.test(trimmedToken);
        const isSingleEmoji = /^[\p{Emoji}]+$/u.test(trimmedToken);
        const isLessThanTenCharacters = trimmedToken.length < 10;

        return (isSingleWord || isSingleEmoji) && isLessThanTenCharacters;
    }

    private onItemChange() {
        if (this._item.content) {
            this.tokens.set(this.parseContent.parseContent(this._item.content));
        } else {
            this.tokens.set([]);
        }
    }

    sendLike(event: NewEvent): void {
        if (!this.isLiked) {
          this.eventService.sendLikeEvent(event).then(() => {
             this.isLiked = true;
             this.changeDetectorRef.detectChanges();
          }).catch(error => console.error('Failed to send like:', error));
        }
      }

      toggleLike(event: NewEvent): void {
        this.sendLike(event);
      }
}
