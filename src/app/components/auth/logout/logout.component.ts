import { Component, OnInit, ViewEncapsulation, inject, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SignerService } from 'app/services/signer.service';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-logout',
  templateUrl: './logout.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterModule, CommonModule],
  standalone: true
})
export class LogoutComponent implements OnInit, OnDestroy {
  showConfirm = signal(true);
  countdown = signal(5);
  private intervalId: any;

  private _router = inject(Router);
  private _signerService = inject(SignerService);

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.countdown() > 0) {
        this.countdown.set(this.countdown() - 1);
      } else {
        clearInterval(this.intervalId);
        this.logout();
      }
    }, 1000);
  }

  logout(): void {
    this._signerService.clearPassword();
    this._signerService.logout();
    this._router.navigate(['login']);
  }

  cancelLogout(): void {
    this.showConfirm.set(false);
    this._router.navigate(['home']);
  }
}
