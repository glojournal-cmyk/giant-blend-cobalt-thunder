import { createFileRoute } from "@tanstack/react-router";
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

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Your growth world</p>
        <h1 className="font-display text-4xl font-semibold">Scholar’s Garden</h1>
        <p className="mt-2 max-w-2xl text-muted">
          The plant follows your existing Scholar XP milestones. It does not change academic mastery or review
          scheduling.
        </p>
      </header>

      <Card className="overflow-hidden p-0">
        <img src="/art/garden-wide.jpg" alt="An English walled garden at warm evening light" className="h-52 w-full object-cover sm:h-72" />
        <div className="grid gap-5 p-5 md:grid-cols-[220px_1fr] md:p-6">
          <img
            src={garden.current.art}
            alt={garden.current.name}
            className="aspect-[3/4] w-full rounded-lg object-cover"
          />
          <div>
            <p className="text-xs tracking-[0.18em] text-navy uppercase">Garden stage {garden.stage}</p>
            <h2 className="font-display text-3xl font-semibold">{garden.current.name}</h2>
            <p className="mt-2 text-muted">{garden.current.copy}</p>
            <p className="mt-4 text-sm tabular-nums text-muted">
              Scholar level {level} · {xp} XP
            </p>
            {garden.upcoming && (
              <p className="mt-1 text-sm">
                {garden.left} XP until Stage {garden.upcoming.stage} · {garden.upcoming.name}
              </p>
            )}
            <Progress className="mt-3" value={Math.min(100, pct)} />
          </div>
        </div>
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
        <h2 className="font-display text-2xl font-semibold">Collection</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {COLLECTIBLES.map((item) => {
            const have = collectibles.includes(item.id);
            return (
              <Card key={item.id} className="overflow-hidden p-0">
                <img src={item.art} alt="" className={`h-36 w-full object-cover ${have ? "" : "grayscale"}`} />
                <div className="p-4">
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
        <p className="text-sm text-muted">What your study has grown.</p>
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
