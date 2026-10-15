import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PARTNERS, PARTNER_GROUPS } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "YAROTECH's verified business relationships and technology ecosystem — strategic partners, distribution, brands and delivery partners.",
};

export default function PartnersPage() {
  const populated = PARTNER_GROUPS.map((g) => ({
    ...g,
    entries: PARTNERS.filter((p) => p.group === g.id),
  })).filter((g) => g.entries.length > 0);

  return (
    <main id="main">
      {/* ============ PAGE HERO ============ */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-slim">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Partners</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title" id="page-title">Relationships, stated plainly.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-lede">
              The companies we build with, distribute for, and deploy alongside — grouped by
              what each relationship actually is. Only verified entries appear below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ GROUPS (verified entries only) ============ */}
      <section className="section" aria-labelledby="groups-title">
        <div className="container">
          <Reveal>
            <h2 className="section-title" id="groups-title">Our ecosystem.</h2>
            <p className="section-sub">
              Every logo below is a confirmed relationship. Groups with no confirmed entries
              stay hidden until then.
            </p>
          </Reveal>
          {populated.length === 0 ? (
            <Reveal>
              <div className="empty-state">
                <h3 className="empty-title">Partner entries are being confirmed</h3>
                <p className="empty-text">
                  Named relationships will appear here, grouped by type, once verified —
                  never as placeholder marks.
                </p>
              </div>
            </Reveal>
          ) : (
            populated.map((g) => (
              <div key={g.id} className="partner-group">
                <Reveal>
                  <h3 className="partner-row-title">{g.heading}</h3>
                </Reveal>
                <ul className="logo-row">
                  {g.entries.map((p) => (
                    <li className="logo-tile logo-tile-real" key={p.name}>
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt={`${p.name} logo`}
                          width={280}
                          height={112}
                          loading="lazy"
                        />
                      ) : (
                        <span aria-hidden="true">[Partner logo]</span>
                      )}
                      <span className="logo-name">{p.name}</span>
                      <span className="logo-rel">{p.relationship}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
          {/* Featured collaborations slot: 2–3 story cards land here once
              partner-linked project/news stories are verified. */}
        </div>
      </section>

      {/* ============ PARTNERSHIP BAND ============ */}
      <section className="section section-navy enquiry-band" aria-labelledby="band-title">
        <div className="container band-center">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Partnerships</p>
            <h2 className="section-title title-on-dark" id="band-title">
              Discuss a partnership.
            </h2>
            <p className="section-sub sub-on-dark">
              Distribution, technology or delivery — tell us where you fit and we will take
              it from there.
            </p>
            {/* Full contact page carries the partnership context */}
            <Link href="/contact?type=partnership" className="btn btn-primary band-btn btn-full-mobile">
              Discuss a Partnership
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
