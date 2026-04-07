import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  redisClient = url && token ? new Redis({ url, token }) : null;
  return redisClient;
}

let contactRatelimit: Ratelimit | null | undefined;
let instagramRatelimit: Ratelimit | null | undefined;

/** Contact form: 5 submissions / minute / IP (sliding window). */
export function getContactRatelimit(): Ratelimit | null {
  if (contactRatelimit !== undefined) return contactRatelimit;
  const redis = getRedis();
  contactRatelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        prefix: "ratelimit:contact",
      })
    : null;
  return contactRatelimit;
}

/** Instagram API route: 120 GETs / minute / IP. */
export function getInstagramRatelimit(): Ratelimit | null {
  if (instagramRatelimit !== undefined) return instagramRatelimit;
  const redis = getRedis();
  instagramRatelimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(120, "1 m"),
        prefix: "ratelimit:instagram",
      })
    : null;
  return instagramRatelimit;
}

export function clientIpFromHeaders(h: Headers): string {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const realIp = h.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}
