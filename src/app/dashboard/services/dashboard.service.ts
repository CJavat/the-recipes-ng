import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CategoriesResponse,
  CreateFavoriteResponse,
  GetFavoritesResponse,
  RecipesResponse,
} from '../interfaces';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  //!Tiparlo después
  private _currentFavorites = signal<any>(null);

  curretFavorites = computed(() => this._currentFavorites());

  constructor() {
    this.getFavorites().subscribe();
  }

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

  getFavorites(): Observable<GetFavoritesResponse[]> {
    const url = `${this.baseUrl}/favorites`;
    const token = localStorage.getItem('token');

    if (!token) return of([]);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<GetFavoritesResponse[]>(url, { headers }).pipe(
      map((favoriteRecipes) => {
        this._currentFavorites.set(favoriteRecipes);
        return favoriteRecipes as GetFavoritesResponse[];
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
