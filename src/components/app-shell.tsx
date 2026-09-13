import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Home, Landmark, Sprout, UserRound } from "lucide-react";
import { Toaster } from "sonner";
import { SearchDialog } from "@/components/search-dialog";
import { Progress } from "@/components/ui/progress";
import { unlockAudio, setMusicEnabled, playClick } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { levelFromXp } from "@/lib/xp";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/study", label: "Study", icon: Landmark },
  { to: "/play", label: "Play", icon: Gamepad2 },
  { to: "/garden", label: "Garden", icon: Sprout },
  { to: "/scholar", label: "Scholar", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrateDay = useScholar((s) => s.hydrateDay);
  const xp = useScholar((s) => s.xp);
  const sound = useScholar((s) => s.sound);
  const music = useScholar((s) => s.music);
  const { level, into, next } = levelFromXp(xp);

  useEffect(() => {
    hydrateDay();
    const onFirst = () => {
      unlockAudio();
      if (useScholar.getState().music) setMusicEnabled(true);
    };
    window.addEventListener("pointerdown", onFirst, { once: true });
    return () => window.removeEventListener("pointerdown", onFirst);
  }, [hydrateDay]);

  useEffect(() => {
    setMusicEnabled(music);
  }, [music]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="paper-wash min-h-dvh text-ink lg:pl-52">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-52 flex-col border-r border-white/10 bg-navy text-card lg:flex">
        <Link to="/" className="flex items-center gap-3 px-4 py-6">
          <span className="grid size-10 place-items-center overflow-hidden rounded-lg bg-navy-2 ring-1 ring-white/15">
            <img src="/favicon.svg" alt="" className="size-10" />
          </span>
          <span>
            <strong className="block font-display text-[1.35rem] leading-none tracking-tight">Lux et Labor</strong>
            <small className="mt-1 block text-[10px] tracking-[0.18em] text-card/55 uppercase">The scholar’s garden</small>
          </span>
        </Link>
        <div className="mx-4 mb-5 rounded-xl bg-white/8 px-3 py-3">
          <div className="flex items-center justify-between text-[11px] tracking-wide text-card/70 tabular-nums">
            <span>
              Level <b className="text-card">{level}</b>
            </span>
            <span>
              <b className="text-card">{into}</b> XP
            </span>
          </div>
          <Progress className="mt-2 bg-white/15" tone="leaf" value={Math.min(100, (into / next) * 100)} />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                if (sound) playClick();
              }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                isActive(item.to) ? "bg-card text-navy shadow-sm" : "text-card/78 hover:bg-white/8 hover:text-card",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-2 pb-5">
          <SearchDialog />
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line/80 bg-paper/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link to="/" className="min-w-0">
          <strong className="block font-display text-xl leading-none">Lux et Labor</strong>
          <small className="text-[10px] tracking-[0.16em] text-muted uppercase">Raise your scholar</small>
        </Link>
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-navy px-3 py-1 text-[11px] tracking-wide text-card tabular-nums">
            Lv {level} · {into} XP
          </div>
          <SearchDialog compact />
        </div>
      </header>

      <main className="rise-in mx-auto w-full max-w-6xl px-4 pb-32 pt-5 lg:px-8 lg:pb-12 lg:pt-8">{children}</main>

      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl border border-line bg-card/95 px-1 py-1 shadow-[var(--shadow-border)] backdrop-blur-md lg:hidden pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => {
              if (sound) playClick();
            }}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-medium tracking-wide",
              isActive(item.to) ? "bg-sage text-navy" : "text-muted",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <Toaster position="top-center" richColors={false} />
    </div>
  );
}
