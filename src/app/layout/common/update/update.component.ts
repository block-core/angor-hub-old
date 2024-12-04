import {
    ChangeDetectionStrategy,
    Component,
    Signal,
    inject,
    signal,
    effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewVersionCheckerService } from 'app/services/update.service';

@Component({
    selector: 'update',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './update.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent {
    tooltip: Signal<string> = signal('Update App');

    isNewVersionAvailable = signal(false);

    private updateService = inject(NewVersionCheckerService);

    constructor() {
        this.updateService.isNewVersionAvailable$.subscribe((isAvailable) => {
            this.isNewVersionAvailable.set(isAvailable);
        });
    }

    applyUpdate(): void {
        this.updateService.applyUpdate();
    }
}
