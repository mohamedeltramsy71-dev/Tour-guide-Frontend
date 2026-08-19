import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CityService } from '../../../core/services/city';
import { City } from '../../../core/models/city';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-cities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cities.html',
  styleUrls: ['./cities.scss']
})
export class AdminCitiesComponent implements OnInit {

  cities: City[] = [];
  isLoading = false;
  isSaving = false;
  isUploading = false;
  successMsg = '';
  errorMsg = '';

  showModal = false;
  showDeleteModal = false;
  isEditing = false;
  selectedCity: City | null = null;

  form = {
    nameEn: '',
    nameAr: '',
    description: '',
    imageUrl: ''
  };

  constructor(
    private cityService: CityService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.isLoading = true;
    this.cityService.getCities(1, 100).subscribe({
      next: (data) => { this.cities = data; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  // ── Image Upload ───────────────────────────────────────────
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{ imageUrl: string }>(
      `${environment.apiUrl}/cities/upload-image`, formData
    ).subscribe({
      next: (res) => {
        this.form.imageUrl = res.imageUrl;
        this.isUploading = false;
      },
      error: () => {
        this.errorMsg = 'Image upload failed. Please try again.';
        this.isUploading = false;
      }
    });
  }

  // ── Add Modal ──────────────────────────────────────────────
  openAddModal() {
    this.isEditing = false;
    this.selectedCity = null;
    this.form = { nameEn: '', nameAr: '', description: '', imageUrl: '' };
    this.successMsg = '';
    this.errorMsg = '';
    this.showModal = true;
  }

  // ── Edit Modal ─────────────────────────────────────────────
  openEditModal(city: City) {
    this.isEditing = true;
    this.selectedCity = city;
    this.form = {
      nameEn: city.nameEn,
      nameAr: city.nameAr,
      description: city.description || '',
      imageUrl: city.imageUrl || ''
    };
    this.successMsg = '';
    this.errorMsg = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isSaving = false;
  }

  // ── Submit ─────────────────────────────────────────────────
  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.form.nameEn || !this.form.nameAr) {
      this.errorMsg = 'Name in English and Arabic are required';
      return;
    }

    this.isSaving = true;

    const payload = {
      nameEn: this.form.nameEn,
      nameAr: this.form.nameAr,
      description: this.form.description || undefined,
      imageUrl: this.form.imageUrl || undefined
    };

    const request = this.isEditing
      ? this.cityService.updateCity(this.selectedCity!.id, payload)
      : this.cityService.createCity(payload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.successMsg = this.isEditing ? 'City updated successfully!' : 'City added successfully!';
        this.loadCities();
        setTimeout(() => this.closeModal(), 1500);
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMsg = err.error?.message || 'Something went wrong.';
      }
    });
  }

  // ── Delete Modal ───────────────────────────────────────────
  openDeleteModal(city: City) {
    this.selectedCity = city;
    this.errorMsg = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedCity = null;
    this.isSaving = false;
  }

  confirmDelete() {
    if (!this.selectedCity) return;
    this.isSaving = true;
    this.errorMsg = '';

    this.cityService.deleteCity(this.selectedCity.id).subscribe({
      next: () => {
        this.isSaving = false;
        this.cities = this.cities.filter(c => c.id !== this.selectedCity!.id);
        this.closeDeleteModal();
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMsg = err.error?.message || 'Failed to delete city.';
      }
    });
  }
}