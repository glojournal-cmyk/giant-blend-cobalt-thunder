import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COLLECTIBLES } from "@/lib/content/collectibles";
import { isOutfitUnlocked, OUTFITS, type OutfitId } from "@/lib/content/outfits";
import { gardenStage, levelFromXp, XP_RULES, type XpEvent } from "@/lib/xp";
import { addDays, todayKey } from "@/lib/utils";

export type DailyTask = {
  id: string;
  title: string;
  detail: string;
  href: string;
  target: number;
  progress: number;
};

export type ReviewItem = { stage: number; due: string };

export type GameProgress = {
  points: number;
  unlocked: number;
  stars: number[];
  streak: number;
};

export type HistoryItem = {
  at: string;
  kind: string;
  detail: string;
  xp: number;
};

type AwardResult = { awarded: number; levelUp: boolean; unlocked: string[] };

type ScholarState = {
  version: number;
  displayName: string;
  xp: number;
  latinXp: number;
  frenchXp: number;
  bioXp: number;
  studyDays: string[];
  today: string;
  daily: DailyTask[];
  dailyCompleteAwarded: Record<string, boolean>;
  reviews: Record<string, ReviewItem>;
  seenCorrect: Record<string, number>;
  seenTotal: Record<string, number>;
  games: Record<string, GameProgress>;
  collectibles: string[];
  medals: string[];
  history: HistoryItem[];
  spellingDue: Record<string, { due: string; wrong: boolean }>;
  writing: Record<string, { text: string; at: string }>;
  sound: boolean;
  lastSubject: string | null;
  eventCounts: Record<string, number>;
  bodyXp: number;
  equippedOutfit: OutfitId;
  unlockedOutfits: string[];
  peSessions: number;
};

type ScholarActions = {
  hydrateDay: () => void;
  setName: (name: string) => void;
  setSound: (on: boolean) => void;
  setLastSubject: (id: string) => void;
  equipOutfit: (id: OutfitId) => void;
  award: (event: XpEvent, opts?: { subject?: "latin" | "french" | "biology"; detail?: string }) => AwardResult;
  recordAttempt: (id: string, ok: boolean, subject: "latin" | "french" | "biology") => AwardResult;
  bumpDaily: (id: string, amount?: number) => AwardResult | null;
  completeWriting: (id: string, text: string) => AwardResult;
  recordSpelling: (id: string, ok: boolean) => AwardResult;
  recordGame: (gameId: string, points: number, stars: number, level: number) => AwardResult;
  recordPe: (points: number, stars: number, level: number) => AwardResult;
  resetAll: () => void;
};

export type ScholarStore = ScholarState & ScholarActions;

const GAME_IDS = ["forma-forge", "sentence-mosaic", "verbum-match", "manuscript", "pe-circuit"];

function emptyGames() {
  return Object.fromEntries(
    GAME_IDS.map((id) => [id, { points: 0, unlocked: 1, stars: [0, 0, 0, 0, 0, 0], streak: 0 }]),
  ) as Record<string, GameProgress>;
}

function buildDaily(): DailyTask[] {
  return [
    {
      id: "latin-practice",
      title: "Latin practice",
      detail: "Eight focused questions.",
      href: "/session/latin-practice",
      target: 8,
      progress: 0,
    },
    {
      id: "pe-circuit",
      title: "PE circuit",
      detail: "Catch, remember, keep time.",
      href: "/play/pe-circuit",
      target: 1,
      progress: 0,
    },
    {
      id: "play-game",
      title: "A study game",
      detail: "One short Latin game.",
      href: "/play",
      target: 1,
      progress: 0,
    },
  ];
}

function initialState(): ScholarState {
  return {
    version: 2,
    displayName: "",
    xp: 0,
    latinXp: 0,
    frenchXp: 0,
    bioXp: 0,
    bodyXp: 0,
    studyDays: [],
    today: todayKey(),
    daily: buildDaily(),
    dailyCompleteAwarded: {},
    reviews: {},
    seenCorrect: {},
    seenTotal: {},
    games: emptyGames(),
    collectibles: [],
    medals: [],
    history: [],
    spellingDue: {},
    writing: {},
    sound: true,
    lastSubject: null,
    eventCounts: {},
    equippedOutfit: "day",
    unlockedOutfits: ["day"],
    peSessions: 0,
  };
}

