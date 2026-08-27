# Public Personal Question Scope

## What was done

- Updated the scope classifier so harmless questions about documented hobbies, interests, public biography, and life outside work are allowed through to grounded answer generation.
- Kept sensitive and genuinely private topics protected, including finances, health, religion, politics, private relationships, and exact home details.
- Replaced the broad personal-life fallback with wording limited to private or sensitive details.
- Added semantic associations for hobbies, interests, creative activities, recreation, and public biography.
- Updated the missing-information fallback so harmless undocumented questions do not imply that Alfredo's personal life is private.
- Tightened factual grounding for undocumented favorites and preferences so related creative context cannot be used to invent an answer.
- Added Alfredo's confirmed public music, movie, book, and Rastafari-teaching interests to the personal knowledge base.
- Kept religious identity private and prevented the public Rastafari-teachings fact from being expanded into an unsupported affiliation.

## Files changed

- `src/lib/ai.ts`
- `src/pages/api/ask.ts`
- `content/knowledge/internal/semantic-aliases.mdx`
- `content/knowledge/personal.mdx`
- `.context/2026-08-27-public-personal-question-scope.md`

## Next steps

- Add any additional public preferences Alfredo explicitly confirms, such as favorite music, movies, books, or other interests.

## Validation

- `npx tsc --noEmit`
- Confirmed all six reported hobby and interest variants return grounded answers from the existing knowledge base.
- Confirmed undocumented favorite-band and favorite-movie questions use a missing-information response without inventing facts.
- Confirmed home-address, medical-history, and financial questions still use the private/sensitive fallback.
- Confirmed the new band, music, movie, book, and Rastafari-teachings questions return the user-confirmed facts.
- Confirmed questions about religious identity or affiliation remain private and do not infer identity from following Rastafari teachings.
