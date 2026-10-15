import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How YAROTECH collects, uses and protects personal information shared through enquiries and contact.",
};

const SECTIONS = [
  {
    id: "collect",
    title: "Information we collect",
    body: [
      "When you send an enquiry, we collect the details you provide: your name, email address, phone number, enquiry type, service interest and message. If you contact us by phone or email instead, we keep only what is needed to handle your request.",
      "We do not collect payment details, account credentials or location tracking through this website.",
    ],
  },
  {
    id: "use",
    title: "How we use information",
    body: [
      "Your details are used to respond to your enquiry — normally within one business day — to prepare quotes and assessments, to deliver agreed services, and to improve how we work.",
      "We will not use your details for unrelated marketing. If that ever changes, we will ask first.",
    ],
  },
  {
    id: "sharing",
    title: "Data sharing",
    body: [
      "We share necessary information only with the parties involved in fulfilling your request, such as delivery and installation partners. We never sell personal information.",
    ],
  },
  {
    id: "security",
    title: "Data security",
    body: [
      "Reasonable technical and organisational safeguards are applied to protect stored data against unauthorised access, alteration or misuse. No method is perfectly secure, so we limit what we collect to what each enquiry genuinely needs.",
    ],
  },
  {
    id: "choices",
    title: "Your choices",
    body: [
      "You can ask us to update, correct or delete your personal details at any time using the contact details below. Where the law requires us to retain certain records, we will explain what must be kept and why.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "For privacy-related questions, contact support@yarotech.com.ng or +234 707 537 3603.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy"
      title="Privacy Policy"
      intro="What we collect through this website, why we need it, and the control you keep over it — in plain language."
      sections={SECTIONS}
    />
  );
}
