import { NextResponse } from "next/server";
import { fetchInstagramFeed } from "@/lib/instagram";

export async function GET() {
  const { items, source } = await fetchInstagramFeed();
  return NextResponse.json({ count: items.length, source, items });
}
