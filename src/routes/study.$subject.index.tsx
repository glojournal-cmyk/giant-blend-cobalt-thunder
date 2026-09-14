import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, LineChart, Pencil, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { StudyYearSelect } from "@/components/study-year-select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questionsFor, topicsFor } from "@/lib/content/banks";
import { lessonsFor } from "@/lib/content/lessons";
import { subjectById } from "@/lib/content/subjects";
import { useScholar, type ReviewItem } from "@/lib/store";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/study/$subject/")({ component: SubjectHub });

const MODES = [
  { id: "learn", label: "Learn", detail: "Understand the topic", tint: "bg-sky/70", icon: BookOpen },
  { id: "practise", label: "Practise", detail: "Questions & active recall", tint: "bg-sage", icon: Pencil },
  { id: "review", label: "Review", detail: "Mistakes due again", tint: "bg-blush", icon: RotateCcw },
  { id: "progress", label: "Progress", detail: "See mastery", tint: "bg-lilac/70", icon: LineChart },
] as const;

function SubjectHub() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const setLast = useScholar((s) => s.setLastSubject);
  const lastTopic = useScholar((s) => s.lastTopic);
  const reviews = useScholar((s) => s.reviews) as Record<string, ReviewItem>;
  const seenCorrect = useScholar((s) => s.seenCorrect);
  const seenTotal = useScholar((s) => s.seenTotal);
  const year = useScholar((s) => s.year);

  const questions = questionsFor(subject, year);
  const lessons = lessonsFor(subject);
  const topics = topicsFor(subject, year);
  const currentLesson = lessons.find((item) => item.id === lastTopic) ?? lessons[0];
  const currentFocus = currentLesson?.title ?? topics[0]?.name ?? "Your next topic";
  const mastered = questions.filter((item) => (seenCorrect[item.id] ?? 0) >= 2).length;
  const mastery = questions.length ? Math.round((mastered / questions.length) * 100) : 0;
  const ids = new Set(questions.map((item) => item.id));
  const due = Object.entries(reviews).filter(([id, item]) => ids.has(id) && item.due <= todayKey()).length;

  useEffect(() => {
    setLast(subject);
  }, [subject, setLast]);

  return (
    <div className="space-y-6">
      <header className="grid overflow-hidden rounded-xl bg-card ring-1 ring-line md:grid-cols-[1.2fr_0.8fr]">
        <div className="p-6 sm:p-8">
          <StudyYearSelect subjectName={meta.name} />
          <h1 className="mt-4 font-display text-5xl font-semibold">{meta.name}</h1>
          <p className="mt-2 text-sm text-muted">Current focus: {currentFocus}</p>

          <div className="mt-6 rounded-xl bg-sage/70 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">Continue</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{currentFocus}</h2>
            <div className="mt-3 flex items-center gap-3">
              <Progress className="max-w-48" value={mastery} />
              <span className="text-xs tabular-nums text-muted">{mastery}% complete</span>
            </div>
            <Link
              to="/study/$subject/learn"
              params={{ subject }}
              className="mt-4 inline-flex rounded-full bg-navy px-4 py-2 text-sm font-medium text-card"
            >
              Continue learning →
            </Link>
          </div>
        </div>
        <img src={meta.art} alt="" className="h-52 w-full object-cover md:h-full" />
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODES.map((mode) => {
          const href = mode.id === "review" ? "practise" : mode.id;
          return (
            <Link
              key={mode.id}
              to={`/study/$subject/${href}` as "/study/$subject/learn"}
              params={{ subject }}
              className="group"
            >
              <Card className={`h-full p-5 transition-transform duration-150 group-hover:-translate-y-0.5 ${mode.tint}`}>
                <mode.icon className="size-5 text-navy" />
                <h2 className="mt-3 font-display text-2xl font-semibold">{mode.label}</h2>
                <p className="mt-1 text-sm text-muted">{mode.detail}</p>
                {mode.id === "review" && due ? (
                  <p className="mt-3 text-xs font-medium text-navy">{due} due now</p>
                ) : null}
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Mastery</p>
          <p className="mt-1 font-display text-3xl font-semibold">{mastery}%</p>
          <p className="text-sm text-muted">{mastered} questions secure</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Due for review</p>
          <p className="mt-1 font-display text-3xl font-semibold">{due}</p>
          <p className="text-sm text-muted">Previous mistakes ready again</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Year {year}</p>
          <p className="mt-1 font-display text-3xl font-semibold">{topics.length}</p>
          <p className="text-sm text-muted">{questions.length} questions across your topics</p>
        </Card>
      </div>
    </div>
  );
}
