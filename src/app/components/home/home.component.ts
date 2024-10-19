import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SubscriptionService } from 'app/services/subscription.service';
import { Filter, NostrEvent } from 'nostr-tools';
import { ParseContentService } from 'app/services/parse-content.service';

@Component({
  selector: 'landing-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingHomeComponent {
  public events: NostrEvent[] = [];
  public replay: NostrEvent[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private parseContent: ParseContentService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  trackById(index: number, item: NostrEvent): string {
    return item.id;
  }


}
