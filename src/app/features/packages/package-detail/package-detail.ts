import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PackageService } from '../../../core/services/package';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth';
import { Package } from '../../../core/models/package';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './package-detail.html',
  styleUrl: './package-detail.scss'
})
export class PackageDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private packageService = inject(PackageService);
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  package = signal<Package | null>(null);
  loading = signal(true);
  activeImage = signal(0);
  showBookingForm = signal(false);
  bookingLoading = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  bookingForm = this.fb.group({
    startDate: ['', [Validators.required, this.futureDateValidator()]],
    numberOfPersons: [1, [Validators.required, Validators.min(1)]]
  });

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get role(): string {
    return this.authService.getRole();
  }

  get isTourist(): boolean {
    return this.role === 'Tourist';
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get days(): number[][] {
    const pkg = this.package();
    if (!pkg) return [];
    const grouped: number[][] = [];
    const landmarks = pkg.landmarks ?? [];
    const maxDay = Math.max(...landmarks.map(l => l.dayNumber), 0);
    for (let d = 1; d <= maxDay; d++) {
      grouped.push(landmarks.filter(l => l.dayNumber === d).map(l => l.landmarkId));
    }
    return grouped;
  }

  getLandmarksByDay(day: number) {
    return (this.package()?.landmarks ?? [])
      .filter(l => l.dayNumber === day)
      .sort((a, b) => a.order - b.order);
  }

  get maxDay(): number {
    const landmarks = this.package()?.landmarks ?? [];
    return landmarks.length ? Math.max(...landmarks.map(l => l.dayNumber)) : 0;
  }

  getDayRange(): number[] {
    return Array.from({ length: this.maxDay }, (_, i) => i + 1);
  }

  private futureDateValidator() {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const today = new Date().toISOString().split('T')[0];
      return control.value >= today ? null : { pastDate: true };
    };
  }

  onStartDateChange(value: string) {
    const today = new Date().toISOString().split('T')[0];
    if (value < today) {
      this.bookingForm.get('startDate')?.setValue(today);
    }
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.packageService.getPackageById(id).subscribe({
      next: (pkg) => {
        this.package.set(pkg);
        this.loading.set(false);
        this.bookingForm.get('numberOfPersons')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(pkg.maxPersons)
        ]);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/packages']);
      }
    });
  }

  setActiveImage(index: number) {
    this.activeImage.set(index);
  }

  toggleBookingForm() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.showBookingForm.update(v => !v);
  }

  onBook() {
    if (this.bookingForm.invalid) return;
    const pkg = this.package();
    if (!pkg) return;

    this.bookingLoading.set(true);
    this.clearMessages();

    const { startDate, numberOfPersons } = this.bookingForm.value;

    this.bookingService.createBooking({
      packageId: pkg.id,
      guideProfileId: pkg.guideProfileId,
      startDate: startDate!,
      numberOfPersons: numberOfPersons!,
      durationDays: pkg.durationDays
    }).subscribe({
      next: () => {
        this.bookingLoading.set(false);
        this.showBookingForm.set(false);
        this.bookingForm.reset({ numberOfPersons: 1 });
        this.showSuccess('Booking submitted! Waiting for guide confirmation.');
      },
      error: (err) => {
        this.bookingLoading.set(false);
        this.showError(err?.error?.message ?? 'Failed to submit booking');
      }
    });
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }

  private showSuccess(msg: string) {
    this.successMsg.set(msg);
    setTimeout(() => this.successMsg.set(''), 5000);
  }

  private showError(msg: string) {
    this.errorMsg.set(msg);
    setTimeout(() => this.errorMsg.set(''), 4000);
  }

  private clearMessages() {
    this.successMsg.set('');
    this.errorMsg.set('');
  }

  private readonly baseUrl = 'https://tourguidee.runasp.net/';

  getImageUrl(index: number): string {
    const images = this.package()?.images ?? [];
    const img = images[index];
    if (!img?.imageUrl) return 'images/hero.jpg';
    if (img.imageUrl.startsWith('http')) return img.imageUrl;
    return this.baseUrl + img.imageUrl;
  }
}