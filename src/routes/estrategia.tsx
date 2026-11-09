import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTitle } from "@/components/AppShell";
import { argumentacao, pegadinhas, verbos } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/estrategia")({
  head: () => ({
    meta: [
      { title: "Estratégia de Prova – ENADE 2026" },
      { name: "description", content: "Descodificador de verbos de comando, leitura de gráficos e argumentação discursiva." },
      { property: "og:title", content: "Estratégia de Prova – ENADE 2026" },
      { property: "og:description", content: "Leia com propósito e evite as pegadinhas da banca." },
    ],
  }),
  component: Estrategia,
});

const bars = [952, 960, 958, 971, 985, 998];

function Estrategia() {
  const [sel, setSel] = useState(0);
  const [real, setReal] = useState(false);
  const v = verbos[sel];
  const min = real ? 0 : 950, max = 1000;
  return (
    <div>
      <PageTitle kicker="Durante a prova" title="Estratégia & comandos" desc="Cada verbo pede uma resposta diferente. Entenda o comando antes de escrever." />
      <Tabs defaultValue="verbos">
        <TabsList className="mb-4 flex-wrap"><TabsTrigger value="verbos">Verbos de comando</TabsTrigger><TabsTrigger value="graficos">Gráficos & tabelas</TabsTrigger><TabsTrigger value="arg">Argumentação</TabsTrigger></TabsList>

        <TabsContent value="verbos" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {verbos.map((x, i) => (
              <button key={x.verbo} onClick={() => setSel(i)} className={cn("rounded-full border px-4 py-2 text-sm font-medium transition", i === sel ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary")}>{x.verbo}</button>
            ))}
          </div>
          <Card><CardContent className="space-y-3 p-6">
            <h2 className="font-display text-3xl font-semibold text-primary">{v.verbo}</h2>
            <p className="text-lg">{v.acao}</p>
            <p className="flex gap-2 rounded-lg bg-secondary/10 p-3 text-sm"><Lightbulb className="h-4 w-4 shrink-0 text-secondary" />{v.dica}</p>
            <p className="text-sm italic text-muted-foreground">Ex.: “{v.exemplo}”</p>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="graficos" className="space-y-4">
          <Card><CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="font-medium">Produção mensal (mil unidades) — série hipotética</p>
              <button onClick={() => setReal(!real)} className="rounded-full border px-3 py-1 text-xs hover:border-primary">{real ? "Ver escala truncada" : "Ver escala real (desde 0)"}</button>
            </div>
            <div className="flex h-48 items-end gap-3 border-b border-l px-2">
              {bars.map((b, i) => (
                <div key={i} className="flex flex-1 flex-col items-center justify-end h-full">
                  <span className="text-[10px] text-muted-foreground">{b}</span>
                  <div className="w-full rounded-t bg-primary transition-all duration-500" style={{ height: `${((b - min) / (max - min)) * 100}%` }} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{real ? "Com o eixo começando em zero, a variação de ~5% fica evidente: é um crescimento modesto." : "Eixo começando em 950: parece que a produção explodiu. Aparência ≠ realidade."}</p>
          </CardContent></Card>
          <div className="grid gap-3 sm:grid-cols-2">
            {pegadinhas.map((x) => <Card key={x.titulo}><CardContent className="p-5"><p className="font-display font-semibold">{x.titulo}</p><p className="mt-1 text-sm text-muted-foreground">{x.texto}</p></CardContent></Card>)}
          </div>
        </TabsContent>

        <TabsContent value="arg">
          <div className="grid gap-3 sm:grid-cols-2">
            {argumentacao.map((a, i) => (
              <Card key={a.termo} className={cn("border-t-4", ["border-t-primary", "border-t-muted-foreground", "border-t-secondary", "border-t-warning"][i])}>
                <CardContent className="p-5"><p className="font-display text-xl font-semibold">{a.termo}</p><p className="mt-1 text-sm">{a.def}</p><p className="mt-2 text-sm italic text-muted-foreground">“{a.ex}”</p></CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-muted p-4 text-sm">A <b>tese</b> é a posição defendida; os <b>argumentos</b> são as razões; as <b>evidências</b> dão suporte. Uma <b>inferência</b> deve respeitar os limites das informações do texto.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
