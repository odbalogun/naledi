import { useEffect, useRef, useState } from "react";

const UG_DEST_SCROLL_STEP = 296;
const UG_DEST_SCROLL_THRESHOLD = 5;

const UG_DESTINATIONS = [
	{
		img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=85&fit=crop",
		flag: "🇬🇧",
		name: "United Kingdom",
		count: "Russell Group & Beyond",
	},
	{
		img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=85&fit=crop",
		flag: "🇺🇸",
		name: "United States",
		count: "Ivy League & Top 50",
	},
	{
		img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=85&fit=crop",
		flag: "🇨🇦",
		name: "Canada",
		count: "U15 & Leading Institutions",
	},
	{
		img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=800&q=85&fit=crop",
		flag: "🇦🇺",
		name: "Australia",
		count: "Group of Eight",
	},
	{
		img: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&q=85&fit=crop",
		flag: "🇳🇱",
		name: "Netherlands",
		count: "Research Universities & Top Rankings",
	},
	{
		img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=85&fit=crop",
		flag: "🇩🇪",
		name: "Germany",
		count: "Excellence Universities & Tuition-Free Options",
	},
	{
		img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=85&fit=crop",
		flag: "🇸🇬",
		name: "Singapore",
		count: "NUS, NTU & Global Programmes",
	},
	{
		img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=85&fit=crop",
		flag: "🇳🇿",
		name: "New Zealand",
		count: "Top Research & Applied Universities",
	},
	{
		img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85&fit=crop",
		flag: "🇦🇪",
		name: "UAE",
		count: "Dubai & Abu Dhabi Campuses",
	},
	{
		img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=85&fit=crop",
		flag: "🇿🇦",
		name: "South Africa",
		count: "UCT, Wits & Leading Universities",
	},
	{
		img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=85&fit=crop",
		flag: "🇫🇷",
		name: "France",
		count: "Grandes Écoles & Public Universities",
	},
	{
		img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=85&fit=crop",
		flag: "🇨🇭",
		name: "Switzerland",
		count: "ETH, EPFL & Top-Ranked Institutions",
	},
];

const UG_FAQ = [
	{
		q: "When should I start my university application?",
		a: "For undergraduate applications, we recommend starting 12–18 months before your target intake. Many universities (especially in the UK and US) have early deadlines. For postgraduate programmes, 9–12 months ahead is typical. PhD applications often require 12–18 months due to research proposal development and supervisor matching.",
	},
	{
		q: "Do you help with scholarships and funding?",
		a: "Yes. We identify scholarship opportunities (merit-based, need-based, and country-specific) at our partner universities. We guide you through application requirements, essay prompts, and deadlines. For postgraduate study, we also advise on research funding, teaching assistantships, and external grants.",
	},
	{
		q: "Can you help with both undergraduate and postgraduate applications?",
		a: "Absolutely. We support students at every level — from first degrees (BA, BSc, BEng) to master's (MA, MSc, MBA, LLM) and doctoral programmes (MPhil, PhD). Each level has different requirements; we tailor our support accordingly.",
	},
	{
		q: "What if my academic background is non-standard?",
		a: "We work with students from diverse educational systems. Whether you're transitioning from a local curriculum, have gap years, or are changing fields at postgraduate level, we help you present your profile clearly and address any concerns admissions committees might have.",
	},
	{
		q: "How do you support PhD and research applicants?",
		a: "For research programmes, we help you identify suitable supervisors, refine your research proposal, and navigate the application process. We advise on funding options, interview preparation, and what admissions panels look for in strong research candidates.",
	},
];

