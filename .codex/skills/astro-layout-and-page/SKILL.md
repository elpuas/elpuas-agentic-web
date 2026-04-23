---
name: astro-layout-and-page
description: Use when creating the base layout or a new page in Astro using MDX content and existing design tokens.
---

# Astro Layout and Page

## Purpose

Create and maintain the base layout and pages of the site using Astro and MDX.

---

## When to use

- Creating the main layout (sidebar + content)
- Creating a new page (about, projects, etc.)
- Connecting MDX content to a page

---

## Rules

- Use Astro for rendering
- Do NOT use React
- Use design tokens from `/src/styles`
- Keep layout minimal

---

## Steps

1. Create layout

- File: `/src/layouts/BaseLayout.astro`
- Structure:
	- sidebar (left)
	- main content (right)
	- CLI container (bottom, empty for now)

2. Create sidebar

- Simple navigation:
	- Home
	- About
	- Projects
	- Blog
	- Contact

3. Create MDX content

- File: `/content/about.mdx`
- Add:
	- title
	- description
	- basic content

4. Create page

- File: `/src/pages/about.astro`
- Load MDX content
- Render inside layout

5. Apply styles

- Use tokens from `tokens.css`
- Use global styles
- Keep layout clean

---

## Output

- Working layout
- One functional page (/about)
- Clean Astro structure

---

## Anti-patterns

- Hardcoding content in components
- Using React unnecessarily
- Creating complex abstractions