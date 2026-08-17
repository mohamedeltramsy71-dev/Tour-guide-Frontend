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
│       └── cities/
│           ├── slide1.jpg
│           ├── slide2.jpg
│           ├── slide3.jpg
│           ├── slide4.jpg
│           └── slide5.jpg
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── city.ts           ✅
│   │   │   │   ├── landmark.ts       ✅
│   │   │   │   ├── package.ts        ✅
│   │   │   │   └── guide.ts          ✅
│   │   │   └── services/
│   │   │       ├── api.ts            ✅
│   │   │       ├── city.ts           ✅
│   │   │       ├── landmark.ts       ✅
│   │   │       ├── package.ts        ✅
│   │   │       └── guide.ts          ✅
│   │   ├── shared/
│   │   │   └── components/
│   │   │       └── navbar/           ✅
│   │   ├── features/
│   │   │   ├── home/                 ✅
│   │   │   ├── cities/               ✅
│   │   │   ├── landmarks/            ✅
│   │   │   ├── packages/             ✅
│   │   │   ├── guides/               ⬜
│   │   │   ├── auth/                 ⬜
│   │   │   ├── profile/              ⬜
│   │   │   ├── bookings/             ⬜
│   │   │   ├── payment/              ⬜
│   │   │   ├── chat/                 ⬜
│   │   │   ├── reviews/              ⬜
│   │   │   ├── notifications/        ⬜
│   │   │   └── admin/                ⬜
│   │   ├── app.routes.ts             ✅
│   │   ├── app.config.ts             ✅
│   │   ├── app.ts                    ✅
│   │   └── app.html                  ✅
│   ├── environments/
│   │   ├── environment.ts            ✅
│   │   └── environment.development.ts ✅
│   ├── styles.scss                   ✅
│   └── main.ts                       ✅
└── angular.json                      ✅
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

### Clean Architecture Pattern
- **model** — interface بتاعة الـ API response
- **service** — بيكال الـ API عن طريق `ApiService`
- **component** — بيستخدم الـ service وبيعرض الداتا

---

## ✅ Progress Overview

| # | الصفحة | الحالة | الـ Endpoints |
|---|--------|--------|---------------|
| 01 | Navbar | ✅ Done | — |
| 02 | Home Page | ✅ Done | trending, packages, cities |
| 03 | Cities Page | ✅ Done | GET /api/cities |
| 04 | Landmarks Page | ✅ Done | GET /api/landmarks |
| 05 | Packages Page | ✅ Done | GET /api/packages |
| 06 | Guides Page | ⬜ Not Started | GET /api/guides |
| 07 | Auth — Login/Register | ⬜ Not Started | POST /api/auth/login, register |
| 08 | Forgot/Reset Password | ⬜ Not Started | POST /api/auth/forget-password |
| 09 | My Profile | ⬜ Not Started | GET/PUT /api/users/me |
| 10 | City Details | ⬜ Not Started | GET /api/cities/{id} |
| 11 | Landmark Details | ⬜ Not Started | GET /api/landmarks/{id} |
| 12 | Package Details | ⬜ Not Started | GET /api/packages/{id} |
| 13 | Guide Profile (Public) | ⬜ Not Started | GET /api/guides/{id} |
| 14 | Custom Trip Builder | ⬜ Not Started | POST /api/custom-trips/calculate |
| 15 | Book a Package | ⬜ Not Started | POST /api/bookings |
| 16 | My Bookings | ⬜ Not Started | GET /api/bookings/my |
| 17 | Payment | ⬜ Not Started | POST /api/payments/initiate |
| 18 | Chat | ⬜ Not Started | SignalR + /api/chat |
| 19 | Reviews | ⬜ Not Started | POST /api/reviews |
| 20 | Notifications | ⬜ Not Started | GET /api/notifications |
| 21 | Guide Dashboard | ⬜ Not Started | GET /api/bookings/guide |
| 22 | Guide Packages | ⬜ Not Started | GET/POST /api/packages |
| 23 | Admin Dashboard | ⬜ Not Started | GET /api/admin/dashboard |
| 24 | Admin Users | ⬜ Not Started | GET /api/admin/users |
| 25 | Admin Guides | ⬜ Not Started | GET /api/admin/guides/pending |
| 26 | Admin Cities | ⬜ Not Started | GET/POST /api/cities |
| 27 | Admin Landmarks | ⬜ Not Started | GET/POST /api/landmarks |
| 28 | Admin Bookings | ⬜ Not Started | GET /api/admin/bookings |
| 29 | Admin Reviews | ⬜ Not Started | GET /api/admin/reviews |
| 30 | Footer Component | ⬜ Not Started | — |
| 31 | Auth Guard | ⬜ Not Started | — |
| 32 | JWT Interceptor | ⬜ Not Started | — |
| 33 | Auth Service | ⬜ Not Started | — |

