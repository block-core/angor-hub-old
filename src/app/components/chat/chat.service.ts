import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, take, catchError } from 'rxjs/operators';
import { Chat, Contact, Profile } from 'app/components/chat/chat.types';
import { StorageService } from 'app/services/storage.service';
import { RelayService } from 'app/services/relay.service';
import { SignerService } from 'app/services/signer.service';
import { MetadataQueueService } from 'app/services/metadata-queue.service';
import { Filter, getEventHash, NostrEvent } from 'nostr-tools';
import { EncryptedDirectMessage } from 'nostr-tools/kinds';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  private chatList: Chat[] = [];
  private latestMessageTimestamps: { [pubKey: string]: number } = {};
  private messageQueue: NostrEvent[] = [];
  private isDecrypting = false;
  private recipientPublicKey: string;
  private message: string;
  private decryptedPrivateKey: string = '';
  private _chat: BehaviorSubject<Chat | null> = new BehaviorSubject(null);
  private _chats: BehaviorSubject<Chat[] | null> = new BehaviorSubject(null);
  private _contact: BehaviorSubject<Contact | null> = new BehaviorSubject(null);
  private _contacts: BehaviorSubject<Contact[] | null> = new BehaviorSubject(null);
  private _profile: BehaviorSubject<Profile | null> = new BehaviorSubject(null);
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _signerService: SignerService,
    private _storageService: StorageService,
    private _relayService: RelayService,
    private _metadataQueueService: MetadataQueueService
  ) {

    this._metadataQueueService.processingStatus$.subscribe((status) => {
        console.log('Processing status:', status);
      });

  }

    get profile$(): Observable<Profile | null> {
        return this._profile.asObservable();
    }

    get chat$(): Observable<Chat | null> {
        return this._chat.asObservable();
    }

    get chats$(): Observable<Chat[] | null> {
        return this._chats.asObservable();
    }

    get contact$(): Observable<Contact | null> {
        return this._contact.asObservable();
    }

    get contacts$(): Observable<Contact[] | null> {
        return this._contacts.asObservable();
    }

    checkCurrentChatOnPageRefresh(chatIdFromURL: string): void {
        if (chatIdFromURL) {
            const currentChat = this._chat.value;
            this.getChatById(chatIdFromURL).subscribe((chat) => {
                if (chat) {
                    this._chat.next(chat);
                    this.loadAndFetchChatHistory(chatIdFromURL);
                }
            });
        }
    }

    async getContact(pubkey: string): Promise<void> {
        try {
            if (!pubkey) {
                return;
            }


            this._storageService.profile$.subscribe((data) => {
                if (data && data.pubKey && data.metadata) {
                    if (data.pubKey === pubkey) {

                            const contact: Contact = {
                                pubKey: pubkey,
                                displayName: data.metadata.name ? data.metadata.name : 'Unknown',
                                picture: data.metadata.picture,
                                about: data.metadata.about,
                            };
                            this._contact.next(contact);

                    }
                }
            });


        } catch (error) {
            console.error('Error fetching contact metadata:', error);
        }
    }

    getContacts(): Observable<Contact[]> {
        return new Observable<Contact[]>((observer) => {
            this._storageService
                .getAllProfiles()
                .then((cachedContacts: Contact[]) => {
                    if (cachedContacts && cachedContacts.length > 0) {
                        const validatedContacts = cachedContacts.map(
                            (contact) => {
                                if (!contact.pubKey) {
                                    console.error(
                                        'Contact is missing pubKey:',
                                        contact
                                    );
                                }
                                return contact;
                            }
                        );

                        this._contacts.next(validatedContacts);
                        observer.next(validatedContacts);
                    } else {
                        observer.next([]);
                    }
                    observer.complete();
                })
                .catch((error) => {
                    console.error(
                        'Error loading cached contacts from IndexedDB:',
                        error
                    );
                    observer.next([]);
                    observer.complete();
                });

            return { unsubscribe() { } };
        });
    }

    async getProfile(): Promise<void> {
        try {
            this._storageService.profile$.subscribe((data) => {
                if (data && data.pubKey && data.metadata) {
                    if (data.pubKey === this._signerService.getPublicKey()) {
                        this._profile.next(data.metadata);
                    }
                }
            });

            this._storageService.getProfile(this._signerService.getPublicKey()).then((metadata) => {
                this._profile.next(metadata);
            });

        } catch (error) {
            console.error('Error fetching profile metadata:', error);
        }
    }

    async getChats(): Promise<Observable<Chat[]>> {
        const pubkey = this._signerService.getPublicKey();
        const useExtension = await this._signerService.isUsingExtension();
        const useSecretKey = await this._signerService.isUsingSecretKey();

        this.decryptedPrivateKey = useSecretKey
            ? await this._signerService.getDecryptedSecretKey()
            : '';

        await Promise.all([
            this.subscribeToChatList(
                pubkey,
                useExtension,
                useSecretKey,
                this.decryptedPrivateKey
            ),
        ]);

        return this.getChatListStream();
    }

    subscribeToChatList(
        pubkey: string,
        useExtension: boolean,
        useSecretKey: boolean,
        decryptedSenderPrivateKey: string
    ): Observable<Chat[]> {
        this._relayService.ensureConnectedRelays().then(async () => {
            const filters: Filter[] = [
                {
                    kinds: [EncryptedDirectMessage],
                    authors: [pubkey],
                    limit: 1500,
                },
                {
                    kinds: [EncryptedDirectMessage],
                    '#p': [pubkey],
                    limit: 1500,
                },
            ];

            this._relayService
                .getPool()
                .subscribeMany(
                    this._relayService.getConnectedRelays(),
                    filters,
                    {
                        onevent: async (event: NostrEvent) => {
                            const otherPartyPubKey =
                                event.pubkey === pubkey
                                    ? event.tags.find(
                                        (tag) => tag[0] === 'p'
                                    )?.[1] || ''
                                    : event.pubkey;

                            if (!otherPartyPubKey) return;

                            const lastTimestamp =
                                this.latestMessageTimestamps[
                                otherPartyPubKey
                                ] || 0;
                            if (event.created_at > lastTimestamp) {
                                this.messageQueue.push(event);
                                this.processNextMessage(
                                    pubkey,
                                    useExtension,
                                    useSecretKey,
                                    decryptedSenderPrivateKey
                                );
                            }
                        },
                        oneose: () => {
                            const currentChats = this.chatList || [];
                            if (currentChats.length > 0) {
                                this._chats.next(this.chatList);
                            }
                        },
                    }
                );
        });

        return this.getChatListStream();
    }

    private async processNextMessage(
        pubkey: string,
        useExtension: boolean,
        useSecretKey: boolean,
        decryptedSenderPrivateKey: string
    ): Promise<void> {
        if (this.isDecrypting || this.messageQueue.length === 0) return;

        this.isDecrypting = true;

        try {
            while (this.messageQueue.length > 0) {
                const event = this.messageQueue.shift();
                if (!event) continue;

                const isSentByUser = event.pubkey === pubkey;
                const otherPartyPubKey = isSentByUser
                    ? event.tags.find((tag) => tag[0] === 'p')?.[1] || ''
                    : event.pubkey;

                if (!otherPartyPubKey) continue;

                const decryptedMessage = await this.decryptReceivedMessage(
                    event,
                    useExtension,
                    useSecretKey,
                    decryptedSenderPrivateKey,
                    otherPartyPubKey
                );

                if (decryptedMessage) {
                    this.addOrUpdateChatList(
                        otherPartyPubKey,
                        decryptedMessage,
                        event.created_at,
                        isSentByUser
                    );
                }
            }
        } catch (error) {
           // console.error(error);
        } finally {
            this.isDecrypting = false;
        }
    }

    private addOrUpdateChatList(
        pubKey: string,
        message: string,
        createdAt: number,
        isMine: boolean
    ): void {
        const existingChat = this.chatList.find((chat) => chat.contact?.pubKey === pubKey);

        const newMessage = {
            id: `${pubKey}-${createdAt}`,
            chatId: pubKey,
            contactId: pubKey,
            isMine,
            value: message,
            createdAt: new Date(createdAt * 1000).toISOString(),
        };

        if (existingChat) {
            const messageExists = existingChat.messages?.some((m) => m.id === newMessage.id);

            if (!messageExists) {
                existingChat.messages = [
                    ...(existingChat.messages || []),
                    newMessage,
                ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

                if (Number(existingChat.lastMessageAt) < createdAt) {
                    existingChat.lastMessage = message;
                    existingChat.lastMessageAt = createdAt.toString();
                }
            }
        } else {
             this._metadataQueueService.addPublicKey(pubKey);


             const contactInfo = this._contacts.value?.find((contact) => contact.pubKey === pubKey) || { pubKey };

            const newChat: Chat = {
                id: pubKey,
                contact: {
                    pubKey: contactInfo.pubKey,
                    name: contactInfo.name || 'Unknown',
                    picture: contactInfo.picture || '/images/avatars/avatar-placeholder.png',
                    about: contactInfo.about || '',
                    displayName: contactInfo.displayName || contactInfo.name || 'Unknown',
                },
                lastMessage: message,
                lastMessageAt: createdAt.toString(),
                messages: [newMessage],
            };
            this.chatList.push(newChat);
        }

         this.chatList.sort((a, b) => Number(b.lastMessageAt!) - Number(a.lastMessageAt!));
        this._chats.next(this.chatList);

         this._storageService.profile$.pipe(
            filter((profile) => profile && profile.pubKey === pubKey)
        ).subscribe((updatedProfile) => {
            const chatToUpdate = this.chatList.find((chat) => chat.contact?.pubKey === pubKey);
            if (chatToUpdate) {
                chatToUpdate.contact = {
                    ...chatToUpdate.contact,
                    name: updatedProfile.metadata?.name || chatToUpdate.contact.name,
                    picture: updatedProfile.metadata?.picture || chatToUpdate.contact.picture,
                    about: updatedProfile.metadata?.about || chatToUpdate.contact.about,
                    displayName: updatedProfile.metadata?.displayName || updatedProfile.metadata?.name || chatToUpdate.contact.displayName,
                };
                this._chats.next(this.chatList);

            }
        });
    }


    getChatListStream(): Observable<Chat[]> {
        return this._chats.asObservable();
    }

    private async decryptReceivedMessage(
        event: NostrEvent,
        useExtension: boolean,
        useSecretKey: boolean,
        decryptedSenderPrivateKey: string,
        recipientPublicKey: string
    ): Promise<string> {
        if (useExtension && !useSecretKey) {
            return await this._signerService.decryptMessageWithExtension(
                recipientPublicKey,
                event.content
            );
        } else if (useSecretKey && !useExtension) {
            return await this._signerService.decryptMessage(
                decryptedSenderPrivateKey,
                recipientPublicKey,
                event.content
            );
        }
    }

    private async loadAndFetchChatHistory(pubKey: string, collectMessages = false): Promise<any[] | void> {
        const myPubKey = this._signerService.getPublicKey();
        const historyFilter: Filter[] = [
            {
                kinds: [EncryptedDirectMessage],
                authors: [myPubKey],
                '#p': [pubKey],
                limit: 10,
            },
            {
                kinds: [EncryptedDirectMessage],
                authors: [pubKey],
                '#p': [myPubKey],
                limit: 10,
            },
        ];

        const messages: any[] = [];

        this._relayService
            .getPool()
            .subscribeMany(
                this._relayService.getConnectedRelays(),
                historyFilter,
                {
                    onevent: async (event: NostrEvent) => {
                        const isSentByMe = event.pubkey === myPubKey;
                        const senderOrRecipientPubKey = isSentByMe ? pubKey : event.pubkey;
                        const useExtension = await this._signerService.isUsingExtension();
                        const useSecretKey = await this._signerService.isUsingSecretKey();

                        const decryptedMessage = await this.decryptReceivedMessage(
                            event,
                            useExtension,
                            useSecretKey,
                            this.decryptedPrivateKey,
                            senderOrRecipientPubKey
                        );

                        if (decryptedMessage) {
                            const messageTimestamp = Math.floor(event.created_at);

                            const message = {
                                id: event.id,
                                chatId: pubKey,
                                contactId: senderOrRecipientPubKey,
                                isMine: isSentByMe,
                                value: decryptedMessage,
                                createdAt: new Date(messageTimestamp * 1000).toISOString(),
                            };

                            if (collectMessages) {
                                messages.push(message);
                            }

                            this.addOrUpdateChatList(pubKey, decryptedMessage, messageTimestamp, isSentByMe);
                            this._chat.next(this.chatList.find((chat) => chat.id === pubKey));
                        }
                    },
                    oneose: () => { },
                }
            );

        if (collectMessages) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return messages;
        }
    }


    updateChat(id: string, chat: Chat): Observable<Chat> {
        return this.chats$.pipe(
            take(1),
            switchMap((chats: Chat[] | null) => {
                const pubkey = chat.contact?.pubKey;

                if (!pubkey) {
                    return throwError('No public key found for this chat');
                }

                const event: any = {
                    kind: 4,
                    pubkey: pubkey,
                    content: JSON.stringify(chat),
                    created_at: Math.floor(Date.now() / 1000),
                    tags: [['p', pubkey]],
                };

                event.id = getEventHash(event);

                return from(
                    this._relayService.publishEventToWriteRelays(event)
                ).pipe(
                    map(() => {
                        if (chats) {
                            const index = chats.findIndex(
                                (item) => item.id === id
                            );
                            if (index !== -1) {
                                chats[index] = chat;
                                this._chats.next(chats);
                            }
                        }
                        return chat;
                    }),
                    catchError((error) => {
                        console.error(
                            'Failed to update chat via Nostr:',
                            error
                        );
                        return throwError(error);
                    })
                );
            })
        );
    }

    getChatById(id: string, contact: Contact = null): Observable<Chat> {
        this.recipientPublicKey = id;

        return from(Promise.all([this._signerService.getPublicKey()])).pipe(
            switchMap(() => {
                return this.chats$.pipe(
                    take(1),
                    switchMap((chats: Chat[] | null) => {
                        if (!chats || chats.length === 0) {
                            return this.createNewChat(id, contact);
                        }

                        const cachedChat = chats.find((chat) => chat.id === id);
                        if (cachedChat) {
                            this._chat.next(cachedChat);
                            this.loadAndFetchChatHistory(this.recipientPublicKey);
                            return of(cachedChat);
                        }

                        return this.createNewChat(id, contact);
                    })
                );
            }),
            catchError((error) => {
                console.error('Error fetching chat by id from Nostr:', error);
                return throwError(error);
            })
        );
    }

    createNewChat(id: string, contact: Contact = null): Observable<Chat> {
        const newChat: Chat = {
          id: id || '',
          contact: contact
            ? {
                pubKey: contact.pubKey || id,
                name: contact.name || 'Unknown',
                picture: contact.picture || '/images/avatars/avatar-placeholder.png',
              }
            : {
                pubKey: id,
                name: 'Unknown',
                picture: '/images/avatars/avatar-placeholder.png',
              },
          lastMessage: 'new chat...',
          lastMessageAt: Math.floor(Date.now() / 1000).toString() || '0',
          messages: [],
        };

         this._metadataQueueService.addPublicKey(id);

         return this._storageService.profile$.pipe(
          filter(profileData => profileData && profileData.pubKey === id),
          map(profileData => {
            newChat.contact = {
              pubKey: id,
              name: profileData.metadata?.name || 'Unknown',
              picture: profileData.metadata?.picture || '/images/avatars/avatar-placeholder.png',
              about: profileData.metadata?.about || '',
              displayName: profileData.metadata?.displayName || profileData.metadata?.name || 'Unknown',
            };
            return newChat;
          })
        );
      }

    resetChat(): void {
        this._chat.next(null);
    }

    public async sendPrivateMessage(message: string): Promise<void> {
        try {
            this.message = message;

            const useExtension = await this._signerService.isUsingExtension();
            const useSecretKey = await this._signerService.isUsingSecretKey();
            if (useExtension && !useSecretKey) {
                await this.handleMessageSendingWithExtension();
            } else if (!useExtension && useSecretKey) {
                if (!this.isValidMessageSetup()) {
                    console.error(
                        'Message, sender private key, or recipient public key is not properly set.'
                    );
                    return;
                }
                const encryptedMessage =
                    await this._signerService.encryptMessage(
                        this.decryptedPrivateKey,
                        this.recipientPublicKey,
                        this.message
                    );

                const messageEvent = this._signerService.getUnsignedEvent(
                    4,
                    [['p', this.recipientPublicKey]],
                    encryptedMessage
                );

                const signedEvent = this._signerService.getSignedEvent(
                    messageEvent,
                    this.decryptedPrivateKey
                );

                const published =
                    await this._relayService.publishEventToWriteRelays(signedEvent);

                if (published) {
                    this.message = '';
                } else {
                    console.error('Failed to send the message.');
                }
            }
        } catch (error) {
            console.error('Error sending private message:', error);
        }
    }

    private async handleMessageSendingWithExtension(): Promise<void> {
        try {
            const encryptedMessage =
                await this._signerService.encryptMessageWithExtension(
                    this.message,
                    this.recipientPublicKey
                );

            const signedEvent =
                await this._signerService.signEventWithExtension({
                    kind: 4,
                    pubkey: this._signerService.getPublicKey(),
                    tags: [['p', this.recipientPublicKey]],
                    content: encryptedMessage,
                    created_at: Math.floor(Date.now() / 1000),
                });

            const published =
                await this._relayService.publishEventToWriteRelays(signedEvent);

            if (published) {
                this.message = '';
            } else {
                console.error('Failed to send the message with extension.');
            }
        } catch (error) {
            console.error('Error sending message with extension:', error);
        }
    }

    private isValidMessageSetup(): boolean {
        return this.message.trim() !== '' && this.recipientPublicKey !== '';
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
