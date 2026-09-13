import { createFileRoute, Link } from "@tanstack/react-router";
import { PE_GAME } from "@/components/games/pe-circuit";
import { Card } from "@/components/ui/card";
import { LATIN_GAMES } from "@/lib/content/latin";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/play/")({ component: PlayHub });

function PlayHub() {
  const games = useScholar((s) => s.games);
  const pe = games[PE_GAME.id];

  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Exercise · Mini games</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Play</h1>
        <p className="mt-2 text-muted">
          Train Body on the quad, then sharpen Spark with Latin games. Outfits and medals unlock as you go.
        </p>
      </header>

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

      <section className="space-y-3">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Latin games</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {LATIN_GAMES.map((game) => {
            const progress = games[game.id];
            return (
              <Link key={game.id} to="/play/$game" params={{ game: game.id }} className="group">
                <Card className="h-full p-4 transition-colors group-hover:bg-sage">
                  <p className="text-xs tracking-[0.16em] text-navy uppercase">{game.kicker}</p>
                  <p className="font-display text-xl font-semibold">{game.name}</p>
                  <p className="mt-1 text-sm text-muted">{game.blurb}</p>
                  <p className="mt-3 text-xs tabular-nums text-muted">
                    Lv {progress?.unlocked ?? 1}/6 · {progress?.points ?? 0} pts
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
