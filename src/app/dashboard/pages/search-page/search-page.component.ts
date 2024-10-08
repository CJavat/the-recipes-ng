import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '../../services/recipe.service';

import { CardRecipes } from '../../interfaces';
import { DashboardService } from '../../services';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent implements OnInit {
  public searchQuery: string = '';
  public recipes: CardRecipes[] = [];

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.searchRecipe(this.searchQuery);
    });
  }

  private searchRecipe(title: string) {
    this.dashboardService.isLoading.set(true);
    this.recipeService.searchRecipes(title).subscribe({
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

        this.dashboardService.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.dashboardService.isLoading.set(false);
      },
    });
  }
}
