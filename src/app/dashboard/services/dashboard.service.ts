import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoriesResponse, RecipesResponse } from '../interfaces';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  constructor() {}

  getAllRecipes(): Observable<RecipesResponse[]> {
    const url = `${this.baseUrl}/recipes`;

    return this.http.get<RecipesResponse[]>(url).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getAllCategories(): Observable<CategoriesResponse[]> {
    const url = `${this.baseUrl}/categories`;

    return this.http.get<CategoriesResponse[]>(url).pipe(
      map((categories) => categories),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
