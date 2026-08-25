import { Injectable, OnDestroy } from '@angular/core';
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

  constructor(private api: ApiService, private auth: AuthService) {}

  // ── SignalR ───────────────────────────────────────────────

  startConnection(): void {
    if (this.hub) return;

    const token = this.auth.getToken();
    if (!token) return;

    this.hub = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.hubUrl}/hubs/chat`, {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hub.on('ReceiveMessage', (message: MessageDto) => {
      if (message.bookingId === this.activeBookingId) {
        const current = this.messagesSubject.value;
        this.messagesSubject.next([...current, message]);
      }
      this.updateConversationLastMessage(message);
    });

    this.hub.on('UserOnline', (userId: string) => {
      const current = this.onlineUsersSubject.value;
      if (!current.includes(userId)) {
        this.onlineUsersSubject.next([...current, userId]);
      }
    });

    this.hub.on('UserOffline', (userId: string) => {
      this.onlineUsersSubject.next(
        this.onlineUsersSubject.value.filter(id => id !== userId)
      );
    });

    this.hub.start().catch((err: unknown) => console.error('Chat SignalR error:', err));
  }

  stopConnection(): void {
    this.hub?.stop();
  }

  sendMessage(receiverId: string, content: string, bookingId: number): void {
    if (this.hub?.state === signalR.HubConnectionState.Connected) {
      this.hub.invoke('SendMessage', receiverId, content, bookingId)
        .catch((err: unknown) => console.error('Send error:', err));
    }
  }

  markAsRead(messageId: number): void {
    if (this.hub?.state === signalR.HubConnectionState.Connected) {
      this.hub.invoke('MarkAsRead', messageId)
        .catch((err: unknown) => console.error('MarkAsRead error:', err));
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
    if (!bookingId) this.messagesSubject.next([]);
  }

  // ── Helpers ───────────────────────────────────────────────

  private updateConversationLastMessage(message: MessageDto): void {
    const currentUserId = this.auth.getUserFromStorage()?.userId ?? '';
    const isIncoming = message.senderId !== currentUserId;

    if (isIncoming) {
      this.chatUnreadCountSubject.next(this.chatUnreadCountSubject.value + 1);
    }

    const conversations = this.conversationsSubject.value.map(c => {
      if (c.bookingId === message.bookingId) {
        return {
          ...c,
          lastMessage: message.content,
          lastMessageAt: message.createdAt,
          unreadCount: isIncoming ? c.unreadCount + 1 : c.unreadCount
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