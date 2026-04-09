import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — premium mobile & drop-off detailing`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const gold = "rgb(212, 160, 87)";
const cream = "rgb(250, 246, 239)";
const muted = "rgb(168, 159, 148)";

export default async function OpenGraphImage() {
  let fraunces: ArrayBuffer | undefined;
  let dmSans: ArrayBuffer | undefined;
  try {
    const [f, d] = await Promise.all([
      fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/fraunces@5.2.5/files/fraunces-latin-700-normal.woff",
      ).then((r) => r.arrayBuffer()),
      fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5.2.5/files/dm-sans-latin-600-normal.woff",
      ).then((r) => r.arrayBuffer()),
    ]);
    fraunces = f;
    dmSans = d;
  } catch {
    /* use system fonts */
  }

  const displayFont = fraunces ? "Fraunces" : "system-ui";
  const sansFont = dmSans ? "DM Sans" : "system-ui";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "rgb(11, 10, 9)",
          color: cream,
          fontFamily: sansFont,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 56px 56px 64px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                width: 72,
                height: 4,
                background: gold,
                borderRadius: 2,
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: muted,
                display: "flex",
                fontWeight: 600,
              }}
            >
              {site.shortName}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 64,
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontFamily: displayFont,
              }}
            >
              Mobile detailing
              <span style={{ color: gold, display: "flex" }}>for your top valued asset</span>
            </div>
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                color: "rgb(232, 223, 210)",
                maxWidth: 620,
                display: "flex",
                flexDirection: "column",
                fontWeight: 600,
              }}
            >
              Mobile &amp; drop-off · Bothell · Everett to Renton
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {[
              "Quote-first pricing",
              "30+ vehicles detailed",
              "Interior reset & protection",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(212, 160, 87, 0.35)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: cream,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: 340,
            display: "flex",
            flexDirection: "column",
            background:
              "linear-gradient(180deg, rgb(212, 160, 87) 0%, rgb(90, 58, 28) 42%, rgb(11, 10, 9) 100%)",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 40,
              background:
                "linear-gradient(135deg, rgba(11,10,9,0.92) 0%, rgba(11,10,9,0.55) 100%)",
            }}
          >
            <div
              style={{
                fontSize: 188,
                fontWeight: 700,
                color: "rgba(212, 160, 87, 0.22)",
                lineHeight: 1,
                display: "flex",
                fontFamily: displayFont,
              }}
            >
              SS
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 19,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: muted,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                fontWeight: 600,
              }}
            >
              Est. Bothell
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts:
        fraunces && dmSans
          ? [
              { name: "Fraunces", data: fraunces, style: "normal", weight: 700 },
              { name: "DM Sans", data: dmSans, style: "normal", weight: 600 },
            ]
          : undefined,
    },
  );
}
