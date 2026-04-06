import "server-only";
import { site } from "@/lib/site";

export type InstagramMediaItem = {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  permalink: string;
  caption?: string;
};

type GraphMediaResponse = {
  data?: Array<{
    id: string;
    media_type: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink: string;
    caption?: string;
  }>;
  error?: { message: string };
};

const REVALIDATE_SECONDS = 3600;
const STATIC_GALLERY_FALLBACK: InstagramMediaItem[] = [
  {
    id: "mercedes-glc-before",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/mercedes-glc-interior-before.png",
    thumbnailUrl: "/gallery/mercedes-glc-interior-before.png",
    permalink: site.instagramUrl,
    caption: "Mercedes GLC interior before detail",
  },
  {
    id: "mercedes-glc-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/mercedes-glc-interior-after.png",
    thumbnailUrl: "/gallery/mercedes-glc-interior-after.png",
    permalink: site.instagramUrl,
    caption: "Mercedes GLC interior after detail",
  },
  {
    id: "lexus-wheel-before",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/lexus-wheel-before.png",
    thumbnailUrl: "/gallery/lexus-wheel-before.png",
    permalink: site.instagramUrl,
    caption: "Lexus wheel before treatment",
  },
  {
    id: "lexus-wheel-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/lexus-wheel-after.png",
    thumbnailUrl: "/gallery/lexus-wheel-after.png",
    permalink: site.instagramUrl,
    caption: "Lexus wheel after treatment",
  },
  {
    id: "mercedes-wheel-before",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/mercedes-wheel-before.png",
    thumbnailUrl: "/gallery/mercedes-wheel-before.png",
    permalink: site.instagramUrl,
    caption: "Mercedes wheel before treatment",
  },
  {
    id: "mercedes-wheel-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/mercedes-wheel-after.png",
    thumbnailUrl: "/gallery/mercedes-wheel-after.png",
    permalink: site.instagramUrl,
    caption: "Mercedes wheel after treatment",
  },
  {
    id: "rav4-driver-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/rav4-driver-interior-after.png",
    thumbnailUrl: "/gallery/rav4-driver-interior-after.png",
    permalink: site.instagramUrl,
    caption: "Toyota RAV4 driver side interior after detail",
  },
  {
    id: "rav4-rear-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/rav4-rear-interior-after.png",
    thumbnailUrl: "/gallery/rav4-rear-interior-after.png",
    permalink: site.instagramUrl,
    caption: "Toyota RAV4 rear interior after detail",
  },
  {
    id: "mustang-exterior-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/mustang-exterior-after.png",
    thumbnailUrl: "/gallery/mustang-exterior-after.png",
    permalink: site.instagramUrl,
    caption: "Ford Mustang exterior after detail",
  },
  {
    id: "tesla-model-y-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/tesla-model-y-passenger-after.png",
    thumbnailUrl: "/gallery/tesla-model-y-passenger-after.png",
    permalink: site.instagramUrl,
    caption: "Tesla Model Y interior after detail",
  },
  {
    id: "altima-interior-after",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/altima-front-interior-after.png",
    thumbnailUrl: "/gallery/altima-front-interior-after.png",
    permalink: site.instagramUrl,
    caption: "Nissan Altima interior after detail",
  },
  {
    id: "bmw-wheel-prep",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/bmw-wheel-foam-prep.png",
    thumbnailUrl: "/gallery/bmw-wheel-foam-prep.png",
    permalink: site.instagramUrl,
    caption: "BMW wheel foam prep during detail process",
  },
];

export async function fetchInstagramFeed(): Promise<{
  items: InstagramMediaItem[];
  source: "graph" | "static" | "empty";
}> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (token && userId) {
    const url = new URL(
      `https://graph.facebook.com/v21.0/${userId}/media`,
    );
    url.searchParams.set(
      "fields",
      "id,media_type,media_url,thumbnail_url,permalink,caption",
    );
    url.searchParams.set("limit", "12");
    url.searchParams.set("access_token", token);

    const res = await fetch(url.toString(), {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (res.ok) {
      const json = (await res.json()) as GraphMediaResponse;
      if (json.data?.length) {
        const items: InstagramMediaItem[] = json.data.map((m) => ({
          id: m.id,
          mediaType: m.media_type as InstagramMediaItem["mediaType"],
          mediaUrl: m.media_url ?? null,
          thumbnailUrl: m.thumbnail_url ?? m.media_url ?? null,
          permalink: m.permalink,
          caption: m.caption,
        }));
        return { items, source: "graph" };
      }
    }
  }

  const staticJson = process.env.INSTAGRAM_STATIC_GALLERY_JSON;
  if (staticJson) {
    try {
      const parsed = JSON.parse(staticJson) as InstagramMediaItem[];
      if (Array.isArray(parsed) && parsed.length)
        return { items: parsed, source: "static" };
    } catch {
      /* ignore */
    }
  }

  if (STATIC_GALLERY_FALLBACK.length) {
    return { items: STATIC_GALLERY_FALLBACK, source: "static" };
  }

  return { items: [], source: "empty" };
}
