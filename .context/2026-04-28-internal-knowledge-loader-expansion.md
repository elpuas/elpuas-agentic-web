# Task Log: Internal Knowledge Loader Expansion

## What was done
- Created branch `feature/internal-knowledge-loader-expansion` from `main`.
- Updated `src/lib/context.ts` to use a recursive MDX glob for knowledge loading.
- Preserved raw text loading (`?raw` + `import: 'default'`), deterministic sorting, and existing context assembly format.
- Verified internal files are included by checking generated build artifacts (`.netlify/build/chunks/ask_*.mjs`) now listing:
  - `content/knowledge/internal/enterprise-clients.mdx`
  - `content/knowledge/internal/project-categories.mdx`
  - `content/knowledge/internal/semantic-aliases.mdx`
  - `content/knowledge/internal/speaking-and-community-leadership.mdx`
  - `content/knowledge/internal/technical-mastery.mdx`
- Ran `npm run build` successfully.

## Files changed
- `src/lib/context.ts`
- `.context/2026-04-28-internal-knowledge-loader-expansion.md`

## Next steps
- Optionally add an automated test around `loadContext()` to assert nested knowledge files are included.
