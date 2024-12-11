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
    private angorConfirmationService = inject(AngorConfirmationService); // Ensure this is injected here

    isLoggedIn(): boolean {
        return !!this.signerService.getPublicKey();
    }

    promptLogin(): void {
        const dialogRef = this.angorConfirmationService.open({
            title: 'Login',
            message: 'Would you like to login now?',
            icon: {
                show: true,
                name: 'heroicons_solid:user',
                color: 'primary',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Yes, Login',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'No, Thanks',
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
