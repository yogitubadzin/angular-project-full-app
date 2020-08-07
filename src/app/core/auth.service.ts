import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject$.asObservable();

  constructor(private oauthService: OAuthService, private router: Router) {
    this.prepareOAuthService();
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.logOut();
    this.isLoggedInSubject$.next(false);
  }

  private prepareOAuthService() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.isLoggedInSubject$.next(true);
      }
    });

    this.oauthService.events
      .pipe(
        filter(
          (e) => e.type === 'token_received' || e.type === 'token_refreshed'
        )
      )
      .subscribe((_) => this.isLoggedInSubject$.next(true));

    this.oauthService.events
      .pipe(filter((e) => e.type === 'session_terminated'))
      .subscribe((_) => {
        this.isLoggedInSubject$.next(false);
      });
    this.oauthService.setupAutomaticSilentRefresh();
  }
}
