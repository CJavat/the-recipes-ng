import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { UpdateForgotPasswordPageComponent } from './pages/update-forgot-password-page/update-forgot-password-page.component';
import { ReactivateAccountPageComponent } from './pages/reactivate-account-page/reactivate-account-page.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    UpdateForgotPasswordPageComponent,
    ReactivateAccountPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
