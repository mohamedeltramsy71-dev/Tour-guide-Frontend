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
    path: 'packages/:id',
    loadComponent: () =>
      import('./features/packages/package-detail/package-detail').then(m => m.PackageDetailComponent),
  },
  {
    path: 'guides',
    loadComponent: () => import('./features/guides/guides').then(m => m.Guides),
  },
  {
    path: 'guides/:id',
    loadComponent: () =>
      import('./features/guides/guide-detail/guide-detail').then(m => m.GuideDetailComponent),
  },
  {
    path: 'cities/:id',
    loadComponent: () =>
      import('./features/cities/city-detail/city-detail').then(m => m.CityDetailComponent),
  },
  {
    path: 'landmarks/:id',
    loadComponent: () =>
      import('./features/landmarks/landmark-detail/landmark-detail').then(m => m.LandmarkDetailComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About),
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

  // ─── Shared Protected (All Roles) ─────────────────────────
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile').then(m => m.ProfileComponent),
  },

  // ─── Tourist ──────────────────────────────────────────────
  {
    path: 'bookings',
    canActivate: [authGuard, roleGuard(['Tourist'])],
    loadComponent: () =>
      import('./features/bookings/my-bookings/my-bookings').then(m => m.MyBookingsComponent),
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/notifications/notifications').then(m => m.NotificationsComponent),
  },
  {
    path: 'chat',
    canActivate: [authGuard, roleGuard(['Tourist'])],
    loadComponent: () =>
      import('./features/chat/chat').then(m => m.ChatComponent),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./features/payment/payment').then(m => m.PaymentComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Tourist'] }
  },
  {
    path: 'payment/callback',
    loadComponent: () =>
      import('./features/payment/payment-callback').then(m => m.PaymentCallbackComponent)
  },
  {
    path: 'custom-trip',
    loadComponent: () =>
      import('./features/custom-trip/custom-trip').then(m => m.CustomTripComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['Tourist'] }
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
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/admin/categories/categories').then(m => m.AdminCategoriesComponent),
      },
    ],
  },

  // ─── Guide Dashboard ──────────────────────────────────────
  {
    path: 'guide',
    canActivate: [authGuard, roleGuard(['Guide'])],
    loadComponent: () =>
      import('./features/guide-dashboard/guide-layout/guide-layout').then(m => m.GuideLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/guide-dashboard/guide-dashboard/guide-dashboard').then(m => m.GuideDashboard),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/guide-dashboard/guide-profile/guide-profile').then(m => m.GuideProfile),
      },
      {
        path: 'packages',
        loadComponent: () =>
          import('./features/guide-dashboard/guide-packages/guide-packages').then(m => m.GuidePackages),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./features/guide-dashboard/incoming-bookings/incoming-bookings').then(m => m.IncomingBookingsComponent),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./features/guide-dashboard/guide-reviews/guide-reviews').then(m => m.GuideReviews),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/chat/chat').then(m => m.ChatComponent),
      },
    ],
  },

  // ─── Fallback ─────────────────────────────────────────────
  { path: '**', redirectTo: '' },
];