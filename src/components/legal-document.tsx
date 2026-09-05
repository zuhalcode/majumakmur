import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalDocumentProps = {
  type: "privacy" | "terms";
  title: string;
  eyebrow: string;
  description: string;
  updated: string;
  sections: Section[];
  brandName?: string;
  contactEmail?: string;
};

const documents = [
  { href: "/privacy", label: "Privacy Policy", short: "Privacy" },
  { href: "/terms", label: "Terms of Service", short: "Terms" },
];

export function LegalDocument({
  type,
  title,
  eyebrow,
  description,
  updated,
  sections,
  brandName = "Maju Makmur",
  contactEmail,
}: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${brandName} home`}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <span className="text-sm font-bold tracking-tighter">
                {brandName.charAt(0)}
              </span>
            </span>

            <span className="font-serif text-lg font-semibold tracking-tight">
              {brandName}
            </span>
          </Link>

          <nav
            className="flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm"
            aria-label="Legal documents"
          >
            {documents.map((document) => {
              const isActive = type === document.href.slice(1);

              return (
                <Link
                  key={document.href}
                  href={document.href}
                  className={`rounded-full px-3 py-1.5 transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="sm:hidden">{document.short}</span>
                  <span className="hidden sm:inline">{document.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-border/70 bg-muted/35">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-2 text-sm font-medium text-primary">
                <span
                  className="size-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {eyebrow}
              </div>

              <h1 className="max-w-2xl text-balance font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                {description}
              </p>

              <p className="mt-8 text-sm text-muted-foreground">
                Last updated {updated}
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[190px_minmax(0,1fr)_220px] lg:gap-16 lg:px-10 lg:py-20">
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                On this page
              </p>

              <nav
                className="flex flex-col gap-1 border-l border-border pl-4"
                aria-label="On this page"
              >
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="py-1 text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1 lg:hidden">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  {section.title}
                </a>
              ))}
            </div>

            <div className="legal-copy">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-8 border-b border-border/70 py-10 first:pt-0 last:border-0"
                >
                  <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                    {section.title}
                  </h2>

                  <div className="mt-5 flex flex-col gap-4 text-base leading-8 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.bullets && (
                      <ul className="flex flex-col gap-3 pl-5 marker:text-primary">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="pl-2">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside>
            <div className="sticky top-8 flex flex-col gap-4">
              {contactEmail && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Mail aria-hidden="true" />
                  </div>

                  <h2 className="font-serif text-xl font-semibold">
                    Need help?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Questions about this policy? Contact us and we will be happy
                    to clarify.
                  </p>

                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Contact us
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              )}

              <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                <ShieldCheck className="mb-5" aria-hidden="true" />

                <p className="text-sm leading-6 opacity-85">
                  This page provides information about the terms and privacy
                  practices applicable to the {brandName} service.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex items-center gap-2">
            <FileText aria-hidden="true" />
            <span>{brandName} legal center</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            Back to home
            <ChevronRight aria-hidden="true" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export type { Section };
