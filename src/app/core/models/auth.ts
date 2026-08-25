// ── Requests ──────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: 'Tourist' | 'Guide';
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

// ── Responses ─────────────────────────────────────────────

// الـ Backend بيبعت flat object مباشرة
export interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
  role: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}