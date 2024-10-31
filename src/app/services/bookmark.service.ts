import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignerService } from './signer.service';

@Injectable({
    providedIn: 'root',
})
export class BookmarkService {
    private readonly STORAGE_KEY = 'userBookmarkedProjects';
    private bookmarksSubject = new BehaviorSubject<string[]>([]);
    public bookmarks$ = this.bookmarksSubject.asObservable();
    private currentUserPubKey: string | null = null;

    constructor(private _signerService: SignerService) {
        // Listen to storage changes to keep bookmarks updated across tabs
        window.addEventListener('storage', (event) => {
            if (event.key === this.STORAGE_KEY) {
                this.refreshBookmarksForCurrentUser();
            }
        });
    }

    // Initialize bookmarks for the current user
    async initializeForCurrentUser(): Promise<void> {
        this.clearBookmarks(); // Clear any previous bookmarks
        this.currentUserPubKey = await this._signerService.getPublicKey(); // Get current user's public key

        if (this.currentUserPubKey) {
            await this.loadBookmarksForCurrentUser();
        }
    }

    // Clear current bookmarks to prevent showing previous user's data
    private clearBookmarks(): void {
        this.bookmarksSubject.next([]);
    }

    // Load bookmarks for the current user based on their public key
    private async loadBookmarksForCurrentUser(): Promise<void> {
        if (!this.currentUserPubKey) return;

        const allBookmarks = this.getUserBookmarks();
        const userBookmarks = allBookmarks[this.currentUserPubKey] || [];
        this.bookmarksSubject.next(userBookmarks); // Set bookmarks for current user
    }

    // Fetch all user bookmarks from localStorage
    private getUserBookmarks(): { [pubKey: string]: string[] } {
        const bookmarks = localStorage.getItem(this.STORAGE_KEY);
        return bookmarks ? JSON.parse(bookmarks) : {};
    }

    // Save bookmarks for the current user to localStorage
    private saveUserBookmarks(bookmarks: { [pubKey: string]: string[] }): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
    }

    // Add a bookmark for the current user
    async addBookmark(projectId: string): Promise<void> {
        if (!this.currentUserPubKey) {
            this.currentUserPubKey = await this._signerService.getPublicKey();
            if (!this.currentUserPubKey) {
                console.warn('No public key found for the current user.');
                return;
            }
        }

        const allBookmarks = this.getUserBookmarks();
        const userBookmarks = allBookmarks[this.currentUserPubKey] || [];

        if (!userBookmarks.includes(projectId)) {
            userBookmarks.push(projectId);
            allBookmarks[this.currentUserPubKey] = userBookmarks;
            this.saveUserBookmarks(allBookmarks);
            this.bookmarksSubject.next(userBookmarks);
        }
    }

    // Remove a bookmark for the current user
    async removeBookmark(projectId: string): Promise<void> {
        if (!this.currentUserPubKey) {
            this.currentUserPubKey = await this._signerService.getPublicKey();
            if (!this.currentUserPubKey) {
                console.warn('No public key found for the current user.');
                return;
            }
        }

        const allBookmarks = this.getUserBookmarks();
        const userBookmarks = allBookmarks[this.currentUserPubKey] || [];
        const updatedBookmarks = userBookmarks.filter(id => id !== projectId);

        allBookmarks[this.currentUserPubKey] = updatedBookmarks;
        this.saveUserBookmarks(allBookmarks);
        this.bookmarksSubject.next(updatedBookmarks);
    }

    // Check if a project is bookmarked by the current user
    async isBookmarked(projectId: string): Promise<boolean> {
        if (!this.currentUserPubKey) {
            this.currentUserPubKey = await this._signerService.getPublicKey();
            if (!this.currentUserPubKey) {
                console.warn('No public key found for the current user.');
                return false;
            }
        }

        const userBookmarks = this.getUserBookmarks()[this.currentUserPubKey] || [];
        return userBookmarks.includes(projectId);
    }

    // Retrieve all bookmarks for the current user
    async getBookmarks(): Promise<string[]> {
        if (!this.currentUserPubKey) {
            this.currentUserPubKey = await this._signerService.getPublicKey();
            if (!this.currentUserPubKey) {
                console.warn('No public key found for the current user.');
                return [];
            }
        }

        const allBookmarks = this.getUserBookmarks();
        return allBookmarks[this.currentUserPubKey] || [];
    }

    // Remove all bookmarks for the current user
    async removeAllBookmarks(): Promise<void> {
        if (!this.currentUserPubKey) {
            this.currentUserPubKey = await this._signerService.getPublicKey();
            if (!this.currentUserPubKey) {
                console.warn('No public key found for the current user.');
                return;
            }
        }

        const allBookmarks = this.getUserBookmarks();
        allBookmarks[this.currentUserPubKey] = [];
        this.saveUserBookmarks(allBookmarks);
        this.bookmarksSubject.next([]);
    }

    // Refresh bookmarks for the current user when the storage event occurs
    private refreshBookmarksForCurrentUser(): void {
        if (this.currentUserPubKey) {
            this.loadBookmarksForCurrentUser();
        }
    }
}
