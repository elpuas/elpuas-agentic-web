# Task Log - sidebar-search-close-reset

## What was done
- Updated sidebar live-search close behavior to act as a transient command palette.
- Added centralized close/reset logic so closing always clears query, hides dropdown, and removes rendered results.
- Implemented close/reset for:
  - outside click (outside `.search-wrap`)
  - Escape key
  - clicking a search result
- Verified behavior via Chrome MCP snapshots and interactions on the running local site.

## Files changed
- src/layouts/BaseLayout.astro
- .context/2026-04-30-sidebar-search-close-reset.md

## Next steps
- Optional: add keyboard navigation for result selection (ArrowUp/ArrowDown + Enter).
