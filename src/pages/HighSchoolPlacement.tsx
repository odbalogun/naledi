import { useEffect, useRef, useState } from "react";

const HS_DEST_SCROLL_STEP = 296; // card min-width (280) + gap (16)
const HS_DEST_SCROLL_THRESHOLD = 5;

const HS_DESTINATIONS = [
	{
		img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=85&fit=crop",
		flag: "🇬🇧",
		name: "United Kingdom",
		count: "Selective Boarding & Day Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=900&q=85&fit=crop",
		flag: "🇺🇸",
		name: "United States",
		count: "Top Independent & Boarding Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&q=85&fit=crop",
		flag: "🇨🇦",
		name: "Canada",
		count: "Leading Day & Boarding Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=900&q=85&fit=crop",
		flag: "🇦🇺",
		name: "Australia",
		count: "High-Performing Boarding Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=85&fit=crop",
		flag: "🇳🇿",
		name: "New Zealand",
		count: "Strong Academic & Outdoor Education",
	},
	{
		img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=900&q=85&fit=crop",
		flag: "🇨🇭",
		name: "Switzerland",
		count: "IB & International Boarding Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=900&q=85&fit=crop",
		flag: "🇳🇱",
		name: "Netherlands",
		count: "IB & Bilingual Programmes",
	},
	{
		img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=85&fit=crop",
		flag: "🇩🇪",
		name: "Germany",
		count: "International & Bilingual Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=85&fit=crop",
		flag: "🇸🇬",
		name: "Singapore",
		count: "World-Class International Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85&fit=crop",
		flag: "🇦🇪",
		name: "UAE",
		count: "Dubai & Abu Dhabi International Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=85&fit=crop",
		flag: "🇿🇦",
		name: "South Africa",
		count: "Leading IEB & Independent Schools",
	},
	{
		img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=85&fit=crop",
		flag: "🇫🇷",
		name: "France",
		count: "International & Bilingual Options",
	},
];

const HS_FAQ = [
	{
		q: "When should we start the high school placement process?",
		a: "We recommend starting at least 12–18 months before your target intake (typically September). This gives time for school research, applications, entrance tests, interviews, and visa preparation. For highly selective schools, earlier engagement can be beneficial.",
	},
	{
		q: "Do you only work with top academic achievers?",
		a: "No. We work with students across a range of academic profiles. Our focus is on fit; finding schools where each student can thrive academically, socially, and personally. We support both strong performers and students still discovering their strengths.",
	},
	{
		q: "How do you help with scholarships and financial aid?",
		a: "We identify scholarship and bursary opportunities at our partner schools and guide families through application requirements. We also help you understand total costs (tuition, boarding, extras) so you can plan realistically and compare offers.",
	},
	{
		q: "What if my child needs support with visas or English?",
		a: "We support visa applications end-to-end, from documentation to embassy preparation. For English proficiency, we can recommend preparation pathways and, where needed, schools that offer English language support alongside their main curriculum.",
	},
	{
		q: "Can we choose between boarding and day schools?",
		a: "Yes. We present options across both boarding and day schools, depending on your preferences, location, and budget. Many families consider both; we help you weigh the pros and cons for your situation.",
	},
];

