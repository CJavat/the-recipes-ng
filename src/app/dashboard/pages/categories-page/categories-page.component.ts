import { Component, computed, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CategoriesResponse } from '../../interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
})
export class CategoriesPageComponent implements OnInit {
  public categories?: CategoriesResponse[];

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.dashboardService.isLoading.set(true);

    this.dashboardService.getAllCategories().subscribe({
      next: (categories) => {
        this.dashboardService.isLoading.set(false);
        return (this.categories = categories);
      },
      error: (error) => {
        this.dashboardService.isLoading.set(false);
        console.error('Error:', error);
      },
    });
  }
}
