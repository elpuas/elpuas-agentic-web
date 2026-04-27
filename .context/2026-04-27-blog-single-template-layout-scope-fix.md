# Blog Single Template Layout Scope Fix (2026-04-27)

## What was done
- Implemented a scoped layout exception for single blog post pages only.
- Added an explicit `contentLayout` prop to `BaseLayout` with default `default` mode.
- Added `edge` mode classes in `BaseLayout`:
  - `.content-edge`
  - `.content-inner-edge`
- Applied `contentLayout="edge"` only in `src/pages/blog/[slug].astro`.
- Removed prior global CSS overrides from the single-post page component.

## Files modified
- `src/layouts/BaseLayout.astro`
- `src/pages/blog/[slug].astro`
- `.context/2026-04-27-blog-single-template-layout-scope-fix.md`

## Hero wrapper scope behavior
- For single blog posts only, outer content inset is removed at layout level:
  - no top gap before hero
  - no left/right inherited inset around hero region
- Article body remains constrained via `.post-content` sizing and padding in the single-post template.

## Scope safety
- `contentLayout="edge"` usage exists only in `src/pages/blog/[slug].astro`.
- All other routes continue using default `BaseLayout` spacing behavior.

## Validation notes
- Ran `npm run build` successfully.
- Confirmed generated single post HTML includes:
  - `<main class="content content-edge">`
  - `<div class="content-inner content-inner-edge">`
- Confirmed single post still resolves real hero image (`/_astro/hero...webp`).
