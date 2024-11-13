import { AngorCardComponent } from '@angor/components/card';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { PostProfileComponent } from 'app/components/post-event/post-profile/post-profile.component';
import { ParseContentService } from 'app/services/parse-content.service';
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
        CommonModule
    ],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
})
export class PostComponent {
    @Input() item: any;
    @Output() user = new EventEmitter<any>();

    storageService = inject(StorageService);

    zapService = inject(ZapService);

    parseContent = inject(ParseContentService);

    profileUser: any;

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
}
