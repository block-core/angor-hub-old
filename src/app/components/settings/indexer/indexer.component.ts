import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    signal,
    effect,
    WritableSignal,
    inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IndexerService } from 'app/services/indexer.service';

@Component({
    selector: 'settings-indexer',
    templateUrl: './indexer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CommonModule,
        MatTooltipModule 
    ],
})
export class SettingsIndexerComponent {
    private readonly _indexerService = inject(IndexerService);

    mainnetIndexers: WritableSignal<{ url: string; primary: boolean }[]> = signal([]);
    testnetIndexers: WritableSignal<{ url: string; primary: boolean }[]> = signal([]);
    newMainnetIndexerUrl: WritableSignal<string> = signal('');
    newTestnetIndexerUrl: WritableSignal<string> = signal('');

    constructor() {
        this.loadIndexers();
    }

    private loadIndexers(): void {
        this.mainnetIndexers.set(
            this._indexerService.getIndexers('mainnet').map((url) => ({
                url,
                primary: url === this._indexerService.getPrimaryIndexer('mainnet'),
            }))
        );

        this.testnetIndexers.set(
            this._indexerService.getIndexers('testnet').map((url) => ({
                url,
                primary: url === this._indexerService.getPrimaryIndexer('testnet'),
            }))
        );
    }

    addIndexer(network: 'mainnet' | 'testnet'): void {
        const newIndexerUrl = network === 'mainnet'
            ? this.newMainnetIndexerUrl()
            : this.newTestnetIndexerUrl();

        if (newIndexerUrl.trim()) {
            this._indexerService.addIndexer(newIndexerUrl, network);
            this.loadIndexers();
            if (network === 'mainnet') {
                this.newMainnetIndexerUrl.set('');
            } else {
                this.newTestnetIndexerUrl.set('');
            }
        }
    }

    removeIndexer(network: 'mainnet' | 'testnet', indexer: { url: string; primary: boolean }): void {
        this._indexerService.removeIndexer(indexer.url, network);
        this.loadIndexers();
    }

    setPrimaryIndexer(network: 'mainnet' | 'testnet', indexer: { url: string; primary: boolean }): void {
        this._indexerService.setPrimaryIndexer(indexer.url, network);
        this.loadIndexers();
    }

    trackByFn(index: number, item: { url: string; primary: boolean }): string {
        return item.url;
    }
}
