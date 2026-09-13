import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { playComplete, playCorrect, playWrong } from "@/lib/audio";
import { ENG_VOCAB } from "@/lib/content/english";
import { FRENCH_VOCAB } from "@/lib/content/french";
import { LATIN_VOCAB } from "@/lib/content/latin";
import { linkFromHref } from "@/lib/nav";
import { useScholar } from "@/lib/store";
import { foldFrench, foldLatin, shuffle } from "@/lib/utils";

type Lang = "latin" | "french" | "english";

type DictItem = { id: string; prompt: string; answer: string; extra?: string[]; topic: string };

function speak(text: string, lang: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.92;
  window.speechSynthesis.speak(utter);
}

export function dictationBank(lang: Lang): DictItem[] {
  if (lang === "latin") {
    return LATIN_VOCAB.map((item) => ({
      id: item.id,
      prompt: item.english,
      answer: item.latin.replace("ē / ex", "ex"),
      extra: item.extra,
      topic: item.topic,
    }));
  }
  if (lang === "english") {
    return ENG_VOCAB.map((item) => ({
      id: item.id,
      prompt: item.meaning,
      answer: item.term,
      topic: item.topic,
    }));
  }
  return FRENCH_VOCAB.filter((item) => item.spelling).map((item) => ({
    id: item.id,
    prompt: item.english,
    answer: item.french,
    topic: item.topic,
  }));
}

export function Dictation({
  lang,
  topic,
  size = 10,
  backHref,
}: {
  lang: Lang;
  topic?: string;
  size?: number;
  backHref: string;
}) {
  const sound = useScholar((s) => s.sound);
  const recordAttempt = useScholar((s) => s.recordAttempt);
  const recordSpelling = useScholar((s) => s.recordSpelling);
  const bumpDaily = useScholar((s) => s.bumpDaily);
  const award = useScholar((s) => s.award);
  const bank = useMemo(() => {
    const all = dictationBank(lang);
    const filtered = topic ? all.filter((item) => item.topic === topic) : all;
    return shuffle(filtered.length ? filtered : all).slice(0, Math.min(size, filtered.length || all.length));
  }, [lang, topic, size]);

  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [verdict, setVerdict] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = bank[index];

  function matches(given: string) {
    if (!item) return false;
    if (lang === "french") return foldFrench(given) === foldFrench(item.answer);
    const check = foldLatin;
    return [item.answer, ...(item.extra ?? [])].some((value) => check(value) === check(given)) || check(given) === check(item.answer);
  }

  function check() {
    if (!item || verdict !== null) return;
    const ok = matches(typed);
    setVerdict(ok);
    if (ok) setScore((n) => n + 1);
    recordAttempt(item.id, ok, lang);
    if (lang === "french") recordSpelling(item.id, ok);
    bumpDaily(lang === "latin" ? "latin-practice" : lang === "french" ? "french-vocab" : "latin-practice", 1);
    if (sound) (ok ? playCorrect : playWrong)();
  }

  function next() {
    if (index + 1 >= bank.length) {
      setDone(true);
      award("vocab_review", { subject: lang, detail: "Dictation" });
      if (sound) playComplete();
      return;
    }
    setIndex((n) => n + 1);
    setTyped("");
    setVerdict(null);
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-xl p-6 sm:p-8">
        <p className="text-xs tracking-[0.18em] text-navy uppercase">Dictation</p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Well done!</h1>
        <p className="mt-3 text-lg">
          {score} / {bank.length} spelled independently.
        </p>
        <p className="mt-2 text-muted">Wrong words return later. Accents count in French; macrons are optional in Latin.</p>
        <Button asChild className="mt-6">
          <Link {...linkFromHref(backHref)}>Return</Link>
        </Button>
      </Card>
    );
  }

  if (!item) return null;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">
          {lang === "latin" ? "Latin" : "French"} · Dictation · 默生字
        </p>
        <h1 className="font-display text-3xl font-semibold">Spell the word</h1>
        <p className="mt-1 text-sm text-muted tabular-nums">
          {index + 1} / {bank.length}
          {item.topic ? ` · ${item.topic}` : ""}
        </p>
        <Progress className="mt-3" value={((index + (verdict !== null ? 1 : 0)) / bank.length) * 100} />
      </div>
      <Card className="p-5 sm:p-6">
        <p className="text-sm text-muted">English meaning</p>
        <p className="font-display text-3xl font-semibold">{item.prompt}</p>
        <Button
          type="button"
          variant="secondary"
          className="mt-3"
          onClick={() => speak(item.prompt, "en-GB")}
        >
          <Volume2 className="size-4" /> Hear
        </Button>
        <form
          className="mt-5 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            check();
          }}
        >
          <Input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={lang === "french" ? "Type the French…" : "Type the Latin…"}
            disabled={verdict !== null}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
          />
          <Button type="submit" disabled={verdict !== null || !typed.trim()}>
            Check
          </Button>
        </form>
        {verdict !== null && (
          <div className={`mt-5 rounded-lg p-4 text-sm ${verdict ? "bg-sage" : "bg-blush"}`}>
            <p className="font-medium">{verdict ? "Well done!" : "Not yet."}</p>
            <p className="mt-1">
              Correct spelling: <span className="font-medium">{item.answer}</span>
            </p>
            <Button className="mt-3" onClick={next}>
              {index + 1 >= bank.length ? "Finish" : "Next word"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export function VocabBank({ lang }: { lang: Lang }) {
  const bank = dictationBank(lang);
  const topics = [...new Set(bank.map((item) => item.topic))];
  const [topic, setTopic] = useState<string>("all");
  const [q, setQ] = useState("");
  const rows = bank.filter((item) => {
    if (topic !== "all" && item.topic !== topic) return false;
    if (!q.trim()) return true;
    const n = q.toLowerCase();
    return item.prompt.toLowerCase().includes(n) || item.answer.toLowerCase().includes(n);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTopic("all")}
          className={`rounded-full px-3 py-1 text-xs font-medium ${topic === "all" ? "bg-navy text-card" : "bg-sage text-ink"}`}
        >
          All · {bank.length}
        </button>
        {topics.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTopic(name)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${topic === name ? "bg-navy text-card" : "bg-sage text-ink"}`}
          >
            {name}
          </button>
        ))}
      </div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a word…" />
      <div className="overflow-hidden rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-sage text-xs tracking-[0.14em] text-navy uppercase">
            <tr>
              <th className="px-4 py-2">{lang === "latin" ? "Latin" : lang === "french" ? "French" : "Term"}</th>
              <th className="px-4 py-2">{lang === "english" ? "Meaning" : "English"}</th>
              <th className="px-4 py-2">Topic</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="px-4 py-2 font-medium">{item.answer}</td>
                <td className="px-4 py-2 text-muted">{item.prompt}</td>
                <td className="px-4 py-2 text-muted">{item.topic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
