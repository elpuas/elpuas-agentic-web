# 2026-04-25 - mobile-homepage-hero-figma-match

## What was done
- Revised the existing branch implementation to improve fidelity to the Figma mobile composition (node `36:2`) and screenshot reference.
- Replaced rigid mobile spacing/sizing with fluid responsive rules.
- Kept scope to mobile presentation and homepage composition, with shared mobile header consistency across pages.

## Files changed
- `src/layouts/BaseLayout.astro`
- `src/components/Welcome.astro`

## Figma fidelity corrections
- Moved to a shared compact mobile header in `BaseLayout` (all pages):
  - brand block on left (`Alfredo Navas` / `Product Builder`)
  - hamburger trigger on right
- Corrected header proportions using responsive padding and type scale.
- Fixed logo cropping risk by using fluid `clamp()` sizing with full visible image bounds and no fixed clipping container.
- Refined homepage hero stack composition on mobile so skull, heading, paragraph, and Ask Me terminal read as one cohesive vertical flow.

## Fluid responsive sizing adjustments
- Replaced rigid mobile values with responsive functions (`clamp()`, `min()`) across:
  - header padding and icon sizing
  - brand typography
  - hero icon sizing
  - heading and paragraph scale
  - homepage vertical spacing between content and terminal
- Added `flex-wrap: nowrap` on mobile brand row to avoid unstable wrapping behavior.

## Typography reductions
- Reduced mobile hero heading scale and line-height for closer Figma proportion.
- Reduced intro paragraph font-size and line-height for lighter mobile density.
- Reduced mobile brand text sizing for a more compact top header.

## Validation notes
- Ran `npm run build` successfully (Astro build complete, no errors).
- No AI backend, API routes, blog pages, contact page, or chatbot logic changes.
- Desktop layout/sidebar behavior preserved; changes are mobile-targeted with home-specific responsive rules where required.

## 2026-04-26 enhancement pass
- Fixed mobile chat terminal to stay persistently visible near the viewport bottom using a fixed floating bar treatment.
- Added subtle mobile chat entrance micro animation (fade + slight upward movement).
- Softened mobile chat message scrollbar styling to reduce visual noise and contrast.
- Validation notes:
  - `npm run build` completed successfully.
  - Mobile behavior remains scoped to `@media (max-width: 48rem)`.
  - Existing mobile header/hero spacing and logo visibility behaviors remain intact.
