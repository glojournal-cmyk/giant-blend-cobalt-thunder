import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LATIN_GAMES, LATIN_NOTES, LATIN_QUESTIONS, LATIN_VOCAB } from "@/lib/content/latin";
import { FRENCH_VOCAB, FRENCH_WRITING } from "@/lib/content/french";
import { BIO_QUESTIONS, BIO_TOPICS } from "@/lib/content/biology";
import { linkFromHref } from "@/lib/nav";
import { dueReviewCount, useScholar } from "@/lib/store";

export const Route = createFileRoute("/study/$subject")({ component: SubjectPage });

function SubjectPage() {
  const { subject } = Route.useParams();
  const setLast = useScholar((s) => s.setLastSubject);
  useEffect(() => {
    if (subject === "latin" || subject === "french" || subject === "biology") setLast(subject);
  }, [subject, setLast]);

  if (subject === "latin") return <LatinHub />;
  if (subject === "french") return <FrenchHub />;
  if (subject === "biology") return <BiologyHub />;
  throw notFound();
}

function LatinHub() {
  const reviews = useScholar((s) => s.reviews);
  const games = useScholar((s) => s.games);
  const seenTotal = useScholar((s) => s.seenTotal);
  const due = dueReviewCount(reviews);
  const answered = Object.keys(seenTotal).filter((id) => LATIN_QUESTIONS.some((q) => q.id === id)).length;

  return (
    <div className="space-y-6">
      <Back to="/study" label="Study" />
      <Hero
        art="/art/latin.jpg"
        kicker="Year 9 · Current"
        title="Latin"
        blurb="Build fluency through short, focused sessions. Formal mastery stays academic. Scholar XP is separate."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Illustrated study" value="Learn through clear ideas" />
        <Stat label="Practice" value={`${answered} answered`} />
        <Stat label="Due reviews" value={`${due} waiting`} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ActionCard
          href="/session/latin-practice"
          kicker="Practice"
          title="Focused session"
          detail="Mixed vocabulary, grammar, translation and Roman world. Balanced set of 8."
        />
        <ActionCard
          href="/session/latin-review"
          kicker="Review"
          title={due ? "Due review" : "Weak areas"}
          detail={due ? `${due} items are due today.` : "Nothing is due. Practise lingering weak forms."}
        />
        <ActionCard href="/session/latin-vocab" kicker="Vocabulary" title="Vocabulary review" detail={`${LATIN_VOCAB.length} core words and phrases.`} />
        <ActionCard href="/session/latin-notes" kicker="Teacher notes" title="Browse by idea" detail="Short notes on tense, case and place." />
      </div>
      <section>
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Latin games</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Learn by doing</h2>
        <p className="text-sm text-muted">Game points do not change formal mastery.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {LATIN_GAMES.map((game) => {
            const progress = games[game.id];
            return (
              <Link key={game.id} to="/play/$game" params={{ game: game.id }} className="group">
                <Card className="flex items-center justify-between p-4 transition-colors group-hover:bg-sage">
                  <div>
                    <p className="text-xs tracking-[0.16em] text-navy uppercase">{game.kicker}</p>
                    <p className="font-display text-xl font-semibold">{game.name}</p>
                    <p className="text-sm text-muted">{game.blurb}</p>
                  </div>
                  <div className="text-right text-xs text-muted tabular-nums">
                    <div>Lv {progress?.unlocked ?? 1}/6</div>
                    <div>{progress?.points ?? 0} pts</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
      <Card className="p-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Teacher notes</p>
        <ul className="mt-3 space-y-2">
          {LATIN_NOTES.map((note) => (
            <li key={note.id} className="text-sm">
              <span className="font-medium">{note.title}.</span>{" "}
              <span className="text-muted">{note.body}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function FrenchHub() {
  const writing = useScholar((s) => s.writing);
  const spellingDue = useScholar((s) => s.spellingDue);
  const due = Object.keys(spellingDue).length;
  return (
    <div className="space-y-6">
      <Back to="/study" label="Study" />
      <Hero
        art="/art/french.jpg"
        kicker="Year 9 · Current"
        title="French"
        blurb="Vocabulaire, écriture, and an atelier d’orthographe where accents count."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ActionCard
          href="/session/french-practice"
          kicker="Pratique"
          title="Focused session"
          detail="Meanings, verbs and classroom French."
        />
        <ActionCard
          href="/session/french-vocab"
          kicker="Vocabulaire"
          title="Vocabulary review"
          detail={`${FRENCH_VOCAB.length} words and phrases across six topics.`}
        />
        <ActionCard
          href="/session/french-spelling"
          kicker="Atelier d’orthographe"
          title="Spell what you know"
          detail={due ? `${due} words waiting to return.` : "Exact learned spelling. Accents count. Wrong words return later."}
        />
        <ActionCard
          href="/session/french-writing"
          kicker="Écriture"
          title="Writing challenges"
          detail={`${Object.keys(writing).length}/${FRENCH_WRITING.length} model tasks saved. Examples are not the only valid response.`}
        />
      </div>
    </div>
  );
}

function BiologyHub() {
  return (
    <div className="space-y-6">
      <Back to="/study" label="Study" />
      <Hero
        art="/art/biology.jpg"
        kicker="Year 8 · Foundation"
        title="Biology"
        blurb="Consolidate the ideas that Year 9 science still needs: cells, energy, digestion and ecosystems."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BIO_TOPICS.map((topic) => (
          <Card key={topic.id} className="p-4">
            <p className="font-display text-xl font-semibold">{topic.name}</p>
            <p className="mt-1 text-sm text-muted">{topic.blurb}</p>
          </Card>
        ))}
      </div>
      <ActionCard
        href="/session/bio-practice"
        kicker="Foundation review"
        title={`Practice · ${BIO_QUESTIONS.length} questions`}
        detail="Mixed retrieval across the five Year 8 topics."
      />
    </div>
  );
}

function Back({ to, label }: { to: string; label: string }) {
  return (
    <Link {...linkFromHref(to)} className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
      <ArrowLeft className="size-4" /> {label}
    </Link>
  );
}

function Hero({ art, kicker, title, blurb }: { art: string; kicker: string; title: string; blurb: string }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid md:grid-cols-[220px_1fr]">
        <img src={art} alt="" className="h-40 w-full object-cover md:h-full" />
        <div className="p-5 md:p-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">{kicker}</p>
          <h1 className="mt-1 font-display text-4xl font-semibold">{title}</h1>
          <p className="mt-2 max-w-xl text-muted">{blurb}</p>
        </div>
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs tracking-[0.16em] text-navy uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </Card>
  );
}

function ActionCard({
  href,
  kicker,
  title,
  detail,
}: {
  href: string;
  kicker: string;
  title: string;
  detail: string;
}) {
  return (
    <Link {...linkFromHref(href)} className="group block">
      <Card className="flex items-center justify-between gap-3 p-5 transition-colors group-hover:bg-sage">
        <div>
          <p className="text-xs tracking-[0.16em] text-navy uppercase">{kicker}</p>
          <p className="font-display text-2xl font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted">{detail}</p>
        </div>
        <ArrowRight className="size-4 shrink-0" />
      </Card>
    </Link>
  );
}

export function LatinDueBadge() {
  const due = dueReviewCount(useScholar((s) => s.reviews));
  if (!due) return null;
  return <Badge variant="bronze">{due} due</Badge>;
}
