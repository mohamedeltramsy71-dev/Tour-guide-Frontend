import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { ReviewService } from '../../../core/services/review.service';
import { BookingDto } from '../../../core/models/booking';
import { ReviewDto } from '../../../core/models/review';
import { LeaveReviewComponent } from '../../../features/leave-review/leave-review';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, LeaveReviewComponent],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss',
})
export class MyBookingsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private reviewService  = inject(ReviewService);
  private router         = inject(Router);

  allBookings  = signal<BookingDto[]>([]);
  activeTab    = signal<string>('All');
  loading      = signal(false);
  cancellingId = signal<number | null>(null);
  successMsg   = signal('');
  errorMsg     = signal('');

  reviewModalBooking = signal<BookingDto | null>(null);
  reviewedBookings   = signal<Map<number, ReviewDto>>(new Map());

  tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Rejected', 'Cancelled'];

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading.set(true);
    this.bookingService.getMyBookings({ pageSize: 100 }).subscribe({
      next: (data) => { this.allBookings.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  get filteredBookings(): BookingDto[] {
    const tab = this.activeTab();
    if (tab === 'All') return this.allBookings();
    return this.allBookings().filter((b) => b.status === tab);
  }

  getCount(tab: string): number {
    if (tab === 'All') return this.allBookings().length;
    return this.allBookings().filter((b) => b.status === tab).length;
  }

  setTab(tab: string) { this.activeTab.set(tab); }

  cancelBooking(id: number) {
    this.cancellingId.set(id);
    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        this.allBookings.update((list) =>
          list.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
        );
        this.cancellingId.set(null);
        this.showSuccess('Booking cancelled successfully.');
      },
      error: () => { this.cancellingId.set(null); this.showError('Failed to cancel booking.'); },
    });
  }

  openChat(bookingId: number) {
    this.router.navigate(['/chat'], { queryParams: { bookingId } });
  }

  openReviewModal(booking: BookingDto) { this.reviewModalBooking.set(booking); }
  closeReviewModal()                   { this.reviewModalBooking.set(null); }

  onReviewSubmitted(review: ReviewDto) {
    this.reviewedBookings.update((map) => {
      const updated = new Map(map);
      updated.set(review.bookingId, review);
      return updated;
    });
    this.reviewModalBooking.set(null);
    this.showSuccess('Review submitted successfully.');
  }

  getExistingReview(bookingId: number): ReviewDto | null {
    return this.reviewedBookings().get(bookingId) ?? null;
  }

  hasReviewed(bookingId: number): boolean {
    return this.reviewedBookings().has(bookingId);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'badge-pending', Confirmed: 'badge-confirmed',
      Completed: 'badge-completed', Rejected: 'badge-rejected', Cancelled: 'badge-cancelled',
    };
    return map[status] ?? 'badge-secondary';
  }

  getPaymentClass(status: string): string {
    return status === 'Paid' ? 'badge-paid' : 'badge-unpaid';
  }

  private showSuccess(msg: string) {
    this.successMsg.set(msg);
    setTimeout(() => this.successMsg.set(''), 3000);
  }

  private showError(msg: string) {
    this.errorMsg.set(msg);
    setTimeout(() => this.errorMsg.set(''), 4000);
  }
}