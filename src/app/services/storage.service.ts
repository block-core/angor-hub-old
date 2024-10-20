import { Injectable } from '@angular/core';
import localForage from 'localforage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, ProjectStats } from './projects.service';

export interface ChatEvent {
    id: string;
    kind: number;
    pubkey: string;
    created_at: number;
    tags: string[][];
    content: string;
    IsRead: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private profileSubject = new BehaviorSubject<any>(null);
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private projectStatsSubject = new BehaviorSubject<{ [key: string]: ProjectStats }>({});
  private chatEventsSubject = new BehaviorSubject<ChatEvent[]>([]);
  private unreadChatCountSubject = new BehaviorSubject<number>(0);
  private followersSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  private followingSubject = new BehaviorSubject<{ [key: string]: string[] }>({});
  private postsSubject = new BehaviorSubject<any>(null);
  private myLikesSubject = new BehaviorSubject<any[]>([]);
  private notificationsSubject = new BehaviorSubject<any[]>([]);




  private profileStore: LocalForage;
  private projectsStore: LocalForage;
  private projectStatsStore: LocalForage;
  private followersStore: LocalForage;
  private followingStore: LocalForage;
  private chatsStore: LocalForage;
  private updateHistoryStore: LocalForage;
  private postsStore: LocalForage;
  private myLikesStore: LocalForage;
  private notificationsStore: LocalForage;

  constructor() {
    this.profileStore = this.createStore('profiles');
    this.updateHistoryStore = this.createStore('updateHistory');
    this.followersStore = this.createStore('followers');
    this.chatsStore = this.createStore('chats');
    this.followingStore = this.createStore('following');
    this.postsStore = this.createStore('posts');
    this.myLikesStore = this.createStore('myLikes');
    this.notificationsStore = this.createStore('notifications');
    this.projectsStore = this.createStore('projects');
    this.projectStatsStore = this.createStore('projectStats');

    this.loadAllProjectsFromDB();
    this.loadAllProjectStatsFromDB();
    this.loadAllFollowersFromDB();
    this.loadAllFollowingFromDB();
    this.loadAllChatEventsFromDB();
    this.loadAllPostsFromDB();
    this.loadAllMyLikesFromDB();
    this.loadAllNotificationsFromDB();
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

  get projectStats$(): Observable<{ [key: string]: ProjectStats }> {
    return this.projectStatsSubject.asObservable();
  }

  get chatEvents$(): Observable<ChatEvent[]> {
    return this.chatEventsSubject.asObservable();
  }

  get unreadChatCount$(): Observable<number> {
    return this.unreadChatCountSubject.asObservable();
  }

  get followers$(): Observable<{ [key: string]: string[] }> {
    return this.followersSubject.asObservable();
  }

  get following$(): Observable<{ [key: string]: string[] }> {
    return this.followingSubject.asObservable();
  }

  get posts$(): Observable<any> {
    return this.postsSubject.asObservable();
  }

  get myLikes$(): Observable<any[]> {
    return this.myLikesSubject.asObservable();
  }

  get notifications$(): Observable<any[]> {
    return this.notificationsSubject.asObservable();
  }

  // --------------------- Followers Methods ---------------------
  async saveFollowers(pubKey: string, followers: string[]): Promise<void> {
    try {
      await this.followersStore.setItem(pubKey, followers);
      const updatedFollowers = await this.getAllFollowers();
      this.followersSubject.next(updatedFollowers);
      await this.setUpdateHistory('followers');
    } catch (error) {
      console.error('Error saving followers:', error);
    }
  }

  async getFollowers(pubKey: string): Promise<string[]> {
    try {
      return (await this.followersStore.getItem<string[]>(pubKey)) || [];
    } catch (error) {
      console.error('Error retrieving followers:', error);
      return [];
    }
  }

  async getAllFollowers(): Promise<{ [key: string]: string[] }> {
    try {
      const followersMap: { [key: string]: string[] } = {};
      await this.followersStore.iterate<string[], void>((followers, pubKey) => {
        followersMap[pubKey] = followers;
      });
      return followersMap;
    } catch (error) {
      console.error('Error retrieving all followers:', error);
      return {};
    }
  }

  // --------------------- Following Methods ---------------------
  async saveFollowing(pubKey: string, following: string[]): Promise<void> {
    try {
      await this.followingStore.setItem(pubKey, following);
      const updatedFollowing = await this.getAllFollowing();
      this.followingSubject.next(updatedFollowing);
      await this.setUpdateHistory('following');
    } catch (error) {
      console.error('Error saving following:', error);
    }
  }

  async getFollowing(pubKey: string): Promise<string[]> {
    try {
      return (await this.followingStore.getItem<string[]>(pubKey)) || [];
    } catch (error) {
      console.error('Error retrieving following:', error);
      return [];
    }
  }

  async getAllFollowing(): Promise<{ [key: string]: string[] }> {
    try {
      const followingMap: { [key: string]: string[] } = {};
      await this.followingStore.iterate<string[], void>((following, pubKey) => {
        followingMap[pubKey] = following;
      });
      return followingMap;
    } catch (error) {
      console.error('Error retrieving all following:', error);
      return {};
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

  async getProjectStats(projectIdentifier: string): Promise<ProjectStats | null> {
    try {
      return (await this.projectStatsStore.getItem<ProjectStats>(projectIdentifier)) || null;
    } catch (error) {
      console.error('Error retrieving project stats:', error);
      return null;
    }
  }

  async saveProjectStats(projectIdentifier: string, stats: ProjectStats): Promise<void> {
    try {
      await this.projectStatsStore.setItem(projectIdentifier, stats);
      const updatedStats = await this.getAllProjectStats();
      this.projectStatsSubject.next(updatedStats);
      await this.setUpdateHistory('projectStats');
    } catch (error) {
      console.error('Error saving project stats:', error);
    }
  }

  async getAllProjectStats(): Promise<{ [key: string]: ProjectStats }> {
    try {
      const statsMap: { [key: string]: ProjectStats } = {};
      await this.projectStatsStore.iterate<ProjectStats, void>((value, key) => {
        statsMap[key] = value;
      });
      return statsMap;
    } catch (error) {
      console.error('Error retrieving all project stats:', error);
      return {};
    }
  }

  // ------------------- Posts Methods -------------------

async savePostForPubKey(event: any): Promise<void> {
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
      return events;
    } catch (error) {
      console.error('Error retrieving events for pubKey:', error);
      return [];
    }
  }

  async getAllPostsForAllPubKeys(): Promise<any[]> {
    try {
      const events: any[] = [];
      await this.postsStore.iterate<any, void>((event) => {
          events.push(event);
      });
      return events;
    } catch (error) {
      console.error('Error retrieving all events:', error);
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

  async getAllMyLikes(): Promise<any[]> {
    try {
      const likes: any[] = [];
      await this.myLikesStore.iterate<any, void>((value) => {
        likes.push(value);
      });
      return likes;
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

  private async loadAllFollowersFromDB(): Promise<void> {
    try {
      const followers = await this.getAllFollowers();
      this.followersSubject.next(followers);
    } catch (error) {
      console.error('Error loading followers from DB:', error);
    }
  }

  private async loadAllFollowingFromDB(): Promise<void> {
    try {
      const following = await this.getAllFollowing();
      this.followingSubject.next(following);
    } catch (error) {
      console.error('Error loading following from DB:', error);
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

  private async loadAllPostsFromDB(): Promise<void> {
    try {
      const posts = await this.getAllPostsForAllPubKeys();
      this.postsSubject.next(posts);
    } catch (error) {
      console.error('Error loading posts from DB:', error);
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
}
