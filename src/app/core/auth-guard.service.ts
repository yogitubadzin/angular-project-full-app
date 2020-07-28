import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable(
  {
  providedIn: 'root',
}
)
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oauthService: OAuthService) {}

  canActivate() {
    if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
      return true;
    } else {
      this.router.navigate(['/home', { login: true }]);
      return false;
    }
  }
}
