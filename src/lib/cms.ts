/**
 * Payload CMS (Next.js app in /cms). Set VITE_CMS_URL in .env — e.g. http://localhost:3001
 * When unset, pages keep their built-in static content.
 */

const PLACEHOLDER_EVENT =
	"data:image/svg+xml," +
	encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="#e8ecf4" width="800" height="500"/><text x="400" y="260" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="18">Event image</text></svg>`,
	);

export function hasCms(): boolean {
	return Boolean(import.meta.env.VITE_CMS_URL?.trim());
}

export function cmsBaseUrl(): string {
	return (import.meta.env.VITE_CMS_URL || "").replace(/\/$/, "");
}

export function cmsMediaUrl(url: string | null | undefined): string {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	const base = cmsBaseUrl();
	if (!base) return url;
	return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

type PayloadListResponse<T> = {
	docs: T[];
};

async function fetchCollection<T>(
	collection: string,
	search: string,
): Promise<T[]> {
	const base = cmsBaseUrl();
	const res = await fetch(`${base}/api/${collection}${search}`, {
		headers: { Accept: "application/json" },
	});
	if (!res.ok) {
		throw new Error(`${collection}: ${res.status} ${await res.text()}`);
	}
	const data = (await res.json()) as PayloadListResponse<T>;
	return data.docs ?? [];
}

/** --- Events --- */
export type PayloadMediaRef = number | { url?: string | null } | null;

export type PayloadEventDoc = {
	id: number | string;
	title: string;
	slug?: string;
	status: "upcoming" | "past";
	tag?: string | null;
	startDate?: string | null;
	dateLabel: string;
	location: string;
	meta?: string | null;
	copy: string;
	details?: string | null;
	gallery?: {
		image?: PayloadMediaRef;
		caption?: string | null;
	}[];
};

export async function fetchEventsPayload(
	status: "upcoming" | "past",
): Promise<PayloadEventDoc[]> {
	const q =
		`?where[status][equals]=${status}` +
		`&sort=sortOrder` +
		`&limit=100` +
		`&depth=2`;
	return fetchCollection<PayloadEventDoc>("events", q);
}

export async function submitEventRsvp(body: {
	event: string | number;
	name: string;
	phone?: string;
	email: string;
	message?: string;
}): Promise<void> {
	const base = cmsBaseUrl();
	const res = await fetch(`${base}/api/event-rsvps`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		throw new Error(await res.text());
	}
}

/** --- Destinations --- */
export type PayloadDestinationDoc = {
	id: number | string;
	slug: string;
	flag?: string | null;
	name: string;
	region: string;
	visaSummary: string;
	studyPermitNotes: string;
	intakes: string;
	popularCurricula: string;
	airport: string;
	notes?: string | null;
	sortOrder?: number | null;
	schools?: {
		name: string;
		city: string;
		type: string;
		notes?: string | null;
	}[];
};

export async function fetchDestinationsPayload(): Promise<
	PayloadDestinationDoc[]
> {
	const q = "?sort=sortOrder&limit=100&depth=0";
	return fetchCollection<PayloadDestinationDoc>("destinations", q);
}

/** --- FAQs --- */
export type PayloadFaqDoc = {
	question: string;
	answer: string;
	scope: "high_school_placement" | "undergraduate_postgraduate";
	sortOrder?: number | null;
};

export async function fetchFaqsPayload(
	scope: PayloadFaqDoc["scope"],
): Promise<PayloadFaqDoc[]> {
	const q =
		`?where[scope][equals]=${scope}` + `&sort=sortOrder` + `&limit=200`;
	return fetchCollection<PayloadFaqDoc>("faqs", q);
}

/** --- Blog --- */
export type PayloadTagDoc = {
	id: number | string;
	name: string;
	slug?: string | null;
};

export type PayloadArticleDoc = {
	id: number | string;
	title: string;
	slug: string;
	author: string;
	published: boolean;
	publishedAt?: string | null;
	excerpt: string;
	metaKeywords?: string | null;
	coverImage?: PayloadMediaRef;
	tags?: (number | PayloadTagDoc)[] | null;
	body: unknown;
};

export async function fetchArticlesPayload(): Promise<PayloadArticleDoc[]> {
	const q =
		"?where[published][equals]=true" +
		"&sort=-publishedAt" +
		"&limit=50" +
		"&depth=2";
	return fetchCollection<PayloadArticleDoc>("articles", q);
}

export async function fetchArticleBySlug(
	slug: string,
): Promise<PayloadArticleDoc | null> {
	const q =
		`?where[slug][equals]=${encodeURIComponent(slug)}` + `&limit=1&depth=2`;
	const docs = await fetchCollection<PayloadArticleDoc>("articles", q);
	return docs[0] ?? null;
}

export type PayloadCommentDoc = {
	id: number | string;
	authorName: string;
	body: string;
	createdAt: string;
};

export async function fetchCommentsForArticle(
	articleId: string | number,
): Promise<PayloadCommentDoc[]> {
	const q =
		`?where[and][0][article][equals]=${encodeURIComponent(String(articleId))}` +
		`&where[and][1][status][equals]=approved` +
		`&sort=-createdAt` +
		`&limit=100`;
	return fetchCollection<PayloadCommentDoc>("comments", q);
}

export async function submitArticleComment(body: {
	article: string | number;
	authorName: string;
	email?: string;
	body: string;
}): Promise<void> {
	const base = cmsBaseUrl();
	const res = await fetch(`${base}/api/comments`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		throw new Error(await res.text());
	}
}

export function galleryToImageUrls(doc: PayloadEventDoc): {
	url: string;
	caption: string;
}[] {
	const rows =
		doc.gallery?.map((g) => {
			const ref = g.image;
			const url =
				typeof ref === "object" && ref && "url" in ref
					? cmsMediaUrl(ref.url)
					: "";
			return { url, caption: g.caption || "" };
		}) ?? [];
	const filtered = rows.filter((r) => r.url);
	if (filtered.length === 0) {
		return [{ url: PLACEHOLDER_EVENT, caption: "" }];
	}
	return filtered;
}
