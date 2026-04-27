# 2026-04-27 - global-motion-and-chatbot-consistency

## What was done
- Unified desktop floating chatbot dock behavior by enabling desktop floating mode as the default layout behavior for shared pages.
- Added a layout-level `showCli` toggle and used it to fully remove chatbot dock rendering from the contact page.
- Kept desktop dock alignment tied to the main content workspace and preserved existing mobile dock behavior.
- Refined homepage-only decorative skull animation with a clearer delayed reveal and more perceptible ambient drift.
- Added a subtle desktop dock settle step in the desktop entrance keyframe for smoother perceived motion.

## Files changed
- `src/layouts/BaseLayout.astro`
- `src/pages/contact.astro`
- `src/components/Welcome.astro`

## Next steps
- Manually smoke-test desktop pages (home, about, blog archive, blog single) and contact page to confirm motion and conditional dock behavior.
- Verify mobile behavior remains unchanged during responsive QA.
