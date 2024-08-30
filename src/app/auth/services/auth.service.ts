import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  AuthStatus,
  CheckToken,
  ForgotPasswordResponse,
  RegisterUser,
  RegisterUserResponse,
  User,
} from '../interfaces';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  curretUser = computed(() => this._currentUser());
  authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckToken>(url, { headers }).pipe(
      map((user) => this.setAuthentication(user)),
      catchError((err) => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  private setAuthentication(user: User): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    localStorage.setItem('token', user.token);

    return true;
  }

  register(user: RegisterUser): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const { rePassword, ...body } = user;

    return this.http.post<RegisterUserResponse>(url, body).pipe(
      switchMap(() => of(true)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post(url, body).pipe(
      map((user) => this.setAuthentication(user as User)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    const url = `${this.baseUrl}/auth/forgot-password`;

    return this.http.post(url, { email }).pipe(
      map((msg) => msg as ForgotPasswordResponse),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  updateForgotPassword(token: string, password: string) {
    const url = `${this.baseUrl}/auth/forgot-password/${token}`;

    return this.http.post(url, { password }).pipe(
      map((msg) => msg as ForgotPasswordResponse),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }
}
