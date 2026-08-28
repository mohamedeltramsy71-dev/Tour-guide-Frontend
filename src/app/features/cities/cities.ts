import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../core/services/city';
import { City } from '../../core/models/city';

@Component({
  selector: 'app-cities',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cities.html',
  styleUrl: './cities.scss'
})
export class Cities implements OnInit {

  cities: City[] = [];
  filteredCities: City[] = [];
  searchQuery = '';
  currentSlide = 0;

  slides = [
    { image: 'images/cities/slide1.jpg', title: 'Ancient Wonders', subtitle: 'Explore the Pharaohs legacy' },
    { image: 'images/cities/slide2.jpg', title: 'Red Sea Diving', subtitle: 'Discover underwater paradise' },
    { image: 'images/cities/slide3.jpg', title: 'Luxor Temples', subtitle: 'Walk through ancient history' },
    { image: 'images/cities/slide4.jpg', title: 'Mediterranean Coast', subtitle: 'Experience Alexandria beauty' },
    { image: 'images/cities/slide5.jpg', title: 'Desert Safari', subtitle: 'Adventure in the golden sands' },
  ];

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.getCities(1, 100).subscribe(data => {
      this.cities = data;
      this.filteredCities = data;
    });
    this.startSlider();
  }

  startSlider() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  onSearch() {
    const q = this.searchQuery.toLowerCase();
    this.filteredCities = this.cities.filter(c =>
      c.nameEn.toLowerCase().includes(q) ||
      c.nameAr.includes(this.searchQuery)
    );
  }
}