import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Circle, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { StudyYearSelect } from "@/components/study-year-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScriptQuote } from "@/components/vine";
import { lessonsFor, type Lesson } from "@/lib/content/lessons";
import { subjectById } from "@/lib/content/subjects";
import { topicsFor } from "@/lib/content/banks";
import { useScholar } from "@/lib/store";
import { foldLatin } from "@/lib/utils";

export const Route = createFileRoute("/study/$subject/learn")({ component: LearnPage });

function LearnPage() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject)!;
  const year = useScholar((s) => s.year);
  const completeLesson = useScholar((s) => s.completeLesson);
  const done = useScholar((s) => s.lessonsDone);
  const lastTopic = useScholar((s) => s.lastTopic);
  const setLastTopic = useScholar((s) => s.setLastTopic);

  const lessons = useMemo(() => lessonsFor(subject), [subject]);
  const topics = useMemo(() => topicsFor(subject, year), [subject, year]);
  const initial = lessons.find((item) => item.id === lastTopic)?.id ?? lessons[0]?.id ?? "";
  const [active, setActive] = useState(initial);
  const lesson = lessons.find((item) => item.id === active) ?? lessons[0];

  const pickLesson = (id: string) => {
    setActive(id);
    setLastTopic(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          <Link to="/study/$subject" params={{ subject }} className="hover:text-ink">
            {meta.name}
          </Link>{" "}
          · Learn
        </p>
        <StudyYearSelect subjectName={meta.name} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <Card className="p-4">
            <p className="text-[11px] font-semibold tracking-[0.17em] text-navy uppercase">Current unit</p>
            <h2 className="mt-1 font-display text-xl font-semibold">
              {subject === "biology" ? "Cell Biology" : meta.name}
            </h2>

            {lessons.length ? (
              <nav className="mt-4 space-y-1">
                {lessons.slice(0, 6).map((item) => {
                  const isDone = done.includes(item.id);
                  const isActive = item.id === lesson?.id;
                  return (
                    <button
                      key={`${item.subject}-${item.id}-${item.title}`}
                      type="button"
                      onClick={() => pickLesson(item.id)}
                      className={`flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        isActive ? "bg-navy text-card" : "hover:bg-sage"
                      }`}
                    >
                      {isDone ? (
                        <Check className={`mt-0.5 size-4 shrink-0 ${isActive ? "text-card" : "text-good"}`} />
                      ) : (
                        <Circle className={`mt-0.5 size-3.5 shrink-0 ${isActive ? "fill-card text-card" : "text-muted"}`} />
                      )}
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </nav>
            ) : (
              <p className="mt-3 text-sm text-muted">Lessons for this unit are being organised.</p>
            )}

            {topics.length > 6 || lessons.length > 6 ? (
              <details className="mt-4 border-t border-line pt-3">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-navy">
                  Other units
                  <ChevronDown className="size-4" />
                </summary>
                <div className="mt-2 max-h-64 space-y-1 overflow-auto pr-1">
                  {(lessons.length > 6
                    ? lessons.slice(6).map((item) => ({ id: item.id, name: item.title, lesson: true }))
                    : topics.slice(6).map((item) => ({ id: item.id, name: item.name, lesson: false }))
                  ).map((item) =>
                    item.lesson ? (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => pickLesson(item.id)}
                        className="block w-full rounded-md px-2 py-2 text-left text-sm text-muted hover:bg-sage hover:text-ink"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <p key={item.id} className="px-2 py-2 text-sm text-muted">{item.name}</p>
                    ),
                  )}
                </div>
              </details>
            ) : null}
          </Card>
        </aside>

        {lesson ? (
          <LessonView
            lesson={lesson}
            completed={done.includes(lesson.id)}
            onComplete={() => completeLesson(lesson.id)}
            practiseHref={`/study/${subject}/practise`}
          />
        ) : (
          <Card className="p-6">
            <h1 className="font-display text-3xl font-semibold">{meta.name} · Learn</h1>
            <p className="mt-2 text-muted">
              Your topic list is ready. Detailed lesson notes can be added without changing this navigation.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {topics.slice(0, 8).map((topic) => (
                <div key={topic.id} className="rounded-lg bg-sage/60 px-3 py-2 text-sm">{topic.name}</div>
              ))}
            </div>
            <Button asChild className="mt-5">
              <Link to="/study/$subject/practise" params={{ subject }}>
                Practise this subject
              </Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

function LessonView({
  lesson,
  completed,
  onComplete,
  practiseHref,
}: {
  lesson: Lesson;
  completed: boolean;
  onComplete: () => void;
  practiseHref: string;
}) {
  const [checks, setChecks] = useState<Record<number, string>>({});
  const [verdicts, setVerdicts] = useState<Record<number, boolean>>({});

  return (
    <article className="min-w-0 space-y-5">
      <header>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{lesson.kicker}</p>
        <h1 className="mt-1 font-display text-4xl font-semibold">{lesson.title}</h1>
      </header>

      <Card className="p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">1 · What you need to know</p>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{lesson.summary}</p>
        <div className="mt-4 space-y-4">
          {lesson.explanation.map((block) => (
            <div key={block.heading}>
              <h2 className="font-display text-xl font-semibold">{block.heading}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{block.body}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">2 · Must remember</p>
        <ul className="mt-3 space-y-2 text-sm">
          {lesson.remember.slice(0, 7).map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-good" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {lesson.table ? (
        <Card className="overflow-hidden p-0">
          <div className="px-5 pt-5 text-xs font-semibold tracking-[0.16em] text-navy uppercase">3 · Visual / diagram</div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <caption className="bg-leaf px-5 py-3 text-left font-medium text-card">{lesson.table.caption}</caption>
              <thead className="bg-sage">
                <tr>
                  {lesson.table.headers.map((heading) => (
                    <th key={heading} className="px-4 py-2 text-left font-medium">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lesson.table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-line">
                    {row.map((cell, j) => <td key={j} className="px-4 py-2">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="border-dashed p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">3 · Visual / diagram</p>
          <p className="mt-2 text-sm text-muted">A visual can be added here for this topic without changing the lesson layout.</p>
        </Card>
      )}

      <Card className="bg-sage/70 p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">4 · Worked example</p>
        {lesson.example ? (
          <div className="mt-3">
            <p className="font-display text-2xl font-semibold">{lesson.example.latin ?? lesson.example.french}</p>
            <p className="mt-1">{lesson.example.english}</p>
            <p className="mt-2 text-sm text-muted">{lesson.example.note}</p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">
            {lesson.forming ?? lesson.explanation[0]?.body ?? "Apply the key idea step by step, then explain why the answer is correct."}
          </p>
        )}
      </Card>

      <Card className="p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">5 · Common mistakes</p>
        <div className="mt-3 rounded-lg bg-blush/60 p-4 text-sm">
          <p className="font-medium">Watch for this:</p>
          <p className="mt-1 text-muted">{lesson.later[0] ?? "Do not rely on the first word you recognise — use the whole rule and context."}</p>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-navy uppercase">6 · Quick Check</p>
        <p className="mt-1 text-sm text-muted">A short check before you move into full practice.</p>
        <div className="mt-4 space-y-5">
          {lesson.checks.slice(0, 3).map((item, i) => (
            <div key={item.prompt} className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm">
                  <span className="mr-2 rounded-full bg-sage px-2 py-0.5 text-[10px] font-semibold text-navy">
                    {i === 0 ? "Easy" : i === 1 ? "Apply" : "Exam-style"}
                  </span>
                  {item.prompt}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={checks[i] ?? ""}
                  onChange={(event) => setChecks((current) => ({ ...current, [i]: event.target.value }))}
                  className="h-10 flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    const ok = [item.answer, ...item.accepted].some(
                      (value) => foldLatin(value) === foldLatin(checks[i] ?? ""),
                    );
                    setVerdicts((current) => ({ ...current, [i]: ok }));
                  }}
                >
                  Check
                </Button>
              </div>
              {verdicts[i] !== undefined ? (
                <p className={`text-xs ${verdicts[i] ? "text-good" : "text-danger"}`}>
                  {verdicts[i] ? "Correct — keep going." : `Not yet. ${item.hint} Correct answer: ${item.answer}.`}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onComplete} disabled={completed}>
          {completed ? "Lesson saved ✓" : "Mark as learned"}
        </Button>
        <Button asChild variant="secondary">
          <Link to={practiseHref as "/study/$subject/practise"} params={{ subject: lesson.subject }}>
            Practise this topic →
          </Link>
        </Button>
      </div>

      <ScriptQuote>Small steps today, a brighter you tomorrow.</ScriptQuote>
    </article>
  );
}
