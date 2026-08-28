import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Landmark } from '../models/landmark';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  constructor(private api: ApiService) { }

  getLandmarks(params?: any): Observable<Landmark[]> {
    let query = 'landmarks';
    const finalParams = { pageSize: 1000, ...params }; // ✅ هيجيب كل اللاند ماركس
    const queryString = new URLSearchParams(finalParams).toString();
    if (queryString) query += `?${queryString}`;
    return this.api.get<Landmark[]>(query);
  }

  getLandmarkById(id: number): Observable<Landmark> {
    return this.api.get<Landmark>(`landmarks/${id}`);
  }
}