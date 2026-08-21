export interface ReviewDto {
  id: number;
  bookingId: number;
  touristName: string;
  touristAvatar?: string;
  guideName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  bookingId: number;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating: number;
  comment?: string;
}