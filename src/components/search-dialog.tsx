import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchTopics } from "@/lib/search";
import { linkFromHref } from "@/lib/nav";

export function SearchDialog({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const hits = useMemo(() => searchTopics(query), [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            compact
              ? "flex size-11 items-center justify-center rounded-md text-ink hover:bg-sage"
              : "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-card/85 hover:bg-white/10"
          }
        >
          <Search className="size-4 shrink-0" />
          {!compact && (
            <span className="min-w-0">
              <b className="block text-sm font-semibold text-card">Find topic</b>
              <small className="block text-xs text-card/60">Search revision</small>
            </span>
          )}
          <span className="sr-only">Search revision topics</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Find a topic</DialogTitle>
        <p className="mt-1 text-sm text-muted">Search Latin, French, Biology, games and the garden.</p>
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Vocabulary, cases, photosynthesis…"
          className="mt-4"
        />
        <ul className="mt-3 max-h-80 overflow-y-auto">
          {hits.map((hit) => (
            <li key={hit.id}>
              <button
                type="button"
                className="flex w-full flex-col rounded-md px-3 py-2.5 text-left hover:bg-sage"
                onClick={() => {
                  setOpen(false);
                  void navigate(linkFromHref(hit.href));
                }}
              >
                <span className="text-sm font-medium">{hit.title}</span>
                <span className="text-xs text-muted">{hit.detail}</span>
              </button>
            </li>
          ))}
          {hits.length === 0 && <li className="px-3 py-6 text-sm text-muted">No matching topics.</li>}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
