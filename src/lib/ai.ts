import packageJson from '../../package.json';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const OPENAI_SDK_VERSION =
	typeof packageJson.dependencies?.openai === 'string'
		? packageJson.dependencies.openai
		: 'unknown';

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
- Be natural, conversational, and slightly informal
- Keep answers clear and direct
- Prefer shorter answers by default
- Avoid sounding like a resume or professional bio
- Group related skills naturally instead of listing everything
- Answer like you're talking to someone visiting your site
- Sound like a real person, not a biography
- Avoid repeating the same sentence structure across responses
- Vary phrasing naturally, even for similar questions
- Keep replies conversational and human

Context:

Use ONLY the provided context to answer.

If something is not in the context, say you don’t know.
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

- Keep answers short unless the user asks for more detail
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

export async function askAI({
	question,
	context,
}: {
	question: string;
	context: string;
}): Promise<string> {
	const apiKey = getApiKey();
	const hasLegacyOpenAIApiKeyEnv = Boolean(process.env.OPENAI_API_KEY);

	console.log('[ai] openai transport audit', {
		hasOpenAIBaseUrlEnv: Boolean(process.env.OPENAI_BASE_URL),
		hasOpenAIApiBaseEnv: Boolean(process.env.OPENAI_API_BASE),
		hasLegacyOpenAIApiKeyEnv,
		customBaseUrlPassed: false,
		openaiSdkVersion: OPENAI_SDK_VERSION,
		transport: 'raw-fetch',
		endpoint: OPENAI_RESPONSES_URL,
	});

	const response = await fetch(OPENAI_RESPONSES_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gpt-4.1-mini',
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
	console.log('[ai] raw fetch main request result', {
		status: response.status,
		server: serverHeader,
		ok: response.ok,
		hasLegacyOpenAIApiKeyEnv,
	});

	const payload = await readJson(response);

	if (!response.ok) {
		const errorMessage = getOpenAIErrorMessage(payload);
		throw new Error(
			`OpenAI fetch failed with status ${response.status} (server: ${serverHeader}). ${errorMessage}`,
		);
	}

	const text = getOutputText(payload);
	return text || "I don't know.";
}

type ResponsesPayload = {
	output_text?: string;
	error?: {
		message?: string;
	};
};

async function readJson(response: Response): Promise<ResponsesPayload> {
	try {
		return (await response.json()) as ResponsesPayload;
	} catch {
		return {};
	}
}

function getOutputText(payload: ResponsesPayload): string {
	return typeof payload.output_text === 'string' ? payload.output_text.trim() : '';
}

function getOpenAIErrorMessage(payload: ResponsesPayload): string {
	return payload.error?.message || 'Unknown OpenAI API error.';
}
