import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private api: ApiService) {}

  getPackages(params?: any): Observable<Package[]> {
    let query = 'packages';
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      if (queryString) query += `?${queryString}`;
    }
    return this.api.get<Package[]>(query);
  }

  getPackageById(id: number): Observable<Package> {
    return this.api.get<Package>(`packages/${id}`);
  }

  comparePackages(ids: number[]): Observable<Package[]> {
    return this.api.get<Package[]>(`packages/compare?ids=${ids.join(',')}`);
  }
}