import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FormaForge, ManuscriptMystery, SentenceMosaic, VerbumMatch } from "@/components/games/latin-games";
import { MotMatch, PhraseMosaic } from "@/components/games/french-games";
import { PE_GAME, PeCircuit } from "@/components/games/pe-circuit";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FRENCH_GAMES } from "@/lib/content/french";
import { LATIN_GAMES } from "@/lib/content/latin";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/play/$game")({ component: PlayPage });

function PlayPage() {
  const { game } = Route.useParams();
  const latinMeta = LATIN_GAMES.find((item) => item.id === game);
  const frenchMeta = FRENCH_GAMES.find((item) => item.id === game);
  const meta = game === PE_GAME.id ? PE_GAME : latinMeta ?? frenchMeta;
  const progress = useScholar((s) => s.games[game]);
  const [level, setLevel] = useState<number | null>(null);

  if (!meta) throw notFound();

  const levels = "levels" in meta ? meta.levels : 6;

  if (level) {
    if (game === PE_GAME.id) return <PeCircuit level={level} />;
    if (game === "forma-forge") return <FormaForge level={level} />;
    if (game === "sentence-mosaic") return <SentenceMosaic level={level} />;
    if (game === "verbum-match") return <VerbumMatch level={level} />;
    if (game === "manuscript") return <ManuscriptMystery level={level} />;
    if (game === "mot-match") return <MotMatch level={level} />;
    if (game === "phrase-mosaic") return <PhraseMosaic level={level} />;
  }

  const unlocked = progress?.unlocked ?? 1;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link to="/play" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft className="size-4" /> Play
      </Link>
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{meta.kicker}</p>
        <h1 className="font-display text-4xl font-semibold">{meta.name}</h1>
        <p className="mt-2 text-muted">{meta.blurb}</p>
      </div>
      <Card className="flex flex-wrap items-center gap-4 p-4 text-sm tabular-nums">
        <span>Game points {progress?.points ?? 0}</span>
        <span>Streak {progress?.streak ?? 0}</span>
        <span>
          Unlocked {unlocked}/{levels}
        </span>
      </Card>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Array.from({ length: levels }).map((_, i) => {
          const n = i + 1;
          const locked = n > unlocked;
          const stars = progress?.stars[i] ?? 0;
          return (
            <Button
              key={n}
              variant={locked ? "secondary" : "outline"}
              disabled={locked}
              onClick={() => setLevel(n)}
              className="h-16 flex-col"
            >
              <span>{game === PE_GAME.id ? `Circuit ${n}` : `Level ${n}`}</span>
              <span className="text-xs text-muted">
                {locked ? "Locked" : stars ? `${stars} star${stars === 1 ? "" : "s"}` : "Play"}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
