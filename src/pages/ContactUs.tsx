import Seo from "../components/Seo";

function ContactUs() {
	// Replace this with your real Calendly URL
	const calendlyUrl = "https://calendly.com/your-org/initial-consultation";

	return (
		<>
			<Seo
				title="Contact Us | Naledi Education"
				description="Contact Naledi Education to discuss school placement, consultations, and educational pathways for your child."
				path="/contact-us"
			/>
			{/* Intro + core contact details */}
			<section className="mission">
				<div className="si">
					<div
						className="m-copy"
						style={{
							maxWidth: "720px",
							margin: "0 auto",
							textAlign: "center",
						}}
					>
						<div className="lbl" style={{ justifyContent: "center" }}>
							<div className="lbl-line" />
							<span>Get in Touch</span>
						</div>
						<h2 className="ttl" style={{ marginBottom: 24 }}>
							Talk To <i>Us</i>
						</h2>
						<p>
							Whether you&apos;re a parent, student, or school, we&apos;d love
							to understand your goals and explore how Naledi Education can help.
						</p>
						<p style={{ marginTop: 24 }}>
							<strong>Email:</strong> info@naledieducation.com
							<br />
							<strong>Phone / WhatsApp:</strong> +234-903-165-0882
							<br />
							<strong>Hours:</strong> Monday–Friday, 9am–5pm (WAT / GMT)
						</p>

						{/* Book a call (Calendly) */}
						<div style={{ marginTop: 32 }}>
							<div
								style={{
									display: "flex",
									gap: 12,
									justifyContent: "center",
									alignItems: "center",
									flexWrap: "wrap",
								}}
							>
							<a
								href={calendlyUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-fill"
							>
								Book a Free Consultation
							</a>
								<a
									href="https://chat.whatsapp.com/J0wFd2nm5IMGZPx5LxUCDp"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-ghost"
									style={{
										color: "var(--ink)",
										border: "1px solid rgba(22,43,87,.32)",
										padding: "13px 22px",
										background: "#fff",
										borderRadius: 2,
									}}
								>
									Join Our WhatsApp Community
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact / consultation form */}
			<section className="services">
				<div className="si">
					<div className="svc-top reveal">
						<div>
							<div className="lbl">
								<div className="lbl-line" />
								<span>Contact Form</span>
							</div>
							<h2 className="ttl">
								Share Your <i>Goals</i> with Us
							</h2>
						</div>
						<p>
							Tell us a bit about your family and what you&apos;re hoping to
							achieve. We&apos;ll respond within 1–2 business days.
						</p>
					</div>

					<div
						className="m-copy reveal d2"
						style={{
							maxWidth: "720px",
							margin: "0 auto",
							padding: "32px 28px",
							background: "#fff",
							borderRadius: 4,
							boxShadow: "0 8px 30px rgba(22,43,87,.08)",
						}}
					>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								// TODO: wire up to your backend / form handler
							}}
							style={{ display: "grid", gap: 18 }}
						>
							<div style={{ display: "grid", gap: 12 }}>
								<label>
									<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
										Your Name
									</span>
									<input
										type="text"
										name="name"
										required
										style={{
											marginTop: 6,
											width: "100%",
											padding: "10px 12px",
											borderRadius: 4,
											border: "1px solid rgba(22,43,87,.15)",
											fontFamily: "inherit",
											fontSize: ".9rem",
										}}
									/>
								</label>

								<label>
									<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
										Email
									</span>
									<input
										type="email"
										name="email"
										required
										style={{
											marginTop: 6,
											width: "100%",
											padding: "10px 12px",
											borderRadius: 4,
											border: "1px solid rgba(22,43,87,.15)",
											fontFamily: "inherit",
											fontSize: ".9rem",
										}}
									/>
								</label>

								<label>
									<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
										Phone / WhatsApp (optional)
									</span>
									<input
										type="tel"
										name="phone"
										style={{
											marginTop: 6,
											width: "100%",
											padding: "10px 12px",
											borderRadius: 4,
											border: "1px solid rgba(22,43,87,.15)",
											fontFamily: "inherit",
											fontSize: ".9rem",
										}}
									/>
								</label>
							</div>

							<div
								style={{
									display: "grid",
									gap: 12,
									gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
								}}
							>
								<label>
									<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
										Student&apos;s Current Year / Grade
									</span>
									<input
										type="text"
										name="year"
										style={{
											marginTop: 6,
											width: "100%",
											padding: "10px 12px",
											borderRadius: 4,
											border: "1px solid rgba(22,43,87,.15)",
											fontFamily: "inherit",
											fontSize: ".9rem",
										}}
									/>
								</label>

								<label>
									<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
										Preferred Intake Year
									</span>
									<input
										type="text"
										name="intake"
										placeholder="e.g. 2026 / 2027"
										style={{
											marginTop: 6,
											width: "100%",
											padding: "10px 12px",
											borderRadius: 4,
											border: "1px solid rgba(22,43,87,.15)",
											fontFamily: "inherit",
											fontSize: ".9rem",
										}}
									/>
								</label>
							</div>

							<label>
								<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
									Desired Destinations / Program Type
								</span>
								<input
									type="text"
									name="destinations"
									placeholder="e.g. UK boarding, US high school, undergraduate Canada"
									style={{
										marginTop: 6,
										width: "100%",
										padding: "10px 12px",
										borderRadius: 4,
										border: "1px solid rgba(22,43,87,.15)",
										fontFamily: "inherit",
										fontSize: ".9rem",
									}}
								/>
							</label>

							<label>
								<span style={{ fontSize: ".8rem", fontWeight: 500 }}>
									Tell us about your goals
								</span>
								<textarea
									name="message"
									rows={4}
									required
									style={{
										marginTop: 6,
										width: "100%",
										padding: "10px 12px",
										borderRadius: 4,
										border: "1px solid rgba(22,43,87,.15)",
										fontFamily: "inherit",
										fontSize: ".9rem",
										resize: "vertical",
									}}
								/>
							</label>

							<p
								style={{
									fontSize: ".75rem",
									color: "var(--mid)",
									lineHeight: 1.6,
								}}
							>
								By submitting, you agree to be contacted by Naledi Education about
								educational opportunities. We never share your details with
								third parties without your consent.
							</p>

							<button
								type="submit"
								className="btn-fill"
								style={{ alignSelf: "flex-start" }}
							>
								Request a Consultation
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Reassurance / microcopy */}
			<section className="mission">
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
							<span>Our Commitment</span>
						</div>
						<h2 className="ttl" style={{ marginBottom: 18 }}>
							Every Conversation is <i>Obligation-Free</i>
						</h2>
						<p>
							We know this is one of the most important decisions your family
							will make. Our role is to listen, advise honestly, and guide you
							toward the very best fit for your child&apos;s future.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default ContactUs;
