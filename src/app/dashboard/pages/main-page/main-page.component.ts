import { Component, computed, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { RecipeService, DashboardService } from '../../services';

import {
  CardRecipes,
  CategoriesResponse,
  FavoritesResponse,
} from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  private router = inject(Router);
  public recipes?: CardRecipes[];
  public categories?: CategoriesResponse[];
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
    this.getCategories();

    this.activateRoute.queryParams.subscribe((params) => {
      this.limit = +params['limit'] || 6;
      this.offset = +params['offset'] || 0;

      this.currentPage = Math.floor(this.offset / this.limit) + 1;

      this.getRecipes(this.limit, (this.currentPage - 1) * this.limit);
    });
  }

  getRecipes(limit?: number, offset?: number) {
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
        console.log(error);
        this.recipes = [];
        this.router.navigateByUrl('/dashboard');
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
}
