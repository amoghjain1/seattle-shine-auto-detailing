import "server-only";

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

  return { items: [], source: "empty" };
}
