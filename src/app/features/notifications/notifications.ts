import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationDto } from '../../core/models/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationDto[] = [];
  unreadCount = 0;
  loading = true;

  constructor(
    private notifService: NotificationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.notifService.loadNotifications();
    this.notifService.notifications$.subscribe(data => {
      this.notifications = data;
      this.loading = false;
    });
    this.notifService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onNotificationClick(n: NotificationDto): void {
    if (!n.isRead) this.notifService.markAsRead(n.id);
  }

  markAllAsRead(): void {
    this.notifService.markAllAsRead();
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      NewBooking:       'fa-calendar-plus',
      BookingAccepted:  'fa-circle-check',
      BookingRejected:  'fa-circle-xmark',
      PaymentConfirmed: 'fa-credit-card',
      NewMessage:       'fa-message',
      GuideApproved:    'fa-star',
      TripReminder:     'fa-map-location-dot',
    };
    return icons[type] ?? 'fa-bell';
  }

  getIconBg(type: string): string {
    const colors: Record<string, string> = {
      NewBooking:       '#3b82f6',
      BookingAccepted:  '#22c55e',
      BookingRejected:  '#ef4444',
      PaymentConfirmed: '#8b5cf6',
      NewMessage:       '#f59e0b',
      GuideApproved:    '#D4A853',
      TripReminder:     '#C85C3A',
    };
    return colors[type] ?? '#6b7280';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}