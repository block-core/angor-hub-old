import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZapDialogComponent } from 'app/shared/zap-dialog/zap-dialog.component';
import { ZapDialogData } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class ZapService {
    dialog = inject(MatDialog);

    snackBar = inject(MatSnackBar);

    constructor() {}

    // profileUser: any;

    async canUseZap(user: any): Promise<boolean> {
        const canReceiveZap = user && (user.lud06 || user.lud16);
        if (canReceiveZap) {
            return true;
        } else {
            this.openSnackBar(
                'Using Zap is not possible. Please complete your profile to include lud06 or lud16.'
            );
            return false;
        }
    }

    openSnackBar(message: string, action: string = 'dismiss'): void {
        this.snackBar.open(message, action, { duration: 3000 });
    }

    async openZapDialog(eventId: string = '', user?: any): Promise<void> {
        const canZap = await this.canUseZap(user);

        if (canZap) {
            const zapData: ZapDialogData = {
                lud16: user.lud16,
                lud06: user.lud06,
                pubkey: user.pubkey,
                eventId: eventId,
            };

            // Open dialog with mapped data
            this.dialog.open(ZapDialogComponent, {
                width: '405px',
                maxHeight: '90vh',
                data: zapData,
            });
        }
    }
}
