# Task: Blog archive carousel redesign

## What was done
- Created branch `feature/blog-archive-carousel` from updated `main`.
- Replaced `/blog` archive bullet list with a paginated, card-based carousel in `src/pages/blog/index.astro`.
- Implemented newest-first dynamic paging in groups of 6 posts per slide.
- Added desktop layout (3x2 cards), responsive mobile layout (single-column stacked cards), and manual arrow + dot navigation.
- Added keyboard support for left/right arrows on the carousel region.
- Added accessible control labels, disabled edge states, and smooth slide transitions.
- Updated blog intro copy and added a `Latest Posts` heading.
- Verified build with `npm run build`.

## Files changed
- `src/pages/blog/index.astro`
- `.context/2026-05-01-blog-archive-carousel.md`

## Next steps
- Validate visual spacing and card density against the provided mockup in-browser.
- If needed, fine-tune card title/excerpt line clamp lengths for best scan readability on smaller laptops.
