import { getBlogIndexContext } from './blog-context';

const KNOWLEDGE_GLOB = import.meta.glob('../../content/knowledge/*.mdx', {
	query: '?raw',
	import: 'default',
});

export async function loadContext({
	pageContext,
}: {
	pageContext?: string;
} = {}): Promise<string> {
	console.log('[context] loading global knowledge context');

	const knowledgeEntries = Object.entries(KNOWLEDGE_GLOB).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	const sections = await Promise.all(
		knowledgeEntries.map(async ([path, loader]) => {
			try {
				const content = await loader();
				if (typeof content !== 'string') {
					throw new Error(`Unexpected content type for ${path}`);
				}
				return content;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : 'Unknown knowledge file load error';
				throw new Error(`Failed to load knowledge file "${path}": ${message}`);
			}
		}),
	);

	const knowledgeContext = sections.join('\n\n');
	console.log('[context] global knowledge context loaded', {
		fileCount: sections.length,
		charCount: knowledgeContext.length,
	});

	console.log('[context] loading blog discovery context');
	const blogIndexContext = await getBlogIndexContext();
	console.log('[context] blog discovery context loaded', {
		charCount: blogIndexContext.length,
	});

	const normalizedPageContext = pageContext?.trim();
	const hasPageContext = Boolean(normalizedPageContext);

	const contextParts = [
		`## Global Knowledge Context\n${knowledgeContext}`,
		`## Blog Discovery Context\n${blogIndexContext}`,
	];

	if (normalizedPageContext) {
		contextParts.push(`## Current Page Context\n${normalizedPageContext}`);
	}

	console.log('[context] page context merge status', {
		hasPageContext,
		pageContextChars: normalizedPageContext?.length ?? 0,
	});

	return contextParts.join('\n\n');
}
