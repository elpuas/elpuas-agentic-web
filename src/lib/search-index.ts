import { getCollection } from 'astro:content';

export type SearchContentType = 'blog' | 'project' | 'page';

export type SearchIndexEntry = {
	title: string;
	url: string;
	type: SearchContentType;
	description?: string;
	tags?: string[];
};

const PUBLIC_PAGES: SearchIndexEntry[] = [
	{
		title: 'Home',
		url: '/',
		type: 'page',
		description: 'Portfolio homepage and quick introduction.',
		tags: ['home', 'portfolio', 'intro'],
	},
	{
		title: 'About',
		url: '/about/',
		type: 'page',
		description: 'Background, experience, and technologies used by Alfredo Navas.',
		tags: ['about', 'experience', 'background'],
	},
	{
		title: 'Blog',
		url: '/blog/',
		type: 'page',
		description: 'Archive of public engineering and development articles.',
		tags: ['blog', 'articles', 'archive'],
	},
	{
		title: 'Contact',
		url: '/contact/',
		type: 'page',
		description: 'Contact form for project and consulting inquiries.',
		tags: ['contact', 'inquiries', 'consulting'],
	},
];

export const buildSearchIndex = async (): Promise<SearchIndexEntry[]> => {
	const blogEntries = await getCollection('blog');

	const blogResults: SearchIndexEntry[] = blogEntries
		.filter((entry) => !entry.data.draft)
		.map((entry) => ({
			title: entry.data.title,
			url: `/blog/${entry.data.slug}/`,
			type: 'blog',
			description: entry.data.excerpt ?? entry.data.description,
			tags: entry.data.tags,
		}));

	return [...PUBLIC_PAGES, ...blogResults];
};
