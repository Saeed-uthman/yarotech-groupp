"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

/* Accessible lightbox: arrow-key navigation, visible close,
   focus into the dialog on open and back to the thumbnail on close.
   Grey placeholder slots are rendered by the caller, never as items. */
export function Lightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length, close]);

  const open = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="gallery-thumb"
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setOpenIndex(i);
            }}
            aria-label={`Open image: ${img.caption}`}
          >
            <Image src={img.src} alt={img.alt} width={800} height={500} loading="lazy" />
            <span className="gallery-caption">{img.caption}</span>
          </button>
        ))}
        <div className="media-empty media-card" aria-hidden="true">
          <span>[Project photo]</span>
        </div>
        <div className="media-empty media-card" aria-hidden="true">
          <span>[Project photo]</span>
        </div>
      </div>
      {open ? (
        <div className="lightbox-backdrop" onClick={close}>
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${open.caption}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className="lightbox-close"
              onClick={close}
              aria-label="Close image viewer"
            >
              ✕ Close
            </button>
            <Image
              src={open.src}
              alt={open.alt}
              width={1200}
              height={750}
              className="lightbox-img"
            />
            <div className="lightbox-bar">
              {images.length > 1 ? (
                <button
                  type="button"
                  className="lightbox-nav"
                  onClick={() =>
                    setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
                  }
                  aria-label="Previous image"
                >
                  ← Prev
                </button>
              ) : null}
              <p className="lightbox-caption">{open.caption}</p>
              {images.length > 1 ? (
                <button
                  type="button"
                  className="lightbox-nav"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))}
                  aria-label="Next image"
                >
                  Next →
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
