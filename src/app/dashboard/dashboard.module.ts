import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';
import { SettingsPageComponent } from './pages/auth/settings-page/settings-page.component';
import { CategoryPageComponent } from './pages/category-component/category-component.component';
import { MyAccountPageComponent } from './pages/auth/my-account-page/my-account-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { UpdateImagePageComponent } from './pages/auth/update-image-page/update-image-page.component';
import { MyFavoritesPageComponent } from './pages/my-favorites-page/my-favorites-page.component';

import { SearchComponentComponent } from './components/search-component/search-component.component';
import { AddRecipeComponent } from './components/add-recipe-buton/add-recipe-buton.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { SharedModule } from '../shared/shared.module';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

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
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
