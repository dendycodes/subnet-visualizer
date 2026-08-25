import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const gap = 14;
  const inset = 22;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070d",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap,
            width: size.width - inset * 2,
            height: size.height - inset * 2,
          }}
        >
          <div style={{ display: "flex", flex: 1, gap }}>
            <div style={{ flex: 1, borderRadius: 18, background: "#38bdf8" }} />
            <div style={{ flex: 1, borderRadius: 18, background: "#38bdf8" }} />
          </div>
          <div style={{ display: "flex", flex: 1, gap }}>
            <div style={{ flex: 1, borderRadius: 18, background: "#e879f9" }} />
            <div style={{ flex: 1, borderRadius: 18, background: "#e879f9" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
