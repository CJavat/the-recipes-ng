import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { environment } from '../../../../../environments/environment';

import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-image-page',
  templateUrl: './update-image-page.component.html',
  styles: ``,
})
export class UpdateImagePageComponent implements OnInit {
  private router = inject(Router);

  public hostUrl: string = environment.backendUrl;
  public imageProfile: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.imageProfile = `${this.hostUrl}/${
      this.authService.curretUser()?.avatar
    }`;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!(fileInput.files && fileInput.files.length > 0)) return;

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    this.userService.updatePhoto(formData).subscribe({
      next: (response) => {
        this.authService.setAuthentication(response);
        `${this.hostUrl}/${response.avatar}`;

        Swal.fire(
          'Imagen Actualizada',
          'La imagen de perfil ha sido actualizada correctamente',
          'success'
        ).then(() => location.reload());
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'No se pudo actualizar tu imagen', 'error');
      },
    });
  }
}
