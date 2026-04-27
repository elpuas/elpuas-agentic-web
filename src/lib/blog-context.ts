import { getCollection } from 'astro:content';
import { getBlogPublishDate } from './blog-metadata';

/**
 * Builds a compact blog discovery index consumed by the AI context loader.
 *
 * Includes only non-draft posts, newest first, so the assistant can reference
 * real post titles and internal URLs without loading full article bodies.
 */
export async function getBlogIndexContext(): Promise<string> {
	const posts = (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => getBlogPublishDate(b.data).getTime() - getBlogPublishDate(a.data).getTime());

	if (posts.length === 0) {
		return '- No published blog posts.';
	}

	const summaries = posts.map((post, index) => {
		const tags = post.data.tags.join(', ');
		const date = getBlogPublishDate(post.data).toISOString().slice(0, 10);
		const url = `/blog/${post.data.slug}`;

		return [
			`${index + 1}. post`,
			`  title: ${post.data.title}`,
			`  slug: ${post.data.slug}`,
			`  url: ${url}`,
			`  description: ${post.data.description}`,
			`  category: ${post.data.category}`,
			`  tags: ${tags}`,
			`  date: ${date}`,
		].join('\n');
	});

	return summaries.join('\n');
}