---

## 📋 Detailed Steps Log

### 01 — Setup ✅
- [x] `ng new rihla --routing --style=scss`
- [x] Bootstrap 5 + FontAwesome installed
- [x] `angular.json` — styles + scripts configured
- [x] `zone.js` added to `main.ts`
- [x] `skipTests: true` في `angular.json`
- [x] `environments/` — apiUrl configured

### 02 — Navbar ✅
- [x] `shared/components/navbar/` component
- [x] Logo من `public/images/logo.png`
- [x] Links: Home, Cities, Landmarks, Packages, Guides
- [x] Auth Buttons: Login, Sign Up
- [x] `routerLinkActive` للـ active state
- [x] Sticky top + shadow

### 03 — Core Setup ✅
- [x] `ApiService` — base HTTP service مع `environment.apiUrl`
- [x] Models: `City`, `Landmark`, `Package`, `Guide`
- [x] Services: `CityService`, `LandmarkService`, `PackageService`, `GuideService`

### 04 — Home Page ✅
- [x] Hero Section — `hero.jpg` + overlay + text + buttons
- [x] Search Bar — Packages/Landmarks/Guides tabs + Destination + Date + Travelers
- [x] Features Section — 4 icons
- [x] How Rihla Works — 3 steps بالصور
- [x] Popular Destinations — trending cities من API ✅
- [x] Featured Packages — 4 packages من API ✅
- [x] CTA Section
- [x] Endpoints: `GET /api/cities/trending`, `GET /api/packages`, `GET /api/cities`

### 05 — Cities Page ✅
- [x] Hero Slider — 5 slides بتتقلب كل 3 ثواني
- [x] Search Bar — بيفلتر المدن بالاسم
- [x] Cities Grid — cards مع صورة، اسم، عدد المعالم
- [x] Endpoint: `GET /api/cities`

### 06 — Landmarks Page ✅
- [x] Hero Slider — نفس slides الـ Cities
- [x] Search Bar
- [x] Filters — All Cities dropdown + Category buttons
- [x] Landmarks Grid — cards مع صورة، category badge، rating، entry fee، location
- [x] Loading spinner
- [x] Empty state
- [x] Endpoint: `GET /api/landmarks` مع filters

### 07 — Packages Page ✅
- [x] Hero Slider
- [x] Search Bar
- [x] Filters — City, Duration, Max Price
- [x] Packages Grid — cards مع صورة، compare button، city badge، details
- [x] Compare Bar — لما تضيف packages للمقارنة
- [x] Endpoint: `GET /api/packages` مع filters

---

## 🔑 Backend Fixes Done
| الـ Fix | الملف |
|---------|-------|
| `LandmarksCount` في Cities | `CityService.cs` |
| `Images` في Landmarks | `LandmarkService.cs` |
| `CityName` في Landmarks | `LandmarkService.cs` |
| `GET/DELETE /api/admin/users/{id}` | `AdminController.cs` |

---

## 📌 Legend
| Icon | Meaning |
|------|---------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Done |
| ⚠️ | Has Issue |
| ⏳ | Pending |