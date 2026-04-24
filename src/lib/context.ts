import { readFile } from 'node:fs/promises';
import { getBlogIndexContext } from './blog-context';

const KNOWLEDGE_FILES = [
	'../../content/knowledge/background.mdx',
	'../../content/knowledge/experience.mdx',
	'../../content/knowledge/projects.mdx',
	'../../content/knowledge/skills.mdx',
	'../../content/knowledge/certifications.mdx',
	'../../content/knowledge/personal.mdx',
] as const;

export async function loadContext(): Promise<string> {
	const sections = await Promise.all(
		KNOWLEDGE_FILES.map(async (relativePath) => {
			const fileUrl = new URL(relativePath, import.meta.url);
			return readFile(fileUrl, 'utf-8');
		}),
	);

	const knowledgeContext = sections.join('\n\n');
	const blogIndexContext = await getBlogIndexContext();

	return `${knowledgeContext}\n\n## Blog Posts\n${blogIndexContext}`;
}
