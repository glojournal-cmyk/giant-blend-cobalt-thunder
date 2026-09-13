import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Home, Landmark, Sprout, UserRound } from "lucide-react";
import { Toaster } from "sonner";
import { SearchDialog } from "@/components/search-dialog";
import { unlockAudio } from "@/lib/audio";
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
  const { level, into } = levelFromXp(xp);

  useEffect(() => {
    hydrateDay();
    const onFirst = () => unlockAudio();
    window.addEventListener("pointerdown", onFirst, { once: true });
    return () => window.removeEventListener("pointerdown", onFirst);
  }, [hydrateDay]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="min-h-dvh bg-paper text-ink lg:pl-[184px]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[184px] flex-col bg-navy text-card lg:flex">
        <Link to="/" className="flex items-center gap-3 px-4 py-5">
          <span className="grid size-10 place-items-center overflow-hidden rounded-md bg-navy-2">
            <img src="/favicon.svg" alt="" className="size-10 outline-none" />
          </span>
          <span>
            <strong className="block font-display text-lg leading-tight">Lux et Labor</strong>
            <small className="block text-[11px] tracking-wide text-card/65">Raise your scholar</small>
          </span>
        </Link>
        <div className="mx-4 mb-4 flex items-center justify-between rounded-md bg-white/8 px-3 py-2 text-xs tabular-nums">
          <span>
            Lv <b>{level}</b>
          </span>
          <span>
            <b>{into}</b> XP
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-card/80 hover:bg-white/10 hover:text-card",
                isActive(item.to) && "bg-white/12 text-card",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-2 pb-4">
          <SearchDialog />
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="min-w-0">
          <strong className="block font-display text-lg leading-none">Lux et Labor</strong>
          <small className="text-[11px] text-muted">Raise your scholar</small>
        </Link>
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-navy px-3 py-1 text-xs text-card tabular-nums">
            Lv {level} · {into} XP
          </div>
          <SearchDialog compact />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-5 lg:px-8 lg:pb-10 lg:pt-8">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-card/95 px-1 py-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] lg:hidden">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-[11px] font-medium text-muted",
              isActive(item.to) && "text-navy",
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
