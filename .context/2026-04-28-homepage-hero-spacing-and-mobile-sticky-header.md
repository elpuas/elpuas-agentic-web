# 2026-04-28 - homepage-hero-spacing-and-mobile-sticky-header

## What was done
- Tightened homepage hero vertical composition in `src/components/Welcome.astro` so the skull, heading, and intro copy sit lower and closer to the chatbot dock on desktop.
- Slightly tightened homepage hero top spacing on mobile without changing content structure or behavior.
- Implemented a persistent mobile sticky header in `src/layouts/BaseLayout.astro` with dark translucent backdrop, subtle blur, and proper z-index.
- Added a mobile header height variable and applied top offset to `.workspace` so page content does not hide behind the sticky header.
- Kept dock behavior, chatbot animations, and StoryGallery implementation unchanged.

## Files changed
- `src/components/Welcome.astro`
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-28-homepage-hero-spacing-and-mobile-sticky-header.md`

## Next steps
- Validate in-browser at desktop and mobile breakpoints for final optical balance.
- If desired, fine-tune homepage-only desktop spacing by a few pixels after visual QA.

## Follow-up adjustment (same day)
- Further reduced homepage hero vertical height and bottom padding in `src/components/Welcome.astro` so the hero block sits directly above the chatbot dock with tighter visual coupling on desktop.

## Parent layout distribution correction
- Added homepage-only desktop parent layout rules in `src/layouts/BaseLayout.astro` to remove the centered feel at wrapper level.
- Homepage `.content` now uses a lowered top/bottom distribution, and homepage `.content-inner` is bottom-anchored (`justify-content: flex-end`) with controlled min-height.
- Scope is limited to `data-home='true'` on desktop; About/Blog/Contact remain unchanged.

## Dock breathing-space adjustment
- Kept lowered homepage desktop hero position and added extra reserved lower spacing in homepage-only desktop layout rules.
- Increased homepage desktop `.content` bottom padding and added homepage desktop `.content-inner` bottom padding to create a protected breathing zone above the floating chatbot dock.
- Scope remains desktop + homepage only.

## Expanded dock-state reserve
- Increased homepage desktop-only lower reserve to account for chatbot dock expansion during active conversation, not only collapsed idle height.
- Enlarged homepage `.content` bottom spacing budget and `.content-inner` bottom breathing padding to preserve visual separation when the dock grows upward.
