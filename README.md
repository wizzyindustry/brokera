# BROKERA — Frontend (public + buyer flow)

Pages built so far, following the group's API Field Naming Standard and the SRS's
Jakarta EE / Servlet / JSP tech stack.

## What's in here

```
brokera-frontend/
├── index.html / login.html / register.html / pool.html / listing.html   ← open these directly to preview
├── broker-pool.html / claims.html                               ← broker claim flow
├── post-listing.html / my-listings.html                         ← seller flow
├── dashboard.html                                               ← unified role-based dashboard
├── css/brokera.css
├── js/auth.js (login + register — POST /api/auth/login,register)
├── js/goods.js       (browse pool, listing detail, make an offer)
├── js/broker.js      (claim a listing, view/release my claims)
├── js/seller.js      (post a listing, view/withdraw my listings)
├── js/dashboard.js   (role-switching stats, activity, notifications)
└── webapp/           ← identical pages as .jsp, ready to drop into Tomcat
    ├── index.jsp, login.jsp, register.jsp, pool.jsp, listing.jsp,
    │   broker-pool.jsp, claims.jsp, post-listing.jsp, my-listings.jsp,
    │   dashboard.jsp
    ├── css/brokera.css
    └── js/auth.js, goods.js, broker.js, seller.js, dashboard.js
```

The `.html` files and the `.jsp` files under `webapp/` are the same markup —
these pages don't use any JSP scriptlets or tags, so they're valid as plain
HTML for quick preview *and* valid as JSP once deployed.

## Running it in VS Code

**Just to look at the design** (no backend needed):
1. Open this folder in VS Code.
2. Install the "Live Server" extension (or any static server).
3. Right-click `index.html` → "Open with Live Server".
4. Click through to `pool.html` and `listing.html` — since no backend is
   running yet, `js/goods.js` falls back to built-in sample data so the
   pages still render properly. Once your `/api/goods` and
   `/api/categories` endpoints are live, it'll use real data automatically
   — no code changes needed.

**To integrate into the actual Jakarta EE project:**
1. Copy everything inside `webapp/` into your project's `src/main/webapp/`
   (or wherever your Tomcat webapp root is).
2. Deploy as usual — the pages call `/api/...` with a relative path, so
   they'll hit whatever host/port serves the app.

## Known gaps to raise with your teammates

- `js/auth.js` posts to `POST /api/auth/register` with
  `{ fullName, email, phone, password }`. That endpoint isn't in the API
  Field Naming Standard doc yet (it only defines `/api/auth/login`,
  `/logout`, `/session`) — the field names follow the same camelCase
  convention and the `USERS` entity, but get it confirmed before the
  backend implements it.
- `js/seller.js` calls `GET /api/goods/my-listings` and expects it to
  return the logged-in seller's own goods — that matches the naming
  doc's description, just flagging it since there's no field dictionary
  entry to double-check the response shape against.
- `DELETE /api/goods/{id}` is used for "withdraw" on the my-listings page.
  The SRS (FR-GOOD-05) says withdrawing should set status to `WITHDRAWN`
  rather than deleting the record — worth confirming with the backend
  that `DELETE` is a soft withdraw and not a hard delete, since the naming
  doc doesn't distinguish the two.

- `js/dashboard.js` switches between Buyer/Broker/Seller/Admin views
  client-side only (per the SRS's "role switcher changes navigation, never
  backend authorization" rule) — it's built entirely on sample data since
  there's no `/api/reports` or admin-summary endpoint defined in the
  naming standard at all. Once those exist, swap the `SAMPLE` object in
  `dashboard.js` for real `fetch` calls the same way `goods.js` and
  `broker.js` already do.

## All pages built

Public pages, buyer flow (browse/offer), broker flow (claim/manage claims),
seller flow (post/manage listings), and a unified role-based dashboard are
all in place with a consistent design system. Not built: admin CRUD pages
(categories, commission rules, disputes, audit log), deal/negotiation
detail views, and messaging — say the word if you want any of those next.
