import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { playComplete, playCorrect, playWrong } from "@/lib/audio";
import { outfitById } from "@/lib/content/outfits";
import { useScholar } from "@/lib/store";
import { cn } from "@/lib/utils";

export const PE_GAME = {
  id: "pe-circuit",
  name: "Quad Circuit",
  kicker: "PE",
  blurb: "Catch, remember, keep time. Raises Body, and unlocks kit.",
  levels: 3,
} as const;

const HOUSE = [
  { id: "navy", label: "Navy", className: "bg-navy text-card" },
  { id: "leaf", label: "Leaf", className: "bg-leaf text-card" },
  { id: "bronze", label: "Bronze", className: "bg-bronze text-card" },
  { id: "sage", label: "Sage", className: "bg-sage-2 text-ink" },
] as const;

function announce(unlocked: string[]) {
  for (const id of unlocked) {
    if (id.startsWith("outfit:")) {
      const outfit = outfitById(id.slice(7));
      toast("Outfit unlocked", { description: outfit.name });
    }
  }
}

export function PeCircuit({ level }: { level: number }) {
  const recordPe = useScholar((s) => s.recordPe);
  const sound = useScholar((s) => s.sound);
  const [station, setStation] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [scores, setScores] = useState<number[]>([]);

  const finishStation = (score: number) => {
    const next = [...scores, score];
    setScores(next);
    if (station === 3) {
      const avg = Math.round(next.reduce((a, b) => a + b, 0) / next.length);
      const stars = avg >= 88 ? 3 : avg >= 68 ? 2 : avg >= 40 ? 1 : 0;
      const points = 40 + avg + level * 8;
      const result = recordPe(points, stars, level);
      if (sound) playComplete();
      announce(result.unlocked);
      toast("Circuit complete", { description: `${stars} star${stars === 1 ? "" : "s"} · ${result.awarded} XP` });
      setStation(4);
      return;
    }
    setStation((s) => (s + 1) as 1 | 2 | 3);
  };

  if (station === 0) {
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <Header level={level} />
        <Card className="overflow-hidden p-0">
          <img src="/art/outfits/pe.jpg" alt="" className="h-44 w-full object-cover object-[50%_18%]" />
          <div className="space-y-3 p-5">
            <p className="text-sm text-muted">
              Three stations on the quad: catch, remember, keep time. Accuracy raises Body XP and can unlock the PE
              kit.
            </p>
            <Button className="w-full" onClick={() => setStation(1)}>
              Take your mark
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (station === 4) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
    const stars = avg >= 88 ? 3 : avg >= 68 ? 2 : avg >= 40 ? 1 : 0;
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <Header level={level} />
        <Card className="p-6">
          <p className="text-xs tracking-[0.18em] text-navy uppercase">Circuit complete</p>
          <h2 className="font-display text-3xl font-semibold">Back to the changing rooms</h2>
          <p className="mt-2 text-muted">
            Catch {scores[0] ?? 0} · Memory {scores[1] ?? 0} · Cadence {scores[2] ?? 0}. Average {avg}. {stars} star
            {stars === 1 ? "" : "s"}.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/">See your scholar</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/play">More play</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Header level={level} />
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">
        Station {station} of 3
      </p>
      {station === 1 && <CatchStation level={level} onDone={finishStation} sound={sound} />}
      {station === 2 && <MemoryStation level={level} onDone={finishStation} sound={sound} />}
      {station === 3 && <CadenceStation level={level} onDone={finishStation} sound={sound} />}
    </div>
  );
}

function Header({ level }: { level: number }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">PE · Quad circuit</p>
      <h1 className="font-display text-3xl font-semibold">Circuit {level}</h1>
    </div>
  );
}

