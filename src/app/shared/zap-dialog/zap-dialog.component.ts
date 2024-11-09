import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { LightningService } from 'app/services/lightning.service';
import { LNURLPayRequest, LNURLInvoice } from 'app/services/interfaces';
import { finalizeEvent, NostrEvent, UnsignedEvent } from 'nostr-tools';
import { SignerService } from 'app/services/signer.service';
import { RelayService } from 'app/services/relay.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltip } from '@angular/material/tooltip';
import { Utilities } from 'app/services/utilities';
import { hexToBytes } from '@noble/hashes/utils';

@Component({
    selector: 'app-send-dialog',
    standalone: true,
    templateUrl: './zap-dialog.component.html',
    styleUrls: ['./zap-dialog.component.scss'],
    imports: [
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatLabel,
        MatFormField,
        ReactiveFormsModule,
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogContent,
        MatDialogActions,
        QRCodeModule,
        MatDivider,
        MatTooltip,
        MatDialogClose,
    ],
})
export class ZapDialogComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly lightningService = inject(LightningService);
    private readonly signerService = inject(SignerService);
    private readonly relayService = inject(RelayService);
    private readonly dialogRef = inject(MatDialogRef<ZapDialogComponent>);
    private readonly snackBar = inject(MatSnackBar);
    private readonly clipboard = inject(Clipboard);
    private readonly data: any = inject(MAT_DIALOG_DATA);

    sendZapForm!: FormGroup;
    lightningInvoice = '';
    payRequest: LNURLPayRequest | null = null;
    displayQRCode = false;
    showInvoiceSection = false;
    loading = false;
    invoiceAmount = 0;
    error = '';

    zapButtons = [
        { icon: 'thumb_up', label: '21', value: 21 },
        { icon: 'favorite', label: '50', value: 50 },
        { icon: 'emoji_emotions', label: '100', value: 100 },
        { icon: 'star', label: '500', value: 500 },
        { icon: 'celebration', label: '1k', value: 1000 },
        { icon: 'rocket', label: '5k', value: 5000 },
        { icon: 'local_fire_department', label: '10k', value: 10000 },
        { icon: 'flash_on', label: '100k', value: 100000 },
        { icon: 'diamond', label: '500k', value: 500000 },
     ];



     constructor(private util: Utilities,
     ) {

     }

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.sendZapForm = this.formBuilder.group({
            lightningAddress: [
                this.data.lud16 || this.data.lud06,
                [Validators.required, this.validateLightningAddress],
            ],
            amount: ['', [Validators.required, Validators.min(1)]],
            comment: [''],
        });
    }

    private validateLightningAddress(control: AbstractControl): ValidationErrors | null {
        return control.value.includes('@') ? null : { invalidFormat: true };
    }

    async onSubmit(): Promise<void> {
        if (this.sendZapForm.invalid) {
            this.showError('Please fill out the form correctly.');
            return;
        }

        this.loading = true;
        await this.fetchPayRequest();
    }
    private getCallbackUrl(lightningAddress: string): string | null {
        if (lightningAddress.includes('@')) {
            const [username, domain] = lightningAddress.split('@');
            return `https://${domain}/.well-known/lnurlp/${username}`;
        } else if (lightningAddress.toLowerCase().startsWith('lnurl')) {
            return this.util.convertBech32ToText(lightningAddress).toString();
        }
        return null;
    }

    private async fetchPayRequest(): Promise<void> {
        this.resetState();

        // Use `lud16` or `lud06` from profile data if available
        const lightningAddress = this.data.lud16 || this.data.lud06;

        if (!lightningAddress) {
            this.showError('Lightning Address is required.');
            return;
        }

        // Determine the LNURL callback URL based on `lud16` or `lud06` format
        let callbackUrl = this.getCallbackUrl(lightningAddress);

        try {
            const response = await fetch(callbackUrl);
            if (!response.ok) throw new Error('Failed to fetch pay request.');

            const payRequestData = await response.json();
            if (payRequestData.status === 'ERROR') {
                this.showError(payRequestData.reason || 'Error fetching the pay request.');
                return;
            }

            this.payRequest = payRequestData as LNURLPayRequest;
            this.showInvoiceSection = false;
            this.configureAmountValidators();

            // Generate the invoice after a successful pay request
            await this.generateInvoice();
        } catch (error) {
            this.showError(error.message || 'Error connecting to the server.');
        } finally {
            this.loading = false;
        }
    }


    private async generateInvoice(): Promise<void> {
        const amount = this.sendZapForm.get('amount')?.value;
        const comment = this.sendZapForm.get('comment')?.value;
        const eventId = this.data.eventId || null;
        if (!this.payRequest) {
            this.showError('Pay request is not loaded.');
            return;
        }
        this.invoiceAmount = amount;
        const callbackUrl = new URL(this.payRequest.callback);
        const queryParams = new URLSearchParams({
            amount: (amount * 1000).toString(),
        });

        if (comment && this.payRequest.commentAllowed) {
            queryParams.set('comment', comment);
        }

        if (eventId) {
            const zapRequest = await this.createAndSignZapRequest(eventId, comment);
            queryParams.set('nostr', JSON.stringify(zapRequest));
          }

        try {
            const response = await fetch(`${callbackUrl.origin}${callbackUrl.pathname}?${queryParams.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch invoice.');

            const invoiceData = await response.json();
            if (invoiceData.status === 'ERROR') {
                this.showError(invoiceData.reason || 'Error fetching the invoice.');
                return;
            }

            this.lightningInvoice = invoiceData.pr;
            this.showInvoiceSection = true;
            this.toggleQRCodeDisplay(true);
        } catch (error) {
            this.showError(error.message || 'Error fetching the invoice.');
        }
    }

    private configureAmountValidators(): void {
        if (!this.payRequest) return;

        const minAmount = (this.payRequest.minSendable || 1000) / 1000;
        const maxAmount = (this.payRequest.maxSendable || 21000000) / 1000;

        const amountControl = this.sendZapForm.get('amount');
        amountControl?.setValidators([Validators.required, Validators.min(minAmount), Validators.max(maxAmount)]);
        amountControl?.updateValueAndValidity();
    }


    private async createAndSignZapRequest(eventId: string, msg?: string): Promise<NostrEvent> {
        try {
            const unsignedZapRequest = this.createZapRequestData(eventId, msg);

            let signedEvent: NostrEvent;
            if (this.signerService.isUsingSecretKey()) {
                const privateKey = await this.signerService.getDecryptedSecretKey();
                if (!privateKey) throw new Error('Private key could not be retrieved.');

                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedZapRequest, privateKeyBytes);
            } else {
                signedEvent = await this.signerService.signEventWithExtension(unsignedZapRequest);
            }

            if (!signedEvent) throw new Error('Signing failed. Signed event is null.');
            return signedEvent;

        } catch (error) {
            console.error('Error creating and signing zap request:', error);
            throw new Error('Failed to create and sign zap request.');
        }
    }

    private createZapRequestData(eventId: string, msg?: string): UnsignedEvent {
        const tags = [
            ['e', eventId],
            ['p', this.payRequest?.nostrPubkey || ''],
            ['relays', ...this.relayService.getConnectedRelays()],
        ];

        return {
            kind: 9734,
            content: msg || '',
            tags: tags,
            pubkey: this.signerService.getPublicKey(),
            created_at: Math.floor(Date.now() / 1000),
        };
    }

    copyInvoice(): void {
        if (this.lightningInvoice) {
            this.clipboard.copy(this.lightningInvoice);
            this.showSuccess('Invoice copied to clipboard');
        } else {
            this.showError('No invoice available to copy');
        }
    }

    toggleQRCodeDisplay(forceShow = false): void {
        this.displayQRCode = forceShow ? true : !this.displayQRCode;
    }

    private resetState(): void {
        this.error = '';
        this.loading = true;
        this.lightningInvoice = '';
    }

    private showError(message: string): void {
        this.error = message;
        this.loading = false;
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
    }

    private showSuccess(message: string): void {
        this.snackBar.open(message, 'Dismiss', { duration: 2000 });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}


