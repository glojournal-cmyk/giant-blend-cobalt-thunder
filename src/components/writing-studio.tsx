import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FRENCH_WRITING } from "@/lib/content/french";
import { playComplete } from "@/lib/audio";
import { useScholar } from "@/lib/store";

export function WritingStudio() {
  const writing = useScholar((s) => s.writing);
  const completeWriting = useScholar((s) => s.completeWriting);
  const sound = useScholar((s) => s.sound);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(writing[FRENCH_WRITING[0].id]?.text ?? "");
  const task = FRENCH_WRITING[index];

  function load(next: number) {
    const nextTask = FRENCH_WRITING[next];
    setIndex(next);
    setText(writing[nextTask.id]?.text ?? "");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Écriture</p>
      <h1 className="font-display text-3xl font-semibold">{task.title}</h1>
      <p className="text-muted">{task.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {FRENCH_WRITING.map((item, i) => (
          <Button key={item.id} size="sm" variant={i === index ? "default" : "secondary"} onClick={() => load(i)}>
            {item.title}
          </Button>
        ))}
      </div>
      <Card className="p-5">
        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted">
          {task.requirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-line bg-card p-3 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
          placeholder="Write in French. Model answers are examples, not the only valid response."
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            onClick={() => {
              completeWriting(task.id, text);
              if (sound) playComplete();
              toast("Writing saved", { description: "Scholar XP awarded for completing the challenge." });
            }}
            disabled={text.trim().length < 20}
          >
            Save and complete
          </Button>
        </div>
        <details className="mt-5 text-sm">
          <summary className="cursor-pointer font-medium">Model answer</summary>
          <p className="mt-2 text-muted">{task.model}</p>
        </details>
      </Card>
    </div>
  );
}
