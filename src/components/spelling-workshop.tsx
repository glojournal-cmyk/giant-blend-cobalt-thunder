import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FRENCH_VOCAB } from "@/lib/content/french";
import { playComplete, playCorrect, playWrong } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { foldFrench, shuffle } from "@/lib/utils";

export function SpellingWorkshop() {
  const sound = useScholar((s) => s.sound);
  const spellingDue = useScholar((s) => s.spellingDue);
  const recordSpelling = useScholar((s) => s.recordSpelling);
  const pool = useMemo(() => {
    const spellable = FRENCH_VOCAB.filter((item) => item.spelling);
    const due = spellable.filter((item) => spellingDue[item.id]);
    const rest = spellable.filter((item) => !spellingDue[item.id]);
    return [...due, ...shuffle(rest)].slice(0, 8);
  }, [spellingDue]);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [verdict, setVerdict] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = pool[index];

  function check() {
    if (!item || verdict !== null) return;
    const ok = foldFrench(typed) === foldFrench(item.french);
    setVerdict(ok);
    if (ok) setScore((n) => n + 1);
    recordSpelling(item.id, ok);
    if (sound) (ok ? playCorrect : playWrong)();
  }

  function next() {
    if (index + 1 >= pool.length) {
      setDone(true);
      if (sound) playComplete();
      return;
    }
    setIndex((n) => n + 1);
    setTyped("");
    setVerdict(null);
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-xl p-6">
        <h1 className="font-display text-3xl font-semibold">Atelier complete</h1>
        <p className="mt-2 text-muted">
          {score} / {pool.length} spelled independently. Wrong words return later, not immediately.
        </p>
        <Button asChild className="mt-5">
          <Link to="/study/$subject" params={{ subject: "french" }}>
            Return to French
          </Link>
        </Button>
      </Card>
    );
  }

  if (!item) return null;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Atelier d’orthographe</p>
      <h1 className="font-display text-3xl font-semibold">Spell what you know</h1>
      <p className="text-sm text-muted">Exact learned French spelling. Accents count.</p>
      <Card className="p-6">
        <p className="text-sm text-muted">English prompt</p>
        <p className="font-display text-3xl font-semibold">{item.english}</p>
        <form
          className="mt-5 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            check();
          }}
        >
          <Input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Type the French"
            disabled={verdict !== null}
            lang="fr"
            autoCapitalize="off"
            autoCorrect="off"
          />
          <Button type="submit" disabled={verdict !== null}>
            Check
          </Button>
        </form>
        {verdict !== null && (
          <div className="mt-4 text-sm">
            <p className="font-medium">{verdict ? "Exact." : "Returned for later."}</p>
            <p className="text-muted">{item.french}</p>
            <Button className="mt-3" onClick={next}>
              Continue
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
