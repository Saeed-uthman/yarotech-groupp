/* Shared site data — single source of truth for services, projects,
   team, FAQs and contact details. Detail and case-study routes map
   over these instead of duplicating markup. Real content only;
   placeholders stay bracketed. */

export type ServiceSlug = "solar" | "cctv" | "networking" | "it";

export interface Service {
  slug: ServiceSlug;
  title: string;
  benefit: string;
  scope: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
}

export const SERVICES: Service[] = [
  {
    slug: "solar",
    title: "Solar Installation",
    benefit: "Cut diesel and grid costs with power that stays on.",
    scope: "Homes and businesses cutting power costs.",
    capabilities: [
      "Residential solar systems",
      "Commercial installations",
      "Maintenance & support",
      "Energy consultation",
    ],
    image: "/assets/solar.png",
    imageAlt: "Commercial solar microgrid installation",
  },
  {
    slug: "cctv",
    title: "CCTV Installation",
    benefit: "Watch over your property around the clock, from anywhere.",
    scope: "Sites needing round-the-clock monitoring.",
    capabilities: [
      "HD security cameras",
      "Remote monitoring",
      "Motion detection",
      "Night vision systems",
    ],
    image: "/assets/cctv.png",
    imageAlt: "Estate CCTV surveillance cameras",
  },
  {
    slug: "networking",
    title: "Internet Networking",
    benefit: "Fast, reliable Wi-Fi and cabling in every room.",
    scope: "Buildings needing dependable connectivity.",
    capabilities: [
      "Network design",
      "WiFi installation",
      "Fibre optic cabling",
      "Network security",
    ],
    image: "/assets/network.png",
    imageAlt: "Enterprise datacenter network and server room",
  },
  {
    slug: "it",
    title: "IT Services",
    benefit: "Keep your systems running with engineers on call.",
    scope: "Teams needing systems support and upkeep.",
    capabilities: [
      "System maintenance",
      "IT consultancy",
      "Hardware setup",
      "Technical support",
    ],
    image: "/assets/hero.jpg",
    imageAlt: "IT systems and equipment supplied by YAROTECH",
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: "Completed" | "Ongoing";
  description: string;
  short: string;
  image: string;
  imageAlt: string;
  service: ServiceSlug;
}

export const PROJECTS: Project[] = [
  {
    slug: "solar-microgrid-kano",
    title: "50kW Commercial Solar Microgrid",
    category: "Renewable energy",
    location: "Kano State, Nigeria",
    date: "August 2025",
    status: "Completed",
    description:
      "A complete end-to-end design and deployment of a 50kW solar microgrid for a prominent commercial manufacturing facility, ensuring 24/7 uninterrupted power supply and significantly reducing diesel generator costs.",
    short:
      "End-to-end design and deployment of a 50kW solar microgrid for a commercial manufacturing facility — 24/7 power and lower diesel costs.",
    image: "/assets/solar.png",
    imageAlt: "Commercial solar microgrid installation",
    service: "solar",
  },
  {
    slug: "datacenter-abuja",
    title: "Enterprise Datacenter Network Overhaul",
    category: "Network infrastructure",
    location: "Abuja, FCT",
    date: "February 2026",
    status: "Completed",
    description:
      "Full restructuring of an enterprise server room. We deployed high-capacity switches, reorganised the cabling for optimal airflow and maintenance, and established a redundant fibre backbone.",
    short:
      "Server-room restructure with high-capacity switches and a redundant fibre backbone.",
    image: "/assets/network.png",
    imageAlt: "Enterprise datacenter network and server room",
    service: "networking",
  },
  {
    slug: "estate-surveillance-lagos",
    title: "Smart Estate Security Surveillance",
    category: "Security systems",
    location: "Lagos State, Nigeria",
    date: "November 2025",
    status: "Completed",
    description:
      "Installation of a 64-channel IP surveillance system across a luxury residential estate. Features include remote monitoring, AI-powered motion detection and weatherproof outdoor cameras.",
    short:
      "64-channel IP surveillance with remote monitoring and motion detection.",
    image: "/assets/cctv.png",
    imageAlt: "Estate CCTV surveillance cameras",
    service: "cctv",
  },
];

export interface Teammate {
  name: string;
  role: string;
  image: string;
}

export const TEAM: Teammate[] = [
  { name: "Abubakar Sammani Yaro", role: "Chief Executive Officer", image: "/assets/team/ceo.png" },
  { name: "Abubakar Alhassan", role: "Network Engineer", image: "/assets/team/network_engineer.png" },
  { name: "Abubakar Ashiru", role: "Senior Developer", image: "/assets/team/senior_developer.png" },
  { name: "Saeed Usman Abdullahi", role: "Junior Developer", image: "/assets/team/junior_developer.png" },
  { name: "Auwal Shehu", role: "Marketing Manager", image: "/assets/team/solar_installer.png" },
];

export const VALUES = [
  { title: "Integrity", text: "We supply only verified, OEM-sourced equipment with full warranty coverage." },
  { title: "Excellence", text: "Engineering-grade installations and post-deployment support across every project." },
  { title: "Customer first", text: "We design solutions around your needs, your environment and your budget." },
  { title: "Innovation", text: "Modern, efficient technology stacks built to scale with your operations." },
];

export const MISSION =
  "To deliver dependable, future-ready technology — solar, security, networking and IT — backed by world-class engineering and support, to every corner of Nigeria.";

export const VISION =
  "To be the most trusted technology partner in West Africa, enabling resilient power, secure spaces and connected operations for everyone we serve.";

export const STORY = [
  "YAROTECH was founded to bridge the gap between premium technology equipment and the engineering expertise needed to deploy it reliably. From rural solar microgrids to enterprise data rooms in Lagos and Abuja, we combine direct-from-OEM sourcing with on-the-ground delivery and installation capacity.",
  "Today we serve households, SMEs, integrators and public institutions with a single promise: every component we ship is verified, warranted and ready for mission-critical deployment.",
];

export const PROCESS_STEPS = [
  { title: "Tell us what you need", text: "Location, scope and timeline." },
  { title: "Assessment & quote", text: "Sized system, verified equipment." },
  { title: "Deployment", text: "Supply, delivery, installation." },
  { title: "Handover & docs", text: "Testing, training, paperwork." },
  { title: "Support", text: "Warranty and ongoing help." },
];

export const FAQS = [
  {
    q: "How fast do you respond to inquiries?",
    a: "We aim to respond to all inquiries within 1 business day. For urgent technical support or ongoing project matters, please call our phone line directly.",
  },
  {
    q: "Do you offer nationwide delivery?",
    a: "Yes, we deploy projects and deliver products to all 36 states in Nigeria. Delivery times and field installation schedules may vary slightly by location.",
  },
  {
    q: "Can I request a custom solar or network quote?",
    a: 'Absolutely. Please select your required "Service Type" in the form above, and describe your property size, energy, or data needs in the message details.',
  },
  {
    q: "Are your products and installations warrantied?",
    a: "All our enterprise networking gear, CCTV cameras, and solar components come with strict OEM warranties ranging from 1 to 25 years, alongside our installation guarantee.",
  },
];

export const CONTACT = {
  address: "Lokoro Plaza, A Farm Center, Kano, Nigeria — serving nationwide",
  addressShort: "Lokoro Plaza, A Farm Center, Kano, Nigeria",
  phones: ["+234 707 537 3603", "+234 814 150 6547", "+234 814 024 4774"],
  email: "support@yarotech.com.ng",
  hours: [
    "Mon – Fri: 8:00 AM – 6:00 PM",
    "Saturday: 9:00 AM – 2:00 PM",
    "Sunday: Closed",
  ],
};

export const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/2347075373603" },
  { label: "TikTok", href: "https://www.tiktok.com/@yarotechgroup" },
  { label: "Instagram", href: "https://www.instagram.com/yarotech" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/yarotech-group" },
];

export const telHref = (phone: string) => `tel:+${phone.replace(/\D/g, "")}`;

/* Activities & visits — placeholders until real visit photos and
   stories exist. image: null renders an honest grey slot; a real
   file path swaps in 1:1 with no markup changes. */
export interface Activity {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string | null;
}

export const ACTIVITIES: Activity[] = [
  {
    slug: "[activity-1]",
    title: "[Activity headline — e.g. site visit or installation milestone]",
    date: "[Date]",
    category: "[Category]",
    summary: "[One-line summary of the visit or activity.]",
    image: null,
  },
  {
    slug: "[activity-2]",
    title: "[Activity headline — e.g. site visit or installation milestone]",
    date: "[Date]",
    category: "[Category]",
    summary: "[One-line summary of the visit or activity.]",
    image: null,
  },
  {
    slug: "[activity-3]",
    title: "[Activity headline — e.g. site visit or installation milestone]",
    date: "[Date]",
    category: "[Category]",
    summary: "[One-line summary of the visit or activity.]",
    image: null,
  },
];

/* Partnerships — verified entries only. Each entry needs a name,
   a group, and a one-line relationship. Unverified names stay out
   of this list and render as [Partner logo] placeholders instead.
   Groups with zero entries are hidden by the page (never empty). */
export type PartnerGroup =
  | "strategic"
  | "distribution"
  | "brands"
  | "delivery";

export interface Partner {
  name: string;
  group: PartnerGroup;
  relationship: string;
  logo?: string;
}

export const PARTNER_GROUPS: { id: PartnerGroup; heading: string }[] = [
  { id: "strategic", heading: "Strategic Partners" },
  { id: "distribution", heading: "Authorized Distribution" },
  { id: "brands", heading: "Technology Brands" },
  { id: "delivery", heading: "Project Delivery Partners" },
];

export const PARTNERS: Partner[] = [
  // Example (do not commit unverified names):
  // { name: "[Partner name]", group: "brands", relationship: "[Relationship]" },
];
