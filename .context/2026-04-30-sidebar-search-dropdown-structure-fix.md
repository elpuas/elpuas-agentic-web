# Task Log - sidebar-search-dropdown-structure-fix

## What was done
- Inspected the live sidebar search dropdown in Chrome MCP before making changes.
- Confirmed issue: dynamic search result classes were rendered but not receiving scoped Astro styles, causing raw text-like output and title/type concatenation appearance.
- Refactored result item DOM structure so each item renders two explicit lines:
  - Line 1: title
  - Line 2: content type label
- Updated dropdown result styles to apply globally to dynamic nodes (`:global(...)`) and refined spacing, separators, clamp, and hover treatment.
- Re-verified the rendered dropdown in Chrome MCP after changes.

## Files changed
- src/layouts/BaseLayout.astro
- .context/2026-04-30-sidebar-search-dropdown-structure-fix.md

## Next steps
- Optional: quick manual pass with additional queries to validate edge-case long titles on mobile width.
