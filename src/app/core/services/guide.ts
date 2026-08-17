import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Guide } from '../models/guide';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private api: ApiService) {}

  getGuides(): Observable<Guide[]> {
    return this.api.get<Guide[]>('guides');
  }

  getGuideById(id: number): Observable<Guide> {
    return this.api.get<Guide>(`guides/${id}`);
  }
}