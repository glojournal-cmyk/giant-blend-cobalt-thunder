import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { ScholarCompanion } from "@/components/scholar-companion";
import { subjectById } from "@/lib/content/subjects";

export const Route = createFileRoute("/study/$subject")({ component: SubjectLayout });

function SubjectLayout() {
  const { subject } = Route.useParams();
  const meta = subjectById(subject);
  if (!meta) throw notFound();
  const line =
    subject === "latin"
      ? "Lingua Latina per semper — shall we practise?"
      : subject === "french"
        ? "Un monde plus grand t’attend."
        : "Ask a question. Grow a little.";

  return (
    <div className="space-y-5">
      <ScholarCompanion compact line={line} />
      <Outlet />
    </div>
  );
}
