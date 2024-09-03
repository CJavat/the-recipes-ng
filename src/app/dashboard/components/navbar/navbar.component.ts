import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ImageUser, Routes } from '../../interfaces';

@Component({
  selector: 'dashboard-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public isExpanded: boolean = false;
  public isExpandedProfile: boolean = false;

  @Input({ required: true })
  public imageUser: ImageUser | null = null;

  public recipesRoutes: Routes[] = [
    { label: 'Inicio', routerLink: '/dashboard' },
    { label: 'Recetas', routerLink: 'recipes' },
    { label: 'Categorias', routerLink: 'categories' },
    { label: 'Recetas Favoritas', routerLink: 'favorites' },
    { label: 'Crear Receta', routerLink: 'new-recipe' },
  ];
  public accountRoutes: Routes[] = [
    { label: 'Mi Cuenta', routerLink: 'auth/my-account' },
    { label: 'Configuración', routerLink: 'auth/settings' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  toggleNavMenu(nameButton?: string): void {
    if (nameButton === 'user-menu-button') {
      this.isExpandedProfile = !this.isExpandedProfile;

      return;
    }

    this.isExpanded = !this.isExpanded;
  }

  OnLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
