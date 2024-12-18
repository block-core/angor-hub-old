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
            justify-content: flex-end;
            margin-top: 0.5rem;
            position: absolute;
            top: 130px;
            right: 30px;
            transform: translateY(0);
            width: auto;
        }
        .time-boxes-container {
            display: flex;
            gap: 0.75rem;
        }
        .time-box {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border-radius: 6px;
            padding: 0.5rem;
            min-width: 55px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .time-value {
            font-size: 1.2rem;
            font-weight: bold;
            font-family: 'Monaco', monospace;
            margin-bottom: 0.15rem;
        }
        .time-label {
            font-size: 0.65rem;
            text-transform: uppercase;
            opacity: 0.8;
        }
        .status-tooltip {
            position: absolute;
            bottom: -25px;
            right: 0;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            pointer-events: none;
            white-space: nowrap;
            z-index: 10;
        }
        .countdown-container:hover .status-tooltip {
            opacity: 1;
        }
        @media (max-width: 600px) {
            .countdown-container {
                justify-content: flex-end;
                margin-top: 0.25rem;
                width: auto;
                transform: scale(0.8);
                transform-origin: right top;
                right: 20px;
            }
            .time-boxes-container {
                gap: 0.35rem;
            }
            .time-box {
                padding: 0.2rem;
                min-width: 40px;
            }
            .time-value {
                font-size: 0.9rem;
                margin-bottom: 0.1rem;
            }
            .time-label {
                font-size: 0.5rem;
            }
            .status-tooltip {
                font-size: 0.6rem;
                bottom: -20px;
                padding: 3px 6px;
            }
        }
        @media (max-width: 400px) {
            .countdown-container {
                transform: scale(0.7);
                right: 15px;
            }
            .time-box {
                min-width: 35px;
            }
            .time-value {
                font-size: 0.85rem;
            }
            .time-label {
                font-size: 0.45rem;
            }
        }
    `],
    template: `
        <div class="countdown-container">
            <div class="time-boxes-container">
                <div class="time-box">
                    <div class="time-value" [@numberChange]="days !== previousDays">{{ days }}</div>
                    <div class="time-label">Days</div>
                </div>
                <div class="time-box">
                    <div class="time-value" [@numberChange]="hours !== previousHours">{{ hours }}</div>
                    <div class="time-label">Hours</div>
                </div>
                <div class="time-box">
                    <div class="time-value" [@numberChange]="minutes !== previousMinutes">{{ minutes }}</div>
                    <div class="time-label">Min</div>
                </div>
                <div class="time-box">
                    <div class="time-value" [@numberChange]="seconds !== previousSeconds">{{ seconds }}</div>
                    <div class="time-label">Sec</div>
                </div>
            </div>
            <div class="status-tooltip" [style.color]="hasStarted ? '#ff6e99' : '#42f548'">
                {{ displayText }}
            </div>
        </div>
    `,
    animations: [
        trigger('numberChange', [
            transition(':increment', [
                style({ transform: 'translateY(-100%)', opacity: 0 }),
                animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':decrement', [
                style({ transform: 'translateY(100%)', opacity: 0 }),
                animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
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
            this.displayText = 'Time Remaining';
        } else if (now < this.startDate) {
            this.hasStarted = false;
            this.displayText = 'Starting in';
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
