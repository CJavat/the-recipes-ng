import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeService, DashboardService } from '../../services';

import { CardRecipes, CategoriesResponse } from '../../interfaces';
@Component({
  selector: 'dashboard-category-page',
  templateUrl: './category-page.component.html',
  styles: ``,
})
export class CategoryPageComponent {
  private router = inject(Router);
  private categoryId: string = '';

  public currentCategory?: CategoriesResponse;
  public recipes?: CardRecipes[];

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService
  ) {
    this.categoryId = this.router.url.split('/').at(-1) ?? '';
    this.getRecipesByCategory(this.categoryId);

    this.currentCategory = this.dashboardService
      .categories()
      ?.filter((category) => category.id === this.categoryId)
      .at(0);
  }

  private getRecipesByCategory(id: string) {
    this.recipeService.getRecipesByCagory(id).subscribe({
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

        return recipes;
      },
      error: (error) => console.error('Error:', error),
    });
  }
}

//TODO: Agregar paginación
