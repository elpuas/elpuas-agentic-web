import { ALFREDO_ALIAS, ALFREDO_BUSINESS_URL, ALFREDO_CANONICAL_URL, ALFREDO_DESCRIPTION, ALFREDO_KNOWS_ABOUT, ALFREDO_LOCATION, ALFREDO_NAME, ALFREDO_ROLE, ALFREDO_SAME_AS } from './identity';

export function buildAlfredoPersonSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${ALFREDO_CANONICAL_URL}#alfredo-navas`,
		name: ALFREDO_NAME,
		alternateName: ALFREDO_ALIAS,
		url: ALFREDO_CANONICAL_URL,
		jobTitle: ALFREDO_ROLE,
		description: ALFREDO_DESCRIPTION,
		knowsAbout: ALFREDO_KNOWS_ABOUT,
		address: {
			'@type': 'PostalAddress',
			addressCountry: {
				'@type': 'Country',
				name: ALFREDO_LOCATION,
			},
		},
		founderOf: {
			'@type': 'ProfessionalService',
			'@id': `${ALFREDO_BUSINESS_URL}#organization`,
			name: 'ElPuas Digital Crafts',
			url: ALFREDO_BUSINESS_URL,
		},
		sameAs: ALFREDO_SAME_AS,
	};
}