function UndergraduatePostgraduate() {
	const ugDestScrollRef = useRef<HTMLDivElement>(null);
	const [ugDestCanScrollLeft, setUgDestCanScrollLeft] = useState(false);
	const [ugDestCanScrollRight, setUgDestCanScrollRight] = useState(false);
	const [ugFaqOpen, setUgFaqOpen] = useState<number | null>(null);

	const scrollUgDest = (direction: "left" | "right") => {
		const el = ugDestScrollRef.current;
		if (!el) return;
		el.scrollBy({
			left: direction === "left" ? -UG_DEST_SCROLL_STEP : UG_DEST_SCROLL_STEP,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const el = ugDestScrollRef.current;
		if (!el) return;
		const update = () => {
			const { scrollLeft, clientWidth, scrollWidth } = el;
			setUgDestCanScrollLeft(scrollLeft > UG_DEST_SCROLL_THRESHOLD);
			setUgDestCanScrollRight(
				scrollLeft + clientWidth < scrollWidth - UG_DEST_SCROLL_THRESHOLD,
			);
		};
		update();
		el.addEventListener("scroll", update);
		window.addEventListener("resize", update);
		return () => {
			el.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, []);

	return (
		<>
			<section className="mission">
				<div className="si">
					<div className="mission-grid">
						<div className="mi-wrap reveal">
							<div className="mi tall">
								<img
									src="/images/student_laptop.png"
									alt="University Student"
								/>
							</div>
							<div className="mi sq">
								<img
									src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85&fit=crop"
									alt="Students collaborating"
								/>
							</div>
							<div className="mi sq">
								<img src="/images/two_students.jpg" alt="Graduate studies" />
							</div>
						</div>
						<div className="m-copy reveal d2">
							<div className="lbl">
								<div className="lbl-line" />
								<span>Programs</span>
							</div>
							<h2 className="ttl">
								Undergraduate &amp; <i>Postgraduate</i> Studies
							</h2>
							<br />
							<p>
								Whether you&apos;re aiming for a world-class undergraduate
								degree or advancing your career with a postgraduate
								qualification, Naledi connects African students with top
								universities across the UK, USA, Canada, Australia, and beyond.
							</p>
							<p>
								We support students at every stage — from bachelor&apos;s and
								master&apos;s programmes to PhDs and professional degrees. Our
								consultants understand the distinct requirements of each level
								and help you build applications that stand out.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="services">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>What We Offer</span>
							</div>
							<h2 className="ttl">
								Your Path at <i>Every Level</i>
							</h2>
						</div>
						<p>
							From undergraduate applications to postgraduate research
							placements, we tailor our support to your goals.
						</p>
					</div>
					<div className="pillars" style={{ marginTop: 0 }}>
						<div className="pil reveal d1">
							<span>🎓</span>
							<h4>Undergraduate</h4>
							<p>
								First-degree programmes: BA, BSc, BEng and more. We help you
								find the right course, prepare strong applications, and secure
								offers from leading universities worldwide.
							</p>
						</div>
						<div className="pil reveal d2">
							<span>📜</span>
							<h4>Postgraduate Taught</h4>
							<p>
								Master&apos;s degrees (MA, MSc, MBA, LLM) and postgraduate
								diplomas. Strategic course selection, personal statement
								support, and scholarship guidance for your next step.
							</p>
						</div>
						<div className="pil reveal d3">
							<span>🔬</span>
							<h4>Postgraduate Research</h4>
							<p>
								MPhil, PhD and research-based programmes. We help you identify
								supervisors, refine research proposals, and navigate the
								application process for doctoral study.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="destinations">
				<div className="si">
					<div className="d-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Top Destinations</span>
							</div>
							<h2 className="ttl">
								Leading <i>Universities</i> Worldwide
							</h2>
						</div>
					</div>
					<div className="ug-dest-scroll-wrap">
						<button
							type="button"
							className={`ug-dest-scroll-btn ug-dest-scroll-btn-left${ugDestCanScrollLeft ? "" : " s-scroll-btn-hidden"}`}
							aria-label="Scroll destinations left"
							aria-hidden={!ugDestCanScrollLeft}
							onClick={() => scrollUgDest("left")}
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
								<path d="M15 18l-6-6 6-6" />
							</svg>
						</button>
						<div className="ug-dest-scroll" ref={ugDestScrollRef}>
							{UG_DESTINATIONS.map((d, i) => (
								<div key={d.name} className={`dc reveal d${i + 1}`}>
									<img src={d.img} alt={d.name} />
									<div className="dc-body">
										<span className="dc-flag">{d.flag}</span>
										<div className="dc-name">{d.name}</div>
										<div className="dc-cnt">{d.count}</div>
									</div>
								</div>
							))}
						</div>
						<button
							type="button"
							className={`ug-dest-scroll-btn ug-dest-scroll-btn-right${ugDestCanScrollRight ? "" : " s-scroll-btn-hidden"}`}
							aria-label="Scroll destinations right"
							aria-hidden={!ugDestCanScrollRight}
							onClick={() => scrollUgDest("right")}
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
								<path d="M9 18l6-6-6-6" />
							</svg>
						</button>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="services">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>FAQs</span>
							</div>
							<h2 className="ttl">
								University Placement <i>Questions</i>
							</h2>
						</div>
					</div>
					<div className="faq-list">
						{UG_FAQ.map((item, i) => (
							<div
								key={i}
								className={`faq-item${ugFaqOpen === i ? " open" : ""}`}
							>
								<button
									type="button"
									className="faq-header"
									onClick={() => setUgFaqOpen(ugFaqOpen === i ? null : i)}
									aria-expanded={ugFaqOpen === i}
								>
									<span className="faq-q">{item.q}</span>
									<span className="faq-chevron">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M6 9l6 6 6-6" />
										</svg>
									</span>
								</button>
								<div className="faq-content">
									<p className="faq-a">{item.a}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default UndergraduatePostgraduate;
