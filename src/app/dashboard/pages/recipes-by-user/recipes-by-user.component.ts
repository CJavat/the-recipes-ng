import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService, DashboardService } from '../../services';

import { CardRecipes, CategoriesResponse } from '../../interfaces';
@Component({
  selector: 'app-recipes-by-user',
  templateUrl: './recipes-by-user.component.html',
  styles: ``,
})
export class RecipesByUserComponent implements OnInit {
  private router = inject(Router);

  public userId: string = '';
  public recipes?: CardRecipes[];
  public userName?: string;

  public limit: number = 5;
  public offset: number = 0;
  public currentPage: number = 1;

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.router.url.split('/').at(-1) ?? '';
    if (this.userId.includes('?')) {
      this.userId = this.userId.split('?')[0];
    }

    this.activateRoute.queryParams.subscribe((params) => {
      this.limit = +params['limit'] || 5;
      this.offset = +params['offset'] || 0;

      this.currentPage = Math.floor(this.offset / this.limit) + 1;

      this.getRecipesByUser(this.userId, this.limit, this.offset);
    });
  }

  private getRecipesByUser(id: string, limit: number, offset: number) {
    this.recipeService.getRecipesByUser(id, limit, offset).subscribe({
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
      error: (error) => {
        console.error('Error:', error);
        this.recipes = [];
        this.router.navigateByUrl('/dashboard/recipes-by-user/' + this.userId);
      },
    });
  }
}
