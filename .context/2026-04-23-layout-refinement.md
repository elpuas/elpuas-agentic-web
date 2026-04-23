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

## Typography update (same day)
- Loaded `Mona Sans VF` via `@font-face` in global styles using a variable-font WOFF2 external source.
- Switched the primary font token to `"Mona Sans VF"` with system sans-serif fallbacks.
- Applied the font globally to body and headings, and explicitly to sidebar and CLI regions.
- Kept layout structure, spacing, and colors unchanged.

### Additional files changed
- `src/styles/global.css`
- `src/styles/tokens.css`
- `src/layouts/BaseLayout.astro`

## Typography scale normalization (same day)
- Normalized type scale tokens to enforce a 14px minimum and 18px base body size.
- Updated global root typography to use base size and base line-height.
- Added `--font-size-lg` token for larger headings and future consistency.
- Updated remaining homepage paragraph copy to 18px for readable body text.
- Kept layout structure, spacing, and colors unchanged.

### Additional files changed
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/components/Welcome.astro`
