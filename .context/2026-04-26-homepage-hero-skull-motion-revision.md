# 2026-04-26 - homepage-hero-skull-motion-revision

## What was done
- Revised homepage hero skull motion to be more perceptible while remaining premium and restrained.
- Delayed entrance timing so users can register the hero composition before animation starts.
- Increased entrance clarity with a staged sequence:
  - fade in
  - upward rise from below
  - soft settle with a tiny overshoot
- Increased ambient loop range so floating motion is noticeable in normal viewing.
- Added a subtle presence pulse via slight opacity breathing in the float loop.
- Kept implementation transform/opacity-only to avoid layout shifts or jank.

## Files changed
- `src/components/Welcome.astro`
- `.context/2026-04-26-homepage-hero-skull-motion-revision.md`

## Validation notes
- `npm run build` completed successfully.
- Motion update is still homepage hero specific and does not affect shared header logos or internal page logos.
