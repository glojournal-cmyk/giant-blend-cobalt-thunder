import { Link } from "@tanstack/react-router";
import { artForLook, DEFAULT_SCHOLAR_NAME, lookLabel, outfitById } from "@/lib/content/outfits";
import { useScholar } from "@/lib/store";

export function CharacterStage({
  name,
  line,
  level,
}: {
  outfitId?: string;
  name: string;
  line: string;
  level: number;
}) {
  const look = useScholar((s) => s.look) ?? { top: "jumper", bottom: "skirt", outer: "none", extra: "tights" };
  const equipped = useScholar((s) => s.equippedOutfit);
  const art = artForLook(look);
  const outfit = outfitById(equipped);
  const label = name.trim() || DEFAULT_SCHOLAR_NAME;

  return (
    <div className="overflow-hidden rounded-[28px] bg-card shadow-[var(--shadow-border)]">
      <div className="relative bg-sage/50">
        <img
          src={art}
          alt={`${label} in ${lookLabel(look)}`}
          className="scholar-idle mx-auto block max-h-[min(68vh,680px)] w-auto max-w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/55 to-transparent" />
        <Link
          to="/scholar"
          className="absolute top-3 right-3 rounded-full bg-card/92 px-3.5 py-1.5 text-xs font-medium tracking-wide text-navy shadow-[var(--shadow-border)] backdrop-blur-sm hover:bg-card"
        >
          Wardrobe
        </Link>
      </div>
      <div className="space-y-2 px-5 py-5 sm:px-6">
        <p className="kicker">Lux et Labor · Raise your scholar</p>
        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{label}</h1>
          <p className="mt-1 text-sm text-muted">
            Lv {level} · {lookLabel(look)}
          </p>
          <p className="text-xs text-muted">{outfit.name} set</p>
        </div>
        <p className="font-display text-xl leading-snug text-navy italic sm:text-[1.35rem]">{line}</p>
      </div>
    </div>
  );
}
