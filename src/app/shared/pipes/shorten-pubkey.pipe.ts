import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenPubkey'
})
export class ShortenPubkeyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return `${value.slice(0, 8)}...${value.slice(-8)}`;
  }
}
