import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MISSION, PROCESS_STEPS, SERVICES, STORY, TEAM, VALUES, VISION } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { DocIcon, ServiceIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "YAROTECH's identity, capabilities, values and way of working — verified solar, security, networking and IT deployment across Nigeria.",
};

const MILESTONES = [
  { year: "[Year]", title: "[Milestone]", text: "[What happened and why it mattered.]" },
  { year: "[Year]", title: "[Milestone]", text: "[What happened and why it mattered.]" },
  { year: "[Year]", title: "[Milestone]", text: "[What happened and why it mattered.]" },
];

export default function WhoWeArePage() {
  return (
    <main id="main">
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div>
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="crumbs">
                  <li><Link href="/">Home</Link></li>
                  <li aria-current="page">Who We Are</li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="page-title" id="page-title">The team behind reliable technology.</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="page-lede">
                YAROTECH pairs verified equipment with the engineers to deploy it — for homes,
                businesses and institutions across Nigeria.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Image
              className="framed"
              src="/assets/hero.jpg"
              alt="Solar, CCTV, networking and IT systems supplied and installed by the YAROTECH team"
              width={880}
              height={660}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container overview-grid">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="section-title" id="overview-title">Premium equipment, expertly deployed.</h2>
            <div className="prose">
              {STORY.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Image
              className="framed"
              src="/assets/solar.png"
              alt="Commercial solar installation delivered by YAROTECH"
              width={800}
              height={500}
              loading="lazy"
            />
          </Reveal>
        </div>
        <div className="container">
          <Reveal>
            <p className="pull">
              Every component we ship is verified, warranted and ready for mission-critical
              deployment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ MISSION / VISION / VALUES ============ */}
      <section className="section section-alt" aria-labelledby="mission-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Direction</p>
              <h2 className="section-title" id="mission-title">Where we are headed.</h2>
            </div>
          </Reveal>
          <div className="card-grid" id="mission">
            <Reveal>
              <article className="card">
                <h3 className="card-title card-title-flush">Our mission</h3>
                <p className="card-text">{MISSION}</p>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className="card">
                <h3 className="card-title card-title-flush">Our vision</h3>
                <p className="card-text">{VISION}</p>
              </article>
            </Reveal>
          </div>
          <Reveal>
            <h3 className="sub-title" id="values">Values in practice</h3>
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <h4 className="value-title">{v.title}</h4>
                <p className="value-text">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="section" aria-labelledby="cap-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 className="section-title" id="cap-title">What we do, at a glance.</h2>
              <p className="section-sub">
                Four practice areas — each one connects straight through to its service.
              </p>
            </div>
          </Reveal>
          <div className="cap-list">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link className="cap-row" href={`/services/${s.slug}`}>
                  <span className="icon-box icon-box-dark">
                    <ServiceIcon slug={s.slug} />
                  </span>
                  <span className="cap-text">
                    <span className="cap-title">{s.title}</span>
                    <span className="cap-scope">{s.scope}</span>
                  </span>
                  <span className="cap-go" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPROACH ============ */}
      <section className="section section-alt" aria-labelledby="approach-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Way of working</p>
              <h2 className="section-title" id="approach-title">How every engagement runs.</h2>
            </div>
          </Reveal>
          <Reveal>
            <ol className="steps steps-light steps-five" id="approach">
              {PROCESS_STEPS.map((s, i) => (
                <li className="step" key={s.title}>
                  <span className="step-num" aria-hidden="true">{i + 1}</span>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-text">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ============ TIMELINE (placeholders — replace 1:1 with real data) ============ */}
      <section className="section" aria-labelledby="timeline-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Journey</p>
            <h2 className="section-title" id="timeline-title">Milestones.</h2>
            <p className="section-sub">Key moments so far — more to be confirmed.</p>
          </Reveal>
          <Reveal>
            <ol className="timeline">
              {MILESTONES.map((m, i) => (
                <li className="t-item" key={`milestone-${i}`}>
                  <span className="t-year">{m.year}</span>
                  <div className="t-body">
                    <h3 className="t-title">{m.title}</h3>
                    <p className="t-text">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="section section-alt" aria-labelledby="team-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">People</p>
            <h2 className="section-title" id="team-title">Meet our team.</h2>
            <p className="section-sub team-sub">
              The dedicated experts and engineers powering YAROTECH&apos;s vision across Nigeria.
            </p>
          </Reveal>
          <ul className="team-grid" id="team">
            {TEAM.map((t, i) => (
              <li className="teammate" key={t.name}>
                <Reveal delay={i * 80}>
                  <Image
                    src={t.image}
                    alt={`Portrait of ${t.name}`}
                    width={192}
                    height={192}
                    loading="lazy"
                    className="teammate-photo"
                  />
                  <p className="teammate-name">{t.name}</p>
                  <p className="teammate-role">{t.role}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ PROFILE DOWNLOAD (placeholder file — no fake download) ============ */}
      <section className="section" aria-labelledby="profile-title">
        <div className="container">
          <Reveal>
            <article className="card dl-card">
              <span className="icon-box icon-box-dark">
                <DocIcon />
              </span>
              <div className="dl-text">
                <h2 className="card-title card-title-flush" id="profile-title">Company profile</h2>
                <p className="card-text">
                  [Company Profile · PDF · size TBC] — the full document, available on request.
                </p>
              </div>
              <Link href="/contact" className="btn btn-primary dl-btn">Request the profile</Link>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============ NEXT STEPS ============ */}
      <section className="section section-alt" aria-label="Next steps">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Next steps</p>
              <h2 className="section-title">See what we can do for you.</h2>
            </div>
          </Reveal>
          <div className="card-grid">
            {[
              { title: "Services", text: "Solar, CCTV, networking and IT — scope, process and FAQs.", cta: "Explore services", href: "/#services" },
              { title: "Projects", text: "Delivered deployments across Nigeria, with photos.", cta: "View projects", href: "/projects" },
              { title: "Get in Touch", text: "Tell us about your requirement — reply within one business day.", cta: "Start an enquiry", href: "/contact" },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <Link className="card service-card" href={t.href}>
                  <span className="card-title">{t.title}</span>
                  <span className="card-text clamp-2">{t.text}</span>
                  <span className="learn-more">{t.cta} <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
