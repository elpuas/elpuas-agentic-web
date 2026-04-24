import { getCollection } from 'astro:content';

export async function loadBlogContext(): Promise<string> {
	const posts = (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	if (posts.length === 0) {
		return 'Blog posts metadata:\n- No published blog posts.';
	}

	const summaries = posts.map((post) => {
		const tags = post.data.tags.join(', ');
		const date = post.data.date.toISOString().slice(0, 10);

		return [
			`- title: ${post.data.title}`,
			`  slug: ${post.data.slug}`,
			`  description: ${post.data.description}`,
			`  category: ${post.data.category}`,
			`  tags: ${tags}`,
			`  date: ${date}`,
		].join('\n');
	});

	return `Blog posts metadata:\n${summaries.join('\n')}`;
}
