import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { playCorrect, playWrong } from "@/lib/audio";
import { useScholar } from "@/lib/store";
import { linkFromHref } from "@/lib/nav";
import { foldFrench, foldLatin, shuffle } from "@/lib/utils";

type CardItem = { id: string; front: string; back: string; extra?: string[] };

export function VocabReview({
  title,
  items,
  subject,
  strict = false,
  dailyId,
  backHref,
}: {
  title: string;
  items: CardItem[];
  subject: "latin" | "french" | "biology";
  strict?: boolean;
  dailyId?: string;
  backHref: string;
}) {
  const sound = useScholar((s) => s.sound);
  const recordAttempt = useScholar((s) => s.recordAttempt);
  const bumpDaily = useScholar((s) => s.bumpDaily);
  const award = useScholar((s) => s.award);
  const deck = useMemo(() => shuffle(items).slice(0, 8), [items]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const item = deck[index];

  function check() {
    if (!item) return;
    const given = typed.trim();
    const ok = strict
      ? foldFrench(given) === foldFrench(item.back)
      : [item.back, ...(item.extra ?? [])].some((value) => foldLatin(value) === foldLatin(given));
    recordAttempt(item.id, ok, subject);
    if (dailyId) bumpDaily(dailyId, 1);
    award("vocab_review", { subject, detail: item.front });
    if (sound) (ok ? playCorrect : playWrong)();
    if (index + 1 >= deck.length) setDone(true);
    else {
      setIndex((n) => n + 1);
      setFlipped(false);
      setTyped("");
    }
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-xl p-6">
        <h1 className="font-display text-3xl font-semibold">Vocabulary pass complete</h1>
        <p className="mt-2 text-muted">Eight cards reviewed. Weak items will return in due course.</p>
        <Button asChild className="mt-5">
          <Link {...linkFromHref(backHref)}>Return</Link>
        </Button>
      </Card>
    );
  }

  if (!item) return null;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="text-sm text-muted tabular-nums">
        {index + 1} / {deck.length}
      </p>
      <button type="button" className="w-full text-left" onClick={() => setFlipped((v) => !v)}>
        <Card className="grid min-h-48 place-items-center p-8">
          <p className="font-display text-3xl font-semibold">{flipped ? item.back : item.front}</p>
          <p className="mt-3 text-xs tracking-[0.16em] text-muted uppercase">{flipped ? "English" : "Tap to peek"}</p>
        </Card>
      </button>
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          check();
        }}
      >
        <Input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder={strict ? "Exact spelling, accents included" : "Type the meaning"}
        />
        <Button type="submit">Check</Button>
      </form>
    </div>
  );
}
