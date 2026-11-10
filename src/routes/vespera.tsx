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
        <div>
          <p className="font-display text-lg font-semibold">Prova às 12:00 — chegue até as 11:00</p>
          <p className="text-sm text-muted-foreground">Não há tolerância a atrasos. O alarme do app toca às 11:00 (horário de Brasília), 1 h antes da prova. Planeje o trajeto para já estar dentro do local de prova nesse horário.</p>
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
