import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { BookingDto } from '../../../core/models/booking';

type StatusFilter = 'All' | 'Pending' | 'Confirmed' | 'Rejected' | 'Completed';

@Component({
  selector: 'app-incoming-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incoming-bookings.html',
  styleUrl: './incoming-bookings.scss'
})
export class IncomingBookingsComponent implements OnInit {
  bookings: BookingDto[] = [];
  filtered: BookingDto[] = [];

  activeFilter: StatusFilter = 'All';
  filters: StatusFilter[] = ['All', 'Pending', 'Confirmed', 'Rejected', 'Completed'];

  loading = true;
  error = '';

  selectedBooking: BookingDto | null = null;
  rejectReason = '';
  rejectLoading = false;
  rejectError = '';

  completeTarget: BookingDto | null = null;
  completeLoading = false;

  successMsg = '';

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.bookingService.getGuideBookings({ pageSize: 100 }).subscribe({
      next: (data) => {
        this.bookings = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load bookings. Please try again.';
        this.loading = false;
      }
    });
  }

  setFilter(f: StatusFilter) {
    this.activeFilter = f;
    this.applyFilter();
  }

  applyFilter() {
    this.filtered = this.activeFilter === 'All'
      ? this.bookings
      : this.bookings.filter(b => b.status === this.activeFilter);
  }

  countByStatus(s: StatusFilter): number {
    if (s === 'All') return this.bookings.length;
    return this.bookings.filter(b => b.status === s).length;
  }

  openChat(bookingId: number) {
    this.router.navigate(['/chat'], { queryParams: { bookingId } });
  }

  accept(booking: BookingDto) {
    this.bookingService.acceptBooking(booking.id).subscribe({
      next: () => {
        booking.status = 'Confirmed';
        this.applyFilter();
        this.showSuccess('Booking accepted successfully.');
      },
      error: () => this.showSuccess('Failed to accept booking.', true)
    });
  }

  openRejectModal(booking: BookingDto) {
    this.selectedBooking = booking;
    this.rejectReason = '';
    this.rejectError = '';
    this.rejectLoading = false;
  }

  submitReject() {
    if (!this.rejectReason.trim()) {
      this.rejectError = 'Please provide a reason.';
      return;
    }
    this.rejectLoading = true;
    this.bookingService.rejectBooking(this.selectedBooking!.id, { reason: this.rejectReason }).subscribe({
      next: () => {
        this.selectedBooking!.status = 'Rejected';
        this.selectedBooking!.rejectionReason = this.rejectReason;
        this.applyFilter();
        this.closeRejectModal();
        this.showSuccess('Booking rejected.');
      },
      error: () => {
        this.rejectError = 'Failed to reject booking.';
        this.rejectLoading = false;
      }
    });
  }

  closeRejectModal() {
    this.selectedBooking = null;
    this.rejectReason = '';
    this.rejectError = '';
    this.rejectLoading = false;
  }

  openCompleteConfirm(booking: BookingDto) {
    this.completeTarget = booking;
  }

  confirmComplete() {
    if (!this.completeTarget) return;
    this.completeLoading = true;
    this.bookingService.completeBooking(this.completeTarget.id).subscribe({
      next: () => {
        this.completeTarget!.status = 'Completed';
        this.applyFilter();
        this.completeTarget = null;
        this.completeLoading = false;
        this.showSuccess('Trip marked as completed.');
      },
      error: () => {
        this.completeTarget = null;
        this.completeLoading = false;
      }
    });
  }

  cancelComplete() {
    this.completeTarget = null;
  }

  showSuccess(msg: string, isError = false) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3500);
  }

  statusClass(status: string): string {
    return {
      Pending:   'badge-pending',
      Confirmed: 'badge-confirmed',
      Rejected:  'badge-rejected',
      Completed: 'badge-completed',
      Cancelled: 'badge-cancelled',
    }[status] ?? '';
  }

  paymentClass(status: string): string {
    return {
      Paid:   'badge-paid',
      Unpaid: 'badge-unpaid',
      Failed: 'badge-failed',
    }[status] ?? '';
  }
}