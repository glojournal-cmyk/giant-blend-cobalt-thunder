import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PE_GAME } from "@/components/games/pe-circuit";
import { gameArt, gamesFor } from "@/lib/content/banks";
import { subjectById } from "@/lib/content/subjects";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/study/$subject/play")({ component: PlayHub });

function PlayHub() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const games = useScholar((s) => s.games);
  const list = gamesFor(subject);

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted">
        <Link to="/study/$subject" params={{ subject }} className="hover:text-ink">
          {meta.name}
        </Link>{" "}
        · Play
      </p>
      <header>
        <h1 className="font-display text-4xl font-semibold">{meta.name} Games</h1>
        <p className="mt-2 text-muted">Mini games grow Spark. PE grows Body. Outfits unlock as you play.</p>
      </header>
      {list.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((game) => {
            const progress = games[game.id];
            return (
              <Link key={game.id} to="/play/$game" params={{ game: game.id }} className="group">
                <Card className="overflow-hidden p-0 transition-transform duration-150 group-hover:-translate-y-0.5">
                  <img src={gameArt(game.id)} alt="" className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{game.kicker}</p>
                    <h2 className="font-display text-2xl font-semibold">{game.name}</h2>
                    <p className="mt-2 text-sm text-muted">{game.blurb}</p>
                    <p className="mt-3 text-sm tabular-nums text-muted">
                      {progress?.points ?? 0} pts · unlocked {progress?.unlocked ?? 1}/{game.levels}
                    </p>
                    <p className="mt-3 text-xs font-medium tracking-wide text-navy">Play →</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card className="p-5">
          <p className="font-display text-2xl font-semibold">PE still counts</p>
          <p className="mt-2 text-sm text-muted">This subject’s games are still growing. Train Body on the circuit meanwhile.</p>
          <Link to="/play/$game" params={{ game: PE_GAME.id }} className="mt-3 inline-flex text-sm font-medium text-navy">
            Open PE Circuit →
          </Link>
        </Card>
      )}
    </div>
  );
}
