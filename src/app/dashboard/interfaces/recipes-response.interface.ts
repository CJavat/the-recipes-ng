export interface RecipesResponse {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
  createdAt: Date;
  User: User;
  Category: Category;
}

interface Category {
  id: string;
  name: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
