import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { SubscriptionService } from './subscription.service';
import { NostrEvent, Filter } from 'nostr-tools';

@Injectable({
  providedIn: 'root',
})
export class MetadataQueueService implements OnDestroy {
  private publicKeyQueue: Set<string> = new Set(); 
  private updateSubject = new Subject<void>();
  private _unsubscribeAll = new Subject<void>();

  constructor(
    private subscriptionService: SubscriptionService,
    private storageService: StorageService
  ) {
    this.initializeService();
  }


  private async initializeService(): Promise<void> {
    await this.loadStoredPublicKeys();
    this.updateSubject
      .pipe(debounceTime(2000), takeUntil(this._unsubscribeAll))
      .subscribe(() => this.processQueue());
  }

  addPublicKey(pubKey: string): void {
    if (!this.publicKeyQueue.has(pubKey)) {
      this.publicKeyQueue.add(pubKey);
      this.updateSubject.next();
    }
  }

  private async loadStoredPublicKeys(): Promise<void> {
    try {
      const storedProfiles = await this.storageService.getAllProfiles();
      storedProfiles.forEach((profile) => {
        if (profile.pubKey) {
          this.publicKeyQueue.add(profile.pubKey);
        }
      });
      this.updateSubject.next();
    } catch (error) {
      console.error('Error loading stored public keys:', error);
    }
  }


  private processQueue(): void {
    if (this.publicKeyQueue.size === 0) return;

    const publicKeysToProcess = Array.from(this.publicKeyQueue);
    this.publicKeyQueue.clear();

    const metadataFilter: Filter = {
      kinds: [0],
      authors: publicKeysToProcess,
    };

    const subscriptionId = this.subscriptionService.addSubscriptions(
      [metadataFilter],
      (event: NostrEvent) => {
        const metadata = this.parseMetadataEvent(event);
        if (metadata) {
          this.storageService.saveProfile(event.pubkey, metadata);
        }
        this.subscriptionService.removeSubscriptionById(subscriptionId);
      }
    );
  }


  private parseMetadataEvent(event: NostrEvent): any {
    try {
      return JSON.parse(event.content);
    } catch (error) {
      console.error('Error parsing metadata event:', error);
      return null;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
