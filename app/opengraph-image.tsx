import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Digital Kalakaar - Production House";
export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "72px",
          background:
            "radial-gradient(circle at 10% 10%, #2a2216 0%, #0a0a0a 55%), linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
          color: "#f0ebe0",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#c9a84c", textTransform: "uppercase" }}>
          Digital Kalakaar
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 700,
            maxWidth: 980,
          }}
        >
          Production House for Ads, Brand Films, and Reels
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#b9b3a8" }}>
          Where stories come alive.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
