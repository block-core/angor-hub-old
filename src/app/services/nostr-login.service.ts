import { Injectable } from '@angular/core';
import { init as initNostrLogin, launch as launchNostrLoginDialog } from 'nostr-login';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NostrLoginService {
    // Subject to emit the public key whenever login, signup, or account switch occurs
    private publicKeySubject = new Subject<string>();
    private previousPublicKey: string | null = null;

    constructor() {
        // Initialize nostr-login and set up event listeners
        this.initializeNostrLogin();
        this.setupEventListeners();
    }

    // Initializes the nostr-login library with custom configuration
    private initializeNostrLogin(): void {
        initNostrLogin({
            theme: 'ocean',
            noBanner: true,
            title: 'Angor Hub',

            // Callback triggered upon successful login or signup
            onAuth: (npub: string, options: any) => {
                this.handleAuthSuccess(npub, options);
            },
        });
    }

    // Set up listeners for all relevant events from nostr-login
    private setupEventListeners(): void {
        document.addEventListener('nlAuth', this.handleNlAuthEvent.bind(this));
        document.addEventListener('nlLogout', this.handleNlLogoutEvent.bind(this));
        document.addEventListener('nlDarkMode', this.handleNlDarkModeEvent.bind(this));
        document.addEventListener('nlLaunch', this.handleNlLaunchEvent.bind(this));
    }

    private handleNlLogoutEvent(): void {
        console.log('Logout event detected');
        this.handleLogout();
    }


    // Handle the nlAuth event, managing login, signup, logout, and switch-account cases
    private handleNlAuthEvent(e: CustomEvent): void {
        const { type, pubkey, options } = e.detail;

        switch (type) {
            case 'login':
                console.log('User logged in:', pubkey);
                this.handleAuthSuccess(pubkey, options);
                break;
            case 'signup':
                console.log('User signed up:', pubkey);
                this.handleSignupSuccess(pubkey, options);
                break;
            case 'logout':
                console.log('User logged out');
                this.handleLogout();
                break;
            case 'switch-account':
                console.log('User switched account:', pubkey);
                this.handleAccountSwitch(pubkey, options);
                break;
            default:
                console.warn('Unknown nlAuth event type:', type);
        }

        // Check if the public key has changed to detect an account switch
        if (this.previousPublicKey && this.previousPublicKey !== pubkey) {
            console.log('Account switched to:', pubkey);
            this.handleAccountSwitch(pubkey, options);
        }
        // Update the previous public key
        this.previousPublicKey = pubkey;
    }

    // Emit the public key when login, signup, or account switch is successful
    private handleAuthSuccess(npub: string, options: any): void {
        console.log('Authenticated successfully with public key:', npub);
        this.publicKeySubject.next(npub); // Emit the public key
    }

    // Handle successful signup and emit the public key
    private handleSignupSuccess(npub: string, options: any): void {
        console.log('Signup successful with public key:', npub);
        this.publicKeySubject.next(npub); // Emit the public key
    }

    // Handle account switching by emitting the new public key and reloading the application
    private handleAccountSwitch(pubkey: string, options: any): void {
        console.log('Account switched to:', pubkey);
        this.publicKeySubject.next(pubkey); // Emit the new public key
        window.location.reload(); // Refresh application to load new account data
    }

    // Handle user logout process
    private handleLogout(): void {
        console.log('Logged out');
        this.publicKeySubject.next(''); // Emit an empty string on logout
        // Clear any additional user data if necessary
    }

    // Handle dark mode toggle
    private handleNlDarkModeEvent(e: CustomEvent): void {
        const isDarkMode = e.detail;
        console.log('Dark mode changed to:', isDarkMode ? 'enabled' : 'disabled');
        this.updateDarkMode(isDarkMode);
    }

    // Handle screen launch for specified nostr-login screens
    private handleNlLaunchEvent(e: CustomEvent): void {
        const screen = e.detail || 'welcome';
        console.log(`Launching Nostr login screen: ${screen}`);
        this.launchScreen(screen);
    }

    // Launch specific screens in nostr-login
    private launchScreen(screen: any): void {
        launchNostrLoginDialog(screen);
    }

    // Toggle dark mode state on the application
    private updateDarkMode(isDarkMode: boolean): void {
        document.body.classList.toggle('dark-mode', isDarkMode);
        console.log(`Dark mode is now ${isDarkMode ? 'enabled' : 'disabled'}`);
    }

    // Public method to get the current public key as an observable
    getPublicKeyObservable(): Observable<string> {
        return this.publicKeySubject.asObservable();
    }

    // Public method to launch the welcome screen
    launchWelcomeScreen(): void {
        launchNostrLoginDialog('welcome');
    }

    // Public method to launch the signup screen
    launchSignupScreen(): void {
        launchNostrLoginDialog('welcome-signup');
    }

    // Public method to launch the login screen
    launchLoginScreen(): void {
        launchNostrLoginDialog('welcome-login');
    }

    // Public method to initiate account switch process
    switchAccount(): void {
        // Dispatch custom event to open switch account modal
        document.dispatchEvent(new CustomEvent('nlLaunch', { detail: 'switch-account' }));
    }

    // Public method to log out the user
    logout(): void {
        // Dispatch nlLogout event to initiate logout in nostr-login
        document.dispatchEvent(new Event('nlLogout'));
    }

    // Public method to toggle dark mode
    toggleDarkMode(isDarkMode: boolean): void {
        // Dispatch nlDarkMode event with the dark mode state
        document.dispatchEvent(new CustomEvent('nlDarkMode', { detail: isDarkMode }));
    }
}
