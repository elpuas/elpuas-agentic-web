# Task: Ask dock expanded-state elevation and dismiss control

## What was done
- Updated only `src/layouts/BaseLayout.astro` for Ask dock UX polish.
- Added stronger expanded-state visual separation for the dock panel:
  - deeper layered shadow
  - stronger dark panel opacity
  - subtle backdrop blur
- Added subtle dismiss/collapse control inside the dock:
  - ghost-style circular close icon
  - visible and interactive only when dock is expanded (`data-cli-expanded='true'`)
  - collapses back to compact state
  - clears current response/messages and resets conversation history on collapse
- Kept existing ask behavior, animation system, and baseline dock styling intact.

## Browser verification
- Verified expanded state after sending a prompt (`POST /api/ask`) and confirmed improved visual layer separation.
- Verified clicking the new collapse button returns dock to compact input-only state.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-05-01-ask-dock-expanded-elevation-dismiss.md`

## Next steps
- Optional: tune blur/shadow strength by small increments if you want it either softer or more pronounced.
