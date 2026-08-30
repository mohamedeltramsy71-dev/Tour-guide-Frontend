import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Package, CreatePackageRequest, UpdatePackageRequest, AddLandmarkToPackageRequest } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private api: ApiService) {}

  // ── Public ────────────────────────────────────────────────
  getPackages(params?: Record<string, string>): Observable<Package[]> {
    let httpParams = new HttpParams();

    // ← جيب كل الباكيدجات من السيرفر
    httpParams = httpParams.set('pageSize', '1000');

    if (params) {
      Object.entries(params).forEach(([k, v]) => { if (v) httpParams = httpParams.set(k, v); });
    }
    return this.api.get<Package[]>('packages', { params: httpParams });
  }

  getPackageById(id: number): Observable<Package> {
    return this.api.get<Package>(`packages/${id}`);
  }

  comparePackages(ids: number[]): Observable<Package[]> {
    let httpParams = new HttpParams();
    ids.forEach(id => { httpParams = httpParams.append('ids', id.toString()); });
    return this.api.get<Package[]>('packages/compare', { params: httpParams });
  }

  // ── Guide ─────────────────────────────────────────────────
  createPackage(request: CreatePackageRequest): Observable<Package> {
    return this.api.post<Package>('packages', request);
  }

  updatePackage(id: number, request: UpdatePackageRequest): Observable<Package> {
    return this.api.put<Package>(`packages/${id}`, request);
  }

  deletePackage(id: number): Observable<void> {
    return this.api.delete<void>(`packages/${id}`);
  }

  togglePackage(id: number): Observable<void> {
    return this.api.put<void>(`packages/${id}/toggle`, {});
  }

  uploadImage(packageId: number, file: File): Observable<Package> {
    const form = new FormData();
    form.append('image', file);
    return this.api.postForm<Package>(`packages/${packageId}/images`, form);
  }

  deleteImage(packageId: number, imageId: number): Observable<void> {
    return this.api.delete<void>(`packages/${packageId}/images/${imageId}`);
  }

  addLandmark(packageId: number, request: AddLandmarkToPackageRequest): Observable<void> {
    return this.api.post<void>(`packages/${packageId}/landmarks`, request);
  }

  removeLandmark(packageId: number, landmarkId: number): Observable<void> {
    return this.api.delete<void>(`packages/${packageId}/landmarks/${landmarkId}`);
  }
}