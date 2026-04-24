# AGENTS.md

## Overview

This project is a minimal Astro-based personal website with a CLI-style interface and an AI agent.

The goal is to build a fast, SEO-friendly site where each page acts as a knowledge node, and users can query content via a CLI interface.

---

## Execution Model

- The agent can create branches and commits
- Work in small, focused changes
- Each task should result in a minimal, clear diff

---

## Project Structure

/src/pages → Astro pages  
/src/layouts → Layouts  
/src/components → UI components  
/content → MD/MDX content  
/lib → utilities and AI logic  
/.codex/skills → reusable workflows  

---

## Skills

Skills are reusable workflows located in:

.codex/skills/

The agent should:

- Use skills when the task matches a known workflow
- Avoid creating unnecessary new skills
- Keep skills focused and practical

---

## Core Rules

- Prefer Astro for all rendering
- Keep pages static and SEO-friendly
- Use client-side JS only for the CLI
- Do not introduce unnecessary dependencies

---

## Content Rules

- All content must come from `/content`
- Do not hardcode page content in components
- Each page maps to one MD/MDX file

---

## CLI Rules

- Commands must be deterministic
- Commands are handled locally
- AI is only used for free-form questions

---

## AI Rules

- Always use page-scoped context
- Never send full site content
- Keep prompts minimal and relevant

---

## Content vs UI

Files in `/content` are knowledge-base files for the AI agent.

Do not modify `/content` files when implementing visual UI changes unless the task explicitly asks to update the knowledge base.

Page UI should live in `/src/pages` or `/src/components`.

## Performance

- Prefer static rendering
- Keep bundle size small
- Avoid unnecessary client-side code

---

## Output Expectations

- Minimal diffs
- No unnecessary rewrites
- Clear and readable code
- Add comments in English when needed

---

## Logging

Each task must generate:

.context/[DATE]-[TASK].md

Including:
- What was done
- Files changed
- Next steps