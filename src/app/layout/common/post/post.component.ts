import { AngorCardComponent } from '@angor/components/card';
import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    inject,
    Input,
    Output,
    signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { PostProfileComponent } from 'app/components/post-event/post-profile/post-profile.component';
import {
    ParseContentService,
    ParsedToken,
} from 'app/services/parse-content.service';
import { StorageService } from 'app/services/storage.service';
import { ZapService } from 'app/services/zap.service';

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
export class PostComponent {
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

    profileUser: any;
    tokens = signal<(string | ParsedToken)[]>([]);

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
        return isSingleWord || isSingleEmoji;
    }

    private onItemChange() {
        // Function to call when item is set
        console.log('Item has been changed:', this._item);

        if (this._item.content) {
            this.tokens.set(this.parseContent.parseContent(this._item.content));
        } else {
            this.tokens.set([]);
        }
    }
}
