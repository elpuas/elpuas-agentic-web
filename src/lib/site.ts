export const SITE_URL = 'https://elpuas.com';
export const SITE_NAME = 'Alfredo Navas';
export const DEFAULT_TITLE = 'Alfredo Navas';
export const DEFAULT_DESCRIPTION =
	'Alfredo Navas personal site with engineering notes, WordPress insights, and practical AI workflows.';
export const DEFAULT_OG_IMAGE = '/favicon.svg';

export function toAbsoluteUrl(pathOrUrl: string, siteUrl: URL): string {
	if (/^https?:\/\//i.test(pathOrUrl)) {
		return pathOrUrl;
	}

	return new URL(pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`, siteUrl).toString();
}

export function resolveCanonicalUrl({
	canonicalUrl,
	pathname,
	siteUrl,
}: {
	canonicalUrl?: string;
	pathname: string;
	siteUrl: URL;
}): string {
	if (canonicalUrl) {
		return canonicalUrl;
	}

	return new URL(pathname, siteUrl).toString();
}
