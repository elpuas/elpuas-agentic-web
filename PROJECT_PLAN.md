# Project Plan — elpuas-agentic-web

## Goal

Build a minimal personal website that:

- Feels like a CLI / AI interface
- Is fully SEO-friendly
- Uses MD/MDX as the source of truth
- Allows users to query content via an AI agent

---

## Core Idea

Each page is:

- A static, indexable document (for SEO)
- A scoped knowledge node (for AI)

The CLI is the interface layer on top.

---

## Tech Stack

- Astro (SSR / static rendering)
- MDX (content system)
- Vanilla CSS
- Minimal JS (CLI only)
- OpenAI API (agent layer)

---

## Architecture

### 1. Content Layer

/content
	about.mdx
	projects.mdx
	blog/*.mdx

- MDX is the single source of truth
- Each page maps to one content file
- Content must be:
	- renderable as HTML
	- extractable as plain text

---

### 2. Pages

/src/pages
	index.astro
	about.astro
	projects.astro
	blog/[slug].astro
	contact.astro

Each page:

- Renders MDX content (SEO)
- Provides page-specific context to the agent

---

### 3. Layout

- Sidebar (navigation)
- Main content area
- CLI input fixed at bottom

No complex UI. No marketing components.

---

### 4. CLI Layer

- Input field (terminal style)
- Command detection
- History (optional v1.1)

Flow:

1. User types input
2. If matches command → handle locally
3. Else → send to AI

---

### 5. AI Layer

Endpoint:

POST /api/ask

Input:
- question
- page

Behavior:

- Load page content
- Trim if needed
- Inject into prompt
- Return answer

---

### 6. Context Strategy

- Page-scoped only
- No full-site context
- Keep tokens low

Future:

- embeddings per page
- chunking

---

### 7. SEO Strategy

- Full HTML rendered from MDX
- Semantic tags (h1, p, etc.)
- JSON-LD per page
- Optional FAQ blocks
- Hidden semantic content allowed

---

## Milestones

### v1 — Foundation

- Astro setup
- Layout (sidebar + content + CLI)
- MDX rendering
- Static CLI (no AI)

---

### v2 — AI Integration

- /api/ask endpoint
- Page-scoped prompts
- CLI → API connection

---

### v3 — Intelligence

- Embeddings per page
- Better context selection
- Response caching

---

## Non-Goals

- No CMS
- No heavy React app
- No animations
- No overengineering