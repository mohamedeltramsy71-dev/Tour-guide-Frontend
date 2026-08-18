import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { environment } from '../../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  isGoogleLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.initGoogleAuth();
  }

  initGoogleAuth() {
    // ننتظر الـ Google script يتحمل
    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(interval);
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (response: any) => {
            this.ngZone.run(() => this.handleGoogleResponse(response));
          }
        });
      }
    }, 100);
  }

  handleGoogleResponse(response: any) {
    this.isGoogleLoading = true;
    this.errorMessage = '';

    this.authService.googleLogin({ idToken: response.credential }).subscribe({
      next: (res) => {
        this.isGoogleLoading = false;
        this.navigateByRole(res.role);
      },
      error: (err) => {
        this.isGoogleLoading = false;
        this.errorMessage = err.error?.message || 'Google login failed. Please try again.';
      }
    });
  }

  onGoogleLogin() {
    if (typeof google !== 'undefined') {
      google.accounts.id.prompt();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.navigateByRole(res.role);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password';
      }
    });
  }

  private navigateByRole(role: string) {
    if (role === 'Admin') this.router.navigate(['/admin']);
    else if (role === 'Guide') this.router.navigate(['/guide-dashboard']);
    else this.router.navigate(['/']);
  }
}