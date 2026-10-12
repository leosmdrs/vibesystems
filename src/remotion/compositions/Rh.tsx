import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { Check, Chip, clamp, Panel, Stage, Title, useIn } from "../ui";

const C = colors.rh;
const STEPS = ["Abrir", "Resolver pendências", "Liberar (hash)", "Assinatura", "Homologar", "Exportar ao contador"];
const TEAM = [
  { n: "Ana · Vendas", v: 1.12 },
  { n: "Bruno · Caixa", v: 0.86 },
  { n: "Carla · Estoque", v: 0.97 },
  { n: "Diego · Expedição", v: 0.71 },
];

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame, [20, 60], [0, 1], clamp);
  const ok = useIn(62, 12);
  return (
    <div
      style={{
        width: 290,
        height: "100%",
        borderRadius: 42,
        padding: 12,
        background: "#1b1f2c",
        border: `1px solid ${colors.lineStrong}`,
        boxShadow: `0 40px 80px -30px #000, 0 0 60px -20px ${C}66`,
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 32,
          background: colors.panel,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.muted, letterSpacing: 2 }}>MEU PONTO</div>
        <div style={{ fontFamily: fonts.display, fontSize: 52, fontWeight: 700 }}>
          07:5{Math.min(9, 6 + Math.floor(frame / 90))}
        </div>
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 999,
            border: `3px solid ${ok > 0.5 ? colors.ok : C}`,
            background: `radial-gradient(circle at 50% 40%, #2a3045, ${colors.panel2})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="40" r="17" fill="#3a4260" />
            <path d="M18 98c4-22 18-32 32-32s28 10 32 32z" fill="#3a4260" />
          </svg>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scan * 100}%`,
              height: 3,
              background: C,
              boxShadow: `0 0 16px ${C}`,
              opacity: scan < 1 ? 1 : 0,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 6 }}>
          {[
            { t: "Foto registrada", at: 45 },
            { t: "Dentro do raio da filial", at: 55 },
            { t: "Horário do servidor", at: 62 },
          ].map((r) => {
            const t = interpolate(frame, [r.at, r.at + 12], [0, 1], clamp);
            return (
              <div key={r.t} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15, opacity: 0.3 + t * 0.7 }}>
                <Check size={20} progress={t} />
                {r.t}
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: "auto",
            width: "100%",
            padding: "14px 0",
            borderRadius: 16,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 17,
            color: "#16060f",
            background: ok > 0.5 ? colors.ok : C,
            transform: `scale(${1 + Math.max(0, Math.sin((frame - 62) / 3)) * 0.04 * (frame > 62 && frame < 80 ? 1 : 0)})`,
          }}
        >
          {ok > 0.5 ? "Entrada registrada ✓" : "Bater ponto"}
        </div>
      </div>
    </div>
  );
};

export const Rh: React.FC = () => {
  const frame = useCurrentFrame();
  const stepsIn = useIn(70);
  const teamIn = useIn(160);
  return (
    <Stage accent={C}>
      <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Title kicker="RH · Ponto, folha e premiação" color={C}>
            Gente bem gerida, sem planilha
          </Title>
          <Chip color={C} style={{ opacity: useIn(20) }}>
            regras da CLT automáticas
          </Chip>
        </div>
        <div style={{ display: "flex", gap: 22, flex: 1, minHeight: 0 }}>
          <Phone />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel style={{ padding: 20, opacity: stepsIn, transform: `translateY(${(1 - stepsIn) * 20}px)` }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2, marginBottom: 12 }}>
                FECHAMENTO MENSAL GUIADO
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {STEPS.map((s, i) => {
                  const t = interpolate(frame, [85 + i * 12, 97 + i * 12], [0, 1], clamp);
                  return (
                    <div
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 12px",
                        borderRadius: 12,
                        background: t > 0.5 ? `${C}14` : colors.panel2,
                        border: `1px solid ${t > 0.5 ? `${C}55` : colors.line}`,
                        fontSize: 15,
                      }}
                    >
                      <Check color={C} size={22} progress={t} />
                      <span>
                        <span style={{ color: colors.muted, fontFamily: fonts.mono }}>{i + 1}.</span> {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Panel>
            <Panel style={{ padding: 20, flex: 1, opacity: teamIn, transform: `translateY(${(1 - teamIn) * 20}px)` }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.muted, letterSpacing: 2 }}>
                  PREMIAÇÃO POR PRODUTIVIDADE
                </div>
                <div style={{ fontSize: 13, color: colors.muted }}>│ meta</div>
              </div>
              {TEAM.map((p, i) => {
                const t = interpolate(frame, [170 + i * 8, 215 + i * 8], [0, 1], clamp);
                const v = p.v * t;
                const hit = v >= 1;
                return (
                  <div key={p.n} style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26 }}>
                    <div style={{ width: 170, fontSize: 15 }}>{p.n}</div>
                    <div style={{ flex: 1, height: 18, borderRadius: 9, background: colors.line, position: "relative" }}>
                      <div
                        style={{
                          width: `${(v / 1.2) * 100}%`,
                          height: "100%",
                          borderRadius: 9,
                          background: hit ? `linear-gradient(90deg, ${C}, ${colors.ok})` : C,
                          boxShadow: hit ? `0 0 14px ${colors.ok}88` : "none",
                        }}
                      />
                      <div style={{ position: "absolute", left: `${(1 / 1.2) * 100}%`, top: -5, width: 2, height: 28, background: colors.text }} />
                    </div>
                    <div style={{ width: 56, fontFamily: fonts.mono, fontSize: 15, textAlign: "right", color: hit ? colors.ok : colors.text }}>
                      {Math.round(v * 100)}%
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: 28,
                  fontSize: 15,
                  color: colors.muted,
                  opacity: interpolate(frame, [225, 245], [0, 1], clamp),
                }}
              >
                Apuração com prévia → títulos de pagamento gerados no financeiro
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Stage>
  );
};
