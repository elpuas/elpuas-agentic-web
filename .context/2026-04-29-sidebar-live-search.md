# 2026-04-29 - Sidebar Live Search

## What was done
- Added a lightweight build-time content search index helper in `src/lib/search-index.ts`.
- Indexed public blog posts from `src/content/blog` (excluding drafts).
- Indexed public static pages: Home, About, Blog, Contact.
- Connected existing sidebar search input to instant client-side filtering.
- Added an integrated dropdown beneath the sidebar search input showing title and type label.
- Added empty state message: "No direct matches. Try asking me below."

## Files changed
- src/lib/search-index.ts
- src/layouts/BaseLayout.astro

## Next steps
- Optionally add keyboard result navigation (arrow keys + enter) if desired.
- Extend indexing for public project entries if a `project` collection/page is introduced.
