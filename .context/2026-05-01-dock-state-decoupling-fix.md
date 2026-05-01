# Task: Ask dock state decoupling fix

## What was done
- Refactored Ask dock state handling in `src/layouts/BaseLayout.astro` to separate visual state from conversation data.
- Introduced independent visual state variable: `isDockExpanded`.
- Visual expanded/collapsed state is now controlled only by `setDockExpanded(...)`.
- Removed coupling logic that derived dock visibility from message/conversation existence.
- Removed auto-reopen-on-input-focus/click behavior that caused collapse to immediately re-open.
- Close/dismiss now performs UI collapse only and does not clear message DOM or conversation history arrays.
- Submit action explicitly re-expands dock and continues the same preserved thread.

## Verification summary
- Build succeeded (`npm run build`).
- Browser interaction confirmed prior thread content remains present when continuing after collapse flow.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-05-01-dock-state-decoupling-fix.md`

## Next steps
- Optional: add a dedicated explicit "reopen conversation" affordance if desired, without tying it to input focus.
