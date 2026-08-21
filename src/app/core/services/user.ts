import { Injectable, inject } from '@angular/core';
import { ApiService } from './api';
import { UserDto, UpdateProfileRequest, ChangePasswordRequest, AvatarResponse } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = inject(ApiService);

  getMyProfile(): Observable<UserDto> {
    return this.api.get<UserDto>('users/me');
  }

  updateMyProfile(request: UpdateProfileRequest): Observable<UserDto> {
    return this.api.put<UserDto>('users/me', request);
  }

  uploadAvatar(file: File): Observable<AvatarResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.api.putForm<AvatarResponse>('users/me/avatar', formData);
  }

  changePassword(request: ChangePasswordRequest): Observable<{ message: string }> {
    return this.api.post<{ message: string }>('auth/change-password', request);
  }
}