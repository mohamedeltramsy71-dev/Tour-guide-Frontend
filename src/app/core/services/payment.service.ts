import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import {
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  PaymentStatusDto
} from '../models/payment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private api: ApiService) {}

  initiatePayment(request: InitiatePaymentRequest): Observable<InitiatePaymentResponse> {
    return this.api.post<InitiatePaymentResponse>('payments/initiate', request);
  }

  getPaymentStatus(bookingId: number): Observable<PaymentStatusDto> {
    return this.api.get<PaymentStatusDto>(`payments/${bookingId}`);
  }
}