import type { Metadata } from "next";
import { Container } from "@/components/container";
import { GalleryGrid } from "@/components/gallery-grid";
import { DetailVideoSlider } from "@/components/detail-video-slider";
import { fetchInstagramFeed } from "@/lib/instagram";
import { DETAIL_VIDEO_SOURCES } from "@/lib/hero-media";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery",
  description: `Before and after work from ${site.shortName} — follow @${site.instagramHandle} for the latest.`,
};

export default async function GalleryPage() {
  const { items, source } = await fetchInstagramFeed();

  return (
    <>
      <section className="border-b border-border/60 bg-surface/20 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Portfolio
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Real results from Bothell to Bellevue and beyond
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Swipes from our shop floor and driveways across the metro — paint
            clarity, interiors reset, and protection that lasts. The grid uses
            Instagram Graph API or{" "}
            <code className="rounded bg-surface px-1 text-sm">
              INSTAGRAM_STATIC_GALLERY_JSON
            </code>{" "}
            when you configure them.
          </p>
          {source === "graph" && (
            <p className="mt-4 inline-block rounded-full bg-accent/15 px-4 py-1 text-xs font-medium text-accent">
              Live from Instagram
            </p>
          )}
          {source === "static" && (
            <p className="mt-4 inline-block rounded-full border border-border px-4 py-1 text-xs font-medium text-muted">
              Manual gallery (INSTAGRAM_STATIC_GALLERY_JSON)
            </p>
          )}
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            @{site.instagramHandle} on Instagram →
          </a>
        </Container>
      </section>

      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Photos
          </h2>
          <GalleryGrid items={items} />
        </Container>
      </section>

      <section className="border-y border-border/50 bg-surface/20 py-16 sm:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Edits in motion
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Detail clips
            </h2>
            <p className="mt-3 text-muted">
              Step through our latest short-form style edits — smooth transitions, full player controls, and keyboard arrows.
            </p>
          </div>
          <DetailVideoSlider sources={DETAIL_VIDEO_SOURCES} embeddedInGallery />
        </Container>
      </section>
    </>
  );
}
