import { describe, expect, it } from "vitest";
import { overallPercent } from "@/lib/progress";
import { checklist, eixos, ENADE_DATE, ENADE_EXAM_LABEL, questoes } from "@/lib/content";

describe("ENADE date", () => {
  it("is the exam day 29/11/2026 with prova at 13:30 Brasília", () => {
    expect(ENADE_EXAM_LABEL).toBe("29/11/2026, 13:30 (Brasília)");
  });
  it("fires the alarm at 11:00, 1 h before the 12:00 gate opening", () => {
    expect(new Date("2026-11-29T12:00:00-03:00").getTime() - new Date(ENADE_DATE).getTime()).toBe(3600000);
  });
});

describe("questões oficiais da cartilha", () => {
  it("keeps the two fixação questions with the cartilha answers C and B", () => {
    const oficiais = questoes.filter((q) => q.fonte === "Cartilha GEPRO/UFC");
    expect(oficiais).toHaveLength(2);
    const ciclovias = questoes.find((q) => q.id === "q9")!;
    expect(ciclovias.correta).toBe(2);
    expect(ciclovias.alternativas[2]).toContain("equidade no acesso à cidade");
    const vieses = questoes.find((q) => q.id === "q10")!;
    expect(vieses.correta).toBe(1);
    expect(vieses.alternativas[1]).toContain("auditorias de dados");
  });
});

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
