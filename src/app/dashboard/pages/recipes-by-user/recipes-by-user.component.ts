import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeService, DashboardService } from '../../services';

import { CardRecipes, CategoriesResponse } from '../../interfaces';
@Component({
  selector: 'app-recipes-by-user',
  templateUrl: './recipes-by-user.component.html',
  styles: ``,
})
export class RecipesByUserComponent {
  private router = inject(Router);
  private userId: string = '';

  public recipes?: CardRecipes[];
  public userName?: string;

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService
  ) {
    this.userId = this.router.url.split('/').at(-1) ?? '';
    this.getRecipesByUser(this.userId);
  }

  private getRecipesByUser(id: string) {
    this.recipeService.getRecipesByUser(id).subscribe({
      next: (recipes) => {
        this.recipes = recipes.map((recipe) => {
          return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            User: {
              firstName: recipe.User.firstName,
            },
            isFavorite:
              this.dashboardService
                .curretFavorites()
                ?.some((fav) => fav.id === recipe.id) ?? false,
          };
        });

        this.userName = `${recipes.at(0)?.User?.firstName} ${
          recipes.at(0)?.User?.lastName
        }`;

        return recipes;
      },
      error: (error) => console.error('Error:', error),
    });
  }
}

//TODO: Agregar paginación
