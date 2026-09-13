export const XP_RULES = {
  daily_complete: 60,
  practice_first_correct: 4,
  practice_repeat_correct: 1,
  practice_repair_correct: 2,
  due_review_correct: 6,
  spelling_first: 8,
  spelling_repair: 2,
  vocab_review: 10,
  quiz_complete_80: 30,
  quiz_bonus_90: 15,
  game_complete: 20,
  writing_complete: 20,
  weak_area_complete: 8,
  pe_complete: 24,
} as const;

export type XpEvent = keyof typeof XP_RULES;

export function xpNeed(level: number) {
  return Math.round(100 + (level - 1) * 40 + (level - 1) ** 1.35 * 10);
}

export function levelFromXp(total: number) {
  let remaining = Math.max(0, total);
  for (let level = 1; level <= 50; level++) {
    const need = xpNeed(level);
    if (remaining < need) return { level, into: remaining, next: need };
    remaining -= need;
  }
  return { level: 50, into: remaining, next: xpNeed(50) };
}

export function gardenStage(total: number) {
  if (total >= 2200) return 4;
  if (total >= 1000) return 3;
  if (total >= 400) return 2;
  return 1;
}

export const GARDEN_MILESTONES = [
  {
    stage: 1,
    min: 0,
    name: "Seedling",
    copy: "The first signs of your study habit are taking root.",
    art: "/art/garden-1.jpg",
  },
  {
    stage: 2,
    min: 400,
    name: "Young Growth",
    copy: "Regular learning has grown a stronger, leafier plant.",
    art: "/art/garden-2.jpg",
  },
  {
    stage: 3,
    min: 1000,
    name: "Budding",
    copy: "Your Garden is established and preparing to bloom.",
    art: "/art/garden-3.jpg",
  },
  {
    stage: 4,
    min: 2200,
    name: "In Bloom",
    copy: "A flourishing Scholar Garden grown through sustained study.",
    art: "/art/garden-4.jpg",
  },
] as const;

export function nextGarden(total: number) {
  const stage = gardenStage(total);
  const current = GARDEN_MILESTONES[stage - 1];
  const upcoming = GARDEN_MILESTONES.slice(stage)[0] ?? null;
  if (!upcoming) {
    return { stage, current, upcoming: null, left: 0, target: current.min };
  }
  return {
    stage,
    current,
    upcoming,
    left: Math.max(0, upcoming.min - total),
    target: upcoming.min,
  };
}
