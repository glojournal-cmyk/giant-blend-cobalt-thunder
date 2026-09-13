import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, Gamepad2, LineChart, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScriptQuote, VineCorner } from "@/components/vine";
import { LATIN_NOTES } from "@/lib/content/latin";
import { FRENCH_WRITING } from "@/lib/content/french";
import { questionsFor, topicsFor } from "@/lib/content/banks";
import { subjectById } from "@/lib/content/subjects";
import { dueReviewCount, useScholar } from "@/lib/store";
import { lessonsFor } from "@/lib/content/lessons";

export const Route = createFileRoute("/study/$subject/")({ component: SubjectHub });

const MODES = [
  { id: "learn", label: "Learn", detail: "Explore lessons, grammar and vocabulary.", tint: "bg-sky/70", icon: BookOpen },
  { id: "practise", label: "Practise", detail: "Build your skills with targeted exercises.", tint: "bg-sage", icon: Pencil },
  { id: "play", label: "Play", detail: "Make learning fun with games and challenges.", tint: "bg-blush", icon: Gamepad2 },
  { id: "progress", label: "Progress", detail: "Track your improvement and see how far you’ve come.", tint: "bg-lilac/70", icon: LineChart },
] as const;

function SubjectHub() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const setLast = useScholar((s) => s.setLastSubject);
  const reviews = useScholar((s) => s.reviews);
  const due = dueReviewCount(reviews);
  const year = useScholar((s) => s.year);
  const questions = questionsFor(subject, year);
  const lessons = lessonsFor(subject);
  const topics = topicsFor(subject, year);

  useEffect(() => {
    setLast(subject);
  }, [subject, setLast]);

  return (
    <div className="relative space-y-6">
      <VineCorner className="absolute -top-6 -left-4 hidden h-36 w-36 lg:block" />
      <header className="overflow-hidden rounded-xl bg-card ring-1 ring-line">
        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">
              {meta.name} · Year {meta.year}
            </p>
            <h1 className="mt-2 font-display text-5xl font-semibold">{meta.name}</h1>
            <p className="mt-3 max-w-xl text-muted">{meta.blurb}</p>
            <p className="mt-4 italic text-navy">“{meta.quote}”</p>
          </div>
          <img src={meta.art} alt="" className="h-48 w-full object-cover md:h-full" />
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODES.map((mode) => (
          <Link key={mode.id} to={`/study/$subject/${mode.id}` as "/study/$subject/learn"} params={{ subject }} className="group">
            <Card className={`h-full p-5 transition-transform duration-150 group-hover:-translate-y-0.5 ${mode.tint}`}>
              <mode.icon className="size-5 text-navy" />
              <h2 className="mt-3 font-display text-2xl font-semibold">{mode.label}</h2>
              <p className="mt-1 text-sm text-muted">{mode.detail}</p>
              <p className="mt-4 text-xs font-medium tracking-wide text-navy">Start →</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Continue where you left off</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{lessons[0]?.title ?? topics[0]?.name ?? "First topic"}</h3>
          <p className="mt-1 text-sm text-muted">{lessons[0]?.summary ?? `${questions.length} questions ready.`}</p>
          <Link
            to="/study/$subject/learn"
            params={{ subject }}
            className="mt-4 inline-flex rounded-full bg-navy px-4 py-2 text-sm text-card"
          >
            Continue
          </Link>
        </Card>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Card className="p-4">
            <p className="text-xs tracking-[0.16em] text-navy uppercase">Due reviews</p>
            <p className="font-display text-3xl font-semibold">{due}</p>
            <p className="text-sm text-muted">Cards ready to review</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs tracking-[0.16em] text-navy uppercase">Topics</p>
            <p className="font-display text-3xl font-semibold">{topics.length}</p>
            <p className="text-sm text-muted">{questions.length} practice questions</p>
          </Card>
        </div>
      </div>

      {subject === "latin" ? (
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Featured · Roman Life</p>
          <p className="mt-2 text-sm text-muted">Discover the people, places and ideas that shaped a civilisation.</p>
          <ul className="mt-3 space-y-1 text-sm">
            {LATIN_NOTES.slice(0, 3).map((note) => (
              <li key={note.id}>
                <span className="font-medium">{note.title}.</span> {note.body}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {subject === "french" ? (
        <Card className="overflow-hidden p-0">
          <div className="grid md:grid-cols-[1fr_220px]">
            <div className="p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Featured · French Culture</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">Plus loin, ensemble</h3>
              <p className="mt-2 text-sm text-muted">
                Explore cafés, towns and everyday French — then write about your own ville.
              </p>
              <Link to="/session/$kind" params={{ kind: "french-writing" }} className="mt-4 inline-flex text-sm font-medium text-navy">
                Open writing studio →
              </Link>
            </div>
            <img src="/art/french.jpg" alt="" className="h-36 w-full object-cover md:h-full" />
          </div>
          <p className="px-5 pb-4 text-xs text-muted">{FRENCH_WRITING.length} writing tasks, including Décris ta ville.</p>
        </Card>
      ) : null}

      <ScriptQuote>Small steps today, a brighter tomorrow.</ScriptQuote>
    </div>
  );
}
