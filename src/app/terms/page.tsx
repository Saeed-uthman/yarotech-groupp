import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms governing enquiries, quotes, services, warranties and website use with YAROTECH.",
};

const SECTIONS = [
  {
    id: "scope",
    title: "Scope",
    body: [
      "These terms apply to all visitors and customers using the YAROTECH website, enquiry channels, product supply and engineering services.",
    ],
  },
  {
    id: "enquiries",
    title: "Enquiries and quotes",
    body: [
      "Sending an enquiry places you under no obligation. Where a site assessment applies, we prepare a written quote based on what we find; availability and pricing may change before you accept, and we will always confirm the final figures with you first.",
    ],
  },
  {
    id: "delivery",
    title: "Services and delivery",
    body: [
      "Delivery and installation timelines are estimates. They may vary with location, inventory movement or third-party logistics — if anything slips, we tell you early and agree the revised plan with you.",
    ],
  },
  {
    id: "warranty",
    title: "Warranty and support",
    body: [
      "Equipment carries its manufacturer (OEM) warranty — typically 1 to 25 years depending on the component — alongside our installation guarantee. Keep your proof of purchase or project reference; you will need it for any support request.",
    ],
  },
  {
    id: "use",
    title: "Acceptable use",
    body: [
      "Do not misuse this website, disrupt its operation, or attempt unauthorised access to any systems, accounts or data connected with it.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "For questions about these terms, contact support@yarotech.com.ng or +234 707 537 3603.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms"
      title="Terms and Conditions"
      intro="The ground rules for enquiries, quotes, services and warranties — written to be read, not skipped."
      sections={SECTIONS}
    />
  );
}
