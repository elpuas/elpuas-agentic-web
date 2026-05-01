# Task: Ask dock expanded-state final UX polish

## What was done
- Refined only `src/layouts/BaseLayout.astro` for Ask dock expanded UX.
- Added persistent top breathing room in scrollable response area:
  - increased top padding in `.cli-messages`
  - added `scroll-padding-top` so scrolled content keeps headroom
- Strengthened glass separation in expanded state:
  - stronger dark surface opacity
  - deeper layered shadow
  - stronger backdrop blur
- Improved scrollbar containment inside dock:
  - inset scrollbar track with vertical margins
  - adjusted thumb styling
  - increased right padding in message area so text doesn’t crowd scrollbar channel
- Fixed close behavior semantics:
  - close now collapses UI only
  - conversation/messages remain in memory
  - follow-up questions continue the same conversation after reopening

## Browser verification
- Verified expanded state with real response content.
- Verified stronger blur/elevation and improved readability against background cards.
- Verified close collapse and follow-up continuation preserve prior conversation state.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-05-01-ask-dock-final-ux-polish.md`

## Next steps
- Optional: if desired, tune blur strength by small increments for personal preference.
