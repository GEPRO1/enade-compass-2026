import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PageTitle } from "@/components/AppShell";
import { circular, esg, objetos, ods } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/esg")({
  head: () => ({
    meta: [
      { title: "Matriz ESG, Economia Circular & ODS – ENADE 2026" },
      { name: "description", content: "Matriz ESG integrada aos 12 objetos, Triple Bottom Line, economia circular e ODS 8, 9, 12 e 13." },
      { property: "og:title", content: "ESG, Economia Circular & ODS – ENADE 2026" },
      { property: "og:description", content: "Sustentabilidade aplicada à Engenharia de Produção." },
    ],
  }),
  component: Esg,
});

function Esg() {
  const [pilar, setPilar] = useState(0);
  const [step, setStep] = useState(0);
  const active = esg[pilar];
  return (
    <div className="space-y-10">
      <PageTitle kicker="Sustentabilidade" title="ESG, economia circular & ODS" desc="Toque em um pilar para ver os objetos de conhecimento relacionados." />

      <section>
        <div className="grid grid-cols-3 gap-3">
          {esg.map((x, i) => (
            <button key={x.letra} onClick={() => setPilar(i)} className={cn("rounded-xl border-2 p-4 text-left transition", i === pilar ? "border-primary bg-accent" : "bg-card")}>
              <p className="font-display text-4xl font-bold text-primary">{x.letra}</p>
              <p className="text-xs font-medium sm:text-sm">{x.nome}</p>
            </button>
          ))}
        </div>
        <Card className="mt-3"><CardContent className="grid gap-4 p-6 md:grid-cols-2">
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">Na empresa</p><ul className="list-disc space-y-1 pl-5 text-sm">{active.itens.map((i) => <li key={i}>{i}</li>)}</ul></div>
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">12 objetos de conhecimento</p>
            <div className="space-y-1">{objetos.map((o, i) => <p key={o} className={cn("rounded px-2 py-1 text-xs transition", active.objetos.includes(i) ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{o}</p>)}</div>
          </div>
        </CardContent></Card>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl font-semibold">Triple Bottom Line</h2>
        <div className="relative mx-auto h-72 max-w-md">
          {[["Econômico", "Profit", "left-0 top-0 bg-primary/25"], ["Social", "People", "right-0 top-0 bg-warning/30"], ["Ambiental", "Planet", "left-1/2 bottom-0 -translate-x-1/2 bg-secondary/30"]].map(([n, e, c]) => (
            <div key={n} className={cn("absolute flex h-48 w-48 flex-col items-center justify-center rounded-full mix-blend-multiply dark:mix-blend-screen", c)}>
              <p className="font-display font-semibold">{n}</p><p className="text-xs text-muted-foreground">{e}</p>
            </div>
          ))}
          <p className="absolute left-1/2 top-[45%] -translate-x-1/2 rounded bg-card px-2 py-1 text-xs font-semibold shadow">Sustentável</p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl font-semibold">Economia circular</h2>
        <div className="flex flex-wrap gap-2">
          {circular.map((c, i) => (
            <button key={c.r} onClick={() => setStep(i)} className={cn("flex items-center gap-2 rounded-full border px-4 py-2 text-sm", i === step ? "border-secondary bg-secondary text-secondary-foreground" : "bg-card")}>
              <span className="font-display font-bold">{i + 1}</span>{c.r}
            </button>
          ))}
        </div>
        <p className="mt-3 rounded-lg bg-secondary/10 p-4">{circular[step].t}</p>
      </section>

      <section>
        <h2 className="mb-3 font-display text-2xl font-semibold">ODS e Engenharia de Produção</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ods.map((o) => (
            <Card key={o.n}><CardContent className="flex gap-4 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary font-display text-2xl font-bold text-secondary-foreground">{o.n}</div>
              <div><p className="font-semibold">{o.nome}</p><p className="text-sm text-muted-foreground">{o.ep}</p></div>
            </CardContent></Card>
          ))}
        </div>
      </section>
    </div>
  );
}
