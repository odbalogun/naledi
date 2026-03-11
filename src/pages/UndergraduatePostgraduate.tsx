function UndergraduatePostgraduate() {
  return (
    <>
      <section className="mission">
        <div className="si">
          <div className="mission-grid">
            <div className="mi-wrap reveal">
              <div className="mi tall">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=85&fit=crop&crop=center"
                  alt="University graduation"
                />
              </div>
              <div className="mi sq">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85&fit=crop"
                  alt="Students collaborating"
                />
              </div>
              <div className="mi sq">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=85&fit=crop"
                  alt="Graduate studies"
                />
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
                Whether you&apos;re aiming for a world-class undergraduate degree or
                advancing your career with a postgraduate qualification, Naledi
                connects African students with top universities across the UK, USA,
                Canada, Australia, and beyond.
              </p>
              <p>
                We support students at every stage — from bachelor&apos;s and
                master&apos;s programmes to PhDs and professional degrees. Our
                consultants understand the distinct requirements of each level and
                help you build applications that stand out.
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
              From undergraduate applications to postgraduate research placements,
              we tailor our support to your goals.
            </p>
          </div>
          <div className="pillars" style={{ marginTop: 0 }}>
            <div className="pil reveal d1">
              <span>🎓</span>
              <h4>Undergraduate</h4>
              <p>First-degree programmes: BA, BSc, BEng and more. We help you find the right course, prepare strong applications, and secure offers from leading universities worldwide.</p>
            </div>
            <div className="pil reveal d2">
              <span>📜</span>
              <h4>Postgraduate Taught</h4>
              <p>Master&apos;s degrees (MA, MSc, MBA, LLM) and postgraduate diplomas. Strategic course selection, personal statement support, and scholarship guidance for your next step.</p>
            </div>
            <div className="pil reveal d3">
              <span>🔬</span>
              <h4>Postgraduate Research</h4>
              <p>MPhil, PhD and research-based programmes. We help you identify supervisors, refine research proposals, and navigate the application process for doctoral study.</p>
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
          <div className="dgrid">
            {[
              { img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=85&fit=crop", flag: "🇬🇧", name: "United Kingdom", count: "Russell Group & Beyond" },
              { img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=85&fit=crop", flag: "🇺🇸", name: "United States", count: "Ivy League & Top 50" },
              { img: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=85&fit=crop", flag: "🇨🇦", name: "Canada", count: "U15 & Leading Institutions" },
              { img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=800&q=85&fit=crop", flag: "🇦🇺", name: "Australia", count: "Group of Eight" },
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
    </>
  );
}

export default UndergraduatePostgraduate;
