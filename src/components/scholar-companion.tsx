import { useState } from "react";
import { DEFAULT_SCHOLAR_NAME, outfitById } from "@/lib/content/outfits";
import { useScholar } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ScholarCompanion({
  line,
  compact = false,
  className,
}: {
  line?: string;
  compact?: boolean;
  className?: string;
}) {
  const name = useScholar((s) => s.displayName);
  const outfitId = useScholar((s) => s.equippedOutfit);
  const label = name.trim() || DEFAULT_SCHOLAR_NAME;
  const outfit = outfitById(outfitId);
  const preferred = "/art/scholar-sit.jpg";
  const [src, setSrc] = useState(preferred);

  return (
    <aside className={cn("overflow-hidden rounded-[22px] bg-card shadow-[var(--shadow-border)]", className)}>
      <div className={cn("grid", compact ? "grid-cols-[92px_1fr]" : "grid-cols-[128px_1fr] sm:grid-cols-[148px_1fr]")}>
        <div className="bg-sage/70">
          <img
            src={src}
            alt=""
            onError={() => setSrc(outfit.art)}
            className={cn("h-full w-full object-cover object-[50%_18%]", compact ? "min-h-[92px]" : "min-h-[148px]")}
          />
        </div>
        <div className={cn("flex flex-col justify-center", compact ? "p-3.5" : "p-4")}>
          <p className="kicker">Your scholar</p>
          <p className={cn("font-display font-semibold leading-tight", compact ? "text-xl" : "text-2xl")}>{label}</p>
          <p className={cn("text-muted", compact ? "text-xs" : "text-sm")}>{line ?? "Shall we study a little more?"}</p>
        </div>
      </div>
    </aside>
  );
}
