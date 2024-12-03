import { Injectable } from '@angular/core';
import localForage from 'localforage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter, NostrEvent } from 'nostr-tools';
import { SubscriptionService } from './subscription.service';
import { InvestorDetails, Project, ProjectDetails, ProjectStatistics } from 'app/interface/project.interface';

export interface ChatEvent {
    id: string;
    pubkey: string;
    created_at: number;
    tags: string[][];
    content: string;
    IsRead: boolean;
}
export interface ContactEvent {
    id: string;
    pubkey: string;
    created_at: number;
    tags: string[][];
    isFollower: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private profileSubject = new BehaviorSubject<any>(null);
    private projectsSubject = new BehaviorSubject<Project[]>([]);
    private projectStatsSubject = new BehaviorSubject<{ [key: string]: ProjectStatistics }>({});
    private chatEventsSubject = new BehaviorSubject<ChatEvent[]>([]);
    private unreadChatCountSubject = new BehaviorSubject<number>(0);
    private contactsSubject = new BehaviorSubject<{ pubKey: string, contacts: ContactEvent[] }>({ pubKey: '', contacts: [] });
    private postsSubject = new BehaviorSubject<any>(null);
    private myLikesSubject = new BehaviorSubject<any[]>([]);
    private notificationsSubject = new BehaviorSubject<any[]>([]);
    private contactStatsSubject = new BehaviorSubject<{ totalContacts: number, followersCount: number, followingCount: number }>({ totalContacts: 0, followersCount: 0, followingCount: 0 });
    private investorsSubject = new BehaviorSubject<InvestorDetails[]>([]);
    private projectDetailsSubject = new BehaviorSubject<ProjectDetails[]>([]);

    private profileStore: LocalForage;
    private projectsStore: LocalForage;
    private projectDetailsStore: LocalForage;
    private projectStatsStore: LocalForage;
    private contactsStore: LocalForage;
    private chatsStore: LocalForage;
    private updateHistoryStore: LocalForage;
    private postsStore: LocalForage;
    private myLikesStore: LocalForage;
    private notificationsStore: LocalForage;
    private investorsStore: LocalForage;


    constructor() {
        this.profileStore = this.createStore('profiles');
        this.updateHistoryStore = this.createStore('updateHistory');
        this.contactsStore = this.createStore('contacts');
        this.chatsStore = this.createStore('chats');
        this.postsStore = this.createStore('posts');
        this.myLikesStore = this.createStore('myLikes');
        this.notificationsStore = this.createStore('notifications');
        this.projectsStore = this.createStore('projects');
        this.projectDetailsStore = this.createStore('projectDetails');
        this.projectStatsStore = this.createStore('projectStatistics');
        this.investorsStore = this.createStore('investors');

        // Load all data
        this.loadAllProjectsFromDB();
        this.loadAllProjectDetailsFromDB();
        this.loadAllProjectStatsFromDB();
        this.loadAllInvestorsFromDB();
        this.loadAllContactsFromDB();
        this.loadAllChatEventsFromDB();
        this.loadAllMyLikesFromDB();
        this.loadAllNotificationsFromDB();
        this.calculateAndStoreAllContactStats();
    }


    private createStore(storeName: string): LocalForage {
        return localForage.createInstance({
            driver: localForage.INDEXEDDB,
            name: 'angor-hub',
            version: 1.0,
            storeName,
        });
    }

    // --------- Observable Getters -----------
    get profile$(): Observable<any> {
        return this.profileSubject.asObservable();
    }

    get projects$(): Observable<Project[]> {
        return this.projectsSubject.asObservable();
    }

    get projectStats$(): Observable<{ [key: string]: ProjectStatistics }> {
        return this.projectStatsSubject.asObservable();
    }

    get chatEvents$(): Observable<ChatEvent[]> {
        return this.chatEventsSubject.asObservable();
    }

    get unreadChatCount$(): Observable<number> {
        return this.unreadChatCountSubject.asObservable();
    }

    get contacts$(): Observable<{ pubKey: string, contacts: ContactEvent[] }> {
        return this.contactsSubject.asObservable();
    }

    get posts$(): Observable<any> {
        return this.postsSubject.asObservable();
    }

