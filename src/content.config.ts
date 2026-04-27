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
		excerpt: z.string().optional(),
		publishDate: z.coerce.date().optional(),
		date: z.coerce.date().optional(),
		author: z.string().default('Alfredo Navas'),
		category: z.string().default('General'),
		tags: z.array(z.string()).default([]),
		featuredImage: z.string().optional(),
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		canonicalUrl: z.string().url().optional(),
		draft: z.boolean().default(false),
	}).superRefine((value, ctx) => {
		if (!value.publishDate && !value.date) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Blog posts must include either publishDate or date in frontmatter.',
				path: ['publishDate'],
			});
		}
	}),
});

/**
 * Central Astro content collection registry.
 */
export const collections = {
	blog,
};
