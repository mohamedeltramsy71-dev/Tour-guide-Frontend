import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentService } from '../../core/services/payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss'
})
export class PaymentComponent implements OnInit {
  loading = signal(true);
  error = signal<string | null>(null);
  iframeUrl = signal<SafeResourceUrl | null>(null);
  amount = signal(0);

  private readonly IFRAME_BASE =
    `https://accept.paymob.com/api/acceptance/iframes/${environment.paymobIframeId}?payment_token=`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.queryParamMap.get('bookingId'));

    if (!bookingId) {
      this.error.set('Invalid booking ID. Please go back and try again.');
      this.loading.set(false);
      return;
    }

    this.initiatePayment(bookingId);
  }

  private initiatePayment(bookingId: number): void {
    this.paymentService.initiatePayment({ bookingId }).subscribe({
      next: (res) => {
        this.amount.set(res.amount);
        const url = this.IFRAME_BASE + res.paymentKey;
        this.iframeUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(url)
        );
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err?.error?.message || 'Could not initiate payment. Please try again.'
        );
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/bookings']);
  }
}