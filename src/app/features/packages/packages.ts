import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../core/services/package';
import { CityService } from '../../core/services/city';
import { Package } from '../../core/models/package';
import { City } from '../../core/models/city';

@Component({
  selector: 'app-packages',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './packages.html',
  styleUrl: './packages.scss'
})
export class Packages implements OnInit {

  packages: Package[] = [];
  filteredPackages: Package[] = [];
  cities: City[] = [];
  isLoading = true;
  currentSlide = 0;

  // Filters
  searchQuery = '';
  selectedCity = '';
  selectedDuration = '';
  maxPrice = '';

  // Compare
  compareList: Package[] = [];
  showCompare = false;

  durations = [
    { label: '1 Day', value: '1' },
    { label: '2-3 Days', value: '3' },
    { label: '4-5 Days', value: '5' },
    { label: '6+ Days', value: '6' },
  ];

  slides = [
    { image: 'images/cities/slide1.jpg', title: 'Cairo Wonders', subtitle: 'Explore the Pharaohs legacy' },
    { image: 'images/cities/slide2.jpg', title: 'Red Sea Adventures', subtitle: 'Discover underwater paradise' },
    { image: 'images/cities/slide3.jpg', title: 'Luxor Temples', subtitle: 'Walk through ancient history' },
    { image: 'images/cities/slide4.jpg', title: 'Alexandria Tours', subtitle: 'Experience Mediterranean beauty' },
    { image: 'images/cities/slide5.jpg', title: 'Desert Safari', subtitle: 'Adventure in the golden sands' },
  ];

  constructor(
    private packageService: PackageService,
    private cityService: CityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.route.queryParams.subscribe(params => {
      if (params['city']) this.selectedCity = params['city'];
      this.loadPackages();
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

  loadPackages() {
    this.isLoading = true;
    const params: any = {};
    if (this.selectedCity) params['cityId'] = this.selectedCity;
    if (this.maxPrice) params['maxPrice'] = this.maxPrice;

    this.packageService.getPackages(params).subscribe(data => {
      this.packages = data;
      this.applyLocalFilters();
      this.isLoading = false;
    });
  }

  applyLocalFilters() {
    let result = [...this.packages];

    if (this.searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedDuration) {
      const days = parseInt(this.selectedDuration);
      if (days === 1) result = result.filter(p => p.durationDays === 1);
      else if (days === 3) result = result.filter(p => p.durationDays >= 2 && p.durationDays <= 3);
      else if (days === 5) result = result.filter(p => p.durationDays >= 4 && p.durationDays <= 5);
      else result = result.filter(p => p.durationDays >= 6);
    }

    this.filteredPackages = result;
  }

  onFilterChange() {
    this.applyLocalFilters();
  }

  onServerFilterChange() {
    this.loadPackages();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCity = '';
    this.selectedDuration = '';
    this.maxPrice = '';
    this.loadPackages();
  }

  toggleCompare(pkg: Package) {
    const index = this.compareList.findIndex(p => p.id === pkg.id);
    if (index > -1) {
      this.compareList.splice(index, 1);
    } else {
      if (this.compareList.length < 3) {
        this.compareList.push(pkg);
      }
    }
  }

  isInCompare(pkg: Package): boolean {
    return this.compareList.some(p => p.id === pkg.id);
  }

  clearCompare() {
    this.compareList = [];
  }
}