# CLI Transcript Panel Refine

## What was done
- Refined CLI transcript viewport padding to add comfortable top/side breathing and separation from the composer.
- Added clearer internal panel structure by visually separating transcript and input composer with a subtle divider/background treatment.
- Tightened desktop transcript max-height for a compact floating terminal feel, with internal scrolling for longer threads.
- Improved transcript readability through increased line-height, paragraph spacing, and larger gap between user and assistant messages.
- Kept user prompts visibly in accent green and assistant replies in neutral light text.
- Made progressive assistant reveal more perceptible by reducing chunk size and increasing frame timing for smoother streamed typing.
- Ran `npm run build` successfully.

## Files changed
- src/layouts/BaseLayout.astro
- .context/2026-04-28-cli-transcript-panel-refine.md

## Next steps
- Final visual QA on desktop and mobile to tune exact transcript height/padding constants if needed.