    get contactStats$(): Observable<{ totalContacts: number, followersCount: number, followingCount: number }> {
        return this.contactStatsSubject.asObservable();
    }

    get myLikes$(): Observable<any[]> {
        return this.myLikesSubject.asObservable();
    }

    get notifications$(): Observable<any[]> {
        return this.notificationsSubject.asObservable();
    }

    get investors$(): Observable<InvestorDetails[]> {
        return this.investorsSubject.asObservable();
    }

    get projectDetails$(): Observable<ProjectDetails[]> {
        return this.projectDetailsSubject.asObservable();
    }
    //------------------------Investors --------------------------

    async saveInvestor(investor: InvestorDetails): Promise<void> {
        try {
            const key = `${investor.projectIdentifier}-${investor.investorPublicKey}`;
            await this.investorsStore.setItem(key, investor);

            // به‌روزرسانی BehaviorSubject
            const currentInvestors = this.investorsSubject.value;
            const updatedInvestors = [...currentInvestors.filter(i => i.projectIdentifier !== investor.projectIdentifier || i.investorPublicKey !== investor.investorPublicKey), investor];
            this.investorsSubject.next(updatedInvestors);

            console.log('Investor saved successfully:', investor);
        } catch (error) {
            console.error('Error saving investor:', error);
        }
    }

    async getInvestor(projectIdentifier: string, publicKey: string): Promise<InvestorDetails | null> {
        try {
            const key = `${projectIdentifier}-${publicKey}`;
            return (await this.investorsStore.getItem<InvestorDetails>(key)) || null;
        } catch (error) {
            console.error('Error retrieving investor:', error);
            return null;
        }
    }

    async getAllInvestors(): Promise<InvestorDetails[]> {
        try {
            const investors: InvestorDetails[] = [];
            await this.investorsStore.iterate<InvestorDetails, void>((value) => {
                investors.push(value);
            });
            console.log('Retrieved all investors:', investors);
            return investors;
        } catch (error) {
            console.error('Error retrieving all investors:', error);
            return [];
        }
    }


    //--------------------- ProjectDetails -----------------------

    async saveProjectDetails(details: ProjectDetails): Promise<void> {
        try {
            const key = details.projectIdentifier;
            await this.projectDetailsStore.setItem(key, details);

             const currentDetails = this.projectDetailsSubject.value;
            const updatedDetails = [...currentDetails.filter(d => d.projectIdentifier !== details.projectIdentifier), details];
            this.projectDetailsSubject.next(updatedDetails);

            console.log('Project details saved successfully:', details);
        } catch (error) {
            console.error('Error saving project details:', error);
        }
    }

    async getProjectDetails(projectIdentifier: string): Promise<ProjectDetails | null> {
        try {
            return (await this.projectDetailsStore.getItem<ProjectDetails>(projectIdentifier)) || null;
        } catch (error) {
            console.error('Error retrieving project details:', error);
            return null;
        }
    }

    async getAllProjectDetails(): Promise<ProjectDetails[]> {
        try {
            const details: ProjectDetails[] = [];
            await this.projectDetailsStore.iterate<ProjectDetails, void>((value) => {
                details.push(value);
            });
            console.log('Retrieved all project details:', details);
            return details;
        } catch (error) {
            console.error('Error retrieving all project details:', error);
            return [];
        }
    }

    // --------------------- Contacts Methods ---------------------

    async saveContacts(pubKey: string, contacts: ContactEvent[]): Promise<void> {
        try {
            const savedContacts: ContactEvent[] = [];
            for (const contact of contacts) {
                const key = `${pubKey}:${contact.id}`;
                await this.contactsStore.setItem(key, contact);
                savedContacts.push(contact);
            }
            this.contactsSubject.next({ pubKey, contacts: savedContacts });

            await this.calculateAndStoreAllContactStats();

            await this.setUpdateHistory('contacts');
        } catch (error) {
            console.error('Error saving contacts:', error);
        }
    }


    private contactStatsMap: { [pubKey: string]: BehaviorSubject<{ pubKey: string, totalContacts: number, followersCount: number, followingCount: number }> } = {};

