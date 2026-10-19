# YAROTECH Corporate Website

Corporate site for **YAROTECH Group** — verified solar, CCTV, networking and IT equipment supplied, installed and supported across all 36 states of Nigeria and the FCT.

Built as a fully static Next.js App Router site: one HTML file per route, hostable on any static host.

## Tech Stack

| Layer      | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | Next.js 16.4.1 (App Router, static export)        |
| UI         | React 19.3, hand-written CSS (`globals.css`)      |
| Language   | TypeScript 5 (strict)                             |
| Fonts      | `next/font` — Inter + Space Grotesk               |
| Images     | `next/image` with `unoptimized` (export mode)     |

No CSS framework, no runtime dependencies beyond React/Next.

## Getting Started

Requires **Node.js >= 20.9**.

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Development server with hot reload                |
| `npm run build` | Production build; static site emitted to `out/`   |

`npm run start` is not usable with `output: "export"` — Next.js will refuse to start. To preview the production build locally, serve the static output instead:

```bash
npx serve out
```

## Routes

| Route                | Page                                                          |
| -------------------- | ------------------------------------------------------------- |
| `/`                  | Homepage — hero, services, featured projects, process, enquiry |
| `/who-we-are`        | Company story, mission, vision, values, team                  |
| `/services`          | Service overview (solar, CCTV, networking, IT)                |
| `/services/[slug]`   | Service detail: capabilities, related projects, FAQ, enquiry  |
| `/projects`          | Project explorer with category and status filters             |
| `/projects/[slug]`   | Case study with image lightbox                                |
| `/partners`          | Partner groups (empty groups stay hidden)                     |
| `/news`              | Activities and site-visit stories with slider                 |
| `/contact`           | Contact explorer — phones, email, hours, map, enquiry form    |
| `/privacy`, `/terms` | Legal pages                                                   |

Service and project detail routes are statically generated from data via `generateStaticParams` with `dynamicParams = false` — unknown slugs 404.

## Project Structure

```
src/
  app/            # App Router pages (layout, routes, globals.css)
  components/     # Client/server components (explorers, forms, slider, lightbox…)
  data/site.ts    # Single source of truth for all site content
public/
  assets/         # Images: hero, service imagery, team photos
```

## Editing Content

All copy and structured data live in **`src/data/site.ts`**:

- `SERVICES`, `PROJECTS` — drives service/project pages, params and cross-links
- `TEAM`, `VALUES`, `MISSION`, `VISION`, `STORY` — who-we-are content
- `FAQS`, `PROCESS_STEPS` — shared accordions and process sections
- `CONTACT`, `SOCIALS` — footer, contact page, tel/WhatsApp links
- `ACTIVITIES` — news entries; `image: null` renders a grey slot until a real photo is added
- `PARTNERS` — verified partners only; unverified names stay out and render as placeholders

Text in `[brackets]` marks deliberate placeholders — replace with real content before launch.

## Deployment

`next build` produces a static site in `out/` (configured in `next.config.ts` via `output: "export"`). Upload that folder to any static host — Vercel, Netlify, GitHub Pages, nginx, etc. No server runtime required.

## Known Limitations

- **The enquiry form is a demo.** `EnquiryForm` validates client-side and shows a success state but does not send or store anything. Wire it to a backend (e.g. a Route Handler or form service) and revisit `output: "export"` — a real backend is incompatible with static export.
- PPR / Cache Components are intentionally not enabled because they conflict with export mode.
- Images are unoptimized; optimize source assets before shipping.
