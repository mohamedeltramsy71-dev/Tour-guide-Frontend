# Rihla — Frontend Progress Tracker
> Angular 19 | Bootstrap 5 | FontAwesome | Clean Architecture

---

## 🌐 Project Info
- **Project Name:** Rihla
- **Framework:** Angular 19 (Standalone Components)
- **Styling:** Bootstrap 5 + SCSS + FontAwesome
- **API:** https://tourguidee.runasp.net/api
- **Local:** http://localhost:4200

---

## 🏗️ Project Structure

```
rihla/
├── public/
│   └── images/
│       ├── logo.png
│       ├── hero.jpg
│       ├── step1.jpg
│       ├── step2.jpg
│       ├── step3.jpg
│       ├── auth/
│       │   └── auth.png
│       └── cities/
│           ├── slide1.jpg
│           ├── slide2.jpg
│           ├── slide3.jpg
│           ├── slide4.jpg
│           └── slide5.jpg
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/
│   │   │   │   └── jwt.interceptor.ts    ✅
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts         ✅
│   │   │   ├── models/
│   │   │   │   ├── city.ts               ✅
│   │   │   │   ├── landmark.ts           ✅
│   │   │   │   ├── package.ts            ✅
│   │   │   │   ├── guide.ts              ✅
│   │   │   │   └── auth.ts               ✅
│   │   │   └── services/
│   │   │       ├── api.ts                ✅
│   │   │       ├── city.ts               ✅
│   │   │       ├── landmark.ts           ✅
│   │   │       ├── package.ts            ✅
│   │   │       ├── guide.ts              ✅
│   │   │       └── auth.ts               ✅
│   │   ├── shared/
│   │   │   └── components/
│   │   │       └── navbar/               ✅
│   │   ├── features/
│   │   │   ├── home/                     ✅
│   │   │   ├── cities/                   ✅
│   │   │   ├── landmarks/                ✅
│   │   │   ├── packages/                 ✅
│   │   │   ├── guides/                   ✅
│   │   │   ├── auth/
│   │   │   │   ├── login/                ✅
│   │   │   │   ├── register-select/      ✅
│   │   │   │   ├── register-tourist/     ✅
│   │   │   │   ├── register-guide/       ✅
│   │   │   │   ├── forgot-password/      ✅
│   │   │   │   └── reset-password/       ✅
│   │   │   ├── profile/                  ⬜
│   │   │   ├── bookings/                 ⬜
│   │   │   ├── payment/                  ⬜
│   │   │   ├── chat/                     ⬜
│   │   │   ├── reviews/                  ⬜
│   │   │   ├── notifications/            ⬜
│   │   │   ├── guide-dashboard/          ⬜
│   │   │   └── admin/                    ⬜
│   │   ├── app.routes.ts                 ✅
│   │   ├── app.config.ts                 ✅
│   │   ├── app.ts                        ✅
│   │   └── app.html                      ✅
│   ├── environments/
│   │   ├── environment.ts                ✅
│   │   └── environment.development.ts    ✅
│   ├── index.html                        ✅
│   ├── styles.scss                       ✅
│   └── main.ts                           ✅
└── angular.json                          ✅
```

---

## 🎨 Design System

### Colors
```scss
:root {
  --primary: #C85C3A;   // أزرار، active links
  --dark: #1A2340;      // headings، footer
  --gold: #D4A853;      // accents
  --light-bg: #FAF8F5;  // خلفية الصفحات
  --text-gray: #6B7280; // subtitles
}
```

### Auth Pages Layout Pattern
- **Login / Register Tourist / Register Guide:** نصف الشاشة صورة (auth.png) على الشمال + form على اليمين (480px)
- **Register Select / Forgot Password / Reset Password:** صورة كاملة (full screen) + overlay + content في المنتصف
- الـ Navbar مش بتظهر في أي صفحة auth

### Auth Image
- المسار: `images/auth/auth.png`
- بتتستخدم في كل صفحات الـ auth

