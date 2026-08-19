import { Routes } from '@angular/router';
import { authGuard, guestGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ─── Public ───────────────────────────────────────────────
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
  },
  {
    path: 'cities',
    loadComponent: () => import('./features/cities/cities').then(m => m.Cities),
  },
  {
    path: 'landmarks',
    loadComponent: () => import('./features/landmarks/landmarks').then(m => m.Landmarks),
  },
  {
    path: 'packages',
    loadComponent: () => import('./features/packages/packages').then(m => m.Packages),
  },
  {
    path: 'guides',
    loadComponent: () => import('./features/guides/guides').then(m => m.Guides),
  },

  // ─── Auth (Guests Only) ───────────────────────────────────
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
  },
  {
    path: 'auth/register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register-select/register-select').then(m => m.RegisterSelect),
  },
  {
    path: 'auth/register/tourist',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register-tourist/register-tourist').then(m => m.RegisterTourist),
  },
  {
    path: 'auth/register/guide',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register-guide/register-guide').then(m => m.RegisterGuide),
  },
  {
    path: 'auth/forgot-password',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
  },
  {
    path: 'auth/reset-password',
    loadComponent: () => import('./features/auth/reset-password/reset-password').then(m => m.ResetPassword),
  },
  {
    path: 'auth/confirm-email',
    loadComponent: () => import('./features/auth/confirm-email/confirm-email').then(m => m.ConfirmEmail),
  },

  // ─── Admin ────────────────────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard(['Admin'])],
    loadComponent: () =>
      import('./features/admin/admin-layout/admin-layout').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/users').then(m => m.AdminUsersComponent),
      },
      {
        path: 'guides',
        loadComponent: () =>
          import('./features/admin/guides/guides').then(m => m.AdminGuidesComponent),
      },
      {
        path: 'cities',
        loadComponent: () =>
          import('./features/admin/cities/cities').then(m => m.AdminCitiesComponent),
      },
      {
        path: 'landmarks',
        loadComponent: () =>
          import('./features/admin/landmarks/landmarks').then(m => m.AdminLandmarksComponent),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./features/admin/bookings/bookings').then(m => m.AdminBookingsComponent),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./features/admin/reviews/reviews').then(m => m.AdminReviewsComponent),
      },
    ],
  },

  // ─── Fallback ─────────────────────────────────────────────
  { path: '**', redirectTo: '' },
];