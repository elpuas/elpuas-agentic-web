# Layout Refinement (2026-04-23)

## What was done
- Rebased `feature/layout-refinement` to the latest `origin/main` before implementation.
- Refined `BaseLayout` sidebar to match Figma intent: search input, icon+label nav rows, active state treatment, and profile block.
- Refined main/workspace spacing with centered content max-width and updated vertical rhythm.
- Reworked CLI container visuals and positioning: centered panel, Figma-like shell, action buttons, and helper text styling.
- Updated design tokens for typography, border color, spacing, and radius to align with Figma values.

## Files changed
- `src/layouts/BaseLayout.astro`
- `src/styles/tokens.css`

## Next steps
- Wire real CLI interactivity and command handling in the refined UI.
- Replace placeholder avatar glyph with final asset if needed.
- Reuse this layout for `index` when homepage content is migrated from starter template.
