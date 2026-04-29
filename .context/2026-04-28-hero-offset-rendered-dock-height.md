# Homepage hero offset bound to rendered dock height

## What was done
- Replaced one-time boolean hero translation with dynamic dock-height compensation on homepage desktop.
- Measured idle dock height and continuously measured current dock panel height.
- Computed dock growth delta and applied hero upward offset from delta plus a breathing margin.
- Wired updates to submit/loading/render lifecycle using both state sync and `ResizeObserver` so compensation persists through final rendered response height.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-28-hero-offset-rendered-dock-height.md`

## Next steps
- If needed, fine-tune breathing margin after additional visual QA.
