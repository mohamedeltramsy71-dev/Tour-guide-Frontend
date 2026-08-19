import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BookingDto, BookingFilterParams } from '../../../core/models/booking';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.scss']
})
export class AdminBookingsComponent implements OnInit {

  bookings: BookingDto[] = [];
  isLoading = false;
  totalPages = 1;

  filters: BookingFilterParams = {
    status: '',
    fromDate: '',
    toDate: '',
    page: 1,
    pageSize: 10
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading = true;

    const params: any = {
      page: this.filters.page,
      pageSize: this.filters.pageSize
    };

    if (this.filters.status) params.status = this.filters.status;
    if (this.filters.fromDate) params.fromDate = this.filters.fromDate;
    if (this.filters.toDate) params.toDate = this.filters.toDate;

    this.http.get<BookingDto[]>(`${environment.apiUrl}/bookings/admin`, { params }).subscribe({
      next: (data) => {
        this.bookings = data;
        this.totalPages = Math.ceil(data.length / this.filters.pageSize!) || 1;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  onFilter() {
    this.filters.page = 1;
    this.loadBookings();
  }

  resetFilters() {
    this.filters = { status: '', fromDate: '', toDate: '', page: 1, pageSize: 10 };
    this.loadBookings();
  }

  prevPage() {
    if (this.filters.page! > 1) {
      this.filters.page!--;
      this.loadBookings();
    }
  }

  nextPage() {
    if (this.filters.page! < this.totalPages) {
      this.filters.page!++;
      this.loadBookings();
    }
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getStatusClass(status: string): string {
    const map: any = {
      'Pending': 'status-pending',
      'Confirmed': 'status-confirmed',
      'Rejected': 'status-rejected',
      'Cancelled': 'status-cancelled',
      'Completed': 'status-completed'
    };
    return map[status] || '';
  }

  getPaymentClass(status: string): string {
    const map: any = {
      'Unpaid': 'payment-unpaid',
      'Paid': 'payment-paid',
      'Failed': 'payment-failed'
    };
    return map[status] || '';
  }
}