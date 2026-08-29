import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../../core/services/package';
import { GuideService } from '../../../core/services/guide';
import { CityService } from '../../../core/services/city';
import { LandmarkService } from '../../../core/services/landmark';
import {
  Package,
  PackageImageDto,
  CreatePackageRequest,
  UpdatePackageRequest,
  AddLandmarkToPackageRequest,
} from '../../../core/models/package';
import { City } from '../../../core/models/city';
import { Landmark } from '../../../core/models/landmark';

type ModalMode = 'create' | 'edit' | 'delete' | 'images' | 'landmarks' | null;

@Component({
  selector: 'app-guide-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guide-packages.html',
  styleUrl: './guide-packages.scss',
})
export class GuidePackages implements OnInit {

  packages: Package[] = [];
  cities: City[] = [];
  landmarks: Landmark[] = [];

  loading = true;
  saving = false;
  togglingId: number | null = null;
  uploadingId: number | null = null;
  deletingImageId: number | null = null;

  modal: ModalMode = null;
  selectedPkg: Package | null = null;

  successMsg = '';
  errorMsg = '';

  createForm: CreatePackageRequest = this.emptyCreate();
  editForm: UpdatePackageRequest = this.emptyEdit();
  landmarkForm: AddLandmarkToPackageRequest = { landmarkId: 0, dayNumber: 1, order: 1 };

  // ← جديد: المدينة المختارة لفلترة اللاند ماركس
  selectedLandmarkCityId = 0;

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  guideId = '';

  constructor(
    private packageService: PackageService,
    private guideService: GuideService,
    private cityService: CityService,
    private landmarkService: LandmarkService,
  ) {}

  ngOnInit(): void {
    this.loadGuideAndPackages();
    this.loadCities();
    this.loadLandmarks();
  }

