import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// للـ Routes المحتاجة Login
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  router.navigate(['/auth/login']);
  return false;
};

// للـ Routes المحتاجة Role معين
export const roleGuard = (allowedRoles: string[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (allowedRoles.includes(auth.getRole())) return true;

  router.navigate(['/']);
  return false;
};

// للـ Routes دي Guests بس (Login, Register)
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return true;

  const role = auth.getRole();
  if (role === 'Admin') router.navigate(['/admin']);
  else if (role === 'Guide') router.navigate(['/guide']);
  else router.navigate(['/']);

  return false;
};