"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Activity } from "@/data/site";

/* Manual activity slider — no autoplay, ever. Arrow buttons, dots
   and keyboard arrows; announcements via aria-live. Missing photos
   render honest grey slots, never fabricated imagery. */
export function ActivitySlider({ items }: { items: Activity[] }) {
  const [index, setIndex] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const count = items.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = items[index];

  return (
    <div
      className="slider"
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Recent activities"
      tabIndex={0}
    >
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live="polite"
      >
        {items.map((a, i) => (
          <article
            className="slide"
            key={a.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${a.title}`}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            {a.image ? (
              <Image
                src={a.image}
                alt=""
                width={1200}
                height={630}
                loading="lazy"
                className="slide-media"
              />
            ) : (
              <div className="media-empty slide-media" aria-hidden="true">
                <span>[Activity photo — visit imagery to be supplied]</span>
              </div>
            )}
            <div className="slide-body">
              <p className="news-meta">
                <span className="badge badge-muted">{a.category}</span>
                <span>{a.date}</span>
              </p>
              <h3 className="slide-title">{a.title}</h3>
              <p className="slide-text">{a.summary}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="slider-controls">
        <button
          type="button"
          className="slider-btn"
          onClick={() => go(index - 1)}
          aria-label="Previous activity"
        >
          ← Prev
        </button>
        <div className="slider-dots" role="tablist" aria-label="Choose activity">
          {items.map((a, i) => (
            <button
              key={a.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to activity ${i + 1}`}
              className={`slider-dot${i === index ? " is-active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="slider-btn"
          onClick={() => go(index + 1)}
          aria-label="Next activity"
        >
          Next →
        </button>
      </div>
      <p className="slider-count" aria-hidden="true">
        {index + 1} / {count} — {current.category}
      </p>
    </div>
  );
}
