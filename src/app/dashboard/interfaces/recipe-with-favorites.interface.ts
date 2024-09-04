import { RecipesResponse } from './recipes-response.interface';

export interface RecipeWithFavorites extends RecipesResponse {
  isFavorite?: boolean;
}
