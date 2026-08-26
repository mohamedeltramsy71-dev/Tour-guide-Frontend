export interface InitiatePaymentRequest {
  bookingId: number;
}

export interface InitiatePaymentResponse {
  paymentKey: string;
  paymobOrderId: string;
  amount: number;
}

export interface PaymentStatusDto {
  id: number;
  bookingId: number;
  amount: number;
  status: string;
  paymobOrderId?: string;
  paymobTransactionId?: string;
  createdAt: string;
}