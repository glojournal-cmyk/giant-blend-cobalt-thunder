import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Diamond } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FORMA_DISTRACTORS,
  FORMA_ITEMS,
  MANUSCRIPT_CASES,
  MATCH_PAIRS,
  MOSAIC_ITEMS,
} from "@/lib/content/latin";
import { playComplete, playCorrect, playWrong } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { shuffle } from "@/lib/utils";

function GameChrome({
  title,
  level,
  points,
  streak,
  shields,
  children,
}: {
  title: string;
  level: number;
  points: number;
  streak: number;
  shields: number;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Latin game</p>
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm tabular-nums text-muted">
          <span>Level {level} / 6</span>
          <span>{points} pts</span>
          <span>Streak {streak}</span>
          <span className="inline-flex items-center gap-1 text-navy">
            {Array.from({ length: 3 }).map((_, i) => (
              <Diamond key={i} className={`size-3.5 ${i < shields ? "fill-navy" : "opacity-30"}`} />
            ))}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

function ResultCard({
  title,
  points,
  stars,
}: {
  title: string;
  points: number;
  stars: number;
  href: string;
}) {
  return (
    <Card className="p-6">
      <p className="text-xs tracking-[0.18em] text-navy uppercase">Session complete</p>
      <h2 className="font-display text-3xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted">
        {points} game points · {stars} star{stars === 1 ? "" : "s"}. Game points do not change formal mastery.
      </p>
      <div className="mt-5 flex gap-2">
        <Button asChild>
          <Link to="/study/$subject" params={{ subject: "latin" }}>
            Back to Latin
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/study/$subject" params={{ subject: "latin" }}>
            More games
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export function FormaForge({ level }: { level: number }) {
  const recordGame = useScholar((s) => s.recordGame);
  const sound = useScholar((s) => s.sound);
  const progress = useScholar((s) => s.games["forma-forge"]);
  const items = useMemo(() => shuffle(FORMA_ITEMS).slice(0, 6), []);
  const [index, setIndex] = useState(0);
  const [stem, setStem] = useState<string | null>(null);
  const [ending, setEnding] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [shields, setShields] = useState(3);
  const [done, setDone] = useState(false);
  const item = items[index];
  const stems = useMemo(() => {
    if (!item) return [];
    const others = shuffle(FORMA_ITEMS.filter((row) => row.stem !== item.stem)).slice(0, 2).map((row) => row.stem);
    return shuffle([item.stem, ...others]);
  }, [item]);
  const endings = useMemo(() => {
    if (!item) return [];
    const extra = shuffle(FORMA_DISTRACTORS.filter((end) => end !== item.ending)).slice(0, 3);
    return shuffle([item.ending, ...extra]);
  }, [item]);

  function finish(nextCorrect: number, nextPoints: number) {
    const accuracy = nextCorrect / items.length;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.85 ? 2 : accuracy >= 0.7 ? 1 : 0;
    recordGame("forma-forge", nextPoints, stars, level);
    if (sound) playComplete();
    toast("Forma Forge complete", { description: `${stars} stars · ${nextPoints} points` });
    setDone(true);
  }

  function check() {
    if (!item || !stem || !ending) return;
    const ok = stem === item.stem && ending === item.ending;
    const gained = ok ? 12 : 0;
    const nextPoints = points + gained;
    const nextCorrect = correct + (ok ? 1 : 0);
    const nextShields = ok ? shields : shields - 1;
    setPoints(nextPoints);
    setCorrect(nextCorrect);
    setShields(nextShields);
    if (sound) (ok ? playCorrect : playWrong)();
    if (!ok && nextShields <= 0) {
      finish(nextCorrect, nextPoints);
      return;
    }
    if (index + 1 >= items.length) finish(nextCorrect, nextPoints);
    else {
      setIndex((n) => n + 1);
      setStem(null);
      setEnding(null);
    }
  }

  if (done) {
    const accuracy = correct / items.length;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.85 ? 2 : accuracy >= 0.7 ? 1 : 0;
    return <ResultCard title="Forma Forge" points={points} stars={stars} href="/study/latin" />;
  }

  if (!item) return null;

  return (
    <GameChrome title="Forma Forge" level={level} points={progress?.points ?? 0} streak={progress?.streak ?? 0} shields={shields}>
      <Card className="p-5 sm:p-6">
        <p className="text-sm text-muted">Repair the present form.</p>
        <p className="font-display text-2xl font-semibold">
          {item.meaning} · {item.person}
        </p>
        <p className="mt-1 text-sm text-muted">{item.conjugation} conjugation</p>
        <div className="mt-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Stem</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {stems.map((value) => (
              <Tile key={value} active={stem === value} onClick={() => setStem(value)} label={value} />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Ending</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {endings.map((value) => (
              <Tile key={value} active={ending === value} onClick={() => setEnding(value)} label={value} />
            ))}
          </div>
        </div>
        <p className="mt-5 font-display text-2xl">
          {stem ?? "—" }
          {ending ?? ""}
        </p>
        <Button className="mt-4" onClick={check} disabled={!stem || !ending}>
          Forge
        </Button>
      </Card>
    </GameChrome>
  );
}

export function SentenceMosaic({ level }: { level: number }) {
  const recordGame = useScholar((s) => s.recordGame);
  const sound = useScholar((s) => s.sound);
  const progress = useScholar((s) => s.games["sentence-mosaic"]);
  const items = useMemo(() => shuffle(MOSAIC_ITEMS).slice(0, 5), []);
  const [index, setIndex] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [shields, setShields] = useState(3);
  const [done, setDone] = useState(false);
  const item = items[index];
  const tray = useMemo(() => (item ? shuffle(item.words) : []), [item]);

  function pick(word: string) {
    if (built.includes(word) && built.filter((w) => w === word).length >= item.words.filter((w) => w === word).length) {
      return;
    }
    setBuilt((current) => [...current, word]);
  }

  function check() {
    if (!item) return;
    const ok = built.join(" ") === item.words.join(" ");
    const nextPoints = points + (ok ? 15 : 0);
    const nextCorrect = correct + (ok ? 1 : 0);
    const nextShields = ok ? shields : shields - 1;
    setPoints(nextPoints);
    setCorrect(nextCorrect);
    setShields(nextShields);
    if (sound) (ok ? playCorrect : playWrong)();
    const end = index + 1 >= items.length || nextShields <= 0;
    if (end) {
      const accuracy = nextCorrect / items.length;
      const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.85 ? 2 : accuracy >= 0.7 ? 1 : 0;
      recordGame("sentence-mosaic", nextPoints, stars, level);
      if (sound) playComplete();
      setDone(true);
    } else {
      setIndex((n) => n + 1);
      setBuilt([]);
    }
  }

  if (done) {
    const accuracy = correct / items.length;
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.85 ? 2 : accuracy >= 0.7 ? 1 : 0;
    return <ResultCard title="Sentence Mosaic" points={points} stars={stars} href="/study/latin" />;
  }
  if (!item) return null;

  return (
    <GameChrome title="Sentence Mosaic" level={level} points={progress?.points ?? 0} streak={progress?.streak ?? 0} shields={shields}>
      <Card className="p-5 sm:p-6">
        <p className="text-sm text-muted">{item.english}</p>
        <p className="mt-1 text-xs text-bronze">{item.hint}</p>
        <div className="mt-5 min-h-16 rounded-lg border border-dashed border-line bg-sage/40 p-3">
          {built.length === 0 ? (
            <p className="text-sm text-muted">Tap tiles in order.</p>
          ) : (
            <p className="font-display text-2xl">{built.join(" ")}</p>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tray.map((word, i) => {
            const usedCount = built.filter((w) => w === word).length;
            const totalCount = item.words.filter((w) => w === word).length;
            const alreadyUsedThisSlot = tray.slice(0, i).filter((w) => w === word).length;
            if (alreadyUsedThisSlot >= totalCount || usedCount >= totalCount) return null;
            return <Tile key={`${word}-${i}`} label={word} onClick={() => pick(word)} />;
          })}
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={check} disabled={built.length !== item.words.length}>
            Check sentence
          </Button>
          <Button variant="secondary" onClick={() => setBuilt([])}>
            Clear
          </Button>
        </div>
      </Card>
    </GameChrome>
  );
}

export function VerbumMatch({ level }: { level: number }) {
  const recordGame = useScholar((s) => s.recordGame);
  const sound = useScholar((s) => s.sound);
  const progress = useScholar((s) => s.games["verbum-match"]);
  const pairs = useMemo(() => {
    const unique = [];
    const usedL = new Set<string>();
    const usedR = new Set<string>();
    for (const pair of shuffle(MATCH_PAIRS)) {
      if (usedL.has(pair.left) || usedR.has(pair.right)) continue;
      usedL.add(pair.left);
      usedR.add(pair.right);
      unique.push(pair);
      if (unique.length === 6) break;
    }
    return unique;
  }, []);
  const left = useMemo(() => shuffle(pairs.map((p) => p.left)), [pairs]);
  const right = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [misses, setMisses] = useState(0);
  const [shields, setShields] = useState(3);
  const [done, setDone] = useState(false);

  function choose(side: "left" | "right", value: string) {
    if (matched.includes(value)) return;
    if (!selected) {
      setSelected(`${side}:${value}`);
      return;
    }
    const [fromSide, fromValue] = selected.split(":");
    if (fromSide === side) {
      setSelected(`${side}:${value}`);
      return;
    }
    const a = fromSide === "left" ? fromValue : value;
    const b = fromSide === "left" ? value : fromValue;
    const ok = pairs.some((pair) => pair.left === a && pair.right === b);
    if (ok) {
      const nextMatched = [...matched, a, b];
      setMatched(nextMatched);
      setPoints((n) => n + 10);
      setSelected(null);
      if (sound) playCorrect();
      if (nextMatched.length >= pairs.length * 2) {
        const stars = misses === 0 ? 3 : misses <= 1 ? 2 : 1;
        recordGame("verbum-match", points + 10, stars, level);
        if (sound) playComplete();
        setDone(true);
      }
    } else {
      const nextShields = shields - 1;
      setMisses((n) => n + 1);
      setShields(nextShields);
      setSelected(null);
      if (sound) playWrong();
      if (nextShields <= 0) {
        recordGame("verbum-match", points, 0, level);
        setDone(true);
      }
    }
  }

  if (done) {
    const stars = matched.length >= pairs.length * 2 ? (misses === 0 ? 3 : misses <= 1 ? 2 : 1) : 0;
    return <ResultCard title="Verbum Match" points={points} stars={stars} href="/study/latin" />;
  }

  return (
    <GameChrome title="Verbum Match" level={level} points={progress?.points ?? 0} streak={progress?.streak ?? 0} shields={shields}>
      <Card className="p-5 sm:p-6">
        <p className="text-sm text-muted">Connect meanings, forms and grammar classes.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {left.map((value) => (
              <Tile
                key={value}
                label={value}
                active={selected === `left:${value}`}
                used={matched.includes(value)}
                onClick={() => choose("left", value)}
              />
            ))}
          </div>
          <div className="space-y-2">
            {right.map((value) => (
              <Tile
                key={value}
                label={value}
                active={selected === `right:${value}`}
                used={matched.includes(value)}
                onClick={() => choose("right", value)}
              />
            ))}
          </div>
        </div>
      </Card>
    </GameChrome>
  );
}

export function ManuscriptMystery({ level }: { level: number }) {
  const recordGame = useScholar((s) => s.recordGame);
  const sound = useScholar((s) => s.sound);
  const progress = useScholar((s) => s.games.manuscript);
  const cases = useMemo(() => MANUSCRIPT_CASES.slice(0, Math.min(6, 2 + level)), [level]);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<"blank" | "inspect">("blank");
  const [points, setPoints] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [shields, setShields] = useState(3);
  const [done, setDone] = useState(false);
  const item = cases[index];

  function answer(ok: boolean) {
    const nextPoints = points + (ok ? 12 : 0);
    const nextCorrect = correct + (ok ? 1 : 0);
    const nextShields = ok ? shields : Math.max(0, shields - 1);
    setPoints(nextPoints);
    setCorrect(nextCorrect);
    setShields(nextShields);
    if (sound) (ok ? playCorrect : playWrong)();
    if (nextShields <= 0) {
      wrap(nextCorrect, nextPoints);
      return;
    }
    if (step === "blank") setStep("inspect");
    else if (index + 1 >= cases.length) wrap(nextCorrect, nextPoints);
    else {
      setIndex((n) => n + 1);
      setStep("blank");
    }
  }

  function wrap(nextCorrect: number, nextPoints: number) {
    const accuracy = nextCorrect / (cases.length * 2);
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.85 ? 2 : accuracy >= 0.7 ? 1 : 0;
    recordGame("manuscript", nextPoints, stars, level);
    if (sound) playComplete();
    setDone(true);
  }

  if (done) {
    const accuracy = correct / (cases.length * 2);
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.85 ? 2 : accuracy >= 0.7 ? 1 : 0;
    return <ResultCard title="Manuscript Mystery" points={points} stars={stars} href="/study/latin" />;
  }
  if (!item) return null;

  return (
    <GameChrome title="Manuscript Mystery" level={level} points={progress?.points ?? 0} streak={progress?.streak ?? 0} shields={shields}>
      <Card className="p-5 sm:p-6">
        <p className="text-xs tracking-[0.16em] text-navy uppercase">{item.title}</p>
        <p className="mt-3 font-display text-2xl leading-snug">{item.passage.replace("___", "_____")}</p>
        {step === "blank" ? (
          <div className="mt-5 grid gap-2">
            {item.blanks[0].choices.map((choice) => (
              <Tile key={choice} label={choice} onClick={() => answer(choice === item.blanks[0].answer)} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <p className="font-medium">{item.inspect.question}</p>
            <div className="mt-3 grid gap-2">
              {item.inspect.choices.map((choice) => (
                <Tile key={choice} label={choice} onClick={() => answer(choice === item.inspect.answer)} />
              ))}
            </div>
          </div>
        )}
        <p className="mt-5 text-sm text-muted">{item.english}</p>
      </Card>
    </GameChrome>
  );
}

function Tile({
  label,
  onClick,
  active,
  used,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  used?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={used}
      onClick={onClick}
      className={`min-h-11 rounded-md border px-3 py-2 text-sm ${
        used
          ? "border-sage-2 bg-sage text-muted"
          : active
            ? "border-navy bg-navy text-card"
            : "border-line bg-card hover:bg-sage"
      }`}
    >
      {label}
    </button>
  );
}
