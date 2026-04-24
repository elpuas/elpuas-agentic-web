import type { APIRoute } from 'astro';
import { askAI } from '../../lib/ai';
import { loadContext } from '../../lib/context';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	let payload: unknown;

	try {
		payload = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const { question, pageContext } = (payload ?? {}) as {
		question?: unknown;
		page?: unknown;
		pageContext?: unknown;
	};

	if (typeof question !== 'string' || question.trim().length === 0) {
		return new Response(JSON.stringify({ error: 'Question is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const context = await loadContext({
		pageContext: typeof pageContext === 'string' ? pageContext : undefined,
	});

	if (import.meta.env.DEV) {
		console.log('[api/ask] payload debug', {
			question: question.trim(),
			hasPageContext: typeof pageContext === 'string' && pageContext.trim().length > 0,
			pageContextPreview:
				typeof pageContext === 'string' ? pageContext.trim().slice(0, 240) : '',
		});
	}

	const text = await askAI({
		question: question.trim(),
		context,
	});

	return new Response(JSON.stringify({ text }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
