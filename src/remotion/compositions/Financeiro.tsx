import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { brl, colors, fonts } from "../theme";
import { Check, Chip, clamp, Panel, Stage, Title, useIn } from "../ui";

const C = colors.financeiro;
const DAYS = 30;
// saldo diário ilustrativo (em mil R$)
const conservadora = Array.from({ length: DAYS }, (_, i) => 120 + i * 2.2 + Math.sin(i / 2.2) * 9);
const projetiva = conservadora.map((v, i) => v - (i > 4 ? (i - 4) * 1.35 : 0) - (i > 14 ? 10 : 0) - (i > 24 ? 6 : 0));
const OPS = [
  { op: "Operadora A", bruto: 18420.5, taxa: 386.83 },
  { op: "Operadora B", bruto: 9310.0, taxa: 167.58 },
  { op: "Operadora C", bruto: 4870.9, taxa: 112.03 },
];

const path = (arr: number[], w: number, h: number, min: number, max: number) =>
  arr.map((v, i) => `${i ? "L" : "M"}${(i / (arr.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(" ");

export const Financeiro: React.FC = () => {
  const frame = useCurrentFrame();
  const w = 660;
  const h = 300;
  const band = 90; // faixa de entradas/saídas abaixo das curvas
  const base = h + 28 + band / 2;
  const min = 90;
  const max = 200;
  const draw = interpolate(frame, [25, 120], [0, 1], clamp);
  const drawP = interpolate(frame, [55, 150], [0, 1], clamp);
  const len = 1400;
  const reconIn = useIn(110);
  const caixa = useIn(200);

  return (
    <Stage accent={C}>
      <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Title kicker="Financeiro · Rede consolidada" color={C}>
            O dinheiro visível, dia a dia
          </Title>
          <Chip color={C} style={{ opacity: useIn(20) }}>
            todas as filiais e CNPJs
          </Chip>
        </div>

        <div style={{ display: "flex", gap: 22, flex: 1 }}>
          <Panel style={{ flex: 1, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 19, fontWeight: 600 }}>Fluxo de caixa · próximos 30 dias</div>
              <div style={{ display: "flex", gap: 18, fontSize: 14, color: colors.muted }}>
                <span>
                  <span style={{ color: colors.brand2 }}>━</span> conservadora
                </span>
                <span>
                  <span style={{ color: C }}>━</span> projetiva
                </span>
              </div>
            </div>
            <svg width={w} height={h + 28 + band + 34} style={{ marginTop: 20, overflow: "visible" }}>
              {[0, 0.25, 0.5, 0.75, 1].map((g) => (
                <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} stroke={colors.line} />
              ))}
              {conservadora.map((_, i) => {
                const bw = w / DAYS - 6;
                const bh = (Math.abs(Math.sin(i * 1.7)) * 0.5 + 0.15) * 60;
                const t = interpolate(frame, [20 + i * 2, 34 + i * 2], [0, 1], clamp);
                const pos = i % 3 !== 1;
                const bhh = (bh / 60) * (band / 2 - 4) * t;
                return (
                  <rect
                    key={i}
                    x={(i / (DAYS - 1)) * w - bw / 2}
                    y={pos ? base - bhh : base}
                    width={bw}
                    height={bhh}
                    rx={2}
                    fill={pos ? colors.ok : colors.danger}
                    opacity={0.55}
                  />
                );
              })}
              <line x1={0} x2={w} y1={base} y2={base} stroke={colors.lineStrong} />
              <text x={0} y={h + 22} fill={colors.dim} fontSize={13}>
                entradas e saídas do dia
              </text>
              <path
                d={path(conservadora, w, h, min, max)}
                fill="none"
                stroke={colors.brand2}
                strokeWidth={3}
                strokeDasharray={len}
                strokeDashoffset={len * (1 - draw)}
              />
              <path
                d={path(projetiva, w, h, min, max)}
                fill="none"
                stroke={C}
                strokeWidth={4}
                strokeDasharray={len}
                strokeDashoffset={len * (1 - drawP)}
                style={{ filter: `drop-shadow(0 0 8px ${C})` }}
              />
              {["hoje", "+10d", "+20d", "+30d"].map((l, i) => (
                <text key={l} x={(i / 3) * w} y={h + 28 + band + 26} fill={colors.dim} fontSize={14} textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}>
                  {l}
                </text>
              ))}
            </svg>
            <div style={{ fontSize: 14, color: colors.muted, marginTop: 8 }}>
              A projetiva estima as despesas recorrentes pelos últimos 3 meses, no dia em que costumam ser pagas.
            </div>
          </Panel>

          <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel style={{ padding: 18, opacity: reconIn, transform: `translateY(${(1 - reconIn) * 20}px)` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2, marginBottom: 6 }}>
                CONCILIAÇÃO DE CARTÕES
              </div>
              {OPS.map((o, i) => {
                const t = interpolate(frame, [125 + i * 14, 140 + i * 14], [0, 1], clamp);
                return (
                  <div
                    key={o.op}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${colors.line}` }}
                  >
                    <Check color={C} size={24} progress={t} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{o.op}</div>
                      <div style={{ fontSize: 13, color: colors.muted }}>bruto {brl(o.bruto)}</div>
                    </div>
                    <div style={{ textAlign: "right", opacity: t }}>
                      <div style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.danger }}>−{brl(o.taxa)}</div>
                      <div style={{ fontSize: 12, color: colors.muted }}>taxa → despesa</div>
                    </div>
                  </div>
                );
              })}
            </Panel>
            <Panel
              glow={colors.ok}
              style={{ padding: 18, opacity: caixa, transform: `translateY(${(1 - caixa) * 20}px)` }}
            >
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2 }}>
                FECHAMENTO ÀS CEGAS
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 }}>
                <span style={{ fontSize: 16 }}>Diferença do caixa</span>
                <span style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 700, color: colors.ok }}>R$ 0,00</span>
              </div>
              <div style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
                o operador conta antes de ver o valor esperado
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Stage>
  );
};
