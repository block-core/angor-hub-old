import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewEvent } from 'app/types/NewEvent';
import { ShowEventsService } from 'app/services/show-events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-events',
  standalone: true,
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.scss'],
  imports: [CommonModule]
})
export class ShowEventsComponent implements OnInit, OnChanges {
  @Input() pubkeys: string[] = [];

  events$: Observable<NewEvent[]>;

  constructor(private showEventsService: ShowEventsService) {}

  ngOnInit(): void {
    this.events$ = this.showEventsService.getEvents();
  }

  loadMore() {
    this.showEventsService.loadEvents(this.pubkeys, true);
  }

  ngOnChanges(): void {

    this.showEventsService.clearEvents();
    this.showEventsService.loadEvents(this.pubkeys);
  }
}
