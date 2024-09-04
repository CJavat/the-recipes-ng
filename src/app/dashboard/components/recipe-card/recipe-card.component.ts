import { Component, Input, OnInit } from '@angular/core';
import { CardRecipes } from '../../interfaces';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'dashboard-recipe-card',
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  public backendUrl: string = environment.backendUrl;

  @Input({ required: true })
  public recipe?: CardRecipes;

  constructor(private dashboardService: DashboardService) {
    if (!this.recipe) return;
    this.recipe!.image = `${this.backendUrl}/${this.recipe?.image}`;
  }

  toggleSubmit() {
    if (!this.recipe) return;
    this.recipe.isFavorite = !this.recipe.isFavorite;

    this.recipe.isFavorite
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
