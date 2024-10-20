import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { NostrEvent, Filter } from 'nostr-tools';
import { throttleTime } from 'rxjs/operators';
import { QueueService } from './queue-service.service';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private metadataSubject = new BehaviorSubject<any>(null);
  constructor(
    private storageService: StorageService,
    private queueService: QueueService
  ) {}

  getMetadataStream(): Observable<any> {
    return this.metadataSubject.asObservable().pipe(throttleTime(2000));
  }


  async fetchMetadataForMultipleKeys(pubkeys: string[]): Promise<any[]> {
    const filter: Filter = {
      kinds: [0],
      authors: pubkeys,
    };

    try {
      const metadataList: any[] = [];


      this.queueService.addRequestToQueue([filter]).subscribe({
        next: async (event: NostrEvent) => {
          if (event.kind === 0) {
            try {
              const metadata = JSON.parse(event.content);
              await this.storageService.saveProfile(event.pubkey, metadata);
              metadataList.push({ pubkey: event.pubkey, metadata });
            } catch (error) {
              console.error('Error parsing metadata:', error);
            }
          }
        },
        complete: () => {
          console.log('Metadata fetching completed');
        },
        error: (error) => {
          console.error('Error fetching metadata:', error);
        }
      });

      return metadataList;
    } catch (error) {
      console.error('Failed to fetch metadata for multiple keys:', error);
      return [];
    }
  }


  async fetchMetadataWithCache(pubkey: string): Promise<any> {
    const metadata = await this.storageService.getProfile(pubkey);
    if (metadata) {
      this.metadataSubject.next(metadata);
      return metadata;
    } else {

      this.queueService.addRequestToQueue([{ authors: [pubkey], kinds: [0] }]).subscribe({
        next: async (event: NostrEvent) => {
          if (event.kind === 0 && event.pubkey === pubkey) {
            try {
              const updatedMetadata = JSON.parse(event.content);
              await this.storageService.saveProfile(pubkey, updatedMetadata);
              this.metadataSubject.next(updatedMetadata);
            } catch (error) {
              console.error('Error parsing updated metadata:', error);
            }
          }
        },
        complete: () => {
          console.log('Metadata fetching for pubkey completed');
        },
        error: (error) => {
          console.error(`Error fetching metadata for pubkey ${pubkey}:`, error);
        }
      });

      return null;
    }
  }


  async fetchMetadataRealtime(pubkey: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.queueService.addRequestToQueue([{ authors: [pubkey], kinds: [0] }]).subscribe({
        next: (event: NostrEvent) => {
          if (event.kind === 0 && event.pubkey === pubkey) {
            try {
              const content = JSON.parse(event.content);
              resolve(content);
            } catch (error) {
              console.error('Error parsing event content:', error);
              resolve(null);
            }
          }
        },
        complete: () => {
          console.log(`Metadata fetching for pubkey ${pubkey} completed`);
          resolve(null);
        },
        error: (error) => {
          console.error(`Error fetching metadata for pubkey ${pubkey}:`, error);
          resolve(null);
        }
      });
    });
  }


  async refreshAllStoredMetadata(): Promise<void> {
    const storedUsers = await this.storageService.getAllProfiles();
    if (!storedUsers || storedUsers.length === 0) {
      return;
    }

    storedUsers.forEach(user => {
      this.fetchMetadataWithCache(user.pubkey);
    });
  }


  async getProfile(pubkey: string): Promise<any> {
    try {
      const cachedMetadata = await this.storageService.getProfile(pubkey);
      if (cachedMetadata) {
        return cachedMetadata;
      }

      const liveMetadata = await this.fetchMetadataRealtime(pubkey);
      if (liveMetadata) {
        await this.storageService.saveProfile(pubkey, liveMetadata);
        return liveMetadata;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching metadata for user ${pubkey}:`, error);
      return null;
    }
  }
}
