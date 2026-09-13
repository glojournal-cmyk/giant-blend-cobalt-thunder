import { cn } from "@/lib/utils";

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 text-leaf", className)} fill="none" aria-hidden>
      <path
        d="M5 19c6-1 10-6 12-14 0 0-8 1-12 8-1 2-1 4 0 6Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M7 17c3-3 6-8 8-13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function VineCorner({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={cn("pointer-events-none text-leaf/55", flip && "-scale-x-100", className)}
      fill="none"
      aria-hidden
    >
      <path d="M12 168c20-38 48-62 88-78" stroke="currentColor" strokeWidth="1.4" />
      <path d="M40 150c18-8 28-22 34-40" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="96" cy="84" rx="10" ry="16" transform="rotate(-30 96 84)" fill="currentColor" opacity="0.55" />
      <ellipse cx="72" cy="108" rx="9" ry="14" transform="rotate(-50 72 108)" fill="currentColor" opacity="0.5" />
      <ellipse cx="52" cy="132" rx="8" ry="13" transform="rotate(-20 52 132)" fill="currentColor" opacity="0.45" />
      <circle cx="118" cy="70" r="3.2" fill="#f7f4ee" stroke="currentColor" />
      <circle cx="84" cy="96" r="2.6" fill="#f7f4ee" stroke="currentColor" />
    </svg>
  );
}

export function ScriptQuote({ children, className }: { children: string; className?: string }) {
  return <p className={cn("font-script text-xl leading-snug text-script", className)}>{children}</p>;
}

export function Kicker({ children }: { children: string }) {
  return <p className="kicker">{children}</p>;
}
