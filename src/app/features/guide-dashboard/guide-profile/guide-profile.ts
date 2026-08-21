import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuideService } from '../../../core/services/guide';
import { CityService } from '../../../core/services/city';
import { GuideProfile as GuideProfileModel, UpdateGuideRequest } from '../../../core/models/guide';
import { City } from '../../../core/models/city';

@Component({
  selector: 'app-guide-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guide-profile.html',
  styleUrl: './guide-profile.scss',
})
export class GuideProfile implements OnInit {

  profile: GuideProfileModel | null = null;
  cities: City[] = [];

  loading = true;
  saving = false;
  editMode = false;
  successMsg = '';
  errorMsg = '';

  form: UpdateGuideRequest = {
    bio: '',
    languages: [],
    experienceYears: 0,
    coveredCityIds: [],
  };

  newLanguage = '';

  constructor(
    private guideService: GuideService,
    private cityService: CityService,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadCities();
  }

  loadProfile(): void {
    this.loading = true;
    this.guideService.getMyProfile().subscribe({
      next: (data: GuideProfileModel) => {
        this.profile = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load profile.';
        this.loading = false;
      },
    });
  }

  loadCities(): void {
    this.cityService.getCities().subscribe({
      next: (data: City[]) => { this.cities = data; },
      error: () => {},
    });
  }

  enterEditMode(): void {
    if (!this.profile) return;
    this.form = {
      bio: this.profile.bio ?? '',
      languages: [...this.profile.languages],
      experienceYears: this.profile.experienceYears,
      coveredCityIds: this.getCityIdsByNames(this.profile.coveredCities),
    };
    this.successMsg = '';
    this.errorMsg = '';
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    this.newLanguage = '';
    this.successMsg = '';
    this.errorMsg = '';
  }

  saveProfile(): void {
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.guideService.updateMyProfile(this.form).subscribe({
      next: (updated: GuideProfileModel) => {
        this.profile = updated;
        this.saving = false;
        this.editMode = false;
        this.newLanguage = '';
        this.successMsg = 'Profile updated successfully!';
        setTimeout(() => this.successMsg = '', 4000);
      },
      error: () => {
        this.errorMsg = 'Failed to save changes. Please try again.';
        this.saving = false;
      },
    });
  }

  addLanguage(): void {
    const lang = this.newLanguage.trim();
    if (!lang || this.form.languages.includes(lang)) return;
    this.form.languages = [...this.form.languages, lang];
    this.newLanguage = '';
  }

  removeLanguage(lang: string): void {
    this.form.languages = this.form.languages.filter((l: string) => l !== lang);
  }

  onLanguageKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addLanguage();
    }
  }

  isCitySelected(cityId: number): boolean {
    return this.form.coveredCityIds.includes(cityId);
  }

  toggleCity(cityId: number): void {
    if (this.isCitySelected(cityId)) {
      this.form.coveredCityIds = this.form.coveredCityIds.filter((id: number) => id !== cityId);
    } else {
      this.form.coveredCityIds = [...this.form.coveredCityIds, cityId];
    }
  }

  private getCityIdsByNames(names: string[]): number[] {
    return this.cities
      .filter((c: City) => names.includes(c.nameEn))
      .map((c: City) => c.id);
  }

  getInitials(name: string): string {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }

  getAvailabilityLabel(): string {
    return this.profile?.isAvailable ? 'Available' : 'Unavailable';
  }

  getStatusLabel(): string {
    return this.profile?.isApproved ? 'Approved' : 'Pending Approval';
  }
}