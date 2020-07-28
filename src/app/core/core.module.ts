import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [AuthGuard, AuthService],
  imports: [CommonModule, HttpClient, PaginationModule.forRoot(), OAuthModule.forRoot()],
  //exports: [AuthGuard, AuthService]
})
export class CoreModule {}
