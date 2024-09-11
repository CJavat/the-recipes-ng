import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { RecipeService, DashboardService } from '../../services';

import { environment } from '../../../../environments/environment';

import { User } from '../../../auth/interfaces';
import { Recipe, RecipesResponse } from '../../interfaces';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
})
export class RecipePageComponent implements OnInit {
  private router = inject(Router);
  private recipeId: string = '';
  private hostUrl = environment.backendUrl;

  public currentUser?: User | null;
  public recipe?: Recipe;
  public imageUrl: string = '';
  public isFavorite: boolean = false;
  public isMyRecipe: boolean = false;

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
      next: (recipes) => {
        this.recipe = recipes;
        this.imageUrl = `${this.hostUrl}/${this.recipe.image}`;
        this.isMyRecipe = this.recipe?.User?.id === this.currentUser?.id;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  deleteRecipe() {
    if (!this.recipe?.id) return;

    this.recipeService.deleteRecipe(this.recipe.id).subscribe({
      next: ({ message }) => {
        Swal.fire('Receta Eliminada', message ?? '', 'success').then(() =>
          this.router.navigateByUrl('/dashboard')
        );
      },
      error: (error) => console.error('Error:', error),
    });
  }

  toggleSubmit() {
    if (!this.recipe) return;
    this.isFavorite = !this.isFavorite;

    this.isFavorite
      ? this.addFavorite(this.recipe.id)
      : this.removeFavorite(this.recipe.id);
  }

  private addFavorite(id: string) {
    if (!id) return;

    this.dashboardService.setFavorites(id).subscribe({
      next: (response) => response,
      error: (error) => console.error('Error:', error),
    });
  }

  private removeFavorite(id: string) {
    if (!id) return;

    this.dashboardService.removeFavorites(id).subscribe({
      next: (response) => response,
      error: (error) => console.error('Error:', error),
    });
  }
}
