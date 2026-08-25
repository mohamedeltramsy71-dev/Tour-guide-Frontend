import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth';
import { BookingService } from '../../core/services/booking.service';
import { ConversationDto, MessageDto } from '../../core/models/chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  conversations: ConversationDto[] = [];
  messages: MessageDto[] = [];
  activeConversation: ConversationDto | null = null;
  messageText = '';
  currentUserId = '';
  loadingConversations = true;
  loadingMessages = false;
  private subs: Subscription[] = [];
  private pendingBookingId: number | null = null;

  constructor(
    private chatService: ChatService,
    private auth: AuthService,
    private bookingService: BookingService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.auth.getUserFromStorage()?.userId ?? '';

    const bookingIdParam = this.route.snapshot.queryParamMap.get('bookingId');
    if (bookingIdParam) {
      this.pendingBookingId = +bookingIdParam;
    }

    this.chatService.startConnection();
    this.chatService.loadConversations();

    this.subs.push(
      this.chatService.conversations$.subscribe(data => {
        this.conversations = data;
        this.loadingConversations = false;

        if (this.pendingBookingId) {
          const conv = data.find(c => c.bookingId === this.pendingBookingId);
          if (conv) {
            // conversation موجودة — افتحها
            if (!this.activeConversation) {
              this.selectConversation(conv);
            }
          } else {
            // conversation مش موجودة — جيب الـ booking details وعمل phantom
            this.loadPhantomConversation(this.pendingBookingId);
          }
          this.pendingBookingId = null;
        }
      }),
      this.chatService.messages$.subscribe(data => {
        this.messages = data;
        this.loadingMessages = false;
      })
    );
  }

  private loadPhantomConversation(bookingId: number): void {
    this.bookingService.getBookingById(bookingId).subscribe({
      next: (booking) => {
        const currentUserId = this.auth.getUserFromStorage()?.userId ?? '';
        const isTourist = booking.touristId === currentUserId;

        const phantom: ConversationDto = {
          bookingId: booking.id,
          otherUserId: isTourist ? booking.guideProfileId.toString() : booking.touristId,
          otherUserName: isTourist ? booking.guideName : booking.touristName,
          otherUserAvatar: isTourist ? booking.guideAvatar : booking.touristAvatar,
          lastMessage: '',
          lastMessageAt: new Date().toISOString(),
          unreadCount: 0
        };

        this.activeConversation = phantom;
        this.messages = [];
        this.loadingMessages = false;
      },
      error: () => {
        this.loadingMessages = false;
      }
    });
  }

  selectConversation(conv: ConversationDto): void {
    this.activeConversation = conv;
    this.loadingMessages = true;
    this.chatService.loadMessages(conv.bookingId);
    conv.unreadCount = 0;
  }

  sendMessage(): void {
    const text = this.messageText.trim();
    if (!text || !this.activeConversation) return;

    this.chatService.sendMessage(
      this.activeConversation.otherUserId,
      text,
      this.activeConversation.bookingId
    );

    this.messageText = '';

    // لو phantom conversation — أضفها للـ list
    const exists = this.conversations.find(
      c => c.bookingId === this.activeConversation!.bookingId
    );
    if (!exists && this.activeConversation) {
      this.conversations = [this.activeConversation, ...this.conversations];
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  goBack(): void {
    this.location.back();
  }

  isOnline(userId: string): boolean {
    return this.chatService.isUserOnline(userId);
  }

  isMine(message: MessageDto): boolean {
    return message.senderId === this.currentUserId;
  }

  formatTime(dateStr: string): string {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.chatService.setActiveConversation(null);
    this.chatService.stopConnection();
  }
}