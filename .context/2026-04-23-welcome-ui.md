# Welcome UI Update

## What was done
- Created branch `feature/welcome-from-figma` from `main`.
- Replaced the default Astro welcome content in `src/components/Welcome.astro` with a custom, minimal version based on Figma node `3:173`.
- Implemented centered main-area layout with left-aligned text block, token-based spacing, and token-based colors.
- Applied project typography tokens using `Mona Sans VF` via `--font-family-sans`.
- Updated content to:
  - Hi, I’m Alfredo Navas.
  - Ask me anything about my work or projects.
  - This site is powered by an AI agent.

## Files changed
- `src/components/Welcome.astro`
- `.context/2026-04-23-welcome-ui.md`

## Next steps
- Run a local visual check in the browser to confirm alignment/spacing against the Figma frame.
- If needed, fine-tune token-based spacing values while keeping this component minimal.
