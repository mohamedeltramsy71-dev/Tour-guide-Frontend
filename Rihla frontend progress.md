# Rihla — Frontend Progress Tracker
> Angular 19 | Bootstrap 5 | FontAwesome | Clean Architecture

---

## 🌐 Project Info
- **Project Name:** Rihla
- **Framework:** Angular 19 (Standalone Components)
- **Styling:** Bootstrap 5 + SCSS + FontAwesome
- **API:** https://tourguidee.runasp.net/api
- **Local:** http://localhost:4200
- **Language:** English only (no Arabic text in UI)
- **File naming:** without `.component` (e.g. `profile.ts` not `profile.component.ts`)

---

## 🏗️ Project Structure

```
rihla/
├── public/
│   └── images/
│       ├── logo.png, hero.jpg, step1-3.jpg
│       ├── auth/auth.png
│       ├── admin/sidebar.png, background.svg
│       └── cities/slide1-5.jpg
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/jwt.interceptor.ts             ✅
│   │   │   ├── guards/auth.guard.ts                        ✅
│   │   │   ├── models/
│   │   │   │   ├── city.ts                                 ✅
│   │   │   │   ├── landmark.ts                             ✅
│   │   │   │   ├── package.ts                              ✅ (+ Create/Update/AddLandmark requests)
│   │   │   │   ├── guide.ts                                ✅ (+ UpdateGuideRequest)
│   │   │   │   ├── auth.ts                                 ✅ (+ avatarUrl?)
│   │   │   │   ├── admin.ts                                ✅
│   │   │   │   ├── booking.ts                              ✅ (+ Create/Reject requests, FilterParams)
│   │   │   │   ├── review.ts                               ✅
│   │   │   │   └── user.model.ts                           ✅
│   │   │   └── services/
│   │   │       ├── api.ts                                  ✅ (+ putForm)
│   │   │       ├── auth.ts                                 ✅ (+ updateAvatarInStorage)
│   │   │       ├── city.ts                                 ✅
│   │   │       ├── landmark.ts                             ✅
│   │   │       ├── package.ts                              ✅ (+ CRUD + toggle + images + landmarks)
│   │   │       ├── guide.ts                                ✅
│   │   │       ├── admin.service.ts                        ✅
│   │   │       ├── booking.service.ts                      ✅ (Tourist + Guide + Admin)
│   │   │       ├── review.service.ts                       ✅
│   │   │       └── user.ts                                 ✅
│   │   ├── shared/components/navbar/                       ✅
│   │   ├── features/
│   │   │   ├── home/                                       ✅
│   │   │   ├── cities/                                     ✅
│   │   │   ├── landmarks/                                  ✅
│   │   │   ├── packages/                                   ✅
│   │   │   ├── guides/                                     ✅
│   │   │   ├── auth/
│   │   │   │   ├── login/                                  ✅
│   │   │   │   ├── register-select/                        ✅
│   │   │   │   ├── register-tourist/                       ✅
│   │   │   │   ├── register-guide/                         ✅
│   │   │   │   ├── forgot-password/                        ✅
│   │   │   │   ├── reset-password/                         ✅
│   │   │   │   └── confirm-email/                          ✅
│   │   │   ├── profile/                                    ✅
│   │   │   ├── bookings/my-bookings/                       ✅
│   │   │   ├── payment/                                    ⬜
│   │   │   ├── chat/                                       ⬜
│   │   │   ├── reviews/                                    ⬜
│   │   │   ├── notifications/                              ⬜
│   │   │   ├── guide-dashboard/
│   │   │   │   ├── guide-layout/                           ✅
│   │   │   │   ├── guide-dashboard/                        ✅
│   │   │   │   ├── guide-profile/                          ✅
│   │   │   │   ├── guide-packages/                         ✅
│   │   │   │   ├── incoming-bookings/                      ✅
│   │   │   │   └── guide-reviews/                          ✅
│   │   │   └── admin/
│   │   │       ├── admin-layout/                           ✅
│   │   │       ├── dashboard/                              ✅
│   │   │       ├── users/                                  ✅
│   │   │       ├── guides/                                 ✅
│   │   │       ├── reviews/                                ✅
│   │   │       ├── bookings/                               ✅
│   │   │       ├── cities/                                 ✅
│   │   │       ├── landmarks/                              ✅
│   │   │       └── categories/                             ✅
│   │   ├── app.routes.ts                                   ✅
│   │   ├── app.config.ts                                   ✅
│   │   ├── app.ts                                          ✅ (Navbar hidden for Admin + Guide roles)
│   │   └── app.html                                        ✅
│   ├── environments/                                       ✅
│   ├── index.html, styles.scss, main.ts                    ✅
└── angular.json                                            ✅
```

