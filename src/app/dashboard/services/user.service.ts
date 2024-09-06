import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { FindUserResponse, UpdateUser } from '../interfaces';
import { User } from '../../auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  constructor() {}

  getUserProfile(id: string): Observable<FindUserResponse> {
    const url = `${this.baseUrl}/users/${id}`;

    return this.http.get<FindUserResponse>(url).pipe(
      map((user) => user),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  updateUserProfile(id: string, body: UpdateUser): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;
    const token = localStorage.getItem('token');

    if (!id || !token) throw new Error('ID o Token invalidos');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<User>(url, body, { headers }).pipe(
      map((user) => user),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  updatePhoto(formData: FormData): Observable<User> {
    const url = `${this.baseUrl}/users/change-image`;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No se pudo actualizar la imagen');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<User>(url, formData, { headers }).pipe(
      map((response) => ({
        ...response,
        token: token,
      })),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  cancelAccount(token: string) {
    const url = `${this.baseUrl}/users/cancel-account`;
    if (!token) throw new Error('Ocurrió un error');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<User>(url, { headers }).pipe(
      map((msg) => msg),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  deleteAccount(token: string): Observable<string> {
    const url = `${this.baseUrl}/users/permanently-delete`;
    if (!token) throw new Error('Ocurrió un error');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<string>(url, { headers }).pipe(
      map((msg) => msg),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
