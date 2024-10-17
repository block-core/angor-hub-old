import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Injectable({
  providedIn: 'root',
})
export class ParseContentService {
  constructor(private sanitizer: DomSanitizer) {}

  parseContent(content: string): SafeHtml {
    const urlRegex = /(https?:\/\/[^\s]+)/g;


    const cleanedContent = DOMPurify.sanitize(content.replace(/["]+/g, ''));

    const parsedContent = cleanedContent
      .replace(urlRegex, (url) => {
        if (this.isImage(url)) {
          return `<img src="${url}" alt="Image" width="100%" class="c-img">`;
        } else if (this.isVideo(url)) {
          return `<video controls width="100%" class="c-video"><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
        } else if (this.isYoutubeUrl(url)) {
          const videoId = this.extractYoutubeId(url);
          return `<iframe width="100%" class="c-video" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else if (this.isAudio(url)) {
          return `<audio controls width="100%" class="c-audio"><source src="${url}" type="audio/mpeg">Your browser does not support the audio tag.</audio>`;
        } else {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        }
      })
      .replace(/\n/g, '<br>');


    return this.sanitizer.bypassSecurityTrustHtml(parsedContent);
  }


  private isImage(url: string): boolean {
    return /\.(jpeg|jpg|gif|png|bmp|svg|webp|tiff)$/i.test(url);
  }


  private isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }


  private isAudio(url: string): boolean {
    return /\.(mp3|wav|ogg)$/i.test(url);
  }


  private isYoutubeUrl(url: string): boolean {
    return /(youtu\.be\/|youtube\.com\/watch\?v=)/.test(url);
  }


  private extractYoutubeId(url: string): string | null {
    let videoId: string | null = null;
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('watch?v=')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    return videoId;
  }
}
