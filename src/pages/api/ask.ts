import type { APIRoute } from 'astro';
import { askAI } from '../../lib/ai';
import { loadContext } from '../../lib/context';
import { getDeterministicAnswer } from '../../lib/deterministic/router';

export const prerender = false;
const MAX_QUESTION_LENGTH = 450;
const COOLDOWN_MS = 4000;
const MAX_HISTORY_MESSAGES = 6;
const MAX_HISTORY_MESSAGE_LENGTH = 600;
const requestCooldownByIp = new Map<string, number>();

type ConversationRole = 'user' | 'assistant';

type ConversationMessage = {
	role: ConversationRole;
	content: string;
};

/**
 * Handles CLI chat requests from the client-side interface.
 *
 * Workflow:
 * - applies a lightweight in-memory per-IP cooldown
 * - validates payload shape and question length
 * - assembles page-aware context
 * - delegates generation to the OpenAI helper
 */
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

		const { question, pageContext, conversationHistory } = (payload ?? {}) as {
			question?: unknown;
			pageContext?: unknown;
			conversationHistory?: unknown;
		};

		const normalizedQuestion = typeof question === 'string' ? question.trim() : '';
		const normalizedPageContext = typeof pageContext === 'string' ? pageContext.trim() : '';
		const normalizedConversationHistory = normalizeConversationHistory(conversationHistory);

		if (normalizedQuestion.length === 0) {
			return jsonResponse(400, { error: 'Please enter a question before sending.' });
		}

		if (normalizedQuestion.length > MAX_QUESTION_LENGTH) {
			return jsonResponse(400, {
				error: `Please keep your question under ${MAX_QUESTION_LENGTH} characters.`,
			});
		}

		const deterministicAnswer = getDeterministicAnswer(normalizedQuestion);
		if (deterministicAnswer) {
			return jsonResponse(200, { text: deterministicAnswer });
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
				conversationHistory: normalizedConversationHistory,
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

/**
 * Creates a JSON response with a stable content-type header.
 */
function jsonResponse(status: number, body: { error?: string; text?: string }): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

/**
 * Normalizes optional client-sent chat history into a bounded list of safe text messages.
 */
function normalizeConversationHistory(value: unknown): ConversationMessage[] {
	if (!Array.isArray(value)) {
		return [];
	}

	const normalized: ConversationMessage[] = [];

	for (const item of value) {
		if (!isRecord(item)) {
			continue;
		}

		const role = item.role;
		if (role !== 'user' && role !== 'assistant') {
			continue;
		}

		const content = typeof item.content === 'string' ? item.content.trim() : '';
		if (!content) {
			continue;
		}

		normalized.push({
			role,
			content: content.slice(0, MAX_HISTORY_MESSAGE_LENGTH),
		});
	}

	if (normalized.length <= MAX_HISTORY_MESSAGES) {
		return normalized;
	}

	return normalized.slice(-MAX_HISTORY_MESSAGES);
}

/**
 * Converts unknown throwables into log-safe messages.
 */
function getErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : 'Unknown error';
}

/**
 * Narrowing helper for object-like request payload values.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

/**
 * Registers the current request timestamp and reports whether the caller
 * must wait before sending another request.
 */
function registerAndGetCooldown(ip: string): { active: boolean; retryAfterMs: number } {
	if (ip === 'unknown-client') {
		return { active: false, retryAfterMs: 0 };
	}

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

/**
 * Extracts the best-effort client IP from common reverse-proxy headers.
 */
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