function applyUnlocks(state: ScholarState) {
  const nextCollect = new Set(state.collectibles);
  const nextMedals = new Set(state.medals);
  const nextOutfits = new Set(state.unlockedOutfits ?? ["day"]);
  const unlocked: string[] = [];

  const gameSessions = Object.values(state.games).filter((game) => game.points > 0).length;
  const ctx = {
    xp: state.xp,
    peSessions: state.peSessions ?? 0,
    studyDays: state.studyDays.length,
    medals: nextMedals.size,
    gameSessions,
  };

  for (const outfit of OUTFITS) {
    if (isOutfitUnlocked(outfit.id, ctx) && !nextOutfits.has(outfit.id)) {
      nextOutfits.add(outfit.id);
      unlocked.push(`outfit:${outfit.id}`);
    }
  }

  const checks: Array<{ id: string; ok: boolean; kind: "item" | "medal" }> = [
    { id: "ink-pot", ok: state.xp >= 40, kind: "item" },
    { id: "study-books", ok: state.xp >= 250, kind: "item" },
    {
      id: "scholars-globe",
      ok: state.latinXp >= 300 && state.frenchXp >= 300,
      kind: "item",
    },
    { id: "first-steps", ok: state.xp >= 100, kind: "medal" },
    { id: "daily-disciplina", ok: state.studyDays.length >= 7, kind: "medal" },
    { id: "latin-scholar", ok: state.latinXp >= 200, kind: "medal" },
    { id: "french-scholar", ok: state.frenchXp >= 200, kind: "medal" },
    {
      id: "polyglot",
      ok: state.latinXp >= 150 && state.frenchXp >= 150,
      kind: "medal",
    },
    { id: "first-circuit", ok: state.peSessions >= 1, kind: "medal" },
    { id: "three-looks", ok: nextOutfits.size >= 3, kind: "medal" },
    { id: "body-trained", ok: state.bodyXp >= 80, kind: "medal" },
    { id: "full-wardrobe", ok: nextOutfits.size >= OUTFITS.length, kind: "medal" },
  ];

  for (const check of checks) {
    const already = check.kind === "item" ? nextCollect.has(check.id) : nextMedals.has(check.id);
    if (check.ok && !already) {
      if (check.kind === "item") nextCollect.add(check.id);
      else nextMedals.add(check.id);
      unlocked.push(check.id);
    }
  }

  state.collectibles = [...nextCollect];
  state.medals = [...nextMedals];
  state.unlockedOutfits = [...nextOutfits];
  return unlocked;
}

function noteStudyDay(state: ScholarState) {
  const day = todayKey();
  if (!state.studyDays.includes(day)) state.studyDays = [...state.studyDays, day].slice(-60);
}

