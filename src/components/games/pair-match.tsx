import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { playComplete, playCorrect, playFlip, playWrong } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { shuffle } from "@/lib/utils";

export function PairMatch({
  gameId,
  title,
  kicker,
  backSubject,
  pairs,
  level,
}: {
  gameId: string;
  title: string;
  kicker: string;
  backSubject: "chemistry" | "physics" | "english" | "biology";
  pairs: { left: string; right: string }[];
  level: number;
}) {
  const sound = useScholar((s) => s.sound);
  const recordGame = useScholar((s) => s.recordGame);
  const set = useMemo(() => shuffle(pairs).slice(0, 4 + Math.min(level, 4)), [level, pairs]);
  const [left] = useState(() => shuffle(set.map((p) => p.left)));
  const [right] = useState(() => shuffle(set.map((p) => p.right)));
  const [picked, setPicked] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function choose(side: "l" | "r", value: string) {
    if (matched.includes(value)) return;
    if (!picked) {
      setPicked(`${side}:${value}`);
      playFlip();
      return;
    }
    const [ps, pv] = picked.split(":");
    if (ps === side) {
      setPicked(`${side}:${value}`);
      return;
    }
    const a = side === "l" ? value : pv;
    const b = side === "r" ? value : pv;
    const ok = set.some((p) => p.left === a && p.right === b);
    if (ok) {
      const next = [...matched, a, b];
      setMatched(next);
      if (sound) playCorrect();
      if (next.length >= set.length * 2) {
        const points = 36 + level * 8;
        recordGame(gameId, points, 3, level);
        if (sound) playComplete();
        toast(`${title} complete`, { description: `${points} game points.` });
        setDone(true);
      }
    } else if (sound) playWrong();
    setPicked(null);
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-2xl p-6">
        <p className="text-xs tracking-[0.18em] text-navy uppercase">Session complete</p>
        <h2 className="font-display text-3xl font-semibold">{title}</h2>
        <p className="mt-2 text-muted">{36 + level * 8} game points.</p>
        <Button asChild className="mt-5">
          <Link to="/study/$subject/play" params={{ subject: backSubject }}>
            Back to games
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{kicker}</p>
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="text-sm text-muted">Tap a pair that belongs together.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          {left.map((word) => (
            <button
              key={word}
              type="button"
              disabled={matched.includes(word)}
              onClick={() => choose("l", word)}
              className={`min-h-12 w-full rounded-lg border px-4 py-3 text-left ${
                matched.includes(word) ? "bg-sage opacity-50" : picked === `l:${word}` ? "bg-navy text-card" : "bg-card"
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
              onClick={() => choose("r", word)}
              className={`min-h-12 w-full rounded-lg border px-4 py-3 text-left ${
                matched.includes(word) ? "bg-sage opacity-50" : picked === `r:${word}` ? "bg-navy text-card" : "bg-card"
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
