import Image from "next/image";
import type { InstagramMediaItem } from "@/lib/instagram";
import { site } from "@/lib/site";

function imageSrc(item: InstagramMediaItem): string | null {
  if (item.mediaType === "VIDEO")
    return item.thumbnailUrl ?? item.mediaUrl;
  return item.mediaUrl ?? item.thumbnailUrl;
}

export function GalleryGrid({ items }: { items: InstagramMediaItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
        <p className="font-display text-lg text-foreground">
          Gallery connected soon
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          We are adding more shots here soon. In the meantime, see our latest
          work on Instagram.
        </p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
        >
          View @{site.instagramHandle} on Instagram
        </a>
      </div>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const src = imageSrc(item);
        return (
          <li key={item.id} className="min-w-0">
            <a
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-sm transition hover:border-accent/50"
            >
              {src ? (
                <div className="relative aspect-square w-full">
                  <Image
                    src={src}
                    alt={item.caption?.slice(0, 120) ?? "Instagram post"}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <span className="flex aspect-square items-center justify-center p-6 text-sm text-muted">
                  Open on Instagram
                </span>
              )}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
