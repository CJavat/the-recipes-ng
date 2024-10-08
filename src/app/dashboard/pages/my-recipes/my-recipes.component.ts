import { Component, computed, inject, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CardRecipes } from '../../interfaces';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styles: ``,
})
export class MyRecipesComponent implements OnInit {
  private router = inject(Router);
  public recipes?: CardRecipes[];

  public limit: number = 5;
  public offset: number = 0;
  public currentPage: number = 1;
  public finalPage: number = 2;

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(
    private recipeService: RecipeService,
    private dashboardService: DashboardService,
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

  private getRecipes(limit?: number, offset?: number) {
    this.dashboardService.isLoading.set(true);
    this.recipeService.getMyRecipes(limit!, offset!).subscribe({
      next: ({ recipes, totalPages }) => {
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

        this.finalPage = totalPages;
        this.dashboardService.isLoading.set(false);
      },
      error: (error) => {
        this.recipes = [];
        console.error('Error getting my recipes:', error);
        this.dashboardService.isLoading.set(false);
        this.router.navigateByUrl('/dashboard/auth/my-recipes');
      },
    });
  }
}
