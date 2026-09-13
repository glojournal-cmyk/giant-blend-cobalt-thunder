import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/study/")({ component: StudyHub });

const CURRENT = [
  {
    id: "latin",
    name: "Latin",
    kicker: "Year 9 · Current curriculum",
    blurb: "Build fluency through short, focused sessions.",
    art: "/art/latin.jpg",
  },
  {
    id: "french",
    name: "French",
    kicker: "Year 9 · Current curriculum",
    blurb: "Vocabulary, spelling and writing, with accents that count.",
    art: "/art/french.jpg",
  },
];

const FOUNDATION = [
  {
    id: "biology",
    name: "Biology",
    kicker: "Year 8 · Foundation consolidation",
    blurb: "Cells, photosynthesis, digestion, respiration, ecosystems.",
    art: "/art/biology.jpg",
  },
];

function StudyHub() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-navy uppercase">Discover · Practise · Make progress</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Study Hub</h1>
        <p className="mt-2 text-muted">
          Choose a subject and continue your learning journey. Current Year 9 learning stays separate from Year 8
          Foundation Review.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Year 9 · Current curriculum</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CURRENT.map((subject) => (
            <SubjectCard key={subject.id} {...subject} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Year 8 · Foundation consolidation</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {FOUNDATION.map((subject) => (
            <SubjectCard key={subject.id} {...subject} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SubjectCard({
  id,
  name,
  kicker,
  blurb,
  art,
}: {
  id: string;
  name: string;
  kicker: string;
  blurb: string;
  art: string;
}) {
  return (
    <Link to="/study/$subject" params={{ subject: id }} className="group block">
      <Card className="overflow-hidden p-0 transition-transform duration-200 group-hover:-translate-y-0.5">
        <img src={art} alt="" className="h-40 w-full object-cover" />
        <div className="flex items-end justify-between gap-3 p-5">
          <div>
            <p className="text-xs tracking-[0.16em] text-navy uppercase">{kicker}</p>
            <h3 className="font-display text-2xl font-semibold">{name}</h3>
            <p className="mt-1 text-sm text-muted">{blurb}</p>
          </div>
          <ArrowRight className="mb-1 size-4 shrink-0 text-navy" />
        </div>
      </Card>
    </Link>
  );
}
