import { useEffect, useState } from "react";
import { fetchDestinationsPayload, hasCms } from "../lib/cms";
import OptimizedImage from "../components/OptimizedImage";

type PartnerSchool = {
	name: string;
	city: string;
	type: string;
	notes?: string;
};

type Destination = {
	slug: string;
	flag: string;
	name: string;
	region: string;
	visaSummary: string;
	studyPermitNotes: string;
	intakes: string;
	popularCurricula: string;
	airport: string;
	notes?: string;
	schools: PartnerSchool[];
};

const STATIC_DESTINATIONS: Destination[] = [
	{
		slug: "uk",
		flag: "🇬🇧",
		name: "United Kingdom",
		region: "Europe",
		visaSummary:
			"Students typically apply for a Child Student or Student visa, with financial proof and a CAS from the accepting school.",
		studyPermitNotes:
			"Visa applications are usually submitted online with a biometrics appointment at a local visa centre. Turnaround times range from 3–6 weeks in most African capitals.",
		intakes: "Main intakes: September; some schools offer January starts.",
		popularCurricula:
			"GCSE, A-Levels, IB, and UK independent school curricula.",
		airport: "Major hubs: London Heathrow, London Gatwick, Manchester.",
		notes:
			"The UK offers a wide range of boarding schools with strong pastoral care and diverse international communities.",
		schools: [
			{
				name: "Eton College",
				city: "Windsor",
				type: "All-boys boarding",
				notes:
					"Highly selective with a strong academic and leadership tradition.",
			},
			{
				name: "Cheltenham Ladies' College",
				city: "Cheltenham",
				type: "Girls' boarding",
			},
			{
				name: "Sevenoaks School",
				city: "Kent",
				type: "Co-educational day & boarding",
			},
		],
	},
	{
		slug: "usa",
		flag: "🇺🇸",
		name: "United States",
		region: "North America",
		visaSummary:
			"Most students travel on an F-1 student visa, supported by an I-20 form issued by the school.",
		studyPermitNotes:
			"Students must pay the SEVIS fee, schedule a consular interview, and demonstrate strong ties to their home country.",
		intakes:
			"Main intake: August/September; limited January and rolling options.",
		popularCurricula: "US High School Diploma, AP, IB, and honours programmes.",
		airport: "Major hubs: JFK, Newark, Dulles, Atlanta, Chicago O'Hare.",
		notes:
			"US boarding schools place strong emphasis on holistic development, extracurriculars, and university counselling.",
		schools: [
			{
				name: "Phillips Exeter Academy",
				city: "New Hampshire",
				type: "Co-educational boarding",
			},
			{
				name: "Phillips Academy Andover",
				city: "Massachusetts",
				type: "Co-educational boarding",
			},
			{
				name: "Choate Rosemary Hall",
				city: "Connecticut",
				type: "Co-educational day & boarding",
			},
		],
	},
	{
		slug: "canada",
		flag: "🇨🇦",
		name: "Canada",
		region: "North America",
		visaSummary:
			"International students require a Study Permit and, for minors, a custodian in Canada.",
		studyPermitNotes:
			"Canada offers the Student Direct Stream (SDS) for faster processing in select countries. Strong financial documentation is required.",
		intakes:
			"Main intake: September; some schools offer January and April intakes.",
		popularCurricula:
			"Canadian provincial diplomas, IB, and AP at some schools.",
		airport: "Major hubs: Toronto Pearson, Vancouver, Montréal-Trudeau.",
		notes:
			"Canada is known for welcoming immigration policies, safety, and excellent public and independent schools.",
		schools: [
			{
				name: "Upper Canada College",
				city: "Toronto",
				type: "Boys' day & boarding",
			},
			{
				name: "St. Michaels University School",
				city: "Victoria",
				type: "Co-educational day & boarding",
			},
			{
				name: "Ridley College",
				city: "St. Catharines",
				type: "Co-educational day & boarding",
			},
		],
	},
	{
		slug: "australia",
		flag: "🇦🇺",
		name: "Australia",
		region: "Oceania",
		visaSummary:
			"Students apply for the Subclass 500 Student visa, linked to an electronic Confirmation of Enrolment (CoE).",
		studyPermitNotes:
			"Health insurance (OSHC) is compulsory, and some students must undergo medicals before visa issuance.",
		intakes:
			"Main intakes: January and July; some schools have additional term entries.",
		popularCurricula:
			"Australian State curricula, IB, and some specialised programmes.",
		airport: "Major hubs: Sydney, Melbourne, Brisbane, Perth.",
		schools: [
			{
				name: "Geelong Grammar School",
				city: "Victoria",
				type: "Co-educational day & boarding",
			},
			{
				name: "Scotch College",
				city: "Melbourne",
				type: "Boys' day & boarding",
			},
		],
	},
	{
		slug: "switzerland",
		flag: "🇨🇭",
		name: "Switzerland",
		region: "Europe",
		visaSummary:
			"Non‑EU students generally require a long-stay student visa and residence permit.",
		studyPermitNotes:
			"Swiss schools often assist closely with cantonal authorities; processing times can be longer and vary by canton.",
		intakes: "Main intake: September; some schools offer January starts.",
		popularCurricula:
			"IB, A-Levels, US Diploma, and Swiss Matura at select schools.",
		airport: "Major hubs: Geneva, Zürich.",
		schools: [
			{
				name: "Institut Le Rosey",
				city: "Rolle / Gstaad",
				type: "Co-educational boarding",
			},
			{
				name: "Aiglon College",
				city: "Villars-sur-Ollon",
				type: "Co-educational boarding",
			},
		],
	},
	{
		slug: "netherlands",
		flag: "🇳🇱",
		name: "Netherlands",
		region: "Europe",
		visaSummary:
			"Most non‑EU students require an MVV (provisional residence permit) and residence permit sponsored by the school.",
		studyPermitNotes:
			"Schools typically submit applications directly to the Dutch Immigration and Naturalisation Service (IND).",
		intakes: "Main intake: August/September.",
		popularCurricula:
			"IB, bilingual Dutch/English programmes, and international streams.",
		airport: "Major hub: Amsterdam Schiphol.",
		schools: [
			{
				name: "United World College Maastricht",
				city: "Maastricht",
				type: "Co-educational day & boarding",
			},
		],
	},
	{
		slug: "germany",
		flag: "🇩🇪",
		name: "Germany",
		region: "Europe",
		visaSummary:
			"Students usually require a long-stay national student visa plus residence permit.",
		studyPermitNotes:
			"Some German schools require blocked accounts to demonstrate proof of funds.",
		intakes: "Main intake: August/September.",
		popularCurricula: "German Abitur, IB, and bilingual programmes.",
		airport: "Major hubs: Frankfurt, Munich, Berlin.",
		schools: [
			{
				name: "Berlin Brandenburg International School",
				city: "Berlin",
				type: "Co-educational day & boarding",
			},
		],
	},
	{
		slug: "singapore",
		flag: "🇸🇬",
		name: "Singapore",
		region: "Asia",
		visaSummary:
			"International students typically require a Student's Pass issued by the Immigration & Checkpoints Authority (ICA).",
		studyPermitNotes:
			"Applications are usually done online via the Student's Pass Online Application & Registration (SOLAR) system.",
		intakes: "Main intake: August; some schools offer January intakes.",
		popularCurricula: "IB, UK curricula, and international programmes.",
		airport: "Major hub: Singapore Changi.",
		schools: [
			{
				name: "United World College of South East Asia",
				city: "Singapore",
				type: "Co-educational day & boarding",
			},
		],
	},
	{
		slug: "uae",
		flag: "🇦🇪",
		name: "United Arab Emirates",
		region: "Middle East",
		visaSummary:
			"Students often obtain a residence visa sponsored by the school or a parent working in the UAE.",
		studyPermitNotes:
			"Visa rules can change frequently; schools typically guide families through the latest requirements.",
		intakes: "Main intake: August/September.",
		popularCurricula:
			"UK, US, IB, and Indian curricula across different schools.",
		airport: "Major hubs: Dubai, Abu Dhabi.",
		schools: [
			{
				name: "Dubai College",
				city: "Dubai",
				type: "Co-educational day",
			},
		],
	},
	{
		slug: "south-africa",
		flag: "🇿🇦",
		name: "South Africa",
		region: "Africa",
		visaSummary:
			"Non‑South African students typically require a Study Visa, often renewed annually.",
		studyPermitNotes:
			"Police clearance, medical reports, and proof of medical insurance are common requirements.",
		intakes:
			"Main intake: January; some schools have rolling or mid‑year entries.",
		popularCurricula:
			"South African NSC, IEB, Cambridge, and IB at select schools.",
		airport: "Major hubs: Johannesburg, Cape Town, Durban.",
		schools: [
			{
				name: "St. Stithians College",
				city: "Johannesburg",
				type: "Co-educational day & boarding",
			},
			{
				name: "Hilton College",
				city: "KwaZulu-Natal",
				type: "Boys' boarding",
			},
		],
	},
];

