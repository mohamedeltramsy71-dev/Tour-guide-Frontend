import { Injectable, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { ApiService } from './api';
import { AuthService } from './auth';
import { NotificationDto } from '../models/notification';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private hub!: signalR.HubConnection;

  private notificationsSubject = new BehaviorSubject<NotificationDto[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private api: ApiService, private auth: AuthService) {}

  // ── SignalR ───────────────────────────────────────────────

  startConnection(): void {
    if (this.hub) return;

    const token = this.auth.getToken();
    if (!token) return;

    this.hub = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.hubUrl}/hubs/notifications`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hub.on('NotificationReceived', (notification: NotificationDto) => {
      const current = this.notificationsSubject.value;
      this.notificationsSubject.next([notification, ...current]);
      this.unreadCountSubject.next(this.unreadCountSubject.value + 1);
    });

    this.hub.start().catch((err: unknown) => console.error('SignalR error:', err));
  }

  stopConnection(): void {
    this.hub?.stop();
  }

  // ── API ───────────────────────────────────────────────────

  loadNotifications(page = 1, pageSize = 20): void {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    this.api.get<NotificationDto[]>('notifications', { params }).subscribe(data => {
      this.notificationsSubject.next(data);
    });
  }

  loadUnreadCount(): void {
    this.api.get<{ unreadCount: number }>('notifications/count').subscribe(res => {
      this.unreadCountSubject.next(res.unreadCount);
    });
  }

  markAsRead(id: number): void {
    this.api.put(`notifications/${id}/read`, {}).subscribe(() => {
      const updated = this.notificationsSubject.value.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      );
      this.notificationsSubject.next(updated);
      const unread = updated.filter(n => !n.isRead).length;
      this.unreadCountSubject.next(unread);
    });
  }

  markAllAsRead(): void {
    this.api.put('notifications/read-all', {}).subscribe(() => {
      const updated = this.notificationsSubject.value.map(n => ({ ...n, isRead: true }));
      this.notificationsSubject.next(updated);
      this.unreadCountSubject.next(0);
    });
  }

  ngOnDestroy(): void {
    this.stopConnection();
  }
}