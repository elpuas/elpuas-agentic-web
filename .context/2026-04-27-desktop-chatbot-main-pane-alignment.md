# Desktop Chatbot Main Pane Alignment (2026-04-27)

## What was done
- Refined desktop floating chatbot dock alignment so it is centered in the main content pane, not the full viewport.
- Kept refinement desktop-only within existing `shell-cli-floating-desktop` media block.
- Reduced desktop dock width for a more compact assistant footprint.

## Files modified
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-27-desktop-chatbot-main-pane-alignment.md`

## Desktop dock behavior changes
- Updated desktop floating CLI anchor from viewport-wide to main-pane geometry:
  - from `left: 0` to `left: 16rem` (sidebar width)
- This keeps the dock entirely in the content region and visually separate from sidebar.
- Narrowed dock panel width to `min(100%, 48rem)` for better proportional balance.

## Scope safety
- Changes are inside desktop-only floating mode rules (`min-width: 48.0625rem` + `shell-cli-floating-desktop`).
- Mobile chatbot behavior is unchanged.
- Sidebar behavior and article layout are unchanged.

## Validation notes
- Ran `npm run build` successfully.
- Build completed with prerendered blog routes and no errors.
