import { describe, expect, it } from "vitest";
import { overallPercent } from "@/lib/progress";
import { checklist, eixos } from "@/lib/content";

describe("overallPercent", () => {
  it("is 0 with nothing done", () => {
    expect(overallPercent({ checklist: [], eixos: [], historico: [] })).toBe(0);
  });
  it("is 100 when checklist, all eixos and one simulado are done", () => {
    expect(
      overallPercent({
        checklist: checklist.map((c) => c.id),
        eixos: eixos.map((e) => e.id),
        historico: [{ data: "x", acertos: 1, total: 8, tempo: null }],
      }),
    ).toBe(100);
  });
});
