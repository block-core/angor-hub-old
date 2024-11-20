import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { hexToBytes } from '@noble/hashes/utils';
import { RelayService } from 'app/services/relay.service';
import { SignerService } from 'app/services/signer.service';
import { StorageService } from 'app/services/storage.service';
import { PasswordDialogComponent } from 'app/shared/password-dialog/password-dialog.component';
import { NostrEvent, UnsignedEvent, finalizeEvent } from 'nostr-tools';

@Component({
    selector: 'settings-advanced-profile',
    templateUrl: './advanced-profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TextFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        CommonModule,
    ]
})
export class SettingsAdvancedProfileComponent implements OnInit {
    profileForm: FormGroup;
    content: string;
    user: any;

    constructor(
        private _fb: FormBuilder,
        private _signerService: SignerService,
        private _relayService: RelayService,
        private _router: Router,
        private _dialog: MatDialog,
        private _storageService: StorageService,
        private _changeDetectorRef: ChangeDetectorRef,


    ) {}

    ngOnInit(): void {
        this.profileForm = this._fb.group({
            name: ['', Validators.required],
            username: [''],
            displayName: [''],
            website: [''],
            about: [''],
            picture: [''],
            banner: [''],
            lud06: [''],
            lud16: [
                '',
                Validators.pattern('^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
            ],
            nip05: [
                '',
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
            ],
        });

        this.setValues();
    }

    async setValues(): Promise<void> {
        try {
            const publicKey = await this._signerService.getPublicKey();
            const metadata = await this._storageService.getProfile(publicKey);

            this.user = metadata;

            this.profileForm.setValue({
                name: this.user?.name || '',
                username: this.user?.username || '',
                displayName: this.user?.displayName || '',
                website: this.user?.website || '',
                about: this.user?.about || '',
                picture: this.user?.picture || '',
                banner: this.user?.banner || '',
                lud06: this.user?.lud06 || '',
                lud16: this.user?.lud16 || '',
                nip05: this.user?.nip05 || '',
            });

            this._changeDetectorRef.detectChanges();
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    onSubmit() {
        if (this.profileForm.valid) {
            this.submit();
        } else {
            console.error('Form is invalid');
        }
    }

    async submit() {
        const profileData = this.profileForm.value;
        this.content = JSON.stringify(profileData);

        if (this._signerService.isUsingSecretKey()) {
            const storedPassword = this._signerService.getPassword();
            if (storedPassword) {
                try {
                    const privateKey =
                        await this._signerService.getSecretKey(storedPassword);
                    this.signEvent(privateKey);
                } catch (error) {
                    console.error(error);
                }
            } else {
                const dialogRef = this._dialog.open(PasswordDialogComponent, {
                    width: '300px',
                    disableClose: true,
                });

                dialogRef.afterClosed().subscribe(async (result) => {
                    if (result && result.password) {
                        try {
                            const privateKey =
                                await this._signerService.getSecretKey(
                                    result.password
                                );
                            this.signEvent(privateKey);
                            if (result.duration != 0) {
                                this._signerService.savePassword(
                                    result.password,
                                    result.duration
                                );
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    } else {
                        console.error('Password not provided');
                    }
                });
            }
        } else if (this._signerService.isUsingExtension()) {
            const unsignedEvent: UnsignedEvent =
                this._signerService.getUnsignedEvent(0, [], this.content);
            const signedEvent =
                await this._signerService.signEventWithExtension(unsignedEvent);
            this.publishSignedEvent(signedEvent);
        }
    }

    async signEvent(privateKey: string) {
        const unsignedEvent: UnsignedEvent =
            this._signerService.getUnsignedEvent(0, [], this.content);
        const privateKeyBytes = hexToBytes(privateKey);
        const signedEvent: NostrEvent = finalizeEvent(
            unsignedEvent,
            privateKeyBytes
        );
        this.publishSignedEvent(signedEvent);
    }

    publishSignedEvent(signedEvent: NostrEvent) {
        this._relayService.publishEventToWriteRelays(signedEvent);
        console.log('Profile Updated!');
        this._router.navigate([`/profile`]);
    }
}