function CatchStation({
  level,
  onDone,
  sound,
}: {
  level: number;
  onDone: (score: number) => void;
  sound: boolean;
}) {
  const total = 4 + level;
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [ballY, setBallY] = useState(-12);
  const [live, setLive] = useState(false);
  const yRef = useRef(-12);
  const running = useRef(false);
  const raf = useRef(0);
  const start = useRef(0);
  const duration = useRef(1400);
  const tapped = useRef(false);
  const hitsRef = useRef(0);
  const roundRef = useRef(0);

  const ZONE_TOP = 58;
  const ZONE_BOT = 90;

  const endRound = (hit: boolean) => {
    if (!running.current) return;
    running.current = false;
    cancelAnimationFrame(raf.current);
    if (hit) {
      hitsRef.current += 1;
      setHits(hitsRef.current);
      if (sound) playCorrect();
    } else if (sound) playWrong();
    const nextRound = roundRef.current + 1;
    roundRef.current = nextRound;
    setRound(nextRound);
    setLive(false);
    setBallY(-12);
    yRef.current = -12;
    if (nextRound >= total) {
      onDone(Math.round((hitsRef.current / total) * 100));
      return;
    }
    window.setTimeout(() => launch(), 380);
  };

  const launch = () => {
    cancelAnimationFrame(raf.current);
    tapped.current = false;
    running.current = true;
    duration.current = Math.max(620, 1500 - level * 140 - roundRef.current * 70);
    start.current = performance.now();
    setLive(true);
    const loop = (now: number) => {
      const t = Math.min(1, (now - start.current) / duration.current);
      const y = t * 112;
      yRef.current = y;
      setBallY(y);
      if (t >= 1) {
        endRound(false);
        return;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const t = window.setTimeout(() => launch(), 500);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf.current);
      running.current = false;
    };
    // launch once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryCatch = () => {
    if (!running.current || tapped.current) return;
    tapped.current = true;
    const y = yRef.current;
    endRound(y >= ZONE_TOP && y <= ZONE_BOT);
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center justify-between px-4 py-3 text-sm tabular-nums">
        <span>
          Catch {Math.min(round + (live ? 1 : 0), total)} / {total}
        </span>
        <span className="text-muted">{hits} clean</span>
      </div>
      <button
        type="button"
        onClick={tryCatch}
        className="relative block h-[320px] w-full touch-manipulation bg-navy text-left"
        aria-label="Tap when the ball is in the catch band"
      >
        <div
          className="absolute inset-x-0 bg-leaf/35"
          style={{ top: `${ZONE_TOP}%`, height: `${ZONE_BOT - ZONE_TOP}%` }}
        />
        <p className="absolute top-3 left-3 text-xs tracking-[0.16em] text-card/70 uppercase">Catch band</p>
        <div
          className="absolute left-1/2 size-11 -translate-x-1/2 rounded-full bg-card shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
          style={{ top: `${ballY}%`, marginTop: "-22px" }}
        />
        <p className="absolute inset-x-0 bottom-3 text-center text-sm text-card/80">Tap when the ball is in the band</p>
      </button>
    </Card>
  );
}

