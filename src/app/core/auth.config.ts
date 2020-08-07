import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-ruhyufti.eu.auth0.com/',
  clientId: 'mHzvLAAwc4USwRSeUm2WX43im5VWmiEF',
  responseType: 'code',
  redirectUri: window.location.origin,
  scope: 'openid profile email offline_access'
};
