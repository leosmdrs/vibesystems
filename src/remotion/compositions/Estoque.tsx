import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { Chip, clamp, Panel, Stage, Title, useIn } from "../ui";

const C = colors.estoque;

type Node = { id: string; name: string; x: number; y: number; stock: number; quota: number; after: number };
const NODES: Node[] = [
  { id: "cd", name: "Centro de Distribuição", x: 120, y: 250, stock: 0.9, quota: 0.45, after: 0.62 },
  { id: "centro", name: "Filial Centro", x: 430, y: 70, stock: 0.55, quota: 0.5, after: 0.55 },
  { id: "norte", name: "Filial Norte", x: 560, y: 260, stock: 0.12, quota: 0.5, after: 0.48 },
  { id: "sul", name: "Filial Sul", x: 400, y: 430, stock: 0.48, quota: 0.5, after: 0.48 },
];
const LINKS: [string, string, boolean][] = [
  ["cd", "centro", false],
  ["cd", "norte", true],
  ["cd", "sul", false],
  ["centro", "norte", false],
  ["sul", "norte", false],
];
const RISK = [
  { name: "Lâmpada H4 12V", addr: "A-03-07", v: 0.92 },
  { name: "Palheta 22\"", addr: "B-11-02", v: 0.74 },
  { name: "Vela ignição Iridium", addr: "2.4.B16", v: 0.58 },
];

export const Estoque: React.FC = () => {
  const frame = useCurrentFrame();
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
  const alert = interpolate(frame, [60, 75], [0, 1], clamp);
  const flow = interpolate(frame, [95, 175], [0, 1], clamp);
  const sugIn = useIn(90);
  const riskIn = useIn(170);

  return (
    <Stage accent={C}>
      <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Title kicker="Estoque · Rede com 4 locais" color={C}>
            A peça certa, na filial certa
          </Title>
          <Chip color={C} style={{ opacity: useIn(20) }}>
            cota justa por filial
          </Chip>
        </div>

        <div style={{ display: "flex", gap: 22, flex: 1 }}>
          <Panel style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <svg width="100%" height="100%" viewBox="0 0 700 520" style={{ position: "absolute", inset: 0 }}>
              {LINKS.map(([a, b, hot]) => {
                const A = byId[a];
                const B = byId[b];
                const show = interpolate(frame, [10, 40], [0, 1], clamp);
                return (
                  <g key={a + b}>
                    <line
                      x1={A.x}
                      y1={A.y}
                      x2={B.x}
                      y2={B.y}
                      stroke={hot && frame > 90 ? C : colors.lineStrong}
                      strokeWidth={hot && frame > 90 ? 3 : 1.5}
                      strokeDasharray="6 8"
                      strokeDashoffset={hot ? -frame * 1.5 : 0}
                      opacity={show}
                    />
                    {hot &&
                      flow > 0 &&
                      flow < 1 &&
                      [0, 0.18, 0.36].map((o) => {
                        const t = (flow * 1.6 - o) % 1;
                        if (t < 0 || flow * 1.6 < o) return null;
                        return (
                          <rect
                            key={o}
                            x={A.x + (B.x - A.x) * t - 9}
                            y={A.y + (B.y - A.y) * t - 9}
                            width={18}
                            height={18}
                            rx={4}
                            fill={C}
                            style={{ filter: `drop-shadow(0 0 8px ${C})` }}
                          />
                        );
                      })}
                  </g>
                );
              })}
            </svg>
            {NODES.map((n, i) => {
              const p = interpolate(frame, [i * 6, i * 6 + 20], [0, 1], clamp);
              const lvl = interpolate(flow, [0, 1], [n.stock, n.after]);
              const isLow = n.id === "norte";
              const color = isLow && flow < 0.9 ? colors.danger : C;
              return (
                <div
                  key={n.id}
                  style={{
                    position: "absolute",
                    left: `${(n.x / 700) * 100}%`,
                    top: `${(n.y / 520) * 100}%`,
                    transform: `translate(-50%, -50%) scale(${0.7 + p * 0.3})`,
                    opacity: p,
                    width: 190,
                    padding: "12px 14px",
                    borderRadius: 14,
                    background: colors.panel2,
                    border: `1px solid ${isLow ? `${color}${alert ? "aa" : "33"}` : colors.lineStrong}`,
                    boxShadow: isLow && alert ? `0 0 ${20 + Math.sin(frame / 4) * 8}px ${color}55` : "0 10px 30px -10px #000",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{n.name}</div>
                  <div style={{ position: "relative", height: 10, borderRadius: 9, background: colors.line, marginTop: 10 }}>
                    <div style={{ width: `${lvl * 100}%`, height: "100%", borderRadius: 9, background: color }} />
                    <div
                      style={{
                        position: "absolute",
                        left: `${n.quota * 100}%`,
                        top: -4,
                        width: 2,
                        height: 18,
                        background: colors.text,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: colors.muted, marginTop: 6 }}>
                    {isLow && flow < 0.9 ? "abaixo da cota · risco de ruptura" : "dentro da cota"}
                  </div>
                </div>
              );
            })}
          </Panel>

          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel glow={C} style={{ padding: 18, opacity: sugIn, transform: `translateY(${(1 - sugIn) * 20}px)` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2 }}>
                SUGESTÃO DE TRANSFERÊNCIA
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10 }}>CD → Filial Norte</div>
              <div style={{ fontFamily: fonts.display, fontSize: 44, fontWeight: 700, color: C, marginTop: 4 }}>
                {Math.round(interpolate(frame, [100, 140], [0, 12], clamp))} peças
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.muted, marginTop: 6, lineHeight: 1.5 }}>
                min(falta no destino, sobra na origem, saldo físico) · em blocos de venda
              </div>
            </Panel>
            <Panel style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column", opacity: riskIn, transform: `translateY(${(1 - riskIn) * 20}px)` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2, marginBottom: 6 }}>
                ONDE CONTAR HOJE
              </div>
              {RISK.map((r, i) => {
                const t = interpolate(frame, [180 + i * 10, 205 + i * 10], [0, 1], clamp);
                return (
                  <div key={r.name} style={{ padding: "10px 0", borderBottom: `1px solid ${colors.line}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                      <span style={{ fontWeight: 500 }}>{r.name}</span>
                      <span style={{ fontFamily: fonts.mono, color: colors.muted }}>{r.addr}</span>
                    </div>
                    <div style={{ height: 6, background: colors.line, borderRadius: 6, marginTop: 8 }}>
                      <div
                        style={{
                          width: `${r.v * t * 100}%`,
                          height: "100%",
                          borderRadius: 6,
                          background: `linear-gradient(90deg, ${colors.warn}, ${colors.danger})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: "auto", paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                  <span style={{ color: colors.muted }}>Inventário cego · loja aberta</span>
                  <span style={{ fontFamily: fonts.mono, color: C }}>
                    {Math.round(interpolate(frame, [200, 270], [180, 260], clamp))}/260
                  </span>
                </div>
                <div style={{ height: 8, background: colors.line, borderRadius: 8, marginTop: 8 }}>
                  <div
                    style={{
                      width: `${interpolate(frame, [200, 270], [180 / 2.6, 100], clamp)}%`,
                      height: "100%",
                      borderRadius: 8,
                      background: C,
                    }}
                  />
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Stage>
  );
};
