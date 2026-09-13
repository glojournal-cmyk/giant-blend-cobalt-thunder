import { createFileRoute, notFound } from "@tanstack/react-router";
import { QuizSession } from "@/components/quiz-session";
import { SpellingWorkshop } from "@/components/spelling-workshop";
import { TeacherNotes } from "@/components/teacher-notes";
import { VocabReview } from "@/components/vocab-review";
import { WritingStudio } from "@/components/writing-studio";
import { BIO_QUESTIONS } from "@/lib/content/biology";
import { FRENCH_QUESTIONS, FRENCH_VOCAB } from "@/lib/content/french";
import { LATIN_QUESTIONS, LATIN_VOCAB } from "@/lib/content/latin";
import { todayKey } from "@/lib/utils";
import { useScholar } from "@/lib/store";

export const Route = createFileRoute("/session/$kind")({ component: SessionPage });

function SessionPage() {
  const { kind } = Route.useParams();
  const reviews = useScholar((s) => s.reviews);
  const today = todayKey();

  if (kind === "latin-practice") {
    return (
      <QuizSession
        title="Latin practice"
        kicker="Focused session"
        items={LATIN_QUESTIONS}
        subject="latin"
        dailyId="latin-practice"
        backHref="/study/latin"
      />
    );
  }
  if (kind === "latin-review") {
    const dueIds = Object.entries(reviews)
      .filter(([, item]) => item.due <= today)
      .map(([id]) => id);
    const due = LATIN_QUESTIONS.filter((q) => dueIds.includes(q.id));
    const weak = LATIN_QUESTIONS.filter((q) => reviews[q.id]);
    const items = due.length ? due : weak.length ? weak : LATIN_QUESTIONS;
    return (
      <QuizSession
        title={due.length ? "Due review" : "Weak areas"}
        kicker="Latin"
        items={items}
        subject="latin"
        backHref="/study/latin"
      />
    );
  }
  if (kind === "latin-vocab") {
    return (
      <VocabReview
        title="Latin vocabulary"
        items={LATIN_VOCAB.map((item) => ({
          id: item.id,
          front: item.latin,
          back: item.english,
          extra: item.extra,
        }))}
        subject="latin"
        dailyId="vocab-pass"
        backHref="/study/latin"
      />
    );
  }
  if (kind === "latin-notes") return <TeacherNotes />;
  if (kind === "french-practice") {
    return (
      <QuizSession
        title="French practice"
        kicker="Pratique"
        items={FRENCH_QUESTIONS}
        subject="french"
        fold="french"
        backHref="/study/french"
      />
    );
  }
  if (kind === "french-vocab") {
    return (
      <VocabReview
        title="Vocabulaire"
        items={FRENCH_VOCAB.map((item) => ({
          id: item.id,
          front: item.french,
          back: item.english,
        }))}
        subject="french"
        dailyId="vocab-pass"
        backHref="/study/french"
      />
    );
  }
  if (kind === "french-spelling") return <SpellingWorkshop />;
  if (kind === "french-writing") return <WritingStudio />;
  if (kind === "bio-practice") {
    return (
      <QuizSession
        title="Biology foundation"
        kicker="Year 8"
        items={BIO_QUESTIONS}
        subject="biology"
        backHref="/study/biology"
      />
    );
  }
  throw notFound();
}
