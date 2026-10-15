"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* Fixed primary nav: Home, Who We Are, Services, Projects,
   Get in Touch (CTA). Homepage items are section anchors;
   inner pages link back to them. */
const SECTION_IDS = ["home", "who-we-are", "services", "projects", "contact"];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (pathname !== "/" || !("IntersectionObserver" in window)) {
      setActiveSection(null);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.map((id) => document.getElementById(id)).forEach((el) => {
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const isActive = (id: string) => {
    if (pathname === "/services") return id === "services";
    if (pathname === "/projects") return id === "projects";
    if (pathname === "/who-we-are") return id === "who-we-are";
    if (pathname !== "/") return false;
    return activeSection === id || (activeSection === null && id === "home");
  };

  const link = (id: string, label: string) => (
    <Link
      key={id}
      href={id === "home" ? "/" : pathname === "/" ? `#${id}` : `/#${id}`}
      data-nav={id}
      className={`nav-link${isActive(id) ? " is-active" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="YAROTECH — home">
          <Image
            src="/assets/logo.jpg"
            alt=""
            width={36}
            height={36}
            className="brand-mark"
          />
          <span className="brand-text">
            <span className="brand-name">Yarotech</span>
            <span className="brand-sub">Network Limited</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {link("home", "Home")}
          <Link
            href="/who-we-are"
            data-nav="who-we-are"
            className={`nav-link${isActive("who-we-are") ? " is-active" : ""}`}
          >
            Who We Are
          </Link>
          <Link
            href="/services"
            data-nav="services"
            className={`nav-link${isActive("services") ? " is-active" : ""}`}
          >
            Services
          </Link>
          <Link
            href="/projects"
            data-nav="projects"
            className={`nav-link${isActive("projects") ? " is-active" : ""}`}
          >
            Projects
          </Link>
          <Link href="/contact" className="btn btn-primary btn-cta">
            Get in Touch
          </Link>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-bar" aria-hidden="true" />
          <span className="menu-bar" aria-hidden="true" />
          <span className="menu-bar" aria-hidden="true" />
        </button>
      </div>
      {!open ? null : (
        <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile">
          <Link href="/" className="mobile-link" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/who-we-are" className="mobile-link" onClick={() => setOpen(false)}>Who We Are</Link>
          <Link href="/services" className="mobile-link" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/projects" className="mobile-link" onClick={() => setOpen(false)}>Projects</Link>
          <Link
            href="/contact"
            className="btn btn-primary mobile-cta"
            onClick={() => setOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      )}
    </header>
  );
}
