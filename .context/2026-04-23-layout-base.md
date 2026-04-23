# Layout Base

## What was done

- Created the base design token file at `src/styles/tokens.css`
- Added global dark-theme styles and a minimal reset at `src/styles/global.css`
- Extracted the initial palette, spacing cues, and typography scale from the Figma file `ELPuas-2026`
- Kept the implementation limited to styles only, without adding UI components, React, or external UI libraries

## Files changed

- `src/styles/tokens.css`
- `src/styles/global.css`

## Next steps

- Import `src/styles/global.css` from the main layout when layout file edits are allowed
- Add font files under `public/fonts` if `Mona Sans VF` needs to be self-hosted
- Build layout primitives and UI components on top of the token layer in follow-up tasks
