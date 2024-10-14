import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PaginatedEventService } from 'app/services/event.service';
import { NewEvent } from 'app/types/NewEvent';
import { AngorCardComponent } from '@angor/components/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrlPipe } from 'app/shared/pipes/safe-url.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ParseContentService } from 'app/services/parse-content.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
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
  ]
})
export class EventListComponent implements OnInit, OnDestroy {
  @Input() pubkeys: string[] = [];
  @Input() currentUserMetadata: any;

  events$: Observable<NewEvent[]>;
  eventStates: { showEmojiPicker: boolean; comment: string }[] = [];
  subscriptions: Subscription[] = [];

  isLoading = false;
  noMoreEvents = false;

  constructor(
    private paginatedEventService: PaginatedEventService,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public parseContent: ParseContentService
  ) {
    this.events$ = this.paginatedEventService.getEventStream();
  }

  ngOnInit(): void {
    this.resetAll();
  }



  subscribeToEvents(): void {
    this.unsubscribeAll();


    if (!this.pubkeys || this.pubkeys.length === 0) {
      console.warn('No public keys provided');
      return;
    }


    this.paginatedEventService.subscribeToEvents(this.pubkeys)
      .then(() => {
        console.log('Subscribed to events for the new user.');
      })
      .catch(error => {
        console.error('Error subscribing to events:', error);
      });


    const eventSub = this.events$.subscribe(events => {
      const relevantEvents = events.filter(event => this.pubkeys.includes(event.pubkey));

      this.eventStates = relevantEvents.map(() => ({
        showEmojiPicker: false,
        comment: ''
      }));

      this.changeDetectorRef.markForCheck();
    });

    this.subscriptions.push(eventSub);
  }



  resetAll(): void {
    this.unsubscribeAll();
    this.clearComponentState();
    this.paginatedEventService.clearEvents();
    this.subscribeToEvents();
    this.loadInitialEvents();
  }






  unsubscribeAll(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  clearComponentState(): void {
    this.eventStates = [];
    this.isLoading = false;
    this.noMoreEvents = false;
    this.changeDetectorRef.markForCheck();
  }


  loadInitialEvents(): void {
    if (this.pubkeys.length === 0) {
      console.warn('No pubkeys provided');
      return;
    }

    this.isLoading = true;
    this.paginatedEventService.loadMoreEvents(this.pubkeys).finally(() => {
      this.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  loadMoreEvents(): void {
    if (!this.isLoading && !this.noMoreEvents) {
      this.isLoading = true;
      this.paginatedEventService.loadMoreEvents(this.pubkeys).finally(() => {
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      });
    }
  }





  getComment(index: number): string {
    return this.eventStates[index]?.comment || '';
  }

  setComment(index: number, value: string): void {
    if (this.eventStates[index]) {
      this.eventStates[index].comment = value;
    }
  }

  getSanitizedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  sendLike(event: NewEvent): void {
    if (!event.likedByMe) {
      this.paginatedEventService.sendLikeEvent(event).then(() => {
        event.likedByMe = true;
        event.likeCount++;
        this.changeDetectorRef.markForCheck();
      }).catch(error => console.error('Failed to send like:', error));
    }
  }

  toggleLike(event: NewEvent): void {
    this.sendLike(event);
  }

  toggleCommentEmojiPicker(index: number): void {
    this.eventStates[index].showEmojiPicker = !this.eventStates[index].showEmojiPicker;
  }

  addEmojiToComment(event: any, index: number): void {
    this.eventStates[index].comment += event.emoji.native;
    this.eventStates[index].showEmojiPicker = false;
  }

  sendComment(event: NewEvent, index: number): void {
    const comment = this.eventStates[index].comment;
    if (comment.trim() !== '') {
      this.paginatedEventService.sendReplyEvent(event, comment).then(() => {
        this.eventStates[index].comment = '';
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  trackById(index: number, item: NewEvent): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  getTimeFromNow(event: NewEvent): string {
    return event.fromNow;
  }


}
