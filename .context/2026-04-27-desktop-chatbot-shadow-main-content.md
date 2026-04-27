# Desktop Chatbot Shadow Main Content Scope (2026-04-27)

## What was done
- Adjusted desktop floating chatbot grounding shadow so it starts after the fixed sidebar and only covers the main content area.

## Files modified
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-27-desktop-chatbot-shadow-main-content.md`

## Change details
- In desktop floating CLI mode (`min-width: 48.0625rem`), updated:
  - `.shell-cli-floating-desktop .workspace::after`
  - `left: 0` -> `left: 16rem`
- This matches the existing sidebar width and prevents shadow overlap on the sidebar.

## Validation notes
- Ran `npm run build` successfully.
- No build errors.
