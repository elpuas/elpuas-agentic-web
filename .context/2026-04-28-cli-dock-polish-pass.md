# CLI dock polish pass

## What was done
- Added home-only hero motion tied to CLI expanded conversation state, without changing dock architecture.
- Added progressive assistant response reveal in quick chunks for a streamed/typewriter effect.
- Kept user question lines in accent green and preserved readability spacing/line-height improvements.
- Kept all changes scoped to `src/layouts/BaseLayout.astro` and avoided AI backend logic changes.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-28-cli-dock-polish-pass.md`

## Next steps
- Validate behavior on homepage desktop and mobile to confirm motion feels subtle.
- Tune chunk timing only if readability feedback requests it.
