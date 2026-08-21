export interface BookingDto {
  id: number;
  startDate: string;
  numberOfPersons: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  isCustom: boolean;
  rejectionReason?: string;
  createdAt: string;
  touristId: string;
  touristName: string;
  touristAvatar?: string;
  guideProfileId: number;
  guideName: string;
  guideAvatar?: string;
  packageId?: number;
  packageTitle?: string;
}

export interface BookingFilterParams {
  status?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateBookingRequest {
  packageId?: number;
  guideProfileId: number;
  startDate: string;
  numberOfPersons: number;
  durationDays: number;
}

export interface RejectBookingRequest {
  reason: string;
}