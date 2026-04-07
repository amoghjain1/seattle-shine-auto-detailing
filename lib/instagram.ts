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

/** Local portfolio grid on /gallery when Instagram Graph API is not configured. */
const STATIC_GALLERY_FALLBACK: InstagramMediaItem[] = [
  {
    id: "portfolio-01",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-01.jpg",
    thumbnailUrl: "/gallery/portfolio-01.jpg",
    permalink: site.instagramUrl,
    caption: "Reflective paint — exterior after detail",
  },
  {
    id: "portfolio-02",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-02.jpg",
    thumbnailUrl: "/gallery/portfolio-02.jpg",
    permalink: site.instagramUrl,
    caption: "SUV cargo area — interior after detail",
  },
  {
    id: "portfolio-03",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-03.jpg",
    thumbnailUrl: "/gallery/portfolio-03.jpg",
    permalink: site.instagramUrl,
    caption: "Tesla cargo space with seats folded — after detail",
  },
  {
    id: "portfolio-04",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-04.jpg",
    thumbnailUrl: "/gallery/portfolio-04.jpg",
    permalink: site.instagramUrl,
    caption: "Nissan Altima front passenger interior — after detail",
  },
  {
    id: "portfolio-05",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-05.jpg",
    thumbnailUrl: "/gallery/portfolio-05.jpg",
    permalink: site.instagramUrl,
    caption: "Tesla wheel and tire — cleaned and dressed",
  },
  {
    id: "portfolio-06",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-06.jpg",
    thumbnailUrl: "/gallery/portfolio-06.jpg",
    permalink: site.instagramUrl,
    caption: "Interior door trim and materials — after detail",
  },
  {
    id: "portfolio-07",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-07.jpg",
    thumbnailUrl: "/gallery/portfolio-07.jpg",
    permalink: site.instagramUrl,
    caption: "Vacuumed footwell — interior carpet",
  },
  {
    id: "portfolio-08",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-08.jpg",
    thumbnailUrl: "/gallery/portfolio-08.jpg",
    permalink: site.instagramUrl,
    caption: "Honda minivan front cabin — interior after detail",
  },
  {
    id: "portfolio-09",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-09.jpg",
    thumbnailUrl: "/gallery/portfolio-09.jpg",
    permalink: site.instagramUrl,
    caption: "Toyota RAV4 rear passenger area — interior after detail",
  },
  {
    id: "portfolio-10",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-10.jpg",
    thumbnailUrl: "/gallery/portfolio-10.jpg",
    permalink: site.instagramUrl,
    caption: "Minivan second row — leather interior after detail",
  },
  {
    id: "portfolio-11",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-11.jpg",
    thumbnailUrl: "/gallery/portfolio-11.jpg",
    permalink: site.instagramUrl,
    caption: "Toyota RAV4 trunk — cargo area after detail",
  },
  {
    id: "portfolio-12",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-12.jpg",
    thumbnailUrl: "/gallery/portfolio-12.jpg",
    permalink: site.instagramUrl,
    caption: "Floor mat grooming — vacuum lines",
  },
  {
    id: "portfolio-13",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-13.jpg",
    thumbnailUrl: "/gallery/portfolio-13.jpg",
    permalink: site.instagramUrl,
    caption: "Mercedes-Benz driver cabin — interior after detail",
  },
  {
    id: "portfolio-14",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-14.jpg",
    thumbnailUrl: "/gallery/portfolio-14.jpg",
    permalink: site.instagramUrl,
    caption: "Interior detail — finished cabin",
  },
  {
    id: "portfolio-15",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-15.jpg",
    thumbnailUrl: "/gallery/portfolio-15.jpg",
    permalink: site.instagramUrl,
    caption: "Interior detail — leather and carpet",
  },
  {
    id: "portfolio-16",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-16.jpg",
    thumbnailUrl: "/gallery/portfolio-16.jpg",
    permalink: site.instagramUrl,
    caption: "Interior detail — cargo and seating",
  },
  {
    id: "portfolio-17",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-17.jpg",
    thumbnailUrl: "/gallery/portfolio-17.jpg",
    permalink: site.instagramUrl,
    caption: "Ford Mustang exterior — full detail",
  },
  {
    id: "portfolio-18",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-18.jpg",
    thumbnailUrl: "/gallery/portfolio-18.jpg",
    permalink: site.instagramUrl,
    caption: "Mercedes-Benz alloy wheel — after detail",
  },
  {
    id: "portfolio-19",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-19.jpg",
    thumbnailUrl: "/gallery/portfolio-19.jpg",
    permalink: site.instagramUrl,
    caption: "Wheel deep clean — foam and iron remover",
  },
  {
    id: "portfolio-20",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-20.jpg",
    thumbnailUrl: "/gallery/portfolio-20.jpg",
    permalink: site.instagramUrl,
    caption: "Exterior and interior — recent work",
  },
  {
    id: "portfolio-21",
    mediaType: "IMAGE",
    mediaUrl: "/gallery/portfolio-21.jpg",
    thumbnailUrl: "/gallery/portfolio-21.jpg",
    permalink: site.instagramUrl,
    caption: "Paint and finish — recent work",
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