### Navbar — Auth State
- **مش logged in** → Login + Sign Up buttons
- **logged in كـ Tourist** → اسمه + dropdown (Profile, Bookings, Notifications, Logout)
- **logged in كـ Guide** → Dashboard button + dropdown
- **logged in كـ Admin** → Dashboard button + dropdown

---

## ✅ Progress Overview

| # | الصفحة | الحالة | الـ Endpoints |
|---|--------|--------|---------------|
| 01 | Navbar | ✅ Done | — |
| 02 | Home Page | ✅ Done | trending, packages, cities |
| 03 | Cities Page | ✅ Done | GET /api/cities |
| 04 | Landmarks Page | ✅ Done | GET /api/landmarks |
| 05 | Packages Page | ✅ Done | GET /api/packages |
| 06 | Guides Page | ✅ Done | GET /api/guides |
| 07 | Auth — Login | ✅ Done | POST /api/auth/login |
| 08 | Auth — Register Select | ✅ Done | — |
| 09 | Auth — Register Tourist | ✅ Done | POST /api/auth/register |
| 10 | Auth — Register Guide | ✅ Done | POST /api/auth/register |
| 11 | Auth — Forgot Password | ✅ Done | POST /api/auth/forget-password |
| 12 | Auth — Reset Password | ✅ Done | POST /api/auth/reset-password |
| 13 | My Profile | ⬜ Not Started | GET/PUT /api/users/me |
| 14 | City Details | ⬜ Not Started | GET /api/cities/{id} |
| 15 | Landmark Details | ⬜ Not Started | GET /api/landmarks/{id} |
| 16 | Package Details | ⬜ Not Started | GET /api/packages/{id} |
| 17 | Guide Profile (Public) | ⬜ Not Started | GET /api/guides/{id} |
| 18 | Custom Trip Builder | ⬜ Not Started | POST /api/custom-trips/calculate |
| 19 | Book a Package | ⬜ Not Started | POST /api/bookings |
| 20 | My Bookings | ⬜ Not Started | GET /api/bookings/my |
| 21 | Payment | ⬜ Not Started | POST /api/payments/initiate |
| 22 | Chat | ⬜ Not Started | SignalR + /api/chat |
| 23 | Reviews | ⬜ Not Started | POST /api/reviews |
| 24 | Notifications | ⬜ Not Started | GET /api/notifications |
| 25 | Guide Dashboard | ⬜ Not Started | GET /api/bookings/guide |
| 26 | Guide Packages | ⬜ Not Started | GET/POST /api/packages |
| 27 | Admin Dashboard | ⬜ Not Started | GET /api/admin/dashboard |
| 28 | Admin Users | ⬜ Not Started | GET /api/admin/users |
| 29 | Admin Guides | ⬜ Not Started | GET /api/admin/guides/pending |
| 30 | Admin Cities | ⬜ Not Started | GET/POST /api/cities |
| 31 | Admin Landmarks | ⬜ Not Started | GET/POST /api/landmarks |
| 32 | Admin Bookings | ⬜ Not Started | GET /api/admin/bookings |
| 33 | Admin Reviews | ⬜ Not Started | GET /api/admin/reviews |
| 34 | Footer Component | ⬜ Not Started | — |
| 35 | Auth Guard | ✅ Done | — |
| 36 | JWT Interceptor | ✅ Done | — |

---

## 📋 Detailed Steps Log

### 01 — Setup ✅
- [x] `ng new rihla --routing --style=scss`
- [x] Bootstrap 5 + FontAwesome installed
- [x] `angular.json` — styles + scripts configured
- [x] `zone.js` added to `main.ts`
- [x] `skipTests: true` في `angular.json`
- [x] `environments/` — apiUrl + googleClientId configured
- [x] `index.html` — Google Identity Services script added
- [x] `environment.development.ts` → apiUrl = https://tourguidee.runasp.net/api

