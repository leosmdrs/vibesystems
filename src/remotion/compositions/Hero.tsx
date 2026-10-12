import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { brl, colors, fonts } from "../theme";
import { Check, clamp, Panel, Stage, useCount, useIn } from "../ui";

const MODULES = [
  { name: "Compras", color: colors.compras },
  { name: "PDV", color: colors.pdv },
  { name: "Estoque", color: colors.estoque },
  { name: "Financeiro", color: colors.financeiro },
  { name: "RH", color: colors.rh },
];

const EVENTS = [
  { at: 40, mod: 0, text: "Sugestão de compra gerada", sub: "42 itens · giro de 90 dias" },
  { at: 80, mod: 1, text: "NFC-e autorizada", sub: "Pedido 18.204 · Pix + crédito 3x" },
  { at: 120, mod: 2, text: "Transferência sugerida", sub: "Filial Centro → Filial Norte · 12 peças" },
  { at: 160, mod: 3, text: "Cartões conciliados", sub: "3 operadoras · taxa lançada como despesa" },
  { at: 200, mod: 4, text: "Ponto do dia fechado", sub: "37 colaboradores · 0 pendências" },
  { at: 240, mod: 1, text: "Caixa conferido às cegas", sub: "Operador 04 · diferença R$ 0,00" },
];

const CHART = [32, 41, 38, 52, 47, 60, 58, 71, 66, 79, 84, 92];

const Sidebar: React.FC = () => {
  const frame = useCurrentFrame();
  const active = Math.floor(((frame - 40) / 40) % 5 + 5) % 5;
  return (
    <Panel style={{ width: 230, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.brand}, ${colors.brand2})`,
          }}
        />
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22 }}>Vibe ERP</div>
      </div>
      {MODULES.map((m, i) => {
        const on = frame > 40 && i === active;
        return (
          <div
            key={m.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              fontSize: 19,
              fontWeight: 500,
              background: on ? `${m.color}1c` : "transparent",
              color: on ? colors.text : colors.muted,
              border: `1px solid ${on ? `${m.color}55` : "transparent"}`,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 99,
                background: m.color,
                boxShadow: on ? `0 0 14px ${m.color}` : "none",
              }}
            />
            {m.name}
          </div>
        );
      })}
    </Panel>
  );
};

const Kpi: React.FC<{ label: string; value: string; delta: string; color: string; delay: number }> = ({
  label,
  value,
  delta,
  color,
  delay,
}) => {
  const p = useIn(delay);
  return (
    <Panel
      style={{
        flex: 1,
        padding: "18px 20px",
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      <div style={{ color: colors.muted, fontSize: 16 }}>{label}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 32, marginTop: 6 }}>{value}</div>
      <div style={{ color, fontSize: 15, marginTop: 4, fontWeight: 600 }}>{delta}</div>
    </Panel>
  );
};

const Chart: React.FC = () => {
  const frame = useCurrentFrame();
  const w = 760;
  const h = 420;
  const pts = CHART.map((v, i) => [(i / (CHART.length - 1)) * w, h - (v / 100) * h] as const);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const progress = interpolate(frame, [30, 130], [0, 1], clamp);
  const len = 1100;
  const p = useIn(18);
  return (
    <Panel style={{ padding: 22, flex: 1, opacity: p }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 19, fontWeight: 600 }}>Faturamento da rede · 12 semanas</div>
        <div style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.ok }}>todas as filiais</div>
      </div>
      <svg width={w} height={h + 10} style={{ marginTop: 18, overflow: "visible" }}>
        <defs>
          <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={colors.brand2} stopOpacity="0.35" />
            <stop offset="1" stopColor={colors.brand2} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroLine" x1="0" x2="1">
            <stop offset="0" stopColor={colors.brand} />
            <stop offset="1" stopColor={colors.brand2} />
          </linearGradient>
          <clipPath id="heroClip">
            <rect x="0" y="-20" width={w * progress} height={h + 40} />
          </clipPath>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1={0} x2={w} y1={h * g} y2={h * g} stroke={colors.line} />
        ))}
        <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#heroArea)" clipPath="url(#heroClip)" />
        <path
          d={d}
          fill="none"
          stroke="url(#heroLine)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - progress)}
        />
        {progress > 0.98 && (
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={8 + Math.sin(frame / 5) * 2} fill={colors.brand2} />
        )}
      </svg>
    </Panel>
  );
};

const Feed: React.FC = () => {
  const frame = useCurrentFrame();
  const visible = EVENTS.filter((e) => frame >= e.at).slice(-5).reverse();
  return (
    <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.muted, letterSpacing: 2 }}>
        ACONTECENDO AGORA
      </div>
      {visible.map((e) => {
        const m = MODULES[e.mod];
        const t = interpolate(frame, [e.at, e.at + 14], [0, 1], clamp);
        return (
          <Panel
            key={e.at}
            glow={t < 1 ? m.color : undefined}
            style={{
              padding: "14px 16px",
              display: "flex",
              gap: 14,
              alignItems: "center",
              opacity: t,
              transform: `translateX(${(1 - t) * 60}px)`,
            }}
          >
            <Check color={m.color} progress={interpolate(frame, [e.at + 6, e.at + 20], [0, 1], clamp)} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{e.text}</div>
              <div style={{ fontSize: 14, color: colors.muted, marginTop: 2 }}>
                <span style={{ color: m.color }}>{m.name}</span> · {e.sub}
              </div>
            </div>
          </Panel>
        );
      })}
    </div>
  );
};

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const vendas = useCount(48920.4, 20, 90);
  const ticket = useCount(287.6, 26, 90);
  const rotY = interpolate(frame, [0, durationInFrames], [-9, -3]);
  const rotX = interpolate(frame, [0, durationInFrames], [7, 4]);
  const enter = useIn(0, 22);
  return (
    <Stage accent={colors.brand2}>
      <AbsoluteFill style={{ perspective: 2200, alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1460,
            height: 860,
            display: "flex",
            gap: 20,
            transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${0.9 + enter * 0.06})`,
            opacity: enter,
          }}
        >
          <Sidebar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <Kpi label="Vendas hoje" value={brl(vendas)} delta="▲ em tempo real" color={colors.ok} delay={6} />
              <Kpi label="Ticket médio" value={brl(ticket)} delta="▲ por filial" color={colors.ok} delay={10} />
              <Kpi label="Estoque disponível" value="98,4%" delta="● rede inteira" color={colors.estoque} delay={14} />
            </div>
            <div style={{ display: "flex", gap: 20, flex: 1 }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                <Chart />
                <Panel style={{ padding: "18px 22px", display: "flex", gap: 14, alignItems: "center" }}>
                  {MODULES.map((m, i) => {
                    const p = interpolate(frame, [50 + i * 12, 80 + i * 12], [0, 1], clamp);
                    return (
                      <div key={m.name} style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, color: colors.muted, marginBottom: 8 }}>{m.name}</div>
                        <div style={{ height: 8, borderRadius: 9, background: colors.line, overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${p * 100}%`,
                              height: "100%",
                              background: m.color,
                              boxShadow: `0 0 12px ${m.color}`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </Panel>
              </div>
              <Feed />
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
