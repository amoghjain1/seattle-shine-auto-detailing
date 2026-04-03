import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { MobileBookingBar } from "@/components/mobile-booking-bar";
import { site } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

function normalizeSiteUrl(raw: string): string {
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/$/, "");
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const currentHost = process.env.VERCEL_URL;
  const isVercelProd = process.env.VERCEL_ENV === "production";

  // Production: never bake a one-off *.vercel.app deployment host into metadata —
  // NEXT_PUBLIC_* can match the deployment URL while VERCEL_URL differs at build time.
  if (isVercelProd && productionHost) {
    if (!explicit) {
      return normalizeSiteUrl(productionHost);
    }
    try {
      const host = new URL(normalizeSiteUrl(explicit)).hostname.toLowerCase();
      if (host.endsWith(".vercel.app")) {
        return normalizeSiteUrl(productionHost);
      }
    } catch {
      /* use explicit below */
    }
  }

  if (explicit) {
    return normalizeSiteUrl(explicit);
  }

  if (currentHost) {
    return normalizeSiteUrl(currentHost);
  }

  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.shortName} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.tagline,
    description: site.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bothell",
      addressRegion: "WA",
      addressCountry: "US",
    },
    areaServed: [
      "Bothell WA",
      "Seattle WA",
      "Woodinville WA",
      "Everett WA",
      "Lynnwood WA",
      "Bellevue WA",
      "Redmond WA",
    ],
    email: site.email,
    telephone: site.phoneTel,
    url: siteUrl,
    sameAs: [site.instagramUrl],
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
          <MobileBookingBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
