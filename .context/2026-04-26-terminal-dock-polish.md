# 2026-04-26 - terminal-dock-polish

## What was done
- Darkened the mobile bottom fade mask gradient behind the fixed chatbot so lower-page text is less readable and less visually competitive.
- Simplified Ask Me terminal controls by removing non-functional decorative icons (plus, web, mic) and keeping only the input + send interaction.
- Improved terminal readability by increasing contrast for:
  - input placeholder (`Ask me anything...`)
  - helper label (`Try:`)
- Preserved existing mobile behavior: fixed dock, delayed entrance animation, mobile header, and spacing refinements.

## Files changed
- `src/layouts/BaseLayout.astro`
- `.context/2026-04-26-terminal-dock-polish.md`

## Validation notes
- Ran `npm run build` successfully.
- Terminal simplification applies to both desktop and mobile.
- Stronger fade mask remains mobile-only inside `@media (max-width: 48rem)`.

## Next steps
- Optional: run a manual narrow-viewport visual pass to fine-tune fade opacity percentages on actual device hardware if needed.
