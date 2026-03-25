import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

const SUMMER_SPORTS = [
	{
		name: "Football",
		img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=85&fit=crop&crop=center",
		desc: "We work with the Steven Gerrard Academy and Nike Football Academy, among other elite programmes. Camps combine technical training, tactical development, and competitive matches for boys and girls.",
		highlight: true,
	},
	{
		name: "Tennis",
		img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=85&fit=crop&crop=center",
		desc: "Summer tennis camps at top clubs and academies in the UK and Europe. Coaching for all levels, from beginners to tournament players, with match play and fitness.",
		highlight: false,
	},
	{
		name: "Swimming",
		img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=85&fit=crop&crop=center",
		desc: "Intensive swimming programmes with certified coaches. Ideal for improving technique, building stamina, and preparing for squad or competition swimming.",
		highlight: false,
	},
	{
		name: "Athletics",
		img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=85&fit=crop&crop=center",
		desc: "Track and field camps covering sprints, middle distance, jumps, and throws. Training at facilities used by national and international athletes.",
		highlight: false,
	},
	{
		name: "Cricket",
		img: "/images/cricket.jpg",
		desc: "Cricket camps at historic grounds and schools. Batting, bowling, fielding, and game awareness with experienced coaches and regular matches.",
		highlight: false,
	},
	{
		name: "Golf",
		img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=85&fit=crop&crop=center",
		desc: "Golf academies and summer camps at quality courses. Full-swing, short game, and on-course play for juniors looking to lower their handicap.",
		highlight: false,
	},
];

const WINTER_SPORTS = [
	{
		name: "Skiing & Snowboarding",
		img: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=85&fit=crop&crop=center",
		desc: "Winter ski and snowboard camps in the Alps and North America. Tuition for all levels, from first-time skiers to advanced riders, with accommodation and lift passes.",
	},
	{
		name: "Ice Hockey",
		img: "/images/ice_hockey.jpg",
		desc: "Ice hockey camps at professional and academy facilities. Skating, stickhandling, team play, and game situations with experienced coaches.",
	},
	{
		name: "Figure Skating",
		img: "/images/figure_skating.jpg",
		desc: "Figure skating programmes for developing jumps, spins, and choreography. Camps run in partnership with rinks and clubs in the UK and Europe.",
	},
];

