/**
 * Hero background: **MP4 (H.264) first** so Chrome/Firefox/Android decode it;
 * QuickTime `.mov` alone often fails outside Safari (HEVC / codec limits).
 * Files in `public/hero/`.
 */
export const HERO_BACKGROUND_SOURCES: readonly { src: string; type: string }[] = [
  { src: "/hero/hero-background.mp4", type: "video/mp4" },
  { src: "/hero/hero-background.mov", type: "video/quicktime" },
];

/**
 * Legacy rotating hero photos (unused when `HeroVideoBackdrop` is active).
 * Add files under `public/hero/photos/` and list paths like `/hero/photos/shine-01.jpg`.
 *
 * You can also use remote URLs if they are allowed in `next.config.ts` (`remotePatterns`).
 * If this array is **empty**, only `HERO_FALLBACK_IMAGE` is shown (no rotation).
 */
export const HERO_PHOTO_SOURCES: readonly string[] = [
  "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80",
];

/** Detail edit clips for the homepage video slider. Files in `public/hero/`. */
export const DETAIL_VIDEO_SOURCES: readonly string[] = [
  "/hero/FordMustandDetailingEditOne-1.mov",
  "/hero/FordMustandDetailingEditThree-1.mov",
  "/hero/FordMustandDetailingEditTwo-1.mov",
  "/hero/MultiCarDetailingEditOne-1.mov",
  "/hero/MultiCarDetailingEditTwo-1.mov",
  "/hero/TeslaModelYDetailingEditOne-1.mov",
  "/hero/ToyotaSiennaDetailEditOne-1.mov",
  "/hero/ToyotaSiennaDetailingEditTwo-1.mov",
];

/** Shown when `HERO_PHOTO_SOURCES` is empty or as base alt text for hero photos */
export const HERO_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=2000&q=80";

export const HERO_FALLBACK_IMAGE_ALT =
  "Auto detailing showcase highlighting paint and finish";
