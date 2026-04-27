import type { CollectionEntry } from 'astro:content';

type BlogData = CollectionEntry<'blog'>['data'];

export function getBlogPublishDate(data: BlogData): Date {
	const publishDate = data.publishDate ?? data.date;
	if (!publishDate) {
		throw new Error(`Blog post "${data.slug}" is missing publishDate/date frontmatter.`);
	}

	return publishDate;
}

export function getBlogExcerpt(data: BlogData): string {
	return data.excerpt ?? data.description;
}

export function getBlogFeaturedImage(data: BlogData): string | undefined {
	return data.featuredImage ?? data.heroImage;
}
