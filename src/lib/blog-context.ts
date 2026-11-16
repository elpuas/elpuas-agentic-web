import { getCollection } from 'astro:content';
import { getBlogPublishDate } from './blog-metadata';

export type BlogIndexEntry = {
	title: string;
	slug: string;
	url: string;
	description: string;
	category: string;
	tags: string[];
	date: string;
};

/**
 * Loads one published article from a local blog path, never from a remote URL.
 */
export async function getPublishedBlogContext(path: string): Promise<string | undefined> {
	const post = (await getCollection('blog')).find(
		(entry) => !entry.data.draft && `/blog/${entry.data.slug}` === path.replace(/\/$/, ''),
	);
	if (!post) {
		return undefined;
	}

	return [
		'Current Page Type: Blog Post',
		`Current Blog Title: ${post.data.title}`,
		`Current Blog URL: /blog/${post.data.slug}`,
		`Current Blog Description: ${post.data.description}`,
		'Current Blog Content:',
		post.body,
	].join('\n');
}

/**
 * Returns published blog metadata as structured records, newest first.
 */
export async function getBlogIndexEntries(): Promise<BlogIndexEntry[]> {
	const posts = (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => getBlogPublishDate(b.data).getTime() - getBlogPublishDate(a.data).getTime());

	return posts.map((post) => ({
		title: post.data.title,
		slug: post.data.slug,
		url: `/blog/${post.data.slug}`,
		description: post.data.description,
		category: post.data.category,
		tags: post.data.tags,
		date: getBlogPublishDate(post.data).toISOString().slice(0, 10),
	}));
}

/**
 * Formats structured blog metadata for the model's discovery context.
 */
export function formatBlogIndexContext(posts: BlogIndexEntry[]): string {
	if (posts.length === 0) {
		return '- No published blog posts.';
	}

	return posts
		.map((post, index) =>
			[
				`${index + 1}. post`,
				`  title: ${post.title}`,
				`  slug: ${post.slug}`,
				`  url: ${post.url}`,
				`  description: ${post.description}`,
				`  category: ${post.category}`,
				`  tags: ${post.tags.join(', ')}`,
				`  date: ${post.date}`,
			].join('\n'),
		)
		.join('\n');
}

/**
 * Builds a compact blog discovery index consumed by the AI context loader.
 *
 * Includes only non-draft posts, newest first, so the assistant can reference
 * real post titles and internal URLs without loading full article bodies.
 */
export async function getBlogIndexContext(): Promise<string> {
	return formatBlogIndexContext(await getBlogIndexEntries());
}
