import { angorAnimations } from '@angor/animations';
import { AngorAlertComponent, AngorAlertType } from '@angor/components/alert';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { SignerService } from 'app/services/signer.service';

@Component({
    selector: 'auth-create',
    templateUrl: './create.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: angorAnimations,
    standalone: true,
    imports: [
        RouterLink,
        AngorAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CommonModule,
    ]
})
export class RegisterComponent implements OnInit {
    @ViewChild('registerNgForm') registerNgForm: NgForm;

    alert: { type: AngorAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    registerForm: UntypedFormGroup;
    showAlert: boolean = false;
    generatedKeys: { secretKey: string; pubkey: string; npub: string; nsec: string } | null = null;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _signerService: SignerService
    ) {}

    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            confirmation: [false, Validators.requiredTrue]
        });
    }

    generateKeys(): void {
        const password = this.registerForm.get('password')?.value;
        const keys = this._signerService.generateAndStoreKeys(password);
        if (keys) {
            this.generatedKeys = keys;
            this.alert = {
                type: 'success',
                message: 'Keys generated and stored successfully!',
            };
        } else {
            this.alert = {
                type: 'error',
                message: 'Error generating keys. Please try again.',
            };
        }
        this.showAlert = true;
    }

    register(): void {
        if (this.registerForm.invalid || !this.generatedKeys) {
            return;
        }

        this.registerForm.disable();
        this.showAlert = false;

        // Simulate saving user metadata
        const userMetadata = { ...this.generatedKeys, password: this.registerForm.get('password')?.value };
        console.log('User Metadata:', userMetadata);

        // Display success alert and navigate to home
        this.alert = {
            type: 'success',
            message: 'Account created successfully!',
        };
        this.showAlert = true;
        this._router.navigateByUrl('/home');
    }

    copyToClipboard(value: string): void {
        navigator.clipboard.writeText(value).then(
            () => {
                console.log('Copied to clipboard successfully!');
            },
            (err) => {
                console.error('Could not copy text: ', err);
            }
        );
    }

}