### 02 — Navbar ✅
- [x] `shared/components/navbar/` component
- [x] Logo من `public/images/logo.png`
- [x] Links: Home, Cities, Landmarks, Packages, Guides
- [x] Auth state-aware:
  - Guest → Login + Sign Up buttons
  - Logged in → User dropdown (Profile, Bookings, Notifications, Logout)
  - Guide/Admin → Dashboard button + dropdown
- [x] `routerLinkActive` للـ active state
- [x] Sticky top + shadow
- [x] الـ Navbar مش بتظهر في صفحات الـ auth

### 03 — Core Setup ✅
- [x] `ApiService` — base HTTP service مع `environment.apiUrl`
- [x] Models: `City`, `Landmark`, `Package`, `Guide`, `Auth`
- [x] Services: `CityService`, `LandmarkService`, `PackageService`, `GuideService`, `AuthService`

### 04 — Home Page ✅
- [x] Hero Section — `hero.jpg` + overlay + text + buttons
- [x] Search Bar — Packages/Landmarks/Guides tabs
- [x] Features Section — 4 icons
- [x] How Rihla Works — 3 steps بالصور
- [x] Popular Destinations — trending cities من API ✅
- [x] Featured Packages — 4 packages من API ✅
- [x] CTA Section
- [x] Endpoints: `GET /api/cities/trending`, `GET /api/packages`, `GET /api/cities`

### 05 — Cities Page ✅
- [x] Hero Slider — 5 slides
- [x] Search Bar
- [x] Cities Grid
- [x] Endpoint: `GET /api/cities`

### 06 — Landmarks Page ✅
- [x] Hero Slider
- [x] Search Bar + Filters (Cities, Category)
- [x] Landmarks Grid
- [x] Endpoint: `GET /api/landmarks` مع filters

### 07 — Packages Page ✅
- [x] Hero Slider
- [x] Search Bar + Filters (City, Duration, Max Price)
- [x] Packages Grid + Compare Bar (max 3)
- [x] Endpoint: `GET /api/packages` مع filters

### 08 — Guides Page ✅
- [x] Hero Slider
- [x] Search Bar + Filters (Cities, Languages, Available Only)
- [x] Guides Grid
- [x] Endpoint: `GET /api/guides`

### 09 — Auth Infrastructure ✅
- [x] `core/interceptors/jwt.interceptor.ts`
  - بيضيف `Authorization: Bearer <token>` أوتوماتيك
  - Auto refresh token لو رجع 401
  - Logout + redirect لو Refresh فشل
- [x] `core/guards/auth.guard.ts`
  - `authGuard` — يمنع الدخول لو مش logged in
  - `roleGuard(['Role'])` — يمنع الدخول لو مش عنده الـ Role
  - `guestGuard` — يمنع الـ logged in يدخل Login/Register
- [x] `app.config.ts` — `provideHttpClient(withInterceptors([jwtInterceptor]))`
- [x] `app.routes.ts` — Guards على كل route

### 10 — Auth — Login ✅
- [x] Layout: صورة (auth.png) على الشمال + form على اليمين
- [x] Logo في أعلى الـ form
- [x] Form: Email + Password + Remember Me + Forgot Password
- [x] Google OAuth — يشتغل عن طريق `google.accounts.id.prompt()`
- [x] Google button — "(Tourists only)" label
- [x] Redirect: Admin → /admin, Guide → /guide-dashboard, Tourist → /
- [x] Endpoint: `POST /api/auth/login` + `POST /api/auth/google`

### 11 — Auth — Register Select ✅
- [x] Layout: صورة كاملة + overlay
- [x] بطاقتين: Tourist + Guide — الضغط يروح مباشرة

### 12 — Auth — Register Tourist ✅
- [x] Form: Full Name + Email + Password + Confirm Password
- [x] Validation + Success message + redirect لـ Login بعد 3 ثواني
- [x] Endpoint: `POST /api/auth/register` مع `role: 'Tourist'`

### 13 — Auth — Register Guide ✅
- [x] نفس Tourist + note صفراء عن الـ Approval
- [x] Endpoint: `POST /api/auth/register` مع `role: 'Guide'`

