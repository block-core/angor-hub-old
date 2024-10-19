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
    this.userStore = this.createStore('users');
    this.updateHistoryStore = this.createStore('updateHistory');
    this.followersStore = this.createStore('followers');
    this.followingStore = this.createStore('following');
    this.projectsStore = this.createStore('projects');
    this.projectStatsStore = this.createStore('projectStats');

    this.loadAllProjectsFromDB();
    this.loadAllProjectStatsFromDB();
  }

  // Helper method to create a LocalForage store
  private createStore(storeName: string): LocalForage {
    return localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'angor-hub',
      version: 1.0,
      storeName,
    });
  }

  async setUpdateHistory(tableName: string): Promise<void> {
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      await this.updateHistoryStore.setItem(tableName, currentTimestamp);
    } catch (error) {
      console.error('Error updating history:', error);
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

  async saveFollowers(pubKey: string, followers: string[]): Promise<void> {
    try {
      await this.followersStore.setItem(pubKey, followers);
      await this.setUpdateHistory('followers');
    } catch (error) {
      console.error('Error saving followers:', error);
    }
  }

  async getFollowers(pubKey: string): Promise<string[]> {
    try {
      return (await this.followersStore.getItem(pubKey)) || [];
    } catch (error) {
      console.error('Error retrieving followers:', error);
      return [];
    }
  }

  async saveFollowing(pubKey: string, following: string[]): Promise<void> {
    try {
      await this.followingStore.setItem(pubKey, following);
      await this.setUpdateHistory('following');
    } catch (error) {
      console.error('Error saving following:', error);
    }
  }

  async getFollowing(pubKey: string): Promise<string[]> {
    try {
      return (await this.followingStore.getItem(pubKey)) || [];
    } catch (error) {
      console.error('Error retrieving following:', error);
      return [];
    }
  }

  getProjectsObservable(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

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

  async getProject(projectIdentifier: string): Promise<Project | null> {
    try {
      return (await this.projectsStore.getItem<Project>(projectIdentifier)) || null;
    } catch (error) {
      console.error('Error retrieving project:', error);
      return null;
    }
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      const projects: Project[] = [];
      await this.projectsStore.iterate<Project, void>((value) => projects.push(value));
      return projects;
    } catch (error) {
      console.error('Error retrieving all projects:', error);
      return [];
    }
  }

  getProjectStatsObservable(): Observable<{ [key: string]: ProjectStats }> {
    return this.projectStatsSubject.asObservable();
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

  async getProjectStats(projectIdentifier: string): Promise<ProjectStats | null> {
    try {
      return (await this.projectStatsStore.getItem<ProjectStats>(projectIdentifier)) || null;
    } catch (error) {
      console.error('Error retrieving project stats:', error);
      return null;
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

  getMetadataStream(): Observable<any> {
    return this.metadataSubject.asObservable();
  }

  async getUserMetadata(pubkey: string): Promise<any | null> {
    try {
      return (await this.userStore.getItem(pubkey)) || null;
    } catch (error) {
      console.error('Error retrieving user metadata:', error);
      return null;
    }
  }

  async saveUserMetadata(pubKey: string, metadata: any): Promise<void> {
    try {
      metadata.pubKey = pubKey;
      await this.userStore.setItem(pubKey, metadata);
      this.metadataSubject.next({ pubKey, metadata });
      await this.setUpdateHistory('users');
    } catch (error) {
      console.error('Error saving user metadata:', error);
    }
  }

  async removeUserMetadata(pubkey: string): Promise<void> {
    try {
      await this.userStore.removeItem(pubkey);
      this.metadataSubject.next({ pubkey, metadata: null });
      await this.setUpdateHistory('users');
    } catch (error) {
      console.error('Error removing user metadata:', error);
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

  async getAllUsers(): Promise<any[]> {
    try {
      const users: any[] = [];
      await this.userStore.iterate((value) => users.push(value));
      return users;
    } catch (error) {
      console.error('Error retrieving all users:', error);
      return [];
    }
  }

  async getSuggestionUsers(): Promise<{ pubkey: string; metadata: any }[]> {
    try {
      const users: { pubkey: string; metadata: any }[] = [];
      await this.userStore.iterate<any, void>((metadata, pubkey) => {
        users.push({ pubkey, metadata });
      });

      const count = Math.min(users.length, 16);
      return this.getRandomItems(users, count);
    } catch (error) {
      console.error('Error retrieving suggestion users:', error);
      return [];
    }
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async clearAllMetadata(): Promise<void> {
    try {
      await this.userStore.clear();
      this.metadataSubject.next(null);
    } catch (error) {
      console.error('Error clearing all metadata:', error);
    }
  }

  async searchUsersByMetadata(query: string): Promise<{ pubkey: string; user: any }[]> {
    try {
      const matchingUsers: { pubkey: string; user: any }[] = [];
      const searchQuery = query.toLowerCase();

      await this.userStore.iterate<any, void>((user, pubkey) => {
        const userString = JSON.stringify(user).toLowerCase();
        if (userString.includes(searchQuery)) {
          matchingUsers.push({ pubkey, user });
        }
      });

      return matchingUsers;
    } catch (error) {
      console.error('Error searching users by metadata:', error);
      return [];
    }
  }
}
