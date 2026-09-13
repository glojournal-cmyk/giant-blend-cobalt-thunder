import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FRENCH_VOCAB } from "@/lib/content/french";
import { playComplete, playCorrect, playWrong } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { shuffle } from "@/lib/utils";

function Result({ title, points }: { title: string; points: number }) {
  return (
    <Card className="p-6">
      <p className="text-xs tracking-[0.18em] text-navy uppercase">Session complete</p>
      <h2 className="font-display text-3xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted">{points} game points. Formal mastery stays academic.</p>
      <Button asChild className="mt-5">
        <Link to="/study/$subject/play" params={{ subject: "french" }}>
          Back to French games
        </Link>
      </Button>
    </Card>
  );
}

export function MotMatch({ level }: { level: number }) {
  const sound = useScholar((s) => s.sound);
  const recordGame = useScholar((s) => s.recordGame);
  const pairs = useMemo(() => shuffle(FRENCH_VOCAB).slice(0, 4 + Math.min(level, 4)), [level]);
  const [left] = useState(() => shuffle(pairs.map((p) => p.french)));
  const [right] = useState(() => shuffle(pairs.map((p) => p.english)));
  const [picked, setPicked] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function choose(side: "fr" | "en", value: string) {
    if (matched.includes(value)) return;
    if (!picked) {
      setPicked(`${side}:${value}`);
      return;
    }
    const [ps, pv] = picked.split(":");
    if (ps === side) {
      setPicked(`${side}:${value}`);
      return;
    }
    const fr = side === "fr" ? value : pv;
    const en = side === "en" ? value : pv;
    const ok = pairs.some((p) => p.french === fr && p.english === en);
    if (ok) {
      const next = [...matched, fr, en];
      setMatched(next);
      if (sound) playCorrect();
      if (next.length >= pairs.length * 2) {
        const points = 40 + level * 8;
        recordGame("mot-match", points, 3, level);
        if (sound) playComplete();
        toast("Mot Match complete", { description: `${points} game points.` });
        setDone(true);
      }
    } else if (sound) playWrong();
    setPicked(null);
  }

  if (done) return <Result title="Mot Match" points={40 + level * 8} />;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">French game</p>
      <h1 className="font-display text-3xl font-semibold">Mot Match</h1>
      <p className="text-sm text-muted">Match each French word to its English meaning.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          {left.map((word) => (
            <button
              key={word}
              type="button"
              disabled={matched.includes(word)}
              onClick={() => choose("fr", word)}
              className={`min-h-12 w-full rounded-lg border px-4 py-3 text-left ${
                matched.includes(word)
                  ? "border-good bg-sage-2"
                  : picked === `fr:${word}`
                    ? "border-navy bg-sky"
                    : "border-line bg-card hover:bg-sage"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((word) => (
            <button
              key={word}
              type="button"
              disabled={matched.includes(word)}
              onClick={() => choose("en", word)}
              className={`min-h-12 w-full rounded-lg border px-4 py-3 text-left ${
                matched.includes(word)
                  ? "border-good bg-sage-2"
                  : picked === `en:${word}`
                    ? "border-navy bg-sky"
                    : "border-line bg-card hover:bg-sage"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const PHRASES = [
  { id: "p1", tiles: ["Je", "m'appelle", "Sam"], english: "My name is Sam." },
  { id: "p2", tiles: ["J'habite", "dans", "une", "petite", "ville"], english: "I live in a small town." },
  { id: "p3", tiles: ["Il", "y", "a", "un", "parc"], english: "There is a park." },
  { id: "p4", tiles: ["J'aime", "le", "français", "parce", "que", "c'est", "intéressant"], english: "I like French because it is interesting." },
  { id: "p5", tiles: ["Je", "n'aime", "pas", "les", "maths"], english: "I don't like maths." },
  { id: "p6", tiles: ["Le", "week-end", "je", "vais", "au", "café"], english: "At the weekend I go to the café." },
];

export function PhraseMosaic({ level }: { level: number }) {
  const sound = useScholar((s) => s.sound);
  const recordGame = useScholar((s) => s.recordGame);
  const item = PHRASES[(level - 1) % PHRASES.length];
  const [pool, setPool] = useState(() => shuffle(item.tiles));
  const [built, setBuilt] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function take(tile: string, i: number) {
    setBuilt((b) => [...b, tile]);
    setPool((p) => p.filter((_, idx) => idx !== i));
  }

  function undo() {
    if (!built.length) return;
    const last = built[built.length - 1];
    setBuilt((b) => b.slice(0, -1));
    setPool((p) => [...p, last]);
  }

  function submit() {
    const ok = built.join(" ") === item.tiles.join(" ");
    if (ok) {
      const points = 30 + level * 6;
      recordGame("phrase-mosaic", points, 3, level);
      if (sound) playComplete();
      toast("Phrase Mosaic complete");
      setDone(true);
    } else if (sound) playWrong();
  }

  if (done) return <Result title="Phrase Mosaic" points={30 + level * 6} />;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">French game</p>
      <h1 className="font-display text-3xl font-semibold">Phrase Mosaic</h1>
      <p className="text-muted">{item.english}</p>
      <Card className="min-h-24 p-4">
        <div className="flex flex-wrap gap-2">
          {built.map((tile, i) => (
            <span key={`${tile}-${i}`} className="rounded-md bg-sage px-3 py-2 text-sm">
              {tile}
            </span>
          ))}
        </div>
      </Card>
      <div className="flex flex-wrap gap-2">
        {pool.map((tile, i) => (
          <button
            key={`${tile}-${i}`}
            type="button"
            onClick={() => take(tile, i)}
            className="rounded-md border border-line bg-card px-3 py-2 text-sm hover:bg-sage"
          >
            {tile}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={undo} disabled={!built.length}>
          Undo
        </Button>
        <Button onClick={submit} disabled={built.length !== item.tiles.length}>
          Check
        </Button>
      </div>
    </div>
  );
}
