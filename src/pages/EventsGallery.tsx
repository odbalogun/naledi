import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	fetchEventsPayload,
	galleryToImageUrls,
	hasCms,
	submitEventRsvp,
} from "../lib/cms";

type UpcomingEvent = {
	cmsId?: string | number;
	/** ISO date for calendar strip; empty if only dateLabel is set in CMS */
	date: string;
	dateLabelOnly?: boolean;
	tag: string;
	title: string;
	dateLabel: string;
	location: string;
	meta: string;
	copy: string;
};

type PastEventImage = {
	url: string;
	caption: string;
};

type PastEvent = {
	tag: string;
	title: string;
	date: string;
	location: string;
	meta: string;
	copy: string;
	images: PastEventImage[];
	details: string;
};

const STATIC_UPCOMING: UpcomingEvent[] = [
		{
			tag: "Upcoming",
			title: "UK Boarding School Information Evening - Lagos",
			date: "2026-04-12",
			dateLabel: "12 April 2026",
			location: "Victoria Island, Lagos",
			meta: "Limited seats · RSVP required",
			copy: "A guided evening for families considering UK boarding schools: timelines, scholarships, and what strong applications look like.",
		},
		{
			tag: "Upcoming",
			title: "Undergraduate & Postgraduate Pathways Webinar - Virtual",
			date: "2026-05-04",
			dateLabel: "4 May 2026",
			location: "Online (Zoom)",
			meta: "Open to students & parents",
			copy: "A practical session on course selection, personal statements, scholarship strategy, and visa preparation for top destinations.",
		},
		{
			tag: "Upcoming",
			title: "Admissions Interview Prep Workshop - Accra",
			date: "2026-06-18",
			dateLabel: "18 June 2026",
			location: "Airport Residential Area, Accra",
			meta: "Ages 13–18 · Small group",
			copy: "Mock interviews, feedback, and confidence-building drills designed around real admissions formats.",
		},
	];

const STATIC_PAST: PastEvent[] = [
		{
			tag: "Highlight",
			title: "Partner School Showcase - Accra",
			date: "October 2025",
			location: "Accra",
			meta: "5 visiting schools · One-on-one meetings",
			copy: "Admissions teams from leading schools met prospective students and families for consultations and interviews.",
			images: [
				{
					url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=85&fit=crop&crop=center",
					caption: "Families meeting with admissions representatives",
				},
				{
					url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85&fit=crop&crop=center",
					caption: "Students and parents in discussion",
				},
				{
					url: "https://images.unsplash.com/photo-1523580846011-43a03dd88a4f?w=1200&q=85&fit=crop&crop=center",
					caption: "One-on-one school consultations",
				},
			],
			details:
				"This showcase brought together partner schools from the UK and Canada to meet families from across Accra. Students had the chance to discuss programmes, scholarships, and campus life directly with admissions representatives.",
		},
		{
			tag: "Highlight",
			title: "Interview & Essay Prep Bootcamp - Virtual",
			date: "January 2026",
			location: "Online",
			meta: "3-day intensive · Ages 13–18",
			copy: "Hands-on coaching on interviews, essays, and storytelling, helping students present their authentic strengths.",
			images: [
				{
					url: "https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=1200&q=85&fit=crop&crop=center",
					caption: "Students working on essay drafts",
				},
				{
					url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85&fit=crop&crop=center",
					caption: "Group discussion and peer review",
				},
				{
					url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85&fit=crop&crop=center",
					caption: "Mock interview practice",
				},
			],
			details:
				"Over three days, students completed mock interviews, essay drafts, and peer review exercises with support from Naledi Education consultants, building confidence ahead of real admissions conversations.",
		},
	];

