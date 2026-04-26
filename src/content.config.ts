import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/**
 * Blog collection schema used by Astro content APIs and static route generation.
 */
const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		author: z.string(),
		category: z.string(),
		tags: z.array(z.string()),
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		canonicalUrl: z.string().url().optional(),
		draft: z.boolean().default(false),
	}),
});

/**
 * Central Astro content collection registry.
 */
export const collections = {
	blog,
};
