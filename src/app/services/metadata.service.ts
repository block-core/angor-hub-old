import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { debounceTime, takeUntil, retry, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { SubscriptionService } from './subscription.service';
import { Event as NostrEvent, Filter } from 'nostr-tools';
import { Metadata } from 'nostr-tools/kinds';

// Define proper interfaces for type safety
interface ProfileMetadata {
  name?: string;
  about?: string;
  picture?: string;
  nip05?: string;
  lud16?: string;
  [key: string]: any;
}

interface ProcessingStatus {
  success: boolean;
  pubkey: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetadataService implements OnDestroy {
  private readonly BATCH_SIZE = 50;
  private readonly PROCESS_INTERVAL = 3000;  
  private readonly MAX_RETRY_ATTEMPTS = 3;

  private publicKeyQueue = new Set<string>();
  private processingSubject = new Subject<void>();
  private _unsubscribeAll = new Subject<void>();

  // Add observable for monitoring processing status
  private processingStatus = new BehaviorSubject<ProcessingStatus[]>([]);
  public processingStatus$ = this.processingStatus.asObservable();

  constructor(
    private subscriptionService: SubscriptionService,
    private storageService: StorageService
  ) {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    try {
      await this.loadStoredPublicKeys();
      this.setupQueueProcessor();
    } catch (error) {
      console.error('Failed to initialize metadata service:', error);
    }
  }

  private setupQueueProcessor(): void {
    this.processingSubject
      .pipe(
        debounceTime(this.PROCESS_INTERVAL),
        retry(this.MAX_RETRY_ATTEMPTS),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => this.processQueue());
  }

  public addPublicKey(pubKey: string): void {
    if (!this.isValidPublicKey(pubKey)) {
      console.warn('Invalid public key format:', pubKey);
      return;
    }

    if (!this.publicKeyQueue.has(pubKey)) {
      this.publicKeyQueue.add(pubKey);
      this.processingSubject.next();
    }
  }

  public addPublicKeys(pubKeys: string[]): void {
    const validKeys = pubKeys.filter(key => this.isValidPublicKey(key));
    validKeys.forEach(key => this.publicKeyQueue.add(key));

    if (validKeys.length > 0) {
      this.processingSubject.next();
    }
  }

  private isValidPublicKey(pubKey: string): boolean {
    return /^[0-9a-f]{64}$/.test(pubKey);
  }

  private async loadStoredPublicKeys(): Promise<void> {
    try {
      const storedProfiles = await this.storageService.getAllProfiles();
      const validProfiles = storedProfiles.filter(profile =>
        profile.pubKey && this.isValidPublicKey(profile.pubKey)
      );

      validProfiles.forEach(profile => {
        this.publicKeyQueue.add(profile.pubKey);
      });

      if (validProfiles.length > 0) {
        this.processingSubject.next();
      }
    } catch (error) {
      console.error('Error loading stored public keys:', error);
      throw error;
    }
  }

  private async processQueue(): Promise<void> {
    if (this.publicKeyQueue.size === 0) return;

    const batchesToProcess = this.getBatches(Array.from(this.publicKeyQueue));
    this.publicKeyQueue.clear();

    const processResults: ProcessingStatus[] = [];

    for (const batch of batchesToProcess) {
      try {
        await this.processBatch(batch, processResults);
      } catch (error) {
        console.error('Error processing batch:', error);
        batch.forEach(pubkey => {
          processResults.push({
            success: false,
            pubkey,
            error: 'Batch processing failed'
          });
        });
      }
    }

    this.processingStatus.next(processResults);
  }

  private getBatches(keys: string[]): string[][] {
    const batches: string[][] = [];
    for (let i = 0; i < keys.length; i += this.BATCH_SIZE) {
      batches.push(keys.slice(i, i + this.BATCH_SIZE));
    }
    return batches;
  }

  private async processBatch(
    publicKeys: string[],
    processResults: ProcessingStatus[]
  ): Promise<void> {
    const metadataFilter: Filter = {
      kinds: [Metadata],
      authors: publicKeys,
    };

    return new Promise<void>((resolve) => {
      let processedCount = 0;
      const totalCount = publicKeys.length;
      const timeoutDuration = 10000; // 10 seconds

      const timeoutId = setTimeout(() => {
        completeProcessing('Batch processing timeout');
      }, timeoutDuration);

      const subscriptionId = this.subscriptionService.addSubscriptions(
        [metadataFilter],
        (event: NostrEvent) => {
          processedCount++;
          this.handleMetadataEvent(event, processResults);
          if (processedCount === totalCount) {
            completeProcessing();
          }
        },
        () => {
          completeProcessing();
        }
      );

      const completeProcessing = (timeoutReason?: string) => {
        clearTimeout(timeoutId);
        this.subscriptionService.removeSubscriptionById(subscriptionId);

        // Handle any unprocessed public keys
        publicKeys.forEach(pubkey => {
          if (!processResults.some(result => result.pubkey === pubkey)) {
            processResults.push({
              success: false,
              pubkey,
              error: timeoutReason || 'Event not received'
            });
          }
        });

        resolve();
      };
    });
  }

  private handleMetadataEvent(event: NostrEvent, processResults: ProcessingStatus[]): void {
    try {
      const metadata = this.parseMetadataEvent(event);
      if (metadata) {
        this.storageService.saveProfile(event.pubkey, metadata);
        processResults.push({
          success: true,
          pubkey: event.pubkey
        });
      } else {
        processResults.push({
          success: false,
          pubkey: event.pubkey,
          error: 'Invalid metadata format'
        });
      }
    } catch (error) {
      processResults.push({
        success: false,
        pubkey: event.pubkey,
        error: 'Processing error'
      });
    }
  }
  private parseMetadataEvent(event: NostrEvent): ProfileMetadata | null {
    try {
      const metadata: ProfileMetadata = JSON.parse(event.content);

      if (typeof metadata !== 'object' || metadata === null) {
        return null;
      }

      // Sanitize and validate fields
      if (metadata.name) metadata.name = metadata.name.trim();
      if (metadata.about) metadata.about = metadata.about.trim();
      if (metadata.picture) {
        try {
          new URL(metadata.picture);
        } catch {
          delete metadata.picture; // Remove invalid URL
        }
      }

      return metadata;
    } catch {
      return null;
    }
  }

  public clearQueue(): void {
    this.publicKeyQueue.clear();
  }

  ngOnDestroy(): void {
    this.clearQueue();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
