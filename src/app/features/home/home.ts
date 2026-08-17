import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../core/services/city';
import { PackageService } from '../../core/services/package';
import { City } from '../../core/models/city';
import { Package } from '../../core/models/package';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  trendingCities: City[] = [];
  featuredPackages: Package[] = [];
  allCities: City[] = [];

  activeTab: 'packages' | 'landmarks' | 'guides' = 'packages';
  selectedCity = '';
  selectedDate = '';
  selectedPersons = '2';

  constructor(
    private cityService: CityService,
    private packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityService.getTrendingCities().subscribe(data => this.trendingCities = data);
    this.packageService.getPackages().subscribe(data => this.featuredPackages = data.slice(0, 4));
    this.cityService.getCities().subscribe(data => this.allCities = data);
  }

  setTab(tab: 'packages' | 'landmarks' | 'guides') {
    this.activeTab = tab;
  }

  onSearch() {
    const params: any = {};
    if (this.selectedCity) params['city'] = this.selectedCity;
    if (this.selectedDate) params['date'] = this.selectedDate;
    if (this.selectedPersons) params['persons'] = this.selectedPersons;

    this.router.navigate([`/${this.activeTab}`], { queryParams: params });
  }
}