"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/site";
import { Reveal } from "./Reveal";

type StatusFilter = "All" | "Completed" | "Ongoing";

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
const STATUSES: StatusFilter[] = ["All", "Completed", "Ongoing"];

/* Client-side discovery over the real project data. No-JS fallback:
   every card renders server-side; filters progressively enhance. */
export function ProjectsExplorer() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDefault = category === "All" && status === "All";
  const [featured, ...rest] = PROJECTS;
  const matches = (cat: string, st: string) =>
    (category === "All" || cat === category) && (status === "All" || st === status);
  /* Filters apply to the browse grid; the featured slot stays curated. */
  const gridItems = rest.filter((p) => matches(p.category, p.status));

  const apply = (fn: () => void) => {
    fn();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoading(false), 350);
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        filterBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const closeSheet = () => {
    setSheetOpen(false);
    filterBtnRef.current?.focus();
  };

  const controls = (prefix: string) => (
    <>
      <div className="filter-group" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={`${prefix}-${c}`}
            type="button"
            className={`chip${category === c ? " is-active" : ""}`}
            aria-pressed={category === c}
            onClick={() => apply(() => setCategory(c))}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="filter-group" role="group" aria-label="Filter by status">
        {STATUSES.map((s) => (
          <button
            key={`${prefix}-${s}`}
            type="button"
            className={`chip${status === s ? " is-active" : ""}`}
            aria-pressed={status === s}
            onClick={() => apply(() => setStatus(s))}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-outline clear-btn"
        disabled={isDefault}
        onClick={() => apply(() => {
          setCategory("All");
          setStatus("All");
        })}
      >
        Clear filters
      </button>
    </>
  );

  return (
    <>
      {/* ============ FEATURED ============ */}
      <section className="section" aria-labelledby="featured-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Featured project</p>
          </Reveal>
          <Reveal>
            <article className="project project-lead featured-card">
              <div className="project-media">
                <Image src={featured.image} alt={featured.imageAlt} width={800} height={500} priority />
              </div>
              <div className="project-body">
                <p className="badge-row">
                  <span className="badge">{featured.category}</span>
                  <span className="status status-done">{featured.status}</span>
                </p>
                <h2 className="project-title" id="featured-title">{featured.title}</h2>
                <p className="project-text">{featured.description}</p>
                <p className="project-meta">
                  <span>{featured.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.date}</span>
                </p>
                {/* Case pages now exist: honest case-study destination */}
                <Link href={`/projects/${featured.slug}`} className="btn btn-primary featured-btn">
                  View Case Study
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ============ FILTERABLE GRID ============ */}
      <section className="section section-alt" aria-labelledby="grid-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Browse work</p>
            <h2 className="section-title" id="grid-title">All projects.</h2>
          </Reveal>

          {/* Desktop / tablet: inline filter row */}
          <Reveal>
            <div className="filters-inline">{controls("d")}</div>
          </Reveal>

          {/* Mobile: one Filter button → bottom sheet */}
          <div className="filters-mobile">
            <button
              ref={filterBtnRef}
              type="button"
              className="btn btn-outline filter-fab"
              aria-expanded={sheetOpen}
              aria-controls="filter-sheet"
              onClick={() => setSheetOpen(true)}
            >
              Filter{isDefault ? "" : " • active"}
            </button>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {loading ? (
              <div className="mini-grid">
                {[0, 1, 2].map((n) => (
                  <div className="mini-card skeleton-card" key={n} aria-hidden="true">
                    <div className="skeleton-media" />
                    <div className="mini-body">
                      <div className="skeleton-line" />
                      <div className="skeleton-line skeleton-short" />
                    </div>
                  </div>
                ))}
              </div>
            ) : gridItems.length === 0 ? (
              <div className="empty-state">
                <h3 className="empty-title">No projects match these filters</h3>
                <p className="empty-text">
                  Try a different category or status — our portfolio is growing.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setCategory("All");
                    setStatus("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="mini-grid">
                {gridItems.map((p) => (
                  <Link
                    className="mini-card"
                    key={p.slug}
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
                ))}
                {isDefault ? (
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
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ ENQUIRY BAND ============ */}
      <section className="section section-navy enquiry-band" aria-labelledby="band-title">
        <div className="container band-center">
          <Reveal>
            <p className="eyebrow eyebrow-on-dark">Enquire</p>
            <h2 className="section-title title-on-dark" id="band-title">
              Have a similar requirement?
            </h2>
            <p className="section-sub sub-on-dark">
              Tell us about your site and scope — an engineer replies within one business day.
            </p>
            <Link href="/contact?type=project" className="btn btn-primary band-btn">Discuss your project</Link>
          </Reveal>
        </div>
      </section>

      {/* ============ MOBILE BOTTOM SHEET ============ */}
      {sheetOpen ? (
        <div className="sheet-backdrop" onClick={closeSheet}>
          <div
            className="sheet"
            id="filter-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Filter projects"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-handle" aria-hidden="true" />
            <div className="sheet-head">
              <h2 className="sheet-title">Filter projects</h2>
              <button type="button" className="sheet-close" onClick={closeSheet} aria-label="Close filters">
                ✕
              </button>
            </div>
            {controls("m")}
            <button type="button" className="btn btn-primary sheet-apply" onClick={closeSheet}>
              Show {gridItems.length === 1 ? "1 project" : `${gridItems.length} projects`}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