    private async calculateAndStoreAllContactStats(): Promise<void> {
        try {
            const statsMap: { [pubKey: string]: { totalContacts: number, followersCount: number, followingCount: number } } = {};

            await this.contactsStore.iterate<ContactEvent, void>((contact, key) => {
                const [storedPubKey] = key.split(':');
                if (!statsMap[storedPubKey]) {
                    statsMap[storedPubKey] = { totalContacts: 0, followersCount: 0, followingCount: 0 };
                }
                statsMap[storedPubKey].totalContacts++;
                if (contact.isFollower) {
                    statsMap[storedPubKey].followersCount++;
                } else {
                    statsMap[storedPubKey].followingCount++;
                }
            });

            for (const pubKey in statsMap) {
                if (!this.contactStatsMap[pubKey]) {
                    this.contactStatsMap[pubKey] = new BehaviorSubject<{ pubKey: string, totalContacts: number, followersCount: number, followingCount: number }>({
                        pubKey,
                        totalContacts: 0,
                        followersCount: 0,
                        followingCount: 0,
                    });
                }
                this.contactStatsMap[pubKey].next({
                    pubKey,
                    totalContacts: statsMap[pubKey].totalContacts,
                    followersCount: statsMap[pubKey].followersCount,
                    followingCount: statsMap[pubKey].followingCount,
                });
            }
        } catch (error) {
            console.error('Error calculating and storing contact stats:', error);
        }
    }


    getContactStats$(pubKey: string): Observable<{ pubKey: string, totalContacts: number, followersCount: number, followingCount: number }> {
        if (!this.contactStatsMap[pubKey]) {
            this.contactStatsMap[pubKey] = new BehaviorSubject<{ pubKey: string, totalContacts: number, followersCount: number, followingCount: number }>({
                pubKey,
                totalContacts: 0,
                followersCount: 0,
                followingCount: 0,
            });

            this.calculateAndStoreAllContactStats();
        }
        return this.contactStatsMap[pubKey].asObservable();
    }




    async getAllContactsPaginated(pubKey: string, page: number, pageSize: number): Promise<{ contacts: ContactEvent[], totalCount: number }> {
        try {
            const allContacts: ContactEvent[] = [];
            await this.contactsStore.iterate<ContactEvent, void>((contact, key) => {
                const [storedPubKey] = key.split(':');
                if (storedPubKey === pubKey) {
                    allContacts.push(contact);
                }
            });

            const totalCount = allContacts.length;
            const start = (page - 1) * pageSize;
            const end = start + pageSize;

            return {
                contacts: allContacts.slice(start, end),
                totalCount,
            };
        } catch (error) {
            console.error('Error retrieving paginated contacts for pubKey:', error);
            return { contacts: [], totalCount: 0 };
        }
    }

    async getAllContacts(pubKey: string = ""): Promise<{ pubKey: string, contact: ContactEvent }[]> {
        try {
            const allContacts: { pubKey: string, contact: ContactEvent }[] = [];
            await this.contactsStore.iterate<ContactEvent, void>((contact, key) => {
                const [storedPubKey, contactId] = key.split(':');

                if (pubKey === "" || storedPubKey === pubKey) {
                    allContacts.push({ pubKey: storedPubKey, contact });
                }
            });

            return allContacts;
        } catch (error) {
            console.error('Error retrieving contacts:', error);
            return [];
        }
    }

    async getContactStats(pubKey: string): Promise<{ totalContacts: number, followersCount: number, followingCount: number }> {
        try {
            let totalContacts = 0;
            let followersCount = 0;
            let followingCount = 0;

            await this.contactsStore.iterate<ContactEvent, void>((contact, key) => {
                const [storedPubKey, contactId] = key.split(':');

                if (storedPubKey === pubKey) {
                    totalContacts++;

                    if (contact.isFollower) {
                        followersCount++;
                    } else {
                        followingCount++;
                    }
                }
            });

            return {
                totalContacts,
                followersCount,
                followingCount,
            };
        } catch (error) {
            console.error('Error retrieving contact stats for pubKey:', error);
            return { totalContacts: 0, followersCount: 0, followingCount: 0 };
        }
    }


