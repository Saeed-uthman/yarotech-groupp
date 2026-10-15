"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CONTACT, FAQS, SERVICES, telHref } from "@/data/site";
import { FaqAccordion } from "./FaqAccordion";
import { Reveal } from "./Reveal";

export const ENQUIRY_TYPES = ["Project", "Service", "Partnership", "General"] as const;

const PATHWAYS = [
  { label: "Start a project", type: "project", blurb: "Sites, systems and deployments." },
  { label: "Ask about a service", type: "service", blurb: "Solar, CCTV, networking or IT." },
  { label: "Explore partnership", type: "partnership", blurb: "Distribution or collaboration." },
];

function paramType(value: string | null): string {
  const v = (value ?? "").toLowerCase();
  return ["project", "service", "partnership"].includes(v) ? v[0].toUpperCase() + v.slice(1) : "General";
}

/* Full contact experience. Query context (?type=&service=) preselects
   intent from any entry point; key-remount keeps chips in sync. */
export function ContactExplorer() {
  const search = useSearchParams();
  const type = paramType(search.get("type"));
  const serviceSlug = search.get("service") ?? "";
  const key = `${type}:${serviceSlug}`;

  return (
    <>
      <section className="section" aria-labelledby="path-title">
        <div className="container">
          <Reveal>
            <h2 className="section-title" id="path-title">Choose a path — or just write.</h2>
            <ul className="need-chips">
              {PATHWAYS.map((p) => (
                <li key={p.type}>
                  <Link
                    className="chip"
                    href={`/contact?type=${p.type}`}
                    aria-current={type.toLowerCase() === p.type ? "true" : undefined}
                    title={p.blurb}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="form-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Enquiry form</p>
            <h2 className="section-title" id="form-title">Send an enquiry.</h2>
          </Reveal>
          <div className="contact-grid contact-page-grid">
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
              <ContactForm key={key} initialType={type} serviceSlug={serviceSlug} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-faq-title">
        <div className="container narrow-col">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="section-title" id="contact-faq-title">Before you write.</h2>
          </Reveal>
          <Reveal>
            <FaqAccordion items={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "privacy", string>>;

function ContactForm({ initialType, serviceSlug }: { initialType: string; serviceSlug: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sentName, setSentName] = useState<string | null>(null);

  const serviceTitle = SERVICES.find((s) => s.slug === serviceSlug)?.title ?? "";
  const serviceOptions = [...SERVICES.map((s) => s.title), "Product supply only", "Not applicable"];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const privacy = fd.get("privacy") === "on";

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (phone && phone.length < 7) next.phone = "Phone numbers need at least 7 digits.";
    if (message.length < 4) next.message = "Please describe your requirement briefly.";
    if (!privacy) next.privacy = "Please agree to the privacy policy to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById("contact-errors")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    /* Demo path: simulate latency, then confirm. Replace with a fetch
       to a Route Handler; its catch branch should render the failure
       panel (error + phone/email fallback) instead of success. */
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentName(name);
      setErrors({});
    }, 800);
  };

  if (sentName) {
    return (
      <div className="card form-card" role="status">
        <h3 className="card-title card-title-flush">Enquiry received</h3>
        <p className="form-hint">
          Thank you, {sentName}. A confirmation is on its way, and an engineer will reply
          within one business day. For anything urgent, call {CONTACT.phones[0]}.
        </p>
        <button className="btn btn-primary" type="button" onClick={() => setSentName(null)}>
          Send another message
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form className="card form-card" onSubmit={onSubmit} noValidate>
      <h3 className="card-title card-title-flush">Send us a message</h3>
      <p className="form-hint">Required fields are marked with * (text, not color alone).</p>
      {errorCount > 0 ? (
        <p className="form-error" id="contact-errors" role="alert">
          {errorCount === 1 ? "There is 1 problem" : `There are ${errorCount} problems`} — check the
          highlighted fields below.
        </p>
      ) : null}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="c-name">Full name *</label>
          <input
            id="c-name" name="name" type="text" autoComplete="name" maxLength={120}
            placeholder="Your full name" aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "c-name-err" : undefined}
          />
          {errors.name ? <p className="field-error" id="c-name-err"><span aria-hidden="true">! </span>{errors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="c-email">Email address *</label>
          <input
            id="c-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={120}
            placeholder="you@example.com" aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "c-email-err" : undefined}
          />
          {errors.email ? <p className="field-error" id="c-email-err"><span aria-hidden="true">! </span>{errors.email}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone number (optional)</label>
          <input
            id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30}
            placeholder="+234 …" aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "c-phone-err" : undefined}
          />
          {errors.phone ? <p className="field-error" id="c-phone-err"><span aria-hidden="true">! </span>{errors.phone}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="c-type">Enquiry type *</label>
          <select id="c-type" name="type" defaultValue={initialType}>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-service">Service (if applicable)</label>
          <select id="c-service" name="service" defaultValue={serviceTitle || "Not applicable"}>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor="c-message">Message details *</label>
          <textarea
            id="c-message" name="message" rows={5} maxLength={2000}
            placeholder="Tell us about your project, location, scope and timeline."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "c-message-err" : undefined}
          />
          {errors.message ? <p className="field-error" id="c-message-err"><span aria-hidden="true">! </span>{errors.message}</p> : null}
        </div>
        <div className="field field-full">
          <label className="check-row" htmlFor="c-privacy">
            <input
              id="c-privacy" name="privacy" type="checkbox"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? "c-privacy-err" : undefined}
            />
            <span>I agree to the <Link href="/privacy">privacy policy</Link> *</span>
          </label>
          {errors.privacy ? <p className="field-error" id="c-privacy-err"><span aria-hidden="true">! </span>{errors.privacy}</p> : null}
        </div>
      </div>
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Submit enquiry"}
      </button>
      <p className="privacy-note">
        We use your details only to respond to this enquiry — nothing else.
      </p>
    </form>
  );
}
