import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CardRecipes } from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styles: ``,
})
export class MyRecipesComponent implements OnInit {
  public recipes?: CardRecipes[];

  constructor(
    private recipeService: RecipeService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  private getRecipes() {
    this.recipeService.getMyRecipes().subscribe({
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
      },
      error: (error) => {
        this.recipes = [];
        console.error('Error getting my recipes:', error);
      },
    });
  }
}
//TODO: Agregar paginación
