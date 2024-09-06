import { Component, computed, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { RecipeService, DashboardService } from '../../services';

import {
  CardRecipes,
  CategoriesResponse,
  FavoritesResponse,
} from '../../interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: ``,
})
export class MainPageComponent implements OnInit {
  public recipes?: CardRecipes[];
  public categories?: CategoriesResponse[];
  public favoriteRecipes?: FavoritesResponse[];

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getCategories();
  }

  getRecipes() {
    this.dashboardService.isLoading.set(true);

    forkJoin({
      recipes: this.recipeService.getAllRecipes(),
      favorites: this.dashboardService.getFavorites(),
    }).subscribe({
      next: ({ recipes, favorites }) => {
        this.recipes = recipes.map((recipe) => ({
          ...recipe,
          id: recipe.id,
          image: recipe.image,
          title: recipe.title,
          User: {
            firstName: recipe.User.firstName,
          },
          isFavorite: favorites.some(
            (fav: FavoritesResponse) => fav.recipeId === recipe.id
          ),
        }));
        this.dashboardService.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.dashboardService.isLoading.set(false);
      },
    });
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

  //TODO: Agregar paginación
}
