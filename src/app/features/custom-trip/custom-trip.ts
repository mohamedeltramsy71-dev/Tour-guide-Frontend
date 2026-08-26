import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CustomTripService } from '../../core/services/custom-trip.service';
import { CityService } from '../../core/services/city';
import { LandmarkService } from '../../core/services/landmark';
import { City } from '../../core/models/city';
import { Landmark } from '../../core/models/landmark';
import { Guide } from '../../core/models/guide';
import { CalculatePriceResponse } from '../../core/models/custom-trip';

@Component({
  selector: 'app-custom-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './custom-trip.html',
  styleUrl: './custom-trip.scss'
})
export class CustomTripComponent implements OnInit {
  private customTripSvc = inject(CustomTripService);
  private citySvc       = inject(CityService);
  private landmarkSvc   = inject(LandmarkService);
  private router        = inject(Router);

  // ── Wizard state ──────────────────────────────────
  step = signal(1);

  // ── Step 1 ────────────────────────────────────────
  cities           = signal<City[]>([]);
  selectedCityId   = signal<number | null>(null);
  startDate        = signal('');
  durationDays     = signal(1);
  numberOfPersons  = signal(1);

  // ── Step 2 ────────────────────────────────────────
  landmarks            = signal<Landmark[]>([]);
  selectedLandmarkIds  = signal<Set<number>>(new Set());
  landmarksLoading     = signal(false);

  // ── Step 3 ────────────────────────────────────────
  availableGuides = signal<Guide[]>([]);
  selectedGuide   = signal<Guide | null>(null);
  guidesLoading   = signal(false);

  // ── Step 4 ────────────────────────────────────────
  priceResult  = signal<CalculatePriceResponse | null>(null);
  priceLoading = signal(false);

  // ── Submit ────────────────────────────────────────
  submitting = signal(false);
  error      = signal('');
  success    = signal(false);

  today = new Date().toISOString().split('T')[0];

  // ── Computed ──────────────────────────────────────
  selectedCity = computed(() =>
    this.cities().find(c => c.id === this.selectedCityId()) ?? null
  );

  endDate = computed(() => {
    if (!this.startDate()) return '';
    const d = new Date(this.startDate());
    d.setDate(d.getDate() + this.durationDays());
    return d.toISOString().split('T')[0];
  });

  selectedLandmarksList = computed(() =>
    this.landmarks().filter(l => this.selectedLandmarkIds().has(l.id))
  );

  step1Valid = computed(() =>
    !!this.selectedCityId() && !!this.startDate() &&
    this.durationDays() >= 1 && this.numberOfPersons() >= 1
  );

  step2Valid = computed(() => this.selectedLandmarkIds().size > 0);
  step3Valid = computed(() => !!this.selectedGuide());

  // ── Lifecycle ─────────────────────────────────────
  ngOnInit() {
    this.citySvc.getCities().subscribe({
      next: (data: any) => {
        this.cities.set(Array.isArray(data) ? data : (data.items ?? []));
      }
    });
  }

  // ── Navigation ────────────────────────────────────
  nextStep1() {
    if (!this.step1Valid()) return;
    this.landmarksLoading.set(true);
    const params = new HttpParams()
      .set('cityId', this.selectedCityId()!.toString())
      .set('pageSize', '100');
    this.landmarkSvc.getLandmarks(params).subscribe({
      next: (data: any) => {
        this.landmarks.set(Array.isArray(data) ? data : (data.items ?? []));
        this.landmarksLoading.set(false);
        this.step.set(2);
      },
      error: () => this.landmarksLoading.set(false)
    });
  }

  nextStep2() {
    if (!this.step2Valid()) return;
    this.guidesLoading.set(true);
    this.customTripSvc.getAvailableGuides({
      cityId: this.selectedCityId()!,
      startDate: this.startDate(),
      endDate: this.endDate()
    }).subscribe({
      next: (guides) => {
        this.availableGuides.set(guides);
        this.guidesLoading.set(false);
        this.step.set(3);
      },
      error: () => this.guidesLoading.set(false)
    });
  }

  nextStep3() {
    if (!this.step3Valid()) return;
    this.priceLoading.set(true);
    this.customTripSvc.calculatePrice({
      landmarkIds: [...this.selectedLandmarkIds()],
      durationDays: this.durationDays(),
      numberOfPersons: this.numberOfPersons(),
      guideProfileId: this.selectedGuide()!.guideProfileId
    }).subscribe({
      next: (result) => {
        this.priceResult.set(result);
        this.priceLoading.set(false);
        this.step.set(4);
      },
      error: () => this.priceLoading.set(false)
    });
  }

  prevStep() {
    if (this.step() > 1) this.step.update(s => s - 1);
  }

  // ── Actions ───────────────────────────────────────
  toggleLandmark(id: number) {
    const s = new Set(this.selectedLandmarkIds());
    s.has(id) ? s.delete(id) : s.add(id);
    this.selectedLandmarkIds.set(s);
  }

  isLandmarkSelected(id: number): boolean {
    return this.selectedLandmarkIds().has(id);
  }

  selectGuide(guide: Guide) {
    this.selectedGuide.set(guide);
  }

  confirm() {
    this.submitting.set(true);
    this.error.set('');
    this.customTripSvc.createCustomTrip({
      landmarkIds:    [...this.selectedLandmarkIds()],
      guideProfileId: this.selectedGuide()!.guideProfileId,
      startDate:      this.startDate(),
      numberOfPersons: this.numberOfPersons(),
      durationDays:   this.durationDays()
    }).subscribe({
      next: () => {
        this.success.set(true);
        this.submitting.set(false);
        setTimeout(() => this.router.navigate(['/bookings']), 2000);
      },
      error: () => {
        this.submitting.set(false);
        this.error.set('Failed to create trip. Please try again.');
      }
    });
  }

  // ── Helpers ───────────────────────────────────────
  starsArr = [0, 1, 2, 3, 4];

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  entryFeePerPerson(fee: number): number {
    return fee * this.numberOfPersons();
  }
}