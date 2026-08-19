import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

type State = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirm-email.html',
  styleUrls: ['./confirm-email.scss'],
})
export class ConfirmEmail implements OnInit {
  state: State = 'loading';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token  = this.route.snapshot.queryParamMap.get('token');

    if (!userId || !token) {
      this.state   = 'error';
      this.message = 'Invalid or missing confirmation link.';
      return;
    }

    this.authService.confirmEmail(userId, token).subscribe({
      next: () => {
        this.state   = 'success';
        this.message = 'Your email has been confirmed! You can now log in.';
      },
      error: (err) => {
        this.state   = 'error';
        this.message = err?.error?.message || 'Confirmation failed. The link may be expired or already used.';
      },
    });
  }
}