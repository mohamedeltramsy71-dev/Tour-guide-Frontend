import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { BookingDto } from '../../../core/models/booking';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss'
})
export class MyBookingsComponent implements OnInit {
  private bookingService = inject(BookingService);

  allBookings = signal<BookingDto[]>([]);
  activeTab = signal<string>('All');
  loading = signal(false);
  cancellingId = signal<number | null>(null);
  successMsg = signal('');
  errorMsg = signal('');

  tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Rejected', 'Cancelled'];

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading.set(true);
    this.bookingService.getMyBookings({ pageSize: 100 }).subscribe({
      next: (data) => {
        this.allBookings.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  get filteredBookings(): BookingDto[] {
    const tab = this.activeTab();
    if (tab === 'All') return this.allBookings();
    return this.allBookings().filter(b => b.status === tab);
  }

  getCount(tab: string): number {
    if (tab === 'All') return this.allBookings().length;
    return this.allBookings().filter(b => b.status === tab).length;
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  cancelBooking(id: number) {
    this.cancellingId.set(id);
    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        this.allBookings.update(list =>
          list.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
        );
        this.cancellingId.set(null);
        this.showSuccess('Booking cancelled successfully');
      },
      error: () => {
        this.cancellingId.set(null);
        this.showError('Failed to cancel booking');
      }
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Pending: 'badge-pending',
      Confirmed: 'badge-confirmed',
      Completed: 'badge-completed',
      Rejected: 'badge-rejected',
      Cancelled: 'badge-cancelled'
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