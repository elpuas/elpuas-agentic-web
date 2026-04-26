# 2026-04-26 - astro-image-asset-migration

## What was done
- Migrated obvious local static decorative/shared images from plain `<img>` to Astro `Image` (`astro:assets`).
- Updated shared logo usage in:
  - `src/layouts/BaseLayout.astro` (mobile header logo)
  - `src/components/Welcome.astro` (homepage hero logo)
  - `src/pages/about.astro` (about title logo)
  - `src/pages/contact.astro` (contact title logo)
  - `src/pages/blog/index.astro` (blog title logo)
  - `src/components/ProfilePanel.astro` (sidebar avatar logo)
- Updated local profile image rendering on About page to Astro `Image`.
- Kept content-driven blog post hero image rendering (`src/pages/blog/[slug].astro`) unchanged to avoid over-refactoring mixed/dynamic image sources.

## Files changed
- `src/layouts/BaseLayout.astro`
- `src/components/Welcome.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/blog/index.astro`
- `src/components/ProfilePanel.astro`
- `.context/2026-04-26-astro-image-asset-migration.md`

## Validation notes
- `npm run build` completed successfully.
- Visual intent remains unchanged while using Astro native image handling for the local static assets above.
