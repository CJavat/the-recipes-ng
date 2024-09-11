import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../auth/services/auth.service';

import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'dashboard-my-account-page',
  templateUrl: './my-account-page.component.html',
})
export class MyAccountPageComponent implements OnInit {
  private router = inject(Router);
  private hostUrl = environment.backendUrl;

  public user?: User;
  public imageUrl: string = '';

  public finishedLoad = computed<boolean>(() => {
    console.log(this.authService.curretUser());
    if (!this.authService.curretUser()) return true;
    return false;
  });

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.curretUser() ?? undefined;
    if (this.user?.avatar.includes('http')) {
      this.imageUrl = this.user.avatar;
    } else {
      this.imageUrl = `${this.hostUrl}/${this.user?.avatar}`;
    }
    if (!this.user) {
      this.router.navigateByUrl('/dashboard');
      return;
    }
  }
}