    async removeAllContacts(pubKey: string): Promise<void> {
        try {
            const keysToRemove: string[] = [];

            await this.contactsStore.iterate<ContactEvent, void>((contact, key) => {
                const [storedPubKey] = key.split(':');
                if (storedPubKey === pubKey) {
                    keysToRemove.push(key);
                }
            });

            for (const key of keysToRemove) {
                await this.contactsStore.removeItem(key);
            }

            await this.contactsStore.clear();
            this.contactStatsSubject.next({ totalContacts: 0, followersCount: 0, followingCount: 0 });

            this.contactsSubject.next({ pubKey, contacts: [] });
            await this.setUpdateHistory('contacts');
        } catch (error) {
            console.error('Error removing all contacts for pubKey:', error);
        }
    }


    // --------------------- profiles Metadata Methods ---------------------
    async saveProfile(pubKey: string, metadata: any): Promise<void> {
        try {
            if (!pubKey || !metadata) {
                console.error('Invalid pubKey or metadata:', pubKey, metadata);
                return;
            }

            metadata.pubKey = pubKey;
            await this.profileStore.setItem(pubKey, metadata);

            this.profileSubject.next({ pubKey, metadata });

            await this.setUpdateHistory('profiles');
        } catch (error) {
            console.error('Error saving profile', error);
        }
    }


    async getProfile(pubKey: string): Promise<any | null> {
        try {
            return (await this.profileStore.getItem<any>(pubKey)) || null;
        } catch (error) {
            console.error('Error retrieving profile metadata:', error);
            return null;
        }
    }

    async getAllProfiles(): Promise<any[]> {
        try {
            const profiles: any[] = [];
            await this.profileStore.iterate<any, void>((value) => {
                profiles.push(value);
            });
            return profiles;
        } catch (error) {
            console.error('Error retrieving all Profile:', error);
            return [];
        }
    }

    async searchProfile(query: string): Promise<{ pubKey: string; profile: any }[]> {
        try {
            const matchingProfiles: { pubKey: string; profile: any }[] = [];
            const searchQuery = query.toLowerCase();

            await this.profileStore.iterate<any, void>((profile, pubKey) => {
                const profileString = JSON.stringify(profile).toLowerCase();
                if (profileString.includes(searchQuery)) {
                    matchingProfiles.push({ pubKey, profile });
                }
            });

            return matchingProfiles;
        } catch (error) {
            console.error('Error searching profiles by metadata:', error);
            return [];
        }
    }

    async getLastUpdateDate(tableName: string): Promise<string | null> {
        try {
            const lastUpdate = await this.updateHistoryStore.getItem(tableName);
            return lastUpdate ? (lastUpdate as string) : null;
        } catch (error) {
            console.error('Error retrieving last update date:', error);
            return null;
        }
    }

    // --------------------- Project Methods ---------------------
    async saveProject(project: Project): Promise<void> {
        try {
            await this.projectsStore.setItem(project.projectIdentifier, project);
            const updatedProjects = await this.getAllProjects();
            this.projectsSubject.next(updatedProjects);
            await this.setUpdateHistory('projects');
        } catch (error) {
            console.error('Error saving project:', error);
        }
    }


    async getProjectsByNostrPubKeys(nostrPubKeys: string[]): Promise<ProjectDetails[]> {
        if (!nostrPubKeys || nostrPubKeys.length === 0) {
            return [];
        }

        const projects: ProjectDetails[] = [];
        const allKeys = await this.projectDetailsStore.keys();
        for (const key of allKeys) {
            const project = await this.projectDetailsStore.getItem<ProjectDetails>(key);

            if (project && nostrPubKeys.includes(project.nostrPubKey)) {
                projects.push(project);

            }
        }

        return projects;
    }


    async getAllProjects(): Promise<Project[]> {
        try {
            const projects: Project[] = [];
            await this.projectsStore.iterate<Project, void>((value) => {
                projects.push(value);
            });
            return projects;
        } catch (error) {
            console.error('Error retrieving all projects:', error);
            return [];
        }
    }

    async getProjectStats(projectIdentifier: string): Promise<ProjectStatistics | null> {
        try {
            return (await this.projectStatsStore.getItem<ProjectStatistics>(projectIdentifier)) || null;
        } catch (error) {
            console.error('Error retrieving project stats:', error);
            return null;
        }
    }

