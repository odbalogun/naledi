import { useState } from "react";

type UpcomingEvent = {
	tag: string;
	title: string;
	date: string; // ISO date for sorting
	dateLabel: string;
	location: string;
	meta: string;
	copy: string;
};

type PastEvent = {
	tag: string;
	title: string;
	date: string;
	location: string;
	meta: string;
	copy: string;
	images: string[];
	details: string;
};

function EventsGallery() {
	const upcomingEvents: UpcomingEvent[] = [
		{
			tag: "Upcoming",
			title: "UK Boarding School Information Evening — Lagos",
			date: "2026-04-12",
			dateLabel: "12 April 2026",
			location: "Victoria Island, Lagos",
			meta: "Limited seats · RSVP required",
			copy: "A guided evening for families considering UK boarding schools — timelines, scholarships, and what strong applications look like.",
		},
		{
			tag: "Upcoming",
			title: "Undergraduate & Postgraduate Pathways Webinar — Virtual",
			date: "2026-05-04",
			dateLabel: "4 May 2026",
			location: "Online (Zoom)",
			meta: "Open to students & parents",
			copy: "A practical session on course selection, personal statements, scholarship strategy, and visa preparation for top destinations.",
		},
		{
			tag: "Upcoming",
			title: "Admissions Interview Prep Workshop — Accra",
			date: "2026-06-18",
			dateLabel: "18 June 2026",
			location: "Airport Residential Area, Accra",
			meta: "Ages 13–18 · Small group",
			copy: "Mock interviews, feedback, and confidence-building drills designed around real admissions formats.",
		},
	];

	const pastHighlights: PastEvent[] = [
		{
			tag: "Highlight",
			title: "Partner School Showcase — Accra",
			date: "October 2025",
			location: "Accra",
			meta: "5 visiting schools · One-on-one meetings",
			copy: "Admissions teams from leading schools met prospective students and families for consultations and interviews.",
			images: [
				"https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=85&fit=crop&crop=center",
				"https://images.unsplash.com/photo-1523580846011-63c4c04045b8?w=1200&q=85&fit=crop&crop=center",
				"https://images.unsplash.com/photo-1523580846011-43a03dd88a4f?w=1200&q=85&fit=crop&crop=center",
			],
			details:
				"This showcase brought together partner schools from the UK and Canada to meet families from across Accra. Students had the chance to discuss programmes, scholarships, and campus life directly with admissions representatives.",
		},
		{
			tag: "Highlight",
			title: "Interview & Essay Prep Bootcamp — Virtual",
			date: "January 2026",
			location: "Online",
			meta: "3-day intensive · Ages 13–18",
			copy: "Hands-on coaching on interviews, essays, and storytelling — helping students present their authentic strengths.",
			images: [
				"https://images.unsplash.com/photo-1523580846011-4d01a47c1c5b?w=1200&q=85&fit=crop&crop=center",
				"https://images.unsplash.com/photo-1523580846011-a8cbe2c6f7b9?w=1200&q=85&fit=crop&crop=center",
				"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85&fit=crop&crop=center",
			],
			details:
				"Over three days, students completed mock interviews, essay drafts, and peer review exercises with support from Naledi consultants, building confidence ahead of real admissions conversations.",
		},
	];

	const [activeEvent, setActiveEvent] = useState<PastEvent | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const sortedUpcoming = [...upcomingEvents].sort((a, b) =>
		a.date.localeCompare(b.date),
	);

	const openModal = (event: PastEvent) => {
		setActiveEvent(event);
		setActiveIndex(0);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setActiveEvent(null);
		setActiveIndex(0);
		document.body.style.overflow = "";
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
					<ul className="events-list">
						{sortedUpcoming.map((ev, idx) => (
							<li
								key={ev.title}
								className={`event-list-item reveal d${idx + 1}`}
							>
								<div className="event-list-date">
									<span className="event-list-month">
										{new Date(ev.date).toLocaleString("en-US", {
											month: "short",
										})}
									</span>
									<span className="event-list-day">
										{new Date(ev.date).getDate()}
									</span>
									<span className="event-list-year">
										{new Date(ev.date).getFullYear()}
									</span>
								</div>
								<div className="event-list-body">
									<div className="event-tag">{ev.tag}</div>
									<h3 className="event-title">{ev.title}</h3>
									<div className="event-date">
										{ev.dateLabel} · {ev.location}
									</div>
									<p className="event-copy">{ev.copy}</p>
									<div className="event-meta">{ev.meta}</div>
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
								key={ev.title}
								type="button"
								className={`event-card event-card-image reveal d${idx + 1}`}
								onClick={() => openModal(ev)}
							>
								<div className="event-card-img-wrap">
									<img src={ev.images[0]} alt={ev.title} />
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
							If you&apos;d like to be invited to upcoming Naledi events or
							book a private consultation, we&apos;d love to hear from you.
						</p>
						<a href="/contact-us" className="btn-fill" style={{ marginTop: 24 }}>
							Talk To Us
						</a>
					</div>
				</div>
			</section>

			{activeEvent && (
				<div className="event-modal" onClick={closeModal}>
					<div
						className="event-modal-inner"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className="event-modal-close"
							onClick={closeModal}
							aria-label="Close"
						>
							×
						</button>
						<div className="event-modal-img-wrap">
							<img
								src={activeEvent.images[activeIndex]}
								alt={activeEvent.title}
							/>
							{activeEvent.images.length > 1 && (
								<div className="event-modal-nav">
									<button type="button" onClick={prevImage}>
										‹
									</button>
									<span>
										{activeIndex + 1} / {activeEvent.images.length}
									</span>
									<button type="button" onClick={nextImage}>
										›
									</button>
								</div>
							)}
						</div>
						<div className="event-modal-body">
							<div className="event-tag">{activeEvent.tag}</div>
							<h3 className="event-title">{activeEvent.title}</h3>
							<div className="event-date">
								{activeEvent.date} · {activeEvent.location}
							</div>
							<p className="event-copy">{activeEvent.details}</p>
							<div className="event-meta">{activeEvent.meta}</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default EventsGallery;
