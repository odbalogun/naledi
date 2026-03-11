import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import UndergraduatePostgraduate from "./pages/UndergraduatePostgraduate";
import EventsGallery from "./pages/EventsGallery";
import ContactUs from "./pages/ContactUs";
import "./App.css";

const ARROW_SVG = (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
	>
		<path d="M3 8h10M7 4l4 4-4 4" />
	</svg>
);

const ICONS = {
	users: (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	),
	activity: (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
		</svg>
	),
	globe: (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	),
	calendar: (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
			<line x1="16" y1="2" x2="16" y2="6" />
			<line x1="8" y1="2" x2="8" y2="6" />
			<line x1="3" y1="10" x2="21" y2="10" />
		</svg>
	),
};

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>) {
	const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
	if (href?.startsWith("#")) {
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) target.scrollIntoView({ behavior: "smooth" });
	}
}

function App() {
	const location = useLocation();

	useEffect(() => {
		const cur = document.getElementById("cur");
		if (!cur) return;

		const onMove = (e: MouseEvent) => {
			cur.style.left = e.clientX + "px";
			cur.style.top = e.clientY + "px";
		};
		const onEnter = () => cur.classList.add("big");
		const onLeave = () => cur.classList.remove("big");

		document.addEventListener("mousemove", onMove);
		document.querySelectorAll("a,button,input").forEach((el) => {
			el.addEventListener("mouseenter", onEnter);
			el.addEventListener("mouseleave", onLeave);
		});
		return () => {
			document.removeEventListener("mousemove", onMove);
			document.querySelectorAll("a,button,input").forEach((el) => {
				el.removeEventListener("mouseenter", onEnter);
				el.removeEventListener("mouseleave", onLeave);
			});
		};
	}, []);

	useEffect(() => {
		const nav = document.getElementById("nav");
		if (!nav) return;

		const isSolidNav = ["/about", "/services", "/undergraduate-postgraduate", "/events-gallery", "/contact-us"].includes(location.pathname);
		const onScroll = () => {
			nav.classList.toggle("solid", isSolidNav || window.scrollY > 60);
		};
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [location.pathname]);

	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("on");
						obs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.1 },
		);
		document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	}, [location.pathname]);

	return (
		<>
			<div className="cursor" id="cur" />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<>
			<section className="hero">
				<div className="hero-panels">
					<div className="hero-panel p-campus">
						<img src="/images/hero_img_bg.png" alt="British Nigerian Student" />
					</div>
				</div>
				<div className="hero-stripe" />
				<div className="hero-text">
					<div className="eyebrow">
						<div className="eyebrow-rule" />
						<span>Africa&apos;s Premier School Placement Consultants</span>
					</div>
					<h1>
						Where African
						<br />
						Excellence <i>Meets</i>
						<br />
						the World&apos;s Best
						<br />
						Schools.
					</h1>
					<p>
						Naledi places exceptional African students in the world&apos;s
						finest high schools — guiding every family from first conversation
						to first day of class.
					</p>
					<div className="hero-btns">
						<a href="#cta" className="btn-fill" onClick={scrollToSection}>
							Begin the Journey
						</a>
						<a href="#mission" className="btn-ghost" onClick={scrollToSection}>
							Our Story {ARROW_SVG}
						</a>
					</div>
				</div>
				<div className="hero-caption">
					<span className="hero-caption-school">
						&quot;The finest schools in the world are waiting for Africa&apos;s
						finest students.&quot;
					</span>
					<div className="hero-caption-tag">
						<span className="hero-caption-dot" />
						350+ Students Placed Globally
					</div>
				</div>
				<div className="hero-scroll">
					<span className="hero-scroll-label">Scroll</span>
					<div className="hero-scroll-track">
						<div className="hero-scroll-thumb" />
					</div>
				</div>
				<div className="hero-stats">
					<div className="st">
						<span className="st-icon">{ICONS.users}</span>
						<div>
							<span className="sn">350+</span>
							<span className="sl">Students Placed</span>
						</div>
					</div>
					<div className="st">
						<span className="st-icon">{ICONS.activity}</span>
						<div>
							<span className="sn">96%</span>
							<span className="sl">Acceptance Rate</span>
						</div>
					</div>
					<div className="st">
						<span className="st-icon">{ICONS.globe}</span>
						<div>
							<span className="sn">28</span>
							<span className="sl">Partner Countries</span>
						</div>
					</div>
					<div className="st">
						<span className="st-icon">{ICONS.calendar}</span>
						<div>
							<span className="sn">12+</span>
							<span className="sl">Years Experience</span>
						</div>
					</div>
				</div>
			</section>

			<section className="mission" id="mission">
				<div className="si">
					<div className="mission-grid">
						<div className="mi-wrap reveal">
							<div className="mi tall">
								<img
									src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=85&fit=crop&crop=center"
									alt="Student reading"
								/>
							</div>
							<div className="mi sq">
								<img
									src="https://images.unsplash.com/photo-1543269664-7eef42226a21?w=800&q=85&fit=crop"
									alt="Students collaborating"
								/>
							</div>
							<div className="mi sq">
								<img
									src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=85&fit=crop"
									alt="Graduate student"
								/>
							</div>
							<div className="m-badge">
								<span className="m-badge-n">12+</span>
								<span className="m-badge-l">
									Years of
									<br />
									Excellence
								</span>
							</div>
						</div>
						<div className="m-copy reveal d2">
							<div className="lbl">
								<div className="lbl-line" />
								<span>Who We Are</span>
							</div>
							<h2 className="ttl">
								Opening Doors to a <i>World-Class</i> Future
							</h2>
							<br />
							<p>
								Naledi — meaning &quot;star&quot; in Sesotho — was founded on a
								simple conviction: every brilliant African student deserves a
								seat at the world&apos;s finest schools. We&apos;ve spent over a
								decade making that a reality.
							</p>
							<p>
								We&apos;re not just placement agents. We are mentors,
								strategists, and advocates who walk alongside every family from
								the first conversation to the first day of school — and beyond.
							</p>
							<blockquote>
								&quot;Africa is producing some of the world&apos;s most gifted
								young minds. Our job is simply to make sure the world sees
								them.&quot;
							</blockquote>
							<div className="pillars">
								<div className="pil">
									<span>🎯</span>
									<h4>Expert Guidance</h4>
									<p>Seasoned consultants with insider school knowledge</p>
								</div>
								<div className="pil">
									<span>🌍</span>
									<h4>Pan-African Roots</h4>
									<p>Deep understanding of African students &amp; families</p>
								</div>
								<div className="pil">
									<span>✨</span>
									<h4>Proven Results</h4>
									<p>96% acceptance rate across partner schools</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="stories" id="stories">
				<div className="s-inner">
					<div className="s-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Naledi Alumni</span>
							</div>
							<h2 className="ttl w">
								Faces of <i>Possibility</i>
							</h2>
						</div>
						<p>
							Every student we place carries a story of ambition, resilience,
							and the courage to reach beyond what was once thought possible.
						</p>
					</div>
					<div className="s-scroll">
						{[
							{
								img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=85&fit=crop&crop=top",
								country: "Nigeria → United Kingdom",
								name: "Amara O.",
								school: "Eton College · Full Scholarship",
								tag: "Class of 2023",
							},
							{
								img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&fit=crop&crop=top",
								country: "Ghana → United States",
								name: "Kofi A.",
								school: "Phillips Exeter Academy",
								tag: "Class of 2024",
							},
							{
								img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=85&fit=crop&crop=top",
								country: "South Africa → Australia",
								name: "Zola D.",
								school: "Geelong Grammar School",
								tag: "Class of 2024",
							},
							{
								img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=85&fit=crop&crop=top",
								country: "Kenya → Canada",
								name: "Aisha M.",
								school: "Upper Canada College",
								tag: "Class of 2025",
							},
							{
								img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85&fit=crop&crop=top",
								country: "Cameroon → Switzerland",
								name: "Emmanuel T.",
								school: "Institut Le Rosey",
								tag: "Class of 2025",
							},
						].map((s, i) => (
							<div key={i} className={`sc reveal d${i + 1}`}>
								<img src={s.img} alt={s.name} />
								<div className="sc-ov">
									<span className="sc-ctry">{s.country}</span>
									<div className="sc-name">{s.name}</div>
									<div className="sc-school">{s.school}</div>
								</div>
								<div className="sc-tag">{s.tag}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="services" id="services">
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
							From first assessment to settling in abroad, we handle every
							detail so your family can focus on the excitement of what lies
							ahead.
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
									We match each student&apos;s academic profile, personality,
									and ambitions to a curated shortlist of schools — then build
									applications that leave a lasting impression on admissions
									offices worldwide.
								</p>
							</div>
						</div>
						<div className="svc-gr">
							{[
								{
									icon: ICONS.users,
									title: "Interview Coaching",
									desc: "Rigorous mock interviews build confidence and communication skills to impress any admissions panel.",
								},
								{
									icon: (
										<svg viewBox="0 0 24 24">
											<rect x="1" y="4" width="22" height="16" rx="2" />
											<line x1="1" y1="10" x2="23" y2="10" />
										</svg>
									),
									title: "Scholarships & Financial Aid",
									desc: "We identify and pursue every scholarship opportunity to make an elite global education financially achievable.",
								},
								{
									icon: (
										<svg viewBox="0 0 24 24">
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
									),
									title: "Visa & Immigration",
									desc: "From documentation to embassy prep, we make student visa applications smooth and stress-free for the whole family.",
								},
								{
									icon: (
										<svg viewBox="0 0 24 24">
											<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
											<polyline points="9 22 9 12 15 12 15 22" />
										</svg>
									),
									title: "Arrival & Pastoral Care",
									desc: "We don't disappear at acceptance. Ongoing support ensures your student thrives from day one abroad.",
								},
							].map((sv, i) => (
								<div key={i} className={`sv reveal d${i + 1}`}>
									<div className="sv-ico">{sv.icon}</div>
									<h4>{sv.title}</h4>
									<p>{sv.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="destinations" id="destinations">
				<div className="si">
					<div className="d-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Where Students Go</span>
							</div>
							<h2 className="ttl">
								Top <i>Destinations</i>
							</h2>
						</div>
						<a href="#cta" onClick={scrollToSection}>
							Explore All Schools {ARROW_SVG}
						</a>
					</div>
					<div className="dgrid">
						{[
							{
								img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=85&fit=crop",
								flag: "🇬🇧",
								name: "United Kingdom",
								count: "45+ Partner Schools",
							},
							{
								img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=85&fit=crop",
								flag: "🇺🇸",
								name: "United States",
								count: "38+ Partner Schools",
							},
							{
								img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=85&fit=crop",
								flag: "🇨🇦",
								name: "Canada",
								count: "22+ Partner Schools",
							},
							{
								img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=800&q=85&fit=crop",
								flag: "🇦🇺",
								name: "Australia",
								count: "18+ Partner Schools",
							},
						].map((d, i) => (
							<div key={i} className={`dc reveal d${i + 1}`}>
								<img src={d.img} alt={d.name} />
								<div className="dc-body">
									<span className="dc-flag">{d.flag}</span>
									<div className="dc-name">{d.name}</div>
									<div className="dc-cnt">{d.count}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className="strip">
				<span className="strip-lbl">Also placing students in</span>
				<div className="strip-items">
					{[
						["🇳🇱", "Netherlands"],
						["🇨🇭", "Switzerland"],
						["🇩🇪", "Germany"],
						["🇸🇬", "Singapore"],
						["🇳🇿", "New Zealand"],
						["🇫🇷", "France"],
						["🇯🇵", "Japan"],
						["🇦🇪", "UAE"],
						["🇿🇦", "South Africa"],
					].map(([flag, name]) => (
						<div key={name} className="strip-item">
							<span>{flag}</span>
							<span>{name}</span>
						</div>
					))}
				</div>
			</div>

			<section className="process" id="process">
				<div className="si">
					<div className="proc-intro">
						<div className="reveal">
							<div className="lbl">
								<div className="lbl-line" />
								<span>How It Works</span>
							</div>
							<h2 className="ttl w">
								Five Steps to
								<br />
								Your <i>Dream School</i>
							</h2>
						</div>
						<p className="reveal d2">
							Our proven pathway has guided hundreds of students from a first
							family conversation to their first day in a world-class classroom.
							Every step is personal, every decision is yours.
						</p>
					</div>
					<div className="proc-photo reveal">
						<img
							src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=85&fit=crop&crop=center"
							alt="Diverse students collaborating"
						/>
						<div className="proc-overlay">
							<h3>&quot;The moment everything changed.&quot;</h3>
							<span>— Every Naledi Student</span>
						</div>
					</div>
					<div className="steps">
						{[
							{
								n: "1",
								title: "Free Consultation",
								desc: "We learn who your student is — their strengths, dreams, and what kind of school will help them truly flourish.",
							},
							{
								n: "2",
								title: "School Shortlist",
								desc: "A personalised list of schools, matched carefully to your child's profile and your family's priorities.",
							},
							{
								n: "3",
								title: "Application Build",
								desc: "Essays, forms, references — we craft an authentic portfolio that makes admissions officers take notice.",
							},
							{
								n: "4",
								title: "Offer & Decision",
								desc: "We help you evaluate every offer with clarity, negotiate where possible, and choose the very best fit.",
							},
							{
								n: "5",
								title: "Arrival & Beyond",
								desc: "Visa, travel, orientation — and ongoing pastoral support so your student settles in confidently.",
							},
						].map((step, i) => (
							<div key={i} className={`step reveal d${i + 1}`}>
								<div className="step-c">{step.n}</div>
								<h4>{step.title}</h4>
								<p>{step.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="testimonials" id="testimonials">
				<div className="si">
					<div className="t-head reveal">
						<div className="lbl" style={{ justifyContent: "center" }}>
							<div className="lbl-line" />
							<span>What Families Say</span>
						</div>
						<h2 className="ttl">
							Words from Our <i>Community</i>
						</h2>
					</div>
					<div className="t-feat reveal">
						<div className="t-feat-img">
							<img
								src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=900&q=85&fit=crop&crop=top"
								alt="Happy graduate"
							/>
						</div>
						<div className="t-feat-body">
							<div className="t-qm">&quot;</div>
							<p className="t-q">
								Naledi didn&apos;t just help me get into Eton — they helped me
								believe I deserved to be there. They coached me, believed in me,
								and pushed me to show the real me in my application. I&apos;ll
								carry that confidence for the rest of my life.
							</p>
							<div className="t-per">
								<div className="t-av">
									<img
										src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=85&fit=crop&crop=face"
										alt="Amara O."
									/>
								</div>
								<div>
									<span className="t-nm">Amara Okonkwo</span>
									<span className="t-rl">
										Eton College, UK · Lagos, Nigeria
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="t-row">
						<div className="t-mini reveal d1">
							<p>
								As a parent, I was overwhelmed by the whole process. Naledi
								guided our entire family with patience and expertise. Our
								daughter now thrives at Phillips Exeter — it&apos;s everything
								we dreamed of and more.
							</p>
							<div className="t-mini-f">
								<div className="t-mini-av">
									<img
										src="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=120&q=85&fit=crop&crop=face"
										alt="Farida M."
									/>
								</div>
								<div>
									<span className="t-mini-nm">Farida Mensah</span>
									<span className="t-mini-lc">
										Parent · Phillips Exeter · Accra, Ghana
									</span>
								</div>
							</div>
						</div>
						<div className="t-mini reveal d2">
							<p>
								I received a full scholarship to Geelong Grammar and I still
								can&apos;t believe it. Naledi&apos;s essay coaching and
								interview prep gave me the confidence to compete with students
								from anywhere in the world.
							</p>
							<div className="t-mini-f">
								<div className="t-mini-av">
									<img
										src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=120&q=85&fit=crop&crop=face"
										alt="Zola D."
									/>
								</div>
								<div>
									<span className="t-mini-nm">Zola Dlamini</span>
									<span className="t-mini-lc">
										Geelong Grammar, AU · Johannesburg, SA
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="cta" id="cta">
				<div className="cta-wrap">
					<img
						src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1800&q=85&fit=crop&crop=center"
						alt="African students together"
					/>
					<div className="cta-body">
						<div className="lbl">
							<div className="lbl-line" />
							<span>Take the First Step</span>
						</div>
						<h2>
							Every Star Deserves
							<br />
							to <i>Shine Globally.</i>
						</h2>
						<p>
							Book a free consultation today. No obligation — just an honest
							conversation about your child&apos;s potential and how we can help
							unlock it.
						</p>
						<form className="cta-form" onSubmit={(e) => e.preventDefault()}>
							<input type="email" placeholder="Enter your email address" />
							<button type="submit">Get Started</button>
						</form>
					</div>
				</div>
			</section>
							</>
						}
					/>
					<Route path="about" element={<About />} />
					<Route path="services" element={<Services />} />
					<Route path="undergraduate-postgraduate" element={<UndergraduatePostgraduate />} />
					<Route path="events-gallery" element={<EventsGallery />} />
					<Route path="contact-us" element={<ContactUs />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
