import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public year: number = new Date().getFullYear();
}
