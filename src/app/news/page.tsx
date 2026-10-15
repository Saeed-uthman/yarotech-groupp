import type { Metadata } from "next";
import Link from "next/link";
import { ACTIVITIES } from "@/data/site";
import { ActivitySlider } from "@/components/ActivitySlider";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "News & Activities",
  description:
    "Recent YAROTECH activities, site visits and milestones — photos and stories from the field.",
};

export default function NewsPage() {
  const [featured, ...rest] = ACTIVITIES;

  return (
    <main id="main">
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-slim">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">News & Activities</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title" id="page-title">Out in the field.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-lede">
              Visits, installations and milestones — recent activity first, archive below.
              Real photos replace the grey slots as stories are published.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Latest activity</p>
          </Reveal>
          <Reveal>
            <article className="project project-lead">
              <div className="project-media">
                <div className="media-empty media-tall" aria-hidden="true">
                  <span>[Activity photo — visit imagery to be supplied]</span>
                </div>
              </div>
              <div className="project-body">
                <p className="news-meta">
                  <span className="badge badge-muted">{featured.category}</span>
                  <span>{featured.date}</span>
                </p>
                <h2 className="project-title" id="featured-title">{featured.title}</h2>
                <p className="project-text">{featured.summary}</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============ SLIDES ============ */}
      <section className="section section-alt" aria-labelledby="slides-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Slides</p>
            <h2 className="section-title" id="slides-title">Recent visits.</h2>
            <p className="section-sub">
              Step through manually — buttons, dots or arrow keys. Nothing auto-plays.
            </p>
          </Reveal>
          <Reveal>
            <ActivitySlider items={ACTIVITIES} />
          </Reveal>
        </div>
      </section>

      {/* ============ ARCHIVE ============ */}
      <section className="section" aria-labelledby="archive-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Archive</p>
            <h2 className="section-title" id="archive-title">Earlier activities.</h2>
          </Reveal>
          <ul className="archive-list">
            {rest.map((a) => (
              <Reveal key={a.slug}>
                <li className="archive-item">
                  <span className="archive-date">{a.date}</span>
                  <span className="archive-text">
                    <span className="badge badge-muted">{a.category}</span>
                    <span className="archive-title">{a.title}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-navy enquiry-band" aria-labelledby="band-title">
        <div className="container band-center">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Activities</p>
            <h2 className="section-title title-on-dark" id="band-title">
              Planning a visit or joint activity?
            </h2>
            <p className="section-sub sub-on-dark">
              Tell us about it — site visits, commissioning days and community events welcome.
            </p>
            <Link href="/contact?type=general" className="btn btn-primary band-btn">Get in Touch</Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
