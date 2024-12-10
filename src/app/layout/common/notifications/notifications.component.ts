import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    inject,
    signal,
} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import {
    NostrNotification,
    NotificationService,
} from 'app/services/notification.service';
import { SignerService } from 'app/services/signer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'notifications',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        NgClass,
        NgTemplateOutlet,
        RouterLink,
        DatePipe,
    ],
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel')
    private _notificationsPanel: TemplateRef<any>;

    notifications = signal<NostrNotification[]>([]);
    unreadCount = signal<number>(0);
    private _overlayRef: OverlayRef;
    private _unsubscribeAll = new Subject<any>();

    private _notificationService = inject(NotificationService);
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _overlay = inject(Overlay);
    private _viewContainerRef = inject(ViewContainerRef);
    private _signerService = inject(SignerService);

    ngOnInit(): void {
        const pubkey = this._signerService.getPublicKey();

        this._notificationService.subscribeToNotifications(pubkey).then(() => {
            this._notificationService
                .getNotificationObservable()
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((notifications: NostrNotification[]) => {
                    this.notifications.set(notifications);
                    this._changeDetectorRef.markForCheck();
                });

            this._notificationService
                .getNotificationCount()
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((count: number) => {
                    this.unreadCount.set(count);
                    this._changeDetectorRef.markForCheck();
                });
        });
    }

    deleteNotification(notification: NostrNotification) {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    openPanel(): void {
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }

        if (!this._overlayRef) {
            this._createOverlay();
        }

        this._overlayRef.attach(
            new TemplatePortal(this._notificationsPanel, this._viewContainerRef)
        );
    }

    closePanel(): void {
        if (this._overlayRef) {
            this._overlayRef.detach();
        }
    }

    markAllAsRead(): void {
        this._notificationService.markAllAsRead();
        this.notifications.set([]); // Clear all notifications
        this._changeDetectorRef.markForCheck(); // Trigger change detection
    }


    trackByFn(index: number, item: NostrNotification): string {
        return item.id;
    }

    private _createOverlay(): void {
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'angor-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(
                    this._notificationsOrigin._elementRef.nativeElement
                )
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    {
                        originX: 'start',
                        originY: 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX: 'start',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                ]),
        });

        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }
}
