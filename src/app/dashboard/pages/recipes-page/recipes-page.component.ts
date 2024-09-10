import { Component, computed, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { RecipeService, DashboardService } from '../../services';

import { CardRecipes, FavoritesResponse } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
})
export class RecipesPageComponent implements OnInit {
  public recipes?: CardRecipes[];
  public favoriteRecipes?: FavoritesResponse[];

  public limit: number = 5;
  public offset: number = 0;
  public currentPage: number = 1;

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.limit = +params['limit'] || 5;
      this.offset = +params['offset'] || 0;

      this.currentPage = Math.floor(this.offset / this.limit) + 1;

      this.getRecipes(this.limit, (this.currentPage - 1) * this.limit);
    });
  }

  getRecipes(limit: number, offset: number) {
    this.dashboardService.isLoading.set(true);
    forkJoin({
      recipes: this.recipeService.getAllRecipes(limit!, offset!),
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
        this.recipes = [];
        this.dashboardService.isLoading.set(false);
        console.error('Error:', error);
      },
    });
  }
}
