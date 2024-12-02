import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    inject,
    signal,
    effect,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignerService } from 'app/services/signer.service';

@Component({
    selector: 'settings-security',
    templateUrl: './security.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
    ],
})
export class SettingsSecurityComponent implements OnInit {
    private readonly _signerService = inject(SignerService);
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);
    private readonly _formBuilder = inject(FormBuilder);

    isPasswordEnabled = signal<boolean>(false);
    secretKey = signal<string | null>(null);
    nsecKey = signal<string | null>(null);

    changePasswordForm!: FormGroup;
    removePasswordForm!: FormGroup;

    ngOnInit(): void {
        const usePassword = localStorage.getItem('usePassword') === 'true';
        this.isPasswordEnabled.set(usePassword);

        this.changePasswordForm = this._formBuilder.group({
            currentPassword: [
                { value: '', disabled: !usePassword },
                usePassword ? Validators.required : [],
            ],
            newPassword: ['', [Validators.required]],
        });

        this.removePasswordForm = this._formBuilder.group({
            currentPasswordRemove: ['', Validators.required],
        });

        this.updateFormState();
    }

    private updateFormState(): void {
        if (this.isPasswordEnabled()) {
            this.changePasswordForm.get('currentPassword')?.enable();
        } else {
            this.changePasswordForm.get('currentPassword')?.disable();
            this.changePasswordForm.get('currentPassword')?.clearValidators();
        }
        this._changeDetectorRef.detectChanges();
    }

    async fetchSecretKey(): Promise<void> {
        try {
            const key = await this._signerService.getDecryptedSecretKey();
            if (!key) throw new Error('Failed to retrieve the secret key');
            this.secretKey.set(key);
            this.fetchNsecKey();
            this.openSnackBar('Secret key retrieved successfully.');
        } catch (error) {
            console.error(error);
            this.openSnackBar('Failed to retrieve the secret key. Please try again.');
        }
    }

    fetchNsecKey(): void {
        try {
            if (!this.secretKey()) throw new Error('Secret key must be retrieved first');
            const nsec = this._signerService.getNsecFromSeckey(this.secretKey()!);
            if (!nsec) throw new Error('Failed to generate the Nsec key');
            this.nsecKey.set(nsec);
            this.openSnackBar('Nsec key generated successfully.');
        } catch (error) {
            console.error(error);
            this.openSnackBar('Failed to generate the Nsec key.');
        }
    }

    copyToClipboard(value: string): void {
        navigator.clipboard
            .writeText(value)
            .then(() => this.openSnackBar('Copied to clipboard.'))
            .catch((error) => {
                console.error('Clipboard error:', error);
                this.openSnackBar('Failed to copy to clipboard.');
            });
    }

    async changePassword(): Promise<void> {
        if (this.changePasswordForm.invalid) {
            this.openSnackBar('Please fill out all required fields.');
            return;
        }

        const { currentPassword, newPassword } = this.changePasswordForm.value;

        try {
            const key = this.isPasswordEnabled()
                ? await this._signerService.getSecretKey(currentPassword)
                : await this._signerService.getSecretKey();
            if (!key) throw new Error('Secret key not found or incorrect password');

            await this._signerService.setSecretKey(key, newPassword);
            this.isPasswordEnabled.set(true);
            localStorage.setItem('usePassword', 'true');
            this.openSnackBar('Password successfully changed.');
            this.changePasswordForm.reset();
        } catch (error) {
            console.error('Error changing password:', error);
            this.openSnackBar('Failed to change the password.');
        }
    }

    async removePassword(): Promise<void> {
        if (this.removePasswordForm.invalid) {
            this.openSnackBar('Please enter your current password.');
            return;
        }

        const { currentPasswordRemove } = this.removePasswordForm.value;

        try {
            const key = await this._signerService.getSecretKey(currentPasswordRemove);
            if (!key) throw new Error('Incorrect current password');
            await this._signerService.setSecretKey(key);
            localStorage.removeItem('usePassword');
            this.isPasswordEnabled.set(false);
            this.openSnackBar('Password successfully removed.');
            this.removePasswordForm.reset();
        } catch (error) {
            console.error('Error removing password:', error);
            this.openSnackBar('Failed to remove the password.');
        }
    }

    openSnackBar(message: string): void {
        this._snackBar.open(message, 'Dismiss', { duration: 3000 });
    }
}
