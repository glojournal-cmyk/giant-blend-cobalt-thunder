import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Gamepad2, LineChart, Pencil } from "lucide-react";
import { ScholarCompanion } from "@/components/scholar-companion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScriptQuote, VineCorner } from "@/components/vine";
import { questionsFor, topicsFor } from "@/lib/content/banks";
import { SUBJECTS } from "@/lib/content/subjects";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/study/")({ component: StudyHub });

const MODE_BTNS = [
  { id: "learn", label: "Learn", tint: "bg-sky/80", icon: BookOpen },
  { id: "practise", label: "Practise", tint: "bg-sage", icon: Pencil },
  { id: "play", label: "Play", tint: "bg-blush", icon: Gamepad2 },
  { id: "progress", label: "Progress", tint: "bg-lilac/70", icon: LineChart },
] as const;

function StudyHub() {
  const seenCorrect = useScholar((s) => s.seenCorrect);
  const lastSubject = useScholar((s) => s.lastSubject);
  const daily = useScholar((s) => s.daily);
  const year = useScholar((s) => s.year);
  const setYear = useScholar((s) => s.setYear);
  const done = daily.filter((t) => t.progress >= t.target).length;
  const continueId = SUBJECTS.some((s) => s.id === lastSubject) ? lastSubject : "latin";
  const rec = SUBJECTS.find((s) => s.id === continueId) ?? SUBJECTS[0];

  return (
    <div className="relative space-y-6">
      <VineCorner className="pointer-events-none absolute -top-4 -left-2 hidden h-40 w-40 lg:block" />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Discover · Practise · Make progress</p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight">Study Hub</h1>
          <p className="mt-2 max-w-xl text-muted">Choose a subject. She’ll sit with you while you work.</p>
        </div>
        <ScholarCompanion compact line="Which subject today?" className="w-full max-w-sm" />
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setYear(9)}
          className={`min-h-10 rounded-full px-4 text-sm ${year === 9 ? "bg-navy text-card" : "bg-card shadow-[var(--shadow-border)]"}`}
        >
          Year 9 · Current learning
        </button>
        <button
          type="button"
          onClick={() => setYear(8)}
          className={`min-h-10 rounded-full px-4 text-sm ${year === 8 ? "bg-navy text-card" : "bg-card shadow-[var(--shadow-border)]"}`}
        >
          Year 8 · Foundation review
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Recommended for you</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">{rec.name}</h2>
          <p className="mt-1 text-sm text-muted">{year === 8 ? "Gentler review of the same topics." : rec.blurb}</p>
          <Link
            to="/study/$subject/practise"
            params={{ subject: rec.id }}
            className="mt-3 inline-flex rounded-full bg-navy px-4 py-2 text-sm text-card"
          >
            Continue {rec.name}
          </Link>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Today’s goals</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            {done}/{daily.length} done
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {daily.slice(0, 3).map((task) => (
              <li key={task.id}>
                {task.progress >= task.target ? "✓" : "○"} {task.title}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Link to="/play" className="block">
        <Card className="overflow-hidden p-0">
          <div className="grid sm:grid-cols-[160px_1fr]">
            <img src="/art/games/forma.jpg" alt="" className="h-28 w-full object-cover sm:h-full" />
            <div className="p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Mini games</p>
              <p className="font-display text-2xl font-semibold">Forma Forge, mosaics, match games</p>
              <p className="mt-1 text-sm text-muted">Latin, French, science and English — Play is on the main nav.</p>
            </div>
          </div>
        </Card>
      </Link>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUBJECTS.map((subject) => {
          const qs = questionsFor(subject.id, year);
          const topics = topicsFor(subject.id, year);
          const mastered = qs.filter((q) => (seenCorrect[q.id] ?? 0) > 0).length;
          const pct = qs.length ? Math.round((mastered / qs.length) * 100) : 0;
          const attempted = qs.filter((q) => (seenCorrect[q.id] ?? 0) > 0).length;
          return (
            <Card key={subject.id} className="overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-0.5">
              <Link to="/study/$subject" params={{ subject: subject.id }} className="block">
                <img src={subject.art} alt="" className="h-36 w-full object-cover" />
              </Link>
              <div className="space-y-3 p-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{subject.name}</h2>
                  <p className="text-xs tracking-wide text-muted">
                    Year {year} · {subject.tags.join(" · ")}
                  </p>
                  <p className="mt-2 italic text-navy">“{subject.quote}”</p>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted">
                    <span>{pct}% mastery</span>
                    <span>
                      {attempted}/{qs.length || topics.length} ready
                    </span>
                  </div>
                  <Progress className="mt-1" value={pct} />
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {MODE_BTNS.map((mode) => (
                    <Link
                      key={mode.id}
                      to={`/study/$subject/${mode.id}` as "/study/$subject/learn"}
                      params={{ subject: subject.id }}
                      className={`flex min-h-14 flex-col items-center justify-center rounded-xl ${mode.tint} text-[11px] font-medium`}
                    >
                      <mode.icon className="mb-0.5 size-3.5" />
                      {mode.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <ScriptQuote>Knowledge is a garden that always grows.</ScriptQuote>
    </div>
  );
}
