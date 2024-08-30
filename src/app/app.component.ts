import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    if (
      localStorage.getItem('theme') !== 'dark' ||
      !localStorage.getItem('theme')
    ) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) return false;

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        break;

      case AuthStatus.notAuthenticated:
        // this.router.navigateByUrl('/auth');
        break;
    }
  });
}
