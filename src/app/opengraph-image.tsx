import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0e1014",
          backgroundImage: "radial-gradient(circle at 85% 20%, rgba(110,139,255,0.28), transparent 45%)",
          color: "#ecebe6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              border: "2px solid #353b47",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 26, color: "#8d929c" }}>Software Engineering · Ontario Tech · 2027</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 24, color: "#8d929c" }}>
            <span>Building systems that</span>
            <span style={{ color: "#6e8bff", marginLeft: 12 }}>see, understand and act.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
