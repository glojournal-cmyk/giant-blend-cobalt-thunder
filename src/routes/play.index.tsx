import { createFileRoute, Link } from "@tanstack/react-router";
import { ScholarCompanion } from "@/components/scholar-companion";
import { PE_GAME } from "@/components/games/pe-circuit";
import { Card } from "@/components/ui/card";
import { gameArt } from "@/lib/content/banks";
import { BIO_GAMES } from "@/lib/content/biology";
import { CHEM_GAMES } from "@/lib/content/chemistry";
import { ENG_GAMES } from "@/lib/content/english";
import { FRENCH_GAMES } from "@/lib/content/french";
import { LATIN_GAMES } from "@/lib/content/latin";
import { PHYS_GAMES } from "@/lib/content/physics";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/play/")({ component: PlayHub });

function PlayHub() {
  const games = useScholar((s) => s.games);
  const pe = games[PE_GAME.id];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Exercise · Mini games</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Play</h1>
          <p className="mt-2 text-muted">Mini games first — Latin, French, science, English, then PE for Body.</p>
        </div>
        <ScholarCompanion compact line="A game, then the garden?" className="w-full max-w-sm" />
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">Latin · Spark</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {LATIN_GAMES.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} kicker={game.kicker} blurb={game.blurb} points={games[game.id]?.points ?? 0} unlocked={games[game.id]?.unlocked ?? 1} levels={game.levels} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">French</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FRENCH_GAMES.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} kicker={game.kicker} blurb={game.blurb} points={games[game.id]?.points ?? 0} unlocked={games[game.id]?.unlocked ?? 1} levels={game.levels} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">Science & English</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...BIO_GAMES, ...CHEM_GAMES, ...PHYS_GAMES, ...ENG_GAMES].map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} kicker={game.kicker} blurb={game.blurb} points={games[game.id]?.points ?? 0} unlocked={games[game.id]?.unlocked ?? 1} levels={game.levels} />
          ))}
        </div>
      </section>

      <Link to="/play/$game" params={{ game: PE_GAME.id }} className="block">
        <Card className="overflow-hidden p-0 transition-colors hover:bg-sage">
          <div className="grid sm:grid-cols-[200px_1fr]">
            <img src="/art/outfits/pe.jpg" alt="" className="h-44 w-full object-cover object-[50%_12%] sm:h-full" />
            <div className="p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{PE_GAME.kicker}</p>
              <h2 className="font-display text-3xl font-semibold">{PE_GAME.name}</h2>
              <p className="mt-2 text-sm text-muted">{PE_GAME.blurb}</p>
              <p className="mt-3 text-sm tabular-nums text-muted">
                Circuit {pe?.unlocked ?? 1}/{PE_GAME.levels} · {pe?.points ?? 0} pts
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

function GameCard({
  id,
  name,
  kicker,
  blurb,
  points,
  unlocked,
  levels,
}: {
  id: string;
  name: string;
  kicker: string;
  blurb: string;
  points: number;
  unlocked: number;
  levels: number;
}) {
  return (
    <Link to="/play/$game" params={{ game: id }} className="group">
      <Card className="h-full overflow-hidden p-0 transition-transform duration-150 group-hover:-translate-y-0.5">
        <img src={gameArt(id)} alt="" className="h-36 w-full object-cover" />
        <div className="p-4">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">{kicker}</p>
          <p className="font-display text-xl font-semibold">{name}</p>
          <p className="mt-1 text-sm text-muted">{blurb}</p>
          <p className="mt-3 text-xs tabular-nums text-muted">
            Lv {unlocked}/{levels} · {points} pts
          </p>
        </div>
      </Card>
    </Link>
  );
}