### 14 — Auth — Forgot Password ✅
- [x] Layout: صورة كاملة + card في المنتصف
- [x] Form: Email بس
- [x] Success message بعد الإرسال
- [x] Endpoint: `POST /api/auth/forget-password`

### 15 — Auth — Reset Password ✅
- [x] Layout: صورة كاملة + card في المنتصف
- [x] بياخد `email` و `token` من الـ URL query params
- [x] لو مفيش params → يعرض "Invalid or expired link"
- [x] Form: New Password + Confirm Password
- [x] Success + redirect لـ Login بعد 3 ثواني
- [x] Endpoint: `POST /api/auth/reset-password`

---

## 🔑 Auth Models (core/models/auth.ts)

```typescript
// Requests
LoginRequest          { email, password }
RegisterRequest       { fullName, email, password, role: 'Tourist'|'Guide' }
ForgetPasswordRequest { email }
ResetPasswordRequest  { email, token, newPassword }
RefreshTokenRequest   { refreshToken }
ChangePasswordRequest { currentPassword, newPassword }
GoogleAuthRequest     { idToken }

// Response — flat object (مش nested)
LoginResponse         { accessToken, refreshToken, role, fullName, email }
```

---

## 🔑 Auth Service (core/services/auth.ts)

```typescript
login(request)          → POST /auth/login
register(request)       → POST /auth/register
googleLogin(request)    → POST /auth/google
forgotPassword(request) → POST /auth/forget-password
resetPassword(request)  → POST /auth/reset-password
refreshToken(request)   → POST /auth/refresh-token
changePassword(request) → POST /auth/change-password
logout()                → POST /auth/logout

// Helpers
saveUser(), clearUser(), getToken(), getRefreshToken()
getUserFromStorage(), isLoggedIn(), getRole()
```

---

## 🔑 Environment (src/environments/)

```typescript
export const environment = {
  production: false,
  apiUrl: '',
  googleClientId: ''
};
```

---

## 🔑 Backend Fixes Done

| الـ Fix | الملف |
|---------|-------|
| `LandmarksCount` في Cities | `CityService.cs` |
| `Images` في Landmarks | `LandmarkService.cs` |
| `CityName` في Landmarks | `LandmarkService.cs` |
| `GET/DELETE /api/admin/users/{id}` | `AdminController.cs` |
| Reset Password link يروح على Frontend مش Backend | `AuthController.cs` |
| Email Confirmation link يروح على Frontend مش Backend | `AuthController.cs` |

---

## ⚠️ Backend — التعديلات المطلوبة وقت Production

### 1. `appsettings.json` — لازم يتضاف:
```json
"Frontend": {
  "BaseUrl": "http://localhost:4200"
}
```
**وقت Production على Vercel — غيّره لـ:**
```json
"Frontend": {
  "BaseUrl": "https://your-app.vercel.app"
}
```

### 2. `AuthController.cs` — بيستخدم `Frontend:BaseUrl` في:
- `POST /auth/register` — لينك تأكيد الـ Email
- `POST /auth/forget-password` — لينك Reset Password

### 3. CORS في `Program.cs` — لازم تضيف Vercel URL:
```csharp
// دلوقتي بيقبل localhost:4200 بس
// وقت Production أضف:
WithOrigins("http://localhost:4200", "https://your-app.vercel.app")
```

### 4. Google Console — لازم تضيف Vercel URL:
- **Authorized JavaScript origins:** أضف `https://your-app.vercel.app`
- **Authorized redirect URIs:** أضف `https://your-app.vercel.app`

---

## 📌 ما يحتاجه الشات الجديد من الـ Backend

لو فتحت شات جديد وعايز تكمل الصفحات، ابعت الملفات دي:

**قاعدة ثابتة:**
دايما ابعت الـ DTO + Service + Controller للصفحة اللي هتشتغل عليها قبل ما تبدأ.

---

## 📌 Legend
| Icon | Meaning |
|------|---------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Done |
| ⚠️ | Has Issue |
| ⏳ | Pending |