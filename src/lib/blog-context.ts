import { getCollection } from 'astro:content';

export async function getBlogIndexContext(): Promise<string> {
	const posts = (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	if (posts.length === 0) {
		return '- No published blog posts.';
	}

	const summaries = posts.map((post, index) => {
		const tags = post.data.tags.join(', ');
		const date = post.data.date.toISOString().slice(0, 10);
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
