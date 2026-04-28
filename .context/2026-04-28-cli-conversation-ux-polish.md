# CLI Conversation UX Polish

## What was done
- Refined CLI conversation readability in `src/layouts/BaseLayout.astro` with increased spacing between messages, better paragraph breathing, and a more comfortable line-height.
- Kept user prompts visually distinct in accent green while softening the message treatment for a premium feel.
- Added progressive assistant response reveal with chunked typing and a subtle blinking cursor, including reduced-motion fallback.
- Added bounded desktop floating CLI message area via max-height and internal scrolling to prevent long conversations from swallowing homepage hero visuals.
- Preserved existing floating behavior, desktop/mobile structure, and entrance animation.
- Ran `npm run build` successfully.

## Files changed
- src/layouts/BaseLayout.astro
- .context/2026-04-28-cli-conversation-ux-polish.md

## Next steps
- Manually review on desktop and mobile in-browser to validate final spacing feel and typing speed comfort.
- If desired, tune typing chunk size/speed constants for brand tone.
