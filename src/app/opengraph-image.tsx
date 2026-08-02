import { ImageResponse } from "next/og";

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
          justifyContent: "center",
          padding: "80px",
          background: "#0d0d10",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(124,58,237,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#7c3aed",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            CD
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#a3a3ad",
            }}
          >
            Cooldecode
          </div>
        </div>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Learn what AI is creating for you. Don&apos;t get lost.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3ad",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          A personal learning blog for frontend, backend, tooling and AI — one post at a time.
        </div>
      </div>
    ),
    { ...size }
  );
}
