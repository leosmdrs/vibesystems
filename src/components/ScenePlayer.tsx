import React, { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { COMPOSITIONS, FPS, type CompId } from "../remotion/registry";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Cena Remotion embutida no site. Só é montada perto da viewport e só toca
 * enquanto está visível, para não pesar a página.
 */
export const ScenePlayer: React.FC<{ id: CompId; className?: string; eager?: boolean }> = ({
  id,
  className,
  eager = false,
}) => {
  const spec = COMPOSITIONS[id];
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const [mounted, setMounted] = useState(eager);
  const [visible, setVisible] = useState(eager);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
        setVisible(entry.intersectionRatio > 0.25);
      },
      { rootMargin: "300px 0px", threshold: [0, 0.25, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const p = playerRef.current;
    if (!p || reduced) return;
    if (visible) p.play();
    else p.pause();
  }, [visible, mounted, reduced]);

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
          autoPlay={!reduced && visible}
          initialFrame={reduced ? spec.durationInFrames - 30 : 0}
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
