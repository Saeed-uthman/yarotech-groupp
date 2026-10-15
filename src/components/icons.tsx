/* Inline stroke icons (lucide-style paths, no dependency). */

interface IconProps {
  className?: string;
}

function base(path: React.ReactNode, className?: string) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </>,
    className,
  );
}

export function CctvIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </>,
    className,
  );
}

export function NetworkIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </>,
    className,
  );
}

export function ItIcon({ className }: IconProps) {
  return base(
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2m0 16v2M9 2v2m0 16v2M2 15h2m-2-6h2M22 15h-2m2-6h-2" />
    </>,
    className,
  );
}

export function DocIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v5h5" />
      <path d="M12 18v-6m0 0-3 3m3-3 3 3" />
    </>,
    className,
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </>,
    className,
  );
}

export function TikTokIcon({ className }: IconProps) {
  return base(<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />, className);
}

export function InstagramIcon({ className }: IconProps) {
  return base(
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </>,
    className,
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>,
    className,
  );
}

export function SocialIcon({ label, className }: { label: string; className?: string }) {
  switch (label) {
    case "WhatsApp":
      return <WhatsAppIcon className={className} />;
    case "TikTok":
      return <TikTokIcon className={className} />;
    case "Instagram":
      return <InstagramIcon className={className} />;
    default:
      return <LinkedInIcon className={className} />;
  }
}

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  switch (slug) {
    case "solar":
      return <SunIcon className={className} />;
    case "cctv":
      return <CctvIcon className={className} />;
    case "networking":
      return <NetworkIcon className={className} />;
    default:
      return <ItIcon className={className} />;
  }
}
