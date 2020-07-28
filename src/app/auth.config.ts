import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://dev-ruhyufti.eu.auth0.com',
  redirectUri: window.location.origin + '/',
  clientId: 'mHzvLAAwc4USwRSeUm2WX43im5VWmiEF',
  responseType: 'code',
  scope: 'openid profile email offline_access api',
  showDebugInformation: true,
  timeoutFactor: 0.01,
};
