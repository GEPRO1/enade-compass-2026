import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Timer, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { PageTitle } from "@/components/AppShell";
import { questoes } from "@/lib/content";
import { updateProgress, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/simulados")({
  head: () => ({
    meta: [
      { title: "Simulados – ENADE 2026 Formação Geral" },
      { name: "description", content: "Questões de múltipla escolha com temporizador e gabarito comentado (H1.1 e H2.2)." },
      { property: "og:title", content: "Simulados – ENADE 2026" },
      { property: "og:description", content: "Pratique com feedback imediato e acompanhe seu histórico." },
    ],
  }),
  component: Simulados,
});

const SEC_PER_Q = 180;

function Simulados() {
  const p = useProgress();
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(false);
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<(number | null)[]>([]);
  const [left, setLeft] = useState(0);
  const [start, setStart] = useState(0);
  const [done, setDone] = useState<number | null>(null);

  const finish = (r = resp) => {
    const acertos = r.filter((x, k) => x === questoes[k].correta).length;
    updateProgress((s) => ({ ...s, historico: [{ data: new Date().toISOString(), acertos, total: questoes.length, tempo: Math.round((Date.now() - start) / 1000) }, ...s.historico].slice(0, 20) }));
    setDone(acertos); setRunning(false);
  };

  useEffect(() => {
    if (!running || !timer) return;
    if (left <= 0) { finish(); return; }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timer, left]);

  const begin = () => { setResp(Array(questoes.length).fill(null)); setI(0); setLeft(SEC_PER_Q * questoes.length); setStart(Date.now()); setDone(null); setRunning(true); };

  if (!running) {
    return (
      <div className="space-y-6">
        <PageTitle kicker="Pratique" title="Simulados interativos" desc={`${questoes.length} questões de Formação Geral com gabarito fundamentado nas habilidades H1.1 e H2.2.`} />
        {done !== null && (
          <Card className="border-primary"><CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Resultado</p>
            <p className="font-display text-5xl font-semibold text-primary">{done}/{questoes.length}</p>
            <p className="mt-1">{done >= 6 ? "Excelente! Continue assim." : done >= 4 ? "Bom caminho — revise as trilhas." : "Revise as trilhas e tente de novo."}</p>
          </CardContent></Card>
        )}
        <Card><CardContent className="flex flex-wrap items-center gap-4 p-6">
          <label className="flex items-center gap-2 text-sm"><Switch checked={timer} onCheckedChange={setTimer} /><Timer className="h-4 w-4" /> Temporizador ({SEC_PER_Q / 60} min por questão)</label>
          <Button className="ml-auto" onClick={begin}>{done !== null ? "Refazer simulado" : "Iniciar simulado"}</Button>
        </CardContent></Card>
        <div>
          <h2 className="mb-2 font-display text-xl font-semibold">Histórico de desempenho</h2>
          {p.historico.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum simulado realizado ainda.</p> : (
            <div className="space-y-2">{p.historico.map((h) => (
              <div key={h.data} className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm">
                <span className="w-32 text-muted-foreground">{new Date(h.data).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</span>
                <Progress value={(h.acertos / h.total) * 100} className="flex-1" />
                <span className="w-12 text-right font-semibold tabular-nums">{h.acertos}/{h.total}</span>
              </div>
            ))}</div>
          )}
        </div>
      </div>
    );
  }

  const q = questoes[i];
  const a = resp[i];
  const answered = a !== null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Progress value={((i + 1) / questoes.length) * 100} className="flex-1" />
        <span className="text-sm tabular-nums">{i + 1}/{questoes.length}</span>
        {timer && <Badge variant={left < 60 ? "destructive" : "outline"} className="tabular-nums"><Timer className="mr-1 h-3 w-3" />{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</Badge>}
      </div>
      <Card><CardContent className="space-y-4 p-6">
        <div className="flex gap-2"><Badge variant="secondary">{q.eixo}</Badge><Badge variant="outline">{q.competencia}</Badge></div>
        <p className="text-lg leading-relaxed">{q.enunciado}</p>
        <div className="space-y-2">
          {q.alternativas.map((alt, k) => {
            const correct = answered && k === q.correta;
            const wrong = answered && k === a && k !== q.correta;
            return (
              <button key={k} disabled={answered} onClick={() => setResp((r) => r.map((x, j) => (j === i ? k : x)))}
                className={cn("flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition", !answered && "hover:border-primary", correct && "border-success bg-success/10", wrong && "border-destructive bg-destructive/10")}>
                <span className="font-display font-bold">{"ABCDE"[k]}</span><span className="flex-1">{alt}</span>
                {correct && <CheckCircle2 className="h-5 w-5 text-success" />}{wrong && <XCircle className="h-5 w-5 text-destructive" />}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-semibold">{a === q.correta ? "Correto!" : `Resposta correta: ${"ABCDE"[q.correta]}`}</p>
            <p className="mt-1 text-muted-foreground">{q.justificativa}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => { setRunning(false); }}>Sair</Button>
          {i < questoes.length - 1
            ? <Button disabled={!answered} onClick={() => setI(i + 1)}>Próxima</Button>
            : <Button disabled={!answered} onClick={() => finish()}>Finalizar</Button>}
        </div>
      </CardContent></Card>
    </div>
  );
}
