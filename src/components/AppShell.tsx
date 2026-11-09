import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Home, ClipboardCheck, Target, Compass, Recycle, GraduationCap, Search, Moon, Sun, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { eixos, glossario, verbos } from "@/lib/content";
import { cn } from "@/lib/utils";

export const nav = [
  { to: "/", label: "Início", icon: Home },
  { to: "/vespera", label: "Véspera", icon: ClipboardCheck },
  { to: "/estrategia", label: "Estratégia", icon: Target },
  { to: "/trilhas", label: "Trilhas", icon: Compass },
  { to: "/esg", label: "ESG & ODS", icon: Recycle },
  { to: "/simulados", label: "Simulados", icon: GraduationCap },
] as const;

type Hit = { title: string; desc: string; to: (typeof nav)[number]["to"]; hash?: string };
const index: Hit[] = [
  ...glossario.map((g) => ({ title: g.termo, desc: g.def, to: g.to as Hit["to"] })),
  ...eixos.flatMap((e) =>
    e.topicos.map((t) => ({ title: t.nome, desc: `Eixo ${e.numero} · ${t.texto}`, to: "/trilhas" as const, hash: e.id })),
  ),
  ...verbos.map((v) => ({ title: v.verbo, desc: v.acao, to: "/estrategia" as const })),
];

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const d = localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(d);
    const k = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  const toggleTheme = () => { localStorage.setItem("theme", dark ? "light" : "dark"); setDark(!dark); };

  return (
    <div className="min-h-screen bg-background">
      <aside className={cn("fixed inset-y-0 left-0 z-30 hidden flex-col border-r bg-sidebar transition-all md:flex", collapsed ? "w-16" : "w-60")}>
        <div className="flex h-16 items-center gap-2 border-b px-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">E26</div>
          {!collapsed && <div className="leading-tight"><p className="font-display font-semibold">ENADE 2026</p><p className="text-xs text-muted-foreground">Eng. Produção · UFC</p></div>}
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent font-medium text-sidebar-accent-foreground" }}>
              <n.icon className="h-4 w-4 shrink-0" />{!collapsed && n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setCollapsed(!collapsed)} aria-label="Recolher menu">
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <><PanelLeftClose className="h-4 w-4" /> Recolher</>}
          </Button>
        </div>
      </aside>

      <div className={cn("transition-all", collapsed ? "md:pl-16" : "md:pl-60")}>
        <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur">
          <span className="font-display font-semibold md:hidden">ENADE 2026</span>
          <button onClick={() => setOpen(true)} className="ml-auto flex h-9 w-full max-w-sm items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground md:ml-0">
            <Search className="h-4 w-4" /> Pesquisar termos (NR-17, LGPD…)
            <kbd className="ml-auto hidden rounded border px-1.5 text-xs md:inline">Ctrl K</kbd>
          </button>
          <Button variant="ghost" size="icon" className="md:ml-auto" onClick={toggleTheme} aria-label="Alternar tema">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </header>
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:pb-12">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t bg-card md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
            className="flex flex-col items-center gap-0.5 py-2 text-[10px] text-muted-foreground"
            activeProps={{ className: "text-primary font-medium" }}>
            <n.icon className="h-5 w-5" />{n.label}
          </Link>
        ))}
      </nav>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Ex.: NR-17, LGPD, Logística Reversa, Greenwashing" />
        <CommandList>
          <CommandEmpty>Nenhum termo encontrado.</CommandEmpty>
          <CommandGroup heading="Termos-chave">
            {index.map((h, i) => (
              <CommandItem key={i} value={`${h.title} ${h.desc}`} onSelect={() => { setOpen(false); navigate({ to: h.to, hash: h.hash }); }}>
                <div><p className="font-medium">{h.title}</p><p className="line-clamp-1 text-xs text-muted-foreground">{h.desc}</p></div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export function PageTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary">{kicker}</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      {desc && <p className="mt-2 max-w-2xl text-muted-foreground">{desc}</p>}
    </div>
  );
}
