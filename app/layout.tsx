import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { MobileBookingBar } from "@/components/mobile-booking-bar";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { FloatingCta } from "@/components/floating-cta";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import { resolveSiteUrl } from "@/lib/site-url";
import { HOME_FAQS } from "@/lib/faqs";
import { jsonLdStringify } from "@/lib/json-ld";

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

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  title: {
    default: `${site.shortName} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "auto detailing Seattle",
    "mobile detailing Bothell",
    "car detailing Everett",
    "car detailing Renton",
    "ceramic coating Seattle",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    url: siteUrl,
    title: `${site.shortName} · Boutique mobile & drop-off detailing`,
    description: site.description,
    siteName: site.name,
    images: ["/opengraph-image"],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} · Boutique mobile & drop-off detailing`,
    description: site.description,
    images: ["/twitter-image"],
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
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdStringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdStringify(faqJsonLd),
          }}
        />
        <ThemeProvider>
          <LenisProvider>
            <ScrollProgress />
            <SiteHeader />
            <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
              {children}
            </main>
            <SiteFooter />
            <BackToTop />
            <MobileBookingBar />
            <FloatingCta />
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
