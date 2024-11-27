import { Injectable } from '@angular/core';
import { nip19 } from 'nostr-tools';
import { Utilities } from './utilities';
import { SafeResourceUrl } from '@angular/platform-browser';

interface MediaExtensions {
    readonly image: readonly string[];
    readonly video: readonly string[];
    readonly audio: readonly string[];
}

export interface ParsedToken {
    safeWord?: string | SafeResourceUrl;
    word: string;
    token: TokenType;
}

type TokenType = 'text' | 'npub' | 'note' | 'image' | 'video' | 'audio' | 'youtube' | 'spotify' | 'tidal' | 'link';

@Injectable({
    providedIn: 'root',
})
export class ParseContentService {
    private readonly MEDIA_EXTENSIONS: MediaExtensions = {
        image: ['.jpg', '.jpeg', '.gif', '.png', '.webp', '.apng', '.jfif', '.svg'] as const,
        video: ['.mp4', '.m4v', '.m4p', '.mpg', '.mpeg', '.webm', '.avif', '.mov', '.ogv'] as const,
        audio: ['.mp3', '.m4a', '.flac', '.ogg', '.wav'] as const,
    };

    private readonly MEDIA_PLATFORMS = {
        YOUTUBE: ['youtu.be', 'youtube.com'],
        SPOTIFY: ['open.spotify.com'],
        TIDAL: ['tidal.com'],
    } as const;

    constructor(private utilities: Utilities) {}

    parseContent(text: string): (string | ParsedToken | any)[] {
        const sanitizedText = this.sanitizeText(text);
        const tokens = this.tokenizeText(sanitizedText);
        return this.combinePlainText(tokens.map(token => this.processToken(token)));
    }

    private sanitizeText(text: string): string {
        return text.replaceAll(/\p{Cf}/gu, '');
    }

    private tokenizeText(text: string): string[] {
        return text.split(/(\s|,|#\[[^\]]*\])/).filter(Boolean);
    }

    private isMediaType(url: string, extensions: readonly string[]): boolean {
        return extensions.some(ext => url.toLowerCase().includes(ext));
    }

    private isMediaPlatform(url: string, platforms: readonly string[]): boolean {
        return platforms.some(platform => url.includes(platform));
    }

    private processToken(token: string): string | ParsedToken {
        if (token.startsWith('nostr:')) return this.processNostrToken(token);
        if (token.startsWith('@')) return this.processUsernameToken(token);
        if (this.isUrl(token)) return this.processLinkToken(token);
        return token;
    }

    private isUrl(token: string): boolean {
        return token.startsWith('http://') || token.startsWith('https://');
    }

    private combinePlainText(tokens: (string | ParsedToken)[]): (string | ParsedToken)[] {
        const result: (string | ParsedToken)[] = [];
        let currentText = '';

        tokens.forEach(token => {
            if (typeof token === 'string') {
                currentText += token;
            } else {
                if (currentText) {
                    result.push(currentText);
                    currentText = '';
                }
                result.push(token);
            }
        });

        if (currentText) {
            result.push(currentText);
        }

        return result;
    }

    private processNostrToken(token: string): ParsedToken {
        try {
            const decoded = nip19.decode(token.substring(6));
            return {
                safeWord: this.utilities.sanitizeUrlAndBypass(token),
                word: decoded.data as string,
                token: decoded.type as TokenType,
            };
        } catch (error) {
            console.warn('Failed to decode nostr token:', error);
            return { word: token, token: 'text' };
        }
    }

    private processUsernameToken(token: string): string | ParsedToken {
        const username = token.substring(1);
        const npub = this.findNpubByUsername(username);

        if (npub) {
            try {
                const decoded = nip19.decode(npub);
                return {
                    safeWord: this.utilities.sanitizeUrlAndBypass(token),
                    word: decoded.data as string,
                    token: decoded.type as TokenType,
                };
            } catch (error) {
                console.warn('Failed to decode npub:', error);
            }
        }

        return token;
    }

    private processLinkToken(url: string): ParsedToken {
        if (this.isMediaType(url, this.MEDIA_EXTENSIONS.image)) {
            return this.createMediaToken(url, 'image');
        }
        if (this.isMediaType(url, this.MEDIA_EXTENSIONS.video)) {
            return this.createMediaToken(url, 'video');
        }
        if (this.isMediaType(url, this.MEDIA_EXTENSIONS.audio)) {
            return this.createMediaToken(url, 'audio');
        }
        if (this.isMediaPlatform(url, this.MEDIA_PLATFORMS.YOUTUBE)) {
            return this.processYouTubeLink(url);
        }
        if (this.isMediaPlatform(url, this.MEDIA_PLATFORMS.SPOTIFY)) {
            return this.processSpotifyLink(url);
        }
        if (this.isMediaPlatform(url, this.MEDIA_PLATFORMS.TIDAL)) {
            return this.processTidalLink(url);
        }

        return { word: url, token: 'link' };
    }

    private createMediaToken(url: string, type: TokenType): ParsedToken {
        return {
            safeWord: this.utilities.sanitizeUrlAndBypass(url),
            word: url,
            token: type,
        };
    }

    private processYouTubeLink(url: string): ParsedToken {
        const youtubeId = this.extractYouTubeId(url);
        const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
        return {
            safeWord: this.utilities.bypassFrameUrl(embedUrl),
            word: embedUrl,
            token: 'youtube',
        };
    }

    private processSpotifyLink(url: string): ParsedToken {
        const embedUrl = url.replace('open.spotify.com/', 'open.spotify.com/embed/');
        return {
            safeWord: this.utilities.sanitizeUrlAndBypassFrame(embedUrl),
            word: url,
            token: 'spotify',
        };
    }

    private processTidalLink(url: string): ParsedToken {
        const embedUrl = url.replace('tidal.com/browse/track/', 'embed.tidal.com/tracks/');
        return {
            safeWord: this.utilities.sanitizeUrlAndBypassFrame(embedUrl),
            word: url,
            token: 'tidal',
        };
    }

    private extractYouTubeId(url: string): string {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
        return match?.[1] ?? '';
    }

    private findNpubByUsername(username: string): string | undefined {
        // Implementation needed
        // This method should return an npub for a given username
        // If not found, it should return undefined
        return undefined;
    }
}
