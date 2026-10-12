import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fonts } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Spring de entrada a partir de `delay` frames. */
export const useIn = (delay = 0, damping = 18) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.8 } });
};

/** Fade-out suave no final do loop para a repetição não "pular". */
export const useLoopFade = (fadeFrames = 14) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(frame, [0, 8, durationInFrames - fadeFrames, durationInFrames - 1], [0, 1, 1, 0], clamp);
};

export const Stage: React.FC<{ accent: string; children: React.ReactNode }> = ({ accent, children }) => {
  const frame = useCurrentFrame();
  const fade = useLoopFade();
  const drift = Math.sin(frame / 40) * 30;
  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily: fonts.body, color: colors.text, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(800px 500px at ${30 + drift / 10}% 0%, ${accent}22, transparent 70%), radial-gradient(700px 500px at 100% ${90 + drift / 6}%, ${colors.brand}1f, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.line} 1px, transparent 1px), linear-gradient(90deg, ${colors.line} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          opacity: 0.6,
        }}
      />
      <AbsoluteFill style={{ opacity: fade }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Panel: React.FC<{
  style?: React.CSSProperties;
  children?: React.ReactNode;
  glow?: string;
}> = ({ style, children, glow }) => (
  <div
    style={{
      background: `linear-gradient(180deg, ${colors.panel2}, ${colors.panel})`,
      border: `1px solid ${colors.lineStrong}`,
      borderRadius: 20,
      boxShadow: glow
        ? `0 0 0 1px ${glow}33, 0 20px 60px -20px ${glow}66, 0 30px 80px -30px #000`
        : "0 30px 80px -30px #000",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{ color: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  color,
  children,
  style,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      borderRadius: 999,
      fontSize: 18,
      fontWeight: 600,
      color,
      background: `${color}1a`,
      border: `1px solid ${color}55`,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);

export const Title: React.FC<{ kicker: string; color: string; children: React.ReactNode; delay?: number }> = ({
  kicker,
  color,
  children,
  delay = 0,
}) => {
  const p = useIn(delay);
  return (
    <div style={{ transform: `translateY(${(1 - p) * 20}px)`, opacity: p }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 18, letterSpacing: 3, color, textTransform: "uppercase" }}>
        {kicker}
      </div>
      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, marginTop: 6, letterSpacing: -1 }}>
        {children}
      </div>
    </div>
  );
};

export const Check: React.FC<{ color?: string; size?: number; progress?: number }> = ({
  color = colors.ok,
  size = 26,
  progress = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="11" fill={`${color}22`} stroke={color} strokeWidth="1.5" />
    <path
      d="M7 12.5l3.2 3.2L17 9"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={16}
      strokeDashoffset={16 * (1 - progress)}
    />
  </svg>
);

/** Número que conta de 0 até `to`. */
export const useCount = (to: number, start: number, dur: number) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + dur], [0, 1], clamp);
  const eased = 1 - Math.pow(1 - t, 3);
  return to * eased;
};