function MemoryStation({
  level,
  onDone,
  sound,
}: {
  level: number;
  onDone: (score: number) => void;
  sound: boolean;
}) {
  const rounds = 3 + level;
  const sequence = useMemo(() => {
    const out: number[] = [];
    let seed = 17 + level * 9;
    for (let i = 0; i < rounds; i++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      out.push(seed % 4);
    }
    return out;
  }, [level, rounds]);

  const [shown, setShown] = useState(-1);
  const [lit, setLit] = useState<number | null>(null);
  const [input, setInput] = useState<number[]>([]);
  const [locked, setLocked] = useState(true);
  const [hits, setHits] = useState(0);
  const playing = useRef(false);

  const playSeq = async (count: number) => {
    playing.current = true;
    setLocked(true);
    setInput([]);
    for (let i = 0; i < count; i++) {
      await wait(280);
      setLit(sequence[i]);
      if (sound) playCorrect();
      await wait(420);
      setLit(null);
    }
    playing.current = false;
    setLocked(false);
  };

  useEffect(() => {
    void playSeq(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const press = (index: number) => {
    if (locked || playing.current) return;
    const next = [...input, index];
    setInput(next);
    setLit(index);
    window.setTimeout(() => setLit(null), 160);
    const expected = sequence[next.length - 1];
    if (index !== expected) {
      if (sound) playWrong();
      onDone(Math.round((hits / rounds) * 100));
      return;
    }
    const needed = shown === -1 ? 1 : shown + 1;
    if (next.length === needed) {
      const roundNow = needed;
      const newHits = hits + 1;
      setHits(newHits);
      setLocked(true);
      if (sound) playCorrect();
      if (roundNow >= rounds) {
        onDone(100);
        return;
      }
      setShown(roundNow);
      window.setTimeout(() => void playSeq(roundNow + 1), 500);
    }
  };

  const roundNow = shown === -1 ? 1 : Math.min(shown + 1, rounds);

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between text-sm tabular-nums">
        <span>
          House memory {roundNow} / {rounds}
        </span>
        <span className="text-muted">{locked ? "Watch" : "Repeat"}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {HOUSE.map((house, index) => (
          <button
            key={house.id}
            type="button"
            disabled={locked}
            onClick={() => press(index)}
            className={cn(
              "min-h-24 rounded-lg text-sm font-semibold tracking-wide uppercase transition-transform duration-150 active:scale-[0.96]",
              house.className,
              lit === index ? "ring-4 ring-card ring-offset-2 ring-offset-paper" : "opacity-90",
              locked && "cursor-default",
            )}
          >
            {house.label}
          </button>
        ))}
      </div>
    </Card>
  );
}

function CadenceStation({
  level,
  onDone,
  sound,
}: {
  level: number;
  onDone: (score: number) => void;
  sound: boolean;
}) {
  const beats = 6 + level * 2;
  const bpm = 76 + level * 10;
  const interval = 60 / bpm;
  const [count, setCount] = useState(0);
  const [pulse, setPulse] = useState(1);
  const [started, setStarted] = useState(false);
  const errors = useRef<number[]>([]);
  const beatAt = useRef(0);
  const beatIndex = useRef(0);
  const raf = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    if (!started) return;
    beatAt.current = performance.now() + 400;
    beatIndex.current = 0;
    const loop = (now: number) => {
      if (done.current) return;
      const until = beatAt.current - now;
      const phase = 1 - Math.min(1, Math.max(0, until / interval));
      setPulse(0.92 + Math.sin(phase * Math.PI) * 0.1);
      if (now >= beatAt.current + interval * 0.48 && beatIndex.current < beats) {
        // auto-advance missed beat
        const missedFor = beatIndex.current;
        if (errors.current.length === missedFor) {
          errors.current.push(1);
          if (sound) playWrong();
          beatIndex.current += 1;
          beatAt.current += interval;
          setCount(beatIndex.current);
          if (beatIndex.current >= beats) {
            finish();
            return;
          }
        }
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    cancelAnimationFrame(raf.current);
    const acc = errors.current.reduce((s, e) => s + (1 - e), 0);
    onDone(Math.round((acc / beats) * 100));
  };

  const tap = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (done.current || beatIndex.current >= beats) return;
    const now = performance.now();
    const delta = Math.abs(now - beatAt.current) / interval;
    const err = Math.min(1, delta);
    errors.current.push(err);
    if (err < 0.28) {
      if (sound) playCorrect();
    } else if (sound) playWrong();
    beatIndex.current += 1;
    beatAt.current += interval;
    setCount(beatIndex.current);
    if (beatIndex.current >= beats) finish();
  };

  return (
    <Card className="flex flex-col items-center gap-4 p-6">
      <p className="text-sm tabular-nums text-muted">
        {started ? `Beat ${Math.min(count + 1, beats)} / ${beats}` : "Tap to start the metronome"}
      </p>
      <button
        type="button"
        onClick={tap}
        className="grid size-36 place-items-center rounded-full bg-navy text-card transition-transform duration-75 active:scale-[0.96]"
        style={{ transform: `scale(${pulse})` }}
      >
        <span className="font-display text-2xl">{started ? "Tap" : "Start"}</span>
      </button>
      <p className="text-center text-sm text-muted">Tap on the pulse. Closer to the beat scores higher.</p>
    </Card>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
