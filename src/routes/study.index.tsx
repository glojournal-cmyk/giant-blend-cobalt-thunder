import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock3, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { StudyYearSelect } from "@/components/study-year-select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questionsFor, topicsFor } from "@/lib/content/banks";
import { lessonsFor } from "@/lib/content/lessons";
import { SUBJECTS, type SubjectId } from "@/lib/content/subjects";
import { useScholar, type ReviewItem } from "@/lib/store";
import { todayKey } from "@/lib/utils";

export const Route = createFileRoute("/study/")({ component: StudyHub });

function StudyHub() {
  const seenCorrect = useScholar((s) => s.seenCorrect);
  const seenTotal = useScholar((s) => s.seenTotal);
  const reviews = useScholar((s) => s.reviews) as Record<string, ReviewItem>;
  const lastSubject = useScholar((s) => s.lastSubject);
  const lastTopic = useScholar((s) => s.lastTopic);
  const year = useScholar((s) => s.year);
  const today = todayKey();

  const continueId = SUBJECTS.some((item) => item.id === lastSubject) ? (lastSubject as SubjectId) : "latin";
  const continueSubject = SUBJECTS.find((item) => item.id === continueId) ?? SUBJECTS[0];
  const continueQuestions = questionsFor(continueId, year);
  const continueAttempts = continueQuestions.reduce((total, item) => total + (seenTotal[item.id] ?? 0), 0);
  const continueCorrect = continueQuestions.reduce((total, item) => total + (seenCorrect[item.id] ?? 0), 0);
  const continueScore = continueAttempts ? Math.round((continueCorrect / continueAttempts) * 100) : 0;
  const continueLessons = lessonsFor(continueId);
  const continueLesson =
    continueLessons.find((item) => item.id === lastTopic) ??
    continueLessons[0];
  const continueTopic =
    continueLesson?.title ??
    topicsFor(continueId, year)[0]?.name ??
    "Start your next topic";

  const dueBySubject = useMemo(() => {
    return SUBJECTS.map((subject) => {
      const ids = new Set(questionsFor(subject.id, year).map((item) => item.id));
      const due = Object.entries(reviews).filter(([id, item]) => ids.has(id) && item.due <= today).length;
      return { subject, due };
    }).filter((item) => item.due > 0);
  }, [reviews, today, year]);

  const frenchDue = dueBySubject.find((item) => item.subject.id === "french");
  const firstDue = frenchDue ?? dueBySubject[0];

  const todayRows = [
    {
      subject: continueSubject,
      topic: continueTopic,
      state: "Continue",
      href: `/study/${continueId}/learn`,
    },
    {
      subject: SUBJECTS.find((item) => item.id === "french")!,
      topic: topicsFor("french", year)[0]?.name ?? "French review",
      state: frenchDue ? `${frenchDue.due} due` : "Practise",
      href: "/study/french/practise",
    },
    {
      subject: SUBJECTS.find((item) => item.id === "biology")!,
      topic: topicsFor("biology", year)[0]?.name ?? "Cell Structure",
      state: seenTotal && Object.keys(seenTotal).some((id) => id.startsWith("bio")) ? "Continue" : "New",
      href: "/study/biology/learn",
    },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="kicker">Your daily learning centre</p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Continue Learning</h1>
        </div>
        <StudyYearSelect />
      </header>

      <section className={`grid gap-4 ${firstDue ? "lg:grid-cols-[1.45fr_1fr]" : ""}`}>
        <Card className="overflow-hidden p-0">
          <div className="grid min-h-64 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">
                  {continueSubject.name} · Year {year}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{continueTopic}</h2>
                <p className="mt-3 text-sm text-muted">
                  {continueAttempts ? `Last session: ${continueScore}%` : "Ready when you are — start with a short focused lesson."}
                </p>
              </div>
              <Link
                to="/study/$subject/learn"
                params={{ subject: continueId }}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-card"
              >
                Continue <ArrowRight className="size-4" />
              </Link>
            </div>
            <img src={continueSubject.art} alt="" className="h-48 w-full object-cover sm:h-full" />
          </div>
        </Card>

        {firstDue ? (
          <Card className="flex min-h-64 flex-col justify-between bg-blush/70 p-6">
            <div>
              <div className="flex size-10 items-center justify-center rounded-full bg-card">
                <RotateCcw className="size-5 text-navy" />
              </div>
              <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-navy uppercase">Review due</p>
              <h2 className="mt-1 font-display text-3xl font-semibold">{firstDue.subject.name} Review Due</h2>
              <p className="mt-2 text-sm text-muted">
                {firstDue.due} question{firstDue.due === 1 ? "" : "s"} from previous mistakes
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <Clock3 className="size-3.5" /> About {Math.max(3, Math.ceil(firstDue.due * 0.7))} min
              </p>
            </div>
            <Link
              to="/study/$subject/practise"
              params={{ subject: firstDue.subject.id }}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-card"
            >
              Review now <ArrowRight className="size-4" />
            </Link>
          </Card>
        ) : null}
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-semibold">Today</h2>
            <p className="text-sm text-muted">10–15 min recommended</p>
          </div>
        </div>
        <Card className="divide-y divide-line overflow-hidden p-0">
          {todayRows.map((row) => (
            <Link
              key={`${row.subject.id}-${row.topic}`}
              to={row.href as "/study/$subject/learn"}
              params={{ subject: row.subject.id }}
              className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 transition hover:bg-sage/60 sm:px-5"
            >
              <div className="min-w-0">
                <p className="font-medium">{row.subject.name} — {row.topic}</p>
                <p className="text-xs text-muted">Year {year}</p>
              </div>
              <span className="shrink-0 rounded-full bg-sage px-3 py-1 text-xs font-medium text-navy">{row.state}</span>
            </Link>
          ))}
        </Card>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="font-display text-3xl font-semibold">Subjects</h2>
          <p className="text-sm text-muted">Learn, practise, review and see what is becoming secure.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SUBJECTS.map((subject) => {
            const qs = questionsFor(subject.id, year);
            const topics = topicsFor(subject.id, year);
            const attempted = qs.filter((q) => (seenTotal[q.id] ?? 0) > 0);
            const mastered = qs.filter((q) => (seenCorrect[q.id] ?? 0) >= 2);
            const pct = qs.length ? Math.round((mastered.length / qs.length) * 100) : 0;
            const ids = new Set(qs.map((item) => item.id));
            const due = Object.entries(reviews).filter(([id, item]) => ids.has(id) && item.due <= today).length;
            const topicProgress = topics.filter((topic) =>
              qs.some((q) => (q.topic === topic.name || q.topic === topic.id) && (seenTotal[q.id] ?? 0) > 0),
            ).length;

            return (
              <Card key={subject.id} className="overflow-hidden p-0">
                <Link to="/study/$subject" params={{ subject: subject.id }} className="block">
                  <img src={subject.art} alt="" className="h-32 w-full object-cover" />
                </Link>
                <div className="space-y-4 p-5">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{subject.name}</h3>
                    <p className="text-xs text-muted">Year {year}</p>
                    <p className="mt-2 text-sm text-muted">
                      {topicProgress || attempted.length ? `${Math.max(topicProgress, 1)} topic${topicProgress === 1 ? "" : "s"} in progress` : "Ready to begin"}
                      {" · "}
                      {due} review{due === 1 ? "" : "s"} due
                    </p>
                  </div>
                  {attempted.length ? <Progress value={pct} /> : null}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-navy">
                    <Link to="/study/$subject/learn" params={{ subject: subject.id }}>Learn</Link>
                    <Link to="/study/$subject/practise" params={{ subject: subject.id }}>Practise</Link>
                    <Link to="/study/$subject/progress" params={{ subject: subject.id }}>Progress</Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
