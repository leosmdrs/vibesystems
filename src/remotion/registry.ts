import type React from "react";
import { Hero } from "./compositions/Hero";
import { Compras } from "./compositions/Compras";
import { Pdv } from "./compositions/Pdv";
import { Estoque } from "./compositions/Estoque";
import { Financeiro } from "./compositions/Financeiro";
import { Rh } from "./compositions/Rh";
import { Fluxo } from "./compositions/Fluxo";

export type CompSpec = {
  id: string;
  component: React.FC;
  width: number;
  height: number;
  durationInFrames: number;
};

export const FPS = 30;

export const COMPOSITIONS = {
  Hero: { id: "Hero", component: Hero, width: 1600, height: 1000, durationInFrames: 330 },
  Compras: { id: "Compras", component: Compras, width: 1200, height: 760, durationInFrames: 290 },
  Pdv: { id: "Pdv", component: Pdv, width: 1200, height: 760, durationInFrames: 290 },
  Estoque: { id: "Estoque", component: Estoque, width: 1200, height: 760, durationInFrames: 290 },
  Financeiro: { id: "Financeiro", component: Financeiro, width: 1200, height: 760, durationInFrames: 290 },
  Rh: { id: "Rh", component: Rh, width: 1200, height: 760, durationInFrames: 290 },
  Fluxo: { id: "Fluxo", component: Fluxo, width: 1400, height: 560, durationInFrames: 260 },
} satisfies Record<string, CompSpec>;

export type CompId = keyof typeof COMPOSITIONS;
