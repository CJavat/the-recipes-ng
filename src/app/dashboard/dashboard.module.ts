import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';
import { CategoryPageComponent } from './pages/category-component/category-component.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { MyFavoritesPageComponent } from './pages/my-favorites-page/my-favorites-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { SettingsPageComponent } from './pages/auth/settings-page/settings-page.component';
import { MyAccountPageComponent } from './pages/auth/my-account-page/my-account-page.component';
import { UpdateImagePageComponent } from './pages/auth/update-image-page/update-image-page.component';
import { UpdatePasswordPageComponent } from './pages/auth/update-password-page/update-password-page.component';
import { EditAccountComponent } from './pages/auth/edit-account/edit-account.component';

import { SearchComponentComponent } from './components/search-component/search-component.component';
import { AddRecipeComponent } from './components/add-recipe-buton/add-recipe-buton.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { DeleteAccountComponent } from './pages/auth/delete-account/delete-account.component';
import { RecipesByUserComponent } from './pages/recipes-by-user/recipes-by-user.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MainPageComponent,
    SearchPageComponent,
    RecipesPageComponent,
    CreateRecipeComponent,
    SettingsPageComponent,
    MyAccountPageComponent,
    CategoriesPageComponent,
    SearchComponentComponent,
    DashboardLayoutComponent,
    MyFavoritesPageComponent,
    UpdateImagePageComponent,
    AddRecipeComponent,
    RecipeCardComponent,
    CategoryPageComponent,
    RecipePageComponent,
    FooterComponent,
    EditAccountComponent,
    UpdatePasswordPageComponent,
    DeleteAccountComponent,
    RecipesByUserComponent,
    MyRecipesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
  ],
})
export class DashboardModule {}
