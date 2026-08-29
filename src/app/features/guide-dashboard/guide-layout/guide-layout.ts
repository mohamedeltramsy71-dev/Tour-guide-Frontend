import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { NotificationService } from '../../../core/services/notification.service';
import { ChatService } from '../../../core/services/chat.service';

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
  unreadCount = 0;
  chatUnreadCount = 0;
  private sub!: Subscription;
  private notifSub!: Subscription;
  private chatSub!: Subscription;

  navItems = [
    { label: 'Dashboard',         icon: 'fa-gauge-high',     route: '/guide/dashboard' },
    { label: 'My Profile',        icon: 'fa-user-pen',       route: '/guide/profile' },
    { label: 'My Packages',       icon: 'fa-box-open',       route: '/guide/packages' },
    { label: 'Incoming Bookings', icon: 'fa-calendar-check', route: '/guide/bookings' },
    { label: 'My Reviews',        icon: 'fa-star',           route: '/guide/reviews' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.notifService.startConnection();
    this.notifService.loadUnreadCount();
    this.notifSub = this.notifService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    this.chatService.startConnection();
    this.chatService.loadChatUnreadCount();
    this.chatSub = this.chatService.chatUnreadCount$.subscribe(count => {
      this.chatUnreadCount = count;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.notifSub?.unsubscribe();
    this.chatSub?.unsubscribe();
    this.notifService.stopConnection();
    this.chatService.stopConnection();
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidebar(): void {
    if (window.innerWidth <= 991) {
      this.collapsed = false;
    }
  }

  logout(): void {
    this.authService.logout().subscribe();
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