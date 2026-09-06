import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const siteUrl = "https://majumakmur.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maju Makmur | Jewelry Store",
    template: "%s | Maju Makmur",
  },
  description:
    "Maju Makmur is a jewelry store offering gold rings, necklaces, bracelets, earrings, and other jewelry products.",
  applicationName: "Maju Makmur",
  verification: { google: "yZ0TP8CPLC5LmJYSsfgSw1kmh-U_AXq-kKd4oHHvZI4" },
  keywords: [
    "Maju Makmur",
    "jewelry store",
    "gold jewelry",
    "gold ring",
    "gold necklace",
    "gold bracelet",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Maju Makmur",
    title: "Maju Makmur | Jewelry Store",
    description:
      "Maju Makmur is a jewelry store offering gold jewelry and other jewelry products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        {/* <Provider store={store}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              {/* <Navbar /> */}
              <div className="w-full">{children}</div>
              <Toaster />
            </div>
          </main>
        </ThemeProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}
