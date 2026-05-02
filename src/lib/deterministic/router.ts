import {
	DETERMINISTIC_INTENTS,
	DOMAIN_KEYWORDS,
	OUT_OF_DOMAIN_PATTERNS,
	OUT_OF_DOMAIN_REFUSAL,
	type DeterministicIntent,
} from './intents';

export function getDeterministicAnswer(question: string): string | null {
	const normalized = normalizeQuestion(question);
	if (!normalized) {
		return null;
	}

	for (const intent of DETERMINISTIC_INTENTS) {
		if (matchesAlias(normalized, intent.aliases)) {
			return intent.answer;
		}
	}

	let best: { answer: string; score: number } | null = null;
	for (const intent of DETERMINISTIC_INTENTS) {
		const score = scoreKeywordClusters(normalized, intent);
		if (score > 0 && (!best || score > best.score)) {
			best = { answer: intent.answer, score };
		}
	}

	if (best && best.score >= 2) {
		return best.answer;
	}

	if (isClearlyOutOfDomain(normalized)) {
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

function matchesAlias(normalizedQuestion: string, aliases: string[]): boolean {
	return aliases.some((alias) => normalizedQuestion.includes(normalizeQuestion(alias)));
}

function scoreKeywordClusters(normalizedQuestion: string, intent: DeterministicIntent): number {
	if (!intent.keywordClusters || intent.keywordClusters.length === 0) {
		return 0;
	}

	let clusterHits = 0;
	for (const cluster of intent.keywordClusters) {
		if (cluster.some((word) => hasWord(normalizedQuestion, normalizeQuestion(word)))) {
			clusterHits += 1;
		}
	}

	return clusterHits;
}

function hasWord(haystack: string, word: string): boolean {
	return new RegExp(`\\b${escapeRegex(word)}\\b`).test(haystack);
}

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isClearlyOutOfDomain(normalizedQuestion: string): boolean {
	const hasDomainSignal = DOMAIN_KEYWORDS.some((keyword) => hasWord(normalizedQuestion, keyword));
	if (hasDomainSignal) {
		return false;
	}

	return OUT_OF_DOMAIN_PATTERNS.some((pattern) =>
		normalizedQuestion.includes(normalizeQuestion(pattern)),
	);
}
