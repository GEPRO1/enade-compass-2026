import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { PageTitle } from "@/components/AppShell";
import { checklist } from "@/lib/content";
import { toggleIn, updateProgress, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/vespera")({
  head: () => ({
    meta: [
      { title: "Guia de Véspera – ENADE 2026" },
      { name: "description", content: "Checklist interativo: alimentação, descanso, documentos e caneta preta." },
      { property: "og:title", content: "Guia de Véspera – ENADE 2026" },
      { property: "og:description", content: "Primeiro você: prepare-se para o dia da prova." },
    ],
  }),
  component: Vespera,
});

function Vespera() {
  const p = useProgress();
  const groups = [...new Set(checklist.map((c) => c.group))];
  return (
    <div>
      <PageTitle kicker="Véspera da prova" title="Primeiro você" desc="Corpo descansado e documentos em ordem valem pontos. Marque cada item conforme se prepara." />
      <div className="mb-6 flex gap-4 rounded-xl border-2 border-destructive/40 bg-destructive/10 p-5">
        <AlertTriangle className="h-8 w-8 shrink-0 text-destructive" />
        <div className="flex-1">
          <p className="font-display text-lg font-semibold">Portões fecham às 13:00 — chegue às 12:00</p>
          <p className="text-sm text-muted-foreground">Não é permitida a entrada após o fechamento dos portões. O alarme do app toca às 11:00 (horário de Brasília), 1 h antes da chegada recomendada. Planeje o trajeto para já estar no local de prova quando os portões abrirem.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {[
              ["12:00", "Abertura dos portões"],
              ["13:00", "Fechamento (pontual)"],
              ["13:30", "Início da prova"],
              ["4 h", "Duração total"],
              ["2 h", "Permanência mínima"],
              ["16:30", "Liberação do caderno"],
            ].map(([h, l]) => (
              <div key={l} className="rounded-lg bg-background/60 p-2 text-center">
                <p className="font-display text-base font-semibold tabular-nums">{h}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">O caderno de questões só pode ser levado a partir de 1 h antes do término (17:30), conforme o edital.</p>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-3"><Progress value={(p.checklist.length / checklist.length) * 100} /><span className="text-sm tabular-nums">{p.checklist.length}/{checklist.length}</span></div>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <Card key={g}>
            <CardHeader className="pb-2"><CardTitle className="font-display">{g}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {checklist.filter((c) => c.group === g).map((c) => (
                <label key={c.id} className="flex cursor-pointer items-start gap-3 text-sm">
                  <Checkbox checked={p.checklist.includes(c.id)} onCheckedChange={() => updateProgress((s) => ({ ...s, checklist: toggleIn(s.checklist, c.id) }))} className="mt-0.5" />
                  <span className={p.checklist.includes(c.id) ? "text-muted-foreground line-through" : ""}>{c.text}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