export const useScholar = create<ScholarStore>()(
  persist(
    (set, get) => ({
      ...initialState(),
      hydrateDay: () => {
        const day = todayKey();
        const current = get();
        const hasPe = current.daily.some((task) => task.id === "pe-circuit");
        const next = { ...current };
        if (current.today !== day || !hasPe) {
          next.today = day;
          next.daily = buildDaily();
        }
        applyUnlocks(next);
        set({
          today: next.today,
          daily: next.daily,
          unlockedOutfits: next.unlockedOutfits,
          medals: next.medals,
          collectibles: next.collectibles,
        });
      },
      setName: (name) => set({ displayName: name.slice(0, 32) }),
      setSound: (on) => set({ sound: on }),
      setLastSubject: (id) => set({ lastSubject: id }),
      equipOutfit: (id) => {
        if (!get().unlockedOutfits.includes(id)) return;
        set({ equippedOutfit: id });
      },
      award: (event, opts) => {
        const state = get();
        const count = state.eventCounts[event] ?? 0;
        const oneShot = event === "daily_complete" || event === "writing_complete";
        let multiplier = 1;
        if (oneShot) multiplier = count === 0 ? 1 : 0;
        else if (count === 1) multiplier = 0.2;
        else if (count >= 2 && event !== "practice_first_correct" && event !== "practice_repeat_correct" && event !== "practice_repair_correct" && event !== "due_review_correct" && event !== "spelling_first" && event !== "spelling_repair" && event !== "vocab_review" && event !== "game_complete" && event !== "pe_complete") {
          multiplier = 0;
        }
        const awarded = Math.round(XP_RULES[event] * multiplier);
        const before = levelFromXp(state.xp).level;
        const next: ScholarState = {
          ...state,
          xp: state.xp + awarded,
          bodyXp: (state.bodyXp ?? 0) + (event === "pe_complete" ? awarded : 0),
          latinXp: state.latinXp + (opts?.subject === "latin" ? awarded : 0),
          frenchXp: state.frenchXp + (opts?.subject === "french" ? awarded : 0),
          bioXp: state.bioXp + (opts?.subject === "biology" ? awarded : 0),
          eventCounts: { ...state.eventCounts, [event]: count + 1 },
        };
        noteStudyDay(next);
        const unlocked = applyUnlocks(next);
        if (awarded > 0) {
          next.history = [
            {
              at: new Date().toISOString(),
              kind: event,
              detail: opts?.detail ?? event,
              xp: awarded,
            },
            ...next.history,
          ].slice(0, 40);
        }
        set(next);
        return {
          awarded,
          levelUp: levelFromXp(next.xp).level > before,
          unlocked,
        };
      },
      recordAttempt: (id, ok, subject) => {
        const state = get();
        const seen = (state.seenTotal[id] ?? 0) + 1;
        const correct = (state.seenCorrect[id] ?? 0) + (ok ? 1 : 0);
        const reviews = { ...state.reviews };
        if (!ok) {
          reviews[id] = { stage: 1, due: addDays(todayKey(), 2) };
        } else if (reviews[id]) {
          if (reviews[id].stage === 1) reviews[id] = { stage: 2, due: addDays(todayKey(), 7) };
          else delete reviews[id];
        }
        set({
          seenTotal: { ...state.seenTotal, [id]: seen },
          seenCorrect: { ...state.seenCorrect, [id]: correct },
          reviews,
        });
        const due = state.reviews[id] && state.reviews[id].due <= todayKey();
        const event: XpEvent = !ok
          ? "practice_repair_correct"
          : due
            ? "due_review_correct"
            : seen === 1
              ? "practice_first_correct"
              : "practice_repeat_correct";
        if (!ok) {
          noteStudyDay(get());
          return { awarded: 0, levelUp: false, unlocked: [] };
        }
        return get().award(event, { subject, detail: id });
      },
      bumpDaily: (id, amount = 1) => {
        const state = get();
        const daily = state.daily.map((task) =>
          task.id === id
            ? { ...task, progress: Math.min(task.target, task.progress + amount) }
            : task,
        );
        set({ daily });
        const complete = daily.every((task) => task.progress >= task.target);
        if (complete && !state.dailyCompleteAwarded[state.today]) {
          set({
            dailyCompleteAwarded: { ...state.dailyCompleteAwarded, [state.today]: true },
          });
          return get().award("daily_complete", { detail: "All three tasks" });
        }
        return null;
      },
      completeWriting: (id, text) => {
        set({
          writing: {
            ...get().writing,
            [id]: { text, at: new Date().toISOString() },
          },
        });
        return get().award("writing_complete", { subject: "french", detail: id });
      },
      recordSpelling: (id, ok) => {
        const due = { ...get().spellingDue };
        if (!ok) due[id] = { due: addDays(todayKey(), 2), wrong: true };
        else delete due[id];
        set({ spellingDue: due });
        if (!ok) return { awarded: 0, levelUp: false, unlocked: [] };
        const event: XpEvent = get().spellingDue[id] ? "spelling_repair" : "spelling_first";
        return get().award(event, { subject: "french", detail: id });
      },
      recordGame: (gameId, points, stars, level) => {
        const games = { ...get().games };
        const current = games[gameId] ?? { points: 0, unlocked: 1, stars: [0, 0, 0, 0, 0, 0], streak: 0 };
        const nextStars = [...current.stars];
        nextStars[level - 1] = Math.max(nextStars[level - 1] ?? 0, stars);
        const unlocked = Math.max(current.unlocked, stars >= 1 ? Math.min(6, level + 1) : current.unlocked);
        games[gameId] = {
          points: current.points + points,
          unlocked,
          stars: nextStars,
          streak: stars >= 2 ? current.streak + 1 : 0,
        };
        set({ games });
        get().bumpDaily("play-game", 1);
        return get().award("game_complete", { subject: "latin", detail: gameId });
      },
      recordPe: (points, stars, level) => {
        const games = { ...get().games };
        const current = games["pe-circuit"] ?? { points: 0, unlocked: 1, stars: [0, 0, 0, 0, 0, 0], streak: 0 };
        const nextStars = [...current.stars];
        nextStars[level - 1] = Math.max(nextStars[level - 1] ?? 0, stars);
        const unlocked = Math.max(current.unlocked, stars >= 1 ? Math.min(3, level + 1) : current.unlocked);
        games["pe-circuit"] = {
          points: current.points + points,
          unlocked,
          stars: nextStars,
          streak: stars >= 2 ? current.streak + 1 : 0,
        };
        set({ games, peSessions: get().peSessions + 1 });
        get().bumpDaily("pe-circuit", 1);
        return get().award("pe_complete", { detail: "PE circuit" });
      },
      resetAll: () => set(initialState()),
    }),
    {
      name: "lux-scholar-garden-v1",
      version: 2,
      migrate: (persisted) => {
        const p = persisted as ScholarState;
        return {
          ...p,
          version: 2,
          bodyXp: p.bodyXp ?? 0,
          equippedOutfit: p.equippedOutfit ?? "day",
          unlockedOutfits: p.unlockedOutfits?.length ? p.unlockedOutfits : ["day"],
          peSessions: p.peSessions ?? 0,
          games: { ...emptyGames(), ...p.games },
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.hydrateDay();
      },
    },
  ),
);

export function dueReviewCount(reviews: Record<string, ReviewItem>) {
  const today = todayKey();
  return Object.values(reviews).filter((item) => item.due <= today).length;
}

export function nextUnlock(xp: number, owned: string[]) {
  return COLLECTIBLES.find((item) => !owned.includes(item.id)) ?? COLLECTIBLES[COLLECTIBLES.length - 1];
}

export function gameSessionCount(games: Record<string, GameProgress>) {
  return Object.values(games).filter((game) => game.points > 0).length;
}

export { gardenStage, levelFromXp };