function CampsSeasonalPrograms() {
	return (
		<>
			{/* Hero / intro */}
			<section className="mission">
				<div className="si">
					<div className="mission-grid">
						<div className="mi-wrap reveal">
							<div className="mi tall">
								<OptimizedImage
									src="/images/football_training.jpg"
									alt="Football training"
								/>
							</div>
							<div className="mi sq">
								<OptimizedImage
									src="/images/camp_students.png"
									alt="Students at summer school"
								/>
							</div>
							<div className="mi sq">
								<OptimizedImage
									src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=85&fit=crop&crop=center"
									alt="Young athletes in training"
								/>
							</div>
						</div>
						<div className="m-copy reveal d2">
							<div className="lbl">
								<div className="lbl-line" />
								<span>Camps &amp; Seasonal Programs</span>
							</div>
							<h2 className="ttl">
								Summer Camps, <i>Summer School</i> &amp; Sport Academies
							</h2>
							<br />
							<p>
								Beyond traditional school placement, we help families access
								high-quality summer camps, academic summer schools, and
								sport-specific programmes in the UK, Europe, and North America.
							</p>
							<p>
								Whether your child wants to combine fun and friendship at a
								general summer camp, boost their grades at a summer school, or
								develop their game at a football, tennis, or winter sports
								academy, we can guide you to the right programme and support
								with applications and logistics.
							</p>
							<div className="pillars">
								<div className="pil">
									<span>🏕️</span>
									<h4>Summer Camps</h4>
									<p>
										Residential and day camps blending adventure, creativity,
										and new friendships.
									</p>
								</div>
								<div className="pil">
									<span>📚</span>
									<h4>Summer School</h4>
									<p>
										Academic programmes to strengthen grades and prepare for the
										year ahead.
									</p>
								</div>
								<div className="pil">
									<span>⚽</span>
									<h4>Sport Camps</h4>
									<p>
										Elite and development programmes in football, tennis,
										swimming, winter sports, and more.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Program overview cards */}
			<section className="program-types-section">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Program Types</span>
							</div>
							<h2 className="ttl">
								Choose the Right <i>Season</i> for Your Child
							</h2>
						</div>
						<p>
							Explore our core offerings at a glance, then dive deeper into the
							sport camps below.
						</p>
					</div>
					<div className="program-cards">
						<article className="program-card reveal d1">
							<div className="program-card-img">
								<OptimizedImage
									src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85&fit=crop&crop=center"
									alt="Summer camp group activity"
								/>
							</div>
							<div className="program-card-body">
								<h3>Summer Camps</h3>
								<p>
									Residential and day camps that blend adventure, creativity,
									and new friendships in safe, supervised environments.
								</p>
								<ul>
									<li>Outdoor, creative, and leadership activities</li>
									<li>
										Residential and day options across the UK, US, Canada, and
										Europe
									</li>
									<li>Age-appropriate programmes for children and teens</li>
								</ul>
							</div>
						</article>
						<article className="program-card reveal d2">
							<div className="program-card-img">
								<OptimizedImage
									src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=85&fit=crop&crop=center"
									alt="Students in summer school class"
								/>
							</div>
							<div className="program-card-body">
								<h3>Summer School</h3>
								<p>
									Academic programmes that strengthen core subjects, support
									exam preparation, and build study skills for the year ahead.
								</p>
								<ul>
									<li>GCSE, A-Level, and pre-university preparation</li>
									<li>English language and academic writing</li>
									<li>Study combined with excursions and social events</li>
								</ul>
							</div>
						</article>
						<article className="program-card reveal d3">
							<div className="program-card-img">
								<OptimizedImage
									src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=85&fit=crop&crop=center"
									alt="Young athletes on a football pitch"
								/>
							</div>
							<div className="program-card-body">
								<h3>Sport Camps</h3>
								<p>
									Elite and development sport programmes, from football and
									tennis to skiing and ice hockey.
								</p>
								<ul>
									<li>Summer and winter sport options</li>
									<li>Partnerships with leading academies and clubs</li>
									<li>Structured coaching, competition, and strength work</li>
								</ul>
							</div>
						</article>
					</div>
				</div>
			</section>

			{/* Football pathways feature */}
			<section className="mission football-pathways">
				<div className="si">
					<div className="camp-section-content camp-section-reverse">
						<div className="camp-section-img reveal">
							<OptimizedImage
								src="/images/football_kick.jpg"
								alt="Young footballers training on pitch"
							/>
						</div>
						<div className="camp-section-text reveal d2">
							<div className="lbl">
								<div className="lbl-line" />
								<span>Football Pathways</span>
							</div>
							<h2 className="ttl">
								Elite <i>Football</i> Camps &amp; Academies
							</h2>
							<p>
								Football is the most popular choice for many of the families we
								serve. We partner with leading academies, including the{" "}
								<strong>Steven Gerrard Academy</strong> and{" "}
								<strong>Nike Football Academy</strong>, to offer high-intensity
								camps that combine excellent coaching with strong safeguarding
								and pastoral care.
							</p>
							<p>
								Programmes are available for ambitious grassroots players
								through to serious academy prospects, with options in the UK and
								Europe. Sessions are typically led by UEFA-qualified coaches and
								include regular match play and feedback.
							</p>
							<ul className="camp-benefits">
								<li>
									Technical and tactical development in small training groups
								</li>
								<li>
									Position-specific coaching and video analysis where offered
								</li>
								<li>
									Opportunities to train in professional-standard facilities
								</li>
								<li>
									Structured schedules that balance football, recovery, and
									off-pitch learning
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Sport Camps intro */}
			<section className="services">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Sport Camps</span>
							</div>
							<h2 className="ttl">
								Summer &amp; <i>Winter</i> Sports Academies
							</h2>
						</div>
						<p>
							From football and tennis to skiing and ice hockey, we connect
							students with high-quality sport-specific camps and academies.
						</p>
					</div>

					{/* Summer Sports */}
					<h3 className="camps-subtitle reveal">Summer Sports</h3>
					<div className="sport-cards">
						{SUMMER_SPORTS.map((sport, i) => (
							<article
								key={sport.name}
								className={`sport-card reveal d${(i % 3) + 1}${sport.highlight ? " sport-card-highlight" : ""}`}
							>
								<div className="sport-card-img">
									<OptimizedImage src={sport.img} alt={sport.name} />
									<span className="sport-card-label">{sport.name}</span>
								</div>
								<div className="sport-card-body">
									<p>{sport.desc}</p>
								</div>
							</article>
						))}
					</div>

					{/* Winter Sports */}
					<h3 className="camps-subtitle reveal">Winter Sports</h3>
					<div className="sport-cards sport-cards-winter">
						{WINTER_SPORTS.map((sport, i) => (
							<article
								key={sport.name}
								className={`sport-card reveal d${(i % 3) + 1}`}
							>
								<div className="sport-card-img">
									<OptimizedImage src={sport.img} alt={sport.name} />
									<span className="sport-card-label">{sport.name}</span>
								</div>
								<div className="sport-card-body">
									<p>{sport.desc}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="mission" style={{ background: "var(--sand)" }}>
				<div className="si">
					<div
						className="m-copy reveal d2"
						style={{
							maxWidth: "720px",
							margin: "0 auto",
							textAlign: "center",
						}}
					>
						<div className="lbl" style={{ justifyContent: "center" }}>
							<div className="lbl-line" />
							<span>Next Step</span>
						</div>
						<h2 className="ttl" style={{ marginBottom: 24 }}>
							Find the Right <i>Camp</i> or Programme
						</h2>
						<p>
							Tell us your child&apos;s age, interests, and goals. We&apos;ll
							recommend summer camps, summer school options, or sport academies
							that fit, and support you through registration and travel.
						</p>
						<Link
							to="/contact-us"
							className="btn-fill"
							style={{ marginTop: 24 }}
						>
							Get in Touch
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}

export default CampsSeasonalPrograms;
