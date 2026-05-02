export type DeterministicIntent = {
	id: string;
	answer: string;
	aliases: string[];
	keywordClusters?: string[][];
};

export const OUT_OF_DOMAIN_REFUSAL =
	'That’s a bit outside what this site is really built for. I’m mostly here to talk about my work, projects, writing, and experience.';

export const DOMAIN_KEYWORDS = [
	'alfredo',
	'portfolio',
	'project',
	'projects',
	'work',
	'experience',
	'wordpress',
	'developer',
	'frontend',
	'website',
	'site',
	'tech',
	'stack',
	'community',
	'wordcamp',
	'certification',
	'certifications',
	'client',
	'clients',
	'hire',
	'contact',
	'email',
	'github',
	'linkedin',
];

export const OUT_OF_DOMAIN_PATTERNS = [
	'capital of',
	'world war',
	'solve this math',
	'solve this equation',
	'what is',
	'who is',
	'who won',
	'when did',
	'define',
	'translate',
];

export const DETERMINISTIC_INTENTS: DeterministicIntent[] = [
	{
		id: 'LOCATION_INTENT',
		answer: "I’m based in San José, Costa Rica.",
		aliases: ['where are you located', 'where are you based', 'where do you live', 'where are you from'],
		keywordClusters: [['where'], ['based', 'located', 'live', 'from']],
	},
	{
		id: 'PUBLIC_WORK_INTENT',
		answer:
			'You can check my public work here: LinkedIn https://www.linkedin.com/in/elpuasdev/, GitHub https://github.com/elpuas, WordPress.org https://profiles.wordpress.org/elpuas/, and ElPuas Digital Crafts https://elpuasdigitalcrafts.com.',
		aliases: [
			'where can i see your work',
			'show me your work',
			'github',
			'linkedin',
			'portfolio examples',
			'public profile',
		],
		keywordClusters: [['work', 'portfolio', 'profile'], ['github', 'linkedin', 'public']],
	},
	{
		id: 'CONTACT_INTENT',
		answer:
			'The easiest way is the contact form on this site, or you can email me directly at elpuas@gmail.com.',
		aliases: ['how can i contact you', 'hire you', 'reach out', 'email you', 'work together'],
		keywordClusters: [['contact', 'reach', 'email', 'hire'], ['project', 'together', 'work']],
	},
	{
		id: 'SITE_BUILD_INTENT',
		answer:
			'I built this site with Astro and a CLI-style interface, with a structured knowledge base plus AI for in-domain questions.',
		aliases: ['how did you build this site', 'what powers this site', 'did you build this with ai'],
		keywordClusters: [['build', 'built', 'powers'], ['site', 'website'], ['ai', 'astro', 'cli']],
	},
];
