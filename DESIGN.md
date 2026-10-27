# Design System: Bangaru Vedic Calendar

## 1. Visual Theme & Atmosphere
A noble, sacred, and ultra-premium interface built for Vedic Purohits and freelancing Panthulus. The atmosphere bridges timeless temple reverence with sleek, mobile-first Instagram-style UX. 
- **Density:** 6 (Balanced, high legibility for sacred chants and Panchangam metrics)
- **Variance:** 7 (Asymmetric stat cards, elevated floating action buttons)
- **Motion:** 6 (Fluid CSS spring transitions, perpetual diya flame flickers, tactile active press states)

## 2. Color Palette & Roles
- **Obsidian Dark Surface** (`#0B0A08`) — Deep primary canvas for Gold Sanctum mode
- **Deep Charcoal Surface** (`#171511`) — Glassmorphic card and modal background fill
- **Dark Mocha Accent** (`#29231A`) — Subtle container background & active hover state
- **Antique Gold** (`#9A7628`) — Secondary accents, borders, and muted sacred labels
- **Signature Gold** (`#C6A15B`) — Primary brand color for CTAs, active icons, and focus rings
- **Champagne Gold** (`#E2C98B`) — Heading text, sacred titles, and luminous highlights
- **Soft Ivory** (`#F5F0E6`) — Readable body copy and primary text
- **Pure Highlight** (`#FFF8E8`) — High-contrast active sloka verse text
- **Parchment Light Base** (`#F7F3E9`) — Warm temple manuscript background for Light Mode
- **Parchment Card Fill** (`#FFFDF7`) — High-contrast light mode card surface
- **Parchment Antique Brass** (`#B8860B`) — Crisp light mode gold border

## 3. Typography Architecture
- **Display & Headings:** `Cormorant Garamond` (Serif) — Noble, sacred, track-tight, weight-driven hierarchy
- **UI & Body:** `Inter` (Sans-Serif) — Clean, highly legible interface text, 65ch max line length
- **Telugu Script:** `Noto Sans Telugu` — Authentic transliteration & Telugu mantras
- **Banned:** Generic system fonts, oversaturated text glows, pure black (`#000000`) text

## 4. Component Stylings
- **Buttons:** Tactile push feedback (`transform: scale(0.97)` on press), gradient gold fill for primary action (`var(--grad-gold)`), dark mocha fill with 1px gold border for secondary actions.
- **Cards:** Diffused glassmorphism blur (`backdrop-filter: blur(16px)`), rounded corners (14px), 1px subtle gold borders (`rgba(154, 118, 40, 0.4)`).
- **Navigation:** Instagram-style 5-slot bottom bar with elevated center `+` action button.
- **Sloka Teleprompter:** Luminous gold highlight background (`rgba(198, 161, 91, 0.14)`), 3px left gold accent border, dynamic vertical middle alignment.
- **Japa Mala Counter:** 3D circular metallic gold bead ring with radial depth gradient (`radial-gradient(circle at 30% 30%, #29231A 0%, #171511 70%, #0B0A08 100%)`).

## 5. Layout Principles
- Mobile-first single-screen tab views eliminating long vertical page scrolling walls.
- Asymmetric 4-stat Panchangam grid with Rahu Kalam and Abhijit Muhurtham callouts.
- 9:16 Instagram Reel full-screen aspect ratio for active Sloka teleprompter reading.

## 6. Motion & Micro-Interactions
- Diya flame perpetual flicker animation (`diyaFlicker 2.5s infinite ease-in-out`).
- Smooth 1.0x to 15.0x teleprompter auto-scroll engine.
- Instant feedback on Japa Mala tap (+1 count, haptic vibration, milestone confetti at 108 chants).

## 7. Anti-Patterns (Banned)
- No generic AI purple/blue neon glows
- No unstyled white backgrounds in light mode — parchment manuscript aesthetic strictly enforced
- No long vertical page scrolling walls on mobile
- No missing priest name or missing client names on shared links
- No overlapping content elements
