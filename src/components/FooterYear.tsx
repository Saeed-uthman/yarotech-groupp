"use client";

import { useEffect, useState } from "react";

/* Copyright year must render on the client: server prerendering
   rejects `new Date()` as an unstable value. */
export function FooterYear() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <span>{year ?? "2026"}</span>;
}
