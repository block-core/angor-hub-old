import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'countdown-timer',
    standalone: true,
    imports: [CommonModule],
    styles: [`
        .countdown-container {
            display: flex;
            justify-content: center;
            gap: 1rem;
            padding: 1rem;
        }
        .time-box {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border-radius: 8px;
            padding: 0.5rem;
            min-width: 70px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .time-value {
            font-size: 1.5rem;
            font-weight: bold;
            font-family: 'Monaco', monospace;
            margin-bottom: 0.25rem;
        }
        .time-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            opacity: 0.8;
        }
        .flip {
            animation: flipAnimation 0.6s ease-in-out;
        }
        @keyframes flipAnimation {
            0% { transform: perspective(400px) rotateX(0); }
            50% { transform: perspective(400px) rotateX(-90deg); }
            100% { transform: perspective(400px) rotateX(0); }
        }
    `],
    template: `
        <div class="text-center mb-2 font-bold" [style.color]="hasStarted ? '#ef4444' : '#22c55e'">
            {{ displayText }}
        </div>
        <div class="countdown-container">
            <div class="time-box">
                <div class="time-value" [class.flip]="days !== previousDays">{{ days }}</div>
                <div class="time-label">Days</div>
            </div>
            <div class="time-box">
                <div class="time-value" [class.flip]="hours !== previousHours">{{ hours }}</div>
                <div class="time-label">Hours</div>
            </div>
            <div class="time-box">
                <div class="time-value" [class.flip]="minutes !== previousMinutes">{{ minutes }}</div>
                <div class="time-label">Minutes</div>
            </div>
            <div class="time-box">
                <div class="time-value" [class.flip]="seconds !== previousSeconds">{{ seconds }}</div>
                <div class="time-label">Seconds</div>
            </div>
        </div>
    `,
    animations: [
        trigger('numberChange', [
            transition(':increment', [
                style({ transform: 'translateY(-100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':decrement', [
                style({ transform: 'translateY(100%)', opacity: 0 }),
                animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ])
        ])
    ]
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
    @Input() startDate: number;
    @Input() expiryDate: number;

    private subscription: Subscription;
    displayText: string = '';
    hasStarted: boolean = false;

    days: string = '00';
    hours: string = '00';
    minutes: string = '00';
    seconds: string = '00';

    previousDays: string = '00';
    previousHours: string = '00';
    previousMinutes: string = '00';
    previousSeconds: string = '00';

    ngOnInit() {
        this.subscription = interval(1000).subscribe(() => {
            this.updateTime();
        });

        this.updateTime();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private updateTime() {
        const now = Math.floor(Date.now() / 1000);
        const targetDate = this.hasStarted ? this.expiryDate : this.startDate;
        const difference = targetDate - now;

        if (now >= this.startDate && now < this.expiryDate) {
            this.hasStarted = true;
            this.displayText = 'Time Remaining:';
        } else if (now < this.startDate) {
            this.hasStarted = false;
            this.displayText = 'Starting in:';
        } else {
            this.hasStarted = true;
            this.displayText = 'Expired';
            this.days = this.hours = this.minutes = this.seconds = '00';
            return;
        }

        if (difference > 0) {
            const days = Math.floor(difference / 86400);
            const hours = Math.floor((difference % 86400) / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const seconds = difference % 60;

            this.previousDays = this.days;
            this.previousHours = this.hours;
            this.previousMinutes = this.minutes;
            this.previousSeconds = this.seconds;

            this.days = this.formatTimeUnit(days);
            this.hours = this.formatTimeUnit(hours);
            this.minutes = this.formatTimeUnit(minutes);
            this.seconds = this.formatTimeUnit(seconds);
        } else {
            this.days = this.hours = this.minutes = this.seconds = '00';
        }
    }

    private formatTimeUnit(unit: number): string {
        return unit < 10 ? '0' + unit : unit.toString();
    }
}
