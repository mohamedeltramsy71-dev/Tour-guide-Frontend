import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CityService } from '../../../core/services/city';
import { LandmarkService } from '../../../core/services/landmark';
import { City } from '../../../core/models/city';
import { Landmark } from '../../../core/models/landmark';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './city-detail.html',
  styleUrl: './city-detail.scss'
})
export class CityDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cityService = inject(CityService);
  private landmarkService = inject(LandmarkService);

  city = signal<City | null>(null);
  landmarks = signal<Landmark[]>([]);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cityService.getCityById(id).subscribe({
      next: (city) => {
        this.city.set(city);
        this.loadLandmarks(id);
      },
      error: () => this.router.navigate(['/cities'])
    });
  }

  loadLandmarks(cityId: number) {
    this.landmarkService.getLandmarks({ cityId: cityId.toString() }).subscribe({
      next: (landmarks) => {
        this.landmarks.set(landmarks);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}