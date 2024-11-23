import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignerService } from 'app/services/signer.service';

@Component({
    selector: 'settings-security',
    templateUrl: './security.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        CommonModule
    ]
})
export class SettingsSecurityComponent implements OnInit {
    changePasswordForm: UntypedFormGroup;
    removePasswordForm: UntypedFormGroup;

    isPasswordEnabled: boolean;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _signerService: SignerService,
        private _snackBar: MatSnackBar,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.isPasswordEnabled = localStorage.getItem('usePassword') === 'true';

        this.changePasswordForm = this._formBuilder.group({
            currentPassword: [
                { value: '', disabled: !this.isPasswordEnabled },
                this.isPasswordEnabled ? Validators.required : []
            ],
            newPassword: ['', [Validators.required]],
            savePassword: [false]
        });

        this.removePasswordForm = this._formBuilder.group({
            currentPasswordRemove: ['', Validators.required]
        });

        this.updateFormState();
    }

    private updateFormState(): void {
        if (this.isPasswordEnabled) {
            this.changePasswordForm.get('currentPassword')?.enable();
        } else {
            this.changePasswordForm.get('currentPassword')?.disable();
            this.changePasswordForm.get('currentPassword')?.clearValidators();
        }

        this._changeDetectorRef.detectChanges();
    }

    async changePassword(): Promise<void> {
        if (this.changePasswordForm.invalid) {
            this.openSnackBar('Please fill out all required fields.');
            return;
        }

        const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
        const newPassword = this.changePasswordForm.get('newPassword')?.value;
        const savePassword = this.changePasswordForm.get('savePassword')?.value;

        try {
            let secretKey: string | null = null;

            if (this.isPasswordEnabled) {
                secretKey = await this._signerService.getSecretKey(currentPassword);
                if (!secretKey) {
                    this.openSnackBar('Current password is incorrect.');
                    return;
                }
            } else {
                secretKey = await this._signerService.getSecretKey();
                if (!secretKey) {
                    alert('Private key not found.');
                    return;
                }
            }

            await this._signerService.setSecretKey(secretKey, newPassword);

            if (savePassword) {
                this._signerService.savePassword(newPassword, 60);
            }

            this.openSnackBar('Password successfully changed.');
            this.isPasswordEnabled = true;

            this.updateFormState();
            this.changePasswordForm.reset();
            this._changeDetectorRef.detectChanges();
        } catch (error) {
            console.error('Error during password change:', error);
            this.openSnackBar('Failed to change the password.');
        }
    }

    async removePassword(): Promise<void> {
        if (this.removePasswordForm.invalid) {
            this.openSnackBar('Please enter your current password to proceed.');
            return;
        }

        const currentPassword = this.removePasswordForm.get('currentPasswordRemove')?.value;

        try {
            const secretKey = await this._signerService.getSecretKey(currentPassword);
            if (!secretKey) {
                this.openSnackBar('Current password is incorrect.');
                return;
            }

            await this._signerService.setSecretKey(secretKey);

            localStorage.removeItem('usePassword');
            this.openSnackBar('Password successfully removed.');
            this.isPasswordEnabled = false;

            this.updateFormState();
            this.removePasswordForm.reset();
            this._changeDetectorRef.detectChanges();
        } catch (error) {
            console.error('Error during password removal:', error);
            this.openSnackBar('Failed to remove the password.');
        }
    }

    openSnackBar(message: string, action: string = 'dismiss'): void {
        this._snackBar.open(message, action, { duration: 3000 });
    }
}
