import { AngorLoadingBarComponent } from '@angor/components/loading-bar';
import {
    AngorHorizontalNavigationComponent,
    AngorNavigationService,
    AngorVerticalNavigationComponent,
} from '@angor/components/navigation';
import { AngorMediaWatcherService } from '@angor/services/media-watcher';
import { ANGOR_VERSION } from '@angor/version';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet, RouterModule } from '@angular/router';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';
import { UpdateComponent } from '../../../common/update/update.component';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AngorLoadingBarComponent,
        AngorVerticalNavigationComponent,
        AngorHorizontalNavigationComponent,
        MatButtonModule,
        MatIconModule,
        SearchComponent,
        NotificationsComponent,
        UserComponent,
        RouterOutlet,
        UpdateComponent,
        RouterModule
    ]
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public version: string = ANGOR_VERSION;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _angorMediaWatcherService: AngorMediaWatcherService,
        private _angorNavigationService: AngorNavigationService
    ) {}

    ngOnInit(): void {
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        this._angorMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void {
        const navigation =
            this._angorNavigationService.getComponent<AngorVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            navigation.toggle();
        }
    }
}
