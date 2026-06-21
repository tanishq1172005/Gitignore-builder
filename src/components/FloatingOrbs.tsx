export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary purple orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-float-1 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.2 270 / 0.3), transparent 70%)",
          top: "-10%",
          right: "-5%",
        }}
      />

      {/* Secondary blue orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float-2 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.5 0.15 240 / 0.25), transparent 70%)",
          bottom: "10%",
          left: "-10%",
          animationDelay: "2s",
        }}
      />

      {/* Tertiary pink orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float-3 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.18 310 / 0.2), transparent 70%)",
          top: "40%",
          left: "50%",
          animationDelay: "4s",
        }}
      />

      {/* Small accent orb */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full animate-float-2 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.2 180 / 0.15), transparent 70%)",
          top: "20%",
          left: "20%",
          animationDelay: "3s",
        }}
      />
    </div>
  );
}
