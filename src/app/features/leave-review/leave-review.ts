import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../core/services/review.service';
import { ReviewDto, CreateReviewRequest, UpdateReviewRequest } from '../../core/models/review';

@Component({
  selector: 'app-leave-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-review.html',
  styleUrl: './leave-review.scss',
})
export class LeaveReviewComponent implements OnInit {
  @Input() bookingId!: number;
  @Input() guideName: string = '';
  @Input() existingReview: ReviewDto | null = null;

  @Output() submitted = new EventEmitter<ReviewDto>();
  @Output() closed    = new EventEmitter<void>();

  rating      = signal(0);
  hoveredStar = signal(0);
  comment     = '';
  loading     = false;
  error       = '';
  success     = '';

  stars = [1, 2, 3, 4, 5];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.existingReview) {
      this.rating.set(this.existingReview.rating);
      this.comment = this.existingReview.comment ?? '';
    }
  }

  get isEdit(): boolean { return !!this.existingReview; }

  setRating(star: number): void  { this.rating.set(star); }
  hoverStar(star: number): void  { this.hoveredStar.set(star); }
  clearHover(): void             { this.hoveredStar.set(0); }

  starClass(star: number): string {
    const active = this.hoveredStar() || this.rating();
    return star <= active ? 'star-filled' : 'star-empty';
  }

  ratingLabel(): string {
    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    return labels[this.rating()] ?? '';
  }

  submit(): void {
    if (this.rating() === 0) { this.error = 'Please select a rating.'; return; }
    this.loading = true;
    this.error   = '';

    const obs = this.isEdit
      ? this.reviewService.updateReview(this.existingReview!.id, {
          rating: this.rating(),
          comment: this.comment || undefined,
        } as UpdateReviewRequest)
      : this.reviewService.createReview({
          bookingId: this.bookingId,
          rating: this.rating(),
          comment: this.comment || undefined,
        } as CreateReviewRequest);

    obs.subscribe({
      next: (review: ReviewDto) => {
        this.loading = false;
        this.success = this.isEdit ? 'Review updated!' : 'Review submitted!';
        setTimeout(() => this.submitted.emit(review), 1200);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to submit review.';
      },
    });
  }

  close(): void { this.closed.emit(); }
}