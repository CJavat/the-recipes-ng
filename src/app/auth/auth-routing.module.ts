import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { UpdateForgotPasswordPageComponent } from './pages/update-forgot-password-page/update-forgot-password-page.component';
import { ReactivateAccountPageComponent } from './pages/reactivate-account-page/reactivate-account-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'forgot-password', component: ForgotPasswordPageComponent },
      { path: 'reactivate-account', component: ReactivateAccountPageComponent },
      {
        path: 'forgot-password/:token',
        component: UpdateForgotPasswordPageComponent,
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
