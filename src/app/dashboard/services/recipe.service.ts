import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { RecipesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  getRecipesByCagory(id: string): Observable<RecipesResponse[]> {
    const url = `${this.baseUrl}/recipes/by-category/${id}`;

    return this.http.get<RecipesResponse[]>(url).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getRecipesByUser(id: string): Observable<RecipesResponse[]> {
    const url = `${this.baseUrl}/recipes/by-user/${id}`;

    return this.http.get<RecipesResponse[]>(url).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getMyRecipes(): Observable<RecipesResponse[]> {
    const url = `${this.baseUrl}/recipes/own-recipes`;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RecipesResponse[]>(url, { headers }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getRecipeById(id: string): Observable<RecipesResponse> {
    const url = `${this.baseUrl}/recipes/${id}`;

    return this.http.get<RecipesResponse>(url).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
