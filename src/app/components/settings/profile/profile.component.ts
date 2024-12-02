import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    inject,
    signal,
    effect,
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
import { NostrEvent, UnsignedEvent, finalizeEvent } from 'nostr-tools';

@Component({
    selector: 'settings-profile',
    templateUrl: './profile.component.html',
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
    ],
})
export class SettingsProfileComponent {
    private readonly _fb = inject(FormBuilder);
    private readonly _signerService = inject(SignerService);
    private readonly _relayService = inject(RelayService);
    private readonly _router = inject(Router);
    private readonly _dialog = inject(MatDialog);
    private readonly _storageService = inject(StorageService);

    // Signals
    user = signal<any>(null);
    profileForm = signal<FormGroup>(
        this._fb.group({
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
        })
    );

    content = signal<string>('');

    // Effect to update the form when the user data changes
    private readonly userEffect = effect(() => {
        const user = this.user();
        if (user) {
            this.profileForm().setValue({
                name: user?.name || '',
                username: user?.username || '',
                displayName: user?.displayName || '',
                website: user?.website || '',
                about: user?.about || '',
                picture: user?.picture || '',
                banner: user?.banner || '',
                lud06: user?.lud06 || '',
                lud16: user?.lud16 || '',
                nip05: user?.nip05 || '',
            });
        }
    });

    constructor() {
        this.setValues();
    }

    async setValues(): Promise<void> {
        try {
            const publicKey = await this._signerService.getPublicKey();
            const metadata = await this._storageService.getProfile(publicKey);
            this.user.set(metadata);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    onSubmit() {
        if (this.profileForm().valid) {
            this.submit();
        } else {
            console.error('Form is invalid');
        }
    }

    async submit() {
        const profileData = this.profileForm().value;
        this.content.set(JSON.stringify(profileData));

        if (this._signerService.isUsingSecretKey()) {
            try {
                const privateKey = await this._signerService.getDecryptedSecretKey();
                this.signEvent(privateKey);
            } catch (error) {
                console.error(error);
            }
        } else if (this._signerService.isUsingExtension()) {
            const unsignedEvent: UnsignedEvent = this._signerService.getUnsignedEvent(
                0,
                [],
                this.content()
            );
            const signedEvent = await this._signerService.signEventWithExtension(unsignedEvent);
            this.publishSignedEvent(signedEvent);
        }
    }

    async signEvent(privateKey: string) {
        const unsignedEvent: UnsignedEvent = this._signerService.getUnsignedEvent(
            0,
            [],
            this.content()
        );
        const privateKeyBytes = hexToBytes(privateKey);
        const signedEvent: NostrEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
        this.publishSignedEvent(signedEvent);
    }

    publishSignedEvent(signedEvent: NostrEvent) {
        this._relayService.publishEventToWriteRelays(signedEvent);
        console.log('Profile Updated!');
        this._router.navigate([`/profile`]);
    }
}
