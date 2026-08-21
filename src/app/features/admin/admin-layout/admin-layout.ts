import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  sidebarCollapsed = signal(false);
  avatarUrl = signal<string>('');
  fullName = signal<string>('Admin');

  private sub!: Subscription;

  navItems = [
    { label: 'Dashboard',  icon: 'fas fa-chart-pie',     route: '/admin/dashboard' },
    { label: 'Users',      icon: 'fas fa-users',          route: '/admin/users' },
    { label: 'Guides',     icon: 'fas fa-compass',        route: '/admin/guides' },
    { label: 'Cities',     icon: 'fas fa-city',           route: '/admin/cities' },
    { label: 'Landmarks',  icon: 'fas fa-landmark',       route: '/admin/landmarks' },
    { label: 'Bookings',   icon: 'fas fa-calendar-check', route: '/admin/bookings' },
    { label: 'Categories', icon: 'fas fa-tags',           route: '/admin/categories' },
    { label: 'Reviews',    icon: 'fas fa-star',           route: '/admin/reviews' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.sub = this.auth.currentUser$.subscribe(user => {
      this.fullName.set(user?.fullName ?? 'Admin');
      this.avatarUrl.set(user?.avatarUrl ?? '');
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.router.navigate(['/auth/login']),
    });
  }
}