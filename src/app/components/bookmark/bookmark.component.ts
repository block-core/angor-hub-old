import { Component } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent {



    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