---

## 🎨 Design System

### Colors
```scss
:root {
  --primary: #C85C3A;
  --dark: #1A2340;
  --gold: #D4A853;
  --light-bg: #FAF8F5;
  --text-gray: #6B7280;
}
```

### Layout Patterns
- **Auth pages (Login/Register):** half screen image + form (480px)
- **Auth pages (Select/Forgot/Reset/Confirm):** full screen + overlay + centered card
- **Navbar:** hidden in `/auth/*`, `/admin/*`, `/guide/*`, and any Admin/Guide role
- **Admin Layout:** Sidebar collapsible 260px ↔ 72px + Top Navbar
- **Guide Layout:** Sidebar collapsible 260px ↔ 72px + Top Navbar
- **Tourist:** uses public Navbar with extra items when logged in

### Navbar — Auth State
- Guest → Login + Sign Up
- Tourist → avatar dropdown (My Profile, My Bookings, Notifications, Logout)
- Guide → Dashboard button + avatar dropdown (My Profile, Logout)
- Admin → Dashboard button + avatar dropdown (My Profile, Logout)

---

## ✅ Progress Overview

| # | Page | Status | Endpoints |
|---|------|--------|-----------|
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
| 14 | My Profile (All Roles) | ✅ Done | GET/PUT /api/users/me + avatar + change-password |
| 15 | My Bookings (Tourist) | ✅ Done | GET /api/bookings/my + cancel |
| 16 | City Details | ⬜ Not Started | GET /api/cities/{id} |
| 17 | Landmark Details | ⬜ Not Started | GET /api/landmarks/{id} |
| 18 | Package Details | ⬜ Not Started | GET /api/packages/{id} |
| 19 | Guide Profile (Public) | ⬜ Not Started | GET /api/guides/{id} |
| 20 | Custom Trip Builder | ⬜ Not Started | POST /api/custom-trips/calculate |
| 21 | Book a Package | ⬜ Not Started | POST /api/bookings |
| 22 | Payment | ⬜ Not Started | POST /api/payments/initiate |
| 23 | Chat | ⬜ Not Started | SignalR + /api/chat |
| 24 | Reviews (Tourist) | ⬜ Not Started | POST /api/reviews |
| 25 | Notifications | ⬜ Not Started | GET /api/notifications + SignalR |
| 26 | Guide Dashboard | ✅ Done | GET /api/guides/me + GET /api/bookings/guide |
| 27 | Guide — My Profile | ✅ Done | GET/PUT /api/guides/me + GET /api/cities |
| 28 | Guide — My Packages | ✅ Done | GET/POST/PUT/DELETE /api/packages + toggle + images + landmarks |
| 29 | Guide — Incoming Bookings | ✅ Done | GET /api/bookings/guide + accept/reject/complete |
| 30 | Guide — My Reviews | ✅ Done | GET /api/reviews/guide/{guideId} |
| 31 | Admin Dashboard | ✅ Done | GET /api/admin/dashboard + reports |
| 32 | Admin Users | ✅ Done | GET /api/admin/users + ban + delete |
| 33 | Admin Guides | ✅ Done | pending + approve/reject/suspend |
| 34 | Admin Cities | ✅ Done | GET/POST/PUT/DELETE + upload-image |
| 35 | Admin Landmarks | ✅ Done | GET/POST/PUT/DELETE + upload-image |
| 36 | Admin Categories | ✅ Done | GET/POST/DELETE /api/categories |
| 37 | Admin Bookings | ✅ Done | GET /api/bookings/admin |
| 38 | Admin Reviews | ✅ Done | GET /api/admin/reviews + delete |
| 39 | Footer Component | ⬜ Not Started | — |
| 40 | Auth Guard | ✅ Done | — |
| 41 | JWT Interceptor | ✅ Done | — |

