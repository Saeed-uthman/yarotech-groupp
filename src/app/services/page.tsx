import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQS, PROCESS_STEPS, PROJECTS, SERVICES } from "@/data/site";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Solar installation, CCTV, internet networking and IT services across Nigeria — compare, check FAQs, and start an enquiry.",
};

const NEEDS = [
  { label: "Cut power costs", slug: "solar" },
  { label: "Secure a site", slug: "cctv" },
  { label: "Improve connectivity", slug: "networking" },
  { label: "Fix IT problems", slug: "it" },
];

export default function ServicesPage() {
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
                  <li aria-current="page">Services</li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="page-title" id="page-title">Services that cover your whole site.</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="page-lede">
                Power, security, connectivity and IT — supplied, installed and supported by one
                team across Nigeria.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Image
              className="framed"
              src="/assets/network.png"
              alt="Network infrastructure installed by YAROTECH engineers"
              width={800}
              height={500}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* ============ I NEED TO… ============ */}
      <section className="section" aria-labelledby="needs-title">
        <div className="container">
          <Reveal>
            <h2 className="section-title" id="needs-title">I need to…</h2>
            <ul className="need-chips">
              {NEEDS.map((n) => (
                <li key={n.slug}>
                  <Link className="chip" href={`#service-${n.slug}`}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICE GRID ============ */}
      <section className="section section-alt" aria-labelledby="grid-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">What we offer</p>
            <h2 className="section-title" id="grid-title">Compare services.</h2>
          </Reveal>
          <div className="detail-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 80}>
                {/* Detail pages now exist: cards route to them, CTAs inside drive to preselected enquiry */}
                <Link
                  className="detail-card"
                  id={`service-${s.slug}`}
                  href={`/services/${s.slug}`}
                  aria-label={`${s.title} — ${s.benefit} Learn more about this service`}
                >
                  <span className="detail-media">
                    <Image src={s.image} alt="" width={800} height={500} loading="lazy" />
                  </span>
                  <span className="detail-body">
                    <span className="icon-box icon-box-dark">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    <span className="card-title">{s.title}</span>
                    <span className="card-text">{s.benefit}</span>
                    <span className="cap-bullets">
                      {s.capabilities.slice(0, 3).map((c) => (
                        <span className="cap-bullet" key={c}>{c}</span>
                      ))}
                    </span>
                    <span className="learn-more">Learn More <span aria-hidden="true">→</span></span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="section-title" id="how-title">Five steps, same every time.</h2>
          </Reveal>
          <Reveal>
            <ol className="steps steps-light steps-five">
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

      {/* ============ RELATED PROJECTS ============ */}
      <section className="section section-alt" aria-labelledby="rel-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Proof</p>
              <h2 className="section-title" id="rel-title">Related projects.</h2>
            </div>
            {/* Related projects link to the standalone listing */}
            <Link href="/projects" className="btn btn-outline">All projects</Link>
          </Reveal>
          <div className="mini-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <article className="mini-card">
                  <div className="mini-media">
                    <Image src={p.image} alt={p.imageAlt} width={800} height={500} loading="lazy" />
                  </div>
                  <div className="mini-body">
                    <p className="badge-row">
                      <span className="badge">{p.category}</span>
                      <span className="status status-done">{p.status}</span>
                    </p>
                    <h3 className="mini-title">{p.title}</h3>
                    <p className="mini-text clamp-2">{p.short}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="section-title" id="faq-title">Service FAQs.</h2>
          </Reveal>
          <Reveal>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ============ ENQUIRY BAND ============ */}
      <section className="section section-navy enquiry-band" aria-labelledby="band-title">
        <div className="container band-center">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Enquire</p>
            <h2 className="section-title title-on-dark" id="band-title">
              Not sure which service fits? Tell us what you need.
            </h2>
            <p className="section-sub sub-on-dark">
              Describe your requirement — an engineer replies within one business day.
            </p>
            {/* Full contact page carries the enquiry with context */}
            <Link href="/contact?type=service" className="btn btn-primary band-btn">Start an enquiry</Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
