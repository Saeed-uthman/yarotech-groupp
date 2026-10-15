import Link from "next/link";
import { CONTACT } from "@/data/site";
import { Reveal } from "./Reveal";

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

/* Shared legal-article layout: sticky section nav on desktop,
   compact "on this page" chips on tablet/mobile, ~65ch column,
   and a real contact callout to close. */
export function LegalPage({
  crumb,
  title,
  intro,
  sections,
}: {
  crumb: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main id="main">
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-slim">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">{crumb}</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow eyebrow-on-dark">Legal</p>
            <h1 className="page-title" id="page-title">{title}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-lede">{intro}</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="effective-date">
              Effective date: <span>[Effective date]</span>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container legal-grid">
        <Reveal>
          <nav className="legal-nav" aria-label="On this page">
            <p className="legal-nav-title">On this page</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span aria-hidden="true">{i + 1}. </span>{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
        <Reveal delay={80}>
          <article className="legal-article">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal-section" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>
                  <span aria-hidden="true">{i + 1}. </span>{s.title}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            ))}
            <aside className="card legal-contact" aria-label="Policy questions">
              <h2 className="card-title card-title-flush">Questions about this page?</h2>
              <p className="card-text">
                For clarifications, reach us on{" "}
                <a href="tel:+2347075373603">+234 707 537 3603</a> or{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> — we respond
                within one business day.
              </p>
              <Link href="/contact" className="btn btn-primary legal-cta">
                Get in Touch
              </Link>
            </aside>
          </article>
        </Reveal>
      </div>
    </main>
  );
}
