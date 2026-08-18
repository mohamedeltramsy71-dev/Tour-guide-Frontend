// ─── Dashboard ─────────────────────────────────────────────────────────────

export interface DashboardSummaryDto {
  totalUsers: number;
  totalGuides: number;
  totalBookingsToday: number;
  revenueToday: number;
  pendingGuideRequests: number;
}

// ─── Reports ────────────────────────────────────────────────────────────────

export interface BookingReportItem {
  period: string;
  count: number;
}

export interface BookingsReportDto {
  items: BookingReportItem[];
}

export interface RevenueReportItem {
  period: string;
  amount: number;
}

export interface RevenueReportDto {
  totalRevenue: number;
  items: RevenueReportItem[];
}

export interface TopCityDto {
  cityId: number;
  cityName: string;
  bookingCount: number;
}

export interface TopLandmarkDto {
  landmarkId: number;
  landmarkName: string;
  inclusionCount: number;
}

export interface GuidePerformanceDto {
  guideProfileId: number;
  guideName: string;
  averageRating: number;
  totalBookings: number;
  totalRevenue: number;
}

export interface UserGrowthItem {
  period: string;
  newUsers: number;
}

export interface UserGrowthDto {
  items: UserGrowthItem[];
}

// ─── Users ──────────────────────────────────────────────────────────────────

export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  role: string;
  isBanned: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface PaginatedUsersRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
  isBanned?: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Guides ─────────────────────────────────────────────────────────────────

export interface RejectGuideRequest {
  reason: string;
}