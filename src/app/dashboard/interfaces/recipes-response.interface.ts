export interface RecipesResponse {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
  User: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
