import { LegalDocument, type Section } from "@/components/legal-document";

const sections: Section[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    paragraphs: [
      "These Terms of Service govern your access to and use of the Maju Makmur application and website. By accessing or using the service, you agree to these Terms. If you do not agree with these Terms, you should not use the service.",
    ],
  },
  {
    id: "using-the-service",
    title: "Using the service",
    paragraphs: [
      "Maju Makmur provides software to support business and operational activities. You may use the service only for lawful purposes and in accordance with these Terms.",
    ],
    bullets: [
      "Use the service only for authorized business activities",
      "Keep account and authentication information secure",
      "Do not attempt to access data or accounts without authorization",
      "Do not interfere with the availability, security, or operation of the service",
      "Do not use the service to violate applicable laws or regulations",
    ],
  },
  {
    id: "account-security",
    title: "Accounts and security",
    paragraphs: [
      "Some features require authentication. You are responsible for maintaining the security of credentials and accounts used to access the service.",
      "You should notify the appropriate administrator if you believe that your account or access credentials have been compromised.",
    ],
  },
  {
    id: "google-services",
    title: "Google services",
    paragraphs: [
      "The application may integrate with Google services, including Google Drive, to provide features such as application backup.",
      "When you authorize a Google integration, the application will use the permissions granted to it only for the functionality described to you at the time of authorization.",
      "Google services are provided by Google and may be subject to Google's own terms and policies. You may revoke the application's access to your Google Account through your Google Account settings.",
    ],
  },
  {
    id: "data-and-backups",
    title: "Data and backups",
    paragraphs: [
      "The application may create backup files as part of its functionality. Backup availability and recoverability may depend on the availability and operation of the services used to store those backups.",
      "Although reasonable measures are taken to maintain application functionality and backup integrity, we do not guarantee that every backup will be successful, complete, or recoverable in every circumstance.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "The Maju Makmur application, including its software, interface, design, and original content, is owned by Maju Makmur or its applicable licensors.",
      "These Terms do not transfer ownership of the application or its intellectual property to you.",
    ],
  },
  {
    id: "availability",
    title: "Service availability",
    paragraphs: [
      "We aim to keep the service available and functional, but we do not guarantee uninterrupted or error-free operation.",
      "The service may be modified, suspended, or discontinued when necessary for maintenance, security, technical reasons, or business requirements.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitations",
    paragraphs: [
      "To the fullest extent permitted by applicable law, the service is provided on an as-is and as-available basis. We do not guarantee that the service will always be available, secure, accurate, or free from errors.",
      "To the extent permitted by applicable law, Maju Makmur will not be responsible for indirect, incidental, special, or consequential losses arising from the use or inability to use the service.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these Terms when the service, business practices, or legal requirements change. Updated Terms will be published on this page with a revised effective date.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      "If you have questions about these Terms, please contact us through the contact information provided on the Maju Makmur website.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      type="terms"
      title="The rules, made clear."
      eyebrow="Terms of Service"
      description="The terms governing access to and use of the Maju Makmur application and its integrations."
      updated="September 5, 2026"
      sections={sections}
    />
  );
}
