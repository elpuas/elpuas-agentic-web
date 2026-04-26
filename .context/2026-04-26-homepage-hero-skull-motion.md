# 2026-04-26 - homepage-hero-skull-motion

## What was done
- Added a subtle load-time reveal to the homepage hero skull in `src/components/Welcome.astro`:
  - soft fade-in
  - gentle scale settle
- Added a very slow, restrained ambient floating loop after reveal:
  - tiny vertical drift
  - nearly imperceptible micro rotation
- Kept animation transform/opacity-only to avoid layout shift and jank.
- Scoped the effect to the homepage hero skull only; shared header logo and internal page logos were not animated.
- Added `prefers-reduced-motion` fallback to disable animations and keep a stable static icon for accessibility.

## Files changed
- `src/components/Welcome.astro`
- `.context/2026-04-26-homepage-hero-skull-motion.md`

## Validation notes
- `npm run build` completed successfully.
- Motion remains subtle on both desktop and mobile and does not affect layout spacing.
