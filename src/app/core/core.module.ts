import { authModuleConfig } from './auth-module-config.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import {
  OAuthModule,
  AuthConfig,
  OAuthModuleConfig,
  OAuthStorage,
} from 'angular-oauth2-oidc';
import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { authConfig } from './auth.config';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    OAuthModule.forRoot(),
  ],
  providers: [AuthGuard, AuthService],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
