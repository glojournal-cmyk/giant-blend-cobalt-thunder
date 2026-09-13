import { useEffect, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { playCorrect } from "@/lib/audio";
import { DEFAULT_SCHOLAR_NAME, OUTFITS, type OutfitId } from "@/lib/content/outfits";
import { useScholar } from "@/lib/store";
import { cn } from "@/lib/utils";

const CATS = [
  { id: "all", label: "All" },
  { id: "Uniform", label: "Uniform" },
  { id: "Achievement", label: "PE" },
  { id: "Seasonal", label: "Seasonal" },
  { id: "Latin", label: "Prize" },
] as const;

export function WardrobeGame() {
  const equipped = useScholar((s) => s.equippedOutfit);
  const unlocked = useScholar((s) => s.unlockedOutfits);
  const equipOutfit = useScholar((s) => s.equipOutfit);
  const sound = useScholar((s) => s.sound);
  const name = useScholar((s) => s.displayName);
  const label = name.trim() || DEFAULT_SCHOLAR_NAME;
  const [cat, setCat] = useState<(typeof CATS)[number]["id"]>("all");
  const [flash, setFlash] = useState(0);
  const wearing = OUTFITS.find((item) => item.id === equipped) ?? OUTFITS[0];
  const items = OUTFITS.filter((item) => cat === "all" || item.category === cat);

  useEffect(() => {
    setFlash((n) => n + 1);
  }, [equipped]);

  function pick(id: OutfitId, locked: boolean, need: string, itemName: string) {
    if (locked) {
      toast("Still in the laundry", { description: need });
      return;
    }
    if (id === equipped) return;
    equipOutfit(id);
    if (sound) playCorrect();
    toast("Changed", { description: `Now wearing ${itemName}.` });
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-border)]">
        <img
          key={flash}
          src={wearing.art}
          alt={`${label} in ${wearing.name}`}
          className="dress-pop scholar-idle mx-auto block max-h-[min(72vh,760px)] w-auto max-w-full object-contain outline-none"
        />
        {flash > 0 ? <Sparks tick={flash} /> : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 via-navy/35 to-transparent p-4 text-card sm:p-5">
          <p className="text-xs tracking-[0.2em] text-card/70 uppercase">Dress-up · Tap a look</p>
          <p className="font-display text-3xl font-semibold">{label}</p>
          <p className="text-sm text-card/85">{wearing.name}</p>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Closet</p>
            <h2 className="font-display text-2xl font-semibold">Change outfit</h2>
          </div>
          <Sparkles className="size-5 text-gold" />
        </div>
        <p className="mt-1 text-sm text-muted">Tap a garment. She changes at once — like a dress-up game.</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {CATS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCat(item.id)}
              className={cn(
                "min-h-10 rounded-full px-3 text-xs font-medium",
                cat === item.id ? "bg-navy text-card" : "bg-sage text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {items.map((item) => {
            const have = unlocked.includes(item.id);
            const on = equipped === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => pick(item.id, !have, item.need, item.name)}
                className={cn(
                  "group relative overflow-hidden rounded-xl text-left ring-1 ring-line transition-transform duration-150 active:scale-[0.97]",
                  on && "ring-2 ring-navy",
                  have ? "bg-paper hover:bg-sage" : "bg-paper/70",
                )}
              >
                <img
                  src={item.closet}
                  alt=""
                  className={cn("aspect-square w-full object-cover outline-none", !have && "grayscale opacity-60")}
                />
                {!have ? (
                  <span className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-navy/80 text-card">
                    <Lock className="size-3.5" />
                  </span>
                ) : null}
                {on ? (
                  <span className="absolute top-2 left-2 rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold tracking-wide text-card uppercase">
                    Wearing
                  </span>
                ) : null}
                <span className="block px-2.5 py-2">
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="block text-[11px] leading-snug text-muted">{have ? item.blurb : item.need}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Sparks({ tick }: { tick: number }) {
  const dots = [
    { x: "18%", y: "22%", d: "0ms" },
    { x: "78%", y: "18%", d: "80ms" },
    { x: "12%", y: "58%", d: "120ms" },
    { x: "86%", y: "48%", d: "40ms" },
    { x: "48%", y: "12%", d: "160ms" },
    { x: "70%", y: "72%", d: "200ms" },
  ];
  return (
    <div key={tick} className="pointer-events-none absolute inset-0">
      {dots.map((dot) => (
        <span
          key={dot.x + dot.y}
          className="dress-spark absolute size-2 rounded-full bg-gold"
          style={{ left: dot.x, top: dot.y, animationDelay: dot.d }}
        />
      ))}
    </div>
  );
}
