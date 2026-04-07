import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { fetchInstagramFeed } from "@/lib/instagram";
import {
  clientIpFromHeaders,
  getInstagramRatelimit,
} from "@/lib/rate-limit";

export async function GET() {
  const limiter = getInstagramRatelimit();
  if (limiter) {
    try {
      const h = await headers();
      const ip = clientIpFromHeaders(h);
      const { success } = await limiter.limit(`instagram:${ip}`);
      if (!success) {
        return NextResponse.json(
          { error: "Too many requests" },
          {
            status: 429,
            headers: {
              "Retry-After": "60",
            },
          },
        );
      }
    } catch (err) {
      console.warn("[instagram] rate limit check failed — allowing request", err);
    }
  }

  const { items, source } = await fetchInstagramFeed();
  return NextResponse.json(
    { count: items.length, source, items },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
