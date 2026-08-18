import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import {
  DashboardSummaryDto,
  BookingsReportDto,
  RevenueReportDto,
  TopCityDto,
  TopLandmarkDto,
  GuidePerformanceDto,
  UserGrowthDto,
  UserDto,
  PaginatedUsersRequest,
  PaginatedResult,
  RejectGuideRequest,
} from '../models/admin';
import { Guide } from '../models/guide';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private api: ApiService) {}

  // ─── Dashboard ─────────────────────────────────────────────────────────────

  getDashboardSummary(): Observable<DashboardSummaryDto> {
    return this.api.get<DashboardSummaryDto>('admin/dashboard');
  }

  // ─── Reports ───────────────────────────────────────────────────────────────

  getBookingsReport(period: 'daily' | 'monthly' = 'daily'): Observable<BookingsReportDto> {
    return this.api.get<BookingsReportDto>(`admin/reports/bookings?period=${period}`);
  }

  getRevenueReport(period: 'daily' | 'monthly' = 'monthly'): Observable<RevenueReportDto> {
    return this.api.get<RevenueReportDto>(`admin/reports/revenue?period=${period}`);
  }

  getTopCities(topN: number = 5): Observable<TopCityDto[]> {
    return this.api.get<TopCityDto[]>(`admin/reports/top-cities?topN=${topN}`);
  }

  getTopLandmarks(topN: number = 5): Observable<TopLandmarkDto[]> {
    return this.api.get<TopLandmarkDto[]>(`admin/reports/top-landmarks?topN=${topN}`);
  }

  getGuidePerformance(): Observable<GuidePerformanceDto[]> {
    return this.api.get<GuidePerformanceDto[]>('admin/reports/guides');
  }

  getUserGrowth(period: 'daily' | 'monthly' = 'monthly'): Observable<UserGrowthDto> {
    return this.api.get<UserGrowthDto>(`admin/reports/users?period=${period}`);
  }

  // ─── Users ─────────────────────────────────────────────────────────────────

  getAllUsers(request: PaginatedUsersRequest = {}): Observable<PaginatedResult<UserDto>> {
    let params = new HttpParams()
      .set('page', request.page ?? 1)
      .set('pageSize', request.pageSize ?? 10);
    if (request.search)                params = params.set('search', request.search);
    if (request.role)                  params = params.set('role', request.role);
    if (request.isBanned !== undefined) params = params.set('isBanned', request.isBanned);
    return this.api.get<PaginatedResult<UserDto>>('admin/users', { params });
  }

  getUserById(id: string): Observable<UserDto> {
    return this.api.get<UserDto>(`admin/users/${id}`);
  }

  toggleBan(id: string): Observable<{ message: string }> {
    return this.api.put<{ message: string }>(`admin/users/${id}/ban`, {});
  }

  deleteUser(id: string): Observable<void> {
    return this.api.delete<void>(`admin/users/${id}`);
  }

  // ─── Guides ────────────────────────────────────────────────────────────────

  getPendingGuides(): Observable<Guide[]> {
    return this.api.get<Guide[]>('admin/guides/pending');
  }

  approveGuide(id: string): Observable<{ message: string }> {
    return this.api.put<{ message: string }>(`admin/guides/${id}/approve`, {});
  }

  rejectGuide(id: string, reason: string): Observable<{ message: string }> {
    return this.api.put<{ message: string }>(`admin/guides/${id}/reject`, { reason } as RejectGuideRequest);
  }

  suspendGuide(id: string): Observable<{ message: string }> {
    return this.api.put<{ message: string }>(`admin/guides/${id}/suspend`, {});
  }

  // ─── Reviews ───────────────────────────────────────────────────────────────

  getAllReviews(page: number = 1, pageSize: number = 10): Observable<any> {
    return this.api.get<any>(`admin/reviews?page=${page}&pageSize=${pageSize}`);
  }

  deleteReview(id: number): Observable<void> {
    return this.api.delete<void>(`admin/reviews/${id}`);
  }

  // ─── Bookings ──────────────────────────────────────────────────────────────

  getAllBookings(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
    });
    return this.api.get<any>('bookings/admin', { params });
  }
}