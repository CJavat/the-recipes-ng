import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  CardRecipes,
  CategoriesResponse,
  CreateFavoriteResponse,
  FavoritesResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  private _currentFavorites = signal<CardRecipes[] | null>(null);
  private _categories = signal<CategoriesResponse[] | null>(null);

  curretFavorites = computed(() => this._currentFavorites());
  categories = computed(() => this._categories());

  public isLoading = signal<boolean>(false);

  constructor() {
    this.getFavorites().subscribe();
    this.getAllCategories().subscribe();
  }

  //? Categories
  getAllCategories(): Observable<CategoriesResponse[]> {
    const url = `${this.baseUrl}/categories`;

    return this.http.get<CategoriesResponse[]>(url).pipe(
      map((categories) => {
        this._categories.set(categories);
        return categories;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  //? Favorites
  getFavorites(): Observable<FavoritesResponse[]> {
    const url = `${this.baseUrl}/favorites`;
    const token = localStorage.getItem('token');

    if (!token) return of([]);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<FavoritesResponse[]>(url, { headers }).pipe(
      map((favoriteRecipes) => {
        const formatRecipes = favoriteRecipes.map((fav) => {
          return {
            id: fav.recipe.id,
            image: fav.recipe.image,
            title: fav.recipe.title,
            User: {
              firstName: fav.user.firstName,
            },
            isFavorite: true,
          };
        });
        this._currentFavorites.set(formatRecipes);
        return favoriteRecipes as FavoritesResponse[];
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  setFavorites(id: string): Observable<CreateFavoriteResponse> {
    const url = `${this.baseUrl}/favorites/${id}`;
    const token = localStorage.getItem('token');

    if (!token) return of({ ok: false, message: 'Token no existe' });

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CreateFavoriteResponse>(url, { headers }).pipe(
      map((response) => {
        this.getFavorites().subscribe();
        return response as CreateFavoriteResponse;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  removeFavorites(id: string): Observable<CreateFavoriteResponse> {
    const url = `${this.baseUrl}/favorites/${id}`;
    const token = localStorage.getItem('token');

    if (!token) return of({ ok: false, message: 'Token no existe' });

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<CreateFavoriteResponse>(url, { headers }).pipe(
      map((response) => {
        this.getFavorites().subscribe();
        return response as CreateFavoriteResponse;
      }),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
