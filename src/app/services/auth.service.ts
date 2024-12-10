import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignerService } from './signer.service';
import { AngorConfirmationService } from '@angor/services/confirmation';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private signerService = inject(SignerService);
    private router = inject(Router);

    isLoggedIn(): boolean {
        return !!this.signerService.getPublicKey();
    }

    promptLogin(): void {
        const angorConfirmationService = inject(AngorConfirmationService);
        const dialogRef = angorConfirmationService.open({
            title: 'Login Required',
            message: 'You need to be logged in to perform this action. Would you like to login now?',
            icon: {
                show: true,
                name: 'heroicons_solid:login',
                color: 'primary',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Login',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
            dismissible: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.router.navigate(['/login']);
            }
        });
    }
}
