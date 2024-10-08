import { Component, computed, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../../services/user.service';
import { ValidatorsService } from '../../../../shared/services/validators.service';

import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'dashboard-edit-account',
  templateUrl: './edit-account.component.html',
})
export class EditAccountComponent implements OnInit {
  private router = inject(Router);

  public user?: User;
  public myForm: FormGroup;

  public finishedLoading = computed<boolean>(() => {
    if (this.userService.isLoading()) return true;
    return false;
  });

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.myForm = this.formBuilder.group({
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
    });
  }

  ngOnInit(): void {
    this.user = this.authService.curretUser() ?? undefined;
    if (!this.user) {
      this.router.navigateByUrl('/dashboard');
      return;
    }

    this.myForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    });
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();

    this.userService.isLoading.set(true);
    this.userService
      .updateUserProfile(this.authService.curretUser()!.id, this.myForm.value)
      .subscribe({
        next: (user) => {
          const token = localStorage.getItem('token') ?? '';
          const updateUser = {
            ...user,
            token,
          };
          this.authService.setAuthentication(updateUser);

          Swal.fire(
            'Se Actualizó Tu Cuenta',
            'Tu cuenta se ha actualizado correctamente.',
            'success'
          );
          this.userService.isLoading.set(false);
          this.router.navigateByUrl('/dashboard/auth/my-account');
        },
        error: (message) => {
          console.log(message);
          Swal.fire('Error', message[0], 'error');
          this.userService.isLoading.set(false);
        },
      });
  }
}
