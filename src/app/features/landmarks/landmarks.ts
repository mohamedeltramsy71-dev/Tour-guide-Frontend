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

  landmarks: Landmark[] = [];
  cities: City[] = [];
  isLoading = true;

  // Filters
  searchQuery = '';
  selectedCity = '';
  selectedCategory = '';

  categories = [
    'Historical', 'Entertainment', 'Nature', 'Religious', 'Beach', 'Museum'
  ];

  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe(data => this.cities = data);

    this.route.queryParams.subscribe(params => {
      if (params['city']) this.selectedCity = params['city'];
      this.loadLandmarks();
    });
  }

  loadLandmarks() {
    this.isLoading = true;
    const params: any = {};
    if (this.selectedCity) params['cityId'] = this.selectedCity;
    if (this.selectedCategory) params['category'] = this.selectedCategory;
    if (this.searchQuery) params['search'] = this.searchQuery;

    this.landmarkService.getLandmarks(params).subscribe(data => {
      this.landmarks = data;
      this.isLoading = false;
    });
  }

  onFilterChange() {
    this.loadLandmarks();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCity = '';
    this.selectedCategory = '';
    this.loadLandmarks();
  }

  getCategoryIcon(category: string): string {
    const icons: any = {
      'Historical': 'fas fa-monument',
      'Entertainment': 'fas fa-theater-masks',
      'Nature': 'fas fa-leaf',
      'Religious': 'fas fa-mosque',
      'Beach': 'fas fa-umbrella-beach',
      'Museum': 'fas fa-museum'
    };
    return icons[category] || 'fas fa-map-marker-alt';
  }
}