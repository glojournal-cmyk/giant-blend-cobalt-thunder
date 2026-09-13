import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { LATIN_GAMES } from "@/lib/content/latin";
import { FRENCH_GAMES } from "@/lib/content/french";
import { PE_GAME } from "@/components/games/pe-circuit";
import { subjectById } from "@/lib/content/subjects";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/study/$subject/play")({ component: PlayHub });

function PlayHub() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const games = useScholar((s) => s.games);
  const list =
    subject === "latin"
      ? LATIN_GAMES
      : subject === "french"
        ? FRENCH_GAMES
        : [];

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
        <p className="mt-2 text-muted">Learn through play. Small games. A brighter you.</p>
      </header>
      {list.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((game) => {
            const progress = games[game.id];
            return (
              <Link key={game.id} to="/play/$game" params={{ game: game.id }} className="group">
                <Card className="overflow-hidden p-0 transition-transform duration-150 group-hover:-translate-y-0.5">
                  <img
                    src={
                      game.id === "forma-forge"
                        ? "/art/games/forma.jpg"
                        : game.id === "sentence-mosaic"
                          ? "/art/games/mosaic.jpg"
                          : game.id === "verbum-match" || game.id === "mot-match"
                            ? "/art/games/match.jpg"
                            : "/art/games/manuscript.jpg"
                    }
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                  <div className="flex items-end justify-between p-5">
                    <div>
                      <p className="text-xs tracking-[0.16em] text-navy uppercase">{game.kicker}</p>
                      <h2 className="font-display text-2xl font-semibold">{game.name}</h2>
                      <p className="mt-1 text-sm text-muted">{game.blurb}</p>
                    </div>
                    <div className="text-right text-xs text-muted tabular-nums">
                      <div>Lv {progress?.unlocked ?? 1}/{game.levels}</div>
                      <div>{progress?.points ?? 0} pts</div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card className="p-6">
          <h2 className="font-display text-2xl font-semibold">Learning games</h2>
          <p className="mt-2 text-muted">Subject games for {meta.name} are still growing. PE Circuit is always open.</p>
          <Link to="/play/$game" params={{ game: PE_GAME.id }} className="mt-4 inline-flex text-sm font-medium text-navy">
            Open PE Circuit →
          </Link>
        </Card>
      )}
    </div>
  );
}
