import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    inject,
    signal,
    effect,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'settings-notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
     imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatButtonModule,
    ],
})
export class SettingsNotificationsComponent {
    private readonly _formBuilder = inject(FormBuilder);

    // Signal to manage the FormGroup
    notificationsForm = signal<FormGroup>(
        this._formBuilder.group({
            mention: [false],
            privateMessage: [false],
            zap: [false],
            follower: [false],
        })
    );

    notificationKinds = {
        mention: 1,
        privateMessage: 4,
        zap: 9735,
        follower: 3,
    };

    constructor() {
        this.initializeForm();
    }

    initializeForm(): void {
        const savedSettings = this.loadNotificationSettings();

        this.notificationsForm().setValue({
            mention: savedSettings.includes(this.notificationKinds.mention),
            privateMessage: savedSettings.includes(
                this.notificationKinds.privateMessage
            ),
            zap: savedSettings.includes(this.notificationKinds.zap),
            follower: savedSettings.includes(this.notificationKinds.follower),
        });
    }

    saveSettings(): void {
        const formValues = this.notificationsForm().value;
        const enabledKinds: number[] = [];

        if (formValues.mention) {
            enabledKinds.push(this.notificationKinds.mention);
        }
        if (formValues.privateMessage) {
            enabledKinds.push(this.notificationKinds.privateMessage);
        }
        if (formValues.zap) {
            enabledKinds.push(this.notificationKinds.zap);
        }
        if (formValues.follower) {
            enabledKinds.push(this.notificationKinds.follower);
        }

        localStorage.setItem('notificationSettings', JSON.stringify(enabledKinds));
        console.log('Notification settings saved:', enabledKinds);
    }

    private loadNotificationSettings(): number[] {
        const storedSettings = localStorage.getItem('notificationSettings');
        return storedSettings ? JSON.parse(storedSettings) : [1, 3, 4, 9735];
    }
}
