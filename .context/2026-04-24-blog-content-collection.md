# Blog Content Collection

## Summary of changes

- Added Astro Content Collections config at `src/content.config.ts` with a `blog` collection.
- Added a sample blog post at `src/content/blog/a-year-with-the-wordpress-community.md`.
- Created blog index page at `src/pages/blog/index.astro` that:
  - loads `blog` collection entries
  - excludes drafts
  - sorts by date descending
  - renders intro plus title-only links
  - keeps existing CLI/chat by using `BaseLayout`
- Created dynamic blog post page at `src/pages/blog/[slug].astro` with static paths and minimal article rendering.
- Added blog context preparation helper at `src/lib/blog-context.ts` that returns metadata-only plain text.
- Added `src/assets/blog/a-year-with-the-wordpress-community/hero.webp` to match requested sample frontmatter.

## Files created or modified

- `src/content.config.ts` (new)
- `src/content/blog/a-year-with-the-wordpress-community.md` (new)
- `src/pages/blog/index.astro` (new)
- `src/pages/blog/[slug].astro` (new)
- `src/lib/blog-context.ts` (new)
- `src/assets/blog/a-year-with-the-wordpress-community/hero.webp` (new)

## Frontmatter schema notes

- Implemented using `defineCollection` and `z` from `astro:content`.
- Supported fields:
  - `title` (string)
  - `slug` (string)
  - `description` (string)
  - `date` (coerced to `Date`)
  - `author` (string)
  - `category` (string)
  - `tags` (string array)
  - `heroImage` (optional string)
  - `heroAlt` (optional string)
  - `canonicalUrl` (optional URL string)
  - `draft` (boolean, defaults to `false`)

## Next steps

- Migrate existing files from `/content/blog` into collection-ready frontmatter format.
- Optionally connect `loadBlogContext()` to the AI context pipeline once routing/content behavior is fully validated.

## Consolidation update (2026-04-24)

- Removed duplicate blog content previously created in `/src/content/blog`.
- Moved source blog files from `/content/blog` to `/src/content/blog`.
- Preserved file extensions and content exactly as-is during the move (`.md` and `.mdx` unchanged).

## Frontmatter normalization update (2026-04-24)

- Updated 20 blog files in `/src/content/blog` to align with the content collection schema.
- Applied frontmatter normalization across all files:
  - `title`
  - `slug`
  - `description`
  - `date` (valid `YYYY-MM-DD` string)
  - `author` (`"Alfredo Navas"`)
  - `category`
  - `tags` (4-8 lowercase tags)
  - `draft: false`
- Completed `.md` to `.mdx` conversion for 19 files.

## Blog index UI refinement update (2026-04-24)

- Updated blog index post list layout from a single column to a 2-column grid on desktop.
- Added responsive behavior to switch to 1 column on mobile.
- Applied styling adjustments to post links:
  - accent color (green) for titles
  - subtle hover/focus interaction (underline + slight opacity change)
- Kept the page minimal and text-focused without cards or boxes.
