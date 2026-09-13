import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questionsFor, topicsFor } from "@/lib/content/banks";
import { subjectById } from "@/lib/content/subjects";
import { dueReviewCount, useScholar } from "@/lib/store";

export const Route = createFileRoute("/study/$subject/progress")({ component: ProgressPage });

function weekdayBars(activity: Record<string, number>) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ label: days[d.getDay()], value: activity[key] ?? 0 });
  }
  return out;
}

function ProgressPage() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const seenCorrect = useScholar((s) => s.seenCorrect);
  const seenTotal = useScholar((s) => s.seenTotal);
  const reviews = useScholar((s) => s.reviews);
  const activity = useScholar((s) => s.activity);
  const questions = questionsFor(subject);
  const topics = topicsFor(subject);
  const attempted = questions.filter((q) => (seenTotal[q.id] ?? 0) > 0);
  const mastered = questions.filter((q) => (seenCorrect[q.id] ?? 0) >= 2);
  const overall = questions.length ? Math.round((mastered.length / questions.length) * 100) : 0;
  const due = dueReviewCount(reviews);
  const week = weekdayBars(activity);
  const maxBar = Math.max(1, ...week.map((d) => d.value));

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted">
        <Link to="/study/$subject" params={{ subject }} className="hover:text-ink">
          {meta.name}
        </Link>{" "}
        · Progress
      </p>
      <header>
        <h1 className="font-display text-4xl font-semibold">{meta.name} Progress</h1>
        <p className="mt-2 text-muted">Disciplina hodie, freedom cras.</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Overall mastery</p>
          <p className="font-display text-4xl font-semibold">{overall}%</p>
          <Progress className="mt-3" value={overall} />
        </Card>
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Topics explored</p>
          <p className="font-display text-4xl font-semibold">
            {topics.filter((t) => questions.some((q) => (q.topic ?? "").includes(t.name) && seenTotal[q.id])).length}/{topics.length}
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Questions</p>
          <p className="font-display text-4xl font-semibold">{attempted.length}</p>
          <p className="text-sm text-muted">{mastered.length} with two correct recalls</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs tracking-[0.16em] text-navy uppercase">Due reviews</p>
          <p className="font-display text-4xl font-semibold">{due}</p>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-5">
          <h2 className="font-display text-2xl font-semibold">Topic mastery</h2>
          <ul className="mt-4 space-y-3">
            {topics.map((topic) => {
              const qs = questions.filter((q) => (q.topic ?? "") === topic.name || (q.topic ?? "") === topic.id);
              const pool = qs.length ? qs : questions;
              const pct = pool.length
                ? Math.round((pool.filter((q) => (seenCorrect[q.id] ?? 0) > 0).length / pool.length) * 100)
                : 0;
              return (
                <li key={topic.id}>
                  <div className="flex justify-between text-sm">
                    <span>{topic.name}</span>
                    <span className="tabular-nums text-muted">{pct}%</span>
                  </div>
                  <Progress className="mt-1" value={pct} />
                </li>
              );
            })}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-2xl font-semibold">7-day activity</h2>
          <div className="mt-6 flex h-40 items-end gap-2">
            {week.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end rounded-md bg-sage">
                  <div
                    className="w-full rounded-md bg-leaf"
                    style={{ height: `${Math.max(8, (d.value / maxBar) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
