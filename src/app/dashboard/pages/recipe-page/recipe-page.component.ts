import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { FavoritesResponse } from '../../interfaces';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styles: ``,
})
export class RecipePageComponent implements OnInit {
  private router = inject(Router);
  public isFavorite: boolean = false;

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    const recipeId = this.router.url.split('/').at(-1) ?? '';
    // this.isFavorite = this.dashboardService
    //   .curretFavorites()
    //   .some((fav: FavoritesResponse) => fav.recipeId === recipeId);

    //TODO: Aquí me quedé
    console.log(this.isFavorite);
  }
}
