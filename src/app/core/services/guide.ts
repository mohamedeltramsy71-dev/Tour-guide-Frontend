import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Guide, GuideProfile, UpdateGuideRequest } from '../models/guide';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private api: ApiService) {}

  getGuides(): Observable<Guide[]> {
    return this.api.get<Guide[]>('guides');
  }

  getGuideById(id: string): Observable<GuideProfile> {
    return this.api.get<GuideProfile>(`guides/${id}`);
  }

  getMyProfile(): Observable<GuideProfile> {
    return this.api.get<GuideProfile>('guides/me');
  }

  updateMyProfile(request: UpdateGuideRequest): Observable<GuideProfile> {
    return this.api.put<GuideProfile>('guides/me', request);
  }
}