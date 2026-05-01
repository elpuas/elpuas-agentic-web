# Task: Blog carousel hydration stability fix

## What was done
- Kept working on the current branch `feature/blog-archive-carousel`.
- Restored the original Blog intro copy exactly as previously used.
- Investigated live `/blog` rendering behavior with Playwright after hydration.
- Simplified carousel runtime behavior to avoid layout mutation risk:
  - Removed transform-based sliding state logic.
  - Switched to page-based visibility using `hidden` on page groups.
  - JS now only toggles active page visibility + controls state.
- Preserved required archive behavior:
  - 6 posts per page
  - desktop 3x2 card layout
  - manual arrows + dots
  - keyboard navigation
- Fixed blog thumbnail source resolution for `/assets/...` frontmatter image paths so cards do not show broken image URLs.
- Verified visually after hydration and after paging navigation in browser automation.
- Ran `npm run build` successfully.

## Files changed
- `src/pages/blog/index.astro`
- `.context/2026-05-01-blog-carousel-hydration-fix.md`

## Next steps
- If desired, run a quick manual mobile viewport check to fine-tune card text clamping for the smallest screens.
