import { RichText } from "@payloadcms/richtext-lexical/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import Seo from "../components/Seo";
import {
	cmsMediaUrl,
	fetchArticleBySlug,
	fetchCommentsForArticle,
	hasCms,
	submitArticleComment,
	type PayloadArticleDoc,
	type PayloadCommentDoc,
} from "../lib/cms";

function formatDate(s?: string | null) {
	if (!s) return "";
	return new Date(s).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

function isLexicalState(body: unknown): body is { root: unknown } {
	return (
		typeof body === "object" &&
		body !== null &&
		"root" in body &&
		typeof (body as { root: unknown }).root === "object"
	);
}

function BlogPost() {
	const { slug } = useParams<{ slug: string }>();
	const [article, setArticle] = useState<PayloadArticleDoc | null>(null);
	const [comments, setComments] = useState<PayloadCommentDoc[]>([]);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [commentForm, setCommentForm] = useState({
		authorName: "",
		email: "",
		body: "",
	});
	const [commentStatus, setCommentStatus] = useState<
		"idle" | "sending" | "sent" | "error"
	>("idle");
	const [commentError, setCommentError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug || !hasCms()) {
			setArticle(null);
			setComments([]);
			return;
		}
		let cancelled = false;
		(async () => {
			try {
				const a = await fetchArticleBySlug(slug);
				if (cancelled) return;
				setArticle(a);
				setLoadError(a ? null : "Article not found.");
				if (a) {
					const c = await fetchCommentsForArticle(a.id);
					if (!cancelled) setComments(c);
				}
			} catch (e) {
				if (!cancelled) {
					setLoadError(
						e instanceof Error ? e.message : "Could not load article.",
					);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [slug]);

	const submitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!article || !hasCms()) return;
		setCommentError(null);
		setCommentStatus("sending");
		try {
			await submitArticleComment({
				article: article.id,
				authorName: commentForm.authorName,
				email: commentForm.email || undefined,
				body: commentForm.body,
			});
			setCommentStatus("sent");
			setCommentForm({ authorName: "", email: "", body: "" });
		} catch (err) {
			setCommentStatus("error");
			setCommentError(
				err instanceof Error ? err.message : "Could not submit comment.",
			);
		}
	};

	if (!hasCms()) {
		return (
			<section className="blog-page mission">
				<div className="si">
					<p className="blog-cms-hint">
						Set <code>VITE_CMS_URL</code> to read articles from the CMS.
					</p>
					<Link to="/blog" className="btn-fill">
						Back to blog
					</Link>
				</div>
			</section>
		);
	}

	if (loadError || !article) {
		return (
			<section className="blog-page mission">
				<div className="si">
					<p className="blog-error" role="alert">
						{loadError || "Not found."}
					</p>
					<Link to="/blog" className="btn-fill" style={{ marginTop: 16 }}>
						Back to blog
					</Link>
				</div>
			</section>
		);
	}

	const cover =
		typeof article.coverImage === "object" &&
		article.coverImage &&
		"url" in article.coverImage
			? cmsMediaUrl(article.coverImage.url)
			: "";

	const tagList = (article.tags || [])
		.map((t) => (typeof t === "object" && t ? t.name : null))
		.filter(Boolean) as string[];

	return (
		<article className="blog-article mission">
			<Seo
				title={`${article.title} | Naledi Education`}
				description={article.excerpt}
				path={`/blog/${article.slug}`}
			/>
			<div className="si blog-article-inner">
				<Link to="/blog" className="blog-back">
					← All articles
				</Link>

				<header className="blog-article-head reveal">
					<div className="blog-card-meta">
						{article.publishedAt ? formatDate(article.publishedAt) : ""}
						{article.author ? ` · ${article.author}` : ""}
					</div>
					<h1 className="ttl blog-article-title">{article.title}</h1>
					<p className="blog-article-excerpt">{article.excerpt}</p>
					{tagList.length > 0 && (
						<div className="blog-card-tags">
							{tagList.map((name) => (
								<span key={name} className="blog-tag">
									{name}
								</span>
							))}
						</div>
					)}
				</header>

				{cover ? (
					<div className="blog-article-cover reveal d2">
						<OptimizedImage src={cover} alt="" />
					</div>
				) : null}

				<div className="blog-article-body reveal d3 payload-richtext">
					{isLexicalState(article.body) ? (
						<RichText data={article.body as never} />
					) : (
						<p>Content could not be displayed.</p>
					)}
				</div>

				<section className="blog-comments reveal d4">
					<h2 className="blog-comments-title">Comments</h2>
					{comments.length === 0 ? (
						<p className="blog-comments-empty">No comments yet.</p>
					) : (
						<ul className="blog-comment-list">
							{comments.map((c) => (
								<li key={String(c.id)} className="blog-comment">
									<div className="blog-comment-meta">
										<strong>{c.authorName}</strong>
										{formatDate(c.createdAt)}
									</div>
									<p className="blog-comment-body">{c.body}</p>
								</li>
							))}
						</ul>
					)}

					{commentStatus === "sent" ? (
						<p className="blog-comment-success">
							Thanks — your comment was received and will appear after review.
						</p>
					) : (
						<form className="blog-comment-form" onSubmit={submitComment}>
							<h3>Add a comment</h3>
							{commentError && (
								<p className="blog-error" role="alert">
									{commentError}
								</p>
							)}
							<label>
								<span>Name</span>
								<input
									required
									value={commentForm.authorName}
									onChange={(e) =>
										setCommentForm((f) => ({
											...f,
											authorName: e.target.value,
										}))
									}
								/>
							</label>
							<label>
								<span>Email (optional)</span>
								<input
									type="email"
									value={commentForm.email}
									onChange={(e) =>
										setCommentForm((f) => ({ ...f, email: e.target.value }))
									}
								/>
							</label>
							<label>
								<span>Comment</span>
								<textarea
									required
									rows={4}
									value={commentForm.body}
									onChange={(e) =>
										setCommentForm((f) => ({ ...f, body: e.target.value }))
									}
								/>
							</label>
							<button
								type="submit"
								className="btn-fill"
								disabled={commentStatus === "sending"}
							>
								{commentStatus === "sending" ? "Sending…" : "Submit comment"}
							</button>
						</form>
					)}
				</section>
			</div>
		</article>
	);
}

export default BlogPost;
