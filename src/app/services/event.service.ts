import { Injectable } from '@angular/core';
import { hexToBytes } from '@noble/hashes/utils';
import { NewEvent } from 'app/types/NewEvent';
import { Filter, finalizeEvent, NostrEvent } from 'nostr-tools';
import { RelayService } from './relay.service';
import { SignerService } from './signer.service';

interface Job {
    eventId: string;
}

@Injectable({
    providedIn: 'root',
})
export class EventService {


    private likesMap = new Map<string, string[]>();


    myLikedNoteIds: string[] = [];

    constructor(
        private relayService: RelayService,
        private signerService: SignerService,
    ) {
    }

    async sendTextEvent(content: string): Promise<void> {
        if (!content) return;

        try {
            const tags: string[][] = [];

            const unsignedEvent = this.signerService.getUnsignedEvent(
                1,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
        } catch (error) {
            console.error('Failed to send text event:', error);
        }
    }

    async sendLikeEvent(event: NewEvent): Promise<void> {
        if (!event) return;

        try {
            const tags = [
                ['e', event.id],
                ['p', event.pubkey],
            ];
            const content = '+';

            const unsignedEvent = this.signerService.getUnsignedEvent(
                7,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);

            this.likesMap.set(event.id, [
                ...(this.likesMap.get(event.id) || []),
                this.signerService.getPublicKey(),
            ]);
        } catch (error) {
            console.error('Failed to send like event:', error);
        }
    }

    async sendZapEvent(event: NewEvent, zapAmount: number): Promise<void> {
        if (!event || zapAmount <= 0) return;

        try {
            const tags = [
                ['e', event.id],
                ['p', event.pubkey],
                ['amount', zapAmount.toString()],
            ];
            const content = `Zapped with ${zapAmount} sats`;

            const unsignedEvent = this.signerService.getUnsignedEvent(
                9735,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
        } catch (error) {
            console.error('Failed to send zap event:', error);
        }
    }

    async sendReplyEvent(
        parentEvent: NewEvent,
        replyContent: string
    ): Promise<void> {
        if (!parentEvent) return;

        try {
            const tags = [
                ['e', parentEvent.id],
                ['p', parentEvent.pubkey],
            ];

            const unsignedEvent = this.signerService.getUnsignedEvent(
                1,
                tags,
                replyContent
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey =
                    await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent =
                    await this.signerService.signEventWithExtension(
                        unsignedEvent
                    );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
        } catch (error) {
            console.error('Failed to send reply event:', error);
        }
    }


    async shareEvent(event: NewEvent): Promise<void> {
        if (!event) return;

        try {
            const tags = [
                ['e', event.id],
                ['p', event.pubkey],
            ];

            const content = '';

            const unsignedEvent = this.signerService.getUnsignedEvent(
                6,
                tags,
                content
            );
            let signedEvent: NostrEvent;

            if (this.signerService.isUsingSecretKey()) {
                const privateKey = await this.signerService.getDecryptedSecretKey();
                const privateKeyBytes = hexToBytes(privateKey);
                signedEvent = finalizeEvent(unsignedEvent, privateKeyBytes);
            } else {
                signedEvent = await this.signerService.signEventWithExtension(
                    unsignedEvent
                );
            }

            await this.relayService.publishEventToWriteRelays(signedEvent);
            console.log('Event shared successfully:', signedEvent);
        } catch (error) {
            console.error('Failed to share event:', error);
        }
    }

}
