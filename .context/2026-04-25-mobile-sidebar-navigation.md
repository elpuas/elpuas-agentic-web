# Mobile Sidebar Navigation and AI Debug Cleanup

## Issue fixed
- Completed the mobile sidebar usability fix so the sidebar is hidden by default on mobile and no longer blocks content/chat.

## Mobile behavior added
- Added a mobile hamburger toggle for opening and closing the sidebar.
- Added off-canvas sidebar overlay behavior with a subtle backdrop.
- Added close behavior on nav link click, outside click, backdrop click, and `Escape`.

## Temporary AI debug logs removed
- Removed temporary success-path debug instrumentation from:
  - `src/lib/ai.ts`
  - `src/lib/context.ts`
  - `src/pages/api/ask.ts`
- Removed request/env/payload diagnostics and verbose payload/context auditing logs.

## Protections preserved
- Preserved raw OpenAI fetch transport.
- Preserved hardened output parsing behavior.
- Preserved system prompt behavior.
- Preserved input validation, token cap, and cooldown throttle.
- Preserved page context support and blog discovery context support.
- Preserved graceful user-facing JSON error responses.

## Files modified
- `src/layouts/BaseLayout.astro`
- `src/lib/ai.ts`
- `src/lib/context.ts`
- `src/pages/api/ask.ts`
- `.context/2026-04-25-mobile-sidebar-navigation.md`

## Validation notes
- Ran `npm run build` successfully after mobile sidebar and AI cleanup changes.
