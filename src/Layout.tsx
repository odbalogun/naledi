import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";

function Layout() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const closeNav = () => setIsNavOpen(false);

	return (
		<>
			<nav id="nav">
				<Link className="logo" to="/" onClick={closeNav}>
					<OptimizedImage
						src="/naledi_logo_1.png"
						alt="Naledi Education"
						className="logo-img"
					/>
				</Link>
				<button
					type="button"
					className={`nav-toggle${isNavOpen ? " open" : ""}`}
					aria-label="Toggle navigation menu"
					aria-expanded={isNavOpen}
					onClick={() => setIsNavOpen((open) => !open)}
				>
					<span />
					<span />
					<span />
				</button>
				<ul className={`nav-links${isNavOpen ? " nav-links-open" : ""}`}>
					<li>
						<NavLink to="/about" end onClick={closeNav}>
							About
						</NavLink>
					</li>
					<li>
						<NavLink to="/high-school-placement" onClick={closeNav}>
							High School Placement
						</NavLink>
					</li>
					<li>
						<NavLink to="/undergraduate-postgraduate" onClick={closeNav}>
							Undergraduate &amp; Graduate
						</NavLink>
					</li>
					<li>
						<NavLink to="/destinations" onClick={closeNav}>
							Destinations
						</NavLink>
					</li>
					<li>
						<NavLink to="/camps-seasonal-programs" onClick={closeNav}>
							Camps &amp; Programs
						</NavLink>
					</li>
					<li>
						<NavLink to="/events" onClick={closeNav}>
							Events
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact-us" className="nav-btn" onClick={closeNav}>
							Get in Touch
						</NavLink>
					</li>
				</ul>
			</nav>
			<Outlet />
			<footer>
				<div className="ft">
					<div className="fb">
						<Link to="/" className="fb-logo">
							<OptimizedImage
								src="/naledi_logo_1.png"
								alt="Naledi Education"
								className="fb-logo-img"
							/>
						</Link>
						<p>
							Guiding Africa&apos;s brightest students to the world&apos;s
							finest schools, one star at a time.
						</p>
						<div className="f-soc">
							<a
								className="fsa"
								href="https://www.linkedin.com/company/naledieducation"
								target="_blank"
								rel="noopener noreferrer"
							>
								in
							</a>
							<a
								className="fsa"
								href="https://www.instagram.com/naledi_education"
								target="_blank"
								rel="noopener noreferrer"
							>
								ig
							</a>
						</div>
					</div>
					<div className="fc">
						<h5>Services</h5>
						<ul>
							<li>
								<Link to="/high-school-placement">High School Placement</Link>
							</li>
							<li>
								<Link to="/undergraduate-postgraduate">
									Undergraduate &amp; Graduate
								</Link>
							</li>
							<li>
								<Link to="/camps-seasonal-programs">Camps &amp; Programs</Link>
							</li>
						</ul>
					</div>
					<div className="fc">
						<h5>Destinations</h5>
						<ul>
							<li>
								<a href="#">United Kingdom</a>
							</li>
							<li>
								<a href="#">United States</a>
							</li>
							<li>
								<a href="#">Canada</a>
							</li>
							<li>
								<a href="#">Australia</a>
							</li>
							<li>
								<a href="#">View All</a>
							</li>
						</ul>
					</div>
					<div className="fc">
						<h5>Company</h5>
						<ul>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/events">Events</Link>
							</li>
							<li>
								<Link to="/contact-us">Contact Us</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="fb-bot">
					<span>
						© 2026 Naledi Educational Consulting. All rights reserved.
					</span>
					<span>
						<a href="#">Privacy</a> · <a href="#">Terms</a>
					</span>
				</div>
			</footer>
		</>
	);
}

export default Layout;
