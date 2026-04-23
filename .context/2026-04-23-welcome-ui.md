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

## Refinement (2026-04-23)
- Refined `src/components/Welcome.astro` to match Figma node `3:173` more closely.
- Reused existing project asset `src/assets/logo.svg` and placed it to the left of the heading.
- Matched heading row structure to Figma intent with:
  - Icon size `63x63`
  - Horizontal gap `20px`
  - Aligned heading baseline/row
- Kept required copy exactly:
  - Hi, I’m Alfredo Navas.
  - Ask me anything about my work or projects.
  - This site is powered by an AI agent.
- Improved spacing rhythm to align with Figma:
  - Added larger separation between heading row and body copy
  - Increased bottom padding in the local main area to better balance distance to CLI input
- Kept design system consistency:
  - Mona Sans VF via existing tokenized font family
  - Existing tokens for color and most spacing/typography values
  - Slight heading size adjustment using a responsive clamp to better approximate Figma scale

## Files changed (refinement)
- `src/components/Welcome.astro`
- `.context/2026-04-23-welcome-ui.md`
