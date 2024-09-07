import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';
import { CategoryPageComponent } from './pages/category-component/category-component.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { UpdateImagePageComponent } from './pages/auth/update-image-page/update-image-page.component';
import { MyFavoritesPageComponent } from './pages/my-favorites-page/my-favorites-page.component';
import { SettingsPageComponent } from './pages/auth/settings-page/settings-page.component';
import { EditAccountComponent } from './pages/auth/edit-account/edit-account.component';
import { MyAccountPageComponent } from './pages/auth/my-account-page/my-account-page.component';
import { UpdatePasswordPageComponent } from './pages/auth/update-password-page/update-password-page.component';
import { DeleteAccountComponent } from './pages/auth/delete-account/delete-account.component';
import { RecipesByUserComponent } from './pages/recipes-by-user/recipes-by-user.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MainPageComponent },
      { path: 'recipes', component: RecipesPageComponent },
      { path: 'recipe/:id', component: RecipePageComponent },
      { path: 'recipes-by-user/:id', component: RecipesByUserComponent },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'category/:id', component: CategoryPageComponent },
      { path: 'favorites', component: MyFavoritesPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'new-recipe', component: CreateRecipeComponent },
      { path: 'edit-recipe/:id', component: CreateRecipeComponent },
      { path: 'auth/my-account', component: MyAccountPageComponent },
      { path: 'auth/my-recipes', component: MyRecipesComponent },
      { path: 'auth/edit-account/:id', component: EditAccountComponent },
      { path: 'auth/update-image', component: UpdateImagePageComponent },
      {
        path: 'auth/settings',
        component: SettingsPageComponent,
        children: [
          { path: 'update-password', component: UpdatePasswordPageComponent },
          { path: 'delete-account', component: DeleteAccountComponent },
          { path: '**', redirectTo: 'auth/settings' },
        ],
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
