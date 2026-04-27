# Blog Single Template Redesign (2026-04-27)

## What was done
- Redesigned the single blog article template in `src/pages/blog/[slug].astro` as a full presentation pass.
- Replaced the simple title/meta block with a full-width hero header that overlays metadata in this order:
  1. Category
  2. Post Title
  3. Date
- Removed visual rendering of tags from the single post page while preserving tags in frontmatter/data.
- Preserved the existing bottom Ask Me CLI terminal by keeping all changes scoped to the single post page template.

## Files modified
- `src/pages/blog/[slug].astro`
- `.context/2026-04-27-blog-single-template-redesign.md`

## Hero template behavior
- Hero now always renders at the top of the article template.
- When `heroImage` exists, it is rendered as full-width hero media with a dark overlay and metadata on top.
- Hero width spans the full article container width for a strong editorial presentation.
- Metadata hierarchy in hero:
  - category above title
  - date below title
- Author is not shown.
- Tags are not shown.

## Featured image fallback behavior
- If a post has no `heroImage`, the hero still renders using a muted dark gradient fallback block.
- Fallback keeps the same metadata placement and spacing as image-based heroes.
- This avoids empty/broken hero areas and keeps future posts visually consistent.

## Typography system updates
- Applied custom article typography styles to markdown content:
  - headings (`h2`-`h6`) use accent green
  - inline links use accent green with tuned underline treatment
  - body text uses soft white tone for readability on dark background
  - increased paragraph/content rhythm for editorial spacing
  - constrained reading column width for premium long-form legibility
- Added supporting styles for lists, blockquotes, code, and media spacing to avoid default browser markdown feel.

## Validation notes
- Primary validation target: `A Year with the WordPress Community` (`/blog/a-year-with-the-wordpress-community/`).
- Build validation completed successfully:
  - Command: `npm run build`
  - Result: success, static route for `/blog/a-year-with-the-wordpress-community/` prerendered.
- Responsive behavior addressed with dedicated breakpoints for hero scaling and article typography on mobile.

## Next steps
- Optional visual QA in browser against the Figma node and screenshot reference for pixel-level refinement.
