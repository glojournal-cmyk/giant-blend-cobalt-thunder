import { Link } from "@tanstack/react-router";
import { DEFAULT_SCHOLAR_NAME, outfitById } from "@/lib/content/outfits";

export function CharacterStage({
  outfitId,
  name,
  line,
  level,
}: {
  outfitId: string;
  name: string;
  line: string;
  level: number;
}) {
  const outfit = outfitById(outfitId);
  const label = name.trim() || DEFAULT_SCHOLAR_NAME;

  return (
    <div className="relative overflow-hidden rounded-xl bg-navy">
      <img
        src={outfit.art}
        alt={`${label} in ${outfit.name}`}
        className="scholar-idle mx-auto block max-h-[min(78vh,860px)] w-full object-contain outline-none"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy via-navy/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 text-card sm:p-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-card/70 uppercase">Lux et Labor · Raise your scholar</p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{label}</h1>
            <p className="mt-1 text-sm text-card/80">
              Lv {level} · {outfit.name}
            </p>
          </div>
          <Link
            to="/scholar"
            className="pointer-events-auto shrink-0 rounded-full bg-card/15 px-3 py-2 text-xs font-medium tracking-wide text-card backdrop-blur-sm hover:bg-card/25"
          >
            Wardrobe
          </Link>
        </div>
        <p className="max-w-md rounded-lg bg-navy/55 px-3 py-2.5 font-display text-lg leading-snug text-card/95 backdrop-blur-sm sm:text-xl">
          {line}
        </p>
      </div>
    </div>
  );
}
