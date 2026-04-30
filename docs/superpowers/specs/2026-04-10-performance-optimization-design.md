# VStories Performance Optimization Design

**Date:** 2026-04-10
**Status:** Approved
**Scope:** Storefront + Admin panel — data fetching, auth flow, animations, bundle size

---

## Problem Statement

The app feels slow on initial load and during admin use. Two specific complaints:
1. CTA buttons feel unresponsive and product cards load with visible delay
2. Admin panel shows a fullscreen spinner for 300–600ms before anything renders, then products/settings fetch separately on top

Root causes identified via full codebase audit.

---

## Section 1 — Data Fetching Layer

### 1a. Homepage parallel fetch
**File:** `src/app/page.tsx`

`getWebsiteConfig()` and `getProducts()` are awaited sequentially. Each is a Supabase network call (~100–300ms). Fix: wrap in `Promise.all` so both run at the same time.

```ts
const [config, products] = await Promise.all([
  getWebsiteConfig(),
  getProducts(),
]);
```

### 1b. Root layout — merge announcement bar fetch
**File:** `src/app/layout.tsx` + `src/app/page.tsx` + `src/app/page.tsx:getWebsiteConfig()`

Root layout independently queries `website_customizations` for `announcement_bar` on every page render. This is a third DB call on top of the homepage's two. Fix: extend `getWebsiteConfig()` to also return `announcementConfig`, then pass it down via props instead of fetching separately in the layout.

Since the layout is a server component and `getWebsiteConfig` is already called on the homepage, the pattern to use is: move the announcement fetch into a shared server utility so it can be called from the layout with Next.js `fetch` deduplication, or fetch it once in the layout and pass as a prop (current pattern) but use `cache()` to deduplicate if called multiple times.

Simplest fix: add `announcement_bar` to the existing `getWebsiteConfig()` response and have the layout call that same cached function.

### 1c. Product page — deduplicate with `cache()`
**File:** `src/lib/services/product.service.ts`

`getProductBySlug` is called in both `generateMetadata` and the page component for the same slug. Next.js does not deduplicate Supabase calls automatically (only native `fetch` is deduplicated). Fix: wrap with `import { cache } from 'react'`.

```ts
import { cache } from 'react';
export const getProductBySlug = cache(async (slug: string) => { ... });
```

### 1d. Admin settings save — parallel upserts
**File:** `src/app/admin/settings/page.tsx`

`handleSave` runs 4 sequential `await supabase.upsert()` calls in a `for...of` loop. Each waits for the previous. Fix: run all four in parallel with `Promise.all`.

```ts
await Promise.all(
  updates.map(update =>
    supabase.from("website_customizations").upsert(update, { onConflict: 'key' })
  )
);
```

### 1e. Admin products list — narrow SELECT
**File:** `src/app/admin/products/page.tsx`

`select("*")` fetches all product fields including `description`, `ingredients`, `how_to_use`, `tags`, `combo_product_ids`. The admin list view only displays `id, name, price, stock, images`. Fix: narrow the query.

```ts
.select("id, name, price, stock, images, category_id")
```

---

## Section 2 — Admin Auth Flow

### Problem
`src/app/admin/layout.tsx` is a client component that blocks rendering on `AuthContext.loading`. The auth context resolves loading only after two sequential network calls:
1. `supabase.auth.getSession()` — ~150–300ms
2. `fetchProfile()` (profiles table) — ~150–300ms

The admin shows a fullscreen spinner for the entire duration (~300–600ms) before any page content renders. Then each admin page fires its own data fetch on mount.

### Fix: Server-side session check in admin layout
Convert `src/app/admin/layout.tsx` to a **server component**. Use the Supabase SSR server client to read the session from cookies on the server. Redirect to `/login` if no session. Check admin role from the profiles table server-side. Render layout immediately if valid.

```
Before: Browser → HTML shell → JS hydration → getSession() → fetchProfile() → show admin
After:  Browser → server reads cookies → redirect OR render admin HTML → done
```

