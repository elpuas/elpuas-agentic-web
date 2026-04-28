# 2026-04-28 - blog-placeholder-fallback-replacement

## What was done
- Replaced blog image fallback logic to use `src/assets/blog-placeholder.jpg` as an imported Astro asset.
- Updated `getBlogFeaturedImage()` in `src/lib/blog-metadata.ts` to:
  - detect legacy favicon placeholder values (`/favicon.svg`, `favicon.svg`, `/favicon.ico`, `favicon.ico`)
  - return `blogPlaceholder.src` whenever no valid featured/hero image is provided
  - keep posts with valid `featuredImage` values unchanged.
- Updated global metadata fallback in `src/lib/site.ts` by replacing `DEFAULT_OG_IMAGE` from `/favicon.svg` to `blogPlaceholder.src`.
- Verified fallback references in blog system no longer use favicon/SVG as featured-image fallback.

## Files changed
- `src/assets/blog-placeholder.jpg`
- `src/lib/blog-metadata.ts`
- `src/lib/site.ts`
- `.context/2026-04-28-blog-placeholder-fallback-replacement.md`

## Next steps
- Optionally migrate legacy `featuredImage: "/favicon.svg"` frontmatter values to explicit real images over time; fallback now safely handles them.
