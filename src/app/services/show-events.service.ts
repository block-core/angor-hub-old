import { Injectable } from '@angular/core';
import { Filter, NostrEvent } from 'nostr-tools';
import { BehaviorSubject } from 'rxjs';
import { RelayService } from './relay.service';
import { NewEvent } from 'app/types/NewEvent';

@Injectable({
  providedIn: 'root'
})
export class ShowEventsService {
  private eventsSubject = new BehaviorSubject<NewEvent[]>([]);
  private pageSize = 10;
  private lastLoadedEventTime: number | null = null;

  constructor(private relayService: RelayService) { }


  async loadEvents(pubkeys: string[], loadMore: boolean = false): Promise<void> {
    if (!loadMore) {

      this.clearEvents();
    }

    const filter: Filter = {
      authors: pubkeys,
      kinds: [1],
      limit: this.pageSize,
      until: this.lastLoadedEventTime || Math.floor(Date.now() / 1000)
    };

    try {
      const events = await this.fetchFilteredEvents(filter);
      if (events.length > 0) {
        this.lastLoadedEventTime = events[events.length - 1].createdAt;
        const currentEvents = this.eventsSubject.getValue();
        this.eventsSubject.next([...currentEvents, ...events]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }


  subscribeToRealTimeEvents(pubkeys: string[]): void {
    const filter: Filter = {
      authors: pubkeys,
      kinds: [1],
      limit:this.pageSize
    };

    this.relayService.getPool().subscribeMany(
      this.relayService.getConnectedRelays(),
      [filter],
      {
        onevent: (event: NostrEvent) => {
          this.handleRealTimeEvent(event);
        }
      }
    );
  }


  private async handleRealTimeEvent(event: NostrEvent) {
    const newEvent = await this.createNewEvent(event);
    const currentEvents = this.eventsSubject.getValue();
    this.eventsSubject.next([newEvent, ...currentEvents]);
  }

  private async fetchFilteredEvents(filter: Filter): Promise<NewEvent[]> {
    await this.relayService.ensureConnectedRelays();
    const connectedRelays = this.relayService.getConnectedRelays();

    const eventMap = new Map<string, NostrEvent>();
    const pool = this.relayService.getPool();

    await Promise.allSettled(
      connectedRelays.map(async (relay) => {
        try {
          const events = await pool.querySync([relay], filter);
          events.forEach(event => {
            if (!eventMap.has(event.id)) {
              eventMap.set(event.id, event);
            }
          });

        } catch (error) {
          console.error(`Error querying relay ${relay}:`, error);
        }
      })

    );
    pool.close(connectedRelays);
    const newEvents = await Promise.all(
      Array.from(eventMap.values()).map(event => this.createNewEvent(event))
    );

    return newEvents;
  }

  private async createNewEvent(event: NostrEvent): Promise<NewEvent> {
    const newEvent = new NewEvent(
      event.id,
      event.kind,
      event.pubkey,
      event.content,
      event.id,
      event.created_at,
      event.tags
    );

    newEvent.username = newEvent.pubkey;
    newEvent.picture = '/images/avatars/avatar-placeholder.png';

    return newEvent;
  }

  getEvents() {
    return this.eventsSubject.asObservable();
  }


  clearEvents(): void {
    this.eventsSubject.next([]);
    this.lastLoadedEventTime = null;
  }
}
