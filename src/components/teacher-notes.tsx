import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LATIN_NOTES } from "@/lib/content/latin";

export function TeacherNotes() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Teacher notes</p>
      <h1 className="font-display text-3xl font-semibold">Browse by idea</h1>
      <p className="text-muted">Content, not calendar date. Short notes that sit beside the games and quizzes.</p>
      {LATIN_NOTES.map((note) => (
        <Card key={note.id} className="p-5">
          <h2 className="font-display text-2xl font-semibold">{note.title}</h2>
          <p className="mt-2 text-muted">{note.body}</p>
        </Card>
      ))}
      <Button asChild variant="secondary">
        <Link to="/study/$subject" params={{ subject: "latin" }}>
          Back to Latin
        </Link>
      </Button>
    </div>
  );
}
