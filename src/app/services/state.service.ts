import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { NostrEvent, Filter } from 'nostr-tools';
import { ContactEvent, StorageService } from './storage.service';
import { Contacts, EncryptedDirectMessage } from 'nostr-tools/kinds';

@Injectable({
  providedIn: 'root',
})
export class StateService {
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

    await this.subscribeToUserProfile(pubkey);
    await this.subscribeToUserContacts(pubkey);
    await this.subscribeToUserChats(pubkey);
    await this.subscribeToUserPosts(pubkey);

    this.isProfileLoaded = true;
  }

  // ------------------- Subscriptions -------------------

  private async subscribeToUserProfile(pubkey: string): Promise<void> {
    console.log(`Subscribing to user profile for pubkey: ${pubkey}`);

    const metadataLastUpdate = await this.storageService.getLastUpdateDate('users');
    const metadataFilter: Filter = { kinds: [0], authors: [pubkey], limit: 1 };

    if (metadataLastUpdate) {
      metadataFilter.since = parseInt(metadataLastUpdate, 10);
    }

    this.subscriptionService.addSubscriptions([metadataFilter], (event: NostrEvent) => {
      const metadata = this.parseMetadataEvent(event);
      this.storageService.saveProfile(pubkey, metadata);
    });
  }

  private async subscribeToUserContacts(pubkey: string): Promise<void> {
    console.log(`Subscribing to contacts for pubkey: ${pubkey}`);

    const contactsLastUpdate = await this.storageService.getLastUpdateDate('contacts');

    const contactsFilter: Filter[] = [
      {
        kinds: [Contacts],
        authors: [pubkey],
      },
      {
        kinds: [Contacts],
        '#p': [pubkey],
      },
    ];

    if (contactsLastUpdate) {
      const lastUpdateTimestamp = parseInt(contactsLastUpdate, 10);
      contactsFilter.forEach(filter => filter.since = lastUpdateTimestamp);
    }

    this.subscriptionService.addSubscriptions(contactsFilter, (event: NostrEvent) => {
      const isFollower = event.pubkey === pubkey;

      const contactEvent: ContactEvent = {
        id: event.id,
        pubkey: event.pubkey,
        created_at: event.created_at,
        tags: event.tags,
        isFollower,
      };

      this.storageService.saveContacts(pubkey, [contactEvent]);
    });
  }


  private async subscribeToUserChats(pubkey: string): Promise<void> {
    console.log(`Subscribing to chats for pubkey: ${pubkey}`);

    const chatsLastUpdate = await this.storageService.getLastUpdateDate('chats');


    const chatFilter: Filter[] = [
        {
            kinds: [EncryptedDirectMessage],
            authors: [pubkey],
            limit: 300,
        },
        {
            kinds: [EncryptedDirectMessage],
            '#p': [pubkey],
            limit: 300,
        },
    ];


    if (chatsLastUpdate) {
        const lastUpdateTimestamp = parseInt(chatsLastUpdate, 10);
        chatFilter.forEach(filter => filter.since = lastUpdateTimestamp);
    }
    else{
        this.storageService.removeAllChats();
    }

    this.subscriptionService.addSubscriptions(chatFilter, (event: NostrEvent) => {
      const chatEvent = this.parseChatEvent(event);
      this.storageService.saveChatEvent(chatEvent);
    });
  }

  // Subscription for posts (Event Type 1)
  private async subscribeToUserPosts(pubkey: string): Promise<void> {
    console.log(`Subscribing to posts (event type 1) for pubkey: ${pubkey}`);

    const postsLastUpdate = await this.storageService.getLastUpdateDate('posts');
    const postFilter: Filter = {
      kinds: [1],
      authors: [pubkey],
      limit: 100
    };

    if (postsLastUpdate) {
      postFilter.since = parseInt(postsLastUpdate, 10);
    }

    this.subscriptionService.addSubscriptions([postFilter], (event: NostrEvent) => {
      this.storageService.savePostForPubKey(event);
    });
  }

  // ------------------- Parsing Events -------------------

  private parseMetadataEvent(event: NostrEvent): any {
    try {
      return JSON.parse(event.content);
    } catch (error) {
      console.error('Error parsing metadata event:', error);
      return null;
    }
  }


  private parseChatEvent(event: NostrEvent): any {
    try {
      const contentParts = event.content.split('?iv=');
      const encryptedMessage = contentParts[0];
      const iv = contentParts[1];

      return {
        id: event.id,
        kind: event.kind,
        pubkey: event.pubkey,
        created_at: event.created_at,
        tags: event.tags,
        content: encryptedMessage,
        iv: iv,
        IsRead: false, // New chat event, unread by default
      };
    } catch (error) {
      console.error('Error parsing chat event:', error);
      return null;
    }
  }
}
