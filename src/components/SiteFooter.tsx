import Image from "next/image";
import Link from "next/link";
import { CONTACT, SOCIALS } from "@/data/site";
import { FooterYear } from "./FooterYear";
import { SocialIcon } from "./icons";

/* Global footer — fixed structure: identity, page links (incl.
   News & Activities, Partners), socials, Terms, Privacy, copyright. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-light" href="/" aria-label="YAROTECH — home">
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
          <p className="footer-blurb">
            Premium technology procurement and deployment support for homes, facilities and
            businesses across Nigeria.
          </p>
          <ul className="social-list" aria-label="YAROTECH on social media">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="social-btn"
                >
                  <SocialIcon label={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="footer-col" aria-label="Pages">
          <h2 className="footer-heading">Pages</h2>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/who-we-are">Who We Are</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/news">News & Activities</Link></li>
            <li><Link href="/partners">Partners</Link></li>
            <li><Link href="/contact">Get in Touch</Link></li>
          </ul>
        </nav>
        <nav className="footer-col" aria-label="Services">
          <h2 className="footer-heading">Services</h2>
          <ul className="footer-links">
            <li><Link href="/services/solar">Solar Installation</Link></li>
            <li><Link href="/services/cctv">CCTV Installation</Link></li>
            <li><Link href="/services/networking">Internet Networking</Link></li>
            <li><Link href="/services/it">IT Services</Link></li>
          </ul>
        </nav>
        <div className="footer-col">
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-links footer-contact">
            <li>{CONTACT.addressShort}</li>
            <li><a href="tel:+2347075373603">+234 707 537 3603</a></li>
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© <FooterYear /> YAROTECH Network Limited. All rights reserved.</p>
          <ul className="legal-links">
            <li><Link href="/terms">Terms</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link href="/privacy">Privacy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
