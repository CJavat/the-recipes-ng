import { Component, computed, effect, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CardRecipes } from '../../interfaces';

@Component({
  selector: 'app-my-favorites-page',
  templateUrl: './my-favorites-page.component.html',
  styles: ``,
})
export class MyFavoritesPageComponent implements OnInit {
  public favorites?: CardRecipes[] | null;

  public finishedLoad = computed<boolean>(() => {
    if (this.dashboardService.isLoading()) return true;
    return false;
  });

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.isLoading.set(true);
    this.favorites = this.dashboardService.curretFavorites();
    this.dashboardService.isLoading.set(false);
  }
}