function EventsGallery() {
	const [upcomingEvents, setUpcomingEvents] =
		useState<UpcomingEvent[]>(STATIC_UPCOMING);
	const [pastHighlights, setPastHighlights] =
		useState<PastEvent[]>(STATIC_PAST);
	const [cmsLoadError, setCmsLoadError] = useState<string | null>(null);

	useEffect(() => {
		if (!hasCms()) return;
		let cancelled = false;
		(async () => {
			try {
				const [upDocs, pastDocs] = await Promise.all([
					fetchEventsPayload("upcoming"),
					fetchEventsPayload("past"),
				]);
				if (cancelled) return;
				const mappedUp: UpcomingEvent[] = upDocs.map((d) => ({
					cmsId: d.id,
					tag: d.tag || "Upcoming",
					title: d.title,
					date: d.startDate
						? new Date(d.startDate).toISOString().slice(0, 10)
						: "",
					dateLabelOnly: !d.startDate,
					dateLabel: d.dateLabel,
					location: d.location,
					meta: d.meta || "",
					copy: d.copy,
				}));
				const mappedPast: PastEvent[] = pastDocs.map((d) => ({
					tag: d.tag || "Highlight",
					title: d.title,
					date: d.dateLabel,
					location: d.location,
					meta: d.meta || "",
					copy: d.copy,
					images: galleryToImageUrls(d),
					details: d.details || "",
				}));
				setUpcomingEvents(mappedUp.length ? mappedUp : STATIC_UPCOMING);
				setPastHighlights(mappedPast.length ? mappedPast : STATIC_PAST);
				setCmsLoadError(null);
			} catch (e) {
				if (!cancelled) {
					setCmsLoadError(
						e instanceof Error ? e.message : "Could not load events from CMS.",
					);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const [activeEvent, setActiveEvent] = useState<PastEvent | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [rsvpEvent, setRsvpEvent] = useState<UpcomingEvent | null>(null);
	const [rsvpForm, setRsvpForm] = useState({
		name: "",
		phone: "",
		email: "",
		message: "",
	});
	const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
	const [rsvpError, setRsvpError] = useState<string | null>(null);
	const [rsvpLoading, setRsvpLoading] = useState(false);

	const sortedUpcoming = [...upcomingEvents].sort((a, b) => {
		const ad = a.date || "9999-12-31";
		const bd = b.date || "9999-12-31";
		return ad.localeCompare(bd);
	});

	useEffect(() => {
		const anyModalOpen = Boolean(activeEvent || rsvpEvent);
		document.body.style.overflow = anyModalOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [activeEvent, rsvpEvent]);

	const openModal = (event: PastEvent) => {
		setActiveEvent(event);
		setActiveIndex(0);
	};

	const closeModal = () => {
		setActiveEvent(null);
		setActiveIndex(0);
	};

	const nextImage = () => {
		if (!activeEvent) return;
		setActiveIndex((prev) => (prev + 1) % activeEvent.images.length);
	};

	const prevImage = () => {
		if (!activeEvent) return;
		setActiveIndex((prev) =>
			prev === 0 ? activeEvent.images.length - 1 : prev - 1,
		);
	};

	const openRsvpModal = (ev: UpcomingEvent) => {
		setRsvpEvent(ev);
		setRsvpForm({ name: "", phone: "", email: "", message: "" });
		setRsvpSubmitted(false);
		setRsvpError(null);
	};

	const closeRsvpModal = () => {
		setRsvpEvent(null);
	};

	const handleRsvpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setRsvpError(null);
		if (!rsvpEvent) return;
		if (hasCms() && rsvpEvent.cmsId != null) {
			setRsvpLoading(true);
			try {
				await submitEventRsvp({
					event: rsvpEvent.cmsId,
					name: rsvpForm.name,
					email: rsvpForm.email,
					phone: rsvpForm.phone || undefined,
					message: rsvpForm.message || undefined,
				});
				setRsvpSubmitted(true);
			} catch (err) {
				setRsvpError(
					err instanceof Error ? err.message : "RSVP could not be submitted.",
				);
			} finally {
				setRsvpLoading(false);
			}
			return;
		}
		setRsvpSubmitted(true);
	};

	return (
		<>
			{/* Upcoming events */}
			<section className="mission">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Events</span>
							</div>
							<h2 className="ttl">
								Upcoming <i>Events</i>
							</h2>
						</div>
						<p>
							Join us for parent evenings, student workshops, and webinars
							designed to make the admissions journey clear and confident.
						</p>
					</div>
					{cmsLoadError && (
						<p
							className="reveal"
							style={{
								color: "#b45309",
								marginBottom: 16,
								fontSize: "0.9rem",
							}}
						>
							Events CMS: {cmsLoadError} (showing sample content)
						</p>
					)}
					<ul className="events-list">
						{sortedUpcoming.map((ev, idx) => (
							<li
								key={String(ev.cmsId ?? ev.title)}
								className={`event-list-item reveal d${idx + 1}`}
							>
								<div className="event-list-date">
									{ev.dateLabelOnly || !ev.date ? (
										<span
											className="event-list-month"
											style={{
												gridColumn: "1 / -1",
												fontSize: "0.85rem",
												lineHeight: 1.3,
											}}
										>
											{ev.dateLabel}
										</span>
									) : (
										<>
											<span className="event-list-month">
												{new Date(ev.date + "T12:00:00").toLocaleString(
													"en-US",
													{ month: "short" },
												)}
											</span>
											<span className="event-list-day">
												{new Date(ev.date + "T12:00:00").getDate()}
											</span>
											<span className="event-list-year">
												{new Date(ev.date + "T12:00:00").getFullYear()}
											</span>
										</>
									)}
								</div>
								<div className="event-list-body">
									<div className="event-tag">{ev.tag}</div>
									<h3 className="event-title">{ev.title}</h3>
									<div className="event-date">
										{ev.dateLabel} · {ev.location}
									</div>
									<p className="event-copy">{ev.copy}</p>
									<div className="event-meta">{ev.meta}</div>
									<button
										type="button"
										className="event-rsvp-btn"
										onClick={() => openRsvpModal(ev)}
									>
										RSVP
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Past highlights */}
			<section className="events">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Highlights</span>
							</div>
							<h2 className="ttl">
								Past <i>Highlights</i>
							</h2>
						</div>
						<p>
							A selection of recent gatherings and workshops that brought our
							community together.
						</p>
					</div>

					<div className="events-grid">
						{pastHighlights.map((ev, idx) => (
							<button
								key={`${ev.title}-${ev.date}`}
								type="button"
								className={`event-card event-card-image reveal d${idx + 1}`}
								onClick={() => openModal(ev)}
							>
								<div className="event-card-img-wrap">
									<img src={ev.images[0].url} alt={ev.title} />
								</div>
								<div className="event-card-overlay">
									<div className="event-tag">{ev.tag}</div>
									<div className="event-date">
										{ev.date} · {ev.location}
									</div>
									<h3 className="event-title">{ev.title}</h3>
									<div className="event-meta">{ev.meta}</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* CTA back to contact */}
			<section className="mission">
				<div className="si">
					<div
						className="m-copy reveal d2"
						style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}
					>
						<div className="lbl" style={{ justifyContent: "center" }}>
							<div className="lbl-line" />
							<span>Join Us</span>
						</div>
						<h2 className="ttl" style={{ marginBottom: 18 }}>
							Be Part of Our Next <i>Event</i>
						</h2>
						<p>
							If you&apos;d like to be invited to upcoming events or book a
							private consultation, we&apos;d love to hear from you.
						</p>
						<Link
							to="/contact-us"
							className="btn-fill"
							style={{ marginTop: 24 }}
						>
							Talk To Us
						</Link>
					</div>
				</div>
			</section>

			{activeEvent && (
				<div
					className="event-modal"
					onClick={closeModal}
					role="dialog"
					aria-modal="true"
					aria-labelledby="event-modal-title"
				>
					<div
						className="event-modal-inner"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className="event-modal-close"
							onClick={closeModal}
							aria-label="Close modal"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</button>
						<div className="event-modal-content">
							<div className="event-modal-gallery">
								<div className="event-modal-main-img">
									<img
										src={activeEvent.images[activeIndex].url}
										alt={`${activeEvent.title} - ${activeEvent.images[activeIndex].caption}`}
									/>
								</div>
								{activeEvent.images.length > 1 && (
									<>
										<button
											type="button"
											className="event-modal-arrow event-modal-prev"
											onClick={prevImage}
											aria-label="Previous image"
										>
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M15 18l-6-6 6-6" />
											</svg>
										</button>
										<button
											type="button"
											className="event-modal-arrow event-modal-next"
											onClick={nextImage}
											aria-label="Next image"
										>
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M9 18l6-6-6-6" />
											</svg>
										</button>
										<div className="event-modal-dots">
											{activeEvent.images.map((_, i) => (
												<button
													key={i}
													type="button"
													className={`event-modal-dot${i === activeIndex ? " active" : ""}`}
													onClick={() => setActiveIndex(i)}
													aria-label={`View image ${i + 1}: ${activeEvent.images[i].caption}`}
												/>
											))}
										</div>
									</>
								)}
								<div className="event-modal-caption">
									{activeEvent.images[activeIndex].caption}
								</div>
							</div>
							<div className="event-modal-detail">
								<span className="event-modal-tag">{activeEvent.tag}</span>
								<h2 id="event-modal-title" className="event-modal-title">
									{activeEvent.title}
								</h2>
								<p className="event-modal-meta">
									{activeEvent.date} · {activeEvent.location}
								</p>
								<p className="event-modal-details">{activeEvent.details}</p>
								<p className="event-modal-extra">{activeEvent.meta}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{rsvpEvent && (
				<div
					className="event-modal rsvp-modal"
					onClick={closeRsvpModal}
					role="dialog"
					aria-modal="true"
					aria-labelledby="rsvp-modal-title"
				>
					<div
						className="event-modal-inner rsvp-modal-inner"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className="event-modal-close"
							onClick={closeRsvpModal}
							aria-label="Close RSVP modal"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</button>
						<div className="rsvp-modal-content">
							<h2 id="rsvp-modal-title" className="rsvp-modal-title">
								RSVP: {rsvpEvent.title}
							</h2>
							<p className="rsvp-modal-meta">
								{rsvpEvent.dateLabel} · {rsvpEvent.location}
							</p>
							{rsvpSubmitted ? (
								<div className="rsvp-success">
									<p>
										Thank you for your RSVP. We&apos;ll be in touch with
										confirmation details shortly.
									</p>
								</div>
							) : (
								<form className="rsvp-form" onSubmit={handleRsvpSubmit}>
									{rsvpError && (
										<p style={{ color: "#b91c1c", marginBottom: 12 }}>
											{rsvpError}
										</p>
									)}
									<label>
										<span>Name</span>
										<input
											type="text"
											required
											value={rsvpForm.name}
											onChange={(e) =>
												setRsvpForm((f) => ({ ...f, name: e.target.value }))
											}
											placeholder="Your full name"
										/>
									</label>
									<label>
										<span>Email</span>
										<input
											type="email"
											required
											value={rsvpForm.email}
											onChange={(e) =>
												setRsvpForm((f) => ({ ...f, email: e.target.value }))
											}
											placeholder="your@email.com"
										/>
									</label>
									<label>
										<span>Phone</span>
										<input
											type="tel"
											value={rsvpForm.phone}
											onChange={(e) =>
												setRsvpForm((f) => ({ ...f, phone: e.target.value }))
											}
											placeholder="+234 800 000 0000"
										/>
									</label>
									<label>
										<span>Message (optional)</span>
										<textarea
											rows={3}
											value={rsvpForm.message}
											onChange={(e) =>
												setRsvpForm((f) => ({ ...f, message: e.target.value }))
											}
											placeholder="Any dietary requirements, questions, or additional guests?"
										/>
									</label>
									<button
										type="submit"
										className="event-rsvp-btn"
										disabled={rsvpLoading}
									>
										{rsvpLoading ? "Sending…" : "Submit RSVP"}
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default EventsGallery;
