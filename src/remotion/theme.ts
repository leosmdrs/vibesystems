import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/500.css";

// Fontes empacotados com o app: funcionam igual no site e na renderização de vídeo.
export const fonts = {
  display: "'Space Grotesk', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

export const colors = {
  bg: "#06070c",
  panel: "#0e111b",
  panel2: "#141826",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.16)",
  text: "#eef1f8",
  muted: "#8b93a7",
  dim: "#566077",
  ok: "#3ef0a1",
  warn: "#ffb547",
  danger: "#ff5d73",
  compras: "#ffb547",
  pdv: "#2ee6ff",
  estoque: "#9dff5c",
  financeiro: "#8f7bff",
  rh: "#ff6fb7",
  brand: "#7c6bff",
  brand2: "#2ee6ff",
};

export const brl = (v: number, digits = 2) =>
  "R$ " +
  v.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
