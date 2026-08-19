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
│       ├── admin/
│       │   ├── sidebar.png
│       │   └── background.svg
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
│   │   │   │   ├── auth.ts               ✅
│   │   │   │   ├── admin.ts              ✅
│   │   │   │   └── booking.ts            ✅
│   │   │   └── services/
│   │   │       ├── api.ts                ✅
│   │   │       ├── city.ts               ✅
│   │   │       ├── landmark.ts           ✅
│   │   │       ├── package.ts            ✅
│   │   │       ├── guide.ts              ✅
│   │   │       ├── auth.ts               ✅
│   │   │       └── admin.service.ts      ✅
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
│   │   │   │   ├── reset-password/       ✅
│   │   │   │   └── confirm-email/        ✅
│   │   │   ├── profile/                  ⬜
│   │   │   ├── bookings/                 ⬜
│   │   │   ├── payment/                  ⬜
│   │   │   ├── chat/                     ⬜
│   │   │   ├── reviews/                  ⬜
│   │   │   ├── notifications/            ⬜
│   │   │   ├── guide-dashboard/          ⬜
│   │   │   └── admin/
│   │   │       ├── admin-layout/         ✅
│   │   │       ├── dashboard/            ✅
│   │   │       ├── users/                ✅
│   │   │       ├── guides/               ✅
│   │   │       ├── reviews/              ✅
│   │   │       ├── bookings/             ✅
│   │   │       ├── cities/               ✅
│   │   │       └── landmarks/            ⬜
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
- **Register Select / Forgot Password / Reset Password / Confirm Email:** صورة كاملة (full screen) + overlay + content في المنتصف
- الـ Navbar مش بتظهر في أي صفحة auth

### Admin Layout
- Sidebar ثابت على الشمال (260px) مع sidebar.png كـ background
- Collapsible لـ 72px
- Top Navbar فيها Search + Bell + Profile dropdown
- الـ Public Navbar مش بتظهر في أي صفحة /admin

### Navbar — Auth State
- **مش logged in** → Login + Sign Up buttons
- **logged in كـ Tourist** → اسمه + dropdown (Profile, Bookings, Notifications, Logout)
- **logged in كـ Guide** → Dashboard button + dropdown
- **logged in كـ Admin** → Dashboard button + dropdown

### Admin Pages Pattern
- جدول + Add button في الـ Header
- Modal للـ Add/Edit مع image upload عن طريق الـ Backend (Cloudinary)
- Delete confirmation modal
- Status badges ملونة

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
| 13 | Auth — Confirm Email | ✅ Done | GET /api/auth/confirm-email |
| 14 | My Profile | ⬜ Not Started | GET/PUT /api/users/me |
| 15 | City Details | ⬜ Not Started | GET /api/cities/{id} |
| 16 | Landmark Details | ⬜ Not Started | GET /api/landmarks/{id} |
| 17 | Package Details | ⬜ Not Started | GET /api/packages/{id} |
| 18 | Guide Profile (Public) | ⬜ Not Started | GET /api/guides/{id} |
| 19 | Custom Trip Builder | ⬜ Not Started | POST /api/custom-trips/calculate |
| 20 | Book a Package | ⬜ Not Started | POST /api/bookings |
| 21 | My Bookings | ⬜ Not Started | GET /api/bookings/my |
| 22 | Payment | ⬜ Not Started | POST /api/payments/initiate |
| 23 | Chat | ⬜ Not Started | SignalR + /api/chat |
| 24 | Reviews (Tourist) | ⬜ Not Started | POST /api/reviews |
| 25 | Notifications | ⬜ Not Started | GET /api/notifications |
| 26 | Guide Dashboard | ⬜ Not Started | GET /api/bookings/guide |
| 27 | Guide Packages | ⬜ Not Started | GET/POST /api/packages |
| 28 | Admin Dashboard | ✅ Done | GET /api/admin/dashboard + reports |
| 29 | Admin Users | ✅ Done | GET /api/admin/users + ban + delete |
| 30 | Admin Guides | ✅ Done | GET /api/admin/guides/pending + approve/reject/suspend |
| 31 | Admin Cities | ✅ Done | GET/POST/PUT/DELETE /api/cities + upload-image |
| 32 | Admin Landmarks | ⬜ Not Started | GET/POST /api/landmarks |
| 33 | Admin Bookings | ✅ Done | GET /api/bookings/admin |
| 34 | Admin Reviews | ✅ Done | GET /api/admin/reviews + delete |
| 35 | Footer Component | ⬜ Not Started | — |
| 36 | Auth Guard | ✅ Done | — |
| 37 | JWT Interceptor | ✅ Done | — |

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

### 02 — Navbar ✅
- [x] Auth state-aware: Guest / Tourist / Guide / Admin
- [x] User dropdown: Profile, Bookings, Notifications, Logout
- [x] Dashboard button للـ Guide/Admin
- [x] مش بتظهر في auth أو admin pages

### 03 — Core Setup ✅
- [x] `ApiService` — get/post/put/delete مع HttpParams support
- [x] Models: City, Landmark, Package, Guide, Auth, Admin, Booking
- [x] Services: CityService (مع admin methods), LandmarkService, PackageService, GuideService, AuthService, AdminService

### 04-08 — Public Pages ✅
- [x] Home, Cities, Landmarks, Packages, Guides

### 09 — Auth Infrastructure ✅
- [x] JWT Interceptor — auto add token + auto refresh + logout on fail
- [x] Guards: authGuard, roleGuard, guestGuard
- [x] app.config.ts + app.routes.ts مع guards

