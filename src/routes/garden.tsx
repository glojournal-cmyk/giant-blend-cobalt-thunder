import { createFileRoute } from "@tanstack/react-router";
import { GardenScene } from "@/components/garden-scene";
import { ScholarCompanion } from "@/components/scholar-companion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { COLLECTIBLES } from "@/lib/content/collectibles";
import { useScholar } from "@/lib/store";
import { GARDEN_MILESTONES, levelFromXp, nextGarden } from "@/lib/xp";

export const Route = createFileRoute("/garden")({ component: GardenPage });

function GardenPage() {
  const xp = useScholar((s) => s.xp);
  const collectibles = useScholar((s) => s.collectibles);
  const history = useScholar((s) => s.history);
  const { level } = levelFromXp(xp);
  const garden = nextGarden(xp);
  const pct = garden.upcoming ? ((xp - garden.current.min) / (garden.target - garden.current.min)) * 100 : 100;
  const placed = COLLECTIBLES.filter((item) => item.kind === "Garden");

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Your growth world</p>
          <h1 className="font-display text-4xl font-semibold">Scholar’s Garden</h1>
          <p className="mt-2 max-w-2xl text-muted">Water once a day. Unlock a bench, a cat, a fountain — the garden grows with her.</p>
        </div>
        <ScholarCompanion compact line="Shall we water the roses?" className="w-full max-w-sm" />
      </header>

      <GardenScene />

      <Card className="p-5">
        <p className="text-xs tracking-[0.18em] text-navy uppercase">Garden stage {garden.stage}</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <p className="font-display text-2xl font-semibold">{garden.current.name}</p>
          <p className="text-sm tabular-nums text-muted">
            Scholar level {level} · {xp} XP
          </p>
        </div>
        {garden.upcoming && (
          <p className="mt-1 text-sm">
            {garden.left} XP until Stage {garden.upcoming.stage} · {garden.upcoming.name}
          </p>
        )}
        <Progress className="mt-3" value={Math.min(100, pct)} />
      </Card>

      <section>
        <h2 className="font-display text-2xl font-semibold">Growth path</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GARDEN_MILESTONES.map((m) => {
            const locked = garden.stage < m.stage;
            return (
              <Card key={m.stage} className={locked ? "overflow-hidden p-0 opacity-60" : "overflow-hidden p-0"}>
                <img src={m.art} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs tracking-[0.16em] text-navy uppercase">Stage {m.stage}</p>
                  <p className="font-display text-xl font-semibold">{m.name}</p>
                  <p className="mt-1 text-sm text-muted">{locked ? `${m.min} XP to unlock` : m.copy}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold">Garden pieces</h2>
        <p className="text-sm text-muted">Tap them on the lawn above once they unlock.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {placed.map((item) => {
            const have = collectibles.includes(item.id);
            return (
              <Card key={item.id} className="overflow-hidden p-0">
                <img src={item.art} alt="" className={`h-32 w-full object-cover ${have ? "" : "grayscale"}`} />
                <div className="p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted">{have ? item.blurb : item.need}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold">Recent growth</h2>
        <ul className="mt-3 space-y-2">
          {history.slice(0, 8).map((item, index) => (
            <li key={`${item.at}-${index}`} className="flex items-center justify-between rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-border)]">
              <span>{item.detail}</span>
              <span className="tabular-nums text-muted">+{item.xp} XP</span>
            </li>
          ))}
          {history.length === 0 && <li className="text-sm text-muted">Study a little, and the first leaves will show here.</li>}
        </ul>
      </section>
    </div>
  );
}