---

## 📋 Detailed Steps Log

### Auth Infrastructure ✅
- JWT Interceptor — auto token + refresh + logout on fail
- PUBLIC_ENDPOINTS — auth only (not cities/landmarks/guides)
- Guards: authGuard, roleGuard, guestGuard
- Auth response unwrapping: `{ message, data: LoginResponse }`

### Auth Pages ✅
- Login (Google OAuth — Tourists only) → redirect by role
- Register Select → Tourist / Guide
- Register Tourist + Guide
- Forgot Password + Reset Password
- Confirm Email (userId + token from URL)

### My Profile ✅
- GET /api/users/me → load user data
- PUT /api/users/me → update fullName, phone, bio
- PUT /api/users/me/avatar → upload avatar (putForm)
- POST /api/auth/change-password → change password
- Back button (Location.back())
- Avatar updates reflected in Navbar + Admin/Guide Topbar via currentUser$ BehaviorSubject
- updateAvatarInStorage() added to AuthService
- avatarUrl? added to LoginResponse model
- putForm<T>() added to ApiService

### My Bookings ✅
- Path: `features/bookings/my-bookings/`
- Route: `/bookings` (Tourist only — roleGuard)
- GET /api/bookings/my → load all tourist bookings (pageSize: 100)
- PUT /api/bookings/{id}/cancel → cancel Pending booking only
- Filter tabs: All / Pending / Confirmed / Completed / Rejected / Cancelled (with count badges)
- Booking cards: Guide avatar+name, Package title, Date, Persons, Price, Status+Payment badges
- Actions: Cancel (Pending) | Pay Now placeholder (Confirmed+Unpaid) | Leave Review placeholder (Completed)
- Empty state with link to /packages

### Admin Layout ✅
- Sidebar collapsible (260px ↔ 72px), Toggle always visible
- Logout → `/auth/login`
- Nav: Dashboard, Users, Guides, Cities, Landmarks, Bookings, Categories, Reviews
- Reactive avatar + fullName via currentUser$ subscription
- Topbar dropdown: My Profile → `/profile`

### Admin Dashboard ✅
- KPI: Users, Guides, Bookings Today, Revenue Today, Pending Guides
- Charts: Bookings (daily/monthly), Revenue (daily/monthly), User Growth
- Top Cities + Top Landmarks + Guide Performance Table

### Admin Users ✅
- Table + Search + Filter (Role/Status) + Ban/Unban + Delete

### Admin Guides ✅
- Pending tab → Approve / Reject (with reason textarea)
- All Guides tab → Suspend toggle

### Admin Reviews ✅
- Table + Full comment + Guide name + Delete modal + Pagination

### Admin Bookings ✅
- Table + Tourist/Guide info + Status/Payment badges
- In-memory status filter

### Admin Cities ✅
- CRUD + Image upload (Cloudinary)
- Backend fix: POST /api/cities/upload-image

### Admin Landmarks ✅
- CRUD + Image upload (Cloudinary)
- Category from API (not hardcoded)
- Landmark.Category changed from enum to string
- Migration: `ChangeLandmarkCategoryToString`

