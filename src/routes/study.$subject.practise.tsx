import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Dictation, VocabBank } from "@/components/dictation";
import { QuizSession } from "@/components/quiz-session";
import { Card } from "@/components/ui/card";
import { hasDictation, questionsFor, topicsFor } from "@/lib/content/banks";
import { LATIN_VOCAB } from "@/lib/content/latin";
import { FRENCH_VOCAB } from "@/lib/content/french";
import { ENG_VOCAB } from "@/lib/content/english";
import { subjectById } from "@/lib/content/subjects";
import type { SubjectId } from "@/lib/content/subjects";
import { dueReviewCount, useScholar } from "@/lib/store";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/study/$subject/practise")({ component: PractisePage });

type Mode = "topic" | "mixed" | "weak" | "due" | "dictation" | "vocab" | "quick" | "balanced" | "challenge";

function PractisePage() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const dictation = hasDictation(subject);
  const [mode, setMode] = useState<Mode>("mixed");
  const [topic, setTopic] = useState<string>("all");
  const reviews = useScholar((s) => s.reviews);
  const seenCorrect = useScholar((s) => s.seenCorrect);
  const year = useScholar((s) => s.year);
  const all = questionsFor(subject, year);
  const topics = topicsFor(subject, year);
  const due = dueReviewCount(reviews);
  const today = todayKey();

  const items = useMemo(() => {
    let pool = all;
    if (topic !== "all") pool = pool.filter((q) => (q.topic ?? "") === topic || q.prompt.toLowerCase().includes(topic.toLowerCase()));
    if (mode === "due") {
      const ids = Object.entries(reviews).filter(([, item]) => item.due <= today).map(([id]) => id);
      const dueItems = pool.filter((q) => ids.includes(q.id));
      return dueItems.length ? dueItems : pool;
    }
    if (mode === "weak") {
      const weak = pool.filter((q) => reviews[q.id] && (seenCorrect[q.id] ?? 0) < 2);
      return weak.length ? weak : pool;
    }
    return pool;
  }, [all, mode, reviews, seenCorrect, today, topic]);

  const size = mode === "quick" ? 8 : mode === "challenge" ? 25 : mode === "balanced" ? 15 : 8;

  const chips: { id: Mode; label: string; hint: string }[] = [
    { id: "topic", label: "Topic Practice", hint: "Focus on one idea" },
    { id: "mixed", label: "Mixed Practice", hint: "A bit of everything" },
    { id: "weak", label: "Weakness Review", hint: "Target gaps" },
    { id: "due", label: "Due Review", hint: due ? `${due} waiting` : "Nothing due" },
    ...(dictation
      ? [
          { id: "dictation" as const, label: "Dictation · 默生字", hint: "Spell every learned word" },
          { id: "vocab" as const, label: "Vocab Bank", hint: `${subject === "latin" ? LATIN_VOCAB.length : subject === "french" ? FRENCH_VOCAB.length : ENG_VOCAB.length} words` },
        ]
      : []),
    { id: "quick", label: "Quick 8", hint: "~5 minutes" },
    { id: "balanced", label: "Balanced 15", hint: "~10 minutes" },
    { id: "challenge", label: "Challenge 25", hint: "Test mastery" },
  ];

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted">
        <Link to="/study/$subject" params={{ subject }} className="hover:text-ink">
          {meta.name}
        </Link>{" "}
        · Practise
      </p>
      <header>
        <h1 className="font-display text-4xl font-semibold">{meta.name} · Practise</h1>
        <p className="mt-2 text-muted">
          {dictation
            ? "Pick a mode — dictation 默生字 and the full vocab bank live here."
            : "Choose a row, then begin."}
        </p>
      </header>

      <div className="space-y-3">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-navy uppercase">Mode</p>
          <div className="flex flex-wrap gap-2">
            {chips
              .filter((chip) => ["topic", "mixed", "weak", "due"].includes(chip.id))
              .map((chip) => (
                <ModeChip key={chip.id} chip={chip} active={mode === chip.id} onPick={setMode} />
              ))}
          </div>
        </div>
        {dictation ? (
          <div>
            <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-navy uppercase">Words · 生字</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {chips
                .filter((chip) => chip.id === "dictation" || chip.id === "vocab")
                .map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setMode(chip.id)}
                    className={`min-h-16 rounded-xl px-4 py-3 text-left ${
                      mode === chip.id ? "bg-navy text-card" : "bg-blush/80 ring-1 ring-line hover:bg-blush"
                    }`}
                  >
                    <span className="block font-display text-xl font-semibold">{chip.label}</span>
                    <span className={`block text-xs ${mode === chip.id ? "text-card/70" : "text-muted"}`}>{chip.hint}</span>
                  </button>
                ))}
            </div>
          </div>
        ) : null}
        <div>
          <p className="mb-1.5 text-[11px] font-semibold tracking-[0.16em] text-navy uppercase">Length</p>
          <div className="flex flex-wrap gap-2">
            {chips
              .filter((chip) => ["quick", "balanced", "challenge"].includes(chip.id))
              .map((chip) => (
                <ModeChip key={chip.id} chip={chip} active={mode === chip.id} onPick={setMode} />
              ))}
          </div>
        </div>
      </div>
      {(mode === "topic" || mode === "dictation") && topics.length ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTopic("all")}
            className={`rounded-full px-3 py-1 text-xs ${topic === "all" ? "bg-leaf text-card" : "bg-sage"}`}
          >
            All topics
          </button>
          {topics.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTopic(item.name)}
              className={`rounded-full px-3 py-1 text-xs ${topic === item.name ? "bg-leaf text-card" : "bg-sage"}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}

      {mode === "dictation" && dictation ? (
        <Dictation
          lang={subject as "latin" | "french" | "english"}
          topic={topic === "all" ? undefined : topic}
          size={size}
          backHref={`/study/${subject}`}
        />
      ) : mode === "vocab" && dictation ? (
        <Card className="p-5">
          <h2 className="font-display text-2xl font-semibold">Every word you have been taught</h2>
          <p className="mt-1 text-sm text-muted">Search, filter, then use Dictation to spell them.</p>
          <div className="mt-4">
            <VocabBank lang={subject as "latin" | "french" | "english"} />
          </div>
        </Card>
      ) : (
        <QuizSession
          title={meta.name + " practise"}
          kicker={mode === "due" ? "Due review" : mode === "weak" ? "Weak areas" : "Practice"}
          items={items}
          subject={subject as SubjectId}
          dailyId={subject === "latin" ? "latin-practice" : undefined}
          fold={subject === "french" ? "french" : "latin"}
          backHref={`/study/${subject}`}
          size={size}
        />
      )}
    </div>
  );
}

function ModeChip({
  chip,
  active,
  onPick,
}: {
  chip: { id: Mode; label: string; hint: string };
  active: boolean;
  onPick: (id: Mode) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(chip.id)}
      className={`rounded-xl px-3 py-2 text-left ${active ? "bg-navy text-card" : "bg-card ring-1 ring-line hover:bg-sage"}`}
    >
      <span className="block text-sm font-medium">{chip.label}</span>
      <span className={`block text-[11px] ${active ? "text-card/70" : "text-muted"}`}>{chip.hint}</span>
    </button>
  );
}

