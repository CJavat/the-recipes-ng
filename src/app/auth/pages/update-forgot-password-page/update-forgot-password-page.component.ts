import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'auth-update-forgot-password-page',
  templateUrl: './update-forgot-password-page.component.html',
  styles: ``,
})
export class UpdateForgotPasswordPageComponent {
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

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    this.isLoading.set(true);

    const { password, rePassword } = this.myForm.value;
    const token = this.router.url.split('/').at(-1) ?? '';

    this.authService.updateForgotPassword(token, password).subscribe({
      next: ({ ok, message }) =>
        Swal.fire('Error', message ?? '', 'success').then(() =>
          this.router.navigateByUrl('/auth/login')
        ),
      error: (message) => {
        console.log(message);
        Swal.fire('Error', message[0], 'error');
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
