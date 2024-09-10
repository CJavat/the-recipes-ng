import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService, DashboardService } from '../../services';

import { CardRecipes, CategoriesResponse } from '../../interfaces';
@Component({
  selector: 'dashboard-category-page',
  templateUrl: './category-page.component.html',
  styles: ``,
})
export class CategoryPageComponent implements OnInit {
  private router = inject(Router);

  public categoryId: string = '';
  public currentCategory?: CategoriesResponse;
  public recipes?: CardRecipes[];

  public limit: number = 5;
  public offset: number = 0;
  public currentPage: number = 1;

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categoryId = this.router.url.split('/').at(-1) ?? '';
    if (this.categoryId.includes('?')) {
      this.categoryId = this.categoryId.split('?')[0];
    }

    this.currentCategory = this.dashboardService
      .categories()
      ?.filter((category) => category.id === this.categoryId)
      .at(0);

    this.activateRoute.queryParams.subscribe((params) => {
      this.limit = +params['limit'] || 5;
      this.offset = +params['offset'] || 0;

      this.currentPage = Math.floor(this.offset / this.limit) + 1;

      this.getRecipesByCategory(
        this.categoryId,
        this.limit,
        (this.currentPage - 1) * this.limit
      );
    });
  }

  private getRecipesByCategory(id: string, limit: number, offset: number) {
    this.recipeService.getRecipesByCagory(id, limit, offset).subscribe({
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
      error: (error) => {
        console.error('Error:', error);
        this.router.navigateByUrl('/dashboard/category/' + this.categoryId);
      },
    });
  }
}
