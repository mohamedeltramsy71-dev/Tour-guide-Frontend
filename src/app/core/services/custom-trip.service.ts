import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import {
    AvailableGuidesRequest,
    CalculatePriceRequest,
    CalculatePriceResponse,
    CreateCustomTripRequest
} from '../models/custom-trip';
import { Guide } from '../models/guide';

@Injectable({ providedIn: 'root' })
export class CustomTripService {
    private api = inject(ApiService);

    calculatePrice(request: CalculatePriceRequest): Observable<CalculatePriceResponse> {
        return this.api.post<CalculatePriceResponse>('custom-trips/calculate', request);
    }

    getAvailableGuides(request: AvailableGuidesRequest): Observable<Guide[]> {
        return this.api.post<Guide[]>('custom-trips/available-guides', request);
    }

    createCustomTrip(request: CreateCustomTripRequest): Observable<{ bookingId: number; message: string }> {
        return this.api.post<{ bookingId: number; message: string }>('custom-trips', request);
    }
}