import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgetPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  ChangePasswordRequest,
  GoogleAuthRequest,
} from '../models/auth';

interface WrappedLoginResponse {
  message: string;
  data: LoginResponse;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ── Auth Calls ────────────────────────────────────────────

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<WrappedLoginResponse>(`${this.baseUrl}/auth/login`, request).pipe(
      tap(res => this.saveUser(res.data)),
      map(res => res.data)
    );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, request);
  }

  googleLogin(request: GoogleAuthRequest): Observable<LoginResponse> {
    return this.http.post<WrappedLoginResponse>(`${this.baseUrl}/auth/google`, request).pipe(
      tap(res => this.saveUser(res.data)),
      map(res => res.data)
    );
  }

  forgotPassword(request: ForgetPasswordRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forget-password`, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/reset-password`, request);
  }

  refreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
    return this.http.post<WrappedLoginResponse>(`${this.baseUrl}/auth/refresh-token`, request).pipe(
      tap(res => this.saveUser(res.data)),
      map(res => res.data)
    );
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/change-password`, request);
  }

  logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    this.clearUser();
    return this.http.post(`${this.baseUrl}/auth/logout`, { refreshToken });
  }

  // ── localStorage Helpers ──────────────────────────────────

  saveUser(data: LoginResponse): void {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }

  clearUser(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getUserFromStorage(): LoginResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string {
    return this.getUserFromStorage()?.role ?? '';
  }
}