### Admin Categories ✅
- Add + Delete categories from DB
- Landmarks fetches categories from GET /api/categories
- Migration: `AddCategoriesTable`

### Guide Layout ✅
- Path: `features/guide-dashboard/guide-layout/`
- Sidebar collapsible (260px ↔ 72px)
- Nav links: Dashboard, My Profile, My Packages, Incoming Bookings, My Reviews
- Top Navbar: avatar + fullName + Logout → `/auth/login`
- Topbar dropdown: My Profile → `/profile` (shared profile), My Guide Profile → `/guide/profile`
- router-outlet for child routes under `/guide`
- Navbar (public) hidden inside guide layout

### Guide Dashboard ✅
- Path: `features/guide-dashboard/guide-dashboard/`
- GET /api/guides/me → profile summary (name, rating, experience, cities, languages, availability)
- GET /api/bookings/guide → bookings stats + recent bookings table
- Sections: Welcome banner, 6 stat cards, Recent Bookings table, Profile Summary

### Guide — My Profile ✅
- Path: `features/guide-dashboard/guide-profile/`
- Route: `/guide/profile`
- GET /api/guides/me → load profile (view mode)
- GET /api/cities → city list for edit mode
- PUT /api/guides/me → save changes
- View mode: Hero card (avatar, name, email, experience, rating, status pills) + detail cards (Bio, Languages, Cities, Rating Overview)
- Edit mode: Bio textarea, Languages add/remove tags (Enter key support), Experience input, Cities checkbox grid
- Alerts: success/error, 4s auto-dismiss on success

### Guide — My Packages ✅
- Path: `features/guide-dashboard/guide-packages/`
- Route: `/guide/packages`
- GET /api/packages → filtered by guideId (client-side)
- POST /api/packages → create
- PUT /api/packages/{id} → edit
- DELETE /api/packages/{id} → soft delete
- PUT /api/packages/{id}/toggle → activate/deactivate
- POST /api/packages/{id}/images → upload image (Cloudinary)
- POST /api/packages/{id}/landmarks → add landmark (dayNumber + order)
- DELETE /api/packages/{id}/landmarks/{landmarkId} → remove landmark
- 5 modals: Create / Edit / Delete / Images / Landmarks
- Package cards grid: cover image, title, city, price, duration, maxPersons, rating, image/landmark counts
- Action buttons per card: Toggle / Images / Landmarks / Edit / Delete
- ⚠️ Image delete disabled — PackageDto returns images as string[] (no imageId); needs Backend fix

### Guide — Incoming Bookings ✅
- Path: `features/guide-dashboard/incoming-bookings/`
- Route: `/guide/bookings`
- GET /api/bookings/guide → load all guide bookings (pageSize: 100)
- PUT /api/bookings/{id}/accept → Confirmed
- PUT /api/bookings/{id}/reject → Rejected (with reason)
- PUT /api/bookings/{id}/complete → Completed
- Filter tabs: All / Pending / Confirmed / Rejected / Completed (with count badges)
- Cards: tourist avatar+name, date, status/payment badges, package/trip details, price
- Actions: Accept + Reject (Pending) | Mark Complete (Confirmed) | Labels for others
- Reject modal: textarea + validation
- Complete confirm modal
- Toast notifications after each action

### Guide — My Reviews ✅
- Path: `features/guide-dashboard/guide-reviews/`
- Route: `/guide/reviews`
- GET /api/guides/me → get guideProfileId
- GET /api/reviews/guide/{guideId} → paginated reviews
- Summary card: avg rating (large stars) + total count
- Rating breakdown bars (5★ → 1★ with percentages)
- Review cards: tourist avatar + name + date + star rating + comment
- Load More button, empty state, loading spinner

### package.ts model — additions ✅
- CreatePackageRequest: title, description?, price, durationDays, maxPersons, cityId
- UpdatePackageRequest: title, description?, price, durationDays, maxPersons
- AddLandmarkToPackageRequest: landmarkId, dayNumber, order

