"use client";

import { useEffect, useState } from "react";

/* Persistent mobile shortcut to the enquiry form. Hidden on
   desktop and while the form itself is on screen. */
export function ServiceEnquireBar() {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("enquire");
    if (!form || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(form);
    return () => io.disconnect();
  }, []);

  if (formVisible) return null;

  return (
    <a href="#enquire" className="enquire-bar" aria-label="Jump to the enquiry form">
      Enquire About This Service
    </a>
  );
}
