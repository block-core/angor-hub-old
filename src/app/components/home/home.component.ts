import { AngorCardComponent } from '@angor/components/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrlPipe } from 'app/shared/pipes/safe-url.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
  import { Subject, takeUntil } from 'rxjs';
import { EventListComponent } from '../event-list/event-list.component';

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
        MatDivider,
        MatMenu,
        MatMenuTrigger,
        AngorCardComponent,
        MatTooltipModule,
        MatIcon,
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        TextFieldModule,
        MatDividerModule,
        NgClass,
        FormsModule,
        QRCodeModule,
        PickerComponent,
        MatSlideToggle,
        SafeUrlPipe,
        MatProgressSpinnerModule,
        InfiniteScrollModule,
        EventListComponent
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
