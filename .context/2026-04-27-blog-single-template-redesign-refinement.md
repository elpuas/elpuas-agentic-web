# Blog Single Template Redesign Refinement (2026-04-27)

## What was done
- Refined single blog template hero to be true full-bleed at the top of the main content region.
- Removed inset/card presentation from hero (no rounded card frame and no extra top spacing above hero).
- Fixed featured image resolver to correctly read local Astro glob paths and prefer `.webp` sibling assets when available.
- Ensured article markdown headings remain accent green even when heading text is wrapped in `strong`.

## Files modified
- `src/pages/blog/[slug].astro`
- `.context/2026-04-27-blog-single-template-redesign-refinement.md`

## Hero refinement behavior
- Hero now starts flush at top of content area (`.content` top/side paddings reset on single post template).
- Hero spans full width of the main content region with metadata overlay preserved.
- Hero no longer uses card-like border/radius framing.

## Featured image behavior
- Local asset resolution now maps correctly to `import.meta.glob('../../assets/blog/**/*')` keys.
- Resolver prefers `.webp` variant when present (e.g., the WordPress article hero now resolves to `hero.webp`).
- Fallback block only renders when no featured image path resolves.

## Typography refinement behavior
- Heading accents (`h2-h6`) remain neon accent green.
- Added heading-specific `strong` inheritance rules so markdown like `## **Heading**` does not turn white.
- Inline links remain accent green.

## Validation notes
- Validated with `A Year with the WordPress Community`.
- Build command executed: `npm run build`.
- Build succeeded and prerendered `/blog/a-year-with-the-wordpress-community/`.
- Generated HTML shows hero image output as optimized webp asset (`/_astro/hero...webp`).
