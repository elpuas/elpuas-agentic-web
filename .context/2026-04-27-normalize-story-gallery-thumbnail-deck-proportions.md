# Normalize StoryGallery Thumbnail Deck Proportions

## What was done

- Normalized non-active thumbnail geometry across StoryGallery decks so each queued card uses a consistent frame.
- Removed desktop stack index-based scale differences that were causing uneven thumbnail sizes.
- Kept previous mobile improvements (taller active image + peekable compact queue) intact.

## Files changed

- `src/components/content/StoryGallery.tsx`
- `src/components/content/StoryGallery.css`

## Implementation details

- In desktop stack animation (`StoryGallery.tsx`), removed per-index `scale` from `animate` state so cards keep a fixed base footprint.
- In styles (`StoryGallery.css`), introduced shared thumbnail geometry tokens:
  - `--story-gallery-thumb-ratio`
  - `--story-gallery-thumb-width-desktop`
  - `--story-gallery-thumb-width-mobile`
- Applied those shared tokens to:
  - `.story-gallery__stack-card`
  - `.story-gallery__mobile-thumb`
- Existing `object-fit: cover` remains applied to thumbnail images.

## Validation result

- `npm run build`: success.

## Next steps

- Optional: tune desktop/mobile width tokens if future content requires slightly denser or wider deck cards.
