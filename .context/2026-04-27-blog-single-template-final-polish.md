# Blog Single Template Final Polish (2026-04-27)

## What was done
- Added a desktop persistent floating chatbot dock mode while preserving existing mobile behavior.
- Scoped desktop floating chatbot mode to single blog post templates only via `BaseLayout` prop wiring.
- Added subtle premium gradient text treatment to single post hero title.

## Files modified
- `src/layouts/BaseLayout.astro`
- `src/pages/blog/[slug].astro`
- `.context/2026-04-27-blog-single-template-final-polish.md`

## Desktop chatbot dock behavior
- Added `floatingCliDesktop` prop to `BaseLayout` (default `false`).
- When enabled:
  - shell receives `shell-cli-floating-desktop` class
  - CLI is fixed near bottom center on desktop (`min-width: 48.0625rem`)
  - CLI remains interactive using `pointer-events` pass-through pattern
  - subtle desktop entrance animation (`desktop-cli-enter`) is applied
  - dark bottom grounding gradient is rendered behind dock
  - extra desktop bottom content padding is reserved to prevent content overlap
- Mobile behavior remains governed by existing mobile fixed CLI rules.

## Single post scoping
- `floatingCliDesktop={true}` is set only in `src/pages/blog/[slug].astro`.
- No other pages opt into the desktop floating mode.

## Hero title gradient behavior
- Single post hero `h1` now uses a subtle white -> soft white -> accent green linear gradient.
- Applied inside `@supports` block for graceful fallback to solid white where needed.

## Validation notes
- Ran `npm run build` successfully.
- Build completed with prerendered blog single routes.
- Confirmed single post output includes floating desktop shell class and edge content classes.
- Confirmed no changes were made to page templates outside scoped layout + blog single template.
