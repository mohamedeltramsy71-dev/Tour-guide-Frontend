import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  steps = [
    {
      icon: 'fas fa-search',
      title: 'Browse Packages & Guides',
      description: 'Explore curated travel packages and certified local guides across Egypt\'s most iconic destinations.',
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Book Your Trip',
      description: 'Choose your dates, select your package, and confirm your booking in just a few clicks.',
    },
    {
      icon: 'fas fa-star',
      title: 'Explore & Review',
      description: 'Experience Egypt with a trusted local guide and share your journey with the community.',
    },
  ];

  features = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Verified Local Guides',
      description: 'Every guide on Rihla is reviewed and approved by our team to ensure quality and safety.',
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: 'Rich Landmark Database',
      description: 'Discover hundreds of landmarks across Egypt\'s cities with detailed info and photos.',
    },
    {
      icon: 'fas fa-comments',
      title: 'Real-time Chat',
      description: 'Communicate directly with your guide before and during your trip via our built-in chat.',
    },
    {
      icon: 'fas fa-lock',
      title: 'Secure Payment',
      description: 'Book with confidence using our secure, encrypted payment powered by Paymob.',
    },
  ];
}