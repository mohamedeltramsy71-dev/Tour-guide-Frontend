import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';
import { CityService } from '../../../core/services/city';
import { City } from '../../../core/models/city';
import { HttpParams } from '@angular/common/http';

interface LandmarkDto {
  id: number;
  nameAr: string;
  nameEn: string;
  description?: string;
  location?: string;
  entryFee: number;
  averageRating: number;
  category: string;
  cityId: number;
  cityName: string;
  images: string[];
}

interface LandmarkForm {
  nameAr: string;
  nameEn: string;
  description: string;
  location: string;
  entryFee: number;
  category: string;
  cityId: number | null;
}

interface CategoryDto {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-landmarks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landmarks.html',
  styleUrls: ['./landmarks.scss'],
})
export class AdminLandmarksComponent implements OnInit {
  landmarks: LandmarkDto[] = [];
  cities: City[]           = [];
  categories: CategoryDto[] = [];
  loading = true;
  error   = false;

  // Filters
  searchTerm     = '';
  filterCity     = '';
  filterCategory = '';

  // Modal
  modalMode: 'add' | 'edit' | 'delete' | null = null;
  selectedLandmark: LandmarkDto | null = null;
  form: LandmarkForm = this.emptyForm();
  formLoading = false;
  formError   = '';
  formSuccess = '';

  // Image upload
  imageFile: File | null    = null;
  imageLoading              = false;
  imagePreview: string | null = null;

  constructor(
    private api: ApiService,
    private cityService: CityService,
  ) {}

  ngOnInit(): void {
    this.loadLandmarks();
    this.loadCities();
    this.loadCategories();
  }

  emptyForm(): LandmarkForm {
    return { nameAr: '', nameEn: '', description: '', location: '', entryFee: 0, category: '', cityId: null };
  }

  // ── Load ──────────────────────────────────────────────────────────────────

  loadLandmarks(): void {
    this.loading = true;
    this.error   = false;
    let params = new HttpParams().set('pageSize', 100);
    if (this.filterCity)     params = params.set('cityId', this.filterCity);
    if (this.filterCategory) params = params.set('category', this.filterCategory);
    if (this.searchTerm)     params = params.set('search', this.searchTerm);
    this.api.get<LandmarkDto[]>('landmarks', { params }).subscribe({
      next: (data) => { this.landmarks = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }

  loadCities(): void {
    this.cityService.getCities().subscribe({
      next: (data) => this.cities = data,
      error: () => {},
    });
  }

  loadCategories(): void {
    this.api.get<CategoryDto[]>('categories').subscribe({
      next: (data) => this.categories = data,
      error: () => {},
    });
  }

  onSearch(): void { this.loadLandmarks(); }
  onFilterChange(): void { this.loadLandmarks(); }
  clearFilters(): void {
    this.searchTerm = ''; this.filterCity = ''; this.filterCategory = '';
    this.loadLandmarks();
  }

  // ── Modals ────────────────────────────────────────────────────────────────

  openAdd(): void {
    this.form = this.emptyForm();
    this.imageFile = null; this.imagePreview = null;
    this.formError = ''; this.formSuccess = '';
    this.selectedLandmark = null;
    this.modalMode = 'add';
  }

  openEdit(lm: LandmarkDto): void {
    this.selectedLandmark = lm;
    this.form = { nameAr: lm.nameAr, nameEn: lm.nameEn, description: lm.description ?? '', location: lm.location ?? '', entryFee: lm.entryFee, category: lm.category, cityId: lm.cityId };
    this.imageFile = null; this.imagePreview = null;
    this.formError = ''; this.formSuccess = '';
    this.modalMode = 'edit';
  }

  openDelete(lm: LandmarkDto): void {
    this.selectedLandmark = lm;
    this.formSuccess = ''; this.formError = '';
    this.modalMode = 'delete';
  }

  closeModal(): void {
    this.modalMode = null; this.selectedLandmark = null;
    this.formLoading = false; this.formError = ''; this.formSuccess = '';
    this.imageFile = null; this.imagePreview = null;
  }

  // ── Image ────────────────────────────────────────────────────────────────

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview = e.target?.result as string;
    reader.readAsDataURL(file);
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  submitForm(): void {
    if (!this.form.nameEn || !this.form.nameAr || !this.form.category || !this.form.cityId) {
      this.formError = 'Please fill all required fields.'; return;
    }
    this.formLoading = true; this.formError = '';
    const body = { ...this.form };

    if (this.modalMode === 'add') {
      this.api.post<LandmarkDto>('landmarks', body).subscribe({
        next: (created) => {
          if (this.imageFile) this.uploadImage(created.id);
          else { this.formSuccess = 'Landmark created!'; this.formLoading = false; this.loadLandmarks(); setTimeout(() => this.closeModal(), 1200); }
        },
        error: (err) => { this.formLoading = false; this.formError = err?.error?.message || 'Failed to create.'; },
      });
    } else if (this.modalMode === 'edit' && this.selectedLandmark) {
      this.api.put<LandmarkDto>(`landmarks/${this.selectedLandmark.id}`, body).subscribe({
        next: () => {
          if (this.imageFile) this.uploadImage(this.selectedLandmark!.id);
          else { this.formSuccess = 'Landmark updated!'; this.formLoading = false; this.loadLandmarks(); setTimeout(() => this.closeModal(), 1200); }
        },
        error: (err) => { this.formLoading = false; this.formError = err?.error?.message || 'Failed to update.'; },
      });
    }
  }

  uploadImage(landmarkId: number): void {
    if (!this.imageFile) return;
    this.imageLoading = true;
    const fd = new FormData();
    fd.append('file', this.imageFile);
    this.api.postForm<{ imageUrl: string }>(`landmarks/${landmarkId}/images`, fd).subscribe({
      next: () => { this.imageLoading = false; this.formSuccess = this.modalMode === 'add' ? 'Landmark created!' : 'Landmark updated!'; this.formLoading = false; this.loadLandmarks(); setTimeout(() => this.closeModal(), 1200); },
      error: () => { this.imageLoading = false; this.formSuccess = 'Saved, but image upload failed.'; this.formLoading = false; this.loadLandmarks(); setTimeout(() => this.closeModal(), 1500); },
    });
  }

  confirmDelete(): void {
    if (!this.selectedLandmark) return;
    this.formLoading = true;
    this.api.delete<void>(`landmarks/${this.selectedLandmark.id}`).subscribe({
      next: () => { this.formSuccess = 'Landmark deleted.'; this.loadLandmarks(); setTimeout(() => this.closeModal(), 1200); },
      error: () => { this.formLoading = false; this.formError = 'Failed to delete.'; },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  getThumb(lm: LandmarkDto): string | null {
    return lm.images?.length ? lm.images[0] : null;
  }

  getCityName(id: number): string {
    return this.cities.find(c => c.id === id)?.nameEn ?? '';
  }

  formatFee(fee: number): string {
    return fee === 0 ? 'Free' : `$${fee}`;
  }
}