import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQS, PROCESS_STEPS, PROJECTS, SERVICES, type ServiceSlug } from "@/data/site";
import { EnquiryForm } from "@/components/EnquiryForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reveal } from "@/components/Reveal";
import { ServiceEnquireBar } from "@/components/ServiceEnquireBar";
import { ServiceIcon } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: `${service.title} across Nigeria — ${service.benefit} Enquire within one business day.`,
  };
}

/* Problem framings are plain-language microcopy derived from the
   real scope — never invented claims about results. */
const PROBLEMS: Record<ServiceSlug, string> = {
  solar: "Unreliable grid power and rising diesel costs.",
  cctv: "Property left unwatched is property at risk.",
  networking: "Dead zones and dropouts slowing your home or office.",
  it: "Systems failing with nobody to call.",
};

/* Audiences grounded in About/Homepage copy only. */
const AUDIENCES = [
  { title: "Homes", text: "Households wanting dependable power, security and connectivity." },
  { title: "Businesses & SMEs", text: "Offices, shops and facilities that cannot afford downtime." },
  { title: "Estates & institutions", text: "Residential estates and public bodies running shared systems." },
];

const SUBNAV = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "service-projects", label: "Projects" },
  { id: "service-faq", label: "FAQ" },
  { id: "enquire", label: "Enquire" },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = PROJECTS.filter((p) => p.service === service.slug);
  const placeholders = Math.max(0, 3 - related.length);

  return (
    <main id="main">
      {/* ============ HERO ============ */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-grid">
          <div>
            <Reveal>
              <nav aria-label="Breadcrumb">
                <ol className="crumbs">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li aria-current="page">{service.title}</li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="page-title" id="page-title">{service.title}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="page-lede">{PROBLEMS[service.slug]} {service.benefit}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero-actions">
                <Link href="#enquire" className="btn btn-primary">Enquire About This Service</Link>
                <Link href="#service-projects" className="btn btn-ghost-on-dark">View Related Projects</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Image
              className="framed"
              src={service.image}
              alt={service.imageAlt}
              width={800}
              height={500}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* ============ STICKY IN-PAGE NAV (desktop) ============ */}
      <nav className="subnav" aria-label="On this page">
        <div className="container subnav-inner">
          {SUBNAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="subnav-link">{n.label}</a>
          ))}
        </div>
      </nav>

      {/* ============ OVERVIEW ============ */}
      <section className="section detail-anchor" id="overview" aria-labelledby="overview-title">
        <div className="container overview-grid">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="section-title" id="overview-title">{service.title}, done properly.</h2>
            <div className="prose">
              <p>{service.benefit} Every deployment uses verified, warranted equipment and is installed by YAROTECH engineers — for {service.scope.toLowerCase()} and beyond, anywhere in Nigeria.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Image
              className="framed"
              src={service.image}
              alt={service.imageAlt}
              width={800}
              height={500}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="section section-alt detail-anchor" id="capabilities" aria-labelledby="cap-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">What&apos;s included</p>
            <h2 className="section-title" id="cap-title">Capabilities.</h2>
          </Reveal>
          <div className="cap-tiles">
            {service.capabilities.map((c, i) => (
              <Reveal key={c} delay={(i % 4) * 80}>
                <div className="cap-tile">
                  <span className="icon-box icon-box-dark">
                    <ServiceIcon slug={service.slug} />
                  </span>
                  <h3 className="cap-tile-title">{c}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO THIS IS FOR (hidden when empty) ============ */}
      {AUDIENCES.length > 0 ? (
        <section className="section detail-anchor" id="who-for" aria-labelledby="who-for-title">
          <div className="container">
            <Reveal>
              <p className="eyebrow">Fit</p>
              <h2 className="section-title" id="who-for-title">Who this is for.</h2>
            </Reveal>
            <div className="card-grid">
              {AUDIENCES.map((a, i) => (
                <Reveal key={a.title} delay={i * 80}>
                  <article className="card">
                    <h3 className="card-title card-title-flush">{a.title}</h3>
                    <p className="card-text">{a.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ PROCESS ============ */}
      <section className="section section-alt" aria-label="How this service is delivered">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Delivery</p>
            <h2 className="section-title">How this service runs.</h2>
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
      <section className="section detail-anchor" id="service-projects" aria-labelledby="rel-title">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">Proof</p>
              <h2 className="section-title" id="rel-title">Related projects.</h2>
            </div>
            <Link href="/#projects" className="btn btn-outline">All projects</Link>
          </Reveal>
          <div className="mini-grid">
            {related.map((p) => (
              <Reveal key={p.slug}>
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
                    <p className="project-meta">
                      <span>{p.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.date}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
            {Array.from({ length: placeholders }).map((_, i) => (
              <Reveal key={`ph-${i}`} delay={related.length * 80 + i * 80}>
                <article className="mini-card placeholder-full" aria-label="Future project placeholder">
                  <div className="mini-body">
                    <p className="badge-row">
                      <span className="badge badge-muted">[Project category]</span>
                      <span className="status status-tbc">[Status]</span>
                    </p>
                    <h3 className="mini-title">[Project name]</h3>
                    <p className="mini-text">[A future {service.title.toLowerCase()} deployment will appear here.]</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section section-alt detail-anchor" id="service-faq" aria-labelledby="faq-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="section-title" id="faq-title">{service.title} FAQs.</h2>
          </Reveal>
          <Reveal>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ============ ENQUIRE ============ */}
      <section className="section section-navy enquiry-band detail-anchor" id="enquire" aria-labelledby="enquire-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Enquire</p>
            <h2 className="section-title title-on-dark" id="enquire-title">
              Enquire about {service.title.toLowerCase()}.
            </h2>
            <p className="section-sub sub-on-dark">
              Send the details — an engineer replies within one business day.
            </p>
          </Reveal>
          <Reveal>
            <EnquiryForm presetService={service.title} />
          </Reveal>
        </div>
      </section>

      <ServiceEnquireBar />
    </main>
  );
}
