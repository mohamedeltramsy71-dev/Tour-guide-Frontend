import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api';

interface CategoryDto {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: CategoryDto[] = [];
  loading = true;
  error   = false;

  newName    = '';
  addLoading = false;
  addError   = '';

  deleteTarget: CategoryDto | null = null;
  deleteLoading = false;
  deleteSuccess = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error   = false;
    this.api.get<CategoryDto[]>('categories').subscribe({
      next: (data) => { this.categories = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }

  addCategory(): void {
    if (!this.newName.trim()) { this.addError = 'Please enter a category name.'; return; }
    this.addLoading = true;
    this.addError   = '';
    this.api.post<CategoryDto>('categories', { name: this.newName.trim() }).subscribe({
      next: (cat) => {
        this.categories = [...this.categories, cat].sort((a, b) => a.name.localeCompare(b.name));
        this.newName    = '';
        this.addLoading = false;
      },
      error: (err) => {
        this.addLoading = false;
        this.addError   = err?.error?.message || 'Failed to add category.';
      },
    });
  }

  openDelete(cat: CategoryDto): void {
    this.deleteTarget  = cat;
    this.deleteSuccess = '';
  }

  closeModal(): void {
    this.deleteTarget  = null;
    this.deleteLoading = false;
    this.deleteSuccess = '';
  }

  confirmDelete(): void {
    if (!this.deleteTarget) return;
    this.deleteLoading = true;
    this.api.delete<void>(`categories/${this.deleteTarget.id}`).subscribe({
      next: () => {
        this.categories    = this.categories.filter(c => c.id !== this.deleteTarget!.id);
        this.deleteSuccess = 'Category deleted.';
        this.deleteLoading = false;
        setTimeout(() => this.closeModal(), 1000);
      },
      error: () => { this.deleteLoading = false; },
    });
  }
}