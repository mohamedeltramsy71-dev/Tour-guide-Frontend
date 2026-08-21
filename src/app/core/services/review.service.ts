import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { ReviewDto, CreateReviewRequest, UpdateReviewRequest } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private api: ApiService) {}

  getGuideReviews(guideProfileId: number, page = 1, pageSize = 10): Observable<ReviewDto[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.api.get<ReviewDto[]>(`reviews/guide/${guideProfileId}`, { params });
  }

  createReview(request: CreateReviewRequest): Observable<ReviewDto> {
    return this.api.post<ReviewDto>('reviews', request);
  }

  updateReview(id: number, request: UpdateReviewRequest): Observable<ReviewDto> {
    return this.api.put<ReviewDto>(`reviews/${id}`, request);
  }

  deleteReview(id: number): Observable<void> {
    return this.api.delete<void>(`reviews/${id}`);
  }
}