import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} premium auto detailing`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, rgb(12,10,8) 0%, rgb(33,25,17) 45%, rgb(193,127,58) 100%)",
          color: "rgb(250,246,239)",
        }}
      >
        <div
          style={{
            fontSize: 36,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgb(232,219,200)",
          }}
        >
          Seattle Shine Auto Detailing
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 70,
              lineHeight: 1.04,
              fontWeight: 700,
            }}
          >
            Premium auto detailing
            <br />
            for busy Seattle drivers
          </div>
          <div style={{ fontSize: 30, color: "rgb(240,229,214)" }}>
            30+ vehicles detailed - Everett to Renton coverage
          </div>
        </div>
      </div>
    ),
    size,
  );
}