    async saveProjectStats(projectIdentifier: string, stats: ProjectStatistics): Promise<void> {
        try {
            await this.projectStatsStore.setItem(projectIdentifier, stats);
            const updatedStats = await this.getAllProjectStats();
            this.projectStatsSubject.next(updatedStats);
            await this.setUpdateHistory('projectStats');
        } catch (error) {
            console.error('Error saving project stats:', error);
        }
    }

    async getAllProjectStats(): Promise<{ [key: string]: ProjectStatistics }> {
        try {
            const statsMap: { [key: string]: ProjectStatistics } = {};
            await this.projectStatsStore.iterate<ProjectStatistics, void>((value, key) => {
                statsMap[key] = value;
            });
            return statsMap;
        } catch (error) {
            console.error('Error retrieving all project stats:', error);
            return {};
        }
    }

    // ------------------- Posts Methods -------------------

    async savePost(event: any): Promise<void> {
        try {
            await this.postsStore.setItem(event.id, event);
            await this.setUpdateHistory('posts');

            this.postsSubject.next(event);

        } catch (error) {
            console.error('Error saving event type 1 and sending it to clients:', error);
        }
    }

    async getPostsByPubKey(pubKey: string): Promise<any[]> {
        try {
            const events: any[] = [];
            await this.postsStore.iterate<any, void>((event) => {
                if (event.pubkey === pubKey && event.kind === 1) {
                    events.push(event);
                }
            });
            // Sort events by date (assuming 'createdAt' is the timestamp property)
            return events.sort((a, b) => b.createdAt - a.createdAt);
        } catch (error) {
            console.error('Error retrieving events for pubKey:', error);
            return [];
        }
    }

    async getPostById(id: string): Promise<any | null> {
        try {
            let post = null;

            // Use early return to avoid unnecessary iterations
            await this.postsStore.iterate<any, void>((event) => {
                if (event.id === id && event.kind === 1) {
                    post = event;
                    return post; // Exit early once the post is found
                }
            });

            return post;
        } catch (error) {
            console.error('Error retrieving post by ID:', error);
            return null;
        }
    }

    async getAllPostsWithPagination(page: number, limit: number = 10): Promise<any[]> {
        try {
            const events: any[] = [];
            const offset = (page - 1) * limit;

            await this.postsStore.iterate<any, void>((event) => {
                if (event.kind === 1) {
                    events.push(event);
                }
            });

            return events
                .sort((a, b) => b.created_at - a.created_at)
                .slice(offset, offset + limit);
        } catch (error) {
            console.error('Error retrieving all posts with pagination:', error);
            return [];
        }
    }


    async getPostsByPubKeysWithPagination(pubKeys: string[], page: number, limit: number = 10): Promise<any[]> {
        try {
            const events: any[] = [];

            const offset = (page - 1) * limit;

            await this.postsStore.iterate<any, void>((event) => {
                if (pubKeys.includes(event.pubkey) && event.kind === 1) {
                    events.push(event);
                }
            });

            return events
                .sort((a, b) => b.created_at - a.created_at)
                .slice(offset, offset + limit);
        } catch (error) {
            console.error('Error retrieving events for pubKeys with pagination:', error);
            return [];
        }
    }

    // ------------------- MyLikes Methods -------------------

    async saveLike(like: any): Promise<void> {
        try {
            await this.myLikesStore.setItem(like.id, like);
            const allLikes = await this.getAllMyLikes();
            this.myLikesSubject.next(allLikes);
            await this.setUpdateHistory('myLikes');
        } catch (error) {
            console.error('Error saving like:', error);
        }
    }

    async getAllMyLikes(): Promise<string[]> {
        try {
            const eventIds: string[] = [];
            await this.myLikesStore.iterate<any, void>((value) => {
                try {
                    const tag = value.tags.find((t: string[]) => t[0] === "e");
                    if (tag) {
                        eventIds.push(tag[1]);
                    }
                } catch (error) {
                    console.warn('Error parsing like:', value, error);
                }
            });
            return eventIds;
        } catch (error) {
            console.error('Error retrieving all likes:', error);
            return [];
        }
    }

