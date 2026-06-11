# The Hillard — Footer Redesign + Mobile Optimization
**Date:** 2026-06-10
**Stack:** Vanilla HTML + CSS + JS (single `index.html`)
**Design system:** Cormorant Garamond (serif) + Outfit (sans), cream `#F5EFE6`, charcoal `#181C22`, gold `#C4A265`, navy `#1C2535`

---

## 1. Sticky Spaces Tab Bar

**Behavior:** The `.spaces-tab-bar` (Common Spaces | Bedrooms) sticks below the nav when the user scrolls into the spaces section, and naturally unsticks when scrolling past it.

**Implementation:**
- `position: sticky; top: 96px; z-index: 50;` on `.spaces-tab-bar`
- `background: var(--cream)` so content doesn't bleed through
- Subtle `box-shadow: 0 2px 12px rgba(0,0,0,0.06)` appears when stuck (always-on is fine for simplicity)
- 96px = scrolled nav height (64px logo + 2×16px padding)

---

## 2. Footer Redesign — "The Invitation"

Replace the current 4-column grid footer with a two-zone editorial layout.

### Zone 1 — Invite (`.footer-invite`)
- **Background:** `var(--charcoal)` (#181C22)
- **Top accent:** 1px gold line (`rgba(196,162,101,0.4)`) full-width at top
- **Content (centered):**
  - Cormorant Garamond italic, ~2.8rem: *"The house awaits."*
  - 28px gold rule below headline
  - Address + email in Outfit, 0.72rem, low opacity
  - CTA button: `INQUIRE & RESERVE` (opens booking panel), `.btn-gold` style
- **Padding:** 6rem top/bottom, 3.5rem sides

### Zone 2 — Nav strip (`.footer-nav`)
- **Background:** `#0e1219` (darker than charcoal)
- **Top border:** 1px `rgba(196,162,101,0.18)`
- **Links:** Single horizontal flex row, centered
  - About · The Spaces · Amenities · Gallery · Events · Instagram
  - Font: Outfit 0.6rem, letter-spacing 0.18em, uppercase, `rgba(245,239,230,0.45)`
  - Hover: `rgba(245,239,230,0.8)`
  - Separated by `·` spans
- **Bottom line:** Copyright + `Est. 1865` centered, very small, very low opacity
- **Padding:** 1.8rem top/bottom

---

## 3. Mobile Optimization

### 3a. Nav — Hamburger Menu

**HTML changes:**
- Add `<button class="nav-burger" id="nav-burger" aria-label="Menu">` with 3 span bars inside `.nav-right`
- The `#booking-trigger` button (nav-cta) gets hidden on mobile; burger shown instead

**Mobile menu HTML:**
```html
<div class="mobile-menu" id="mobile-menu">
  <div class="mobile-menu-inner">
    <nav links...>
    <button class="booking-open">Inquire & Reserve</button>
  </div>
</div>
```

**CSS:**
- `.mobile-menu`: `position: fixed; inset: 0; background: var(--primary); z-index: 150; transform: translateY(-100%); transition: transform 0.45s cubic-bezier(0.4,0,0.2,1); display: flex; align-items: center; justify-content: center;`
- `.mobile-menu.open`: `transform: translateY(0)`
- Links: Cormorant Garamond 2.2rem, centered, `opacity: 0; transform: translateY(12px)` → animated in with 60ms stagger when open
- `.nav-burger span`: animate to X when open (top span rotates 45°, middle fades, bottom rotates -45°)

**JS:** Toggle `.open` on mobile-menu and `.menu-open` on burger; run link animations; close on Escape.

### 3b. Overflow fixes

| Element | Problem | Fix |
|---|---|---|
| `html` | `overflow-x: hidden` missing | Add to html selector |
| `.hero` | `height: 100vh` breaks on iOS Safari | Add `min-height: 100dvh` at ≤900px |
| `.testimonial` | `padding: 6rem 3.5rem`, no mobile override | Add `padding: 4rem 1.5rem` at ≤900px |
| `.reserve` | `padding: 8rem 3.5rem`, no mobile override | Add `padding: 5rem 1.5rem` at ≤900px |
| `footer` | `padding: 4rem 3.5rem`, no mobile override | Handled by footer redesign (new mobile CSS) |
| `.spaces-more` | `padding: 2.5rem 3.5rem`, no mobile override | Add `padding: 2rem 1.5rem` at ≤900px |
| `.events-banner` | `height: 560px` fixed | Reduce to `height: 400px` at ≤900px |
| `.nav-cta` | visible on mobile, too wide | `display: none` at ≤900px |
| `.nav-burger` | exists in CSS but not HTML (new file) | Add to HTML |
| `.cta-ghost` | `font-size: 16rem` could cause overflow | Add `font-size: 8rem` at ≤900px |
| `.tab-btn` | `padding: 1.4rem 2rem` wide on mobile | Reduce padding at ≤900px |

### 3c. Events banner mobile
- `height: 400px` at ≤900px (from 560px)
- Reduce headline size (already uses `clamp`, auto-handled)

---

## Self-review

- No placeholder content — all copy is final
- No contradictions between zones
- Scope is contained: 1 HTML file, CSS + JS additions only
- No breaking changes to existing booking panel or form logic
- Mobile menu uses same `.booking-open` class as existing panel triggers
