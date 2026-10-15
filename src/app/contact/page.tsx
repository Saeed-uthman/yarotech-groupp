import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactExplorer } from "@/components/ContactExplorer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Contact YAROTECH for projects, services, partnerships or general enquiries — we respond within one business day.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-slim">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Get in Touch</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title" id="page-title">Talk to an engineer.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-lede">
              Projects, services, partnerships or anything else — pick a path below or
              write directly. No map: our address is listed, and we serve all of Nigeria.
            </p>
          </Reveal>
        </div>
      </section>
      <Suspense>
        <ContactExplorer />
      </Suspense>
    </main>
  );
}
