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
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#05070d",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(56,189,248,0.32), rgba(56,189,248,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(232,121,249,0.28), rgba(232,121,249,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#38bdf8" }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#38bdf8" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#e879f9" }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#e879f9" }} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 800,
            color: "#f5f7ff",
            letterSpacing: -2,
          }}
        >
          Subnet Visualizer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            color: "rgba(232,236,246,0.55)",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          See your subnet, bit by bit — an animated IPv4 subnet calculator
        </div>
      </div>
    ),
    { ...size }
  );
}
