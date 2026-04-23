# OpenAI API Integration Log

## Summary of implementation
- Installed `openai` dependency.
- Added a minimal server endpoint at `/api/ask` to accept `POST` requests with `{ question, page? }`.
- Added OpenAI helper logic in `src/lib/ai.ts` using `import.meta.env.OPENAI_API_KEY` and model `gpt-5.4-mini`.
- Added context loader in `src/lib/context.ts` that reads required knowledge MDX files as plain text and combines them.
- Connected the CLI in `src/layouts/BaseLayout.astro` to submit questions to `/api/ask` and append assistant responses to the message list.

## Files created
- `src/pages/api/ask.ts`
- `src/lib/ai.ts`
- `src/lib/context.ts`
- `.context/2026-04-23-openai-api.md`

## Notes and assumptions
- The optional `page` field is accepted and forwarded from the CLI request body, but not yet used for scoped context filtering.
- The endpoint currently loads the full combined context from the six required files.
- If the model response is empty, the fallback text is `I don't know.`.

## TypeScript fix update (2026-04-23)
- Installed dev dependency: `@types/node`.
- Updated `tsconfig.json` to include Node type definitions via `compilerOptions.types = ["node"]`.
- Kept Node built-in import usage unchanged (`import { readFile } from 'node:fs/promises'`).
