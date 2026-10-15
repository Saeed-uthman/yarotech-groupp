import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "YAROTECH deployments across Nigeria — solar microgrids, datacenter networks and estate surveillance. Filter by category and status.",
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-slim">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Projects</li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title" id="page-title">Work we can show.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-lede">
              Client deployments across Nigeria — filter by category or status. Demos and
              internal builds, when listed, always carry their own badge.
            </p>
          </Reveal>
        </div>
      </section>
      <ProjectsExplorer />
    </main>
  );
}
