# Rihla — Frontend Progress Tracker
> Angular 19 | Bootstrap 5 | FontAwesome | Clean Architecture

---

## 🌐 Project Info
- **Project Name:** Rihla
- **Framework:** Angular 19 (Standalone Components)
- **Styling:** Bootstrap 5 + SCSS + FontAwesome
- **API:** https://tourguidee.runasp.net/api
- **Local:** http://localhost:4200
- **Live:** https://tour-guide-frontend-sable.vercel.app/
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
│   │   │   │   ├── package.ts                              ✅ (+ Create/Update/AddLandmark + guideProfileId + PackageImageDto)
│   │   │   │   ├── guide.ts                                ✅ (+ UpdateGuideRequest)
│   │   │   │   ├── auth.ts                                 ✅ (+ userId + avatarUrl?)
│   │   │   │   ├── admin.ts                                ✅
│   │   │   │   ├── booking.ts                              ✅ (+ Create/Reject requests, FilterParams)
│   │   │   │   ├── review.ts                               ✅ (+ CreateReviewRequest, UpdateReviewRequest)
│   │   │   │   ├── notification.ts                         ✅
│   │   │   │   ├── chat.ts                                 ✅ (MessageDto, ConversationDto, SendMessageRequest)
│   │   │   │   ├── payment.ts                              ✅ (InitiatePaymentRequest, InitiatePaymentResponse, PaymentStatusDto)
│   │   │   │   ├── custom-trip.ts                          ✅ (CalculatePriceRequest/Response, AvailableGuidesRequest, CreateCustomTripRequest, LandmarkPriceBreakdown)
│   │   │   │   └── user.model.ts                           ✅
│   │   │   └── services/
│   │   │       ├── api.ts                                  ✅ (+ putForm)
│   │   │       ├── auth.ts                                 ✅ (+ updateAvatarInStorage)
│   │   │       ├── city.ts                                 ✅ (+ getCityById, pageSize default 1000)
│   │   │       ├── landmark.ts                             ✅ (+ getLandmarkById)
│   │   │       ├── package.ts                              ✅ (+ CRUD + toggle + images + landmarks + getById + pageSize 1000)
│   │   │       ├── guide.ts                                ✅
│   │   │       ├── admin.service.ts                        ✅
│   │   │       ├── booking.service.ts                      ✅ (Tourist + Guide + Admin + getBookingById)
│   │   │       ├── review.service.ts                       ✅ (+ createReview, updateReview, deleteReview)
│   │   │       ├── notification.service.ts                 ✅ (+ SignalR + Email trigger)
│   │   │       ├── chat.service.ts                         ✅ (+ SignalR + JoinBookingGroup + markConversationAsRead + decrementUnreadCount)
│   │   │       ├── payment.service.ts                      ✅ (initiatePayment, getPaymentStatus)
│   │   │       ├── custom-trip.service.ts                  ✅ (calculatePrice, getAvailableGuides, createCustomTrip)
│   │   │       └── user.ts                                 ✅
│   │   ├── shared/components/
│   │   │   ├── navbar/                                     ✅ (+ Custom Trip link in Tourist dropdown)
│   │   │   └── footer/                                     ✅ (+ Social links + Payment badges)
│   │   ├── features/
│   │   │   ├── home/                                       ✅ (+ getPackageImage() fix)
│   │   │   ├── about/                                      ✅ (Hero + What is Rihla + How It Works + Why Choose Us + CTA)
│   │   │   ├── cities/
│   │   │   │   ├── cities/                                 ✅
│   │   │   │   └── city-detail/                            ✅
│   │   │   ├── landmarks/
│   │   │   │   ├── landmarks/                              ✅
│   │   │   │   └── landmark-detail/                        ✅
│   │   │   ├── packages/
│   │   │   │   ├── packages/                               ✅ (+ pagination 100/page + pageSize 1000 fix)
│   │   │   │   └── package-detail/                         ✅ (+ getImageUrl() fix)
│   │   │   ├── guides/
│   │   │   │   ├── guides/                                 ✅
│   │   │   │   └── guide-detail/                           ✅ (+ getPackageImage() fix)
│   │   │   ├── auth/
│   │   │   │   ├── login/                                  ✅
│   │   │   │   ├── register-select/                        ✅
│   │   │   │   ├── register-tourist/                       ✅
│   │   │   │   ├── register-guide/                         ✅
│   │   │   │   ├── forgot-password/                        ✅
│   │   │   │   ├── reset-password/                         ✅
│   │   │   │   └── confirm-email/                          ✅
│   │   │   ├── profile/                                    ✅
│   │   │   ├── bookings/my-bookings/                       ✅ (+ Leave Review / Edit Review modal + Chat with Guide + Pay Now)
│   │   │   ├── leave-review/                               ✅ (modal component — used in my-bookings)
│   │   │   ├── notifications/                              ✅ (+ SignalR + Email + Back button)
│   │   │   ├── chat/                                       ✅ (+ SignalR + phantom conversation + mark as read + UTC time fix)
│   │   │   ├── payment/
│   │   │   │   ├── payment.ts                              ✅ (iFrame component)
│   │   │   │   ├── payment.html                            ✅
│   │   │   │   ├── payment.scss                            ✅
│   │   │   │   ├── payment-callback.ts                     ✅ (success/fail page)
│   │   │   │   ├── payment-callback.html                   ✅
│   │   │   │   └── payment-callback.scss                   ✅
│   │   │   ├── custom-trip/
│   │   │   │   ├── custom-trip.ts                          ✅ (4-step wizard component)
│   │   │   │   ├── custom-trip.html                        ✅
│   │   │   │   └── custom-trip.scss                        ✅
│   │   │   ├── guide-dashboard/
│   │   │   │   ├── guide-layout/                           ✅ (+ bell badge + chat badge + SignalR)
│   │   │   │   ├── guide-dashboard/                        ✅
│   │   │   │   ├── guide-profile/                          ✅
│   │   │   │   ├── guide-packages/                         ✅ (+ city filter fix + landmark cityId cast fix)
│   │   │   │   ├── incoming-bookings/                      ✅ (+ Chat with Tourist button)
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
│   │   ├── app.routes.ts                                   ✅ (+ /about + /custom-trip + /notifications + /chat + /payment + /payment/callback)
│   │   ├── app.config.ts                                   ✅
│   │   ├── app.ts                                          ✅ (Navbar + Footer hidden for Admin + Guide + /notifications + /chat + /payment)
│   │   └── app.html                                        ✅ (+ app-footer)
│   ├── environments/                                       ✅ (+ hubUrl + paymobIframeId: '1069052')
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
- Navbar: hidden in `/auth/*`, `/admin/*`, `/guide/*`, `/notifications`, `/chat`, `/payment*`, and any Admin role
- Footer: hidden in same pages as Navbar (same `showNavbar` flag)
- Guide: Navbar visible on public pages (e.g. /guides), hidden inside /guide/* layout
- Admin Layout: Sidebar collapsible 260px to 72px + Top Navbar
- Guide Layout: Sidebar collapsible 260px to 72px + Top Navbar
- Tourist: uses public Navbar with extra items when logged in

### Navbar — Auth State
- Guest: Login + Sign Up
- Tourist: avatar dropdown (My Profile, My Bookings, Custom Trip, My Chat, Notifications, Logout)
- Guide: Dashboard button + bell badge + chat badge + avatar dropdown (My Profile, Logout)
- Admin: Dashboard button + avatar dropdown (My Profile, Logout)

---

## ✅ Progress Overview — ALL DONE 🎉

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
| 15 | My Bookings (Tourist) | ✅ Done | GET /api/bookings/my + cancel + leave/edit review + chat + pay |
| 16 | City Details | ✅ Done | GET /api/cities/{id} + GET /api/landmarks?cityId={id} |
| 17 | Landmark Details | ✅ Done | GET /api/landmarks/{id} |
| 18 | Package Details | ✅ Done | GET /api/packages/{id} + POST /api/bookings |
| 19 | Guide Profile (Public) | ✅ Done | GET /api/guides/{id} + reviews + packages |
| 20 | Book a Package | ✅ Done | POST /api/bookings (inline on Package Details) |
| 21 | Reviews (Tourist) | ✅ Done | POST /api/reviews + PUT /api/reviews/{id} |
| 22 | Notifications | ✅ Done | GET /api/notifications + SignalR + Email |
| 23 | Chat | ✅ Done | SignalR /hubs/chat + GET /api/chat/* + mark as read + UTC fix |
| 24 | Payment | ✅ Done | POST /api/payments/initiate + Paymob iFrame + callback |
| 25 | About Page | ✅ Done | — |
| 26 | Footer | ✅ Done | — |
| 27 | Custom Trip Builder | ✅ Done | POST /api/custom-trips/calculate + /available-guides + POST /api/custom-trips |
| 28 | Guide Dashboard | ✅ Done | GET /api/guides/me + GET /api/bookings/guide |
| 29 | Guide — My Profile | ✅ Done | GET/PUT /api/guides/me + GET /api/cities |
| 30 | Guide — My Packages | ✅ Done | GET/POST/PUT/DELETE /api/packages + toggle + images + landmarks |
| 31 | Guide — Incoming Bookings | ✅ Done | GET /api/bookings/guide + accept/reject/complete + chat |
| 32 | Guide — My Reviews | ✅ Done | GET /api/reviews/guide/{guideId} |
| 33 | Admin Dashboard | ✅ Done | GET /api/admin/dashboard + reports |
| 34 | Admin Users | ✅ Done | GET /api/admin/users + ban + delete |
| 35 | Admin Guides | ✅ Done | pending + approve/reject/suspend |
| 36 | Admin Cities | ✅ Done | GET/POST/PUT/DELETE + upload-image |
| 37 | Admin Landmarks | ✅ Done | GET/POST/PUT/DELETE + upload-image |
| 38 | Admin Categories | ✅ Done | GET/POST/DELETE /api/categories |
| 39 | Admin Bookings | ✅ Done | GET /api/bookings/admin |
| 40 | Admin Reviews | ✅ Done | GET /api/admin/reviews + delete |
| 41 | Auth Guard | ✅ Done | — |
| 42 | JWT Interceptor | ✅ Done | — |

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
- Actions: Cancel (Pending) | Pay Now → /payment?bookingId=X (Confirmed+Unpaid) | Chat with Guide (Confirmed/Completed) | Leave Review / Edit Review (Completed)
- Empty state with link to /packages
- openChat(bookingId) → navigate to /chat?bookingId=X
- openPayment(bookingId) → navigate to /payment?bookingId=X

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

### Notifications ✅
- Path: features/notifications/
- Route: /notifications (authGuard — all roles)
- Navbar hidden on /notifications page (app.ts)
- GET /api/notifications → load paginated notifications
- GET /api/notifications/count → unread count
- PUT /api/notifications/{id}/read → mark single as read
- PUT /api/notifications/read-all → mark all as read
- SignalR: connects to /hubs/notifications on login → listens to NotificationReceived
- Email: backend sends email on every CreateNotificationAsync call (fire & forget)
- Back button (Location.back()) → styled with hover primary color
- Unread dot + unread border-left on each item
- Icon + color per NotificationType
- Relative time formatting (Just now / Xm ago / Xh ago / Xd ago)
- notification.ts model: NotificationDto
- notification.service.ts: BehaviorSubject for notifications$ + unreadCount$
- Guide Layout: bell icon with unread badge → /notifications
- Tourist Navbar: Notifications link with unread badge → /notifications
- npm package: @microsoft/signalr installed
- environment.ts: hubUrl added

### Chat ✅
- Path: features/chat/
- Route: /chat (Tourist → roleGuard Tourist) + /guide/chat (Guide → child of GuideLayout)
- Navbar hidden on /chat page (app.ts)
- GET /api/chat/conversations → load all conversations
- GET /api/chat/{bookingId}/messages → load messages (paginated, page=1, pageSize=50)
- GET /api/chat/unread-count → unread badge in Guide Topbar
- PUT /api/chat/{bookingId}/read → mark all messages in conversation as read (on selectConversation)
- SignalR: connects to /hubs/chat → JoinBookingGroup + ReceiveMessage + UserOnline/Offline
- Phantom conversation: لو فتح الشات من booking مش عنده conversation بعد → يعمل phantom من BookingService.getBookingById
- JoinBookingGroup: بيتنادى عند selectConversation + setActiveConversation (phantom)
- onreconnected: بيعمل rejoin للـ booking group تلقائياً بعد reconnect
- selectConversation: بيعمل decrementUnreadCount + markConversationAsRead في نفس الوقت
- UTC time fix: formatTime + formatDate بيضيف 'Z' للـ date string لو مش موجودة
- Sidebar: قائمة conversations مع avatar + last message + unread badge + online dot
- Messages body: mine (يمين أحمر) / other (شمال أبيض)
- Input: textarea + Enter to send (Shift+Enter for new line)
- Scroll: بيروح للآخر تلقائياً عند رسايل جديدة فقط (shouldScrollToBottom flag)
- Guide Layout: chat icon مع unread badge → /guide/chat (child route — الـ GuideLayout مش بيتدمر)
- Guide Incoming Bookings: Chat with Tourist button → /guide/chat?bookingId=X
- Tourist My Bookings: Chat with Guide button → /chat?bookingId=X
- chat.ts models: MessageDto, ConversationDto, SendMessageRequest
- chat.service.ts: BehaviorSubject conversations$ + messages$ + onlineUsers$ + chatUnreadCount$
- chat.service.ts: markConversationAsRead(bookingId) → PUT /api/chat/{bookingId}/read
- chat.service.ts: decrementUnreadCount(amount) → local update للـ badge

### Payment ✅
- Path: features/payment/
- Routes: /payment (Tourist — roleGuard) + /payment/callback (AllowAnonymous)
- Navbar hidden on /payment* pages (app.ts)
- POST /api/payments/initiate → { paymentKey, paymobOrderId, amount }
- iFrame URL: https://accept.paymob.com/api/acceptance/iframes/1069052?payment_token={paymentKey}
- payment.ts: loading/error/iframeUrl signals + DomSanitizer.bypassSecurityTrustResourceUrl
- payment-callback.ts: reads success query param من Paymob redirect
- My Bookings: Pay Now button → navigate to /payment?bookingId=X (Confirmed + Unpaid فقط)
- Paymob Dashboard: رابط الويب هوك = https://tourguidee.runasp.net/api/payments/webhook
- Paymob Dashboard: الرابط (Response URL) = https://tour-guide-frontend-sable.vercel.app/payment/callback
- environment.ts: paymobIframeId: '1069052'
- Test Card: 5123456789012346 | 12/27 | 123

### Custom Trip Builder ✅
- Path: features/custom-trip/
- Route: /custom-trip (Tourist only — roleGuard)
- 4-step wizard: Trip Details → Landmarks → Select Guide → Review & Confirm
- Step 1: City dropdown + Start Date + Duration (days spinner) + Persons spinner + summary pill
- Step 2: Landmark grid (click to toggle) — GET /api/landmarks?cityId={id} — images from landmarks[0]
- Step 3: Available guides grid (click to select) — POST /api/custom-trips/available-guides
- Step 4: Full price breakdown table + trip summary + confirm button
- POST /api/custom-trips/calculate → { landmarkEntryFeesTotal, guideFixedFee, durationMultiplier, totalPrice, breakdown[] }
- POST /api/custom-trips → creates booking → navigate to /bookings on success
- Price formula: (sum of entryFees × persons) × (1 + (days-1) × 0.2)
- Navbar link "Custom Trip" added to Tourist dropdown (fa-wand-magic-sparkles icon)
- custom-trip.ts models: CalculatePriceRequest, CalculatePriceResponse, LandmarkPriceBreakdown, AvailableGuidesRequest, CreateCustomTripRequest
- custom-trip.service.ts: calculatePrice, getAvailableGuides, createCustomTrip

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
- Image gallery: main image + thumbnails — getImageUrl(index) fix (PackageImageDto)
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
- getPackageImage() fix → pkg.images[0].imageUrl (PackageImageDto)
- Back link → /guides

### About Page ✅
- Path: features/about/
- Route: /about
- Static page — no API calls
- Hero: background image (auth/auth.png) + overlay + title + CTA
- What is Rihla: text block + hero image + mini stats (Multiple Cities / Certified Guides / Rich Landmarks)
- How It Works: 3 step cards (Browse / Book / Explore & Review)
- Why Choose Us: 4 feature cards (Verified Guides / Rich Landmarks / Real-time Chat / Secure Payment)
- CTA Section: background image (auth/auth.png) + Browse Packages + Meet Our Guides buttons
- Navbar link "About" added

### Footer ✅
- Path: shared/components/footer/
- Used in: app.html (same showNavbar flag — hidden on auth/admin/guide/chat/payment/notifications)
- 3 columns: Brand + Quick Links + Contact & Payment
- Brand: Logo (white filter) + tagline + Social icons
- Social: Facebook (#1877F2) + Instagram (gradient) + LinkedIn (#0A66C2) — real links
- Quick Links: Home / Cities / Landmarks / Packages / Guides / About
- Contact: mohamedeltramsy71@gmail.com + Egypt
- We Accept: Visa badge + Paymob badge (styled fit-content width)
- Bottom bar: © year + "Made with ❤️ for Egypt"

### Admin Layout ✅
- Sidebar collapsible (260px to 72px), Toggle always visible
- Logout → /auth/login
- Nav: Dashboard, Users, Guides, Cities, Landmarks, Bookings, Categories, Reviews
- Reactive avatar + fullName via currentUser$ subscription
- Topbar dropdown: My Profile → /profile
- No notifications or chat needed for Admin role

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
- Topbar dropdown: My Profile → /profile (shared)
- router-outlet for child routes under /guide (including /guide/chat)
- app.ts: Navbar hidden for /guide/* routes AND Admin role
- Bell icon with unread badge → /notifications
- Chat icon with unread badge → /guide/chat
- SignalR (Notifications + Chat) starts on GuideLayout init + stops on destroy
- unreadCount$ subscribed from NotificationService
- chatUnreadCount$ subscribed from ChatService
- /guide/chat is child route → GuideLayout stays alive → badge updates correctly

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
- Landmarks modal: Filter by City dropdown → filters landmarks by cityId
- selectedLandmarkCityId fix: +this.selectedLandmarkCityId (cast string → number)
- city.service.ts: pageSize default → 1000 (جيب كل المدن)

### Guide — Incoming Bookings ✅
- Filter tabs: All / Pending / Confirmed / Rejected / Completed
- Actions: Accept / Reject (with reason modal) / Mark Complete / Chat with Tourist (Confirmed/Completed)
- Toast notifications after each action
- openChat(bookingId) → navigate to /guide/chat?bookingId=X

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
LoginResponse { userId, accessToken, refreshToken, role, fullName, email, avatarUrl? }
Backend wraps: { message, data: LoginResponse }
```

### chat.ts
```
MessageDto { id, content, isRead, createdAt, senderId, senderName, bookingId }
ConversationDto { bookingId, otherUserId, otherUserName, otherUserAvatar?, lastMessage, lastMessageAt, unreadCount }
SendMessageRequest { receiverId, content, bookingId }
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
Guide { guideProfileId, userId, fullName, bio, avatarUrl?, experienceYears,
        averageRating, languages[], coveredCities[], totalReviews, isAvailable }
GuideProfile { id, userId, fullName, email, avatarUrl?, bio?, languages[],
               experienceYears, averageRating, totalReviews, isApproved,
               isAvailable, coveredCities[] }
UpdateGuideRequest { bio?, languages[], experienceYears, coveredCityIds[] }
```

### package.ts
```
PackageImageDto { id: number, imageUrl: string }
Package { id, title, description, price, durationDays, maxPersons, isActive,
          averageRating, cityNameEn, guideId, guideProfileId, guideName,
          images: PackageImageDto[], landmarks: PackageLandmark[] }
PackageLandmark { landmarkId, nameEn, dayNumber, order }
CreatePackageRequest { title, description?, price, durationDays, maxPersons, cityId }
UpdatePackageRequest { title, description?, price, durationDays, maxPersons }
AddLandmarkToPackageRequest { landmarkId, dayNumber, order }
```

### landmark.ts
```
Landmark { id, nameEn, nameAr, description, location, entryFee,
           averageRating, category, cityId, cityNameEn, images: string[] }
```

### notification.ts
```
NotificationDto { id, message, type, isRead, createdAt, bookingId? }
```

### payment.ts
```
InitiatePaymentRequest { bookingId: number }
InitiatePaymentResponse { paymentKey, paymobOrderId, amount }
PaymentStatusDto { id, bookingId, amount, status, paymobOrderId?, paymobTransactionId?, createdAt }
```

### custom-trip.ts
```
CalculatePriceRequest { landmarkIds: number[], durationDays, numberOfPersons, guideProfileId }
LandmarkPriceBreakdown { landmarkId, name, entryFee }
CalculatePriceResponse { landmarkEntryFeesTotal, guideFixedFee, durationMultiplier, totalPrice, breakdown: LandmarkPriceBreakdown[] }
AvailableGuidesRequest { cityId, startDate: string, endDate: string }
CreateCustomTripRequest { landmarkIds: number[], guideProfileId, startDate: string, numberOfPersons, durationDays }
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

### city.ts
```
getCities(page = 1, pageSize = 1000)   GET /api/cities  ← pageSize 1000 جيب كل المدن
getCityById(id)                         GET /api/cities/{id}
getTrendingCities()                     GET /api/cities/trending
createCity(data) / updateCity / deleteCity
```

### package.ts service
```
getPackages(params?)             GET /api/packages  ← pageSize: 1000 مضاف افتراضياً
getPackageById(id)               GET /api/packages/{id}
comparePackages(ids)             GET /api/packages/compare
createPackage(request)           POST /api/packages
updatePackage(id, request)       PUT /api/packages/{id}
deletePackage(id)                DELETE /api/packages/{id}
togglePackage(id)                PUT /api/packages/{id}/toggle
uploadImage(packageId, file)     POST /api/packages/{id}/images
deleteImage(packageId, imageId)  DELETE /api/packages/{id}/images/{imageId}
addLandmark(packageId, req)      POST /api/packages/{id}/landmarks
removeLandmark(pkgId, lmId)      DELETE /api/packages/{id}/landmarks/{landmarkId}
```

### custom-trip.service.ts
```
calculatePrice(request)      POST /api/custom-trips/calculate → CalculatePriceResponse
getAvailableGuides(request)  POST /api/custom-trips/available-guides → Guide[]
createCustomTrip(request)    POST /api/custom-trips → { bookingId, message }
```

### payment.service.ts
```
initiatePayment(request)     POST /api/payments/initiate → InitiatePaymentResponse
getPaymentStatus(bookingId)  GET /api/payments/{bookingId} → PaymentStatusDto
```

### chat.service.ts
```
startConnection()                           — connect to SignalR /hubs/chat
stopConnection()                            — disconnect SignalR
sendMessage(receiverId, content, bookingId) — invoke SendMessage via SignalR (JoinBookingGroup first)
markAsRead(messageId)                       — invoke MarkAsRead via SignalR
loadConversations()                         GET /api/chat/conversations
loadMessages(bookingId, page?, pageSize?)   GET /api/chat/{bookingId}/messages
loadChatUnreadCount()                       GET /api/chat/unread-count
markConversationAsRead(bookingId)           PUT /api/chat/{bookingId}/read
setActiveConversation(bookingId?)           — set active + join group (phantom support)
decrementUnreadCount(amount)                — local update للـ chatUnreadCount$ badge
isUserOnline(userId)                        — check online status
conversations$, messages$, onlineUsers$, chatUnreadCount$  BehaviorSubjects
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

### notification.service.ts
```
startConnection()         — connect to SignalR /hubs/notifications
stopConnection()          — disconnect SignalR
loadNotifications(page?)  GET /api/notifications
loadUnreadCount()         GET /api/notifications/count
markAsRead(id)            PUT /api/notifications/{id}/read
markAllAsRead()           PUT /api/notifications/read-all
notifications$, unreadCount$  BehaviorSubjects
```

---

## 🔧 Bug Fixes Applied (Post-Launch)

| Bug | Fix |
|-----|-----|
| المدن بتظهر 10 بس في packages filter | city.service.ts: pageSize default → 1000 |
| الباكيدجات بتظهر 10 بس في packages page | package.service.ts: pageSize: '1000' مضاف في getPackages() |
| صور الباكيدجات مش بتظهر في Home | home.ts: getPackageImage() — pkg.images[0].imageUrl بدل pkg.images[0] |
| صور الباكيدجات مش بتظهر في Guide Detail | guide-detail.ts: getPackageImage() — نفس الـ fix |
| صور الباكيدجات مش بتظهر في Package Detail | package-detail.ts: getImageUrl(index) — img.imageUrl بدل img مباشرة |
| اللاند ماركس مش بتتفلتر بالمدينة | guide-packages.ts: selectedLandmarkCityId + availableLandmarks() filter |
| فلتر اللاند ماركس بالمدينة مش شغال | +this.selectedLandmarkCityId (cast string → number في المقارنة) |
| Packages pagination مش شغالة | packages.ts: pagedPackages + applyPagination() — 100 per page |

---

## 🔑 Backend Fixes Done

| Fix | File |
|-----|------|
| Auth response wrapped { message, data } | AuthController.cs |
| Reset/Confirm Email links → Frontend | AuthController.cs |
| JWT Interceptor PUBLIC_ENDPOINTS fix | jwt.interceptor.ts |
| IRepository + GenericRepository Include methods | Domain + Infrastructure |
| IRepository.FindWithNestedIncludeAsync → object? (nullable fix) | IRepository.cs + GenericRepository.cs |
| BookingService .Include(b => b.Package) — removed cast | BookingService.cs |
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
| LoginResponse.UserId + AvatarUrl added | LoginResponse.cs |
| AuthService — UserId + AvatarUrl في كل new LoginResponse | AuthService.cs |
| NotificationService + SignalR push via INotificationPushService | NotificationService.cs |
| NotificationService + Email on every notification (fire & forget) | NotificationService.cs + EmailService.cs |
| INotificationPushService + NotificationPushService | Application + Infrastructure |
| IEmailService.SendNotificationEmailAsync added | IEmailService.cs + EmailService.cs |
| IEmailService.SendNewMessageEmailAsync added | IEmailService.cs + EmailService.cs |
| ChatHub inject IEmailService + UserManager — email on new message | ChatHub.cs |
| ServiceCollectionExtensions + INotificationPushService DI | ServiceCollectionExtensions.cs |
| ChatHub.OnConnectedAsync: user_{userId} group فقط (شيل DB query) | ChatHub.cs |
| ChatHub.JoinBookingGroup: method جديدة — الـ Frontend بيناديها | ChatHub.cs |
| ChatHub.SendMessage: تحقق participant + SenderName + ISO CreatedAt + Email | ChatHub.cs |
| IChatService.MarkMessagesAsReadAsync added | IChatService.cs |
| ChatService.MarkMessagesAsReadAsync implemented | ChatService.cs |
| ChatController PUT /{bookingId}/read endpoint added | ChatController.cs |
| ChatRepository.GetMessagesAsync: OrderBy بدل OrderByDescending | ChatRepository.cs |
| ChatRepository.GetBookingWithGuideAsync: أضاف Include(GuideProfile) | ChatRepository.cs |
| PaymentService + PaymobService (3-step flow) | PaymentService.cs + PaymobService.cs |
| PaymentsController: initiate + webhook + status | PaymentsController.cs |
| Payment + PaymentStatus entities | Payment.cs |
| CustomTripService.GetAvailableGuidesAsync: استخدام FindWithNestedIncludeAsync | CustomTripService.cs |
| GuideListDto + GuideProfileId = g.Id | GuideListDto.cs + CustomTripService.cs |

---


## 🧪 Test Data

### Paymob Test Card
```
Card Number : 5123456789012346
Expiry      : 12/27
CVV         : 123
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

---

> 🎉 **Project Complete — 42/42 pages & features done!**
> 🚀 **Live at: https://tour-guide-frontend-sable.vercel.app/**