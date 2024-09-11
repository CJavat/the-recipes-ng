import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Recipe, RecipesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  constructor() {}

  getAllRecipes(limit: number, offset: number): Observable<RecipesResponse> {
    const url = `${this.baseUrl}/recipes`;

    let params = new HttpParams().set('limit', limit);
    if (offset !== 0) {
      params = params.set('offset', offset);
    }

    return this.http.get<RecipesResponse>(url, { params }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getRecipesByCagory(
    id: string,
    limit: number,
    offset: number
  ): Observable<RecipesResponse> {
    const url = `${this.baseUrl}/recipes/by-category/${id}`;

    let params = new HttpParams().set('limit', limit);
    if (offset !== 0) {
      params = params.set('offset', offset);
    }

    return this.http.get<RecipesResponse>(url, { params }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getRecipesByUser(
    id: string,
    limit: number,
    offset: number
  ): Observable<RecipesResponse> {
    const url = `${this.baseUrl}/recipes/by-user/${id}`;

    let params = new HttpParams().set('limit', limit);
    if (offset !== 0) {
      params = params.set('offset', offset);
    }

    return this.http.get<RecipesResponse>(url, { params }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getMyRecipes(limit: number, offset: number): Observable<RecipesResponse> {
    const url = `${this.baseUrl}/recipes/own-recipes`;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams().set('limit', limit);
    if (offset !== 0) {
      params = params.set('offset', offset);
    }

    return this.http.get<RecipesResponse>(url, { headers, params }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    const url = `${this.baseUrl}/recipes/${id}`;

    return this.http.get<Recipe>(url).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  searchRecipes(title: string): Observable<Recipe[]> {
    const url = `${this.baseUrl}/recipes/search`;
    const params = new HttpParams().set('title', title);

    return this.http.get<Recipe[]>(url, { params }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  createRecipe(formData: FormData): Observable<Recipe> {
    const url = `${this.baseUrl}/recipes`;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Recipe>(url, formData, { headers }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  updateRecipe(recipeId: string, formData: FormData): Observable<Recipe> {
    const url = `${this.baseUrl}/recipes/${recipeId}`;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<Recipe>(url, formData, { headers }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  deleteRecipe(recipeId: string): Observable<{ message: string }> {
    const url = `${this.baseUrl}/recipes/${recipeId}`;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<{ message: string }>(url, { headers }).pipe(
      map((recipes) => recipes),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
