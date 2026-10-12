# Vibe Systems — site institucional

Site de divulgação do ERP para o comércio varejista (Compras, PDV, Estoque, Financeiro e RH).
As animações são composições [Remotion](https://www.remotion.dev/) tocadas no navegador com `@remotion/player`.
As mesmas cenas podem ser renderizadas como vídeo MP4 para redes sociais.

## Rodando

```bash
npm install
npm run dev        # site em http://localhost:5173
npm run build      # gera dist/ (estático, pronto para Netlify/Vercel/GitHub Pages)
npm run studio     # Remotion Studio para editar as cenas
npm run render:all # renderiza todas as cenas em out/*.mp4
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Nome, WhatsApp e e-mail de contato | `src/config.ts` |
| Textos (dores, módulos, método, FAQ) | `src/content.ts` |
| Estrutura das seções | `src/App.tsx` |
| Estilo do site | `src/styles.css` |
| Cenas animadas | `src/remotion/compositions/*.tsx` |
| Duração e tamanho das cenas | `src/remotion/registry.ts` |

As cenas só são montadas perto da área visível e só tocam enquanto estão na tela.
Com `prefers-reduced-motion`, elas ficam paradas no quadro final.

## Licença do Remotion

O Remotion é gratuito para pessoas físicas e empresas com até 3 funcionários.
Acima disso é preciso uma licença de empresa: https://www.remotion.dev/license
