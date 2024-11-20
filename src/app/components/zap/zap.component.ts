import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { hexToBytes } from '@noble/hashes/utils';
import { LNURLInvoice, LNURLPayRequest } from 'app/services/interfaces';
import { RelayService } from 'app/services/relay.service';
import { SignerService } from 'app/services/signer.service';
import { Utilities } from 'app/services/utilities';
import { finalizeEvent, NostrEvent, UnsignedEvent } from 'nostr-tools';
import { AngorCardComponent } from '../../../@angor/components/card/card.component';

@Component({
    selector: 'app-zap',
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
        AngorCardComponent,
    ]
})
export class ZapComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly signerService = inject(SignerService);
    private readonly relayService = inject(RelayService);
    private readonly utilities = inject(Utilities);

    sendZapForm!: FormGroup;
    payRequest: LNURLPayRequest | null = null;
    invoice: LNURLInvoice = {
        pr: '',
    };
    canZap = false;
    loading = false;
    error = '';

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.sendZapForm = this.formBuilder.group({
            lightningAddress: [
                '',
                [Validators.required, this.validateLightningAddress],
            ],
            eventId: [''], // Optional for zapping specific events
            amount: ['', [Validators.required, Validators.min(1)]],
            comment: [''],
        });
    }

    private validateLightningAddress(
        control: AbstractControl
    ): ValidationErrors | null {
        const value = control.value;
        return value.includes('@')
            ? null
            : {
                  invalidFormat: true,
              };
    }

    private getCallbackUrl(lightningAddress: string): string | null {
        try {
            if (lightningAddress.includes('@')) {
                const [username, domain] = lightningAddress.split('@');
                return `https://${domain}/.well-known/lnurlp/${username}`;
            } else if (lightningAddress.toLowerCase().startsWith('lnurl')) {
                return this.utilities
                    .convertBech32ToText(lightningAddress)
                    .toString();
            }
            return null;
        } catch (error) {
            console.error('Error generating callback URL:', error);
            return null;
        }
    }

    async fetchPayRequest(): Promise<void> {
        this.resetState();

        const lightningAddress =
            this.sendZapForm.get('lightningAddress')?.value;
        if (!lightningAddress) {
            this.setError('Lightning Address is required.');
            return;
        }

        const callbackUrl = this.getCallbackUrl(lightningAddress);
        if (!callbackUrl) {
            this.setError('Invalid Lightning Address.');
            return;
        }

        try {
            const response = await fetch(callbackUrl);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch pay request: ${response.statusText}`
                );
            }

            const result = await response.json();
            if (result.status === 'ERROR') {
                throw new Error(
                    result.reason || 'Error fetching the pay request.'
                );
            }

            this.payRequest = result as LNURLPayRequest;
            this.canZap = true;
            this.configureAmountValidators();
        } catch (error: any) {
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
        const { lightningAddress, eventId, amount, comment } =
            this.sendZapForm.value;

        if (!this.payRequest) {
            this.setError('Pay request is not loaded.');
            return;
        }

        try {
            const callback = new URL(this.payRequest.callback);
            const query = new URLSearchParams({
                amount: (amount * 1000).toString(),
            });

            if (comment && this.payRequest.commentAllowed) {
                query.set('comment', comment);
            }

            if (eventId) {
                const zapRequest = await this.createAndSignZapRequest(
                    eventId,
                    comment
                );
                query.set('nostr', JSON.stringify(zapRequest));
            }

            const response = await fetch(
                `${callback.origin}${callback.pathname}?${query.toString()}`
            );
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch invoice: ${response.statusText}`
                );
            }

            const result = await response.json();
            if (result.status === 'ERROR') {
                throw new Error(result.reason || 'Error fetching the invoice.');
            }

            this.invoice = result;
        } catch (error: any) {
            this.setError(error.message || 'Error processing the zap request.');
        } finally {
            this.loading = false;
        }
    }

    private async createAndSignZapRequest(
        eventId: string,
        msg?: string
    ): Promise<NostrEvent> {
        try {
            const unsignedZapRequest = this.createZapRequestData(eventId, msg);

            const signedEvent = this.signerService.isUsingSecretKey()
                ? finalizeEvent(
                      unsignedZapRequest,
                      hexToBytes(
                          await this.signerService.getDecryptedSecretKey()
                      )
                  )
                : await this.signerService.signEventWithExtension(
                      unsignedZapRequest
                  );

            if (!signedEvent) {
                throw new Error('Signing failed. Signed event is null.');
            }

            return signedEvent;
        } catch (error: any) {
            console.error('Error creating and signing zap request:', error);
            throw new Error('Failed to create and sign zap request.');
        }
    }

    private createZapRequestData(eventId: string, msg?: string): UnsignedEvent {
        return {
            kind: 9734,
            content: msg || '',
            tags: [
                ['e', eventId],
                ['p', this.payRequest?.nostrPubkey || ''],
                ['relays', ...this.relayService.getConnectedRelays()],
            ],
            pubkey: this.signerService.getPublicKey(),
            created_at: Math.floor(Date.now() / 1000),
        };
    }

    private resetState(): void {
        this.error = '';
        this.loading = true;
        this.invoice = {
            pr: '',
        };
    }

    private setError(message: string): void {
        this.error = message;
        this.loading = false;
    }
}
