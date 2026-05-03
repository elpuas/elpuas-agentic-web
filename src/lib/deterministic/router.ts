import {
	DETERMINISTIC_INTENTS,
	DOMAIN_KEYWORDS,
	OUT_OF_DOMAIN_PATTERNS,
	OUT_OF_DOMAIN_REFUSAL,
	type DeterministicIntent,
} from './intents';

const TOKEN_SYNONYMS: Record<string, string> = {
	r: 'are',
	u: 'you',
	ur: 'your',
};

const NON_DISTINCT_TOKENS = new Set(['where', 'what', 'how', 'who', 'are', 'is', 'do', 'does', 'did', 'you', 'your', 'i', 'me', 'my']);
const BROAD_INTENT_TOKENS = new Set(['work', 'project', 'projects', 'portfolio', 'profile']);

export function getDeterministicAnswer(question: string): string | null {
	const normalized = normalizeQuestion(question);
	if (!normalized) {
		return null;
	}
	const questionTokens = tokenize(normalized);
	const hasDomainSignal = hasDomainKeywords(questionTokens);
	const hasOutOfDomainSignal = hasOutOfDomainMarkers(normalized);

	// If a prompt mixes in-domain and out-of-domain asks, refuse early.
	if (hasOutOfDomainSignal && hasDomainSignal) {
		return OUT_OF_DOMAIN_REFUSAL;
	}

	for (const intent of DETERMINISTIC_INTENTS) {
		if (matchesAlias(normalized, questionTokens, intent.aliases)) {
			return intent.answer;
		}
	}

	let best: { answer: string; score: number } | null = null;
	for (const intent of DETERMINISTIC_INTENTS) {
		const score = scoreKeywordClusters(questionTokens, intent);
		if (score > 0 && (!best || score > best.score)) {
			best = { answer: intent.answer, score };
		}
	}

	if (best && best.score >= 2) {
		return best.answer;
	}

	if (isClearlyOutOfDomain(normalized, questionTokens, hasDomainSignal, hasOutOfDomainSignal)) {
		return OUT_OF_DOMAIN_REFUSAL;
	}

	return null;
}

export function normalizeQuestion(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/['’`"]/g, '')
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function tokenize(input: string): string[] {
	if (!input) {
		return [];
	}

	return input
		.split(' ')
		.filter(Boolean)
		.map((token) => TOKEN_SYNONYMS[token] ?? token);
}

function matchesAlias(normalizedQuestion: string, questionTokens: string[], aliases: string[]): boolean {
	return aliases.some((alias) => {
		const normalizedAlias = normalizeQuestion(alias);
		if (normalizedQuestion.includes(normalizedAlias)) {
			return true;
		}

		const aliasTokens = tokenize(normalizedAlias);
		if (aliasTokens.length === 0) {
			return false;
		}

		const matchedAliasTokens = aliasTokens.filter((aliasToken) =>
			questionTokens.some((questionToken) => isNearTokenMatch(questionToken, aliasToken)),
		);
		const matchedTokens = matchedAliasTokens.length;

		const ratio = matchedTokens / aliasTokens.length;
		if (ratio < 0.75) {
			return false;
		}

		// Avoid matching mostly on filler or broad tokens (e.g. "show me your work")
		// unless we have multiple informative matches.
		const informativeMatches = matchedAliasTokens.filter(
			(token) =>
				token.length >= 4 &&
				!NON_DISTINCT_TOKENS.has(token) &&
				!BROAD_INTENT_TOKENS.has(token),
		);

		if (informativeMatches.length >= 1) {
			return true;
		}

		// For one-token aliases like "github", allow broad fallback only when alias is tiny.
		return aliasTokens.length <= 2 &&
			matchedAliasTokens.some(
				(token) => token.length >= 4 && !NON_DISTINCT_TOKENS.has(token),
			);
	});
}

function scoreKeywordClusters(questionTokens: string[], intent: DeterministicIntent): number {
	if (!intent.keywordClusters || intent.keywordClusters.length === 0) {
		return 0;
	}

	let clusterHits = 0;
	for (const cluster of intent.keywordClusters) {
		if (
			cluster.some((word) => {
				const normalizedWord = normalizeQuestion(word);
				return questionTokens.some((questionToken) =>
					isNearTokenMatch(questionToken, normalizedWord),
				);
			})
		) {
			clusterHits += 1;
		}
	}

	return clusterHits;
}

function isNearTokenMatch(token: string, target: string): boolean {
	if (token === target) {
		return true;
	}

	if (target.length >= 5 && token.length >= 4 && (target.startsWith(token) || token.startsWith(target))) {
		return true;
	}

	if (Math.abs(token.length - target.length) > 1) {
		return false;
	}

	return levenshteinDistance(token, target) <= 1;
}

function levenshteinDistance(a: string, b: string): number {
	const rows = a.length + 1;
	const cols = b.length + 1;
	const matrix = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

	for (let i = 0; i < rows; i += 1) {
		matrix[i][0] = i;
	}
	for (let j = 0; j < cols; j += 1) {
		matrix[0][j] = j;
	}

	for (let i = 1; i < rows; i += 1) {
		for (let j = 1; j < cols; j += 1) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1,
				matrix[i][j - 1] + 1,
				matrix[i - 1][j - 1] + cost,
			);
		}
	}

	return matrix[a.length][b.length];
}

function hasWord(haystack: string, word: string): boolean {
	return new RegExp(`\\b${escapeRegex(word)}\\b`).test(haystack);
}

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasDomainKeywords(questionTokens: string[]): boolean {
	return DOMAIN_KEYWORDS.some((keyword) =>
		questionTokens.some((token) => isNearTokenMatch(token, keyword)),
	);
}

function hasOutOfDomainMarkers(normalizedQuestion: string): boolean {
	if (/\bh2o\b/.test(normalizedQuestion)) {
		return true;
	}

	if (/\bsolve\b.*\b\d+\b.*\b\d+\b/.test(normalizedQuestion)) {
		return true;
	}

	if (/\b\d+\s*[\+\-*/]\s*\d+\b/.test(normalizedQuestion)) {
		return true;
	}

	return OUT_OF_DOMAIN_PATTERNS.some((pattern) =>
		normalizedQuestion.includes(normalizeQuestion(pattern)),
	);
}

function isClearlyOutOfDomain(
	normalizedQuestion: string,
	questionTokens: string[],
	hasDomainSignal = hasDomainKeywords(questionTokens),
	hasOutOfDomainSignal = hasOutOfDomainMarkers(normalizedQuestion),
): boolean {
	if (hasDomainSignal) {
		return false;
	}

	if (/^(what|who|where|when|why|how)\s+is\s+[a-z0-9+\-]+$/.test(normalizedQuestion)) {
		return true;
	}

	if (/^(what|who|where|when|why|how)\s+was\s+[a-z0-9+\-]+$/.test(normalizedQuestion)) {
		return true;
	}

	return hasOutOfDomainSignal;
}
