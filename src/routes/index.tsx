import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Dumbbell, Gamepad2 } from "lucide-react";
import { CharacterStage } from "@/components/character-stage";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { nextOutfit, scholarLine, statFill } from "@/lib/content/outfits";
import { dueReviewCount, gameSessionCount, nextUnlock, useScholar } from "@/lib/store";
import { linkFromHref } from "@/lib/nav";
import { GARDEN_MILESTONES, levelFromXp, nextGarden } from "@/lib/xp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const xp = useScholar((s) => s.xp);
  const daily = useScholar((s) => s.daily);
  const name = useScholar((s) => s.displayName);
  const collectibles = useScholar((s) => s.collectibles);
  const lastSubject = useScholar((s) => s.lastSubject);
  const reviews = useScholar((s) => s.reviews);
  const latinXp = useScholar((s) => s.latinXp);
  const frenchXp = useScholar((s) => s.frenchXp);
  const bioXp = useScholar((s) => s.bioXp);
  const bodyXp = useScholar((s) => s.bodyXp);
  const games = useScholar((s) => s.games);
  const equippedOutfit = useScholar((s) => s.equippedOutfit);
  const unlockedOutfits = useScholar((s) => s.unlockedOutfits);
  const peSessions = useScholar((s) => s.peSessions);
  const studyDays = useScholar((s) => s.studyDays);
  const medals = useScholar((s) => s.medals);
  const { level, into, next } = levelFromXp(xp);
  const garden = nextGarden(xp);
  const done = daily.filter((t) => t.progress >= t.target).length;
  const unlock = nextUnlock(xp, collectibles);
  const peDone = (daily.find((t) => t.id === "pe-circuit")?.progress ?? 0) >= 1;
  const line = scholarLine({
    hour: new Date().getHours(),
    dailyDone: done,
    dailyTotal: daily.length,
    peDone,
  });
  const continueHref =
    lastSubject === "french" ? "/study/french" : lastSubject === "biology" ? "/study/biology" : "/study/latin";
  const due = dueReviewCount(reviews);
  const mind = latinXp + frenchXp + bioXp;
  const spark = Object.values(games).reduce((sum, game) => sum + game.points, 0);
  const upcomingOutfit = nextOutfit(unlockedOutfits, {
    xp,
    peSessions,
    studyDays: studyDays.length,
    medals: medals.length,
    gameSessions: gameSessionCount(games),
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
      <CharacterStage outfitId={equippedOutfit} name={name} line={line} level={level} />

      <div className="flex flex-col gap-4">
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Scholar level</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="font-display text-4xl font-semibold">Lv {level}</p>
            <p className="text-sm text-muted tabular-nums">
              {into} / {next} XP
            </p>
          </div>
          <Progress className="mt-3" value={(into / next) * 100} />
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Mind" value={mind} />
            <Stat label="Body" value={bodyXp} />
            <Stat label="Spark" value={spark} />
          </dl>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <Action to={continueHref} icon={BookOpen} label="Practise" detail="Study" />
          <Action to="/play/pe-circuit" icon={Dumbbell} label="Exercise" detail="PE" />
          <Action to="/play" icon={Gamepad2} label="Play" detail="Games" />
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Today</p>
              <h2 className="font-display text-2xl font-semibold">Raise her today</h2>
            </div>
            <Badge variant="sage">
              {done} / {daily.length} tasks
            </Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {daily.map((task) => (
              <li key={task.id}>
                <Link {...linkFromHref(task.href)} className="block rounded-lg p-1 hover:bg-sage">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{task.title}</span>
                    <span className="text-muted tabular-nums">
                      {task.progress}/{task.target}
                    </span>
                  </div>
                  <Progress className="mt-1.5" value={(task.progress / task.target) * 100} />
                </Link>
              </li>
            ))}
          </ul>
          {due > 0 && (
            <p className="mt-3 text-sm text-bronze">
              {due} due review{due === 1 ? "" : "s"} waiting in Latin.
            </p>
          )}
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="grid grid-cols-[88px_1fr] sm:grid-cols-[108px_1fr]">
            <img
              src={GARDEN_MILESTONES[garden.stage - 1].art}
              alt={garden.current.name}
              className="h-full min-h-[108px] w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Your garden</p>
              <p className="font-display text-xl font-semibold">
                Garden Stage {garden.stage} · {garden.current.name}
              </p>
              <p className="mt-1 text-sm text-muted">{garden.current.copy}</p>
              <Link to="/garden" className="mt-2 inline-block text-sm font-medium text-navy hover:underline">
                Open the garden
              </Link>
            </div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-4">
          <img
            src={upcomingOutfit?.art ?? unlock.art}
            alt=""
            className="size-16 rounded-lg object-cover object-top"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.18em] text-navy uppercase">Next unlock</p>
            <p className="font-medium">{upcomingOutfit?.name ?? unlock.name}</p>
            <p className="text-sm text-muted">{upcomingOutfit?.need ?? unlock.need}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-sage/70 px-2 py-2">
      <dt className="text-[11px] font-semibold tracking-[0.16em] text-navy uppercase">{label}</dt>
      <dd className="font-display text-xl font-semibold tabular-nums">{value}</dd>
      <Progress className="mt-1.5" value={statFill(value)} />
    </div>
  );
}

function Action({
  to,
  icon: Icon,
  label,
  detail,
}: {
  to: string;
  icon: typeof BookOpen;
  label: string;
  detail: string;
}) {
  return (
    <Link
      {...linkFromHref(to)}
      className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl bg-navy px-2 py-3 text-card transition-transform duration-150 hover:bg-navy-2 active:scale-[0.96]"
    >
      <Icon className="size-4" />
      <span className="font-display text-lg leading-none">{label}</span>
      <span className="text-[11px] tracking-wide text-card/70">{detail}</span>
    </Link>
  );
}
