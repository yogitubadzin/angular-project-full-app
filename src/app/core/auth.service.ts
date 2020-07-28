import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';

@Injectable(
  {
  providedIn: 'root',
}
)
export class AuthService {
  private isLoggedInSubject$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject$.asObservable();

  constructor(private oauthService: OAuthService, private router: Router) {
    this.prepareOAuthService();
  }

  public login(targetUrl?: string) {
    this.oauthService.initLoginFlow(targetUrl);
  }

  public logout() {
    this.oauthService.logOut();
  }

  private prepareOAuthService() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();

    window.addEventListener('storage', (event) => {
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      this.isLoggedInSubject$.next(this.oauthService.hasValidAccessToken());

      if (!this.oauthService.hasValidAccessToken()) {
        this.navigateToLoginPage();
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isLoggedInSubject$.next(this.oauthService.hasValidAccessToken());
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter((e) => ['session_terminated', 'session_error'].includes(e.type))
      )
      .subscribe((e) => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  private navigateToLoginPage() {
    this.router.navigateByUrl('/home');
  }
}
