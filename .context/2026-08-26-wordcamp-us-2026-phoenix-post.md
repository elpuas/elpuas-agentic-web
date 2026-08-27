# WordCamp US 2026 Phoenix post

## What was done

- Added the English WordCamp US 2026 Phoenix article from the supplied Markdown.
- Reused the existing `StoryGallery` with the documented image order, titles, captions, and alt text.
- Added optional SEO-title and desktop/mobile Hero focal-position metadata support.
- Used `IMG_4560.webp` as the Hero and the remaining nine photographs in the gallery.
- Added opt-in mobile dock clearance so the floating assistant does not cover gallery controls.
- Updated the gallery to keep one large selected photo with its title and caption above eight clickable thumbnails in two rows of four.
- Added restrained thumbnail overlap, rotation, and vertical offsets, with reduced overlap on narrow screens and a visible keyboard-focus state.

## Files changed

- `src/content/blog/from-costa-rica-to-phoenix-what-speaking-at-wordcamp-us-taught-me.mdx`
- `src/content.config.ts`
- `src/pages/blog/[slug].astro`
- `src/components/content/StoryGallery.css`
- `src/assets/blog/from-costa-rica-to-phoenix-what-speaking-at-wordcamp-us-taught-me/`
- `.context/2026-08-26-wordcamp-us-2026-phoenix-post.md`

## Next steps

- Confirm the remaining pre-publication editorial details and image permissions listed in the source Markdown.

## Validation

- `npm run build`: passed in an isolated temporary copy while the default-port development server remained running; the new static blog route was prerendered.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed.
- Desktop browser at 1440 × 1000: Hero focal point, large selected gallery image, 4 × 2 thumbnail layout, mouse selection, keyboard Enter activation, visible focus, captions, and alt text passed.
- Mobile browser at 390 × 844: Hero crop, reduced thumbnail overlap, 4 × 2 layout without horizontal overflow, true touchscreen tap, captions, and assistant clearance passed.
- The route returned `200 OK` after a clean Astro restart.
- Final clean browser console: no article/gallery errors; the existing `/favicon.ico` 404 remains while the project serves `favicon.svg`.
- `astro check` was not run because `@astrojs/check` is not installed and this task did not add a new development dependency.
