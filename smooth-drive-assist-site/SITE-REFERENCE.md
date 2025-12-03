# Smooth Drive Assist – Site Reference

Quick reference for the Smooth Drive Assist marketing website.

---

## Business Info

| Item | Value |
|------|-------|
| **Company** | Smooth Drive Assist, LLC |
| **Location** | Austin, Texas |
| **Domain** | smoothdriveassist.com |
| **Email** | info@smoothdriveassist.com |

---

## Pricing

| Item | Price |
|------|-------|
| **Total install** | $3,000 |
| **Deposit (to book)** | $1,500 |
| **Balance (at drop-off)** | $1,500 |
| **Support plan** | $100/month |
| **Lead time** | Minimum 2 weeks from deposit |

---

## Files

```
smooth-drive-assist-site/
├── index.html              # Main landing page
├── supported-vehicles.html # Compatibility / vehicle list
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── 404.html                # Custom 404 page
├── styles.css              # All styling
├── favicon.svg             # Site icon
├── og-image.svg            # Open Graph social sharing image
├── sitemap.xml             # XML sitemap for SEO
├── robots.txt              # Search engine crawler instructions
└── SITE-REFERENCE.md       # This file
```

---

## Running Locally

```powershell
cd smooth-drive-assist-site
python -m http.server 3000
```

Then open: `http://localhost:3000/`

---

## Page Sections (index.html)

| Section ID | Purpose |
|------------|---------|
| `#top` | Hero with main CTA |
| `#how` | "How it works" 4-step process |
| `#pricing` | Pricing cards (install + support) |
| `#install-day` | What to expect on install day |
| `#faq` | Frequently asked questions |
| `#contact` | Booking form |

---
## Key Messaging Points

1. **Not self-driving** — Systems assist, driver remains responsible
2. **Safety-first** — Professional install, calibration, training
3. **Local Austin service** — In-person installs, support, Uber/ride home
4. **Deposit model** — $1,500 to book, $1,500 at drop-off
5. **Compatibility verified first** — We confirm before taking deposit

---

## Supported Vehicles Page Structure

1. Intro (what "supported" means)
2. Popular supported brands (Toyota, Hyundai, Honda, etc.)
3. How we confirm your vehicle
4. Full supported brands list (27 brands)
5. Favorite vehicles by category (EV, SUV, Sedan, Truck)
6. Detailed models by brand (expandable `<details>`)

---

## CSS Variables (styles.css)

```css
--bg: #050816;           /* Dark background */
--bg-alt: #080f23;       /* Alternate section bg */
--accent: #38bdf8;       /* Cyan accent */
--accent-soft: rgba(56, 189, 248, 0.12);
--text: #f9fafb;         /* Light text */
--muted: #9ca3af;        /* Gray text */
--border: rgba(148, 163, 184, 0.4);
```

---

## Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.container` | Max-width wrapper (1120px) |
| `.section` | Standard section padding |
| `.section-alt` | Alternate background gradient |
| `.steps-grid` | Responsive card grid |
| `.step` | Individual card in grid |
| `.pricing-card` | Pricing tier card |
| `.feature-list` | Bullet list styling |
| `.faq-list` | FAQ accordion container |
| `.vehicle-brand` | Collapsible brand block |
| `.btn-primary` | Gradient CTA button |
| `.btn-secondary` | Outline button |

---

## Install Day Flow (for reference)

1. Customer drops off vehicle, pays remaining $1,500
2. We arrange Uber/ride home for customer
3. Professional install + initial calibration
4. 50–100 mile shakedown/test drive
5. Delivery back to customer + training + handoff

---

## Quick Edits Cheat Sheet

**Change price:**
- Search for `$3,000` and `$1,500` in `index.html`

**Add FAQ item:**
- Add new `<details>` block inside `.faq-list` in `index.html`

**Add vehicle brand:**
- Add new `<details class="vehicle-brand">` in `supported-vehicles.html`

**Change accent color:**
- Edit `--accent` in `:root` of `styles.css`