    // ------------------- Notifications Methods -------------------
    async saveNotification(notification: any): Promise<void> {
        try {
            await this.notificationsStore.setItem(notification.id, notification);
            const allNotifications = await this.getAllNotifications();
            this.notificationsSubject.next(allNotifications);
            await this.setUpdateHistory('notifications');
        } catch (error) {
            console.error('Error saving notification:', error);
        }
    }

    async getAllNotifications(): Promise<any[]> {
        try {
            const notifications: any[] = [];
            await this.notificationsStore.iterate<any, void>((value) => {
                notifications.push(value);
            });
            return notifications;
        } catch (error) {
            console.error('Error retrieving all notifications:', error);
            return [];
        }
    }

    // ------------------- Chat Events Methods -------------------
    async saveChatEvent(event: ChatEvent): Promise<void> {
        try {
            await this.chatsStore.setItem(event.id, event);
            await this.setUpdateHistory('chats');
            const allEvents = await this.getAllChatEvents();
            this.chatEventsSubject.next(allEvents);
            this.updateUnreadChatCount(allEvents);
        } catch (error) {
            console.error('Error saving chat event:', error);
        }
    }

    async getAllChatEvents(): Promise<ChatEvent[]> {
        try {
            const events: ChatEvent[] = [];
            await this.chatsStore.iterate<ChatEvent, void>((value) => {
                events.push(value);
            });
            return events;
        } catch (error) {
            console.error('Error retrieving all chat events:', error);
            return [];
        }
    }

    async getChatEventsByPubKey(pubKey: string): Promise<ChatEvent[]> {
        try {
            const events: ChatEvent[] = [];
            await this.chatsStore.iterate<ChatEvent, void>((event) => {
                const receiverPubKey = this.getReceiverPubKeyFromTags(event.tags);
                if (event.pubkey === pubKey || receiverPubKey === pubKey) {
                    events.push(event);
                }
            });
            return events;
        } catch (error) {
            console.error('Error retrieving chat events by pubkey:', error);
            return [];
        }
    }

    async updateChatEventReadStatus(eventId: string, isRead: boolean): Promise<void> {
        try {
            const event = await this.chatsStore.getItem<ChatEvent>(eventId);
            if (event) {
                event.IsRead = isRead;
                await this.chatsStore.setItem(eventId, event);
                const allEvents = await this.getAllChatEvents();
                this.chatEventsSubject.next(allEvents);
                this.updateUnreadChatCount(allEvents);
            }
        } catch (error) {
            console.error('Error updating chat event read status:', error);
        }
    }

    async markAllChatEventsAsRead(pubKey: string): Promise<void> {
        try {
            await this.chatsStore.iterate<ChatEvent, void>(async (event, key) => {
                const receiverPubKey = this.getReceiverPubKeyFromTags(event.tags);
                if ((event.pubkey === pubKey || receiverPubKey === pubKey) && !event.IsRead) {
                    event.IsRead = true;
                    await this.chatsStore.setItem(key, event);
                }
            });
            const allEvents = await this.getAllChatEvents();
            this.chatEventsSubject.next(allEvents);
            this.updateUnreadChatCount(allEvents);
        } catch (error) {
            console.error('Error marking all chat events as read:', error);
        }
    }

    private getReceiverPubKeyFromTags(tags: string[][]): string | null {
        for (const tag of tags) {
            if (tag[0] === 'p' && tag[1]) {
                return tag[1];
            }
        }
        return null;
    }

    private updateUnreadChatCount(allEvents: ChatEvent[]): void {
        const unreadCount = allEvents.filter(event => !event.IsRead).length;
        this.unreadChatCountSubject.next(unreadCount);
    }


    async removeAllChats(): Promise<void> {
        try {
            await this.chatsStore.clear();
            this.chatEventsSubject.next([]);
            this.unreadChatCountSubject.next(0);
            console.log('All chat events have been removed successfully.');
        } catch (error) {
            console.error('Error removing all chat events:', error);
        }
    }



    // ------------------- Other Helper Methods -------------------
    async setUpdateHistory(tableName: string): Promise<void> {
        try {
            const currentTimestamp = Math.floor(Date.now() / 1000);
            await this.updateHistoryStore.setItem(tableName, currentTimestamp);
        } catch (error) {
            console.error('Error updating history:', error);
        }
    }

