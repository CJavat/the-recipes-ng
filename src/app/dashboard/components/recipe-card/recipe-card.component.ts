import { Component, Input } from '@angular/core';
import { RecipesResponse } from '../../interfaces';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dashboard-recipe-card',
  templateUrl: './recipe-card.component.html',
  styles: ``,
})
export class RecipeCardComponent {
  public backendUrl: string = environment.backendUrl;

  @Input({ required: true })
  public recipe?: RecipesResponse;

  constructor() {
    if (!this.recipe) return;
    this.recipe!.image = `${this.backendUrl}/${this.recipe?.image}`;
  }
}
