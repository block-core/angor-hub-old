import { AngorAlertComponent } from '@angor/components/alert';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IndexerService } from 'app/services/indexer.service';

@Component({
    selector: 'settings-network',
    templateUrl: './network.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        NgClass,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        CommonModule,
    ]
})
export class SettingsNetworkComponent implements OnInit {
    networkForm: FormGroup;
    selectedNetwork: 'mainnet' | 'testnet' = 'testnet';
    constructor(
        private _fb: FormBuilder,
        private _indexerService: IndexerService
    ) {}

    ngOnInit(): void {
        this.networkForm = this._fb.group({
            network: [this._indexerService.getNetwork()],
        });

        this.selectedNetwork = this._indexerService.getNetwork();
    }

    setNetwork(network: 'mainnet' | 'testnet'): void {
        this.selectedNetwork = network;
        this._indexerService.setNetwork(this.selectedNetwork);
    }

    save(): void {
        this._indexerService.setNetwork(this.selectedNetwork);
    }

    cancel(): void {
        this.selectedNetwork = this._indexerService.getNetwork();
    }
}
