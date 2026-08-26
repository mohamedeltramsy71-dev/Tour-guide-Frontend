import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/18vrCUw71K/?mibextid=wwXIfr',
      icon: 'fab fa-facebook-f',
      color: '#1877F2',
      bg: 'rgba(24,119,242,0.12)',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mo_fullstack?igsh=MWQyaWFiaXd6aTh0aw%3D%3D&utm_source=qr',
      icon: 'fab fa-instagram',
      gradient: true,
      color: '#E1306C',
      bg: 'rgba(225,48,108,0.12)',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohamed-eltramsy-0604ab320?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      icon: 'fab fa-linkedin-in',
      color: '#0A66C2',
      bg: 'rgba(10,102,194,0.12)',
    },
  ];

  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Cities', path: '/cities' },
    { label: 'Landmarks', path: '/landmarks' },
    { label: 'Packages', path: '/packages' },
    { label: 'Guides', path: '/guides' },
    { label: 'About', path: '/about' },
  ];
}