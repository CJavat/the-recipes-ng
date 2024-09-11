import { Component, HostListener, Input } from '@angular/core';
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
  ];
  public accountRoutes: Routes[] = [
    { label: 'Mi Cuenta', routerLink: 'auth/my-account' },
    { label: 'Mis Recetas', routerLink: 'auth/my-recipes' },
    { label: 'Configuraciones', routerLink: 'auth/settings' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  // Este HostListener escucha clics en cualquier parte del documento
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Si el clic no fue dentro del menú o del botón, cierra el menú
    if (
      targetElement.id !== 'user-menu-button' &&
      !targetElement.closest('#user-menu')
    ) {
      this.isExpandedProfile = false;
    }

    if (
      targetElement.id !== 'mobile-menu-button' &&
      !targetElement.closest('#mobile-menu')
    ) {
      this.isExpanded = false;
    }
  }

  toggleNavMenu(event: Event, nameButton?: string): void {
    event.stopPropagation();
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
