import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { subjectById } from "@/lib/content/subjects";

export const Route = createFileRoute("/study/$subject")({ component: SubjectLayout });

function SubjectLayout() {
  const { subject } = Route.useParams();
  if (!subjectById(subject)) throw notFound();
  return <Outlet />;
}
