import type { APIRoute } from 'astro';
import { askAI } from '../../lib/ai';
import { loadContext } from '../../lib/context';

export const prerender = false;
const MAX_QUESTION_LENGTH = 450;
const COOLDOWN_MS = 4000;
const requestCooldownByIp = new Map<string, number>();

export const POST: APIRoute = async ({ request }) => {
	try {
		const clientIp = getClientIp(request);
		const cooldown = registerAndGetCooldown(clientIp);
		if (cooldown.active) {
			return jsonResponse(429, {
				error: 'Please wait a few seconds before sending another question.',
			});
		}

		let payload: unknown;
		try {
			payload = await request.json();
		} catch {
			return jsonResponse(400, { error: 'Please send a valid JSON request body.' });
		}

		const { question, pageContext } = (payload ?? {}) as {
			question?: unknown;
			pageContext?: unknown;
		};

		const normalizedQuestion = typeof question === 'string' ? question.trim() : '';
		const normalizedPageContext = typeof pageContext === 'string' ? pageContext.trim() : '';

		if (normalizedQuestion.length === 0) {
			return jsonResponse(400, { error: 'Please enter a question before sending.' });
		}

		if (normalizedQuestion.length > MAX_QUESTION_LENGTH) {
			return jsonResponse(400, {
				error: `Please keep your question under ${MAX_QUESTION_LENGTH} characters.`,
			});
		}

		let context: string;
		try {
			context = await loadContext({
				pageContext: normalizedPageContext || undefined,
			});
		} catch (error) {
			const message = getErrorMessage(error);
			console.error('[api/ask] context loading failure:', message);
			return jsonResponse(500, {
				error: 'Something went wrong while preparing the answer. Please try again.',
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
			console.error('[api/ask] OpenAI request failure:', message);
			return jsonResponse(500, {
				error: 'Something went wrong while generating a reply. Please try again in a moment.',
			});
		}

		return jsonResponse(200, { text });
	} catch (error) {
		const message = getErrorMessage(error);
		console.error('[api/ask] unexpected handler failure:', message);
		return jsonResponse(500, {
			error: 'Something went wrong on the server. Please try again in a moment.',
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

function registerAndGetCooldown(ip: string): { active: boolean; retryAfterMs: number } {
	const now = Date.now();
	const lastRequestAt = requestCooldownByIp.get(ip);
	if (typeof lastRequestAt === 'number') {
		const elapsed = now - lastRequestAt;
		if (elapsed < COOLDOWN_MS) {
			return {
				active: true,
				retryAfterMs: COOLDOWN_MS - elapsed,
			};
		}
	}

	requestCooldownByIp.set(ip, now);
	return { active: false, retryAfterMs: 0 };
}

function getClientIp(request: Request): string {
	const forwardedFor = request.headers.get('x-forwarded-for');
	if (forwardedFor) {
		const firstIp = forwardedFor.split(',')[0]?.trim();
		if (firstIp) {
			return firstIp;
		}
	}

	const realIp = request.headers.get('x-real-ip')?.trim();
	if (realIp) {
		return realIp;
	}

	return 'unknown-client';
}
