import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TenorResponse } from 'app/types/gif';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ParseContentService {
    constructor(private sanitizer: DomSanitizer) {}

    parseContent(content: string): SafeHtml {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const cleanedContent = content.replace(/["]+/g, '');
        const parsedContent = cleanedContent
          .replace(urlRegex, (url) => {
            if (url.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp|tiff)$/) != null) {
              return `<img src="${url}" alt="Image" width="100%" class="c-img">`;
            } else if (url.match(/\.(mp4|webm)$/) != null) {
              return `<video controls width="100%" class="c-video"><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
            } else if (url.match(/(youtu\.be\/|youtube\.com\/watch\?v=)/)) {
              let videoId;
              if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1];
              } else if (url.includes('watch?v=')) {
                const urlParams = new URLSearchParams(url.split('?')[1]);
                videoId = urlParams.get('v');
              }
              return `<iframe width="100%" class="c-video" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            } else {
              return `<a href="${url}" target="_blank">${url}</a>`;
            }
          })
          .replace(/\n/g, '<br>');

        return this.sanitizer.bypassSecurityTrustHtml(parsedContent);
      }
}
