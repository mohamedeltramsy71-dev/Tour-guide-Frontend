import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LandmarkService } from '../../core/services/landmark';
import { CityService } from '../../core/services/city';
import { Landmark } from '../../core/models/landmark';
import { City } from '../../core/models/city';

@Component({
  selector: 'app-landmarks',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './landmarks.html',
  styleUrl: './landmarks.scss'
})
export class Landmarks implements OnInit {

  // كل البيانات من الـ API
  allLandmarks: Landmark[] = [];

  // اللي بيتعرض في الصفحة الحالية بس
  landmarks: Landmark[] = [];

  cities: City[] = [];
  isLoading = true;
  currentSlide = 0;

  // Filters
  searchQuery = '';
  selectedCity = '';
  selectedCategory = '';

  // Pagination
  currentPage = 1;
  readonly pageSize = 100;

  categories = [
    'Historical', 'Entertainment', 'Nature', 'Religious', 'Beach', 'Museum'
  ];

  slides = [
    { image: 'images/cities/slide1.jpg', title: 'Ancient Wonders',     subtitle: "Explore Egypt's timeless monuments" },
    { image: 'images/cities/slide2.jpg', title: 'Coastal Beauty',      subtitle: 'Discover stunning Red Sea destinations' },
    { image: 'images/cities/slide3.jpg', title: 'Sacred Temples',      subtitle: 'Walk through ancient history' },
    { image: 'images/cities/slide4.jpg', title: 'Mediterranean Magic', subtitle: "Experience Alexandria's heritage" },
    { image: 'images/cities/slide5.jpg', title: 'Desert Adventures',   subtitle: 'Explore golden sand landscapes' },
  ];

  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityService.getCities(1, 100).subscribe(data => this.cities = data);
    this.route.queryParams.subscribe(params => {
      if (params['city']) this.selectedCity = params['city'];
      this.loadLandmarks();
    });
    this.startSlider();
  }

  // ─── Computed ────────────────────────────────────────────────

  get totalCount(): number {
    return this.allLandmarks.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get startIndex(): number {
    return this.totalCount === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(2, this.currentPage - 2);
    const end   = Math.min(this.totalPages - 1, this.currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // ─── Slider ──────────────────────────────────────────────────

  startSlider() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 3000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // ─── Data ────────────────────────────────────────────────────

  loadLandmarks() {
    this.isLoading = true;

    const params: any = {};
    if (this.selectedCity)     params['cityId']   = this.selectedCity;
    if (this.selectedCategory) params['category'] = this.selectedCategory;
    if (this.searchQuery)      params['search']   = this.searchQuery;

    this.landmarkService.getLandmarks(params).subscribe(data => {
      this.allLandmarks = data;
      this.applyPage();
      this.isLoading = false;
    });
  }

  applyPage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end   = start + this.pageSize;
    this.landmarks = this.allLandmarks.slice(start, end);
  }

  // ─── Pagination ──────────────────────────────────────────────

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.applyPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Filters ─────────────────────────────────────────────────

  onFilterChange() {
    this.currentPage = 1;
    this.loadLandmarks();
  }

  clearFilters() {
    this.searchQuery      = '';
    this.selectedCity     = '';
    this.selectedCategory = '';
    this.currentPage      = 1;
    this.loadLandmarks();
  }

  // ─── Helpers ─────────────────────────────────────────────────

  getCategoryIcon(category: string): string {
    const icons: any = {
      'Historical':    'fas fa-monument',
      'Entertainment': 'fas fa-theater-masks',
      'Nature':        'fas fa-leaf',
      'Religious':     'fas fa-mosque',
      'Beach':         'fas fa-umbrella-beach',
      'Museum':        'fas fa-museum'
    };
    return icons[category] || 'fas fa-map-marker-alt';
  }
}