# SEO Content Enrichment Phase Two (2026-04-27)

## What was done

### 1) Frontmatter updates
- Audited and normalized all blog posts in `src/content/blog/*.mdx`.
- Added missing required SEO fields to every post:
  - `excerpt`
  - `publishDate` (kept existing `date` for backward compatibility)
  - `featuredImage` (mapped to existing `heroImage` where available, fallback to `/favicon.svg`)
- Ensured each blog post now consistently includes:
  - `title`, `description`, `excerpt`, `category`, `tags`, `publishDate`, `featuredImage`, `slug`, `draft`

### 2) Page metadata additions
- Added handcrafted page metadata (title + description + OG title/description) for:
  - Home (`src/pages/index.astro`)
  - About (`src/pages/about.astro`)
  - Projects (`src/pages/projects.astro`, new)
  - Contact (`src/pages/contact.astro`)
  - Blog archive (`src/pages/blog/index.astro`)
- Extended `src/layouts/BaseLayout.astro` to support page-level `ogTitle` and `ogDescription` overrides.

### 3) Heading audit notes
- Home:
  - Removed nested `<main>` in `src/components/Welcome.astro` to avoid invalid semantic structure inside layout `<main>`.
  - Kept a single page H1.
- About:
  - Verified one H1 and logical H2 usage.
- Blog archive:
  - Verified one H1 and no decorative heading misuse.
- Blog single template:
  - Verified hero title remains the only page H1.
  - Remapped markdown `h1` content headings to `h2` at render time (`<Content components={{ h1: 'h2' }} />`) to prevent duplicate H1 output.
- Share section:
  - Updated heading level in `ShareArticleBar` from `h5` to `h2` for semantic consistency.

### 4) Related posts implementation
- Added a related-posts module at the end of single blog posts, above share/chat area, in `src/pages/blog/[slug].astro`.
- Displays up to 3 related reads.
- Ranking uses weighted similarity based on:
  - shared tags
  - shared category
  - shared normalized content terms from title/excerpt
- Includes title, category, and excerpt for internal discoverability and crawl depth.

### 5) Visual stability
- Kept existing visual language and layout intact.
- Added only minimal styling needed for the related-posts module and projects page content rendering.

## Files changed
- `src/layouts/BaseLayout.astro`
- `src/components/Welcome.astro`
- `src/components/ShareArticleBar.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/projects.astro` (new)
- `src/content/blog/*.mdx` (all existing blog entries normalized)

## Validation result
- Ran `npm run build`.
- Result: success.

## Next steps
- Optional: replace fallback `featuredImage: "/favicon.svg"` with dedicated per-post OG images for stronger social previews.
- Optional: add category/tag archive routes to further strengthen topical internal linking.