    private async loadAllProjectsFromDB(): Promise<void> {
        try {
            const projects = await this.getAllProjects();
            this.projectsSubject.next(projects);
        } catch (error) {
            console.error('Error loading projects from DB:', error);
        }
    }

    private async loadAllProjectStatsFromDB(): Promise<void> {
        try {
            const stats = await this.getAllProjectStats();
            this.projectStatsSubject.next(stats);
        } catch (error) {
            console.error('Error loading project stats from DB:', error);
        }
    }

    private async loadAllContactsFromDB(pubKey: string = ""): Promise<void> {
        try {
            const contacts = await this.getAllContacts(pubKey);
            if (contacts.length > 0) {
                const groupedContacts: { [pubKey: string]: ContactEvent[] } = {};

                for (const contact of contacts) {
                    if (!groupedContacts[contact.pubKey]) {
                        groupedContacts[contact.pubKey] = [];
                    }
                    groupedContacts[contact.pubKey].push(contact.contact);
                }
                for (const pubKey in groupedContacts) {
                    this.contactsSubject.next({ pubKey, contacts: groupedContacts[pubKey] });
                }
            }
        } catch (error) {
            console.error('Error loading contacts from DB:', error);
        }
    }

    private async loadAllChatEventsFromDB(): Promise<void> {
        try {
            const chatEvents = await this.getAllChatEvents();
            this.chatEventsSubject.next(chatEvents);
        } catch (error) {
            console.error('Error loading chat events from DB:', error);
        }
    }

    async loadPostsFromDB(pubKeys: string[], limit = 10, offset = 0): Promise<any[]> {
        try {
            const events: any[] = [];
            await this.postsStore.iterate<any, void>((event) => {
                if (pubKeys.includes(event.pubkey)) {
                    events.push(event);
                }
            });

            return events
                .sort((a, b) => b.created_at - a.created_at)
                .slice(offset, offset + limit);
        } catch (error) {
            console.error('Error retrieving events from DB:', error);
            return [];
        }
    }

    async loadPosts(pubKeys: string[], page: number): Promise<any> {
        const limit = 10;
        const offset = (page - 1) * limit;
        const postsFromDB = await this.loadPostsFromDB(pubKeys, limit, offset);

        if (postsFromDB.length > 0) {
            postsFromDB.forEach((post) => {
                this.postsSubject.next(post);
            });
        }
    }


    private async loadAllMyLikesFromDB(): Promise<void> {
        try {
            const likes = await this.getAllMyLikes();
            this.myLikesSubject.next(likes);
        } catch (error) {
            console.error('Error loading likes from DB:', error);
        }
    }

    private async loadAllNotificationsFromDB(): Promise<void> {
        try {
            const notifications = await this.getAllNotifications();
            this.notificationsSubject.next(notifications);
        } catch (error) {
            console.error('Error loading notifications from DB:', error);
        }
    }


    private async loadContactStatsFromDB(): Promise<void> {
        try {
            let totalContacts = 0;
            let followersCount = 0;
            let followingCount = 0;

            await this.contactsStore.iterate<ContactEvent, void>((contact, key) => {
                const [storedPubKey] = key.split(':');

                totalContacts++;

                if (contact.isFollower) {
                    followersCount++;
                } else {
                    followingCount++;
                }
            });

            this.contactStatsSubject.next({ totalContacts, followersCount, followingCount });
        } catch (error) {
            console.error('Error loading contact stats from DB:', error);
        }
    }

    private async loadAllInvestorsFromDB(): Promise<void> {
        try {
            const investors: InvestorDetails[] = [];
            await this.investorsStore.iterate<InvestorDetails, void>((value) => {
                investors.push(value);
            });
            console.log('Loaded Investors:', investors);

            this.investorsSubject.next(investors);
        } catch (error) {
            console.error('Error loading investors from DB:', error);
        }
    }

    private async loadAllProjectDetailsFromDB(): Promise<void> {
        try {
            const projectDetails: ProjectDetails[] = [];
            await this.projectDetailsStore.iterate<ProjectDetails, void>((value) => {
                projectDetails.push(value);
            });
            console.log('Loaded Project Details:', projectDetails);

            this.projectDetailsSubject.next(projectDetails);
        } catch (error) {
            console.error('Error loading project details from DB:', error);
        }
    }
}
