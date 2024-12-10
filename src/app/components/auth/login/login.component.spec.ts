
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { SignerService } from 'app/services/signer.service';
import { StateService } from 'app/services/state.service';
import { NostrLoginService } from 'app/services/nostr-login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockSignerService: jasmine.SpyObj<SignerService>;
    let mockStateService: jasmine.SpyObj<StateService>;
    let mockNostrLoginService: jasmine.SpyObj<NostrLoginService>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
        mockSignerService = jasmine.createSpyObj('SignerService', ['handleLoginWithKey', 'handleLoginWithMnemonic', 'handleLoginWithExtension', 'getPublicKey', 'setPublicKey']);
        mockStateService = jasmine.createSpyObj('StateService', ['loadUserProfile']);
        mockNostrLoginService = jasmine.createSpyObj('NostrLoginService', ['getPublicKeyObservable', 'launchLoginScreen', 'launchSignupScreen']);

        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: SignerService, useValue: mockSignerService },
                { provide: StateService, useValue: mockStateService },
                { provide: NostrLoginService, useValue: mockNostrLoginService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        mockNostrLoginService.getPublicKeyObservable.and.returnValue(of('mockPublicKey'));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize forms on init', () => {
        expect(component.SecretKeyLoginForm).toBeDefined();
        expect(component.MenemonicLoginForm).toBeDefined();
    });

    it('should handle login with secret key', () => {
        component.SecretKeyLoginForm.setValue({ secretKey: 'mockSecretKey', password: 'mockPassword' });
        mockSignerService.handleLoginWithKey.and.returnValue(true);

        component.loginWithSecretKey();

        expect(mockSignerService.handleLoginWithKey).toHaveBeenCalledWith('mockSecretKey', 'mockPassword');
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should handle login with mnemonic', () => {
        component.MenemonicLoginForm.setValue({ menemonic: 'mockMnemonic', passphrase: 'mockPassphrase', password: 'mockPassword' });
        mockSignerService.handleLoginWithMnemonic.and.returnValue(true);

        component.loginWithMenemonic();

        expect(mockSignerService.handleLoginWithMnemonic).toHaveBeenCalledWith('mockMnemonic', 'mockPassphrase', 'mockPassword');
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should handle login with Nostr extension', async () => {
        mockSignerService.handleLoginWithExtension.and.returnValue(Promise.resolve(true));

        await component.loginWithNostrExtension();

        expect(mockSignerService.handleLoginWithExtension).toHaveBeenCalled();
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
    });

    it('should handle login failure with secret key', () => {
        component.SecretKeyLoginForm.setValue({ secretKey: 'mockSecretKey', password: 'mockPassword' });
        mockSignerService.handleLoginWithKey.and.returnValue(false);

        component.loginWithSecretKey();

        expect(component.loading()).toBeFalse();
        expect(component.showSecAlert()).toBeTrue();
    });

    it('should handle login failure with mnemonic', () => {
        component.MenemonicLoginForm.setValue({ menemonic: 'mockMnemonic', passphrase: 'mockPassphrase', password: 'mockPassword' });
        mockSignerService.handleLoginWithMnemonic.and.returnValue(false);

        component.loginWithMenemonic();

        expect(component.loading()).toBeFalse();
        expect(component.showMenemonicAlert()).toBeTrue();
    });

    it('should handle error during login with Nostr extension', async () => {
        mockSignerService.handleLoginWithExtension.and.returnValue(Promise.reject('error'));

        await component.loginWithNostrExtension();

        expect(component.loading()).toBeFalse();
    });
});
