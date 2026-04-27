# Finalize Desktop Dock Animation and Hero Gradient (2026-04-27)

## What was done
- Finalized desktop persistent chatbot entrance motion so it is visibly delayed and rises into place with a soft settle.
- Finalized single-post hero title gradient rendering by adding WebKit text-fill transparency for consistent gradient display.

## Files modified
- `src/layouts/BaseLayout.astro`
- `src/pages/blog/[slug].astro`
- `.context/2026-04-27-finalize-desktop-dock-and-hero-gradient.md`

## Desktop dock animation refinement
- Updated desktop floating dock animation to be more intentional:
  - duration: `420ms`
  - easing: `cubic-bezier(0.22, 1, 0.36, 1)`
  - delay: `220ms`
  - start offset: `translateY(1rem)`
- Scope remains desktop floating mode only.
- No changes to desktop dock geometry/alignment.

## Hero title gradient refinement
- Kept subtle white -> soft white -> accent gradient on single-post hero `h1`.
- Added `-webkit-text-fill-color: transparent` to ensure gradient text renders correctly in WebKit-based browsers.

## Validation notes
- Ran `npm run build` successfully.
- No regressions introduced to existing single-post layout or desktop dock alignment.
