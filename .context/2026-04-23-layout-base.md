# Layout Base

## What was done

- Added `BaseLayout.astro` with a left sidebar, right content column, and an empty CLI container at the bottom.
- Wired Astro MDX support so the about page can render content from `/content/about.mdx`.
- Created the first content-backed page at `/about` and connected it to the new base layout.
- Kept the implementation on the existing token layer from `src/styles` and avoided React or UI libraries.

## Files created or changed

- `astro.config.mjs`
- `content/about.mdx`
- `src/layouts/BaseLayout.astro`
- `src/layouts/Layout.astro`
- `src/pages/about.astro`

## Next steps

- Add `projects`, `blog`, and `contact` pages as MDX content files when those sections are ready.
- Replace the empty CLI container with the local command interface in a follow-up task.
