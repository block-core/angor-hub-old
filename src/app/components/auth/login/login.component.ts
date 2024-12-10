import { AngorAlertComponent, AngorAlertType } from '@angor/components/alert';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { SignerService } from 'app/services/signer.service';
import { StateService } from 'app/services/state.service';
import { NostrLoginService } from 'app/services/nostr-login.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'auth-sign-in',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        RouterLink,
        AngorAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CommonModule,
    ]
})
export class LoginComponent implements OnInit {
    SecretKeyLoginForm: FormGroup;
    MenemonicLoginForm: FormGroup;
    secAlert = signal({ type: 'error' as AngorAlertType, message: '' });
    showSecAlert = signal(false);

    menemonicAlert = signal({ type: 'error' as AngorAlertType, message: '' });
    showMenemonicAlert = signal(false);

    loading = signal(false);
    isInstalledExtension = signal(false);
    privateKey: Uint8Array = new Uint8Array();
    publicKey = signal('');
    npub = signal('');
    nsec = signal('');

    useNostrLogin = signal(true);

    private subscription: Subscription;

    private _formBuilder = inject(FormBuilder);
    private _router = inject(Router);
    private _signerService = inject(SignerService);
    private _stateService = inject(StateService);
    private _nostrLoginService = inject(NostrLoginService);

    ngOnInit(): void {
        this.subscription = this._nostrLoginService.getPublicKeyObservable().subscribe({
            next: (pubkey: string) => {
                this.publicKey.set(pubkey);
                this._signerService.setPublicKey(pubkey);
                this.initializeAppState();
                this._router.navigateByUrl('/home');
            },
            error: (error) => console.error('Error receiving public key:', error),
        });
        this.initializeForms();
        this.checkNostrExtensionAvailability();
    }


    login(): void {
        this._nostrLoginService.launchLoginScreen();
    }

    signup(): void {
        this._nostrLoginService.launchSignupScreen();
    }

     private async initializeAppState(): Promise<void> {
        const publicKey = this._signerService.getPublicKey();
        if (publicKey) {
            await this._stateService.loadUserProfile(publicKey);
            console.log('User profile loaded with public key:', publicKey);
        }
    }

    private initializeForms(): void {
        this.SecretKeyLoginForm = this._formBuilder.group({
            secretKey: ['', [Validators.required, Validators.minLength(3)]],
            password: [''],
        });

        this.MenemonicLoginForm = this._formBuilder.group({
            menemonic: ['', [Validators.required, Validators.minLength(3)]],
            passphrase: [''],
            password: [''],
        });
    }

    private checkNostrExtensionAvailability(): void {
        const globalContext = globalThis as unknown as {
            nostr?: { signEvent?: Function };
        };

        if (
            globalContext.nostr &&
            typeof globalContext.nostr.signEvent === 'function'
        ) {
            this.isInstalledExtension.set(true);
        } else {
            this.isInstalledExtension.set(false);
        }
    }

    loginWithSecretKey(): void {
        if (this.SecretKeyLoginForm.invalid) {
            return;
        }

        const secretKey = this.SecretKeyLoginForm.get('secretKey')?.value;
        const password = this.SecretKeyLoginForm.get('password')?.value;

        this.loading.set(true);
        this.showSecAlert.set(false);

        try {
            const success = this._signerService.handleLoginWithKey(
                secretKey,
                password
            ); // Updated method to handle both nsec and hex

            if (success) {
                // Successful login
                this.initializeAppState();
                this._router.navigateByUrl('/home');
            } else {
                throw new Error('Secret key is missing or invalid.');
            }
        } catch (error) {
            // Handle login failure
            this.loading.set(false);
            this.secAlert.update(alert => ({ ...alert, message: error instanceof Error ? error.message : 'An unexpected error occurred.' }));
            this.showSecAlert.set(true);
            console.error('Login error: ', error);
        }
    }

    loginWithMenemonic(): void {
        if (this.MenemonicLoginForm.invalid) {
            return;
        }

        const menemonic = this.MenemonicLoginForm.get('menemonic')?.value;
        const passphrase =
            this.MenemonicLoginForm.get('passphrase')?.value || ''; // Optional passphrase
        const password = this.MenemonicLoginForm.get('password')?.value;

        this.loading.set(true);
        this.showMenemonicAlert.set(false);

        const success = this._signerService.handleLoginWithMnemonic(
            menemonic,
            passphrase,
            password
        );

        if (success) {
            this.initializeAppState();
            this._router.navigateByUrl('/home');
        } else {
            this.loading.set(false);
            this.menemonicAlert.update(alert => ({ ...alert, message: 'Menemonic is missing or invalid.' }));
            this.showMenemonicAlert.set(true);
        }
    }

    async loginWithNostrExtension(): Promise<void> {
        try {
            const success = await this._signerService.handleLoginWithExtension();

            if (success) {
                this.initializeAppState();
                this._router.navigateByUrl('/home');
            } else {
                console.error('Failed to log in using Nostr extension');
            }
        } catch (error) {
            console.error('An error occurred during login with Nostr extension', error);
        }
    }

}
