# Center Mobile Story Gallery Composition and Spacing

## What was done

- Refined mobile StoryGallery composition to read as one centered editorial module.
- Centered the mobile title, supporting text, and thumbnail deck on a shared vertical axis.
- Reworked mobile thumbnail structure to use a centered internal track for center-out deck behavior and symmetric peeking.
- Tightened mobile spacing cadence between title, supporting text, and deck.
- Kept desktop StoryGallery behavior unchanged.

## Files changed

- `src/components/content/StoryGallery.tsx`
- `src/components/content/StoryGallery.css`

## Implementation details

- Added `story-gallery__mobile-track` wrapper inside mobile stack in `StoryGallery.tsx`.
- Mobile CSS updates include:
  - centered mobile module alignment (`justify-items: center`),
  - centered caption text block (`text-align: center` + centered grid),
  - centered max-content deck track with overlap,
  - symmetric edge mask fade for centered peeking impression,
  - harmonized, tighter mobile spacing and line-height adjustments.

## Validation result

- `npm run build`: success.

## Next steps

- Optional: adjust deck width and overlap delta for specific device widths if final visual QA in-browser calls for micro-tuning.
