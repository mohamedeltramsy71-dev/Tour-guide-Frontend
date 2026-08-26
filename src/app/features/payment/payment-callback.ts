import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-callback.html',
  styleUrl: './payment-callback.scss'
})
export class PaymentCallbackComponent implements OnInit {
  success = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Paymob بيبعت success=true أو false في الـ query params
    const successParam = this.route.snapshot.queryParamMap.get('success');
    this.success.set(successParam === 'true');
  }

  goToBookings(): void {
    this.router.navigate(['/bookings']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}