  loadGuideAndPackages(): void {
    this.loading = true;
    this.guideService.getMyProfile().subscribe({
      next: (profile) => {
        this.guideId = profile.userId;
        this.loadPackages();
      },
      error: () => {
        this.errorMsg = 'Failed to load guide info.';
        this.loading = false;
      },
    });
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe({
      next: (all: Package[]) => {
        this.packages = all.filter((p: Package) => p.guideId === this.guideId);
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load packages.';
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

  loadLandmarks(): void {
    this.landmarkService.getLandmarks().subscribe({
      next: (data: Landmark[]) => { this.landmarks = data; },
      error: () => {},
    });
  }

  // ── Modals ────────────────────────────────────────────────
  openCreate(): void {
    this.createForm = this.emptyCreate();
    this.clearAlerts();
    this.modal = 'create';
  }

  openEdit(pkg: Package): void {
    this.selectedPkg = pkg;
    this.editForm = {
      title: pkg.title,
      description: pkg.description ?? '',
      price: pkg.price,
      durationDays: pkg.durationDays,
      maxPersons: pkg.maxPersons,
    };
    this.clearAlerts();
    this.modal = 'edit';
  }

  openDelete(pkg: Package): void {
    this.selectedPkg = pkg;
    this.clearAlerts();
    this.modal = 'delete';
  }

  openImages(pkg: Package): void {
    this.selectedPkg = pkg;
    this.selectedFile = null;
    this.previewUrl = null;
    this.clearAlerts();
    this.modal = 'images';
  }

  openLandmarks(pkg: Package): void {
    this.selectedPkg = pkg;
    this.landmarkForm = { landmarkId: 0, dayNumber: 1, order: 1 };
    // ← reset فلتر المدينة عند فتح الـ modal
    this.selectedLandmarkCityId = 0;
    this.clearAlerts();
    this.modal = 'landmarks';
  }

  closeModal(): void {
    this.modal = null;
    this.selectedPkg = null;
    this.selectedFile = null;
    this.previewUrl = null;
    this.selectedLandmarkCityId = 0;
  }

  // ── CRUD ──────────────────────────────────────────────────
  submitCreate(): void {
    if (!this.createForm.title || !this.createForm.cityId) return;
    this.saving = true;
    this.packageService.createPackage(this.createForm).subscribe({
      next: (pkg: Package) => {
        this.packages = [pkg, ...this.packages];
        this.saving = false;
        this.closeModal();
        this.showSuccess('Package created successfully!');
      },
      error: () => {
        this.errorMsg = 'Failed to create package.';
        this.saving = false;
      },
    });
  }

  submitEdit(): void {
    if (!this.selectedPkg || !this.editForm.title) return;
    this.saving = true;
    this.packageService.updatePackage(this.selectedPkg.id, this.editForm).subscribe({
      next: (updated: Package) => {
        this.packages = this.packages.map((p: Package) => p.id === updated.id ? updated : p);
        this.saving = false;
        this.closeModal();
        this.showSuccess('Package updated successfully!');
      },
      error: () => {
        this.errorMsg = 'Failed to update package.';
        this.saving = false;
      },
    });
  }

  confirmDelete(): void {
    if (!this.selectedPkg) return;
    this.saving = true;
    this.packageService.deletePackage(this.selectedPkg.id).subscribe({
      next: () => {
        this.packages = this.packages.filter((p: Package) => p.id !== this.selectedPkg!.id);
        this.saving = false;
        this.closeModal();
        this.showSuccess('Package deleted.');
      },
      error: () => {
        this.errorMsg = 'Failed to delete package.';
        this.saving = false;
      },
    });
  }

  toggleActive(pkg: Package): void {
    this.togglingId = pkg.id;
    this.packageService.togglePackage(pkg.id).subscribe({
      next: () => {
        this.packages = this.packages.map((p: Package) =>
          p.id === pkg.id ? { ...p, isActive: !p.isActive } : p
        );
        this.togglingId = null;
      },
      error: () => { this.togglingId = null; },
    });
  }

  // ── Images ────────────────────────────────────────────────
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => { this.previewUrl = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  uploadImage(): void {
    if (!this.selectedPkg || !this.selectedFile) return;
    this.uploadingId = this.selectedPkg.id;
    this.packageService.uploadImage(this.selectedPkg.id, this.selectedFile).subscribe({
      next: (updated: Package) => {
        this.packages = this.packages.map((p: Package) => p.id === updated.id ? updated : p);
        this.selectedPkg = updated;
        this.selectedFile = null;
        this.previewUrl = null;
        this.uploadingId = null;
        this.showSuccess('Image uploaded!');
      },
      error: () => {
        this.errorMsg = 'Failed to upload image.';
        this.uploadingId = null;
      },
    });
  }

  deleteImage(img: PackageImageDto): void {
    if (!this.selectedPkg) return;
    this.deletingImageId = img.id;
    this.packageService.deleteImage(this.selectedPkg.id, img.id).subscribe({
      next: () => {
        if (this.selectedPkg) {
          this.selectedPkg = {
            ...this.selectedPkg,
            images: this.selectedPkg.images.filter((i: PackageImageDto) => i.id !== img.id),
          };
          this.packages = this.packages.map((p: Package) =>
            p.id === this.selectedPkg!.id ? this.selectedPkg! : p
          );
        }
        this.deletingImageId = null;
        this.showSuccess('Image deleted.');
      },
      error: () => {
        this.errorMsg = 'Failed to delete image.';
        this.deletingImageId = null;
      },
    });
  }

  // ── Landmarks ─────────────────────────────────────────────
  addLandmark(): void {
    if (!this.selectedPkg || !this.landmarkForm.landmarkId) return;
    this.saving = true;
    this.packageService.addLandmark(this.selectedPkg.id, this.landmarkForm).subscribe({
      next: () => {
        const lm = this.landmarks.find((l: Landmark) => l.id === this.landmarkForm.landmarkId);
        if (lm && this.selectedPkg) {
          const newLm = {
            landmarkId: lm.id,
            nameEn: lm.nameEn,
            dayNumber: this.landmarkForm.dayNumber,
            order: this.landmarkForm.order,
          };
          this.selectedPkg = {
            ...this.selectedPkg,
            landmarks: [...this.selectedPkg.landmarks, newLm],
          };
          this.packages = this.packages.map((p: Package) =>
            p.id === this.selectedPkg!.id ? this.selectedPkg! : p
          );
        }
        this.landmarkForm = { landmarkId: 0, dayNumber: 1, order: 1 };
        this.saving = false;
        this.showSuccess('Landmark added!');
      },
      error: () => {
        this.errorMsg = 'Failed to add landmark (may already exist).';
        this.saving = false;
      },
    });
  }

  removeLandmark(landmarkId: number): void {
    if (!this.selectedPkg) return;
    this.packageService.removeLandmark(this.selectedPkg.id, landmarkId).subscribe({
      next: () => {
        if (this.selectedPkg) {
          this.selectedPkg = {
            ...this.selectedPkg,
            landmarks: this.selectedPkg.landmarks.filter(l => l.landmarkId !== landmarkId),
          };
          this.packages = this.packages.map((p: Package) =>
            p.id === this.selectedPkg!.id ? this.selectedPkg! : p
          );
        }
      },
      error: () => { this.errorMsg = 'Failed to remove landmark.'; },
    });
  }

  // ── Helpers ───────────────────────────────────────────────
  getInitials(title: string): string {
    return title.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
  }

  isLandmarkAlreadyAdded(landmarkId: number): boolean {
    return this.selectedPkg?.landmarks.some(l => l.landmarkId === landmarkId) ?? false;
  }

  // ← جديد: فلترة بالمدينة المختارة + إزالة المضافة مسبقاً
  availableLandmarks(): Landmark[] {
    return this.landmarks.filter((l: Landmark) => {
      if (this.isLandmarkAlreadyAdded(l.id)) return false;
      if (this.selectedLandmarkCityId === 0) return true;
      return l.cityId === this.selectedLandmarkCityId;
    });
  }

  private showSuccess(msg: string): void {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 4000);
  }

  private clearAlerts(): void {
    this.successMsg = '';
    this.errorMsg = '';
  }

  private emptyCreate(): CreatePackageRequest {
    return { title: '', description: '', price: 0, durationDays: 1, maxPersons: 1, cityId: 0 };
  }

  private emptyEdit(): UpdatePackageRequest {
    return { title: '', description: '', price: 0, durationDays: 1, maxPersons: 1 };
  }
}