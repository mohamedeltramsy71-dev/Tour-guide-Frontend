import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
  },
  {
    path: 'cities',
    loadComponent: () =>
      import('./features/cities/cities').then(m => m.Cities),
  },
  {
    path: 'landmarks',
    loadComponent: () =>
      import('./features/landmarks/landmarks').then(m => m.Landmarks),
  },
  {
    path: 'packages',
    loadComponent: () =>
      import('./features/packages/packages').then(m => m.Packages),
  },
  {
    path: '**',
    redirectTo: '',
  },
];