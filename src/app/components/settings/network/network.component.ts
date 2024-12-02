import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal,
    effect,
    inject,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IndexerService } from 'app/services/indexer.service';

@Component({
    selector: 'settings-network',
    templateUrl: './network.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
    ],
})
export class SettingsNetworkComponent implements OnInit {
    private readonly _indexerService = inject(IndexerService);
    networkForm: FormGroup;
    selectedNetwork = signal<'mainnet' | 'testnet'>('testnet');

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {
        const initialNetwork = this._indexerService.getNetwork();
        this.networkForm = this._fb.group({
            network: [initialNetwork],
        });
        this.selectedNetwork.set(initialNetwork);

        // Effect to handle real-time changes
        effect(() => {
            console.log('Selected Network:', this.selectedNetwork());
        });
    }

    setNetwork(network: 'mainnet' | 'testnet'): void {
        this.selectedNetwork.set(network);
    }

    save(): void {
        const network = this.selectedNetwork();
        this._indexerService.setNetwork(network);
    }

    cancel(): void {
        const currentNetwork = this._indexerService.getNetwork();
        this.selectedNetwork.set(currentNetwork);
    }
}
