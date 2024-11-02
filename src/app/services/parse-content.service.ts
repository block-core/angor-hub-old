import { Injectable } from '@angular/core';
import { nip19 } from 'nostr-tools';
import { Utilities } from './utilities';

@Injectable({
    providedIn: 'root',
})
export class ParseContentService {
    imageExtensions = ['.jpg', '.jpeg', '.gif', '.png', '.webp', '.apng', '.jfif', '.svg'];
    videoExtensions = ['.mp4', '.m4v', '.m4p', '.mpg', '.mpeg', '.webm', '.avif', '.mov', '.ogv'];
    audioExtensions = ['.mp3', '.m4a', '.flac', '.ogg', '.wav'];

    constructor(private utilities: Utilities) {}

    // Check if the URL is an image
    isImage(url: string): boolean {
        return this.imageExtensions.some(extension => url.includes(extension));
    }

    // Check if the URL is a video
    isVideo(url: string): boolean {
        return this.videoExtensions.some(extension => url.includes(extension));
    }

    // Check if the URL is an audio
    isAudio(url: string): boolean {
        return this.audioExtensions.some(extension => url.includes(extension));
    }

    // Check if the URL is a YouTube link
    isYouTube(url: string): boolean {
        return url.includes('youtu.be') || url.includes('youtube.com');
    }

    // Check if the URL is a Spotify link
    isSpotify(url: string): boolean {
        return url.includes('open.spotify.com');
    }

    // Check if the URL is a Tidal link
    isTidal(url: string): boolean {
        return url.includes('tidal.com');
    }

    parseContent(text: string): (string | any)[] {
        text = text.replaceAll(/\p{Cf}/gu, '');
        const tokens = this.tokenizeText(text);
        return this.combinePlainText(tokens.map(token => this.processToken(token)));
    }

    private tokenizeText(text: string): string[] {
        return text.split(/(\s|,|#\[[^\]]*\])/).filter(token => token !== '');
    }

    private processToken(token: string | any): string | any {
        if (token.startsWith('nostr:')) return this.processNostrToken(token);
        if (token.startsWith('@')) return this.processUsernameToken(token);
        if (token.startsWith('http://') || token.startsWith('https://')) return this.processLinkToken(token);
        return token; // Treat as plain text
    }

    private combinePlainText(tokens: (string | any)[]): (string | any)[] {
        const result: (string | any)[] = [];
        let currentText = '';

        tokens.forEach(token => {
            if (typeof token === 'string') {
                currentText += token;
            } else {
                if (currentText) result.push(currentText); // Push combined text
                result.push(token); // Push non-text tokens directly
                currentText = '';
            }
        });

        if (currentText) result.push(currentText); // Add any remaining text
        return result;
    }

    private processNostrToken(token: string): any {
        const decoded = nip19.decode(token.substring(6));
        const data = decoded.data;
        return { safeWord: this.utilities.sanitizeUrlAndBypass(token), word: data, token: decoded.type };
    }

    private processUsernameToken(token: string): any {
        const username = token.substring(1);
        const npub = this.findNpubByUsername(username);
        if (npub) {
            const decoded = nip19.decode(npub);
            return { safeWord: this.utilities.sanitizeUrlAndBypass(token), word: decoded.data, token: decoded.type };
        }
        return token;
    }

    private processLinkToken(token: string): any {
        if (this.isImage(token)) return { safeWord: this.utilities.sanitizeUrlAndBypass(token), word: token, token: 'image' };
        if (this.isVideo(token)) return { safeWord: this.utilities.sanitizeUrlAndBypass(token), word: token, token: 'video' };
        if (this.isAudio(token)) return { safeWord: this.utilities.sanitizeUrlAndBypass(token), word: token, token: 'audio' };
        if (this.isYouTube(token)) return this.processYouTubeLink(token);
        if (this.isSpotify(token)) return this.processSpotifyLink(token);
        if (this.isTidal(token)) return this.processTidalLink(token);
        return { word: token, token: 'link' };
    }

    private processYouTubeLink(token: string): any {
        const youtubeId = this.extractYouTubeId(token);
        return {
            safeWord: this.utilities.bypassFrameUrl(`https://www.youtube.com/embed/${youtubeId}`),
            word: `https://www.youtube.com/embed/${youtubeId}`,
            token: 'youtube'
        };
    }

    private processSpotifyLink(token: string): any {
        return {
            safeWord: this.utilities.sanitizeUrlAndBypassFrame(token.replace('open.spotify.com/', 'open.spotify.com/embed/')),
            word: token,
            token: 'spotify'
        };
    }

    private processTidalLink(token: string): any {
        const embedUrl = token.replace('tidal.com/browse/track/', 'embed.tidal.com/tracks/');
        return { safeWord: this.utilities.sanitizeUrlAndBypassFrame(embedUrl), word: token, token: 'tidal' };
    }

    private extractYouTubeId(token: string): string {
        const match = token.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
        return match ? match[1] : '';
    }

    private findNpubByUsername(username: string): string | undefined {
        return undefined;
    }
}
