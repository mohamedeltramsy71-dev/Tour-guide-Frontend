import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

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

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss'],
})
export class AdminReviewsComponent implements OnInit {
  reviews: ReviewDto[] = [];
  loading = true;
  error   = false;

  page     = 1;
  pageSize = 10;
  hasMore  = true;

  expandedIds: number[] = [];

  selectedReview: ReviewDto | null = null;
  deleteLoading = false;
  deleteSuccess = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.loadReviews(); }

  loadReviews(): void {
    this.loading = true;
    this.error   = false;
    this.adminService.getAllReviews(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.reviews = Array.isArray(data) ? data : (data.items ?? data.data ?? []);
        this.hasMore = this.reviews.length === this.pageSize;
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; },
    });
  }

  prevPage(): void { if (this.page > 1) { this.page--; this.loadReviews(); } }
  nextPage(): void { if (this.hasMore) { this.page++; this.loadReviews(); } }

  isExpanded(id: number): boolean {
    return this.expandedIds.includes(id);
  }

  toggleExpand(id: number): void {
    if (this.expandedIds.includes(id)) {
      this.expandedIds = this.expandedIds.filter(i => i !== id);
    } else {
      this.expandedIds = [...this.expandedIds, id];
    }
  }

  truncate(text: string, limit = 40): string {
    return text.length > limit ? text.slice(0, limit) + '…' : text;
  }

  openDeleteModal(review: ReviewDto): void {
    this.selectedReview = review;
    this.deleteSuccess  = '';
  }

  closeModal(): void {
    this.selectedReview = null;
    this.deleteLoading  = false;
    this.deleteSuccess  = '';
  }

  confirmDelete(): void {
    if (!this.selectedReview) return;
    this.deleteLoading = true;
    this.adminService.deleteReview(this.selectedReview.id).subscribe({
      next: () => {
        this.deleteLoading = false;
        this.deleteSuccess = 'Review deleted successfully.';
        this.loadReviews();
        setTimeout(() => this.closeModal(), 1200);
      },
      error: () => { this.deleteLoading = false; },
    });
  }

  getStars(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}