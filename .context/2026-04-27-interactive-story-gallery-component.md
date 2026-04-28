# Interactive Story Gallery Component

## What was done

- Created reusable React island component at `src/components/content/StoryGallery.tsx`.
- Added gallery styling at `src/components/content/StoryGallery.css`.
- Enabled React support in Astro via `@astrojs/react` integration in `astro.config.mjs`.
- Added `framer-motion`, `react`, and `react-dom` dependencies (plus React type packages).
- Inserted `StoryGallery` into `src/content/blog/a-year-with-the-wordpress-community.mdx` as an editorial break between **WP DevDay – February** and **WordCamp US – Portland, August**.

## Component architecture

- `StoryGallery` accepts reusable `items` prop with `{ id, src, alt, title, caption }`.
- Internal `order` state controls card choreography:
  - `order[0]` is active featured image.
  - `order.slice(1)` drives the stacked deck.
- Clicking a stacked item promotes it to active and reorders deck while preserving deterministic sequence.
- Separate desktop and mobile layouts are included in one reusable component.

## Animation behavior

- Entrance: container fades/slides in when scrolled into view.
- Active image: cross-fade/scale transition (`AnimatePresence`) on promotion.
- Caption/title: animated swap synced with active image.
- Stack deck: Framer Motion layout transitions + spring movement for smooth reordering.
- Hover/focus: stacked cards lift slightly, scale subtly, and rise in z-index.
- Mobile: tap thumbnails in compact horizontal deck to promote image with smooth transition.

## Image paths used

- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1665942128-32748975_2045489799108471_4756559637598175232_n.jpeg`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1665942148-37654654_10160573459925317_3922431706874773504_n.jpeg`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1725237618-img_5374.jpeg`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1725237634-img_8396.jpg`

## MDX insertion point

- File: `src/content/blog/a-year-with-the-wordpress-community.mdx`
- Inserted directly after the final paragraph in the **WP DevDay – February** section and before **WordCamp US – Portland, August** heading.

## Validation result

- `npm run build`: success.
- Desktop visual check: completed on `http://127.0.0.1:4322/blog/a-year-with-the-wordpress-community/` using Playwright CLI at 1440x900.
- Mobile visual check: completed on same URL using Playwright CLI at 390x844.
- Interaction checks:
  - Desktop stacked card click promotes selected image and updates caption/title.
  - Mobile thumbnail tap promotes selected image and updates caption/title.

## Files changed

- `astro.config.mjs`
- `package.json`
- `package-lock.json`
- `src/components/content/StoryGallery.tsx`
- `src/components/content/StoryGallery.css`
- `src/content/blog/a-year-with-the-wordpress-community.mdx`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1665942128-32748975_2045489799108471_4756559637598175232_n.jpeg`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1665942148-37654654_10160573459925317_3922431706874773504_n.jpeg`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1725237618-img_5374.jpeg`
- `src/assets/blog/a-year-with-the-wordpress-community/gallery/1725237634-img_8396.jpg`

## Next steps

- Fine-tune visual values (stack offsets, caption width, card radius) against the exact Figma node if needed.
- Reuse the same component in future longform posts by passing new item arrays.