The `AdminSidebar` and all page children remain client components. Only the outer layout wrapper changes to server-rendered.

**Admin layout structure after fix:**
- `src/app/admin/layout.tsx` → server component, calls `createServerClient`, reads session, checks `profiles.role === 'admin'`, redirects if not
- `src/components/admin/AdminShell.tsx` (new) → client component that holds the sidebar state and mobile menu toggle, receives `children` as a prop

---

## Section 3 — Frontend Animation & Bundle Cleanup

### 3a. Fix FadeIn `once: false`
**File:** `src/components/ui/FadeIn.tsx`

`viewport={{ once: false }}` causes Framer Motion to re-run the entry animation every time an element scrolls into the viewport. This fires the IntersectionObserver continuously on scroll and triggers layout recalculations. Fix: `viewport={{ once: true }}`.

### 3b. Remove staggered delays in shop grid
**File:** `src/app/shop/ShopContent.tsx`

`delay: index * 0.1` means the 10th product card has a 1-second artificial delay before appearing. With 15 products the last card waits 1.4s. Remove the stagger delay entirely — all cards fade in together on scroll.

### 3c. Lazy-load CartDrawer and MobileMenu
**File:** `src/components/layout/Navbar.tsx`

Both `CartDrawer` and `MobileMenu` are imported statically and included in the initial JS bundle, even though they're only needed when a user clicks the cart or hamburger icon. Fix: use `next/dynamic` with `{ ssr: false }`.

```ts
const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });
```

### 3d. Remove `motion.header` from Navbar
**File:** `src/components/layout/Navbar.tsx`

The `<motion.header>` wrapper adds Framer Motion overhead to a component that renders on every page. The scroll-based style change (glass shadow) is already handled by a Tailwind `transition-all` class on state change. Replace with a plain `<header>`. No visual change.

### 3e. Remove `console.log` from AuthContext
**File:** `src/context/AuthContext.tsx`

Three `console.log` calls remain in production code including one inside `onAuthStateChange` that fires on every auth event. Remove all three.

---

## Files Changed

| File | Change |
|---|---|
| `src/app/page.tsx` | Parallel fetch with `Promise.all` |
| `src/app/layout.tsx` | Remove standalone announcement bar query |
| `src/lib/services/product.service.ts` | Wrap `getProductBySlug` with `cache()`, extend `getWebsiteConfig` |
| `src/app/admin/layout.tsx` | Convert to server component with SSR session check |
| `src/components/admin/AdminShell.tsx` | New client component for sidebar state |
| `src/app/admin/settings/page.tsx` | Parallel upserts with `Promise.all` |
| `src/app/admin/products/page.tsx` | Narrow `select()` fields |
| `src/components/ui/FadeIn.tsx` | `viewport: once: true` |
| `src/app/shop/ShopContent.tsx` | Remove stagger delay |
| `src/components/layout/Navbar.tsx` | Dynamic imports, remove `motion.header` |
| `src/context/AuthContext.tsx` | Remove `console.log` calls |

---

## Expected Impact

| Issue | Before | After |
|---|---|---|
| Homepage server render time | ~600ms (3 sequential DB calls) | ~300ms (2 parallel calls) |
| Product page DB calls | 2× `getProductBySlug` | 1× (React cache deduplication) |
| Admin panel first visible content | 300–600ms spinner | Immediate (server-rendered) |
| Settings save | ~600ms (4 sequential upserts) | ~150ms (parallel) |
| Scroll performance | Re-animates every scroll pass | Animates once per element |
| Shop grid last card | Up to 1.5s artificial delay | Instant |
| Initial JS bundle | CartDrawer + MobileMenu always loaded | Loaded on demand |

---

## Non-Goals

- No changes to Supabase schema or indexes (product count is 10–15, not a DB performance problem)
- No changes to Swiper or the hero carousel beyond what's listed
- No changes to admin product edit page (acceptable complexity for an admin-only tool)
- No introduction of client-side caching layers (SWR, React Query) — overkill for current scale
