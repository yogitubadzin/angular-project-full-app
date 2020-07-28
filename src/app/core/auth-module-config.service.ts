import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['https://dev-ruhyufti.eu.auth0.com/api/v2/'],
    sendAccessToken: true,
  }
};
