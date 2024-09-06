import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { RecipeService, DashboardService } from '../../services';

import { environment } from '../../../../environments/environment';

import { User } from '../../../auth/interfaces';
import { RecipesResponse } from '../../interfaces';
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styles: ``,
})
export class RecipePageComponent implements OnInit {
  private router = inject(Router);
  private recipeId: string = '';
  private hostUrl = environment.backendUrl;

  public currentUser?: User | null;
  public isFavorite: boolean = false;
  public recipe?: RecipesResponse;
  public imageUrl: string = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.authService.curretUser();
    this.recipeId = this.router.url.split('/').at(-1) ?? '';

    this.isFavorite = this.dashboardService.curretFavorites()
      ? this.dashboardService
          .curretFavorites()!
          .some((fav) => fav.id === this.recipeId)
      : false;

    this.getRecipe();
  }

  getRecipe() {
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.imageUrl = `${this.hostUrl}/${this.recipe.image}`;
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