### package.ts service — additions ✅
- createPackage(request) — POST /api/packages
- updatePackage(id, request) — PUT /api/packages/{id}
- deletePackage(id) — DELETE /api/packages/{id}
- togglePackage(id) — PUT /api/packages/{id}/toggle
- uploadImage(packageId, file) — POST /api/packages/{id}/images
- deleteImage(packageId, imageId) — DELETE /api/packages/{id}/images/{imageId}
- addLandmark(packageId, req) — POST /api/packages/{id}/landmarks
- removeLandmark(pkgId, lmId) — DELETE /api/packages/{id}/landmarks/{landmarkId}

---

## 🔑 Models

### auth.ts
```
LoginResponse { accessToken, refreshToken, role, fullName, email, avatarUrl? }
Backend wraps: { message, data: LoginResponse }
```

### user.model.ts
```
UserDto { id, fullName, email, phone?, bio?, avatarUrl?, role, isBanned, isDeleted, createdAt }
UpdateProfileRequest { fullName, phone?, bio? }
ChangePasswordRequest { currentPassword, newPassword }
AvatarResponse { avatarUrl }
```

### booking.ts
```
BookingDto { id, startDate, numberOfPersons, totalPrice, status, paymentStatus,
             isCustom, rejectionReason, createdAt, touristId, touristName,
             touristAvatar, guideProfileId, guideName, guideAvatar, packageId, packageTitle }
CreateBookingRequest { packageId?, guideProfileId, startDate, numberOfPersons, durationDays }
RejectBookingRequest { reason }
BookingFilterParams { status?, fromDate?, toDate?, page?, pageSize? }
```

### review.ts
```
ReviewDto { id, rating, comment, createdAt, touristId, touristName, touristAvatar?, guideProfileId, guideName }
ReviewFilterParams { page?, pageSize? }
PaginatedReviews { items: ReviewDto[], totalCount, page, pageSize, totalPages }
```

### guide.ts
```
GuideProfileDto { userId, fullName, email, avatarUrl?, bio?,
                  languages[], experienceYears, averageRating,
                  totalReviews, isApproved, isAvailable, coveredCities[] }
GuideListDto { userId, fullName, avatarUrl?, averageRating,
               totalReviews, experienceYears, languages[], coveredCities[], isAvailable }
UpdateGuideRequest { bio?, languages[], experienceYears, coveredCityIds[] }
```

### package.ts
```
Package { id, title, description, price, durationDays, maxPersons, isActive,
          averageRating, cityNameEn, guideId, guideName, images: string[], landmarks: PackageLandmark[] }
PackageLandmark { landmarkId, nameEn, dayNumber, order }
CreatePackageRequest { title, description?, price, durationDays, maxPersons, cityId }
UpdatePackageRequest { title, description?, price, durationDays, maxPersons }
AddLandmarkToPackageRequest { landmarkId, dayNumber, order }
```

### admin.ts
```
DashboardSummaryDto, BookingsReportDto, RevenueReportDto,
TopCityDto, TopLandmarkDto, GuidePerformanceDto, UserGrowthDto,
UserDto, PaginatedUsersRequest, RejectGuideRequest
```

---

## 🔑 Services

### api.ts
```
get<T>(endpoint, { params?: HttpParams })
post<T>(endpoint, body)
postForm<T>(endpoint, FormData)    — POST image upload
put<T>(endpoint, body)
putForm<T>(endpoint, FormData)     — PUT image upload (avatar)
delete<T>(endpoint)
```

### booking.service.ts
```
Tourist:
  createBooking(request)           POST /api/bookings
  getMyBookings(filters?)          GET /api/bookings/my
  cancelBooking(id)                PUT /api/bookings/{id}/cancel

Guide:
  getGuideBookings(filters?)       GET /api/bookings/guide
  acceptBooking(id)                PUT /api/bookings/{id}/accept
  rejectBooking(id, request)       PUT /api/bookings/{id}/reject
  completeBooking(id)              PUT /api/bookings/{id}/complete

Shared:
  getBookingById(id)               GET /api/bookings/{id}

Admin:
  getAllBookings(filters?)          GET /api/bookings/admin
```

