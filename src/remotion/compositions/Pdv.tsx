import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { brl, colors, fonts } from "../theme";
import { Check, Chip, clamp, Panel, Stage, Title, useIn } from "../ui";

const C = colors.pdv;
const QUERY = "kit amort siena";
const CART = [
  { name: "Kit Amortecedor Diant. Grand Siena", code: "EAN 789…4410", qty: 1, price: 589.9, at: 70 },
  { name: "Batente + Coifa Amortecedor", code: "Cód. fabricante 31.0544", qty: 2, price: 64.5, at: 95 },
  { name: "Óleo Câmbio 75W80 1L", code: "Cód. interno 104.22.019", qty: 2, price: 72.0, at: 118 },
];

export const Pdv: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = Math.floor(interpolate(frame, [12, 50], [0, QUERY.length], clamp));
  const resultIn = useIn(52);
  const total = CART.reduce(
    (acc, it) => acc + it.qty * it.price * interpolate(frame, [it.at, it.at + 12], [0, 1], clamp),
    0,
  );
  const finalTotal = CART.reduce((a, it) => a + it.qty * it.price, 0);
  const payIn = useIn(150);
  const pix = 300;
  const nfce = useIn(205, 12);

  return (
    <Stage accent={C}>
      <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Title kicker="PDV · Balcão Filial Centro" color={C}>
            Do bipe à nota em segundos
          </Title>
          <Chip color={C} style={{ opacity: useIn(20) }}>
            estoque da rede ao vivo
          </Chip>
        </div>

        <div style={{ display: "flex", gap: 22, flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel glow={C} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <circle cx="10.5" cy="10.5" r="6.5" stroke={C} strokeWidth="2.2" fill="none" />
                <path d="M15.5 15.5L20 20" stroke={C} strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: fonts.mono, fontSize: 22 }}>
                {QUERY.slice(0, typed)}
                <span style={{ opacity: Math.floor(frame / 8) % 2 ? 1 : 0, color: C }}>▍</span>
              </span>
              <span style={{ marginLeft: "auto", fontSize: 14, color: colors.muted }}>código · EAN · fabricante · nome</span>
            </Panel>

            <Panel
              style={{
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: resultIn,
                transform: `translateY(${(1 - resultIn) * 12}px)`,
                borderColor: `${C}66`,
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 600 }}>Kit Amort Diant Grandsiena</div>
                <div style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>tolerante a erro de digitação</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 22, color: colors.estoque }}>
                  5 <span style={{ color: colors.muted }}>(7)</span>
                </div>
                <div style={{ fontSize: 13, color: colors.muted }}>loja · outras filiais</div>
              </div>
            </Panel>

            <Panel style={{ flex: 1, padding: "8px 20px 18px", display: "flex", flexDirection: "column" }}>
              {CART.map((it) => {
                const t = interpolate(frame, [it.at, it.at + 12], [0, 1], clamp);
                return (
                  <div
                    key={it.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 0",
                      borderBottom: `1px solid ${colors.line}`,
                      opacity: t,
                      transform: `translateX(${(1 - t) * -30}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 15,
                        color: C,
                        background: `${C}18`,
                        borderRadius: 8,
                        padding: "4px 8px",
                      }}
                    >
                      {it.qty}×
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 500 }}>{it.name}</div>
                      <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{it.code}</div>
                    </div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 17 }}>{brl(it.qty * it.price)}</div>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: `${colors.rh}12`,
                  border: `1px dashed ${colors.rh}66`,
                  opacity: interpolate(frame, [135, 150], [0, 1], clamp),
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24">
                  {[3, 6, 8, 11, 14, 16, 19, 21].map((x) => (
                    <rect key={x} x={x} y={4} width={x % 2 ? 1.4 : 2.2} height={16} fill={colors.rh} />
                  ))}
                </svg>
                <span style={{ fontSize: 16 }}>Cupom de atendimento bipado</span>
                <span style={{ marginLeft: "auto", fontSize: 15, color: colors.rh, fontWeight: 600 }}>comissão → Ana</span>
              </div>
            </Panel>
          </div>

          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel style={{ padding: 22 }}>
              <div style={{ color: colors.muted, fontSize: 16 }}>Total do pedido</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 46, marginTop: 4 }}>{brl(total)}</div>
            </Panel>

            <Panel style={{ padding: 18, opacity: payIn, transform: `translateY(${(1 - payIn) * 20}px)` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2, marginBottom: 12 }}>
                PAGAMENTO DIVIDIDO
              </div>
              {[
                { k: "Pix", v: pix, at: 160 },
                { k: "Crédito 3x sem juros", v: finalTotal - pix, at: 175 },
              ].map((p) => {
                const t = interpolate(frame, [p.at, p.at + 10], [0, 1], clamp);
                return (
                  <div
                    key={p.k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      opacity: t,
                    }}
                  >
                    <span style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 17 }}>
                      <Check color={C} size={22} progress={t} />
                      {p.k}
                    </span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 17 }}>{brl(p.v)}</span>
                  </div>
                );
              })}
            </Panel>

            <Panel
              glow={colors.ok}
              style={{
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: nfce,
                transform: `scale(${0.85 + nfce * 0.15})`,
              }}
            >
              <Check size={44} progress={interpolate(frame, [212, 230], [0, 1], clamp)} />
              <div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 24 }}>NFC-e autorizada</div>
                <div style={{ fontSize: 14, color: colors.muted, marginTop: 2 }}>cupom impresso · XML arquivado</div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Stage>
  );
};
