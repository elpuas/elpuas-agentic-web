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
	'science fact',
	'who won',
	'prime minister of',
	'president of',
	'chemical formula',
	'periodic table',
	'define',
	'translate',
];

export const DETERMINISTIC_INTENTS: DeterministicIntent[] = [
	{
		id: 'LOCATION_INTENT',
		answer: "I’m based in San José, Costa Rica.",
		aliases: ['where are you located', 'where are you based', 'where do you live'],
		keywordClusters: [['where'], ['based', 'located', 'live']],
	},
	{
		id: 'PUBLIC_WORK_INTENT',
		answer:
			'You can check some of my public work and profiles here:\n\nGitHub: https://github.com/elpuas\nLinkedIn: https://www.linkedin.com/in/elpuasdev/\nWordPress.org: https://profiles.wordpress.org/elpuas/\nElPuas Digital Crafts: https://elpuasdigitalcrafts.com',
		aliases: [
			'where can i see your work',
			'show me your work',
			'show me your projects',
			'github',
			'linkedin',
			'portfolio',
			'project examples',
			'portfolio examples',
			'public profile',
			'work examples',
		],
		keywordClusters: [['work', 'portfolio', 'projects'], ['github', 'linkedin', 'wordpress', 'profile']],
	},
	{
		id: 'CONTACT_INTENT',
		answer:
			'The easiest way is the contact form on this site, or you can email me directly at elpuas@gmail.com.',
		aliases: [
			'how can i contact you',
			'hire you',
			'reach out',
			'email you',
			'work with you',
			'get in touch',
		],
		keywordClusters: [['contact', 'email', 'reach', 'hire'], ['touch', 'message', 'call']],
	},
	{
		id: 'SITE_BUILD_INTENT',
		answer:
			'I built this as a conversational portfolio with Astro and MDX, backed by an internal knowledge base and an OpenAI workflow so people can ask questions instead of just browsing pages.',
		aliases: ['how did you build this site', 'what powers this site', 'did you build this with ai'],
		keywordClusters: [['build', 'built', 'powers'], ['site', 'website'], ['ai', 'astro', 'cli']],
	},
];
