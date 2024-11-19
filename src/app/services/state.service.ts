import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { NostrEvent, Filter } from 'nostr-tools';
import { ContactEvent, StorageService } from './storage.service';
import { Contacts, EncryptedDirectMessage, Reaction, ShortTextNote } from 'nostr-tools/kinds';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    private isProfileLoaded = false;

    constructor(
        private subscriptionService: SubscriptionService,
        private storageService: StorageService
    ) { }

    public async loadUserProfile(pubkey: string): Promise<void> {

        if (this.isProfileLoaded) {
            return;
        }

        await this.subscribeToUserProfile(pubkey);
        await this.subscribeToUserContacts(pubkey);
        await this.subscribeToUserChats(pubkey);
        await this.subscribeToUserPosts(pubkey);
        await this.subscribeToMyLikes(pubkey);

        this.isProfileLoaded = true;
    }

    // ------------------- Subscriptions -------------------

    private async subscribeToUserProfile(pubkey: string): Promise<void> {

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
        else {
            this.storageService.removeAllChats();
        }

        this.subscriptionService.addSubscriptions(chatFilter, (event: NostrEvent) => {
            const chatEvent = this.parseChatEvent(event);
            this.storageService.saveChatEvent(chatEvent);
        });
    }

    // Subscription for posts (Event Type 1)
    private async subscribeToUserPosts(pubkey: string): Promise<void> {

        const postsLastUpdate = await this.storageService.getLastUpdateDate('posts');
        const postFilter: Filter = {
            kinds: [ShortTextNote],
            authors: [pubkey],
        };

        if (postsLastUpdate) {
            postFilter.since = parseInt(postsLastUpdate, 10);
        }

        this.subscriptionService.addSubscriptions([postFilter], (event: NostrEvent) => {
            if (!this.isReply(event)) {

                this.storageService.savePost(event);
            }
        });
    }

    private isReply(event: NostrEvent): boolean {
        const replyTags = event.tags.filter(
            (tag) => tag[0] === 'e' || tag[0] === 'p'
        );
        return replyTags.length > 0;
    }


    // Subscription for Likes (Event Type 7)
    private async subscribeToMyLikes(pubkey: string): Promise<void> {


        const likesLastUpdate = await this.storageService.getLastUpdateDate('myLikes');
        const likeFilter: Filter = {
            kinds: [Reaction],
            authors: [pubkey],
        };

        if (likesLastUpdate) {
            likeFilter.since = parseInt(likesLastUpdate, 10);
        }

        this.subscriptionService.addSubscriptions([likeFilter], (event: NostrEvent) => {
            this.storageService.saveLike(event);
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
