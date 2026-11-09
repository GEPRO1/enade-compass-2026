import { useSyncExternalStore } from "react";
import { checklist, eixos } from "./content";

export type Tentativa = { data: string; acertos: number; total: number; tempo: number | null };
export type Progress = { checklist: string[]; eixos: string[]; historico: Tentativa[] };

const KEY = "enade2026-progress";
const empty: Progress = { checklist: [], eixos: [], historico: [] };
let cache: Progress | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  try {
    cache = { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    cache = empty;
  }
  return cache!;
}

export function updateProgress(fn: (p: Progress) => Progress) {
  cache = fn(read());
  localStorage.setItem(KEY, JSON.stringify(cache));
  listeners.forEach((l) => l());
}

export function useProgress() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    () => empty,
  );
}

export function toggleIn(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

/** Progresso geral: checklist + eixos lidos + 1 simulado concluído, em %. */
export function overallPercent(p: Progress) {
  const total = checklist.length + eixos.length + 1;
  const done = p.checklist.length + p.eixos.length + (p.historico.length > 0 ? 1 : 0);
  return Math.round((done / total) * 100);
}
