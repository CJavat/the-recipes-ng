import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  private router = inject(Router);
  public myForm: FormGroup;

  public isLoading = signal<boolean | null>(false);
  public finishedLoading = computed<boolean>(() => {
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
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validatorsService.firstNamePattern),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validatorsService.lastNamePattern),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validatorsService.emailPattern),
          ],
        ],
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

    this.authService.register(this.myForm.value).subscribe({
      next: () => {
        Swal.fire(
          'Registro exitoso!',
          'Te has registrado correctamente. Revisa tu email para activar tu cuenta',
          'success'
        );
        this.router.navigateByUrl('/auth/login');
        this.isLoading.set(false);
      },
      error: (message) => {
        console.log(message);
        Swal.fire('Error', message[0], 'error');
        this.isLoading.set(false);
      },
    });
  }
}
