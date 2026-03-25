import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import {
	cmsMediaUrl,
	fetchArticlesPayload,
	hasCms,
	type PayloadArticleDoc,
} from "../lib/cms";

function formatDate(s?: string | null) {
	if (!s) return "";
	return new Date(s).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

function Blog() {
	const [articles, setArticles] = useState<PayloadArticleDoc[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!hasCms()) {
			setError(null);
			setArticles([]);
			return;
		}
		let cancelled = false;
		fetchArticlesPayload()
			.then((docs) => {
				if (!cancelled) {
					setArticles(docs);
					setError(null);
				}
			})
			.catch((e) => {
				if (!cancelled) {
					setError(e instanceof Error ? e.message : "Could not load articles.");
				}
			});
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<section className="blog-page mission">
			<div className="si">
				<div className="svc-top reveal">
					<div>
						<div className="lbl">
							<div className="lbl-line" />
							<span>Insights</span>
						</div>
						<h1 className="ttl">
							Naledi <i>Blog</i>
						</h1>
					</div>
					<p>
						Guides, admissions tips, and updates from the Naledi Education team.
					</p>
				</div>

				{!hasCms() && (
					<p className="blog-cms-hint reveal">
						Connect the site to Payload by setting{" "}
						<code>VITE_CMS_URL</code> (e.g. <code>http://localhost:3001</code>)
						in <code>frontend/.env</code>, then publish articles in the CMS
						admin.
					</p>
				)}

				{error && (
					<p className="blog-error reveal" role="alert">
						{error}
					</p>
				)}

				<ul className="blog-list">
					{articles.map((a, idx) => {
						const cover =
							typeof a.coverImage === "object" &&
							a.coverImage &&
							"url" in a.coverImage
								? cmsMediaUrl(a.coverImage.url)
								: "";
						const tagList = (a.tags || [])
							.map((t) => (typeof t === "object" && t ? t.name : null))
							.filter(Boolean) as string[];
						return (
							<li
								key={String(a.id)}
								className={`blog-card reveal d${(idx % 4) + 1}`}
							>
								<Link to={`/blog/${a.slug}`} className="blog-card-link">
									{cover ? (
										<div className="blog-card-img-wrap">
											<OptimizedImage src={cover} alt="" />
										</div>
									) : null}
									<div className="blog-card-body">
										<div className="blog-card-meta">
											{a.publishedAt ? formatDate(a.publishedAt) : ""}
											{a.author ? ` · ${a.author}` : ""}
										</div>
										<h2 className="blog-card-title">{a.title}</h2>
										<p className="blog-card-excerpt">{a.excerpt}</p>
										{tagList.length > 0 && (
											<div className="blog-card-tags">
												{tagList.map((name) => (
													<span key={name} className="blog-tag">
														{name}
													</span>
												))}
											</div>
										)}
									</div>
								</Link>
							</li>
						);
					})}
				</ul>

				{hasCms() && !error && articles.length === 0 && (
					<p className="reveal">No published articles yet. Check back soon.</p>
				)}
			</div>
		</section>
	);
}

export default Blog;
