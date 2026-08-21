import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api';
import { AuthService } from '../../../core/services/auth';

interface GuideProfileDto {
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  languages: string[];
  experienceYears: number;
  averageRating: number;
  totalReviews: number;
  isApproved: boolean;
  isAvailable: boolean;
  coveredCities: string[];
}

interface BookingDto {
  id: number;
  startDate: string;
  numberOfPersons: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  touristName: string;
  touristAvatar?: string;
  packageTitle?: string;
  createdAt: string;
}

@Component({
  selector: 'app-guide-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './guide-dashboard.html',
  styleUrls: ['./guide-dashboard.scss']
})
export class GuideDashboard implements OnInit {
  profile: GuideProfileDto | null = null;
  bookings: BookingDto[] = [];
  isLoading = true;

  stats = {
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  };

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    // Load guide profile
    this.api.get<GuideProfileDto>('guides/me').subscribe({
      next: (profile) => {
        this.profile = profile;
      }
    });

    // Load bookings
    this.api.get<BookingDto[]>('bookings/guide', {
      params: undefined
    }).subscribe({
      next: (bookings) => {
        this.bookings = bookings.slice(0, 5); // recent 5
        this.stats.total = bookings.length;
        this.stats.pending = bookings.filter(b => b.status === 'Pending').length;
        this.stats.confirmed = bookings.filter(b => b.status === 'Confirmed').length;
        this.stats.completed = bookings.filter(b => b.status === 'Completed').length;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':   return 'badge-pending';
      case 'Confirmed': return 'badge-confirmed';
      case 'Completed': return 'badge-completed';
      case 'Rejected':  return 'badge-rejected';
      case 'Cancelled': return 'badge-cancelled';
      default:          return 'badge-secondary';
    }
  }

  get initials(): string {
    return (this.profile?.fullName ?? 'G')
      .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}