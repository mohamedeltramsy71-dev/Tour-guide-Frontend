import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { BookingDto, BookingFilterParams, CreateBookingRequest, RejectBookingRequest } from '../models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private api: ApiService) {}

  // Tourist
  createBooking(request: CreateBookingRequest): Observable<BookingDto> {
    return this.api.post<BookingDto>('bookings', request);
  }

  getMyBookings(filters?: BookingFilterParams): Observable<BookingDto[]> {
    let params = new HttpParams();
    if (filters?.status)   params = params.set('status', filters.status);
    if (filters?.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters?.toDate)   params = params.set('toDate', filters.toDate);
    if (filters?.page)     params = params.set('page', filters.page);
    if (filters?.pageSize) params = params.set('pageSize', filters.pageSize);
    return this.api.get<BookingDto[]>('bookings/my', { params });
  }

  cancelBooking(id: number): Observable<any> {
    return this.api.put(`bookings/${id}/cancel`, {});
  }

  // Guide
  getGuideBookings(filters?: BookingFilterParams): Observable<BookingDto[]> {
    let params = new HttpParams();
    if (filters?.status)   params = params.set('status', filters.status);
    if (filters?.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters?.toDate)   params = params.set('toDate', filters.toDate);
    if (filters?.page)     params = params.set('page', filters.page);
    if (filters?.pageSize) params = params.set('pageSize', filters.pageSize);
    return this.api.get<BookingDto[]>('bookings/guide', { params });
  }

  acceptBooking(id: number): Observable<any> {
    return this.api.put(`bookings/${id}/accept`, {});
  }

  rejectBooking(id: number, request: RejectBookingRequest): Observable<any> {
    return this.api.put(`bookings/${id}/reject`, request);
  }

  completeBooking(id: number): Observable<any> {
    return this.api.put(`bookings/${id}/complete`, {});
  }

  // Shared
  getBookingById(id: number): Observable<BookingDto> {
    return this.api.get<BookingDto>(`bookings/${id}`);
  }

  // Admin
  getAllBookings(filters?: BookingFilterParams): Observable<BookingDto[]> {
    let params = new HttpParams();
    if (filters?.status)   params = params.set('status', filters.status);
    if (filters?.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters?.toDate)   params = params.set('toDate', filters.toDate);
    if (filters?.page)     params = params.set('page', filters.page);
    if (filters?.pageSize) params = params.set('pageSize', filters.pageSize);
    return this.api.get<BookingDto[]>('bookings/admin', { params });
  }
}