import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'auth-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {
  private router = inject(Router);
  public myForm: FormGroup;

  public isLoading = signal<boolean | null>(false);
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.isLoading()) return true;
    return false;
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService
  ) {
    this.myForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
    });
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    this.isLoading.set(true);

    const { email } = this.myForm.value;

    this.authService.forgotPassword(email).subscribe({
      next: ({ ok, message }) =>
        Swal.fire(
          'Recuperación de contraseña en proceso',
          message ?? '',
          'success'
        ).then(() => this.router.navigateByUrl('/auth/login')),
      error: (message) => {
        console.log(message);
        Swal.fire('Error', message[0], 'error');
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
