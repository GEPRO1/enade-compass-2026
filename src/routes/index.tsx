import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bell, BellRing, BookOpen, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { nav } from "@/components/AppShell";
import { ENADE_DATE, ENADE_EXAM_LABEL, checklist, eixos } from "@/lib/content";
import { overallPercent, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início – ENADE 2026 Formação Geral | UFC Russas" },
      { name: "description", content: "Contagem regressiva, progresso de estudo e a cartilha GEPRO para o ENADE 2026." },
      { property: "og:title", content: "ENADE 2026 – Aprenda a gabaritar sem enrolação" },
      { property: "og:description", content: "Estudo interativo de Formação Geral para Engenharia de Produção." },
    ],
  }),
  component: Index,
});

const ALARM_KEY = "enade-alarm-on";
export const ALARM_MESSAGE = "11:00 — hora de entrar no local de prova";

function playAlarmTone() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [880, 660, 880, 660].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = f;
      o.connect(g);
      g.connect(ctx.destination);
      const t0 = ctx.currentTime + i * 0.32;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
      o.start(t0);
      o.stop(t0 + 0.3);
    });
  } catch {
    /* áudio indisponível */
  }
}

function fireAlarm() {
  playAlarmTone();
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    try {
      new Notification("⏰ " + ALARM_MESSAGE, {
        body: "A prova começa às 12:00 (horário de Brasília).",
      });
    } catch {
      /* notificação indisponível */
    }
  }
}

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return null;
  const diff = Math.max(0, new Date(ENADE_DATE).getTime() - now);
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor(diff / 36e5) % 24,
    m: Math.floor(diff / 6e4) % 60,
    s: Math.floor(diff / 1e3) % 60,
    over: diff === 0,
  };
}

function Index() {
  const c = useCountdown();
  const p = useProgress();
  const pct = overallPercent(p);
  const [alarmOn, setAlarmOn] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    try {
      setAlarmOn(localStorage.getItem(ALARM_KEY) === "on");
    } catch {
      /* armazenamento indisponível */
    }
  }, []);

  useEffect(() => {
    if (!c?.over || fired.current) return;
    fired.current = true;
    fireAlarm();
  }, [c?.over]);

  async function armAlarm() {
    try {
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        await Notification.requestPermission();
      }
    } catch {
      /* permissão negada */
    }
    localStorage.setItem(ALARM_KEY, "on");
    setAlarmOn(true);
    playAlarmTone();
  }

  return (
    <div className="space-y-6">
      <section className="bg-hero overflow-hidden rounded-2xl p-6 text-primary-foreground md:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80">UFC · Campus Russas · GEPRO</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-semibold leading-tight md:text-5xl">Aprenda a gabaritar o ENADE sem enrolação</h1>
        <p className="mt-3 max-w-xl opacity-90">Formação Geral em Engenharia de Produção — a cartilha de Marcela Costa Araújo, Érica Freire da Silva e Emerson Rodrigues Sabino, agora interativa.</p>
        <a href="https://github.com/geproufc/enade/blob/main/ebook_1enade2026.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center rounded-lg bg-background/15 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-background/25">📘 Ler a cartilha completa (PDF)</a>
        <p className="mt-5 font-display text-lg italic opacity-95">“O básico bem feito é o que funciona. Leia com propósito, argumente com evidência.”</p>
        <div className="mt-6 grid max-w-md grid-cols-4 gap-2">
          {(["d", "h", "m", "s"] as const).map((k) => (
            <div key={k} className="rounded-xl bg-background/15 p-3 text-center backdrop-blur">
              <p className="font-display text-2xl font-semibold tabular-nums md:text-3xl">{c ? String(c[k]).padStart(2, "0") : "--"}</p>
              <p className="text-[10px] uppercase tracking-wider opacity-80">{{ d: "dias", h: "horas", m: "min", s: "seg" }[k]}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1 text-xs opacity-80"><Clock className="h-3 w-3" /> Prova: {ENADE_EXAM_LABEL} — o alarme toca 1 h antes, às 11:00</p>
        {c?.over ? (
          <div className="mt-4 flex max-w-md items-center gap-3 rounded-xl border-2 border-destructive bg-destructive p-4 text-destructive-foreground">
            <BellRing className="h-6 w-6 shrink-0" />
            <div>
              <p className="font-display text-lg font-semibold">{ALARM_MESSAGE}</p>
              <p className="text-sm opacity-90">A prova começa às 12:00 (horário de Brasília).</p>
            </div>
          </div>
        ) : (
          <Button
            onClick={armAlarm}
            variant="outline"
            className="mt-4 border-background/40 bg-background/15 text-primary-foreground backdrop-blur hover:bg-background/25"
          >
            <Bell className="mr-2 h-4 w-4" />
            {alarmOn ? "Alarme das 11:00 ativado" : "Ativar alarme das 11:00"}
          </Button>
        )}
      </section>

      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold">Seu progresso geral</h2>
            <span className="font-display text-2xl font-semibold text-primary">{pct}%</span>
          </div>
          <Progress value={pct} />
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-sm">
            <Stat label="Checklist" v={`${p.checklist.length}/${checklist.length}`} />
            <Stat label="Eixos estudados" v={`${p.eixos.length}/${eixos.length}`} />
            <Stat label="Simulados feitos" v={String(p.historico.length)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nav.slice(1).map((n) => (
          <Link key={n.to} to={n.to} className="group rounded-xl border bg-card p-5 transition hover:border-primary">
            <n.icon className="h-6 w-6 text-secondary" />
            <p className="mt-3 font-display text-lg font-semibold">{n.label}</p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary">Abrir módulo <ArrowRight className="h-3 w-3" /></p>
          </Link>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center">
          <BookOpen className="h-8 w-8 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">As 15 questões de Formação Geral avaliam 12 Objetos de Conhecimento (Portaria INEP nº 154/2026), aqui organizados em 4 eixos integrados.</p>
          <Button asChild className="sm:ml-auto"><Link to="/trilhas">Ver trilhas</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, v }: { label: string; v: string }) {
  return <div className="rounded-lg bg-muted p-3"><p className="font-display text-xl font-semibold">{v}</p><p className="text-xs text-muted-foreground">{label}</p></div>;
}
