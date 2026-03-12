import { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const LOGO_SVG = (
	<svg viewBox="0 0 32 32" fill="none">
		<polygon
			points="16,1 19,11 29,11 21,17 24,27 16,21 8,27 11,17 3,11 13,11"
			fill="#c8974a"
		/>
		<circle cx="16" cy="16" r="3.5" fill="#c8974a" opacity=".65" />
	</svg>
);

function Layout() {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const closeNav = () => setIsNavOpen(false);

	return (
		<>
			<nav id="nav">
				<Link className="logo" to="/" onClick={closeNav}>
					{LOGO_SVG}
					<div>
						<span className="logo-name">Naledi</span>
						<span className="logo-sub">Educational Consulting</span>
					</div>
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
						<span className="fb-name">Naledi</span>
						<span className="fb-sub">Educational Consulting</span>
						<p>
							Guiding Africa&apos;s brightest students to the world&apos;s
							finest schools — one star at a time.
						</p>
						<div className="f-soc">
							<a className="fsa" href="#">
								in
							</a>
							<a className="fsa" href="#">
								tw
							</a>
							<a className="fsa" href="#">
								ig
							</a>
							<a className="fsa" href="#">
								fb
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
								<Link to="/about">About Naledi</Link>
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
