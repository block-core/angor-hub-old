import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { NostrEvent, Filter } from 'nostr-tools';
import { StorageService } from './storage.service';

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
    await this.subscribeToUserFollowers(pubkey);
    await this.subscribeToUserFollowing(pubkey);
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
      this.storageService.saveUserMetadata(pubkey, metadata);
    });
  }

  private async subscribeToUserFollowers(pubkey: string): Promise<void> {
    console.log(`Subscribing to followers for pubkey: ${pubkey}`);

    const followersLastUpdate = await this.storageService.getLastUpdateDate('followers');
    const followersFilter: Filter = { kinds: [3] };

    if (followersLastUpdate) {
      followersFilter.since = parseInt(followersLastUpdate, 10);
    }

    this.subscriptionService.addSubscriptions([followersFilter], (event: NostrEvent) => {
      const followers = this.parseFollowersOrFollowingEvent(event);
      this.storageService.saveFollowers(pubkey, followers);
    });
  }

  // Subscription for following
  private async subscribeToUserFollowing(pubkey: string): Promise<void> {
    console.log(`Subscribing to following for pubkey: ${pubkey}`);

    const followingLastUpdate = await this.storageService.getLastUpdateDate('following');
    const followingFilter: Filter = { kinds: [3], authors: [pubkey] };

    if (followingLastUpdate) {
      followingFilter.since = parseInt(followingLastUpdate, 10);
    }

    this.subscriptionService.addSubscriptions([followingFilter], (event: NostrEvent) => {
      const following = this.parseFollowersOrFollowingEvent(event);
      this.storageService.saveFollowing(pubkey, following);
    });
  }

  private async subscribeToUserChats(pubkey: string): Promise<void> {
    console.log(`Subscribing to chats for pubkey: ${pubkey}`);

    const chatsLastUpdate = await this.storageService.getLastUpdateDate('chats');
    const chatFilter: Filter = {
      kinds: [4],
      limit: 300,
    };

    if (chatsLastUpdate) {
      chatFilter.since = parseInt(chatsLastUpdate, 10);
    }

    this.subscriptionService.addSubscriptions([chatFilter], (event: NostrEvent) => {
      const chatEvent = this.parseChatEvent(event);
      console.log(chatEvent);

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
      limit: 50
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

  private parseFollowersOrFollowingEvent(event: NostrEvent): string[] {
    try {
      return event.tags
        .filter((tag) => tag[0] === 'p')
        .map((tag) => tag[1]);
    } catch (error) {
      console.error('Error parsing followers/following event:', error);
      return [];
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
