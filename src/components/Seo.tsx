import { Helmet } from "react-helmet-async";

const SITE_URL = "https://naledieducation.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

type SeoProps = {
	title: string;
	description: string;
	path?: string;
	image?: string;
};

function Seo({ title, description, path = "/", image }: SeoProps) {
	const canonical = `${SITE_URL}${path}`;
	const ogImage = image || DEFAULT_OG_IMAGE;

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={canonical} />
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="Naledi Education" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonical} />
			<meta property="og:image" content={ogImage} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImage} />
		</Helmet>
	);
}

export default Seo;
