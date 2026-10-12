// Dados de contato e marca. Ajuste aqui antes de publicar.
export const SITE = {
  empresa: "Vibe Systems",
  produto: "Vibe ERP",
  // Número no formato internacional, só dígitos (ex.: 5511999998888).
  whatsapp: "5500000000000",
  email: "contato@vibesystems.com.br",
  cidade: "Brasil",
};

export const whatsappLink = (texto: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
