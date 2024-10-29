import { CommonModule, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { AgoPipe } from 'app/shared/pipes/ago.pipe';
import { CheckmessagePipe } from 'app/shared/pipes/checkmessage.pipe';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../chat.service';
import { Chat, Profile } from '../chat.types';
import { NewChatComponent } from '../new-chat/new-chat.component';
import { ProfileComponent } from '../profile/profile.component';
import { AngorNavigationService, AngorVerticalNavigationComponent } from '@angor/components/navigation';

@Component({
    selector: 'chat-chats',
    templateUrl: './chats.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatSidenavModule,
        NewChatComponent,
        ProfileComponent,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        NgClass,
        RouterLink,
        RouterOutlet,
        AgoPipe,
        CommonModule,
        CheckmessagePipe,
    ],
})
export class ChatsComponent implements OnInit, OnDestroy {

    chats: Chat[] = [];
    filteredChats: Chat[] = [];
    profile: Profile;
    selectedChat: Chat;


    drawerComponent: 'profile' | 'new-chat';
    drawerOpened: boolean = false;


    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(
        private _chatService: ChatService,
        private _changeDetectorRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private _angorNavigationService: AngorNavigationService

    ) {}


    private updateNavigationBadge(): void {


        const mainNavigationComponent =
            this._angorNavigationService.getComponent<AngorVerticalNavigationComponent>(
                'mainNavigation'
            );

        if (mainNavigationComponent) {
            const mainNavigation = mainNavigationComponent.navigation;
            const menuItem = this._angorNavigationService.getItem(
                'chat',
                mainNavigation
            );

            menuItem.badge.title = '0';

            mainNavigationComponent.refresh();
        }
    }


    ngOnInit(): void {
        this.updateNavigationBadge();
        this._chatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: Chat[]) => {
                this.chats = this.filteredChats = chats;
                this._markForCheck();
            });


        this._chatService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profile: Profile) => {
                this.profile = profile;
                this._markForCheck();
            });


        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.selectedChat = chat;
                this._markForCheck();
            });


        const savedChatId = localStorage.getItem('currentChatId');

        if (savedChatId) {
            this._chatService.checkCurrentChatOnPageRefresh(savedChatId);
        }
    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();


        this._chatService.resetChat();
        localStorage.removeItem('currentChatId');
    }

    /**
     * Filters the chat list based on a search query.
     * @param query - The string query to filter chats by name
     */
    filterChats(query: string): void {
        if (!query) {
            this.filteredChats = this.chats;
        } else {
            const lowerCaseQuery = query.toLowerCase();
            this.filteredChats = this.chats.filter((chat) =>
                chat.contact?.name.toLowerCase().includes(lowerCaseQuery)
            );
        }
        this._markForCheck();
    }

    /**
     * Opens the drawer with the New Chat component.
     */
    openNewChat(): void {
        this.drawerComponent = 'new-chat';
        this.drawerOpened = true;
        this._markForCheck();
    }

    /**
     * Opens the drawer with the Profile component.
     */
    openProfile(): void {
        this.drawerComponent = 'profile';
        this.drawerOpened = true;
        this._markForCheck();
    }

    /**
     * TrackBy function to optimize performance when rendering chat items in the template.
     * @param index - The index of the item in the loop
     * @param item - The item (Chat) being tracked
     */
    trackByFn(index: number, item: Chat): string | number {
        return item.id || index;
    }

    /**
     * Marks the component for change detection.
     * This is necessary when using OnPush change detection strategy to manually trigger updates.
     */
    private _markForCheck(): void {
        this._changeDetectorRef.markForCheck();
    }
}
