import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public firstNamePattern: string = '([a-zA-Z]+)';
  public lastNamePattern: string = '([a-zA-Z]+)';
  public titlePattern: string = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  public isValidField(myForm: FormGroup, field: string): boolean | null {
    const control = myForm.get(field);

    if (control instanceof FormArray) {
      // Recorre cada control dentro del FormArray y verifica si alguno tiene errores y ha sido tocado
      return control.controls.some((ctrl) => ctrl.errors && ctrl.touched);
    }

    // return myForm.controls[field].errors && myForm.controls[field].touched;

    return control ? control.errors && control.touched : false;
  }

  public isFieldOneEqualFieldTWo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    };
  }
}
