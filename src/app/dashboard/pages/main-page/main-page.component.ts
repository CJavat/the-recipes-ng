import { Component, OnInit } from '@angular/core';
import {
  CategoriesResponse,
  GetFavoritesResponse,
  RecipesResponse,
} from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: ``,
})
export class MainPageComponent implements OnInit {
  public recipes?: RecipesResponse[];
  public categories?: CategoriesResponse[];
  public favoriteRecipes?: GetFavoritesResponse[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
  }

  getRecipes() {
    forkJoin({
      recipes: this.dashboardService.getAllRecipes(),
      favorites: this.dashboardService.getFavorites(),
    }).subscribe({
      next: ({ recipes, favorites }) => {
        this.recipes = recipes.map((recipe) => {
          return {
            ...recipe,
            isFavorite: favorites.some((fav) => fav.recipeId === recipe.id),
          };
        });
      },
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
