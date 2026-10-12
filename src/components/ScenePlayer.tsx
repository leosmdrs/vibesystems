import React, { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { COMPOSITIONS, FPS, type CompId } from "../remotion/registry";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Cena Remotion embutida no site. Só é montada perto da viewport e só toca
 * enquanto está visível, para não pesar a página.
 *
 * O quadro de repouso é a cena já montada: se o navegador recusar o autoplay
 * (ou com movimento reduzido), a simulação aparece completa em vez de vazia.
 */
export const ScenePlayer: React.FC<{ id: CompId; className?: string; eager?: boolean }> = ({
  id,
  className,
  eager = false,
}) => {
  const spec = COMPOSITIONS[id];
  // Antes do fade-out do loop, com todos os elementos já em cena.
  const restFrame = spec.durationInFrames - 30;
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const startedRef = useRef(false);
  const [mounted, setMounted] = useState(eager);
  const [visible, setVisible] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
        // Visível de verdade: pelo menos 25% da cena dentro da janela.
        const r = entry.boundingClientRect;
        const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
        setVisible(r.height > 0 && shown / r.height > 0.25);
      },
      { rootMargin: "300px 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const p = playerRef.current;
    if (!p || reduced) return;
    if (!visible) {
      p.pause();
      // Nunca deixa a cena parada nos primeiros quadros (ainda vazios).
      if (p.getCurrentFrame() < 20) p.seekTo(restFrame);
      return;
    }
    if (!startedRef.current) {
      startedRef.current = true;
      p.seekTo(0);
    }
    const from = p.getCurrentFrame();
    p.play();
    // Se o quadro não avançou, o navegador não deixou tocar: mostra a cena montada.
    const t = window.setTimeout(() => {
      if (!p.isPlaying() || p.getCurrentFrame() === from) {
        p.pause();
        p.seekTo(restFrame);
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, [visible, mounted, reduced, restFrame]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ aspectRatio: `${spec.width} / ${spec.height}`, width: "100%" }}
    >
      {mounted && (
        <Player
          ref={playerRef}
          component={spec.component}
          durationInFrames={spec.durationInFrames}
          compositionWidth={spec.width}
          compositionHeight={spec.height}
          fps={FPS}
          loop
          initiallyMuted
          initialFrame={restFrame}
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
};
