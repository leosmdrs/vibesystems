import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { clamp, Stage } from "../ui";

const STEPS = [
  { mod: "PDV", color: colors.pdv, text: "Venda bipada no caixa", sub: "NFC-e emitida" },
  { mod: "Estoque", color: colors.estoque, text: "Saldo baixado na hora", sub: "rede inteira atualizada" },
  { mod: "Financeiro", color: colors.financeiro, text: "Recebível criado", sub: "taxa do cartão separada" },
  { mod: "RH", color: colors.rh, text: "Comissão calculada", sub: "entra na pré-folha" },
  { mod: "Compras", color: colors.compras, text: "Reposição sugerida", sub: "pelo giro de vendas" },
];
const W = 1400;
const H = 560;
const STEP_LEN = 42;
const START = 20;

export const Fluxo: React.FC = () => {
  const frame = useCurrentFrame();
  const xs = STEPS.map((_, i) => 140 + (i * (W - 280)) / (STEPS.length - 1));
  const y = 220;
  const prog = interpolate(frame, [START, START + STEP_LEN * (STEPS.length - 1)], [0, STEPS.length - 1], clamp);
  const headX = interpolate(prog, STEPS.map((_, i) => i), xs, clamp);

  return (
    <Stage accent={colors.brand}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="fluxoGrad" gradientUnits="userSpaceOnUse" x1={xs[0]} x2={xs[xs.length - 1]} y1={0} y2={0}>
            {STEPS.map((s, i) => (
              <stop key={s.mod} offset={i / (STEPS.length - 1)} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <line x1={xs[0]} x2={xs[xs.length - 1]} y1={y} y2={y} stroke={colors.lineStrong} strokeWidth={2} strokeDasharray="4 10" />
        <line x1={xs[0]} x2={headX} y1={y} y2={y} stroke="url(#fluxoGrad)" strokeWidth={5} strokeLinecap="round" />
        {prog < STEPS.length - 1 && frame > START && (
          <circle cx={headX} cy={y} r={10} fill="#fff" style={{ filter: "drop-shadow(0 0 12px #fff)" }} />
        )}
      </svg>
      {STEPS.map((s, i) => {
        const on = interpolate(prog, [i - 0.15, i], [0, 1], clamp);
        const pulse = on > 0.99 ? 1 + Math.max(0, 1 - (frame - (START + i * STEP_LEN)) / 20) * 0.25 : 1;
        return (
          <div
            key={s.mod}
            style={{
              position: "absolute",
              left: `${(xs[i] / W) * 100}%`,
              top: `${((y - 46) / H) * 100}%`,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 240,
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 15,
                color: on ? s.color : colors.dim,
                letterSpacing: 2,
                position: "absolute",
                top: -32,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                width: 128,
                height: 92,
                borderRadius: 28,
                display: "grid",
                placeItems: "center",
                background: on ? `linear-gradient(${s.color}2a, ${s.color}2a), ${colors.panel2}` : colors.panel2,
                border: `2px solid ${on ? s.color : colors.lineStrong}`,
                boxShadow: on ? `0 0 ${40 * on}px ${s.color}88` : "none",
                transform: `scale(${pulse})`,
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: s.mod.length > 6 ? 20 : 24,
                color: on ? s.color : colors.muted,
              }}
            >
              {s.mod}
            </div>
            <div
              style={{
                marginTop: 26,
                textAlign: "center",
                opacity: on,
                transform: `translateY(${(1 - on) * 14}px)`,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 600, color: colors.text }}>{s.text}</div>
              <div style={{ fontSize: 17, color: colors.muted, marginTop: 4 }}>{s.sub}</div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          width: "100%",
          textAlign: "center",
          fontFamily: fonts.display,
          fontSize: 30,
          fontWeight: 700,
          opacity: interpolate(frame, [START + STEP_LEN * 4 + 10, START + STEP_LEN * 4 + 30], [0, 1], clamp),
        }}
      >
        Uma venda. Cinco módulos. <span style={{ color: colors.brand2 }}>Zero redigitação.</span>
      </div>
    </Stage>
  );
};
