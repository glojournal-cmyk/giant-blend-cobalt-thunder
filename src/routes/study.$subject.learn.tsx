import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  const lessons = lessonsFor(subject);
  const [active, setActive] = useState(lessons[0]?.id ?? "");
  const lesson = lessons.find((item) => item.id === active) ?? lessons[0];
  const completeLesson = useScholar((s) => s.completeLesson);
  const done = useScholar((s) => s.lessonsDone);

  return (
    <div className="space-y-6">
      <p className="text-xs text-muted">
        <Link to="/study/$subject" params={{ subject }} className="hover:text-ink">
          {meta.name}
        </Link>{" "}
        · Learn
      </p>
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-1">
          <p className="px-2 text-xs font-semibold tracking-[0.16em] text-navy uppercase">{meta.name}</p>
          {lessons.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                item.id === lesson?.id ? "bg-navy text-card" : "hover:bg-sage"
              }`}
            >
              {item.title}
            </button>
          ))}
          {!lessons.length
            ? topicsFor(subject).map((topic) => (
                <p key={topic.id} className="px-3 py-2 text-sm text-muted">
                  {topic.name}
                </p>
              ))
            : null}
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
            <h1 className="font-display text-3xl font-semibold">{meta.name} lessons</h1>
            <p className="mt-2 text-muted">Topics are ready in Practise while illustrated notes grow.</p>
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
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{lesson.kicker}</p>
        <h1 className="font-display text-4xl font-semibold">{lesson.title}</h1>
        <p className="mt-2 max-w-2xl text-muted">{lesson.summary}</p>
      </div>
      {lesson.explanation.map((block) => (
        <Card key={block.heading} className="p-5">
          <h2 className="font-display text-2xl font-semibold">{block.heading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{block.body}</p>
        </Card>
      ))}
      {lesson.example ? (
        <Card className="bg-sage p-5">
          <p className="font-display text-2xl font-semibold">{lesson.example.latin ?? lesson.example.french}</p>
          <p className="mt-1">{lesson.example.english}</p>
          <p className="mt-2 text-sm text-muted">{lesson.example.note}</p>
        </Card>
      ) : null}
      {lesson.table ? (
        <Card className="overflow-hidden p-0">
          <div className="bg-leaf px-5 py-3 text-sm font-medium text-card">{lesson.table.caption}</div>
          <table className="w-full text-sm">
            <thead className="bg-sage">
              <tr>
                {lesson.table.headers.map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lesson.table.rows.map((row, i) => (
                <tr key={i} className="border-t border-line">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : null}
      {lesson.forming ? <p className="text-sm text-muted">{lesson.forming}</p> : null}
      <Card className="p-5">
        <h2 className="font-display text-2xl font-semibold">Must remember</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {lesson.remember.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-good">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-2xl font-semibold">Check yourself</h2>
        <div className="mt-4 space-y-4">
          {lesson.checks.map((item, i) => (
            <div key={item.prompt} className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <p className="text-sm">
                {i + 1}. {item.prompt}
              </p>
              <div className="flex gap-2">
                <Input
                  value={checks[i] ?? ""}
                  onChange={(e) => setChecks((c) => ({ ...c, [i]: e.target.value }))}
                  className="h-10"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    const ok = [item.answer, ...item.accepted].some(
                      (v) => foldLatin(v) === foldLatin(checks[i] ?? ""),
                    );
                    setVerdicts((v) => ({ ...v, [i]: ok }));
                  }}
                >
                  Check
                </Button>
              </div>
              {verdicts[i] !== undefined ? (
                <p className={`text-xs sm:col-span-2 ${verdicts[i] ? "text-good" : "text-danger"}`}>
                  {verdicts[i] ? "Correct." : `Answer: ${item.answer}. ${item.hint}`}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onComplete} disabled={completed}>
          {completed ? "Lesson saved" : "Mark as learned"}
        </Button>
        <Button asChild variant="secondary">
          <Link to={practiseHref as "/study/$subject/practise"} params={{ subject: lesson.subject }}>
            Practise this topic
          </Link>
        </Button>
      </div>
      <ScriptQuote>Small steps today, a brighter you tomorrow.</ScriptQuote>
    </div>
  );
}
