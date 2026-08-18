import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register-select',
  imports: [RouterLink],
  templateUrl: './register-select.html',
  styleUrl: './register-select.scss'
})
export class RegisterSelect {

  constructor(private router: Router) {}

  goToTourist() {
    this.router.navigate(['/auth/register/tourist']);
  }

  goToGuide() {
    this.router.navigate(['/auth/register/guide']);
  }
}