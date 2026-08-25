export interface MessageDto {
  id: number;
  content: string;
  isRead: boolean;
  createdAt: string;
  senderId: string;
  senderName: string;
  bookingId: number;
}

export interface ConversationDto {
  bookingId: number;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface SendMessageRequest {
  receiverId: string;
  content: string;
  bookingId: number;
}