import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Landmark } from '../models/landmark';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  constructor(private api: ApiService) { }

  getLandmarks(params?: Record<string, any>): Observable<Landmark[]> {
    let query = 'landmarks';
    if (params) {
      const queryString = new URLSearchParams(
        Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
      ).toString();
      if (queryString) query += `?${queryString}`;
    }
    return this.api.get<Landmark[]>(query);
  }

  getLandmarkById(id: number): Observable<Landmark> {
    return this.api.get<Landmark>(`landmarks/${id}`);
  }
}