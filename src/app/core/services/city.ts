import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private api: ApiService) {}

  getCities(): Observable<City[]> {
    return this.api.get<City[]>('cities');
  }

  getCityById(id: number): Observable<City> {
    return this.api.get<City>(`cities/${id}`);
  }

  getTrendingCities(): Observable<City[]> {
    return this.api.get<City[]>('cities/trending');
  }
}