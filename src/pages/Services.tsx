function Services() {
  return (
    <>
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
              <div className="sv reveal d1">
                <div className="sv-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4>Interview Coaching</h4>
                <p>Rigorous mock interviews build confidence and communication skills to impress any admissions panel.</p>
              </div>
              <div className="sv reveal d2">
                <div className="sv-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <h4>Scholarships &amp; Financial Aid</h4>
                <p>We identify and pursue every scholarship opportunity to make an elite global education financially achievable.</p>
              </div>
              <div className="sv reveal d3">
                <div className="sv-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h4>Visa &amp; Immigration</h4>
                <p>From documentation to embassy prep, we make student visa applications smooth and stress-free for the whole family.</p>
              </div>
              <div className="sv reveal d4">
                <div className="sv-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h4>Arrival &amp; Pastoral Care</h4>
                <p>We don&apos;t disappear at acceptance. Ongoing support ensures your student thrives from day one abroad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="si">
          <div className="m-copy" style={{ maxWidth: '720px', margin: '0 auto', padding: 0, textAlign: 'center' }}>
            <div className="lbl" style={{ justifyContent: 'center' }}>
              <div className="lbl-line" />
              <span>Our Promise</span>
            </div>
            <h2 className="ttl" style={{ marginBottom: 24 }}>
              From <i>First Call</i> to First Day
            </h2>
            <p>
              Every family we serve receives the same level of attention and expertise.
              We guide you through each step with clarity, care, and a commitment to
              finding the very best fit for your child&apos;s unique potential.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
