import { inject } from '@angular/core';
import { SignerService } from 'app/services/signer.service';

export const authGuard = () => {
    const signerService = inject(SignerService);

    // Allow access to the page
    return true;
};
