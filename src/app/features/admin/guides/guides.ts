import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { GuideService } from '../../../core/services/guide';
import { Guide } from '../../../core/models/guide';

type Tab = 'pending' | 'all';
type ModalAction = 'approve' | 'reject' | 'suspend' | null;

@Component({
  selector: 'app-admin-guides',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guides.html',
  styleUrls: ['./guides.scss'],
})
export class AdminGuidesComponent implements OnInit {
  activeTab: Tab = 'pending';

  pendingGuides: Guide[] = [];
  allGuides: Guide[]    = [];

  loadingPending = true;
  loadingAll     = true;
  errorPending   = false;
  errorAll       = false;

  // Modal
  selectedGuide: Guide | null = null;
  modalAction: ModalAction    = null;
  rejectReason                = '';
  actionLoading               = false;
  actionSuccess               = '';
  actionError                 = '';

  constructor(
    private adminService: AdminService,
    private guideService: GuideService,
  ) {}

  ngOnInit(): void {
    this.loadPending();
    this.loadAll();
  }

  // ── Load ───────────────────────────────────────────────────────────────────

  loadPending(): void {
    this.loadingPending = true;
    this.errorPending   = false;
    this.adminService.getPendingGuides().subscribe({
      next: (data) => { this.pendingGuides = data; this.loadingPending = false; },
      error: ()    => { this.errorPending  = true;  this.loadingPending = false; },
    });
  }

  loadAll(): void {
    this.loadingAll = true;
    this.errorAll   = false;
    this.guideService.getGuides().subscribe({
      next: (data) => { this.allGuides = data; this.loadingAll = false; },
      error: ()    => { this.errorAll  = true; this.loadingAll = false; },
    });
  }

  setTab(tab: Tab): void {
    this.activeTab = tab;
  }

  // ── Modals ─────────────────────────────────────────────────────────────────

  openModal(guide: Guide, action: ModalAction): void {
    this.selectedGuide = guide;
    this.modalAction   = action;
    this.rejectReason  = '';
    this.actionSuccess = '';
    this.actionError   = '';
  }

  closeModal(): void {
    this.selectedGuide = null;
    this.modalAction   = null;
    this.actionLoading = false;
    this.actionSuccess = '';
    this.actionError   = '';
  }

  confirmAction(): void {
    if (!this.selectedGuide || !this.modalAction) return;

    if (this.modalAction === 'reject' && !this.rejectReason.trim()) {
      this.actionError = 'Please enter a rejection reason.';
      return;
    }

    this.actionLoading = true;
    this.actionError   = '';

    const id = this.selectedGuide.userId;

    const obs =
      this.modalAction === 'approve' ? this.adminService.approveGuide(id) :
      this.modalAction === 'reject'  ? this.adminService.rejectGuide(id, this.rejectReason) :
                                       this.adminService.suspendGuide(id);

    obs.subscribe({
      next: () => {
        this.actionLoading = false;
        this.actionSuccess =
          this.modalAction === 'approve' ? 'Guide approved successfully.' :
          this.modalAction === 'reject'  ? 'Guide rejected successfully.' :
                                           'Guide suspend status updated.';
        this.loadPending();
        this.loadAll();
        setTimeout(() => this.closeModal(), 1400);
      },
      error: () => {
        this.actionLoading = false;
        this.actionError   = 'Something went wrong. Please try again.';
      },
    });
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}