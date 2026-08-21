import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../core/services/guide';
import { ReviewService } from '../../../core/services/review.service';
import { ReviewDto } from '../../../core/models/review';
import { GuideProfile } from '../../../core/models/guide';

@Component({
  selector: 'app-guide-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide-reviews.html',
  styleUrl: './guide-reviews.scss',
})
export class GuideReviews implements OnInit {
  reviews: ReviewDto[] = [];
  loading = true;
  error = '';

  page = 1;
  pageSize = 10;
  hasMore = true;
  loadingMore = false;

  averageRating = 0;
  totalReviews = 0;

  constructor(
    private guideService: GuideService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.guideService.getMyProfile().subscribe({
      next: (profile: GuideProfile) => {
        this.averageRating = profile.averageRating;
        this.totalReviews = profile.totalReviews;
        this.loadReviews(profile.id);
      },
      error: () => {
        this.error = 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  loadReviews(guideProfileId: number) {
    this.loading = true;
    this.reviewService.getGuideReviews(guideProfileId, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.reviews = data;
        this.hasMore = data.length === this.pageSize;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load reviews.';
        this.loading = false;
      }
    });
  }

  loadMore(guideProfileId: number) {
    this.page++;
    this.loadingMore = true;
    this.reviewService.getGuideReviews(guideProfileId, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.reviews = [...this.reviews, ...data];
        this.hasMore = data.length === this.pageSize;
        this.loadingMore = false;
      },
      error: () => { this.loadingMore = false; }
    });
  }

  stars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  ratingLabel(avg: number): string {
    if (avg >= 4.5) return 'Excellent';
    if (avg >= 4)   return 'Very Good';
    if (avg >= 3)   return 'Good';
    if (avg >= 2)   return 'Fair';
    return 'Poor';
  }

  ratingPercent(star: number): number {
    if (!this.reviews.length) return 0;
    const count = this.reviews.filter(r => Math.round(r.rating) === star).length;
    return Math.round((count / this.reviews.length) * 100);
  }
}