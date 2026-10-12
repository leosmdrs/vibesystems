import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { brl, colors, fonts } from "../theme";
import { Check, Chip, clamp, Panel, Stage, Title, useIn } from "../ui";

const C = colors.compras;
const SUPPLIERS = ["Distribuidora A", "Distribuidora B", "Distribuidora C"];
const ITEMS = [
  { name: "Pastilha de freio diant.", prices: [89.9, 82.4, 91.2] },
  { name: "Amortecedor diant. (par)", prices: [412.0, 436.5, 398.7] },
  { name: "Kit correia dentada", prices: [236.8, 229.9, 244.1] },
  { name: "Filtro de óleo", prices: [18.4, 19.9, 17.6] },
];
const STEPS = ["Aguardando entrega", "Conferência", "Precificação", "Verif. financeira", "Encerrado"];

export const Compras: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame, [70, 150], [0, ITEMS.length], clamp);
  const lotesIn = useIn(150);
  const step = interpolate(frame, [185, 255], [0, STEPS.length - 1], clamp);

  const winners = ITEMS.map((it) => it.prices.indexOf(Math.min(...it.prices)));
  const lotes = SUPPLIERS.map((s, si) => ({
    s,
    itens: ITEMS.filter((_, ii) => winners[ii] === si).length,
    total: ITEMS.reduce((acc, it, ii) => (winners[ii] === si ? acc + it.prices[si] * 10 : acc), 0),
  }));

  const economia = ITEMS.reduce((acc, it) => acc + (Math.max(...it.prices) - Math.min(...it.prices)) * 10, 0);
  const ecoIn = interpolate(frame, [150, 175], [0, 1], clamp);

  return (
    <Stage accent={C}>
      <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Title kicker="Compras · Cotação 0142" color={C}>
            Melhor custo final, item a item
          </Title>
          <Chip color={C} style={{ opacity: useIn(20) }}>
            custo + desconto + IPI/ST + frete rateado
          </Chip>
        </div>

        <div style={{ display: "flex", gap: 22, flex: 1 }}>
          <Panel style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 8 }}>
              <div style={{ color: colors.muted, fontSize: 15 }}>Item</div>
              {SUPPLIERS.map((s) => (
                <div key={s} style={{ color: colors.muted, fontSize: 15, textAlign: "right" }}>
                  {s}
                </div>
              ))}
              {ITEMS.map((it, ri) => {
                const rowIn = interpolate(frame, [20 + ri * 8, 40 + ri * 8], [0, 1], clamp);
                return (
                  <React.Fragment key={it.name}>
                    <div
                      style={{
                        padding: "16px 0",
                        fontSize: 18,
                        fontWeight: 500,
                        borderTop: `1px solid ${colors.line}`,
                        opacity: rowIn,
                        color: scan > ri && scan < ri + 1 ? C : colors.text,
                      }}
                    >
                      {it.name}
                    </div>
                    {it.prices.map((p, ci) => {
                      const won = scan > ri + 0.5 && winners[ri] === ci;
                      return (
                        <div
                          key={ci}
                          style={{
                            borderTop: `1px solid ${colors.line}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            opacity: rowIn,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: fonts.mono,
                              fontSize: 18,
                              padding: "6px 10px",
                              borderRadius: 10,
                              color: won ? "#1a1203" : colors.text,
                              background: won ? C : "transparent",
                              boxShadow: won ? `0 0 24px ${C}88` : "none",
                              fontWeight: won ? 700 : 500,
                            }}
                          >
                            {brl(p)}
                          </span>
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </div>
            <div
              style={{
                marginTop: "auto",
                padding: "16px 18px",
                borderRadius: 14,
                background: `${C}12`,
                border: `1px dashed ${C}66`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: ecoIn,
              }}
            >
              <span style={{ fontSize: 17, color: colors.muted }}>Economia vs. pior proposta · 10 un. de cada</span>
              <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 30, color: C }}>
                {brl(economia * ecoIn)}
              </span>
            </div>
          </Panel>

          <div style={{ width: 330, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 15, color: colors.muted, letterSpacing: 2 }}>
              LOTES GERADOS AUTOMATICAMENTE
            </div>
            {lotes
              .filter((l) => l.itens > 0)
              .map((l, i) => {
                const t = interpolate(lotesIn, [0, 1], [0, 1]) * interpolate(frame, [150 + i * 8, 170 + i * 8], [0, 1], clamp);
                return (
                  <Panel
                    key={l.s}
                    glow={C}
                    style={{ padding: 16, opacity: t, transform: `translateX(${(1 - t) * 40}px)` }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ fontWeight: 600, fontSize: 18 }}>{l.s}</div>
                      <Check color={C} />
                    </div>
                    <div style={{ color: colors.muted, fontSize: 15, marginTop: 6 }}>
                      {l.itens} {l.itens > 1 ? "itens" : "item"} · {brl(l.total)}
                    </div>
                  </Panel>
                );
              })}
          </div>
        </div>

        <Panel style={{ padding: "18px 22px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {STEPS.map((s, i) => {
              const done = step >= i;
              const bar = interpolate(step, [i, i + 1], [0, 1], clamp);
              return (
                <React.Fragment key={s}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 99,
                        background: done ? C : colors.panel2,
                        border: `2px solid ${done ? C : colors.lineStrong}`,
                        boxShadow: done ? `0 0 12px ${C}` : "none",
                      }}
                    />
                    <span style={{ fontSize: 16, color: done ? colors.text : colors.dim, whiteSpace: "nowrap" }}>{s}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 3, margin: "0 12px", background: colors.line, borderRadius: 3 }}>
                      <div style={{ width: `${bar * 100}%`, height: "100%", background: C, borderRadius: 3 }} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Panel>
      </div>
    </Stage>
  );
};
