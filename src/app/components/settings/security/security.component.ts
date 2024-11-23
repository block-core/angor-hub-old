import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
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
        MatSlideToggleModule,
        MatButtonModule,
        CommonModule
    ]
})
export class SettingsSecurityComponent implements OnInit {
    securityForm: UntypedFormGroup;


    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _signerService: SignerService,
        private _snackBar: MatSnackBar,

    ) {}

    ngOnInit(): void {
        const isPasswordEnabled = localStorage.getItem('usePassword') === 'true';

        this.securityForm = this._formBuilder.group({
            currentPassword: [
                { value: '', disabled: !isPasswordEnabled },
                isPasswordEnabled ? Validators.required : []
            ],
            newPassword: ['', [Validators.required, Validators.minLength(3)]],
            savePassword: [false],
        });
    }

    openSnackBar(message: string, action: string = 'dismiss'): void {
        this._snackBar.open(message, action, { duration: 3000 });
    }

    async changePassword(): Promise<void> {
        if (this.securityForm.invalid) {
            return;
        }

        const currentPassword = this.securityForm.get('currentPassword')?.value;
        const newPassword = this.securityForm.get('newPassword')?.value;
        const savePassword = this.securityForm.get('savePassword')?.value;

        try {
            const isPasswordEnabled = localStorage.getItem('usePassword') === 'true';

            if (isPasswordEnabled) {
                const secretKey = await this._signerService.getSecretKey(currentPassword);
                if (!secretKey) {
                    this.openSnackBar('Current password is incorrect.');
                    return;
                }

                await this._signerService.setSecretKey(secretKey, newPassword);
            } else {
                const secretKey = await this._signerService.getSecretKey();
                if (!secretKey) {
                    alert('Private key not found.');
                    return;
                }

                await this._signerService.setSecretKey(secretKey, newPassword);
            }

            if (savePassword) {
                this._signerService.savePassword(newPassword, 60);
            }

            this.openSnackBar('Password successfully changed.');
        } catch (error) {
            console.error('Error during password change:', error);
            this.openSnackBar('Failed to change the password.');
        }
    }


}
