import { Injectable } from '@angular/core';
 import { decode } from 'light-bolt11-decoder';
import { sha256 } from '@noble/hashes/sha256';
import { Utilities } from './utilities';
import { NostrEvent } from 'nostr-tools';
import { ParsedZap, Zapper } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ZapService {
  constructor(private util: Utilities) {}

  parseZap(zapEvent: NostrEvent): ParsedZap {
    const { amount, hash } = this.getInvoice(zapEvent);
    const zapper = hash ? this.getZapper(zapEvent, hash) : ({ isValid: false, content: '' } as Zapper);
    const p = this.zappedAuthor(zapEvent);
    const e = this.zappedPost(zapEvent);

    return {
      id: zapEvent.id,
      e: e != undefined ? e : undefined,
      p: p != undefined ? p : '',
      amount: this.util.millisatoshisToSatoshis(Number(amount)),
      zapper: zapper?.pubkey,
      content: zapper?.content,
      valid: zapper?.isValid,
      zapService: zapEvent.pubkey,
    };
  }

  getInvoice(event: NostrEvent) {
    const bolt11 = this.lnInvoice(event);
    if (!bolt11) {
      console.error('Invalid zap: No bolt11 tag found in event', event);
      return {};
    }

    try {
      const decodedBolt11 = decode(bolt11);

      // Safely check if the section has a 'value' property
      const amountSection = decodedBolt11.sections.find((s: any) => s.name === 'amount');
      const hashSection = decodedBolt11.sections.find((s: any) => s.name === 'description_hash');

      const amount = amountSection && 'value' in amountSection ? amountSection.value : null;
      const hash = hashSection && 'value' in hashSection ? hashSection.value : null;

      return { amount, hash };
    } catch (error) {
      console.error('Invalid zap: Could not decode bolt11', event);
      return {};
    }
  }


  getZapper(zapEvent: any, hash: any): Zapper {
    let zapRequest = this.description(zapEvent);
    if (zapRequest) {
      try {
        if (zapRequest.startsWith('%')) {
          zapRequest = decodeURIComponent(zapRequest);
        }

        const rawZapRequest = JSON.parse(zapRequest);
        const eventHash = this.util.arrayToHex(sha256(zapRequest));
        return { pubkey: rawZapRequest.pubkey, isValid: hash === eventHash, content: rawZapRequest.content };
      } catch (error) {
        console.error('Invalid zap: Could not decode zap request', zapEvent);
      }
    }
    return { isValid: false, content: '' };
  }

  private lnInvoice(event: NostrEvent): string | null {
    return (
      event.tags
        .filter((tag: Array<string>) => tag[0] === 'bolt11')
        .map((tag: Array<string>) => tag[1])
        .find((invoice: string | undefined) => invoice != null) || null
    );
  }
  public zappedPost(event: NostrEvent): string | null {
    return (
      event.tags
        .filter((tag) => tag[0] === 'e')
        .map((tag) => tag[1] ?? null)
        .find((post) => post != null) ?? null
    );
  }

  public zappedAuthor(event: NostrEvent): string | null {
    return (
      event.tags
        .filter((tag) => tag[0] === 'p')
        .map((tag) => tag[1] ?? null)
        .find((author) => author != null) ?? null
    );
  }
  private description(event: NostrEvent): string | null {
    return (
      event.tags
        .filter((tag) => tag[0] === 'description')
        .map((tag) => tag[1] ?? null)
        .find((description) => description != null) ?? null
    );
  }
}
