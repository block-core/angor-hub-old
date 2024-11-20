import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import * as secp from '@noble/secp256k1';
import { bech32 } from '@scure/base';
import { Subscription } from 'rxjs';
 import { NostrProfileDocument, NostrProfile, NostrEvent, NostrEventDocument, NostrBadgeDefinition } from './interfaces';

export function sleep(durationInMillisecond: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationInMillisecond));
}

export function now() {
  return Math.floor(Date.now() / 1000);
}

@Injectable({
  providedIn: 'root',
})
export class Utilities {
  constructor(private snackBar: MatSnackBar,    private sanitizer: DomSanitizer) {}

  unsubscribe(subscriptions: Subscription[]) {
    if (!subscriptions) {
      return;
    }

    for (let i = 0; i < subscriptions.length; i++) {
      subscriptions[i].unsubscribe();
    }
  }

  now() {
    return Math.floor(Date.now() / 1000);
  }

  reduceProfile(profile: NostrProfileDocument): NostrProfile {
    return {
      name: profile.name,
      about: profile.about,
      picture: profile.picture,
      banner: profile.banner,
      nip05: profile.nip05,
      lud06: profile.lud06,
      lud16: profile.lud16,
      display_name: profile.display_name,
      website: profile.website,
      // TODO: Consider adding support for these in the future depending on how the community of Nostr grows and adopts these fields.
    } as NostrProfile;
  }

  defaultBackground = 'url(/assets/gradient.jpg)';

  getBannerBackgroundStyle(banner?: string) {
    if (!banner) {
      return this.defaultBackground;
    }

    if (typeof banner === 'string') {
      const url = this.sanitizeImageUrl(banner);

      if (!url) {
        return this.defaultBackground;
      }

      return `url(${url})`;
    } else {
      return `url(${this.bypassStyle(banner)})`;
    }
  }

  getProfileDisplayName(profile: NostrProfileDocument) {
    if (profile.display_name) {
      return profile.display_name;
    } else if (profile.name) {
      return profile.name;
    } else {
      return profile.npub;
    }
  }

  getProfileTitle(profile: NostrProfileDocument) {
    if (profile.name) {
      return `@${profile.name}`;
    } else {
      return `@${profile.npub}`;
    }
  }

  millisatoshisToSatoshis(millisatoshis: number) {
    return Math.floor(millisatoshis / 1000);
  }

 
  getRelayUrls(relays: any) {
    let preparedRelays = relays;

    if (Array.isArray(preparedRelays)) {
      preparedRelays = {};

      for (let i = 0; i < relays.length; i++) {
        preparedRelays[relays[i]] = {};
      }
    }

    const entries = Object.keys(preparedRelays);
    return entries;
  }

  getNostrIdentifier(pubkey: string) {
    try {
      const key = this.hexToArray(pubkey);
      const converted = this.convertToBech32(key, 'npub');
      return converted;
    } catch (err) {
      return pubkey;
    }
  }

  ensureHexIdentifier(pubkey: string) {
    if (pubkey.startsWith('npub')) {
      pubkey = this.arrayToHex(this.convertFromBech32(pubkey));
    }

    return pubkey;
  }



  getHexIdentifier(pubkey: string) {
    const key = this.hexToArray(pubkey);
    const converted = this.convertToBech32(key, 'npub');
    return converted;
  }

  getShortenedIdentifier(pubkey: string) {
    const fullId = this.getNostrIdentifier(pubkey);
    return `${fullId.substring(5, 13)}:${fullId.substring(fullId.length - 8)}`;
  }

  private convertToBech32(key: Uint8Array, prefix: string) {
    const words = bech32.toWords(key);
    const value = bech32.encode(prefix, words);

    return value;
  }

  private hexToArray(value: string): Uint8Array {
    return new Uint8Array(value.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
  }

  arrayToHex(value: Uint8Array): string {
    return Array.from(value)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  convertFromBech32(address: any) {
    const decoded = bech32.decode(address);
    const key = bech32.fromWords(decoded.words);

    return key;
  }

  convertFromBech32ToHex(address: any) {
    const decoded = bech32.decode(address);
    const key = bech32.fromWords(decoded.words);
    return this.arrayToHex(key);
  }

  convertBech32ToText(str: any) {
    const decoded = bech32.decode(str, 1000);
    const buf = bech32.fromWords(decoded.words);
    return new TextDecoder().decode(Uint8Array.from(buf));
  }

  keyToHex(publicKey: Uint8Array): string {
    return Array.from(publicKey)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }


  sanitizeLUD06(url?: string) {
    // Do not allow http prefix.
    if (!url) {
      return undefined;
    }

    if (url.startsWith('http')) {
      return undefined;
    }

    return this.bypassUrl(url);
  }

  sanitizeUrlAndBypass(url?: string) {
    const cleanedUrl = this.sanitizeUrl(url);
    return this.bypassUrl(cleanedUrl);
  }

  sanitizeUrlAndBypassFrame(url?: string) {
    const cleanedUrl = this.sanitizeUrl(url);
    return this.bypassFrameUrl(cleanedUrl);
  }

  sanitizeUrl(url?: string, appendHttpsIfMissing?: boolean) {
    if (!url) {
      return '';
    }

    if (!url?.startsWith('http')) {
      if (appendHttpsIfMissing) {
        url = 'https://' + url;
      } else {
        // Local file, maybe attempt at loading local scripts/etc?
        // Verify that the URL must start with /assets.
        if (url.startsWith('/assets')) {
          return url;
        } else {
          return '';
        }
      }
    }

    return url;
  }

  sanitizeImageUrl(url?: string) {
    url = this.sanitizeUrl(url);

    if (!url) {
      return undefined;
    }

    let urlLower = url.toLowerCase();
    urlLower = urlLower.split('?')[0]; // Remove the query part.

    if (urlLower.endsWith('jpg') || urlLower.endsWith('jpeg') || urlLower.endsWith('png') || urlLower.endsWith('webp') || urlLower.endsWith('gif')) {
      return url;
    }

    return undefined;
  }

  bypassUrl(url: string) {
    const clean = this.sanitizer.bypassSecurityTrustUrl(url);
    return clean;
  }

  bypassStyle(url: string) {
    const clean = this.sanitizer.bypassSecurityTrustStyle(url);
    return clean;
  }

  bypassFrameUrl(url: string) {
    const clean = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return clean;
  }
}
