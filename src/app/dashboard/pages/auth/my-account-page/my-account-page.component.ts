import { Component } from '@angular/core';
import { FindUserResponse } from '../../../interfaces';

@Component({
  selector: 'dashboard-my-account-page',
  templateUrl: './my-account-page.component.html',
  styles: ``,
})
export class MyAccountPageComponent {
  public user?: FindUserResponse;
}

//TODO: Diseño temrinado. Falta consumir la api y hacer los datos dinámicos.
