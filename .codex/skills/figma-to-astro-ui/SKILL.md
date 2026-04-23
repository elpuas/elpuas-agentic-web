# Figma to Astro UI

## Purpose

Use Figma (via MCP) as the source of truth for UI design, and implement it as clean, minimal Astro code.

---

## When to use

Use this skill when:

- Implementing or updating UI components
- Working with layout (sidebar, main content, CLI input)
- Translating design into code

---

## Source of truth

- Always use Figma via MCP
- Do NOT guess layout or spacing
- Do NOT invent UI patterns

---

## Rules

- Do NOT copy generated code from Figma tools
- Do NOT use React unless strictly necessary
- Do NOT introduce UI libraries

- Extract only:
	- layout structure
	- spacing
	- typography
	- visual hierarchy

---

## Steps

1. Access Figma via MCP

- Locate the relevant frame or component
- Identify:
	- layout (sidebar, content, input)
	- spacing
	- alignment
	- hierarchy

2. Simplify the design

- Ignore unnecessary wrappers
- Flatten deep nesting
- Identify reusable sections

3. Implement in Astro

- Create layout in `/src/layouts`
- Create components in `/src/components`
- Use semantic HTML

4. Apply minimal styling

- Use vanilla CSS
- Keep styles readable and maintainable
- Avoid utility overload

5. Handle interactivity

- Only add JS where needed (CLI input)
- Keep UI mostly static

---

## Output

- Clean Astro components
- Minimal CSS
- Accurate layout based on Figma

---

## Anti-patterns

- Copying Figma-generated React code
- Recreating exact node structure from Figma
- Overusing div wrappers
- Adding unnecessary dependencies

---

## Notes

- The goal is to reproduce the design intent, not the exact implementation
- Prefer simplicity over pixel-perfect complexity