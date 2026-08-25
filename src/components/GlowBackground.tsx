export default function GlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#05070d]" />
      <div
        className="blob blob-a h-[38rem] w-[38rem] bg-sky-500"
        style={{ top: "-10%", left: "-8%" }}
      />
      <div
        className="blob blob-b h-[34rem] w-[34rem] bg-fuchsia-500"
        style={{ bottom: "-14%", right: "-6%" }}
      />
      <div
        className="blob blob-a h-[24rem] w-[24rem] bg-emerald-400"
        style={{ top: "40%", left: "50%", animationDelay: "-8s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent, #05070d 75%)",
        }}
      />
    </div>
  );
}
