import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-guide-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './guide-layout.html',
  styleUrls: ['./guide-layout.scss']
})
export class GuideLayoutComponent implements OnInit, OnDestroy {
  collapsed = false;
  currentUser: any = null;
  private sub!: Subscription;

  navItems = [
    { label: 'Dashboard',        icon: 'fa-gauge-high',     route: '/guide/dashboard' },
    { label: 'My Profile',       icon: 'fa-user-pen',       route: '/guide/profile' },
    { label: 'My Packages',      icon: 'fa-box-open',       route: '/guide/packages' },
    { label: 'Incoming Bookings',icon: 'fa-calendar-check', route: '/guide/bookings' },
    { label: 'My Reviews',       icon: 'fa-star',           route: '/guide/reviews' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  get avatarUrl(): string | null {
    return this.currentUser?.avatarUrl ?? null;
  }

  get initials(): string {
    const name: string = this.currentUser?.fullName ?? 'G';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
}