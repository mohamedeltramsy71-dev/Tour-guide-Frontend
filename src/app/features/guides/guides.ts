import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GuideService } from '../../core/services/guide';
import { Guide } from '../../core/models/guide';

@Component({
  selector: 'app-guides',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './guides.html',
  styleUrl: './guides.scss'
})
export class Guides implements OnInit {

  guides: Guide[] = [];
  filteredGuides: Guide[] = [];
  isLoading = true;
  currentSlide = 0;

  searchQuery = '';
  selectedCity = '';
  selectedLanguage = '';
  availableOnly = false;

  cities: string[] = [];
  languages: string[] = [];

  slides = [
    { image: 'images/cities/slide1.jpg', title: 'Expert Local Guides', subtitle: 'Travel with certified professionals' },
    { image: 'images/cities/slide3.jpg', title: 'Authentic Experiences', subtitle: 'Discover Egypt through local eyes' },
    { image: 'images/cities/slide5.jpg', title: 'Your Perfect Journey', subtitle: 'Personalized tours just for you' },
  ];

  constructor(private guideService: GuideService) {}

  ngOnInit(): void {
    this.guideService.getGuides().subscribe(data => {
      this.guides = data;
      this.filteredGuides = data;
      this.extractFilters(data);
      this.isLoading = false;
    });
    this.startSlider();
  }

  extractFilters(guides: Guide[]) {
    const citiesSet = new Set<string>();
    const langsSet = new Set<string>();
    guides.forEach(g => {
      g.coveredCities?.forEach(c => citiesSet.add(c));
      g.languages?.forEach(l => langsSet.add(l));
    });
    this.cities = Array.from(citiesSet);
    this.languages = Array.from(langsSet);
  }

  startSlider() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  onFilterChange() {
    let result = [...this.guides];

    if (this.searchQuery) {
      result = result.filter(g =>
        g.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedCity) {
      result = result.filter(g => g.coveredCities?.includes(this.selectedCity));
    }

    if (this.selectedLanguage) {
      result = result.filter(g => g.languages?.includes(this.selectedLanguage));
    }

    if (this.availableOnly) {
      result = result.filter(g => g.isAvailable);
    }

    this.filteredGuides = result;
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCity = '';
    this.selectedLanguage = '';
    this.availableOnly = false;
    this.filteredGuides = [...this.guides];
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}