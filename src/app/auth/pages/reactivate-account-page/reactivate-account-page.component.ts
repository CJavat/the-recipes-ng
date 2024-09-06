import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reactivate-account-page',
  templateUrl: './reactivate-account-page.component.html',
})
export class ReactivateAccountPageComponent {
  private router = inject(Router);
  public myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
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

    const { email } = this.myForm.value;

    this.authService.reactivateAccount(email).subscribe({
      next: () =>
        Swal.fire(
          'Reactivación De Cuenta',
          'Tu cuenta se a reactivado correcamente',
          'success'
        ).then(() => this.router.navigateByUrl('/auth/login')),
      error: (message) => {
        console.log(message);
        Swal.fire('Error', message[0], 'error');
      },
    });
  }
}
