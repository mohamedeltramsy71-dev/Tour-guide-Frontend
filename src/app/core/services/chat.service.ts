import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { ApiService } from './api';
import { AuthService } from './auth';
import { MessageDto, ConversationDto } from '../models/chat';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  private hub!: signalR.HubConnection;

  private conversationsSubject = new BehaviorSubject<ConversationDto[]>([]);
  conversations$ = this.conversationsSubject.asObservable();

  private messagesSubject = new BehaviorSubject<MessageDto[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private onlineUsersSubject = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSubject.asObservable();

  private chatUnreadCountSubject = new BehaviorSubject<number>(0);
  chatUnreadCount$ = this.chatUnreadCountSubject.asObservable();

  private activeBookingId: number | null = null;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private zone: NgZone
  ) { }

  // ── SignalR ───────────────────────────────────────────────

  startConnection(): void {
    if (
      this.hub &&
      this.hub.state !== signalR.HubConnectionState.Disconnected
    ) return;

    const token = this.auth.getToken();
    if (!token) return;

    this.hub = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.hubUrl}/hubs/chat`, {
        accessTokenFactory: () => this.auth.getToken() ?? ''
      })
      .withAutomaticReconnect()
      .build();

    this.registerHandlers();

    this.hub.start()
      .then(() => {
        if (this.activeBookingId) {
          this.invokeJoinGroup(this.activeBookingId);
        }
      })
      .catch((err: unknown) => console.error('Chat SignalR error:', err));
  }

  private registerHandlers(): void {
    this.hub.on('ReceiveMessage', (message: MessageDto) => {
      this.zone.run(() => {
        console.log('🔴 ReceiveMessage fired:', {
          messageBookingId: message.bookingId,
          activeBookingId: this.activeBookingId,
          match: message.bookingId === this.activeBookingId
        });

        if (message.bookingId === this.activeBookingId) {
          const current = this.messagesSubject.value;
          const alreadyExists = current.some(m => m.id === message.id && message.id > 0);
          if (!alreadyExists) {
            this.messagesSubject.next([...current, message]);
          }
        }
        this.updateConversationLastMessage(message);
      });
    });

    this.hub.on('MessageRead', (messageId: number) => {
      this.zone.run(() => {
        const updated = this.messagesSubject.value.map(m =>
          m.id === messageId ? { ...m, isRead: true } : m
        );
        this.messagesSubject.next(updated);
      });
    });

    this.hub.on('UserOnline', (userId: string) => {
      this.zone.run(() => {
        const current = this.onlineUsersSubject.value;
        if (!current.includes(userId)) {
          this.onlineUsersSubject.next([...current, userId]);
        }
      });
    });

    this.hub.on('UserOffline', (userId: string) => {
      this.zone.run(() => {
        this.onlineUsersSubject.next(
          this.onlineUsersSubject.value.filter(id => id !== userId)
        );
      });
    });

    this.hub.on('OnlineUsersList', (userIds: string[]) => {
      this.zone.run(() => {
        this.onlineUsersSubject.next(userIds);
      });
    });

    this.hub.onreconnected(() => {
      if (this.activeBookingId) {
        this.invokeJoinGroup(this.activeBookingId);
      }
    });
  }

  stopConnection(): void {
    this.hub?.stop();
  }

  sendMessage(receiverId: string, content: string, bookingId: number): void {
    if (this.hub?.state === signalR.HubConnectionState.Connected) {
      this.hub.invoke('SendMessage', receiverId, content, bookingId)
        .catch((err: unknown) => console.error('Send error:', err));
    } else {
      console.warn('SignalR not connected — state:', this.hub?.state);
    }
  }

  markAsRead(messageId: number): void {
    if (this.hub?.state === signalR.HubConnectionState.Connected) {
      this.hub.invoke('MarkAsRead', messageId)
        .catch((err: unknown) => console.error('MarkAsRead error:', err));
    }
  }

  // ── helper مركزي للـ JoinBookingGroup ───────────────────
  private invokeJoinGroup(bookingId: number): void {
    this.hub.invoke('JoinBookingGroup', bookingId)
      .then(() => console.log('✅ Joined booking group:', bookingId))
      .catch((err: unknown) => console.error('JoinBookingGroup error:', err));
  }

  private joinBookingGroup(bookingId: number): void {
    if (!this.hub) return;

    if (this.hub.state === signalR.HubConnectionState.Connected) {
      this.invokeJoinGroup(bookingId);
    } else if (
      this.hub.state === signalR.HubConnectionState.Connecting ||
      this.hub.state === signalR.HubConnectionState.Reconnecting
    ) {
      const interval = setInterval(() => {
        if (this.hub.state === signalR.HubConnectionState.Connected) {
          clearInterval(interval);
          this.invokeJoinGroup(bookingId);
        }
      }, 100);
      setTimeout(() => clearInterval(interval), 5000);
    }
  }

  // ── API ───────────────────────────────────────────────────

  loadConversations(): void {
    this.api.get<ConversationDto[]>('chat/conversations').subscribe(data => {
      this.conversationsSubject.next(data);
    });
  }

  loadMessages(bookingId: number, page = 1, pageSize = 50): void {
    this.activeBookingId = bookingId;
    this.joinBookingGroup(bookingId);

    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    this.api.get<MessageDto[]>(`chat/${bookingId}/messages`, { params }).subscribe(data => {
      this.messagesSubject.next(data);
    });
  }

  loadChatUnreadCount(): void {
    this.api.get<{ unreadCount: number }>('chat/unread-count').subscribe(res => {
      this.chatUnreadCountSubject.next(res.unreadCount);
    });
  }

  setActiveConversation(bookingId: number | null): void {
    this.activeBookingId = bookingId;
    if (bookingId) {
      this.joinBookingGroup(bookingId);
    } else {
      this.messagesSubject.next([]);
    }
  }

  decrementUnreadCount(amount: number): void {
    const current = this.chatUnreadCountSubject.value;
    this.chatUnreadCountSubject.next(Math.max(0, current - amount));
  }

  markConversationAsRead(bookingId: number): void {
    this.api.put(`chat/${bookingId}/read`, {}).subscribe();
  }

  // ── Helpers ───────────────────────────────────────────────

  private updateConversationLastMessage(message: MessageDto): void {
    const currentUserId = this.auth.getUserFromStorage()?.userId ?? '';
    const isIncoming = message.senderId !== currentUserId;

    const isActiveConversation = message.bookingId === this.activeBookingId;

    if (isIncoming && !isActiveConversation) {
      this.chatUnreadCountSubject.next(this.chatUnreadCountSubject.value + 1);
    }

    const conversations = this.conversationsSubject.value.map(c => {
      if (c.bookingId === message.bookingId) {
        return {
          ...c,
          lastMessage: message.content,
          lastMessageAt: message.createdAt,
          unreadCount: isIncoming && !isActiveConversation
            ? c.unreadCount + 1
            : c.unreadCount
        };
      }
      return c;
    });

    this.conversationsSubject.next(
      conversations.sort((a, b) =>
        new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
      )
    );
  }

  isUserOnline(userId: string): boolean {
    return this.onlineUsersSubject.value.includes(userId);
  }

  ngOnDestroy(): void {
    this.stopConnection();
  }
}