# 2026-04-26 - mobile-chat-persistence

## What was done
- Implemented a fixed mobile chat terminal (`.cli`) so the Ask Me bar remains persistently visible near the bottom of the viewport while content scrolls behind it.
- Added mobile-safe horizontal spacing and bottom safe-area support (`env(safe-area-inset-bottom)`) for better device compatibility.
- Added reserved mobile bottom space in content padding so page content is not obscured behind the fixed terminal.
- Added a subtle mobile entrance animation for the chat terminal panel (slight upward movement + fade in).
- Softened mobile chat message scrollbar visuals to reduce visual competition in the dark UI.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-26-mobile-chat-persistence.md`

## Validation notes
- `npm run build` completed successfully.
- Mobile behavior changes are scoped to `@media (max-width: 48rem)` to preserve desktop behavior.
- Existing mobile header, logo visibility, and prior hero spacing refinements were kept intact.

## Correction pass
- Replaced the heavy-looking bottom treatment with a softer atmospheric gradient mask (`.workspace::after`) on mobile.
- Kept the fixed chatbot dock above the fade layer via stacking order, so content can still subtly peek above/behind the fade.
- Preserved existing mobile fixed-chat behavior and bottom spacing refinements without desktop impact.

## Timing refinement
- Kept the same mobile chatbot entrance animation (upward + fade), but added a short delay (`140ms`) before animation start.
- This creates a clearer staged perception: page paints first, then the chatbot gently lifts into place.
- `npm run build` completed successfully after this timing adjustment.
