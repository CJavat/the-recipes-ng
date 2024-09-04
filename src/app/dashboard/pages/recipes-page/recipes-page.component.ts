import { Component, computed, OnInit } from '@angular/core';
import { CardRecipes, FavoritesResponse } from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styles: ``,
})
export class RecipesPageComponent implements OnInit {
  public recipes?: CardRecipes[];

  public favoriteRecipes?: FavoritesResponse[];

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.dashboardService.isLoading.set(true);
    forkJoin({
      recipes: this.dashboardService.getAllRecipes(),
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
        this.dashboardService.isLoading.set(false);
        console.error('Error:', error);
      },
    });
  }
}

//TODO: Agregar paginación
