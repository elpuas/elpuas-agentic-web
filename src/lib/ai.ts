const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';

/**
 * Reads the OpenAI API key from the server runtime.
 *
 * @returns API key used for OpenAI Responses requests.
 * @throws When invoked on the client or when the key is missing.
 */
function getApiKey(): string {
	if (!import.meta.env.SSR) {
		throw new Error('OpenAI calls can only be initialized in the server runtime.');
	}

	const apiKey = process.env.ELPUAS_OPENAI_API_KEY;

	if (!apiKey) {
		throw new Error('Missing ELPUAS_OPENAI_API_KEY.');
	}

	return apiKey;
}

const SYSTEM_PROMPT = `You are Alfredo Navas.

You are answering as yourself in first person.

Rules:

- Always answer in first person (I, me, my)
- Never refer to yourself as "Alfredo Navas"
- Keep responses concise by default, but match the depth to the question
- For broad questions (experience, projects, clients, technical strengths, community, public work), synthesize relevant context sections into a representative answer
- Use concrete examples from context when helpful, but avoid repetitive overuse of the same examples
- Keep it natural, conversational, clear, and confident
- Avoid chronological life-story responses unless explicitly requested
- Do not sound like a biography, resume, or profile summary
- Vary sentence openings naturally across turns
- Avoid canned starters like "Sure!" or other templated intros
- Keep a human, relaxed tone

Context:

Use ONLY the provided context to answer.
- Stay grounded in context and do not invent facts.
- When multiple context sections are relevant, combine them into one coherent answer.

If something is not in the context, say: "I don’t have enough context to answer that well yet."
- If the user asks about blog posts or topics I’ve written about, check the Blog Discovery Context section.
- If a relevant post exists, mention the post title and include its internal URL path from context.
- When referencing or recommending an existing blog post, include both:
  1) the post title
  2) the /blog/[slug] path
- Keep this natural and conversational, not robotic.
- Do not invent blog posts.
- Do not summarize full article content unless full article context is provided.
- If Current Page Context is provided and the user refers to "this post", "this article", "this page", "this section", "summarize this", or "explain this", treat Current Page Context as the primary source and do not default to profile/background details from Global Knowledge Context.
- If the question is unrelated to the current page, use the broader global knowledge context.
- Do not assume every question is page-related.

Tone:

- Friendly
- Confident
- Human
- Not overly formal

Formatting:

- Keep answers concise, but allow moderate detail when the question is broad
- Use 1-3 short paragraphs when it helps readability
- Avoid long monolithic blocks of text

Examples:

Bad:
"Alfredo Navas is a Senior Frontend Engineer..."

Good:
"I’m a Senior Frontend Engineer with over 15 years of experience..."

Bad:
"Alfredo has skills in..."

Good:
"I work mostly with WordPress, React, and JavaScript..."

Good (blog reference):
"Yeah, I wrote about that in \"Building My Own Image Optimizer with Electron, Node.js, and Sharp\".
/blog/building-my-own-image-optimizer-with-electron-node-js-and-sharp"
`;

/**
 * Sends a question and constrained context to the OpenAI Responses API.
 *
 * @param params.question End-user question after server-side normalization.
 * @param params.context Page-scoped knowledge context assembled by `loadContext`.
 * @returns Assistant plain-text response suitable for direct CLI rendering.
 * @throws When the upstream OpenAI request fails.
 */
export async function askAI({
	question,
	context,
}: {
	question: string;
	context: string;
}): Promise<string> {
	const apiKey = getApiKey();

	const response = await fetch(OPENAI_RESPONSES_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gpt-4.1-mini',
			max_output_tokens: 400,
			text: {
				format: { type: 'text' },
			},
			input: [
				{
					role: 'system',
					content: SYSTEM_PROMPT,
				},
				{
					role: 'user',
					content: `Context:\n${context}\n\nQuestion:\n${question}`,
				},
			],
		}),
	});

	const serverHeader = response.headers.get('server') ?? 'unknown';
	const payload = await readJson(response);

	if (!response.ok) {
		const errorMessage = getOpenAIErrorMessage(payload);
		throw new Error(
			`OpenAI fetch failed with status ${response.status} (server: ${serverHeader}). ${errorMessage}`,
		);
	}

	const text = getOutputText(payload);
	return text || 'I don’t have enough context to answer that well yet.';
}

type ResponsesPayload = {
	output_text?: unknown;
	output?: unknown;
	error?: {
		message?: string;
	};
};

/**
 * Attempts to parse an OpenAI response body as JSON.
 * Returns an empty object for non-JSON or empty bodies to keep error handling uniform.
 */
async function readJson(response: Response): Promise<ResponsesPayload> {
	try {
		return (await response.json()) as ResponsesPayload;
	} catch {
		return {};
	}
}

/**
 * Extracts the first meaningful text value from OpenAI Responses payload variants.
 */
function getOutputText(payload: ResponsesPayload): string {
	const topLevelText = getTrimmedString(payload.output_text);
	if (topLevelText) {
		return topLevelText;
	}

	if (!Array.isArray(payload.output)) {
		return '';
	}

	for (const outputItem of payload.output) {
		const directOutputText = getTrimmedString(
			isRecord(outputItem) ? outputItem.output_text : undefined,
		);
		if (directOutputText) {
			return directOutputText;
		}

		if (!isRecord(outputItem) || !Array.isArray(outputItem.content)) {
			continue;
		}

		for (const contentItem of outputItem.content) {
			if (typeof contentItem === 'string') {
				const directText = contentItem.trim();
				if (directText) {
					return directText;
				}
				continue;
			}

			if (!isRecord(contentItem)) {
				continue;
			}

			const nestedText = getTrimmedString(contentItem.text);
			if (nestedText) {
				return nestedText;
			}

			const nestedOutputText = getTrimmedString(contentItem.output_text);
			if (nestedOutputText) {
				return nestedOutputText;
			}
		}
	}

	return '';
}

/**
 * Normalizes string-like values to a trimmed string or an empty string.
 */
function getTrimmedString(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

/**
 * Narrowing helper for object-like values used during payload traversal.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

/**
 * Produces an actionable OpenAI error message from a parsed payload.
 */
function getOpenAIErrorMessage(payload: ResponsesPayload): string {
	return payload.error?.message || 'Unknown OpenAI API error.';
}