function Destinations() {
	const [openSlug, setOpenSlug] = useState<string | null>(null);
	const [destinations, setDestinations] =
		useState<Destination[]>(STATIC_DESTINATIONS);
	const [cmsError, setCmsError] = useState<string | null>(null);

	useEffect(() => {
		if (!hasCms()) return;
		let cancelled = false;
		(async () => {
			try {
				const docs = await fetchDestinationsPayload();
				if (cancelled || !docs.length) return;
				const mapped: Destination[] = docs.map((d) => ({
					slug: d.slug,
					flag: d.flag || "",
					name: d.name,
					region: d.region,
					visaSummary: d.visaSummary,
					studyPermitNotes: d.studyPermitNotes,
					intakes: d.intakes,
					popularCurricula: d.popularCurricula,
					airport: d.airport,
					notes: d.notes || undefined,
					schools: (d.schools || []).map((s) => ({
						name: s.name,
						city: s.city,
						type: s.type,
						notes: s.notes || undefined,
					})),
				}));
				setDestinations(mapped);
				setCmsError(null);
			} catch (e) {
				if (!cancelled) {
					setCmsError(
						e instanceof Error ? e.message : "Could not load destinations.",
					);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	const toggleCountry = (slug: string) => {
		setOpenSlug(openSlug === slug ? null : slug);
	};

	return (
		<section className="destinations-page">
			<div className="si">
				<div className="dest-page-head">
					<div>
						<div className="lbl">
							<div className="lbl-line" />
							<span>Global School Destinations</span>
						</div>
						<h1 className="ttl">
							Explore Where <i>Our</i> Students Go
						</h1>
					</div>
					<p>
						Browse key visa notes, practical considerations, and a curated
						selection of partner schools in each country where we regularly
						place students.
					</p>
				</div>

				<div className="dest-hero">
					<div className="dest-hero-content">
						<p>
							Naledi Education has helped students discover world-class
							educational opportunities across the globe. From historic British
							boarding schools to innovative programs in North America,
							Australia, and beyond, we guide families every step of the way.
						</p>
						<p>
							Select a country below to explore visa requirements, intake
							periods, and our partner institutions in that destination.
						</p>
					</div>
					<div className="dest-hero-image">
						<OptimizedImage
							src="/images/hero_img_bg.png"
							alt="Students studying abroad"
							priority
						/>
					</div>
				</div>

				<div className="destinations-accordion">
					{cmsError && (
						<p
							style={{
								color: "#b45309",
								marginBottom: 16,
								fontSize: "0.9rem",
							}}
						>
							Destinations CMS: {cmsError} (showing sample content)
						</p>
					)}
					{destinations.map((d) => {
						const isOpen = openSlug === d.slug;
						return (
							<div
								key={d.slug}
								className={`dest-accordion-item${isOpen ? " open" : ""}`}
							>
								<button
									type="button"
									className="dest-accordion-header"
									onClick={() => toggleCountry(d.slug)}
									aria-expanded={isOpen}
								>
									<div className="dest-accordion-title">
										<span className="dest-accordion-flag">{d.flag}</span>
										<div className="dest-accordion-meta">
											<span className="dest-accordion-name">{d.name}</span>
											<span className="dest-accordion-region">{d.region}</span>
										</div>
									</div>
									<span className="dest-accordion-chevron">
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
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</span>
								</button>

								<div className="dest-accordion-content">
									<div className="dest-accordion-body">
										<div className="dest-country-keyfacts">
											<div>
												<span className="df-label">Typical intakes</span>
												<span className="df-value">{d.intakes}</span>
											</div>
											<div>
												<span className="df-label">Popular curricula</span>
												<span className="df-value">{d.popularCurricula}</span>
											</div>
											<div>
												<span className="df-label">Nearest hubs</span>
												<span className="df-value">{d.airport}</span>
											</div>
										</div>

										<div className="dest-visa-card">
											<h3>Visa & Study Permit Overview</h3>
											<p className="dest-visa-main">{d.visaSummary}</p>
											<p className="dest-visa-notes">{d.studyPermitNotes}</p>
											{d.notes && <p className="dest-visa-extra">{d.notes}</p>}
											<p className="dest-visa-disclaimer">
												Information is indicative only and changes regularly.
												Naledi Education provides up-to-date guidance and works
												alongside families and schools on every application.
											</p>
										</div>

										<div className="dest-schools">
											<div className="dest-schools-head">
												<h3>Partner Institutions</h3>
												<span>
													Schools where our students have thrived in {d.name}.
												</span>
											</div>
											<ul className="dest-schools-list">
												{d.schools.map((s) => (
													<li key={s.name} className="dest-school">
														<div className="dest-school-main">
															<span className="dest-school-name">{s.name}</span>
															<span className="dest-school-city">
																{s.city} · {s.type}
															</span>
														</div>
														{s.notes && (
															<p className="dest-school-notes">{s.notes}</p>
														)}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Destinations;
