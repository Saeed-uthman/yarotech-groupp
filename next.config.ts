import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export: one HTML file per route, hostable anywhere.
     PPR / Cache Components are incompatible with export mode.
     Revisit both when the enquiry form needs a real backend. */
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
