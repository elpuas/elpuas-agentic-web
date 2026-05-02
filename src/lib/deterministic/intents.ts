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
		answer: "I'm based in San José, Costa Rica.",
		aliases: ['where are you located', 'where are you based', 'where do you live', 'where are you from'],
		keywordClusters: [['where'], ['based', 'located', 'live', 'from']],
	},
	{
		id: 'EXPERIENCE_INTENT',
		answer:
			'I’ve been building web products professionally for over 15 years, focused on WordPress, frontend systems, and custom product development.',
		aliases: [
			'how many years of experience',
			'how long have you been doing this',
			'how long have you been developing',
		],
		keywordClusters: [['how', 'years', 'long'], ['experience', 'developing', 'building']],
	},
	{
		id: 'PUBLIC_WORK_INTENT',
		answer:
			'Public profiles: LinkedIn https://www.linkedin.com/in/elpuasdev/ | GitHub https://github.com/elpuas | WordPress.org https://profiles.wordpress.org/elpuas/ | ElPuas Digital Crafts https://elpuasdigitalcrafts.com',
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
			'Contact me through the site contact form or by email at elpuas@gmail.com.',
		aliases: ['how can i contact you', 'hire you', 'reach out', 'email you', 'work together'],
		keywordClusters: [['contact', 'reach', 'email', 'hire'], ['project', 'together', 'work']],
	},
	{
		id: 'TECH_STACK_INTENT',
		answer:
			'I work mainly with WordPress, React, JavaScript, PHP, and MySQL, focused on frontend architecture, performance, and scalable CMS implementations.',
		aliases: ['technical skills', 'tech stack', 'what technologies do you use', 'development stack'],
		keywordClusters: [['tech', 'technical', 'stack', 'technologies', 'skills']],
	},
	{
		id: 'ENTERPRISE_CLIENTS_INTENT',
		answer:
			'I’ve worked on enterprise projects for organizations like Cisco, Boise State, Talogy, Christianity Today, and Freeman, plus regional business platforms in Costa Rica.',
		aliases: ['enterprise clients', 'big clients', 'large clients', 'who have you worked with'],
		keywordClusters: [['client', 'clients', 'worked'], ['enterprise', 'large', 'big', 'organizations']],
	},
	{
		id: 'CERTIFICATIONS_INTENT',
		answer:
			'I hold certifications in AI and agent systems, leadership, and software development, including MCP and Claude API training plus LinkedIn technical tracks.',
		aliases: ['certifications', 'credentials', 'certified', 'proof of training'],
		keywordClusters: [['certification', 'certifications', 'credentials', 'certified', 'training']],
	},
	{
		id: 'COMMUNITY_INTENT',
		answer:
			"I’m active in the WordPress community as a co-founder of WordPress Costa Rica, a WordCamp organizer, and a speaker at local and international events.",
		aliases: ['wordpress community', 'wordcamp', 'community posts', 'speaker'],
		keywordClusters: [['wordpress', 'community', 'wordcamp'], ['speaker', 'organizer', 'talks']],
	},
	{
		id: 'SITE_BUILD_INTENT',
		answer:
			'I built this site with Astro, a CLI-style interface, a structured knowledge base, and AI for in-domain free-form questions.',
		aliases: ['how did you build this site', 'what powers this site', 'did you build this with ai'],
		keywordClusters: [['build', 'built', 'powers'], ['site', 'website'], ['ai', 'astro', 'cli']],
	},
];
