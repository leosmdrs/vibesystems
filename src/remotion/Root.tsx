import React from "react";
import { Composition } from "remotion";
import { COMPOSITIONS, FPS } from "./registry";

/** Raiz do Remotion Studio / CLI: as mesmas cenas do site viram vídeos MP4 para redes sociais. */
export const RemotionRoot: React.FC = () => (
  <>
    {Object.values(COMPOSITIONS).map((c) => (
      <Composition
        key={c.id}
        id={c.id}
        component={c.component}
        width={c.width}
        height={c.height}
        durationInFrames={c.durationInFrames}
        fps={FPS}
      />
    ))}
  </>
);
