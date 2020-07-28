import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-ruhyufti.eu.auth0.com/',
  clientId: 'mHzvLAAwc4USwRSeUm2WX43im5VWmiEF',
  responseType: 'code',
  redirectUri: window.location.origin + '/index.html',
  scope: 'openid profile email api',
  useSilentRefresh: false,
  silentRefreshTimeout: 5000,
  timeoutFactor: 0.25,
  sessionChecksEnabled: true,
  showDebugInformation: true,
  clearHashAfterLogin: false,
  nonceStateSeparator : 'semicolon'
};
