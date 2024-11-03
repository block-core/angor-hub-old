import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Filter, NostrEvent } from 'nostr-tools';
import { RelayService } from './relay.service';
import { v4 as uuidv4 } from 'uuid';

interface Subscription {
  filter: Filter[];
  callbacks: ((event: NostrEvent) => void)[];
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptions = new Map<string, Subscription>();
  private activeRelays: string[] = [];
  private pendingSubscriptions = new Map<string, Subscription>();
  private subscriptionsSubject = new BehaviorSubject<Map<string, Subscription>>(new Map());
  public subscriptions$ = this.subscriptionsSubject.asObservable();

  private subscriptionQueue: Subscription[] = [];
  private isProcessingQueue = false;
  private readonly queueInterval = 3000;
  private readonly maxSubscriptionsPerBatch = 5;
  private readonly debounceInterval = 5000;
  private lastActionTimestamp = new Map<string, number>();

  constructor(private relayService: RelayService) {
    this.connectToAllRelays();
    this.initializeQueueProcessing();
  }

  public addSubscriptions(filters: Filter[], callback: (event: NostrEvent) => void): string {
    const existingSubscription = this.findExistingSubscription(filters);

    if (existingSubscription) {
      existingSubscription.callbacks.push(callback);
      return existingSubscription.id;
    }

    const subscriptionId = uuidv4();
    this.lastActionTimestamp.set(subscriptionId, Date.now());

    const newSubscription: Subscription = { filter: filters, callbacks: [callback], id: subscriptionId };
    this.subscriptions.set(subscriptionId, newSubscription);
    this.subscriptionsSubject.next(this.subscriptions);

    this.addToQueue(newSubscription);
    return subscriptionId;
  }

  private findExistingSubscription(filters: Filter[]): Subscription | undefined {
    return Array.from(this.subscriptions.values()).find(sub =>
      sub.filter.every((f, i) => f === filters[i])
    );
  }

  public removeSubscriptionById(subscriptionId: string): void {
    const lastActionTime = this.lastActionTimestamp.get(subscriptionId);

    if (lastActionTime && Date.now() - lastActionTime < this.debounceInterval) return;

    if (this.subscriptions.has(subscriptionId)) {
      this.subscriptions.delete(subscriptionId);
      this.subscriptionsSubject.next(this.subscriptions);
    }

    this.lastActionTimestamp.set(subscriptionId, Date.now());
  }

  private addToQueue(subscription: Subscription): void {
    this.subscriptionQueue.push(subscription);
  }

  private initializeQueueProcessing(): void {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    timer(0, this.queueInterval).subscribe(() => {
      const subscriptionsBatch = this.subscriptionQueue.splice(0, this.maxSubscriptionsPerBatch);
      subscriptionsBatch.forEach(subscription => this.subscribeToRelays(subscription.filter, subscription));
    });
  }

  private subscribeToRelays(filters: Filter[], subscription: Subscription): void {
    if (this.activeRelays.length === 0) {
      this.pendingSubscriptions.set(subscription.id, subscription);
      return;
    }

    this.relayService.ensureConnectedRelays().then(() => {
      const connectedRelays = this.relayService.getConnectedRelays();
      this.relayService.getPool().subscribeMany(connectedRelays, filters, {
        onevent: (event: NostrEvent) => subscription.callbacks.forEach(callback => callback(event)),
        onclose: () => console.log('Subscription closed'),
      });
    }).catch(error => console.error('Error subscribing to relays:', error));
  }

  private subscribeToAllRelays(): void {
    this.pendingSubscriptions.forEach(subscription => this.subscribeToRelays(subscription.filter, subscription));
    this.pendingSubscriptions.clear();
  }

  private connectToAllRelays(): void {
    this.relayService.ensureConnectedRelays().then(() => {
      this.activeRelays = this.relayService.getConnectedRelays();
      this.subscribeToAllRelays();
    }).catch(error => console.error('Error connecting to relays:', error));
  }

  public clearAllSubscriptions(): void {
    this.subscriptions.clear();
    this.pendingSubscriptions.clear();
    this.subscriptionsSubject.next(new Map());
  }

  public getSubscriptions(): Subscription[] {
    return Array.from(this.subscriptions.values());
  }
}
