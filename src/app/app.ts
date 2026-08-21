import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showNavbar = true;
  title = 'rihla';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        const role = this.authService.getRole();
        const isAdminUser = role === 'Admin';
        const isGuideUser = role === 'Guide';
        const isAuthPage = url.startsWith('/auth');
        const isAdminPage = url.startsWith('/admin');
        const isGuidePage = url.startsWith('/guide');

        this.showNavbar = !isAuthPage && !isAdminPage && !isAdminUser && !isGuidePage && !isGuideUser;
      }
    });
  }
}