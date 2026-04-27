# SEO and AI Discoverability Foundation

## What was done
- Created branch `feature/seo-and-ai-discoverability-foundation` from `main`.
- Added a native SEO metadata foundation in the shared layout:
  - dynamic page title composition
  - meta description handling with defaults
  - canonical URL generation
  - OpenGraph tags
  - Twitter card tags
  - robots meta handling
- Added env-based GA4 script injection in the layout head using `PUBLIC_GA_MEASUREMENT_ID` with a placeholder fallback (`G-TESTMEASID0`).
- Added foundational JSON-LD support in layout and injected default:
  - `Person`
  - `WebSite`
- Added per-post structured data in blog post pages:
  - `BlogPosting` schema
- Normalized blog SEO metadata model with backward compatibility:
  - added support for `excerpt`, `publishDate`, `featuredImage`
  - kept compatibility with existing `date` and `heroImage`
  - enforced at least one publish date source (`publishDate` or `date`)
- Updated blog pipelines to use normalized metadata helpers for publish date, excerpt, and featured image.
- Installed and configured Astro native sitemap integration.
- Added crawler and AI discoverability files in `public`:
  - `robots.txt`
  - `llms.txt`
  - `ai-context.txt`

## Files changed
- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `src/layouts/BaseLayout.astro`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/content.config.ts`
- `src/lib/blog-context.ts`
- `src/lib/blog-metadata.ts` (new)
- `src/lib/site.ts` (new)
- `public/robots.txt` (new)
- `public/llms.txt` (new)
- `public/ai-context.txt` (new)

## Packages installed
- `@astrojs/sitemap`

## Metadata systems added
- Shared metadata system in base layout with defaults and per-page overrides.
- Blog post metadata sourced from frontmatter through normalized helper layer:
  - standard fields now supported: `title`, `description`, `excerpt`, `category`, `tags`, `publishDate`, `featuredImage`, `slug`, `draft`
  - legacy support retained for: `date`, `heroImage`

## Sitemap/robots status
- Astro integration configured with `@astrojs/sitemap` and `site: https://elpuas.com`.
- Build confirms `dist/sitemap-index.xml` generation.
- `public/robots.txt` allows crawling and points to sitemap index.

## Schema additions
- Global JSON-LD:
  - `Person`
  - `WebSite`
- Per blog post JSON-LD:
  - `BlogPosting`

## AI discoverability files added
- `public/llms.txt`
- `public/ai-context.txt`

## Validation notes
- Ran `npm run build` successfully.
- Build output confirms all blog routes prerendered and sitemap generated.

## Next steps
- Replace placeholder GA measurement ID with production value in environment config.
- Optionally add a dedicated OpenGraph image in `public` for richer social previews.
- Optionally migrate existing blog frontmatter from legacy `date`/`heroImage` to `publishDate`/`featuredImage` over time.
