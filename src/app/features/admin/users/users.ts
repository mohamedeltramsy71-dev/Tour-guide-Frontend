import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { UserDto, PaginatedUsersRequest } from '../../../core/models/admin';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: UserDto[] = [];
  loading = true;
  error = false;

  // Filters
  search = '';
  roleFilter = '';
  bannedFilter = '';

  // Pagination (client-side)
  page = 1;
  pageSize = 10;

  // Modal
  selectedUser: UserDto | null = null;
  modalAction: 'ban' | 'delete' | null = null;
  actionLoading = false;
  actionSuccess = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = false;
    const req: PaginatedUsersRequest = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search || undefined,
      role: this.roleFilter || undefined,
      isBanned: this.bannedFilter === '' ? undefined : this.bannedFilter === 'true',
    };
    this.adminService.getAllUsers(req).subscribe({
      next: (data) => { this.users = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }

  onSearch(): void {
    this.page = 1;
    this.loadUsers();
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadUsers();
  }

  clearFilters(): void {
    this.search = '';
    this.roleFilter = '';
    this.bannedFilter = '';
    this.page = 1;
    this.loadUsers();
  }

  // ── Modal ──────────────────────────────────────────────────────────────────

  openBanModal(user: UserDto): void {
    this.selectedUser = user;
    this.modalAction = 'ban';
    this.actionSuccess = '';
  }

  openDeleteModal(user: UserDto): void {
    this.selectedUser = user;
    this.modalAction = 'delete';
    this.actionSuccess = '';
  }

  closeModal(): void {
    this.selectedUser = null;
    this.modalAction = null;
    this.actionLoading = false;
    this.actionSuccess = '';
  }

  confirmAction(): void {
    if (!this.selectedUser) return;
    this.actionLoading = true;

    if (this.modalAction === 'ban') {
      this.adminService.toggleBan(this.selectedUser.id).subscribe({
        next: () => {
          this.actionLoading = false;
          this.actionSuccess = this.selectedUser!.isBanned ? 'User unbanned successfully.' : 'User banned successfully.';
          this.loadUsers();
          setTimeout(() => this.closeModal(), 1200);
        },
        error: () => { this.actionLoading = false; },
      });
    } else if (this.modalAction === 'delete') {
      this.adminService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          this.actionLoading = false;
          this.actionSuccess = 'User deleted successfully.';
          this.loadUsers();
          setTimeout(() => this.closeModal(), 1200);
        },
        error: () => { this.actionLoading = false; },
      });
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin':   return 'badge-admin';
      case 'Guide':   return 'badge-guide';
      default:        return 'badge-tourist';
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}