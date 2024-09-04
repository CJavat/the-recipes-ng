import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ImageUser } from '../../interfaces';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent implements OnInit {
  public backendUrl: string = environment.backendUrl;
  public avatar: ImageUser | null = null;

  constructor(
    private readonly authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.avatar = {
      src: `${this.backendUrl}/${this.authService.curretUser()?.avatar}`,
      alt: `${this.authService.curretUser()?.firstName}-image`,
    };
  }
}