### review.service.ts
```
getGuideReviews(guideId, params?)  GET /api/reviews/guide/{guideId}
deleteReview(id)                   DELETE /api/reviews/{id}
```

---

## 🔑 Backend Fixes Done

| Fix | File |
|-----|------|
| Auth response wrapped { message, data } | AuthController.cs |
| Reset/Confirm Email links → Frontend | AuthController.cs |
| JWT Interceptor PUBLIC_ENDPOINTS fix | jwt.interceptor.ts |
| IRepository + GenericRepository Include methods | Domain + Infrastructure |
| ReviewService Include Tourist + GuideProfile | ReviewService.cs |
| ReviewDto + GuideName | ReviewDto.cs |
| BookingService Include Tourist + Guide + Package | BookingService.cs |
| BookingFilterParams.Status — string not enum | BookingFilterParams.cs |
| CitiesController POST /api/cities/upload-image | CitiesController.cs |
| Landmark.Category — enum to string | Landmark.cs + LandmarkService.cs |
| Migration: AddCategoriesTable | TourGuide.Infrastructure |
| Migration: ChangeLandmarkCategoryToString | TourGuide.Infrastructure |
| Bookings enum fix (string to int in DB) | SQL UPDATE |

---

## ⚠️ Pending Backend Fixes

| Fix | File | Needed For |
|-----|------|------------|
| PackageDto.Images → List of PackageImageDto { Id, ImageUrl } instead of List of string | PackageDto.cs + PackageService.cs | Guide Packages — delete image |

---

## ⚠️ Production Checklist

```json
// appsettings.json
"Frontend": { "BaseUrl": "https://your-app.vercel.app" }
```

```csharp
// Program.cs CORS
WithOrigins("http://localhost:4200", "https://your-app.vercel.app")
```

```
// Google Console
Authorized JavaScript origins: add Vercel URL
Authorized redirect URIs: add Vercel URL
```

---

## 📌 Next Steps — Priority Order

| # | Page | Notes |
|---|------|-------|
| 1 | Package Details | GET /api/packages/{id} — needed before Book a Package |
| 2 | Book a Package | POST /api/bookings — button on Package Details page |
| 3 | Guide Profile (Public) | GET /api/guides/{id} — link from packages + guides listing |
| 4 | City Details | GET /api/cities/{id} |
| 5 | Landmark Details | GET /api/landmarks/{id} |
| 6 | Reviews (Tourist) | POST/PUT/DELETE /api/reviews — activates Leave Review in My Bookings |
| 7 | Notifications | GET /api/notifications + SignalR NotificationReceived |
| 8 | Chat | SignalR Hub + /api/chat — Tourist and Guide per booking |
| 9 | Payment | Paymob iFrame — POST /api/payments/initiate |
| 10 | Custom Trip Builder | POST /api/custom-trips/calculate + available-guides |
| 11 | Footer | Static component |

### Details Pages — Backend files needed before starting:
- PackagesController.cs (GET /{id} with landmarks + guide info)
- PackageDto.cs (full details)
- CitiesController.cs (GET /{id} with landmarks)
- LandmarksController.cs (GET /{id} full details)
- GuidesController.cs (GET /{id} public profile + reviews)

### Details Pages — CLI commands to run first:
```
ng g component features/packages/package-detail --standalone
ng g component features/cities/city-detail --standalone
ng g component features/landmarks/landmark-detail --standalone
ng g component features/guides/guide-detail --standalone
```

---

## 📌 Legend

| Icon | Meaning |
|------|---------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Done |
| ⚠️ | Has Issue / Pending Fix |
| ⏳ | Pending |