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
│   │   │   │   ├── package.ts                              ✅ (+ Create/Update/AddLandmark + guideProfileId)
│   │   │   │   ├── guide.ts                                ✅ (+ UpdateGuideRequest)
│   │   │   │   ├── auth.ts                                 ✅ (+ avatarUrl?)
│   │   │   │   ├── admin.ts                                ✅
│   │   │   │   ├── booking.ts                              ✅ (+ Create/Reject requests, FilterParams)
│   │   │   │   ├── review.ts                               ✅ (+ CreateReviewRequest, UpdateReviewRequest)
│   │   │   │   └── user.model.ts                           ✅
│   │   │   └── services/
│   │   │       ├── api.ts                                  ✅ (+ putForm)
│   │   │       ├── auth.ts                                 ✅ (+ updateAvatarInStorage)
│   │   │       ├── city.ts                                 ✅ (+ getCityById)
│   │   │       ├── landmark.ts                             ✅ (+ getLandmarkById)
│   │   │       ├── package.ts                              ✅ (+ CRUD + toggle + images + landmarks + getById)
│   │   │       ├── guide.ts                                ✅
│   │   │       ├── admin.service.ts                        ✅
│   │   │       ├── booking.service.ts                      ✅ (Tourist + Guide + Admin)
│   │   │       ├── review.service.ts                       ✅ (+ createReview, updateReview, deleteReview)
│   │   │       └── user.ts                                 ✅
│   │   ├── shared/components/navbar/                       ✅
│   │   ├── features/
│   │   │   ├── home/                                       ✅
│   │   │   ├── cities/
│   │   │   │   ├── cities/                                 ✅
│   │   │   │   └── city-detail/                            ✅
│   │   │   ├── landmarks/
│   │   │   │   ├── landmarks/                              ✅
│   │   │   │   └── landmark-detail/                        ✅
│   │   │   ├── packages/
│   │   │   │   ├── packages/                               ✅
│   │   │   │   └── package-detail/                         ✅
│   │   │   ├── guides/
│   │   │   │   ├── guides/                                 ✅
│   │   │   │   └── guide-detail/                           ✅
│   │   │   ├── auth/
│   │   │   │   ├── login/                                  ✅
│   │   │   │   ├── register-select/                        ✅
│   │   │   │   ├── register-tourist/                       ✅
│   │   │   │   ├── register-guide/                         ✅
│   │   │   │   ├── forgot-password/                        ✅
│   │   │   │   ├── reset-password/                         ✅
│   │   │   │   └── confirm-email/                          ✅
│   │   │   ├── profile/                                    ✅
│   │   │   ├── bookings/my-bookings/                       ✅ (+ Leave Review / Edit Review modal)
│   │   │   ├── leave-review/                               ✅ (modal component — used in my-bookings)
│   │   │   ├── payment/                                    ⬜
│   │   │   ├── chat/                                       ⬜
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
- Auth pages (Login/Register): half screen image + form (480px)
- Auth pages (Select/Forgot/Reset/Confirm): full screen + overlay + centered card
- Navbar: hidden in `/auth/*`, `/admin/*`, `/guide/*`, and any Admin role
- Guide: Navbar visible on public pages (e.g. /guides), hidden inside /guide/* layout
- Admin Layout: Sidebar collapsible 260px to 72px + Top Navbar
- Guide Layout: Sidebar collapsible 260px to 72px + Top Navbar
- Tourist: uses public Navbar with extra items when logged in

### Navbar — Auth State
- Guest: Login + Sign Up
- Tourist: avatar dropdown (My Profile, My Bookings, Notifications, Logout)
- Guide: Dashboard button + avatar dropdown (My Profile, Logout)
- Admin: Dashboard button + avatar dropdown (My Profile, Logout)

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
| 15 | My Bookings (Tourist) | ✅ Done | GET /api/bookings/my + cancel + leave/edit review |
| 16 | City Details | ✅ Done | GET /api/cities/{id} + GET /api/landmarks?cityId={id} |
| 17 | Landmark Details | ✅ Done | GET /api/landmarks/{id} |
| 18 | Package Details | ✅ Done | GET /api/packages/{id} + POST /api/bookings |
| 19 | Guide Profile (Public) | ✅ Done | GET /api/guides/{id} + reviews + packages |
| 20 | Book a Package | ✅ Done | POST /api/bookings (inline on Package Details) |
| 21 | Reviews (Tourist) | ✅ Done | POST /api/reviews + PUT /api/reviews/{id} |
| 22 | Notifications | ⬜ Not Started | GET /api/notifications + SignalR |
| 23 | Chat | ⬜ Not Started | SignalR + /api/chat |
| 24 | Payment | ⬜ Not Started | POST /api/payments/initiate |
| 25 | Custom Trip Builder | ⬜ Not Started | POST /api/custom-trips/calculate |
| 26 | Footer | ⬜ Not Started | — |
| 27 | Guide Dashboard | ✅ Done | GET /api/guides/me + GET /api/bookings/guide |
| 28 | Guide — My Profile | ✅ Done | GET/PUT /api/guides/me + GET /api/cities |
| 29 | Guide — My Packages | ✅ Done | GET/POST/PUT/DELETE /api/packages + toggle + images + landmarks |
| 30 | Guide — Incoming Bookings | ✅ Done | GET /api/bookings/guide + accept/reject/complete |
| 31 | Guide — My Reviews | ✅ Done | GET /api/reviews/guide/{guideId} |
| 32 | Admin Dashboard | ✅ Done | GET /api/admin/dashboard + reports |
| 33 | Admin Users | ✅ Done | GET /api/admin/users + ban + delete |
| 34 | Admin Guides | ✅ Done | pending + approve/reject/suspend |
| 35 | Admin Cities | ✅ Done | GET/POST/PUT/DELETE + upload-image |
| 36 | Admin Landmarks | ✅ Done | GET/POST/PUT/DELETE + upload-image |
| 37 | Admin Categories | ✅ Done | GET/POST/DELETE /api/categories |
| 38 | Admin Bookings | ✅ Done | GET /api/bookings/admin |
| 39 | Admin Reviews | ✅ Done | GET /api/admin/reviews + delete |
| 40 | Auth Guard | ✅ Done | — |
| 41 | JWT Interceptor | ✅ Done | — |

---

## 📋 Detailed Steps Log

### Auth Infrastructure ✅
- JWT Interceptor — auto token + refresh + logout on fail
- PUBLIC_ENDPOINTS — auth only (not cities/landmarks/guides)
- Guards: authGuard, roleGuard, guestGuard
- Auth response unwrapping: { message, data: LoginResponse }

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
- Path: features/bookings/my-bookings/
- Route: /bookings (Tourist only — roleGuard)
- GET /api/bookings/my → load all tourist bookings (pageSize: 100)
- PUT /api/bookings/{id}/cancel → cancel Pending booking only
- Filter tabs: All / Pending / Confirmed / Completed / Rejected / Cancelled (with count badges)
- Booking cards: Guide avatar+name, Package title, Date, Persons, Price, Status+Payment badges
- Actions: Cancel (Pending) | Pay Now placeholder (Confirmed+Unpaid) | Leave Review / Edit Review (Completed)
- Empty state with link to /packages

### Reviews (Tourist) ✅
- Path: features/leave-review/ (modal component, no dedicated route)
- Used inside: features/bookings/my-bookings/
- POST /api/reviews → createReview({ bookingId, rating, comment })
- PUT /api/reviews/{id} → updateReview({ rating, comment })
- Triggered from My Bookings → Completed bookings only
- Leave Review button → opens modal → star rating (1–5) + optional comment
- Edit Review button → opens modal prefilled with existing review
- Success state shown before closing modal
- reviewedBookings Map tracks reviewed bookings in session
- review.ts model: ReviewDto, CreateReviewRequest, UpdateReviewRequest
- review.service.ts: createReview, updateReview, deleteReview, getGuideReviews

### City Details ✅
- Path: features/cities/city-detail/
- Route: /cities/:id
- GET /api/cities/{id} → city info
- GET /api/landmarks?cityId={id} → landmarks in city
- Hero: full-width background image + city name + landmarks count
- Description card
- Landmarks grid: image, category badge, name, desc, rating, entryFee, location
- Each landmark card → /landmarks/:id
- Back link → /cities

### Landmark Details ✅
- Path: features/landmarks/landmark-detail/
- Route: /landmarks/:id
- GET /api/landmarks/{id} → full landmark details
- Hero: image gallery + thumbnails strip (activeImage signal)
- Back link → /cities/:cityId
- Left: category pill, title, city+location meta, star rating, description
- Right sticky card: Entry Fee, Category, City, Location, Rating
- Explore City button → /cities/:cityId

### Package Details ✅
- Path: features/packages/package-detail/
- Route: /packages/:id
- GET /api/packages/{id} → packageService.getPackageById(id)
- Image gallery: main image + thumbnails
- Package info: title, city, duration, maxPersons, avgRating stars
- Description block
- Day-by-day itinerary: landmarks grouped by dayNumber, sorted by order
- Booking form (inline toggle): startDate, numberOfPersons (max validated)
- Tourist only — non-logged-in redirects to /auth/login
- POST /api/bookings with packageId, guideProfileId, startDate, numberOfPersons, durationDays
- guideProfileId added to Package interface

### Guide Profile (Public) ✅
- Path: features/guides/guide-detail/
- Route: /guides/:id
- GET /api/guides/{id} + GET /api/reviews/guide/{id} + GET /api/packages (client-filter by guideId)
- Hero: avatar (initials fallback), name, rating, experience, availability
- Left: About, Languages, Cities, Rating Breakdown bars
- Right tabs: Packages grid | Reviews list
- Back link → /guides

### Admin Layout ✅
- Sidebar collapsible (260px to 72px), Toggle always visible
- Logout → /auth/login
- Nav: Dashboard, Users, Guides, Cities, Landmarks, Bookings, Categories, Reviews
- Reactive avatar + fullName via currentUser$ subscription
- Topbar dropdown: My Profile → /profile

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
- Migration: ChangeLandmarkCategoryToString

### Admin Categories ✅
- Add + Delete categories from DB
- Landmarks fetches categories from GET /api/categories
- Migration: AddCategoriesTable

### Guide Layout ✅
- Sidebar collapsible (260px to 72px)
- Nav: Dashboard, My Profile, My Packages, Incoming Bookings, My Reviews
- Top Navbar: avatar + fullName + Logout → /auth/login
- Topbar dropdown: My Profile → /profile (shared), My Guide Profile → /guide/profile
- router-outlet for child routes under /guide
- app.ts: Navbar hidden for /guide/* routes AND Admin role; Guide role sees Navbar on public pages

### Guide Dashboard ✅
- GET /api/guides/me → profile summary
- GET /api/bookings/guide → stats + recent bookings table
- Welcome banner, 6 stat cards, Recent Bookings table, Profile Summary

### Guide — My Profile ✅
- GET /api/guides/me → view mode
- GET /api/cities → city list for edit
- PUT /api/guides/me → save
- View: Hero card + Bio/Languages/Cities/Rating cards
- Edit: Bio textarea, Languages tags (Enter), Experience input, Cities checkbox grid

### Guide — My Packages ✅
- Full CRUD + toggle + images + landmarks
- 5 modals: Create / Edit / Delete / Images / Landmarks
- Image delete enabled after Backend fix (PackageImageDto with Id)

### Guide — Incoming Bookings ✅
- Filter tabs: All / Pending / Confirmed / Rejected / Completed
- Actions: Accept / Reject (with reason modal) / Mark Complete
- Toast notifications after each action

### Guide — My Reviews ✅
- GET /api/guides/me → guideProfileId
- GET /api/reviews/guide/{guideId} → paginated
- Summary card: avg rating + total count
- Rating breakdown bars (5★ to 1★)
- Load More button

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
ReviewDto { id, bookingId, rating, comment?, createdAt, touristName, touristAvatar?, guideName }
CreateReviewRequest { bookingId, rating, comment? }
UpdateReviewRequest { rating, comment? }
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
          averageRating, cityNameEn, guideId, guideProfileId, guideName,
          images: string[], landmarks: PackageLandmark[] }
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
getGuideReviews(guideId, page?, pageSize?)  GET /api/reviews/guide/{guideId}
createReview(request)                       POST /api/reviews
updateReview(id, request)                   PUT /api/reviews/{id}
deleteReview(id)                            DELETE /api/reviews/{id}
```

### package.ts service
```
getPackages(params?)             GET /api/packages
getPackageById(id)               GET /api/packages/{id}
comparePackages(ids)             GET /api/packages/compare
createPackage(request)           POST /api/packages
updatePackage(id, request)       PUT /api/packages/{id}
deletePackage(id)                DELETE /api/packages/{id}
togglePackage(id)                PUT /api/packages/{id}/toggle
uploadImage(packageId, file)     POST /api/packages/{id}/images
deleteImage(packageId, imageId)  DELETE /api/packages/{id}/images/{imageId}
addLandmark(packageId, req)      POST /api/packages/{id}/landmarks
removeLandmark(pkgId, lmId)     DELETE /api/packages/{id}/landmarks/{landmarkId}
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
| PackageDto.Images → List of PackageImageDto { Id, ImageUrl } | PackageDto.cs + PackageService.cs |
| PackageDto.GuideProfileId added | PackageDto.cs + PackageService.cs |

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
| 1 | Notifications | GET /api/notifications + SignalR NotificationReceived |
| 2 | Chat | SignalR Hub + /api/chat — Tourist and Guide per booking |
| 3 | Payment | Paymob iFrame — POST /api/payments/initiate |
| 4 | Custom Trip Builder | POST /api/custom-trips/calculate + available-guides |
| 5 | Footer | Static component |

---

## 📌 Legend

| Icon | Meaning |
|------|---------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Done |
| ⚠️ | Has Issue / Pending Fix |
| ⏳ | Pending |