# Seattle Shine Auto Detailing

Marketing site for **Seattle Shine Auto Detailing** — Next.js (App Router), Tailwind CSS, dark/light theme, contact form (Resend), and Instagram gallery support (Graph API or static JSON).

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Hero photos + video slider

- **Rotating hero backdrop:** Add stills under `public/hero/photos/` and list paths in [`lib/hero-media.ts`](lib/hero-media.ts) as **`HERO_PHOTO_SOURCES`**. If that list is **empty**, only **`HERO_FALLBACK_IMAGE`** is shown. Images also support **Unsplash-style URLs** if listed in `next.config.ts` `remotePatterns`. Auto-rotation pauses for visitors who prefer **reduced motion** (first image only).
- **Edit clips (gallery slider):** Keep `.mov` / `.mp4` files under `public/hero/` and list them in **`DETAIL_VIDEO_SOURCES`** in `lib/hero-media.ts`. The **`/gallery`** page includes a video carousel with prev/next, keyboard arrows, and clip indicators.

## Environment variables

See [`.env.example`](.env.example) for `NEXT_PUBLIC_SITE_URL`, Resend keys, and Instagram (`INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, optional `INSTAGRAM_STATIC_GALLERY_JSON`).

- **Contact email:** Without `RESEND_API_KEY`, submissions log to the server console and the form still shows a success message (demo mode).
- **Instagram:** Use a Business/Creator account with a Facebook Page and a long‑lived token with permission to read media. Set `INSTAGRAM_USER_ID` to the Instagram business account id from the Graph API explorer. Refresh tokens before expiry (~60 days) or wire a refresh flow later.

## Deploy on Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com/new), import the repo; framework preset **Next.js**.
3. Add environment variables from `.env.example` in **Project → Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://seattleshine.com`) for correct metadata and JSON-LD.
5. Under **Domains**, connect your registrar’s DNS per Vercel’s instructions.

Production build:

```bash
npm run build
```

## Project structure

- `app/` — Routes (`/`, `/services`, `/gallery`, `/about`, `/contact`), `app/actions/contact.ts` (server action), `app/api/instagram` (debug JSON).
- `components/` — Header, footer, hero, forms, gallery.
- `lib/site.ts`, `lib/packages.ts`, `lib/instagram.ts` — Copy and data helpers.
