import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
})
export class AdminLayoutComponent {
  sidebarCollapsed = signal(false);

  navItems = [
    { label: 'Dashboard',  icon: 'fas fa-chart-pie',     route: '/admin/dashboard' },
    { label: 'Users',      icon: 'fas fa-users',          route: '/admin/users' },
    { label: 'Guides',     icon: 'fas fa-compass',        route: '/admin/guides' },
    { label: 'Cities',     icon: 'fas fa-city',           route: '/admin/cities' },
    { label: 'Landmarks',  icon: 'fas fa-landmark',       route: '/admin/landmarks' },
    { label: 'Bookings',   icon: 'fas fa-calendar-check', route: '/admin/bookings' },
    { label: 'Reviews',    icon: 'fas fa-star',           route: '/admin/reviews' },
  ];

  constructor(private auth: AuthService) {}

  get fullName(): string {
    return this.auth.getUserFromStorage()?.fullName ?? 'Admin';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.auth.logout().subscribe();
  }
}