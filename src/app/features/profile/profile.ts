import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../core/services/user';
import { AuthService } from '../../core/services/auth';
import { UserDto } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private location = inject(Location);
  private fb = inject(FormBuilder);

  user = signal<UserDto | null>(null);
  avatarPreview = signal<string>('');
  activeTab = signal<'info' | 'password'>('info');
  loading = signal(false);
  avatarLoading = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  profileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phone: [''],
    bio: ['']
  });

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getMyProfile().subscribe({
      next: (user) => {
        this.user.set(user);
        this.avatarPreview.set(user.avatarUrl ?? '');
        this.profileForm.patchValue({
          fullName: user.fullName,
          phone: user.phone ?? '',
          bio: user.bio ?? ''
        });
      }
    });
  }

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => this.avatarPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);

    this.avatarLoading.set(true);
    this.userService.uploadAvatar(file).subscribe({
      next: (res) => {
        this.avatarLoading.set(false);
        this.avatarPreview.set(res.avatarUrl);
        this.user.update(u => u ? { ...u, avatarUrl: res.avatarUrl } : u);
        this.authService.updateAvatarInStorage(res.avatarUrl);
        this.showSuccess('Avatar updated successfully');
      },
      error: () => {
        this.avatarLoading.set(false);
        this.showError('Failed to upload avatar');
      }
    });
  }

  onUpdateProfile() {
    if (this.profileForm.invalid) return;
    this.loading.set(true);
    this.clearMessages();

    const { fullName, phone, bio } = this.profileForm.value;

    this.userService.updateMyProfile({
      fullName: fullName!,
      phone: phone || undefined,
      bio: bio || undefined
    }).subscribe({
      next: (user) => {
        this.loading.set(false);
        this.user.set(user);
        this.showSuccess('Profile updated successfully');
      },
      error: () => {
        this.loading.set(false);
        this.showError('Failed to update profile');
      }
    });
  }

  onChangePassword() {
    if (this.passwordForm.invalid) return;
    this.loading.set(true);
    this.clearMessages();

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.userService.changePassword({
      currentPassword: currentPassword!,
      newPassword: newPassword!
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.passwordForm.reset();
        this.showSuccess('Password changed successfully');
      },
      error: (err) => {
        this.loading.set(false);
        this.showError(err?.error?.message ?? 'Current password is incorrect');
      }
    });
  }

  goBack() {
    this.location.back();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPass = control.get('newPassword')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return newPass === confirm ? null : { mismatch: true };
  }

  setTab(tab: 'info' | 'password') {
    this.activeTab.set(tab);
    this.clearMessages();
  }

  private showSuccess(msg: string) {
    this.successMsg.set(msg);
    setTimeout(() => this.successMsg.set(''), 3000);
  }

  private showError(msg: string) {
    this.errorMsg.set(msg);
    setTimeout(() => this.errorMsg.set(''), 4000);
  }

  private clearMessages() {
    this.successMsg.set('');
    this.errorMsg.set('');
  }

  getInitials(): string {
    const name = this.user()?.fullName ?? '';
    return name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase();
  }
}