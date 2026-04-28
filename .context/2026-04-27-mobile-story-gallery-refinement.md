# Mobile StoryGallery Refinement

## What was done

- Refined only the mobile behavior in `src/components/content/StoryGallery.css`.
- Increased active mobile image ratio from a shallow banner feel to a taller editorial card.
- Redesigned the mobile thumbnail strip as a compact overlapping peekable deck that scales for larger image counts.
- Tightened vertical rhythm between image, caption, and thumbnail strip.
- Kept desktop StoryGallery styles unchanged.

## Files changed

- `src/components/content/StoryGallery.css`

## Mobile behavior updates

- Active image ratio on mobile updated to `5 / 4` for better vertical presence.
- Thumbnail strip now uses:
  - constrained width (`min(100%, 19rem)`) to avoid full-row thumbnail sprawl,
  - horizontal overflow,
  - subtle overlap (`margin-left: -1rem`) for stacked deck feel,
  - right-edge mask fade to imply more images,
  - scroll snapping for cleaner queue navigation.
- Reduced mobile spacing/gaps to create a tighter but still breathable composition.

## Validation result

- `npm run build`: success.

## Next steps

- Optional: fine-tune deck overlap and mask strength against final Figma measurements after galleries with 5+ images are added.
