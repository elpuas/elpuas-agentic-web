import type { CollectionEntry } from 'astro:content';
import blogPlaceholder from '../assets/blog-placeholder.jpg';

type BlogData = CollectionEntry<'blog'>['data'];
const LEGACY_BLOG_PLACEHOLDERS = new Set(['/favicon.svg', 'favicon.svg', '/favicon.ico', 'favicon.ico']);

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

export function getBlogFeaturedImage(data: BlogData): string {
	const candidate = data.featuredImage ?? data.heroImage;

	if (!candidate || LEGACY_BLOG_PLACEHOLDERS.has(candidate.trim())) {
		return blogPlaceholder.src;
	}

	return candidate;
}
