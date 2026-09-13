import { Droplets, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { COLLECTIBLES } from "@/lib/content/collectibles";
import { playWater } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { cn, todayKey } from "@/lib/utils";
import { GARDEN_MILESTONES, nextGarden } from "@/lib/xp";

const PLOTS = [
  { id: "herb", x: "10%", y: "66%", w: 78 },
  { id: "bench", x: "32%", y: "58%", w: 108 },
  { id: "lantern", x: "6%", y: "42%", w: 56 },
  { id: "cat-companion", x: "56%", y: "68%", w: 72 },
  { id: "roses", x: "74%", y: "58%", w: 86 },
  { id: "fountain", x: "44%", y: "32%", w: 120 },
  { id: "bookshelf", x: "80%", y: "30%", w: 74 },
] as const;

export function GardenScene() {
  const xp = useScholar((s) => s.xp);
  const collectibles = useScholar((s) => s.collectibles);
  const waterGarden = useScholar((s) => s.waterGarden);
  const wateredOn = useScholar((s) => s.wateredOn);
  const waterCount = useScholar((s) => s.waterCount);
  const today = todayKey();
  const watered = wateredOn === today;
  const garden = nextGarden(xp);
  const stageArt = GARDEN_MILESTONES[garden.stage - 1]?.art ?? "/art/garden-wide.jpg";

  function water() {
    const result = waterGarden();
    if (!result) {
      toast("Already watered today", { description: "Come back tomorrow — plants rest too." });
      return;
    }
    playWater();
    toast("The garden drinks", { description: result.awarded ? `+${result.awarded} XP` : "Tended." });
  }

  function tap(id: string, have: boolean, name: string, blurb: string, need: string) {
    if (!have) {
      toast("Still growing", { description: need });
      return;
    }
    toast(name, { description: blurb });
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-navy shadow-[var(--shadow-border)]">
      <div className="relative aspect-[16/10] min-h-[280px] w-full overflow-hidden sm:min-h-[360px]">
        <img src={stageArt} alt={garden.current.name} className="absolute inset-0 h-full w-full object-cover outline-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/10" />
        {PLOTS.map((plot) => {
          const item = COLLECTIBLES.find((c) => c.id === plot.id);
          if (!item) return null;
          const have = collectibles.includes(item.id);
          return (
            <button
              key={plot.id}
              type="button"
              onClick={() => tap(item.id, have, item.name, item.blurb, item.need)}
              style={{ left: plot.x, top: plot.y, width: plot.w }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              <img
                src={item.art}
                alt={item.name}
                className={cn(
                  "h-auto w-full rounded-lg object-cover shadow-md outline-none ring-2",
                  have ? "ring-card/80" : "grayscale opacity-50 ring-card/20",
                )}
              />
              {!have ? (
                <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-navy text-card">
                  <Lock className="size-3" />
                </span>
              ) : null}
            </button>
          );
        })}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-card">
          <div>
            <p className="text-xs tracking-[0.18em] text-card/70 uppercase">Stage {garden.stage}</p>
            <p className="font-display text-2xl font-semibold">{garden.current.name}</p>
            <p className="text-sm text-card/80">{garden.current.copy}</p>
          </div>
          <Button
            type="button"
            onClick={water}
            disabled={watered}
            className={cn("shrink-0 gap-2", watered ? "bg-card/20 text-card" : "bg-card text-navy hover:bg-sage")}
          >
            <Droplets className="size-4" />
            {watered ? "Watered today" : "Water the garden"}
          </Button>
        </div>
      </div>
      <p className="bg-navy px-4 py-3 text-sm text-card/80">
        Tended {waterCount} time{waterCount === 1 ? "" : "s"}. Tap a locked piece to see how it unlocks.
      </p>
    </div>
  );
}
