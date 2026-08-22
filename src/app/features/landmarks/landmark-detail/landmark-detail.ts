import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LandmarkService } from '../../../core/services/landmark';
import { Landmark } from '../../../core/models/landmark';

@Component({
  selector: 'app-landmark-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landmark-detail.html',
  styleUrl: './landmark-detail.scss'
})
export class LandmarkDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private landmarkService = inject(LandmarkService);

  landmark = signal<Landmark | null>(null);
  loading = signal(true);
  activeImage = signal(0);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.landmarkService.getLandmarkById(id).subscribe({
      next: (lm) => {
        this.landmark.set(lm);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/landmarks']);
      }
    });
  }

  setActiveImage(index: number) {
    this.activeImage.set(index);
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  }
}