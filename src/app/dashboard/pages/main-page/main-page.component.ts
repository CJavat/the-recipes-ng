import { Component, OnInit } from '@angular/core';
import { CategoriesResponse, RecipesResponse } from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: ``,
})
export class MainPageComponent implements OnInit {
  public recipes?: RecipesResponse[];
  public categories?: CategoriesResponse[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
  }

  getRecipes() {
    this.dashboardService.getAllRecipes().subscribe({
      next: (recipes) => (this.recipes = recipes),
      error: (error) => console.error('Error:', error),
    });
  }

  getCategories() {
    this.dashboardService.getAllCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (error) => console.error('Error:', error),
    });
  }
}
