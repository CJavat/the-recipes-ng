import { Component, computed, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { environment } from '../../../../../environments/environment';

import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../../services/user.service';
import { MyImageCropperComponent } from '../../../components/image-cropper/my-image-cropper.component';

@Component({
  selector: 'app-update-image-page',
  templateUrl: './update-image-page.component.html',
})
export class UpdateImagePageComponent implements OnInit {
  @ViewChild(MyImageCropperComponent)
  imageCropperComponent!: MyImageCropperComponent;

  public hostUrl: string = environment.backendUrl;
  public imageProfile: string = '';

  public finishedLoad = computed<boolean>(() => {
    if (this.userService.isLoading()) return true;
    return false;
  });

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.authService.curretUser()?.avatar.includes('http')) {
      this.imageProfile = this.authService.curretUser()!.avatar;
    } else {
      this.imageProfile = `${this.hostUrl}/${
        this.authService.curretUser()?.avatar
      }`;
    }
  }

  updatePhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.userService.isLoading.set(true);
    this.userService.updatePhoto(formData).subscribe({
      next: (response) => {
        this.authService.setAuthentication(response);
        `${this.hostUrl}/${response.avatar}`;

        Swal.fire(
          'Imagen Actualizada',
          'La imagen de perfil ha sido actualizada correctamente',
          'success'
        ).then(() => {
          this.userService.isLoading.set(false);
          location.reload();
        });
      },
      error: (error) => {
        console.log(error);
        this.userService.isLoading.set(false);
        Swal.fire('Error', 'No se pudo actualizar tu imagen', 'error');
      },
    });
  }

  openFileInputInChild() {
    this.imageCropperComponent.openFileDialog();
  }
}
