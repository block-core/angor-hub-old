import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubscriptionService } from './subscription.service';
import { NostrEvent, Filter } from 'nostr-tools';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private profileMetadataSubject = new BehaviorSubject<any>(null);
  private followersSubject = new BehaviorSubject<string[]>([]);
  private followingSubject = new BehaviorSubject<string[]>([]);

  public profileMetadata$: Observable<any> = this.profileMetadataSubject.asObservable();
  public followers$: Observable<string[]> = this.followersSubject.asObservable();
  public following$: Observable<string[]> = this.followingSubject.asObservable();

  private isProfileLoaded = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private storageService: StorageService
  ) {}

  public async loadUserProfile(pubkey: string): Promise<void> {
    console.log(`Loading user profile for pubkey: ${pubkey}`);

    if (this.isProfileLoaded) {
      console.log('Profile already loaded, skipping.');
      return;
    }

    const cachedMetadata = await this.storageService.getUserMetadata(pubkey);

    if (cachedMetadata) {
      this.profileMetadataSubject.next(cachedMetadata);
    }

    this.subscribeToUserProfile(pubkey);

    this.isProfileLoaded = true;
  }

  private async subscribeToUserProfile(pubkey: string): Promise<void> {
    console.log(`Subscribing to user profile for pubkey: ${pubkey}`);

    const metadataLastUpdate = await this.storageService.getLastUpdateDate('users');

    const metadataFilter: Filter = { kinds: [0], authors: [pubkey], limit: 1 };

    if (metadataLastUpdate) {
      metadataFilter.since = parseInt(metadataLastUpdate, 10);
    }

    this.subscriptionService.addSubscriptions([metadataFilter], (event: NostrEvent) => {
      const metadata = this.parseMetadataEvent(event);
      this.profileMetadataSubject.next(metadata);
      this.storageService.saveUserMetadata(pubkey, metadata);
    });

  }

  private parseMetadataEvent(event: NostrEvent): any {
    try {
      return JSON.parse(event.content);
    } catch (error) {
      console.error('Error parsing metadata event:', error);
      return null;
    }
  }

}
