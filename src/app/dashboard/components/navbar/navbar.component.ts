import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public isExpanded: boolean = false;
  public isExpandedProfile: boolean = false;

  public toggleNavMenu(nameButton?: string): void {
    if (nameButton === 'user-menu-button') {
      this.isExpandedProfile = !this.isExpandedProfile;

      return;
    }

    this.isExpanded = !this.isExpanded;
  }
}
