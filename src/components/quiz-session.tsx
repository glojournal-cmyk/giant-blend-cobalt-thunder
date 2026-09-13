import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { playComplete, playCorrect, playWrong } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { linkFromHref } from "@/lib/nav";
import type { SubjectId } from "@/lib/content/subjects";
import { foldFrenchLoose, foldLatin, shuffle } from "@/lib/utils";

export type QuizItem = {
  id: string;
  prompt: string;
  answer: string;
  accepted: string[];
  choices: string[];
  explain: string;
};

export function QuizSession({
  title,
  kicker,
  items,
  subject,
  dailyId,
  fold = "latin",
  backHref,
  size = 8,
}: {
  title: string;
  kicker: string;
  items: QuizItem[];
  subject: SubjectId;
  dailyId?: string;
  fold?: "latin" | "french";
  backHref: string;
  size?: number;
}) {
  const sound = useScholar((s) => s.sound);
  const recordAttempt = useScholar((s) => s.recordAttempt);
  const bumpDaily = useScholar((s) => s.bumpDaily);
  const award = useScholar((s) => s.award);
  const deck = useMemo(() => shuffle(items).slice(0, Math.min(size, items.length)), [items, size]);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [mode, setMode] = useState<"choice" | "type">("choice");
  const [verdict, setVerdict] = useState<null | { ok: boolean; given: string }>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[index];
  const total = deck.length;

  function matches(given: string) {
    const check = fold === "french" ? foldFrenchLoose : foldLatin;
    const target = [item.answer, ...item.accepted].map(check);
    return target.includes(check(given));
  }

  function submit(given: string) {
    if (!item || verdict) return;
    const ok = matches(given);
    setVerdict({ ok, given });
    if (ok) setScore((n) => n + 1);
    recordAttempt(item.id, ok, subject);
    if (dailyId) bumpDaily(dailyId, 1);
    if (sound) (ok ? playCorrect : playWrong)();
  }

  function next() {
    if (index + 1 >= total) {
      setDone(true);
      const pct = Math.round((score / total) * 100);
      if (pct >= 80) award("quiz_complete_80", { subject, detail: title });
      if (pct >= 90) award("quiz_bonus_90", { subject, detail: title });
      if (sound) playComplete();
      toast(pct >= 80 ? "Session complete" : "Session saved", {
        description: `${score} / ${total} · Scholar XP updated.`,
      });
      return;
    }
    setIndex((n) => n + 1);
    setTyped("");
    setVerdict(null);
    setMode(index % 2 === 0 ? "type" : "choice");
  }

  if (!item) {
    return (
      <Card className="p-6">
        <p>Nothing is due right now.</p>
        <Button asChild className="mt-4">
          <Link {...linkFromHref(backHref)}>Back</Link>
        </Button>
      </Card>
    );
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <Card className="p-6 sm:p-8">
        <p className="font-script text-2xl text-script">Great work!</p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Well done!</h1>
        <p className="mt-3 text-lg">
          {score} / {total} · {pct}%
        </p>
        <p className="mt-2 max-w-md text-muted">Every correct answer is a step towards a brighter you.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link {...linkFromHref(backHref)}>Return</Link>
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Practise again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{kicker}</p>
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted tabular-nums">
          Question {index + 1} / {total}
        </p>
        <Progress className="mt-3" value={((index + (verdict ? 1 : 0)) / total) * 100} />
      </div>
      <Card className="p-5 sm:p-6">
        <p className="font-display text-2xl font-semibold leading-snug">{item.prompt}</p>
        {mode === "choice" || item.choices.length < 2 ? (
          <div className="mt-5 grid gap-2">
            {item.choices.map((choice) => {
              const selected = verdict?.given === choice;
              const ok = verdict && matches(choice);
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={Boolean(verdict)}
                  onClick={() => submit(choice)}
                  className={`min-h-12 rounded-lg border px-4 py-3 text-left text-sm ${
                    verdict && ok
                      ? "border-good bg-sage-2"
                      : selected && verdict && !verdict.ok
                        ? "border-danger bg-danger/10"
                        : "border-line bg-card hover:bg-sage"
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        ) : (
          <form
            className="mt-5 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              submit(typed);
            }}
          >
            <Input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Type the answer"
              disabled={Boolean(verdict)}
              autoCapitalize="off"
              autoCorrect="off"
            />
            <Button type="submit" disabled={Boolean(verdict) || !typed.trim()}>
              Submit
            </Button>
          </form>
        )}
        {verdict && (
          <div className="mt-5 space-y-3">
            <div className={`rounded-lg p-4 ${verdict.ok ? "bg-sage" : "bg-blush"}`}>
              <p className="font-display text-2xl font-semibold">{verdict.ok ? "Well done!" : "Not quite."}</p>
              <p className="mt-1 text-sm">You got it {verdict.ok ? "right" : "almost"}. Keep going!</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-sage p-4 text-sm">
                <p className="text-xs tracking-[0.16em] text-navy uppercase">Your answer</p>
                <p className="mt-1 font-medium">{verdict.given}</p>
              </div>
              <div className="rounded-lg bg-card p-4 text-sm ring-1 ring-line">
                <p className="text-xs tracking-[0.16em] text-navy uppercase">Correct answer</p>
                <p className="mt-1 font-medium">{item.answer}</p>
              </div>
            </div>
            {item.explain ? (
              <div className="rounded-lg bg-sky/70 p-4 text-sm">
                <p className="text-xs tracking-[0.16em] text-navy uppercase">Why?</p>
                <p className="mt-1 text-muted">{item.explain}</p>
              </div>
            ) : null}
            <Button onClick={next}>{index + 1 >= total ? "Finish" : "Next question"}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
