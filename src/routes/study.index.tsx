import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Gamepad2, LineChart, Pencil } from "lucide-react";
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
  const seenTotal = useScholar((s) => s.seenTotal);

  return (
    <div className="relative space-y-6">
      <VineCorner className="pointer-events-none absolute -top-4 -left-2 hidden h-40 w-40 lg:block" />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Discover · Practise · Make progress</p>
          <h1 className="mt-2 font-display text-5xl font-semibold">Study Hub</h1>
          <p className="mt-2 max-w-xl text-muted">Choose a subject and continue your learning journey.</p>
        </div>
        <ScriptQuote>Knowledge is a garden that always grows.</ScriptQuote>
      </header>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-navy px-4 py-1.5 text-sm text-card">Year 9 · Current learning</span>
        <span className="rounded-full bg-card px-4 py-1.5 text-sm ring-1 ring-line">Year 8 · Foundation review</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUBJECTS.map((subject) => {
          const qs = questionsFor(subject.id);
          const topics = topicsFor(subject.id);
          const mastered = qs.filter((q) => (seenCorrect[q.id] ?? 0) > 0).length;
          const pct = qs.length ? Math.round((mastered / qs.length) * 100) : 0;
          const attempted = qs.filter((q) => (seenTotal[q.id] ?? 0) > 0).length;
          return (
            <Card key={subject.id} className="overflow-hidden p-0">
              <Link to="/study/$subject" params={{ subject: subject.id }} className="block">
                <img src={subject.art} alt="" className="h-32 w-full object-cover" />
              </Link>
              <div className="space-y-3 p-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{subject.name}</h2>
                  <p className="text-xs tracking-wide text-muted">{subject.tags.join(" · ")}</p>
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
                      className={`flex min-h-14 flex-col items-center justify-center rounded-lg ${mode.tint} text-[11px] font-medium`}
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
    </div>
  );
}
