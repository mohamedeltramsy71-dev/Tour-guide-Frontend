import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private api: ApiService) {}

  getCities(page = 1, pageSize = 1000): Observable<City[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);
    return this.api.get<City[]>('cities', { params });
  }

  getCityById(id: number): Observable<City> {
    return this.api.get<City>(`cities/${id}`);
  }

  getTrendingCities(): Observable<City[]> {
    return this.api.get<City[]>('cities/trending');
  }

  createCity(data: { nameAr: string; nameEn: string; description?: string; imageUrl?: string }): Observable<City> {
    return this.api.post<City>('cities', data);
  }

  updateCity(id: number, data: { nameAr: string; nameEn: string; description?: string; imageUrl?: string }): Observable<City> {
    return this.api.put<City>(`cities/${id}`, data);
  }

  deleteCity(id: number): Observable<any> {
    return this.api.delete(`cities/${id}`);
  }
}