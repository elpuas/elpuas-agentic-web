# elpuas-agentic-web

A personal portfolio website built with Astro and MDX, with an embedded CLI-style assistant that answers questions using page-scoped context.

## Overview

This project is Alfredo Navas' portfolio and knowledge site. It combines:

- static-first, SEO-friendly pages
- a content-driven blog and profile knowledge base
- a lightweight AI chat entry point for natural-language questions

The site is optimized for fast rendering, predictable content loading, and maintainable content operations.

## Stack

- [Astro](https://astro.build/) for page routing and rendering
- [MDX](https://docs.astro.build/en/guides/markdown-content/) for long-form content
- Astro Content Collections for typed blog content
- Netlify adapter for server output and API runtime
- OpenAI Responses API for AI answers (`gpt-4.1-mini`)

## AI Chatbot Architecture

The chat flow is intentionally minimal and page-aware:

1. The CLI form in `BaseLayout` sends a POST request to `src/pages/api/ask.ts`.
2. The API validates input, applies a short per-IP cooldown, and normalizes payloads.
3. `loadContext` (`src/lib/context.ts`) builds context from:
   - `/content/knowledge/*.mdx` global knowledge files
   - a generated blog discovery index (`src/lib/blog-context.ts`)
   - optional current-page context (when provided by the route)
4. `askAI` (`src/lib/ai.ts`) sends the constrained prompt and context to the OpenAI Responses API.
5. The API returns concise text for direct rendering in the CLI message thread.

### Design Principles

- context is scoped to what the question needs
- no full-site content dump is sent by default
- deterministic command-like behavior remains local; AI is for free-form answers

## Content and Blog System

### Knowledge Context

- Source: `/content/knowledge/*.mdx`
- Purpose: profile, skills, experience, tools, and background context for the assistant

### Blog Content

- Source: `/src/content/blog/*.mdx`
- Config: `src/content.config.ts`
- Listing: `/blog/`
- Detail routes: `/blog/[slug]/` via static paths

Blog posts support frontmatter fields including slug, category, tags, dates, and optional hero images.

## Project Structure

```text
.
├── content/
│   └── knowledge/                # AI knowledge base (MDX)
├── public/                       # Static assets
├── src/
│   ├── assets/                   # Images/icons
│   ├── components/               # Reusable UI blocks
│   ├── content/                  # Blog MD/MDX source
│   ├── layouts/                  # Shared layouts + CLI shell
│   ├── lib/                      # AI/context utilities
│   ├── pages/                    # Astro routes + API handlers
│   │   └── api/ask.ts            # AI endpoint
│   └── styles/                   # Global styles and tokens
├── astro.config.mjs              # Astro + Netlify adapter config
└── package.json
```

## Local Development

### Requirements

- Node.js `>= 22.12.0`
- npm

### Install

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

The app runs on the default Astro dev host (typically `http://localhost:4321`).

## Environment Variables

Create a local `.env` file (or set variables in your shell):

```bash
ELPUAS_OPENAI_API_KEY=your_openai_api_key
```

### Required Variables

- `ELPUAS_OPENAI_API_KEY`: used server-side by `src/lib/ai.ts` for OpenAI Responses API calls

Without this variable, `/api/ask` cannot generate answers.

## Build and Preview

### Production Build

```bash
npm run build
```

### Local Preview

```bash
npm run preview
```

## Netlify Deployment Notes

- Astro is configured with `output: 'server'` and `@astrojs/netlify` in `astro.config.mjs`.
- Ensure `ELPUAS_OPENAI_API_KEY` is set in Netlify environment variables.
- Contact form (`src/pages/contact.astro`) uses Netlify Forms markup (`data-netlify="true"`).
- API route `/api/ask` runs in server context; it is not prerendered.

## Notable UX Features

- CLI-style chat panel available across the site
- contextual answering that can include current page context (especially blog posts)
- automatic link parsing in assistant messages for internal/external references
- responsive mobile sidebar with accessible toggle and Escape/outside-click close behavior
- profile popover helper with keyboard/outside-click dismissal

## Scripts

- `npm run dev` - start local development server
- `npm run build` - build production output
- `npm run preview` - preview production build locally
- `npm run astro` - run Astro CLI commands
