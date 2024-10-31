import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
  import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'help-center',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        RouterLink,
        MatExpansionModule,
    ],
})
export class LandingHomeComponent implements OnInit, OnDestroy {

    ngOnInit(): void {

    }


    ngOnDestroy(): void {

    }


    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
