import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import {
  DashboardSummaryDto,
  BookingsReportDto,
  RevenueReportDto,
  TopCityDto,
  TopLandmarkDto,
  GuidePerformanceDto,
  UserGrowthDto,
} from '../../../core/models/admin';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class AdminDashboardComponent implements OnInit {
  loading = true;
  error = false;

  summary: DashboardSummaryDto | null = null;
  bookingsReport: BookingsReportDto | null = null;
  revenueReport: RevenueReportDto | null = null;
  topCities: TopCityDto[] = [];
  topLandmarks: TopLandmarkDto[] = [];
  guidePerformance: GuidePerformanceDto[] = [];
  userGrowth: UserGrowthDto | null = null;

  bookingsPeriod: 'daily' | 'monthly' = 'daily';
  revenuePeriod: 'daily' | 'monthly' = 'monthly';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = false;

    forkJoin({
      summary:         this.adminService.getDashboardSummary(),
      bookings:        this.adminService.getBookingsReport(this.bookingsPeriod),
      revenue:         this.adminService.getRevenueReport(this.revenuePeriod),
      topCities:       this.adminService.getTopCities(5),
      topLandmarks:    this.adminService.getTopLandmarks(5),
      guidePerf:       this.adminService.getGuidePerformance(),
      userGrowth:      this.adminService.getUserGrowth('monthly'),
    }).subscribe({
      next: (data) => {
        this.summary         = data.summary;
        this.bookingsReport  = data.bookings;
        this.revenueReport   = data.revenue;
        this.topCities       = data.topCities;
        this.topLandmarks    = data.topLandmarks;
        this.guidePerformance = data.guidePerf;
        this.userGrowth      = data.userGrowth;
        this.loading         = false;
      },
      error: () => {
        this.error   = true;
        this.loading = false;
      },
    });
  }

  setBookingsPeriod(p: 'daily' | 'monthly'): void {
    this.bookingsPeriod = p;
    this.adminService.getBookingsReport(p).subscribe(r => this.bookingsReport = r);
  }

  setRevenuePeriod(p: 'daily' | 'monthly'): void {
    this.revenuePeriod = p;
    this.adminService.getRevenueReport(p).subscribe(r => this.revenueReport = r);
  }

  // Bar chart height helper (max 120px)
  barHeight(value: number, max: number): string {
    if (!max) return '4px';
    return Math.max(4, (value / max) * 120) + 'px';
  }

  get maxBookings(): number {
    return Math.max(...(this.bookingsReport?.items.map(i => i.count) ?? [1]));
  }

  get maxRevenue(): number {
    return Math.max(...(this.revenueReport?.items.map(i => i.amount) ?? [1]));
  }

  get maxUserGrowth(): number {
    return Math.max(...(this.userGrowth?.items.map(i => i.newUsers) ?? [1]));
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  }
}