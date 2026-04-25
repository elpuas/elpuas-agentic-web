import type { APIRoute } from 'astro';
import { askAI } from '../../lib/ai';
import { loadContext } from '../../lib/context';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		console.log('[api/ask] request received');
		const runtimeApiKey = process.env.ELPUAS_OPENAI_API_KEY;
		const legacyOpenAIApiKey = process.env.OPENAI_API_KEY;
		console.log('[api/ask] env check', {
			hasApiKeyFromProcessEnv: Boolean(runtimeApiKey),
			hasLegacyOpenAIApiKeyEnv: Boolean(legacyOpenAIApiKey),
			hasOpenAIBaseUrlEnv: Boolean(process.env.OPENAI_BASE_URL),
			hasOpenAIApiBaseEnv: Boolean(process.env.OPENAI_API_BASE),
		});

		let payload: unknown;
		try {
			payload = await request.json();
		} catch {
			return jsonResponse(400, { error: 'Invalid JSON body' });
		}

		const { question, pageContext } = (payload ?? {}) as {
			question?: unknown;
			pageContext?: unknown;
		};

		const normalizedQuestion = typeof question === 'string' ? question.trim() : '';
		const normalizedPageContext = typeof pageContext === 'string' ? pageContext.trim() : '';

		console.log('[api/ask] payload check', {
			hasQuestion: normalizedQuestion.length > 0,
			hasPageContext: normalizedPageContext.length > 0,
		});

		if (normalizedQuestion.length === 0) {
			return jsonResponse(400, { error: 'Question is required' });
		}

		let context: string;
		try {
			context = await loadContext({
				pageContext: normalizedPageContext || undefined,
			});
		} catch (error) {
			const message = getErrorMessage(error);
			console.error('[api/ask] context loading error', { message, error });
			return jsonResponse(500, {
				error: `Context loading failed: ${message}`,
			});
		}

		let text: string;
		try {
			text = await askAI({
				question: normalizedQuestion,
				context,
			});
		} catch (error) {
			const message = getErrorMessage(error);
			console.error('[api/ask] OpenAI error', { message, error });
			return jsonResponse(500, {
				error: `OpenAI request failed: ${message}`,
			});
		}

		return jsonResponse(200, { text });
	} catch (error) {
		const message = getErrorMessage(error);
		console.error('[api/ask] unhandled runtime error', { message, error });
		return jsonResponse(500, {
			error: `Unhandled /api/ask error: ${message}`,
		});
	}
};

function jsonResponse(status: number, body: { error?: string; text?: string }): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error';
}
