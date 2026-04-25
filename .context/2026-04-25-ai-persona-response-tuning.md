# AI Persona Response Tuning - 2026-04-25

## What was done

- Refined `SYSTEM_PROMPT` in `src/lib/ai.ts` to enforce shorter, casual, direct replies.
- Added explicit behavior constraints to:
  - answer only what was asked
  - default to 2-4 sentences
  - avoid chronological storytelling unless requested
  - avoid biography/CV/profile-summary tone
  - keep first-person voice, natural conversational style, and confidence
- Added stronger anti-repetition guidance to avoid repeated templates/openers such as "Sure!", "I started...", and "I have...".
- Enabled low verbosity in the Responses API payload:
  - `text.format.type = "text"`
  - `text.verbosity = "low"`
- Kept model unchanged as `gpt-4.1-mini`.

## Files changed

- `src/lib/ai.ts`
- `.context/2026-04-25-ai-persona-response-tuning.md`

## Manual behavior notes

- Attempted local manual checks through `POST /api/ask` with prompts:
  - "tell me about yourself"
  - "what tools do you use?"
  - "what projects have you worked on?"
  - "do you have a post about AI?"
- In this environment, all requests failed before generation with:
  - `OpenAI request failed: Missing ELPUAS_OPENAI_API_KEY.`
- Because of missing `ELPUAS_OPENAI_API_KEY`, style output could not be observed locally here.
- `npm run build` was executed successfully after changes.

## Next steps

- Set `ELPUAS_OPENAI_API_KEY` in local runtime env and rerun the four prompts to validate shorter, natural, less repetitive responses.
