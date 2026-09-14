import { ChevronDown } from "lucide-react";
import { useScholar } from "@/lib/store";

export function StudyYearSelect({ subjectName }: { subjectName?: string }) {
  const year = useScholar((s) => s.year);
  const setYear = useScholar((s) => s.setYear);

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {subjectName ? <span className="font-medium text-ink">{subjectName}</span> : null}
      {subjectName ? <span className="text-line">·</span> : null}
      <label className="relative inline-flex items-center">
        <span className="sr-only">Study year</span>
        <select
          value={year}
          onChange={(event) => setYear(Number(event.target.value) as 8 | 9)}
          className="h-9 appearance-none rounded-full bg-card py-0 pr-8 pl-3 text-sm font-medium text-navy ring-1 ring-line outline-none transition hover:bg-sage focus:ring-2 focus:ring-navy/30"
        >
          <option value={9}>Year 9</option>
          <option value={8}>Year 8 · Previous year revision</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 size-3.5 text-muted" />
      </label>
    </div>
  );
}
