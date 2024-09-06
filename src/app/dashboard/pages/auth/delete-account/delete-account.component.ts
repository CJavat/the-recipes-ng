import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../../services';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
})
export class DeleteAccountComponent {
  private router = inject(Router);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  cancelAccount() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire(
        'Error Al Cancelar Tu Cuenta',
        'Tu token es inválido, intentalo más tarde',
        'error'
      );
      return;
    }
    this.userService.cancelAccount(token).subscribe({
      next: () => {
        this.authService.logout();

        Swal.fire(
          'Cuenta Cancelada',
          'Tu cuenta ha sido cancelada exitosamente',
          'success'
        ).then(() => this.router.navigateByUrl('/auth/login'));
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire(
          'Error Al Cancelar Tu Cuenta',
          'Ha ocurrido un error al cancelar tu cuenta, intentalo más tarde',
          'error'
        );
      },
    });
  }

  deleteAccount() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire(
        'Error Al Cancelar Tu Cuenta',
        'Tu token es inválido, intentalo más tarde',
        'error'
      );
      return;
    }

    this.userService.deleteAccount(token).subscribe({
      next: () => {
        this.authService.logout();
        Swal.fire(
          'Cuenta Eliminada Permanentemente',
          'Tu cuenta ha sido eliminada exitosamente',
          'success'
        ).then(() => this.router.navigateByUrl('/auth/login'));
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire(
          'Error Al Cancelar Tu Cuenta',
          'Ha ocurrido un error al cancelar tu cuenta, intentalo más tarde',
          'error'
        );
      },
    });
  }
}
