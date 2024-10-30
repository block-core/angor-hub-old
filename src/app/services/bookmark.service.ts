import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BookmarkService {
    private readonly STORAGE_KEY = 'bookmarkedProjects';


    private bookmarksSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.getBookmarks());
    public bookmarks$: Observable<string[]> = this.bookmarksSubject.asObservable();

    constructor() {
        window.addEventListener('storage', (event) => {
            if (event.key === this.STORAGE_KEY) {

                this.bookmarksSubject.next(this.getBookmarks());
            }
        });
    }


    getBookmarks(): string[] {
        const bookmarks = localStorage.getItem(this.STORAGE_KEY);
        return bookmarks ? JSON.parse(bookmarks) : [];
    }


    addBookmark(projectId: string): void {
        const bookmarks = this.getBookmarks();
        if (!bookmarks.includes(projectId)) {
            bookmarks.push(projectId);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookmarks));
            this.bookmarksSubject.next(bookmarks);
        }
    }


    removeBookmark(projectId: string): void {
        const bookmarks = this.getBookmarks();
        const updatedBookmarks = bookmarks.filter(id => id !== projectId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBookmarks));
        this.bookmarksSubject.next(updatedBookmarks);
    }


    isBookmarked(projectId: string): boolean {
        return this.getBookmarks().includes(projectId);
    }
}
