import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c3aed",
          fontSize: 88,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        CD
      </div>
    ),
    { ...size }
  );
}
