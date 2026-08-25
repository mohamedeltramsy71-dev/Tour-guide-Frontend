export interface NotificationDto {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  bookingId?: number;
}