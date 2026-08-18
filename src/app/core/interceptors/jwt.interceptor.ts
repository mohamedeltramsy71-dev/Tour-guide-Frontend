import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

// فقط الـ auth endpoints اللي مش محتاجة token
const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/register',
  '/auth/forget-password',
  '/auth/reset-password',
  '/auth/confirm-email',
  '/auth/google',
  '/auth/refresh-token',
];

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // نشوف لو الـ request لـ endpoint عام بالظبط (مش partial match)
  const isPublic = PUBLIC_ENDPOINTS.some(endpoint => req.url.includes(endpoint));
  const token = authService.getToken();

  if (isPublic || !token) {
    return next(req);
  }

  return next(addToken(req, token)).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req, next, authService, router);
      }
      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = authService.getRefreshToken();

    if (!refreshToken) {
      isRefreshing = false;
      authService.clearUser();
      router.navigate(['/auth/login']);
      return throwError(() => new Error('No refresh token'));
    }

    return authService.refreshToken({ refreshToken }).pipe(
      switchMap((res) => {
        isRefreshing = false;
        const newToken = res.accessToken;
        refreshTokenSubject.next(newToken);
        return next(addToken(req, newToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.clearUser();
        router.navigate(['/auth/login']);
        return throwError(() => err);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token => next(addToken(req, token!)))
  );
}