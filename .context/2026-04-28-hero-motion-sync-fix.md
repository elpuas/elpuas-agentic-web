# Hero motion sync fix

## What was done
- Updated CLI expanded-state handling so homepage hero movement is triggered from the same shared expanded boolean at submit time.
- Kept behavior homepage-desktop scoped and did not alter AI backend logic.
- Increased hero upward translate distance and slightly tightened transition duration to make movement clearly perceptible and synchronized with dock expansion.
- Attempted local interaction validation by running the local dev server and checking MCP browser availability.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-28-hero-motion-sync-fix.md`

## Next steps
- If desired, adjust final motion distance after visual QA on target display sizes.