function HighSchoolPlacement() {
	const hsDestScrollRef = useRef<HTMLDivElement>(null);
	const [hsDestCanScrollLeft, setHsDestCanScrollLeft] = useState(false);
	const [hsDestCanScrollRight, setHsDestCanScrollRight] = useState(false);
	const [hsFaqOpen, setHsFaqOpen] = useState<number | null>(null);

	const scrollHsDest = (direction: "left" | "right") => {
		const el = hsDestScrollRef.current;
		if (!el) return;
		el.scrollBy({
			left: direction === "left" ? -HS_DEST_SCROLL_STEP : HS_DEST_SCROLL_STEP,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const el = hsDestScrollRef.current;
		if (!el) return;
		const update = () => {
			const { scrollLeft, clientWidth, scrollWidth } = el;
			setHsDestCanScrollLeft(scrollLeft > HS_DEST_SCROLL_THRESHOLD);
			setHsDestCanScrollRight(
				scrollLeft + clientWidth < scrollWidth - HS_DEST_SCROLL_THRESHOLD,
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
			{/* Hero / overview */}
			<section className="mission">
				<div className="si">
					<div className="mission-grid">
						<div className="mi-wrap reveal">
							<div className="mi tall">
								<img
									src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&q=85&fit=crop&crop=center"
									alt="African student on campus"
								/>
							</div>
							<div className="mi sq">
								<img
									src="/images/diverse_group.jpg"
									alt="Students walking on campus"
								/>
							</div>
							<div className="mi sq">
								<img
									src="/images/black_student_writing.jpg"
									alt="Graduate student"
								/>
							</div>
						</div>
						<div className="m-copy reveal d2">
							<div className="lbl">
								<div className="lbl-line" />
								<span>High School Placement</span>
							</div>
							<h2 className="ttl">
								Placing African Students in <i>World-Class</i> High Schools
							</h2>
							<br />
							<p>
								We represent foreign boarding schools, day schools, colleges and
								universities, guiding families from the first enquiry through to
								a student’s arrival on campus.
							</p>
							<p>
								We work with families across Nigeria, Ghana and the wider
								African continent seeking high-school options abroad for their
								children, typically between the ages of 10 and 18.
							</p>
							<p>
								Students may be transitioning from local curricula to IGCSE, IB,
								A-Levels or the US High School Diploma, or moving from
								international schools to more rigorous environments. Our role is
								to help you find the school that truly fits your child; not just
								the most well-known one.
							</p>
							<p>
								We focus on fit (academically, socially, and pastorally) so that
								students don&apos;t just win offers; they truly thrive in their
								new school communities.
							</p>
							<div className="pillars">
								<div className="pil">
									<span>🎓</span>
									<h4>Boarding &amp; Day Schools</h4>
									<p>
										Selective boarding and day schools across the UK, US,
										Canada, Australia and beyond.
									</p>
								</div>
								<div className="pil">
									<span>💡</span>
									<h4>Curriculum Transitions</h4>
									<p>
										Support for moves from local curricula into IGCSE, IB,
										A-Levels, and US High School Diploma pathways.
									</p>
								</div>
								<div className="pil">
									<span>🎯</span>
									<h4>Financial Planning</h4>
									<p>
										Guidance on scholarships, bursaries, and realistic budgeting
										for each destination.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* What we offer for high school placement */}
			<section className="services">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>What We Offer</span>
							</div>
							<h2 className="ttl">
								A Complete Path,
								<br />
								<i>Start to School</i>
							</h2>
						</div>
						<p>
							From school discovery to offer acceptance and arrival, we handle
							each detail so your family can focus on the excitement of what
							lies ahead.
						</p>
					</div>
					<div className="svc-lay">
						<div className="svc-feat reveal">
							<img
								src="https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=900&q=85&fit=crop"
								alt="Student application"
							/>
							<div className="svc-ft">
								<span className="svc-ft-n">01</span>
								<h3>School Selection &amp; Application Strategy</h3>
								<p>
									We match each student&apos;s academic profile, personality and
									ambitions to a curated shortlist of high schools, then shape
									applications that tell a clear, compelling story across forms,
									essays and recommendations.
								</p>
							</div>
						</div>
						<div className="svc-gr">
							<div className="sv reveal d1">
								<div className="sv-ico">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									>
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
										<circle cx="9" cy="7" r="4" />
										<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
									</svg>
								</div>
								<h4>Profile Prep &amp; Interview Coaching</h4>
								<p>
									We prepare students for high school admissions by aligning
									their academic and extracurricular profile, verifying key
									academic documents and running rigorous mock interviews
									tailored to each school&apos;s style.
								</p>
							</div>
							<div className="sv reveal d2">
								<div className="sv-ico">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									>
										<rect x="1" y="4" width="22" height="16" rx="2" />
										<line x1="1" y1="10" x2="23" y2="10" />
									</svg>
								</div>
								<h4>Scholarships, Bursaries &amp; Fees</h4>
								<p>
									We identify and pursue scholarship and bursary opportunities,
									helping families plan realistically for tuition, boarding and
									living costs across different destinations.
								</p>
							</div>
							<div className="sv reveal d3">
								<div className="sv-ico">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									>
										<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
										<circle cx="12" cy="10" r="3" />
									</svg>
								</div>
								<h4>Visa, Travel &amp; Insurance</h4>
								<p>
									From documentation checklists to embassy preparation, we guide
									families through visa applications, travel arrangements and
									student medical insurance so arrivals are smooth, not
									stressful.
								</p>
							</div>
							<div className="sv reveal d4">
								<div className="sv-ico">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									>
										<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
										<polyline points="9 22 9 12 15 12 15 22" />
									</svg>
								</div>
								<h4>Accommodation &amp; Post-Arrival Support</h4>
								<p>
									We coordinate boarding or trusted host-family arrangements and
									provide ongoing check-ins after arrival so students are safe,
									supported and able to thrive in their new environment.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Destinations for high school students */}
			<section className="bg-sand">
				<div className="si">
					<div className="d-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>High School Destinations</span>
							</div>
							<h2 className="ttl">
								Where Our <i>High School</i> Students Go
							</h2>
						</div>
					</div>
					<div className="hs-dest-scroll-wrap">
						<button
							type="button"
							className={`hs-dest-scroll-btn hs-dest-scroll-btn-left${hsDestCanScrollLeft ? "" : " s-scroll-btn-hidden"}`}
							aria-label="Scroll destinations left"
							aria-hidden={!hsDestCanScrollLeft}
							onClick={() => scrollHsDest("left")}
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
						<div className="hs-dest-scroll" ref={hsDestScrollRef}>
							{HS_DESTINATIONS.map((d, i) => (
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
							className={`hs-dest-scroll-btn hs-dest-scroll-btn-right${hsDestCanScrollRight ? "" : " s-scroll-btn-hidden"}`}
							aria-label="Scroll destinations right"
							aria-hidden={!hsDestCanScrollRight}
							onClick={() => scrollHsDest("right")}
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

			{/* High school process – timeline style */}
			<section className="process">
				<div className="si">
					<div className="reveal">
						<div className="lbl">
							<div className="lbl-line" />
							<span>How It Works</span>
						</div>
						<h2 className="ttl w">
							A Clear, Five-Step <i>Pathway</i> to the Right School
						</h2>
						<p
							style={{
								color: "rgba(255,255,255,.72)",
								marginTop: 16,
								maxWidth: 640,
							}}
						>
							Our high school placement pathway is simple and structured, but
							never one-size-fits-all. Every step is designed to reduce stress
							for families while giving students the space and support they need
							to shine.
						</p>
					</div>

					<div className="hs-process-grid">
						{[
							{
								n: "01",
								title: "Discovery & Family Consultation",
								desc: "We begin with a detailed conversation to understand your child, your family values and your goals. We discuss timelines, budgets, preferred destinations and the kind of environment where your child is likely to flourish.",
							},
							{
								n: "02",
								title: "Profile Review & School Shortlist",
								desc: "We review academic records, extracurriculars, interests and personality. Based on this, we build a personalised shortlist of schools – balancing ambition with realism and always prioritising fit over prestige alone.",
							},
							{
								n: "03",
								title: "Applications, Essays & Interviews",
								desc: "We coordinate the application process: forms, essays, recommendations and references. Students receive coaching for admissions interviews and, where required, preparation for entrance tests.",
							},
							{
								n: "04",
								title: "Offers, Scholarships & Decision",
								desc: "When offers arrive, we help your family compare options clearly – academic strength, pastoral care, financial packages, boarding vs day, and long-term pathways – and advise on scholarships and bursaries where possible.",
							},
							{
								n: "05",
								title: "Visa, Travel & Ongoing Support",
								desc: "Once a decision is made, we support visa applications, travel arrangements and pre-departure briefing. After arrival, we remain available to both students and parents as a familiar point of contact.",
							},
						].map((step, i) => (
							<div
								key={step.title}
								className={`hs-process-step reveal d${i + 1}`}
							>
								<div className="hs-step-number">{step.n}</div>
								<div className="hs-step-body">
									<h4>{step.title}</h4>
									<p>{step.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* High school testimonials – compact cards */}
			<section className="mission">
				<div className="si">
					<div
						className="m-copy reveal"
						style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}
					>
						<div className="lbl" style={{ justifyContent: "center" }}>
							<div className="lbl-line" />
							<span>High School Stories</span>
						</div>
						<h2 className="ttl" style={{ marginBottom: 18 }}>
							What Families &amp; <i>Students</i> Say
						</h2>
						<p>
							A few words from parents and students who have trusted Naledi with
							their high school journeys.
						</p>
					</div>

					<div className="hs-testimonials-grid">
						<div className="t-mini reveal d1">
							<p>
								As parents, we were overwhelmed by the number of boarding school
								options in the UK and Canada. Naledi helped us understand which
								schools would truly fit our son, not just look impressive on
								paper. They guided us through every form, every interview and
								every deadline.
							</p>
							<div className="t-mini-f">
								<div className="t-mini-av">
									<img
										src="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=120&q=85&fit=crop&crop=face"
										alt="Parent"
									/>
								</div>
								<div>
									<span className="t-mini-nm">Mr &amp; Mrs A.</span>
									<span className="t-mini-lc">
										Parents · UK Boarding Placement · Lagos, Nigeria
									</span>
								</div>
							</div>
						</div>

						<div className="t-mini reveal d2">
							<p>
								I always dreamed of attending a top boarding school but I
								didn&apos;t know how to compete with students from all over the
								world. Naledi helped me tell my story honestly in my essays and
								gave me the confidence to speak up in my interviews.
							</p>
							<div className="t-mini-f">
								<div className="t-mini-av">
									<img
										src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=85&fit=crop&crop=face"
										alt="Student"
									/>
								</div>
								<div>
									<span className="t-mini-nm">Amara O.</span>
									<span className="t-mini-lc">
										Student · UK Boarding School · Full Scholarship
									</span>
								</div>
							</div>
						</div>

						<div className="t-mini reveal d3">
							<p>
								Naledi doesn&apos;t just chase offers; they helped us choose the
								right school for our daughter. We felt seen and heard at every
								step, and she is now thriving in a community that understands
								and celebrates who she is.
							</p>
							<div className="t-mini-f">
								<div className="t-mini-av">
									<img
										src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=120&q=85&fit=crop&crop=face"
										alt="Parent"
									/>
								</div>
								<div>
									<span className="t-mini-nm">Mrs K., Accra</span>
									<span className="t-mini-lc">
										Parent · Canadian Day School Placement
									</span>
								</div>
							</div>
						</div>
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
								High School Placement <i>Questions</i>
							</h2>
						</div>
					</div>
					<div className="faq-list">
						{HS_FAQ.map((item, i) => (
							<div
								key={i}
								className={`faq-item${hsFaqOpen === i ? " open" : ""}`}
							>
								<button
									type="button"
									className="faq-header"
									onClick={() => setHsFaqOpen(hsFaqOpen === i ? null : i)}
									aria-expanded={hsFaqOpen === i}
								>
									<span className="faq-q">{item.q}</span>
									<span className="faq-chevron">
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

			{/* CTA to contact */}
			<section className="bg-sand">
				<div className="si">
					<div
						className="m-copy reveal d2"
						style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}
					>
						<div className="lbl" style={{ justifyContent: "center" }}>
							<div className="lbl-line" />
							<span>Start the Journey</span>
						</div>
						<h2 className="ttl" style={{ marginBottom: 18 }}>
							Book a High School <i>Placement</i> Consultation
						</h2>
						<p>
							If you&apos;re considering a world-class high school education for
							your child, we&apos;d love to understand your goals and explore
							the options together.
						</p>
						<a
							href="/contact-us"
							className="btn-fill"
							style={{ marginTop: 24 }}
						>
							Talk To Us
						</a>
					</div>
				</div>
			</section>
		</>
	);
}

export default HighSchoolPlacement;
