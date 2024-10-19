import { Injectable } from '@angular/core';
import localForage from 'localforage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, ProjectStats } from './projects.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private metadataSubject = new BehaviorSubject<any>(null);
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private projectStatsSubject = new BehaviorSubject<{ [key: string]: ProjectStats }>({});

  private userStore: LocalForage;
  private projectsStore: LocalForage;
  private projectStatsStore: LocalForage;
  private followersStore: LocalForage;
  private followingStore: LocalForage;
  private updateHistoryStore: LocalForage;

  constructor() {
    this.userStore = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName: 'users',
    });

    this.updateHistoryStore = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName: 'updateHistory',
    });

    this.followersStore = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName: 'followers',
    });

    this.followingStore = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName: 'following',
    });

    this.projectsStore = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName: 'projects',
    });

    this.projectStatsStore = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName: 'projectStats',
    });

    this.loadAllProjectsFromDB();
    this.loadAllProjectStatsFromDB();
  }

  async setUpdateHistory(tableName: string): Promise<void> {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    await this.updateHistoryStore.setItem(tableName, currentTimestamp);
  }

  async getLastUpdateDate(tableName: string): Promise<string | null> {
    const lastUpdate = await this.updateHistoryStore.getItem(tableName);
    return lastUpdate ? (lastUpdate as string) : null;
  }

  async saveFollowers(pubKey: string, followers: string[]): Promise<void> {
    await this.followersStore.setItem(pubKey, followers);
    await this.setUpdateHistory('followers');
  }

  async getFollowers(pubKey: string): Promise<string[]> {
    return (await this.followersStore.getItem(pubKey)) || [];
  }

  async saveFollowing(pubKey: string, following: string[]): Promise<void> {
    await this.followingStore.setItem(pubKey, following);
    await this.setUpdateHistory('following');
  }

  async getFollowing(pubKey: string): Promise<string[]> {
    return (await this.followingStore.getItem(pubKey)) || [];
  }

  getProjectsObservable(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  async saveProject(project: Project): Promise<void> {
    await this.projectsStore.setItem(project.projectIdentifier, project);
    const updatedProjects = await this.getAllProjects();
    this.projectsSubject.next(updatedProjects);
    await this.setUpdateHistory('projects');
  }

  async getProject(projectIdentifier: string): Promise<Project | null> {
    return (await this.projectsStore.getItem<Project>(projectIdentifier)) || null;
  }

  async getAllProjects(): Promise<Project[]> {
    const projects: Project[] = [];
    await this.projectsStore.iterate<Project, void>((value) => projects.push(value));
    return projects;
  }

  getProjectStatsObservable(): Observable<{ [key: string]: ProjectStats }> {
    return this.projectStatsSubject.asObservable();
  }

  async saveProjectStats(projectIdentifier: string, stats: ProjectStats): Promise<void> {
    await this.projectStatsStore.setItem(projectIdentifier, stats);
    const updatedStats = await this.getAllProjectStats();
    this.projectStatsSubject.next(updatedStats);
    await this.setUpdateHistory('projectStats');
  }

  async getProjectStats(projectIdentifier: string): Promise<ProjectStats | null> {
    return (await this.projectStatsStore.getItem<ProjectStats>(projectIdentifier)) || null;
  }

  async getAllProjectStats(): Promise<{ [key: string]: ProjectStats }> {
    const statsMap: { [key: string]: ProjectStats } = {};
    await this.projectStatsStore.iterate<ProjectStats, void>((value, key) => {
      statsMap[key] = value;
    });
    return statsMap;
  }

  getMetadataStream(): Observable<any> {
    return this.metadataSubject.asObservable();
  }

  async getUserMetadata(pubkey: string): Promise<any | null> {
    return (await this.userStore.getItem(pubkey)) || null;
  }

  async saveUserMetadata(pubKey: string, metadata: any): Promise<void> {
    metadata.pubKey = pubKey;
    await this.userStore.setItem(pubKey, metadata);
    this.metadataSubject.next({ pubKey, metadata });
    await this.setUpdateHistory('users');
  }

  async removeUserMetadata(pubkey: string): Promise<void> {
    await this.userStore.removeItem(pubkey);
    this.metadataSubject.next({ pubkey, metadata: null });
    await this.setUpdateHistory('users');
  }

  private async loadAllProjectsFromDB(): Promise<void> {
    const projects = await this.getAllProjects();
    this.projectsSubject.next(projects);
  }

  private async loadAllProjectStatsFromDB(): Promise<void> {
    const stats = await this.getAllProjectStats();
    this.projectStatsSubject.next(stats);
  }

  async getAllUsers(): Promise<any[]> {
    const users: any[] = [];
    await this.userStore.iterate((value) => users.push(value));
    return users;
  }

  async getSuggestionUsers(): Promise<{ pubkey: string; metadata: any }[]> {
    const users: { pubkey: string; metadata: any }[] = [];
    await this.userStore.iterate<any, void>((metadata, pubkey) => {
      users.push({ pubkey, metadata });
    });

    const count = Math.min(users.length, 16);
    return this.getRandomItems(users, count);
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async clearAllMetadata(): Promise<void> {
    await this.userStore.clear();
    this.metadataSubject.next(null);
  }

  async searchUsersByMetadata(query: string): Promise<{ pubkey: string; user: any }[]> {
    const matchingUsers: { pubkey: string; user: any }[] = [];
    const searchQuery = query.toLowerCase();

    await this.userStore.iterate<any, void>((user, pubkey) => {
      const userString = JSON.stringify(user).toLowerCase();
      if (userString.includes(searchQuery)) {
        matchingUsers.push({ pubkey, user });
      }
    });

    return matchingUsers;
  }
}
