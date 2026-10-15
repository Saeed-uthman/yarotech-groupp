"use client";

import { useState } from "react";

type Status = { kind: "idle" } | { kind: "error" } | { kind: "sent"; name: string };

const SERVICE_OPTIONS = [
  "Solar Installation",
  "CCTV Installation",
  "Internet Networking",
  "IT Services",
  "Product supply only",
];

/* Demo form — connect to a Route Handler to receive enquiries.
   success state says what happens next; failure falls back to
   phone + email (added when the backend lands). */
export function EnquiryForm({ presetService }: { presetService?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const valid =
      name.length > 1 &&
      phone.length >= 7 &&
      message.length > 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus({ kind: "error" });
      return;
    }
    setStatus({ kind: "sent", name });
    e.currentTarget.reset();
  };

  if (status.kind === "sent") {
    return (
      <div className="card form-card" role="status">
        <h3 className="card-title card-title-flush">Enquiry ready to send</h3>
        <p className="form-hint">
          Thank you, {status.name} — this demo does not store anything yet. Wire this form to
          your backend, then confirm with a reference number here.
        </p>
        <button className="btn btn-primary" type="button" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="card form-card" onSubmit={onSubmit} noValidate>
      <h3 className="card-title card-title-flush">Send us a message</h3>
      <p className="form-hint">All fields marked * are required. Demo form — connect it to your backend to receive enquiries.</p>
      {status.kind === "error" ? (
        <p className="form-error" role="alert">
          Please complete the required fields with a valid email address.
        </p>
      ) : null}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="f-name">Full name *</label>
          <input id="f-name" name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your full name" />
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone number *</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="+234 …" />
        </div>
        <div className="field">
          <label htmlFor="f-email">Email address *</label>
          <input id="f-email" name="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="f-service">Service needed</label>
          <select id="f-service" name="service" defaultValue={presetService ?? SERVICE_OPTIONS[0]}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor="f-message">Message details *</label>
          <textarea id="f-message" name="message" rows={5} required maxLength={2000} placeholder="Tell us about your project, location, scope and timeline." />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Submit enquiry</button>
    </form>
  );
}
