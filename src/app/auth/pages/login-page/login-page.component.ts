import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
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
    this.myForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    this.isLoading.set(true);
    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
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
