# Blog context and legitimate-question routing

## What was done

- Continued on `feat/low-cost-agent-luna`, preserving the existing uncommitted model upgrade and review notes.
- Identified the premature `blog_related` response: it returned a recommendation link before answer generation, even for current-post summaries. Classification previously received only a page-context boolean.
- Added server-side lookup of exactly one published article by local blog path. Current-page metadata now reaches classification; an explicitly selected alternative article must match both title and URL in the published index.
- Blog-related requests now generate a grounded answer from the selected article body instead of returning a link-only redirect. They use only that article context, avoiding loading the global profile knowledge for those requests.
- Removed embedded MDX source and client-supplied article text from the browser payload. The client sends its path; the server resolves the published text from Astro content. Unknown paths, drafts, remote URLs, and fabricated client content do not provide article context.
- Updated scope and answer prompts to allow summaries, explanations, technical article questions, and follow-ups while keeping unrelated, private, mixed-domain, and role-override requests restricted. Article examples and quoted prompts are treated as data.
- Kept article questions and conversational follow-ups on the scope-aware path instead of applying context-free deterministic answers.
- Adjusted deterministic routing so summaries/explanations and descriptive professional questions reach the model. Single-word aliases require exact matches, and Spanish accent normalization preserves legitimate questions.
- Updated README architecture documentation. No knowledge-base or article content was edited.

## Files changed

- src/lib/ai.ts
- src/lib/blog-context.ts
- src/lib/deterministic/router.ts
- src/pages/api/ask.ts
- src/layouts/BaseLayout.astro
- src/pages/blog/[slug].astro
- README.md
- .context/2026-11-16-blog-agent-guardrails.md

## Validation

- `npm run build` and `git diff --check` passed after the final runtime changes.
- Live local endpoint suite: 14/14 passed. Included the exact `whats this post about` request twice, Spanish summary, CLI/MCP details, personal SpaceFast choice, conversational follow-up, named-post summary from home, selecting another post from an article page, Spanish WordPress/React work question, privacy, prompt injection, mixed allowed/unrelated requests, nonexistent credentials, and forged article text for an unknown path.
- The first suite exposed a deterministic false match for a named-post summary from home; fixed that route and reran the suite successfully. A credential-refusal assertion was broadened to recognize the valid refusal wording; no guardrail was relaxed for that case.
- After restricting blog-related generation to article-only context, separately rechecked current-post and named-post summaries against the real endpoint successfully.
- Additional isolated regression checks passed for descriptive routing, retained local GitHub/contact/location shortcuts, published-body lookup, and draft/missing/remote/traversal path rejection.
- Browser form submission with the exact user example displayed a real Café Roble/SpaceFast summary. The browser sent the current blog path without embedded article text.
- Temporary live suite and results: /tmp/elpuas-blog-guardrail-check.mjs and /tmp/elpuas-blog-guardrail-check.log. No dependencies or API credentials were added to the repository.

## Next steps

- Review locally on `feat/low-cost-agent-luna`. The article is available as request context immediately; no indexing delay is required.
- No commit, push, or production deployment was performed.
