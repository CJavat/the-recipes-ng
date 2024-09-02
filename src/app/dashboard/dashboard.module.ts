import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [DashboardLayoutComponent, SearchComponentComponent, NavbarComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
