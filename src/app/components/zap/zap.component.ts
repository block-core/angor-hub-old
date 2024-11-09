import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { LNURLPayRequest, LNURLInvoice } from 'app/services/interfaces';
import { SignerService } from 'app/services/signer.service';
import { RelayService } from 'app/services/relay.service';
import { finalizeEvent, NostrEvent, UnsignedEvent } from 'nostr-tools';
import { AngorCardComponent } from "../../../@angor/components/card/card.component";
import { Utilities } from 'app/services/utilities';
import { hexToBytes } from '@noble/hashes/utils';

@Component({
    selector: 'app-zap',
    standalone: true,
    templateUrl: './zap.component.html',
    styleUrls: ['./zap.component.scss'],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        TextFieldModule,
        ReactiveFormsModule,
        AngorCardComponent
    ],
})
export class ZapComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly signerService = inject(SignerService);
    private readonly relayService = inject(RelayService);


    constructor(private util: Utilities,
    ) {

    }
    sendZapForm!: FormGroup;
    payRequest: LNURLPayRequest | null = null;
    invoice: LNURLInvoice = { pr: '' };
    canZap = false;
    loading = false;
    error = '';

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.sendZapForm = this.formBuilder.group({
            lightningAddress: ['', [Validators.required, this.validateLightningAddress]],
            eventId: [''], // Optional for zapping specific events
            amount: ['', [Validators.required, Validators.min(1)]],
            comment: [''],
        });
    }

    private validateLightningAddress(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        return value.includes('@') ? null : { invalidFormat: true };
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
    async fetchPayRequest(): Promise<void> {
        this.resetState();
        const lightningAddress = this.sendZapForm.get('lightningAddress')?.value;

        if (!lightningAddress) {
            this.setError('Lightning Address is required.');
            return;
        }
         const callbackUrl = this.getCallbackUrl(lightningAddress);

        try {
            const response = await fetch(callbackUrl);
            if (!response.ok) throw new Error('Failed to fetch pay request.');

            const result = await response.json();
            if (result.status === 'ERROR') {
                this.setError(result.reason || 'Error fetching the pay request.');
                return;
            }

            this.payRequest = result as LNURLPayRequest;
            this.canZap = true;
            this.configureAmountValidators();
        } catch (error) {
            this.setError(error.message || 'Error connecting to the server.');
        } finally {
            this.loading = false;
        }
    }

    private configureAmountValidators(): void {
        if (!this.payRequest) return;

        const min = (this.payRequest.minSendable || 1000) / 1000;
        const max = (this.payRequest.maxSendable || 21000000) / 1000;

        const amountControl = this.sendZapForm.get('amount');
        amountControl?.setValidators([
            Validators.required,
            Validators.min(min),
            Validators.max(max),
        ]);
        amountControl?.updateValueAndValidity();
    }

    async onSubmit(): Promise<void> {
        if (this.sendZapForm.invalid) {
            this.setError('Please fill out the form correctly.');
            return;
        }

        this.resetState();
        const { lightningAddress, eventId, amount, comment } = this.sendZapForm.value;

        if (!this.payRequest) {
            this.setError('Pay request is not loaded.');
            return;
        }

        const callback = new URL(this.payRequest.callback);
        const query = new URLSearchParams({
            amount: (amount * 1000).toString(),
        });

        if (comment && this.payRequest.commentAllowed) {
            query.set('comment', comment);
        }

        if (eventId) {
            const zapRequest = await this.createAndSignZapRequest(eventId, comment);
            query.set('nostr', JSON.stringify(zapRequest));
        }

        try {
            const response = await fetch(`${callback.origin}${callback.pathname}?${query.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch invoice.');

            const result = await response.json();
            if (result.status === 'ERROR') {
                this.setError(result.reason || 'Error fetching the invoice.');
                return;
            }

            this.invoice = result;
        } catch (error) {
            this.setError(error.message || 'Error fetching the invoice.');
        }
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

    async sendZapToRelay(signedEvent: NostrEvent): Promise<void> {
        try {
            await this.relayService.publishEventToWriteRelays(signedEvent);
            console.log('Zap event sent successfully');
        } catch (error) {
            this.setError('Failed to send zap event to relays');
            console.error('Error sending zap event:', error);
        }
    }

    private resetState(): void {
        this.error = '';
        this.loading = true;
        this.invoice = { pr: '' };
    }

    private setError(message: string): void {
        this.error = message;
        this.loading = false;
    }
}


