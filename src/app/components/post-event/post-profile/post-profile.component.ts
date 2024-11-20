import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'app/services/storage.service';
import { CommonModule } from '@angular/common';
import { AgoPipe } from "../../../shared/pipes/ago.pipe";
import { MetadataService } from 'app/services/metadata.service';

@Component({
    selector: 'app-post-profile',
    templateUrl: './post-profile.component.html',
    styleUrls: ['./post-profile.component.scss'],
    standalone: true,
    imports: [CommonModule, AgoPipe]
})
export class PostProfileComponent implements OnInit, OnDestroy {
  @Input() pubkey!: string;
  @Input() avatarUrl?: string;
  @Input() created_at?: string;
  @Output() userChange = new EventEmitter<any>();

  user: any;
  private subscription!: Subscription;
   constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _storageService: StorageService,
    private _metadatasService: MetadataService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this._metadatasService.addPublicKey(this.pubkey);
    this.subscription = this._storageService.profile$.subscribe((data) => {
      if (data && data.pubKey === this.pubkey) {
        this.user = data.metadata;
        this.userChange.emit(this.user);
        this._changeDetectorRef.detectChanges();
      }
    });
  }

  private async loadUserProfile(): Promise<void> {
    const metadata = await this._storageService.getProfile(this.pubkey);
    this.user = metadata || {};
    this.userChange.emit(this.user);
    this._changeDetectorRef.detectChanges();
  }

  get displayName(): string {
    return this.user?.display_name || this.user?.name || this.shortenPubkey(this.pubkey);
  }

  get displayAvatar(): string {
    return this.user?.picture || this.avatarUrl || '/images/avatars/avatar-placeholder.png';
  }

  shortenPubkey(pubkey: string): string {
    if (!pubkey) return '';
    return `${pubkey.slice(0, 8)}...${pubkey.slice(-8)}`;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
