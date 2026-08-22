import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GuideService } from '../../../core/services/guide';
import { ReviewService } from '../../../core/services/review.service';
import { PackageService } from '../../../core/services/package';
import { GuideProfile } from '../../../core/models/guide';
import { ReviewDto } from '../../../core/models/review';
import { Package } from '../../../core/models/package';

@Component({
    selector: 'app-guide-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './guide-detail.html',
    styleUrl: './guide-detail.scss',
})
export class GuideDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private guideService = inject(GuideService);
    private reviewService = inject(ReviewService);
    private packageService = inject(PackageService);

    guide = signal<GuideProfile | null>(null);
    reviews = signal<ReviewDto[]>([]);
    packages = signal<Package[]>([]);

    loading = signal(true);
    reviewsLoading = signal(false);
    packagesLoading = signal(false);
    error = signal<string | null>(null);

    totalReviewPages = signal(0);
    currentReviewPage = signal(1);
    reviewPageSize = 5;

    activeTab = signal<'packages' | 'reviews'>('packages');

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.loadGuide(id);
        this.loadPackages(id);
    }

    loadGuide(id: string) {
        this.loading.set(true);
        this.guideService.getGuideById(id).subscribe({
            next: (data) => {
                this.guide.set(data);
                this.loading.set(false);
                this.loadReviews(data.id ?? (data as any).userId, 1);
            },
            error: () => {
                this.error.set('Failed to load guide profile.');
                this.loading.set(false);
            },
        });
    }

    loadPackages(guideId: string) {
        this.packagesLoading.set(true);
        this.packageService.getPackages().subscribe({
            next: (all) => {
                const filtered = all.filter(
                    (p) => p.guideId === guideId || (p as any).userId === guideId
                );
                this.packages.set(filtered);
                this.packagesLoading.set(false);
            },
            error: () => this.packagesLoading.set(false),
        });
    }

    loadReviews(guideProfileId: string | number, page: number) {
        this.reviewsLoading.set(true);
        this.reviewService
            .getGuideReviews(Number(guideProfileId), page, this.reviewPageSize)
            .subscribe({
                next: (res: ReviewDto[]) => {
                    if (page === 1) {
                        this.reviews.set(res);
                    } else {
                        this.reviews.update((prev) => [...prev, ...res]);
                    }
                    this.reviewsLoading.set(false);
                },
                error: () => this.reviewsLoading.set(false),
            });
    }

    loadMoreReviews() {
        const g = this.guide();
        if (!g) return;
        const nextPage = this.currentReviewPage() + 1;
        this.loadReviews((g as any).id ?? (g as any).userId, nextPage);
    }

    setTab(tab: 'packages' | 'reviews') {
        this.activeTab.set(tab);
    }

    stars(rating: number): number[] {
        return Array.from({ length: 5 }, (_, i) => i + 1);
    }

    ratingBarWidth(star: number): string {
        const all = this.reviews();
        if (!all.length) return '0%';
        const count = all.filter((r) => Math.round(r.rating) === star).length;
        return `${(count / all.length) * 100}%`;
    }

    ratingCount(star: number): number {
        return this.reviews().filter((r) => Math.round(r.rating) === star).length;
    }

    get hasMoreReviews(): boolean {
        return this.currentReviewPage() < this.totalReviewPages();
    }

    getInitials(name: string): string {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
}