### 10-16 — Auth Pages ✅
- [x] Login (مع Google OAuth — Tourists only)
- [x] Register Select → Tourist / Guide
- [x] Register Tourist + Register Guide
- [x] Forgot Password + Reset Password
- [x] Confirm Email

### 17 — Admin Layout ✅
- [x] Sidebar + Top Navbar + Collapsible
- [x] Nav items: Dashboard, Users, Guides, Cities, Landmarks, Bookings, Reviews

### 18 — Admin Dashboard ✅
- [x] KPI Cards + Charts (Bookings, Revenue, User Growth)
- [x] Top Cities + Top Landmarks + Guide Performance Table

### 19 — Admin Users ✅
- [x] Table + Search + Filter + Ban/Unban + Delete modal

### 20 — Admin Guides ✅
- [x] Pending tab: Approve/Reject (مع reason)
- [x] All Guides tab: Suspend toggle

### 21 — Admin Reviews ✅
- [x] Table + Delete modal + Pagination

### 22 — Admin Bookings ✅
- [x] Table مع Tourist/Guide avatars + Status/Payment badges
- [x] Filter بالـ Status + Date range
- [x] Endpoint: `GET /api/bookings/admin`
- [x] ملاحظة: Status filter بيتعمل in-memory بعد الـ fetch (الـ Backend بيخزن كـ string)

### 23 — Admin Cities ✅
- [x] Table مع City thumbnails + Landmarks count
- [x] Add/Edit modal مع image upload عن طريق Backend (Cloudinary)
- [x] Delete confirmation modal
- [x] Endpoints: GET/POST/PUT/DELETE /api/cities + POST /api/cities/upload-image
- [x] Backend fix: أضفنا `POST /api/cities/upload-image` في `CitiesController.cs`

---

## 🔑 Auth Models (core/models/auth.ts)

```typescript
LoginRequest          { email, password }
RegisterRequest       { fullName, email, password, role: 'Tourist'|'Guide' }
ForgetPasswordRequest { email }
ResetPasswordRequest  { email, token, newPassword }
RefreshTokenRequest   { refreshToken }
ChangePasswordRequest { currentPassword, newPassword }
GoogleAuthRequest     { idToken }
LoginResponse         { accessToken, refreshToken, role, fullName, email }
```

---

## 🔑 Booking Model (core/models/booking.ts)

```typescript
BookingDto {
  id, startDate, numberOfPersons, totalPrice
  status, paymentStatus, isCustom, rejectionReason, createdAt
  touristId, touristName, touristAvatar
  guideProfileId, guideName, guideAvatar
  packageId, packageTitle
}
BookingFilterParams { status?, fromDate?, toDate?, page?, pageSize? }
```

---

## 🔑 City Service (core/services/city.ts)

```typescript
getCities(page, pageSize)     → GET /api/cities
getCityById(id)               → GET /api/cities/{id}
getTrendingCities()           → GET /api/cities/trending
createCity(data)              → POST /api/cities
updateCity(id, data)          → PUT /api/cities/{id}
deleteCity(id)                → DELETE /api/cities/{id}
// Image upload → POST /api/cities/upload-image (من الـ component مباشرة)
```

---

## 🔑 API Service Pattern (core/services/api.ts)

```typescript
get<T>(endpoint, { params?: HttpParams })
post<T>(endpoint, body)
put<T>(endpoint, body)
delete<T>(endpoint)
// للـ params: new HttpParams().set('key', value)
```

---

## 🔑 Backend Fixes Done

| الـ Fix | الملف |
|---------|-------|
| `LandmarksCount` في Cities | `CityService.cs` |
| `Images` في Landmarks | `LandmarkService.cs` |
| `CityName` في Landmarks | `LandmarkService.cs` |
| `GET/DELETE /api/admin/users/{id}` | `AdminController.cs` |
| Reset Password link → Frontend | `AuthController.cs` |
| Email Confirmation link → Frontend | `AuthController.cs` |
| `IRepository` — أضفنا `FindWithNestedIncludeAsync` | `IRepository.cs` |
| `GenericRepository` — أضفنا `FindWithNestedIncludeAsync` | `GenericRepository.cs` |
| `BookingService` — Include Tourist + GuideProfile.User + Package | `BookingService.cs` |
| `BookingFilterParams.Status` — string بدل enum | `BookingFilterParams.cs` |
| Booking status filter — in-memory بعد fetch | `BookingService.cs` |
| `CitiesController` — أضفنا `POST /api/cities/upload-image` | `CitiesController.cs` |

---

## ⚠️ Backend — التعديلات المطلوبة وقت Production

### 1. `appsettings.json`
```json
"Frontend": { "BaseUrl": "https://your-app.vercel.app" }
```

### 2. CORS في `Program.cs`
```csharp
WithOrigins("http://localhost:4200", "https://your-app.vercel.app")
```

### 3. Google Console
- Authorized JavaScript origins: أضف Vercel URL
- Authorized redirect URIs: أضف Vercel URL

---

## 📌 الخطوات الجاية

| # | الصفحة |
|---|--------|
| 1 | Admin Landmarks |
| 2 | My Profile (Tourist/Guide) |
| 3 | Guide Dashboard |
| 4 | My Bookings |
| 5 | Package/City/Landmark Details |
| 6 | Chat + Notifications |
| 7 | Payment |
| 8 | Footer |

---

## 📌 Legend
| Icon | Meaning |
|------|---------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Done |
| ⚠️ | Has Issue |
| ⏳ | Pending |