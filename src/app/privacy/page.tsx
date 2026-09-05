import { LegalDocument, type Section } from "@/components/legal-document";

const sections: Section[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "Maju Makmur is a business management application used to support the operational activities of Maju Makmur. This Privacy Policy explains what information the application handles, how that information is used, and how you can manage your data.",
    ],
  },
  {
    id: "information-we-handle",
    title: "Information we handle",
    paragraphs: [
      "The application may process information that you provide when using the application, including account information and business data entered into the application.",
      "We may also process limited technical information necessary to operate, secure, and maintain the application.",
    ],
    bullets: [
      "Account and authentication information",
      "Business and operational data entered into the application",
      "Application logs and technical information",
      "Information required to provide application functionality",
    ],
  },
  {
    id: "google-services",
    title: "Google services and Google user data",
    paragraphs: [
      "Maju Makmur may use Google APIs to provide application functionality, including creating and storing application backup files in Google Drive.",
      "When you authorize access to Google Drive, the application accesses only the Google Drive resources and permissions necessary to perform the requested backup functionality.",
      "Information obtained through Google APIs is used only to provide the functionality described in this policy. We do not sell Google user data, use it for advertising, or use it for unrelated purposes.",
      "Our use and transfer of information received from Google APIs complies with the Google API Services User Data Policy, including its Limited Use requirements.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    paragraphs: [
      "We use information only as necessary to operate and maintain the application, provide requested functionality, protect the security of the application, perform backups, troubleshoot technical issues, and comply with applicable legal obligations.",
      "We do not sell or rent personal information or Google user data.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing information",
    paragraphs: [
      "We do not sell or rent your personal information or Google user data.",
      "Information may be processed by service providers that are necessary to operate the application, such as hosting, database, authentication, and storage providers. These providers are used only for operational purposes and are not authorized to use the information for unrelated purposes.",
      "We may disclose information when required by law or when reasonably necessary to protect the security, rights, or property of Maju Makmur and its users.",
    ],
  },
  {
    id: "data-storage",
    title: "Data storage and security",
    paragraphs: [
      "Application data may be stored using third-party infrastructure required to operate the service.",
      "Backup files created through the application's Google Drive integration are stored in the Google Drive account and location authorized by the user.",
      "We use reasonable technical and organizational measures to protect information against unauthorized access, alteration, disclosure, or destruction.",
    ],
  },
  {
    id: "retention-and-deletion",
    title: "Data retention and deletion",
    paragraphs: [
      "We retain application information only for as long as reasonably necessary to provide the application, maintain its security and functionality, or satisfy applicable legal and operational requirements.",
      "You may revoke the application's access to your Google Account through your Google Account settings. Revoking access prevents the application from using the revoked Google permissions.",
      "Requests concerning deletion or correction of application data can be submitted using the contact information provided below.",
    ],
  },
  {
    id: "your-choices",
    title: "Your choices",
    paragraphs: [
      "You may request access to, correction of, or deletion of applicable personal information, subject to applicable legal and operational requirements.",
      "You may also revoke previously granted Google permissions through your Google Account settings.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy when our application, data practices, or legal requirements change. The updated version will be published on this page together with a revised effective date.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      "If you have questions about this Privacy Policy or how Maju Makmur handles information, please contact us through the contact information provided on the Maju Makmur website.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      type="privacy"
      title="Privacy, made clear."
      eyebrow="Privacy Policy"
      description="How Maju Makmur handles application data, account information, and authorized Google services."
      updated="September 5, 2026"
      sections={sections}
      contactEmail="zuhalcode@gmail.com"
    />
  );
}
