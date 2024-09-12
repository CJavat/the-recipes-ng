import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destinationUrl: string = '';

  ngOnInit(): void {
    this.authService.checkAuthStatus().subscribe();
    this.router.events.subscribe((event) => {
      //? Obtener la ruta a donde quiere navegar
      if (event instanceof NavigationStart) {
        this.destinationUrl = event.url;
      }
    });

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
        if (this.destinationUrl.startsWith('/auth')) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl(this.destinationUrl);
        }
        break;

      case AuthStatus.notAuthenticated:
        if (this.destinationUrl.startsWith('/dashboard')) {
          this.router.navigateByUrl('/auth/login');
        } else {
          this.router.navigateByUrl(this.destinationUrl);
        }
        break;
    }
  });
}
