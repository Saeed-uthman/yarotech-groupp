import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITIES, CONTACT, PROJECTS, SERVICES, telHref } from "@/data/site";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "YAROTECH — Technology Procurement and Deployment for Nigeria",
  description:
    "Solar power, security and networks, supplied and installed across Nigeria. Explore services or discuss a project — we respond within one business day.",
};

const WHY = [
  { value: "36 + FCT", title: "Nationwide delivery", text: "Tracked fulfilment to all 36 states and the FCT." },
  { value: "100%", title: "Verified stock", text: "OEM-sourced equipment with warranty cover." },
  { value: "1 day", title: "Fast response", text: "Enquiries answered within one business day." },
  { value: "Supply + install", title: "Engineers on the ground", text: "Deployment and support, not just boxes." },
];

const PROCESS = [
  { title: "Tell us what you need", text: "Location, scope and timeline." },
  { title: "Assessment & quote", text: "Sized system, verified equipment." },
  { title: "Deployment", text: "Supply, delivery, installation." },
  { title: "Handover & docs", text: "Testing, training, paperwork." },
  { title: "Support", text: "Warranty and ongoing help." },
];

export default function HomePage() {
  const [lead, ...rest] = PROJECTS;
  const minis = rest.slice(0, 2);

  return (
    <main id="main">
      {/* ============ 1. HERO (clean background image + readability scrim) ============ */}
      <section className="hero hero-bg" id="home" aria-labelledby="hero-title">
        <Image
          src="/assets/hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="hero-bg-img"
        />
        <span className="hero-scrim" aria-hidden="true" />
        <div className="container hero-content">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark">Yarotech Group — Nigeria</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero-title" id="hero-title">
                Solar power, security and networks, supplied and installed.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lede">
                One team for verified equipment and engineering deployment — in all 36 states
                and the FCT.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-actions">
                <Link href="#services" className="btn btn-primary">Explore Our Services</Link>
                <Link href="/contact?type=project" className="btn btn-ghost-on-dark">Discuss a Project</Link>
              </div>
            </Reveal>
        </div>
      </section>

      {/* ============ 2. RECENT ACTIVITIES (preview — full page at /news) ============ */}
      <section className="strip" aria-labelledby="recent-title">
        <div className="container strip-inner">
          <Reveal className="strip-head">
            <div>
              <p className="eyebrow">News & activities</p>
              <h2 className="strip-title" id="recent-title">Recent activities.</h2>
            </div>
            <Link href="/news" className="btn btn-outline strip-btn">View All Activities</Link>
          </Reveal>
          <div className="strip-grid">
            {ACTIVITIES.map((a) => (
              <Reveal key={a.slug}>
                <article className="strip-card">
                  <p className="news-meta">
                    <span className="badge badge-muted">{a.category}</span>
                    <span>{a.date}</span>
                  </p>
                  <h3 className="strip-card-title">{a.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2. WHY YAROTECH ============ */}
      <section className="trust" aria-labelledby="why-title">
        <div className="container why-wrap">
          <Reveal>
            <p className="eyebrow">Why Yarotech</p>
            <h2 className="why-title" id="why-title">A partner you can check, not just trust.</h2>
          </Reveal>
          <div className="trust-grid">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <p className="why-value">{w.value}</p>
                <h3 className="trust-title">{w.title}</h3>
                <p className="trust-text">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. SERVICES ============ */}
      <section className="section" id="services" aria-labelledby="services-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">What we offer</p>
              <h2 className="section-title" id="services-title">
                Engineering services, from procurement to deployment
              </h2>
              <p className="section-sub">
                When you need more than product supply, our technical team handles project
                execution and ongoing support.
              </p>
            </div>
            <Link href="/contact?type=service" className="btn btn-primary">Discuss your requirements</Link>
          </Reveal>
          <div className="card-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 80}>
                <Link
                  className="card service-card"
                  href={`/contact?type=service&service=${s.slug}`}
                  aria-label={`${s.title} — enquire about this service`}
                >
                  <span className="icon-box icon-box-dark">
                    <ServiceIcon slug={s.slug} />
                  </span>
                  <span className="card-title">{s.title}</span>
                  <span className="card-text clamp-2">{s.benefit}</span>
                  <span className="learn-more">Learn More <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. PROJECTS ============ */}
      <section className="section section-alt" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Our portfolio</p>
              <h2 className="section-title" id="projects-title">Featured projects</h2>
              <p className="section-sub">
                How YAROTECH is transforming homes, businesses and institutions with reliable
                technology infrastructure.
              </p>
            </div>
            <Link href="/contact?type=project" className="btn btn-primary">Start a project enquiry</Link>
          </Reveal>
          <div className="project-list">
            <Reveal>
              <article className="project project-lead">
                <div className="project-media">
                  <Image src={lead.image} alt={lead.imageAlt} width={800} height={500} loading="lazy" />
                </div>
                <div className="project-body">
                  <p className="badge-row">
                    <span className="badge">{lead.category}</span>
                    <span className="status status-done">{lead.status}</span>
                  </p>
                  <h3 className="project-title">{lead.title}</h3>
                  <p className="project-text clamp-3">{lead.short}</p>
                  <p className="project-meta">
                    <span>{lead.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lead.date}</span>
                  </p>
                  <p>
                    <Link href={`/projects/${lead.slug}`} className="btn btn-outline featured-btn">
                      View Case Study
                    </Link>
                  </p>
                </div>
              </article>
            </Reveal>
            <div className="mini-grid">
              {minis.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link
                    className="mini-card"
                    href={`/projects/${p.slug}`}
                    aria-label={`Read the ${p.title} case study`}
                  >
                    <span className="mini-media">
                      <Image src={p.image} alt="" width={800} height={500} loading="lazy" />
                    </span>
                    <span className="mini-body">
                      <span className="badge-row">
                        <span className="badge">{p.category}</span>
                        <span className="status status-done">{p.status}</span>
                      </span>
                      <span className="mini-title">{p.title}</span>
                      <span className="mini-text clamp-2">{p.short}</span>
                      <span className="project-meta">
                        <span>{p.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.date}</span>
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <article className="mini-card placeholder-full" aria-label="Future project placeholder">
                <div className="mini-body">
                  <p className="badge-row">
                    <span className="badge badge-muted">[Project category]</span>
                    <span className="status status-tbc">[Status]</span>
                  </p>
                  <h3 className="mini-title">[Project name]</h3>
                  <p className="mini-text">[Short project description — scope, outcome and location to be supplied.]</p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 5. WHO WE ARE (teaser) ============ */}
      <section className="section" id="who-we-are" aria-labelledby="who-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className="section-title" id="who-title">The team behind reliable technology.</h2>
              <p className="section-sub">
                YAROTECH bridges premium equipment and the engineering to deploy it — serving
                homes, businesses and institutions across Nigeria.
              </p>
            </div>
            <Link href="/who-we-are" className="btn btn-primary">More About Us</Link>
          </Reveal>
          <div className="card-grid">
            {[
              { title: "Our mission", text: "Dependable technology for every corner of Nigeria.", cta: "Read our direction", href: "/who-we-are#mission" },
              { title: "How we work", text: "From first message to supported system in five steps.", cta: "See the process", href: "/who-we-are#approach" },
              { title: "Our team", text: "Engineers and specialists across Nigeria.", cta: "Meet the team", href: "/who-we-are#team" },
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

      {/* ============ 6. PROCESS ============ */}
      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="section-title" id="process-title">From first message to supported system</h2>
            </div>
            <Link href="/contact" className="btn btn-primary">Get in Touch</Link>
          </Reveal>
          <Reveal>
            <ol className="steps steps-light steps-five">
            {PROCESS.map((s, i) => (
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

      {/* ============ 7. PARTNERS ============ */}
      <section className="section" id="partners" aria-labelledby="partners-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Partners</p>
              <h2 className="section-title" id="partners-title">Our ecosystem</h2>
              <p className="section-sub">
                Verified relationships only — groups with no confirmed entries stay hidden until then.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <h3 className="partner-row-title">Partners</h3>
          </Reveal>
          <Reveal>
            <ul className="logo-row" aria-label="Partner logos (to be supplied)">
              {[0, 1, 2].map((n) => (
                <li key={n} className="logo-tile" aria-hidden="true">
                  <span>[Partner logo]</span>
                  <span className="logo-rel">[Relationship]</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h3 className="partner-row-title">Technology we work with</h3>
          </Reveal>
          <Reveal>
            <ul className="logo-row" aria-label="Technology brand logos (to be supplied)">
              {[0, 1, 2].map((n) => (
                <li key={n} className="logo-tile" aria-hidden="true">
                  <span>[Partner logo]</span>
                  <span className="logo-rel">[Relationship]</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ 9. ENQUIRY BAND ============ */}
      <section className="section section-navy enquiry-band" id="contact" aria-labelledby="contact-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow eyebrow-on-dark">Get in touch</p>
              <h2 className="section-title title-on-dark" id="contact-title">Tell us what you need.</h2>
              <p className="section-sub sub-on-dark">
                For product, service, delivery or technical enquiries — our team responds within
                one business day.
              </p>
            </div>
          </Reveal>
          <div className="contact-grid">
            <Reveal>
              <aside className="card" aria-label="Contact details">
                <h3 className="card-title card-title-flush">Reach us directly</h3>
                <ul className="contact-list">
                  <li>
                    <span className="contact-label">Address</span>
                    <span className="contact-value">{CONTACT.address}</span>
                  </li>
                  {CONTACT.phones.map((p) => (
                    <li key={p}>
                      <span className="contact-label">Phone</span>
                      <a className="contact-value contact-link" href={telHref(p)}>{p}</a>
                    </li>
                  ))}
                  <li>
                    <span className="contact-label">Email</span>
                    <a className="contact-value contact-link" href={`mailto:${CONTACT.email}`}>
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
                <div className="hours">
                  <h4 className="hours-title">Business hours</h4>
                  <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
                  <p>Saturday: 9:00 AM – 2:00 PM</p>
                  <p className="muted">Sunday: Closed</p>
                </div>
              </aside>
            </Reveal>
            <Reveal delay={120}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
