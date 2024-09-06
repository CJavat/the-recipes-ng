import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../../services';
import { AuthService } from '../../../../auth/services/auth.service';
import { ValidatorsService } from '../../../../shared/services/validators.service';

import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
})
export class UpdatePasswordPageComponent implements OnInit {
  private router = inject(Router);

  public user?: User;
  public myForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.myForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', Validators.required],
      },

      {
        validators: [
          this.validatorsService.isFieldOneEqualFieldTWo(
            'password',
            'rePassword'
          ),
        ],
      }
    );
  }

  ngOnInit(): void {
    this.user = this.authService.curretUser() ?? undefined;
    if (!this.user) {
      this.router.navigateByUrl('/dashboard');
      return;
    }
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    this.userService
      .updateUserProfile(this.authService.curretUser()!.id, {
        password: this.myForm.value['password'],
      })
      .subscribe({
        next: (user) => {
          const token = localStorage.getItem('token') ?? '';
          const updateUser = {
            ...user,
            token,
          };
          this.authService.setAuthentication(updateUser);

          Swal.fire(
            'Contraseña Actualizada',
            'Tu contraseña se ha actualizado correctamente.',
            'success'
          );
          this.router.navigateByUrl('/dashboard/auth/settings');
        },
        error: (message) => {
          console.log(message);
          Swal.fire('Error', message[0], 'error');
        },
      });
  }
}
