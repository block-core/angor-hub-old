import { AngorAlertComponent, AngorAlertType } from '@angor/components/alert';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
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
    ],
})
export class LoginComponent implements OnInit, OnDestroy {
    SecretKeyLoginForm: FormGroup;
    MnemonicLoginForm: FormGroup;
    secAlert = signal({ type: 'error' as AngorAlertType, message: '' });
    showSecAlert = signal(false);
    mnemonicAlert = signal({ type: 'error' as AngorAlertType, message: '' });
    showMnemonicAlert = signal(false);
    loading = signal(false);
    isInstalledExtension = signal(false);
    publicKey = signal('');
    subscription: Subscription;

    private _formBuilder = inject(FormBuilder);
    private _router = inject(Router);
    private _signerService = inject(SignerService);
    private _stateService = inject(StateService);
    private _nostrLoginService = inject(NostrLoginService);

    ngOnInit(): void {
        // Clear storage when entering login page
        this._signerService.clearPassword();
        this._signerService.logout();

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

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    login(): void {
        this._nostrLoginService.launchLoginScreen();
    }

    signup(): void {
        this._nostrLoginService.launchSignupScreen();
    }

    loginWithSecretKey(): void {
        if (this.SecretKeyLoginForm.invalid) return;

        const secretKey = this.SecretKeyLoginForm.get('secretKey')?.value;
        const password = this.SecretKeyLoginForm.get('password')?.value;

        this.loading.set(true);
        this.showSecAlert.set(false);

        try {
            const success = this._signerService.handleLoginWithKey(secretKey, password);

            if (success) {
                this.initializeAppState();
                this._router.navigateByUrl('/home');
            } else {
                throw new Error('Secret key is missing or invalid.');
            }
        } catch (error) {
            this.loading.set(false);
            this.secAlert.update(alert => ({
                ...alert,
                message: error instanceof Error ? error.message : 'Unexpected error occurred.',
            }));
            this.showSecAlert.set(true);
        }
    }

    loginWithMnemonic(): void {
        if (this.MnemonicLoginForm.invalid) return;

        const mnemonic = this.MnemonicLoginForm.get('mnemonic')?.value;
        const passphrase = this.MnemonicLoginForm.get('passphrase')?.value || '';
        const password = this.MnemonicLoginForm.get('password')?.value;

        this.loading.set(true);
        this.showMnemonicAlert.set(false);

        const success = this._signerService.handleLoginWithMnemonic(mnemonic, passphrase, password);

        if (success) {
            this.initializeAppState();
            this._router.navigateByUrl('/home');
        } else {
            this.loading.set(false);
            this.mnemonicAlert.update(alert => ({
                ...alert,
                message: 'Mnemonic is missing or invalid.',
            }));
            this.showMnemonicAlert.set(true);
        }
    }

    private async initializeAppState(): Promise<void> {
        const publicKey = this._signerService.getPublicKey();
        if (publicKey) {
            await this._stateService.loadUserProfile(publicKey);
        }
    }

    private initializeForms(): void {
        this.SecretKeyLoginForm = this._formBuilder.group({
            secretKey: ['', [Validators.required, Validators.minLength(3)]],
            password: [''],
        });

        this.MnemonicLoginForm = this._formBuilder.group({
            mnemonic: ['', [Validators.required, Validators.minLength(3)]],
            passphrase: [''],
            password: [''],
        });
    }

    private checkNostrExtensionAvailability(): void {
        const globalContext = globalThis as unknown as { nostr?: { signEvent?: Function } };

        this.isInstalledExtension.set(!!globalContext.nostr?.signEvent);
    }
}
