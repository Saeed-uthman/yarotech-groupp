import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, SERVICES } from "@/data/site";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Case study" };
  return {
    title: project.title,
    description: `${project.title} — ${project.short} (${project.location}, ${project.date}).`,
  };
}

/* Client type paraphrases real description text only — never names.
   Period shows the known month as-is; unknown facts are omitted. */
const CLIENT_TYPES: Record<string, string> = {
  "solar-microgrid-kano": "Commercial manufacturing facility",
  "datacenter-abuja": "Enterprise",
  "estate-surveillance-lagos": "Residential estate",
};

/* Deliverables restate the source descriptions in plain language.
   No metric cards: no outcome figures exist. */
const DELIVERABLES: Record<string, string[]> = {
  "solar-microgrid-kano": [
    "50kW solar microgrid designed and deployed end-to-end",
    "24/7 uninterrupted power for the facility",
    "Reduced diesel generator costs",
  ],
  "datacenter-abuja": [
    "High-capacity switches deployed",
    "Cabling reorganised for airflow and maintenance",
    "Redundant fibre backbone established",
  ],
  "estate-surveillance-lagos": [
    "64-channel IP surveillance across the estate",
    "Remote monitoring enabled",
    "AI-powered motion detection with weatherproof outdoor cameras",
  ],
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const service = SERVICES.find((s) => s.slug === project.service);
  const related = PROJECTS.filter((p) => p.slug !== project.slug);
  const deliverables = DELIVERABLES[project.slug] ?? [];
  const clientType = CLIENT_TYPES[project.slug];

  return (
    <main id="main">
      {/* ============ HERO ============ */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-slim">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li aria-current="page">{project.title}</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <p className="badge-row case-badges">
              <span className="badge">{project.category}</span>
              <span className="status status-done">{project.status}</span>
            </p>
            <h1 className="page-title" id="page-title">{project.title}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-lede">{project.short}</p>
          </Reveal>
        </div>
      </section>

      {/* ============ COVER ============ */}
      <div className="container">
        <Reveal>
          <Image
            className="framed case-cover"
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={630}
            priority
          />
        </Reveal>
      </div>

      {/* ============ INTRO + FACTS ============ */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container case-intro-grid">
          <Reveal>
            <p className="eyebrow">Context</p>
            <h2 className="section-title" id="intro-title">What was needed.</h2>
            <div className="prose">
              <p>{project.description}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <aside className="card facts-card" aria-label="Project facts">
              <h2 className="card-title card-title-flush">Project facts</h2>
              <dl className="facts-list">
                {service ? (
                  <div className="fact">
                    <dt>Service</dt>
                    <dd><Link href={`/services/${service.slug}`}>{service.title}</Link></dd>
                  </div>
                ) : null}
                {clientType ? (
                  <div className="fact">
                    <dt>Client type</dt>
                    <dd>{clientType}</dd>
                  </div>
                ) : null}
                <div className="fact">
                  <dt>Location</dt>
                  <dd>{project.location}</dd>
                </div>
                <div className="fact">
                  <dt>Status</dt>
                  <dd><span className="status status-done">{project.status}</span></dd>
                </div>
                <div className="fact">
                  <dt>Period</dt>
                  <dd>{project.date}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ============ STORY (placeholders — no embellished narrative) ============ */}
      <section className="section section-alt" aria-labelledby="story-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Story</p>
            <h2 className="section-title" id="story-title">How it came together.</h2>
          </Reveal>
          <div className="case-body">
            <Reveal>
              <h3>Challenge</h3>
              <p className="tbc">[Challenge detail TBC — the starting situation and constraints.]</p>
            </Reveal>
            <Reveal>
              <h3>Solution</h3>
              <p className="tbc">[Solution detail TBC — what was designed, supplied and installed.]</p>
            </Reveal>
            <Reveal>
              <h3>Outcome</h3>
              <p className="tbc">[Outcome detail TBC — handover state and support arrangement.]</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h2 className="section-title" id="gallery-title">On site.</h2>
          </Reveal>
          <Reveal>
            <Lightbox
              images={[
                {
                  src: project.image,
                  alt: project.imageAlt,
                  caption: `${project.title} — ${project.location}`,
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ RESULTS (deliverables only — no metric cards) ============ */}
      <section className="section section-alt" aria-labelledby="results-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Results</p>
            <h2 className="section-title" id="results-title">What was delivered.</h2>
          </Reveal>
          <Reveal>
            <ul className="deliver-list">
              {deliverables.map((d) => (
                <li className="deliver-item" key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ RELATED + NEXT ============ */}
      <section className="section" aria-labelledby="rel-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Keep exploring</p>
            <h2 className="section-title" id="rel-title">Related projects.</h2>
          </Reveal>
          <div className="mini-grid">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <Link className="mini-card" href={`/projects/${p.slug}`} aria-label={`Read the ${p.title} case study`}>
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
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-navy enquiry-band" aria-labelledby="band-title">
        <div className="container band-center">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Enquire</p>
            <h2 className="section-title title-on-dark" id="band-title">
              Discuss a similar project.
            </h2>
            <p className="section-sub sub-on-dark">
              Same need, different site — an engineer replies within one business day.
            </p>
            <Link href="/contact?type=project" className="btn btn-primary band-btn">Start an enquiry</Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
