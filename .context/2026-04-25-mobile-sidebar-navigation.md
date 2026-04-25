# Mobile Sidebar Navigation

## Issue fixed
- Mobile sidebar no longer occupies the full viewport by default and block page/chat visibility.

## Mobile behavior added
- Added a hamburger button to open/close sidebar on mobile.
- Sidebar now opens as an off-canvas overlay with a subtle backdrop.
- Sidebar closes on nav link click, outside click, backdrop click, and `Escape` key.
- Added mobile accessibility state updates via `aria-expanded`, `aria-label`, `aria-hidden`, and `inert` when closed.

## Files modified
- `src/layouts/BaseLayout.astro`

## Validation notes
- Verified responsive behavior logic in layout script and mobile media-query styles.
- Ran `npm run build` successfully.
