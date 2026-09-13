import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COLLECTIBLES } from "@/lib/content/collectibles";
import { isOutfitUnlocked, OUTFITS, DEFAULT_LOOK, lookFromOutfit, type OutfitId, type ScholarLook } from "@/lib/content/outfits";
import { gardenStage, levelFromXp, XP_RULES, type XpEvent } from "@/lib/xp";
import { addDays, todayKey } from "@/lib/utils";
import type { SubjectId } from "@/lib/content/subjects";

export type DailyTask = {
  id: string;
  title: string;
  detail: string;
  href: string;
  target: number;
  progress: number;
  xp: number;
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

export type SubjectKey = SubjectId;

type ScholarState = {
  version: number;
  displayName: string;
  philosophy: string;
  xp: number;
  latinXp: number;
  frenchXp: number;
  bioXp: number;
  chemXp: number;
  physXp: number;
  engXp: number;
  bodyXp: number;
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
  music: boolean;
  notifications: boolean;
  lastSubject: string | null;
  lastTopic: string | null;
  eventCounts: Record<string, number>;
  equippedOutfit: OutfitId;
  look: ScholarLook;
  year: 8 | 9;
  unlockedOutfits: string[];
  peSessions: number;
  lessonsDone: string[];
  waterCount: number;
  wateredOn: string;
  activity: Record<string, number>;
  xpToday: number;
  questionsToday: number;
};

type ScholarActions = {
  hydrateDay: () => void;
  setName: (name: string) => void;
  setPhilosophy: (text: string) => void;
  setSound: (on: boolean) => void;
  setMusic: (on: boolean) => void;
  setNotifications: (on: boolean) => void;
  setLastSubject: (id: string) => void;
  setLastTopic: (id: string) => void;
  setYear: (year: 8 | 9) => void;
  setLook: (patch: Partial<ScholarLook>) => void;
  equipOutfit: (id: OutfitId) => void;
  award: (event: XpEvent, opts?: { subject?: SubjectKey; detail?: string }) => AwardResult;
  recordAttempt: (id: string, ok: boolean, subject: SubjectKey) => AwardResult;
  bumpDaily: (id: string, amount?: number) => AwardResult | null;
  completeWriting: (id: string, text: string) => AwardResult;
  recordSpelling: (id: string, ok: boolean) => AwardResult;
  recordGame: (gameId: string, points: number, stars: number, level: number) => AwardResult;
  recordPe: (points: number, stars: number, level: number) => AwardResult;
  completeLesson: (id: string) => AwardResult;
  waterGarden: () => AwardResult | null;
  resetAll: () => void;
};

export type ScholarStore = ScholarState & ScholarActions;

const GAME_IDS = [
  "forma-forge",
  "sentence-mosaic",
  "verbum-match",
  "manuscript",
  "pe-circuit",
  "mot-match",
  "phrase-mosaic",
  "element-match",
  "force-match",
  "word-match",
  "organelle-match",
];

function emptyGames() {
  return Object.fromEntries(
    GAME_IDS.map((id) => [id, { points: 0, unlocked: 1, stars: [0, 0, 0, 0, 0, 0], streak: 0 }]),
  ) as Record<string, GameProgress>;
}

function buildDaily(): DailyTask[] {
  return [
    { id: "latin-practice", title: "Complete a study session", detail: "Eight focused questions.", href: "/study/latin/practise", target: 8, progress: 0, xp: 10 },
    { id: "french-vocab", title: "Review French vocab", detail: "A short vocabulary pass.", href: "/session/french-vocab", target: 1, progress: 0, xp: 10 },
    { id: "tend-garden", title: "Water your plants", detail: "Tend the Scholar’s Garden.", href: "/garden", target: 1, progress: 0, xp: 10 },
    { id: "play-game", title: "Play a quick game", detail: "One short learning game.", href: "/study/latin/play", target: 1, progress: 0, xp: 10 },
  ];
}

function mapLegacyOutfit(id: string | undefined): OutfitId {
  if (id === "summer" || id === "house") return "library";
  if (id === "garden") return "spring";
  if (id === "prize") return "latin";
  if (OUTFITS.some((item) => item.id === id)) return id as OutfitId;
  return "day";
}

function initialState(): ScholarState {
  return {
    version: 4,
    displayName: "",
    philosophy: "Small steps, consistent effort, and a curious mind.",
    xp: 0,
    latinXp: 0,
    frenchXp: 0,
    bioXp: 0,
    chemXp: 0,
    physXp: 0,
    engXp: 0,
    bodyXp: 0,
    studyDays: [],
    today: todayKey(),
    daily: buildDaily(),
    dailyCompleteAwarded: {},
    reviews: {},
    seenCorrect: {},
    seenTotal: {},
    games: emptyGames(),
    collectibles: ["herb"],
    medals: [],
    history: [],
    spellingDue: {},
    writing: {},
    sound: true,
    music: false,
    notifications: true,
    lastSubject: null,
    lastTopic: null,
    eventCounts: {},
    equippedOutfit: "day",
    look: { ...DEFAULT_LOOK },
    year: 9,
    unlockedOutfits: ["day"],
    peSessions: 0,
    lessonsDone: [],
    waterCount: 0,
    wateredOn: "",
    activity: {},
    xpToday: 0,
    questionsToday: 0,
  };
}

function latinTopicCount(state: ScholarState) {
  return Object.keys(state.seenCorrect).filter((id) => id.startsWith("q-") || id.startsWith("v-")).length;
}

function applyUnlocks(state: ScholarState) {
  const nextCollect = new Set(state.collectibles);
  const nextMedals = new Set(state.medals);
  const nextOutfits = new Set(state.unlockedOutfits ?? ["day"]);
  const unlocked: string[] = [];

  const gameSessions = Object.values(state.games).filter((game) => game.points > 0).length;
  const questions = Object.values(state.seenTotal).reduce((n, v) => n + v, 0);
  const ctx = {
    xp: state.xp,
    peSessions: state.peSessions ?? 0,
    studyDays: state.studyDays.length,
    medals: nextMedals.size,
    gameSessions,
    latinTopics: latinTopicCount(state),
    writingDone: Object.keys(state.writing).length,
  };

  for (const outfit of OUTFITS) {
    if (isOutfitUnlocked(outfit.id, ctx) && !nextOutfits.has(outfit.id)) {
      nextOutfits.add(outfit.id);
      unlocked.push(`outfit:${outfit.id}`);
    }
  }

  const garden = gardenStage(state.xp);
  const frenchQs = Object.keys(state.seenTotal).filter((id) => id.startsWith("fq") || id.startsWith("fv")).length;
  const latinQs = Object.keys(state.seenTotal).filter((id) => id.startsWith("q-") || id.startsWith("v-")).length;
  const level = levelFromXp(state.xp).level;

  const checks: Array<{ id: string; ok: boolean; kind: "item" | "medal" }> = [
    { id: "herb", ok: true, kind: "item" },
    { id: "garden-within", ok: state.xp >= 40, kind: "item" },
    { id: "bench", ok: state.xp >= 80, kind: "item" },
    { id: "riviere-notes", ok: state.xp >= 120, kind: "item" },
    { id: "lantern", ok: state.xp >= 150, kind: "item" },
    { id: "lily-renewal", ok: state.xp >= 200, kind: "item" },
    { id: "bookshelf", ok: state.xp >= 250, kind: "item" },
    { id: "lunar-bloom", ok: state.studyDays.length >= 3, kind: "item" },
    { id: "compass", ok: questions >= 20, kind: "item" },
    { id: "pressed", ok: state.waterCount >= 1, kind: "item" },
    { id: "midnight-ink", ok: Object.keys(state.writing).length >= 1, kind: "item" },
    { id: "cat-companion", ok: gameSessions >= 1, kind: "item" },
    { id: "roses", ok: garden >= 2, kind: "item" },
    { id: "fountain", ok: garden >= 3, kind: "item" },
    { id: "celestial-globe", ok: state.latinXp >= 300 && state.frenchXp >= 200, kind: "item" },
    { id: "first-steps", ok: questions >= 1 || state.xp >= 20, kind: "medal" },
    { id: "study-streak", ok: state.studyDays.length >= 7, kind: "medal" },
    { id: "garden-lover", ok: state.waterCount >= 5, kind: "medal" },
    { id: "language-star", ok: questions >= 50, kind: "medal" },
    { id: "latin-explorer", ok: latinQs >= 10, kind: "medal" },
    { id: "french-explorer", ok: frenchQs >= 10, kind: "medal" },
    { id: "scholar-spirit", ok: state.studyDays.length >= 30, kind: "medal" },
    { id: "brighter-you", ok: level >= 10, kind: "medal" },
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

function addSubjectXp(state: ScholarState, subject: SubjectKey | undefined, amount: number) {
  if (!subject || amount <= 0) return;
  if (subject === "latin") state.latinXp += amount;
  if (subject === "french") state.frenchXp += amount;
  if (subject === "biology") state.bioXp += amount;
  if (subject === "chemistry") state.chemXp += amount;
  if (subject === "physics") state.physXp += amount;
  if (subject === "english") state.engXp += amount;
}

export const useScholar = create<ScholarStore>()(
  persist(
    (set, get) => ({
      ...initialState(),
      hydrateDay: () => {
        const day = todayKey();
        const current = get();
        const next = { ...current };
        if (current.today !== day) {
          next.today = day;
          next.daily = buildDaily();
          next.xpToday = 0;
          next.questionsToday = 0;
        } else if (current.daily.length < 4) {
          next.daily = buildDaily().map((task) => {
            const old = current.daily.find((item) => item.id === task.id);
            return old ? { ...task, progress: old.progress } : task;
          });
        }
        applyUnlocks(next);
        set({
          today: next.today,
          daily: next.daily,
          xpToday: next.xpToday,
          questionsToday: next.questionsToday,
          unlockedOutfits: next.unlockedOutfits,
          medals: next.medals,
          collectibles: next.collectibles,
        });
      },
      setName: (name) => set({ displayName: name.slice(0, 32) }),
      setPhilosophy: (text) => set({ philosophy: text.slice(0, 180) }),
      setSound: (on) => set({ sound: on }),
      setMusic: (on) => set({ music: on }),
      setNotifications: (on) => set({ notifications: on }),
      setLastSubject: (id) => set({ lastSubject: id }),
      setLastTopic: (id) => set({ lastTopic: id }),
      setYear: (year) => set({ year }),
      setLook: (patch) => {
        const look = { ...get().look, ...patch };
        set({ look });
      },
      equipOutfit: (id) => {
        if (!get().unlockedOutfits.includes(id)) return;
        set({ equippedOutfit: id, look: lookFromOutfit(id) });
      },
      award: (event, opts) => {
        const state = get();
        const count = state.eventCounts[event] ?? 0;
        const oneShot = event === "daily_complete" || event === "writing_complete" || event === "lesson_complete" || event === "garden_water";
        let multiplier = 1;
        if (oneShot) multiplier = count === 0 || event === "lesson_complete" || event === "garden_water" || event === "writing_complete" ? 1 : 0;
        else if (count === 1) multiplier = 0.2;
        else if (
          count >= 2 &&
          event !== "practice_first_correct" &&
          event !== "practice_repeat_correct" &&
          event !== "practice_repair_correct" &&
          event !== "due_review_correct" &&
          event !== "spelling_first" &&
          event !== "spelling_repair" &&
          event !== "vocab_review" &&
          event !== "game_complete" &&
          event !== "pe_complete"
        ) {
          multiplier = 0;
        }
        const awarded = Math.round(XP_RULES[event] * multiplier);
        const before = levelFromXp(state.xp).level;
        const next: ScholarState = {
          ...state,
          xp: state.xp + awarded,
          xpToday: (state.xpToday ?? 0) + awarded,
          bodyXp: (state.bodyXp ?? 0) + (event === "pe_complete" ? awarded : 0),
          latinXp: state.latinXp,
          frenchXp: state.frenchXp,
          bioXp: state.bioXp,
          chemXp: state.chemXp ?? 0,
          physXp: state.physXp ?? 0,
          engXp: state.engXp ?? 0,
          eventCounts: { ...state.eventCounts, [event]: count + 1 },
        };
        addSubjectXp(next, opts?.subject, awarded);
        noteStudyDay(next);
        const unlocked = applyUnlocks(next);
        if (awarded > 0) {
          next.history = [
            { at: new Date().toISOString(), kind: event, detail: opts?.detail ?? event, xp: awarded },
            ...next.history,
          ].slice(0, 40);
        }
        set(next);
        return { awarded, levelUp: levelFromXp(next.xp).level > before, unlocked };
      },
      recordAttempt: (id, ok, subject) => {
        const state = get();
        const seen = (state.seenTotal[id] ?? 0) + 1;
        const correct = (state.seenCorrect[id] ?? 0) + (ok ? 1 : 0);
        const reviews = { ...state.reviews };
        if (!ok) reviews[id] = { stage: 1, due: addDays(todayKey(), 2) };
        else if (reviews[id]) {
          if (reviews[id].stage === 1) reviews[id] = { stage: 2, due: addDays(todayKey(), 7) };
          else delete reviews[id];
        }
        const day = todayKey();
        set({
          seenTotal: { ...state.seenTotal, [id]: seen },
          seenCorrect: { ...state.seenCorrect, [id]: correct },
          reviews,
          questionsToday: (state.questionsToday ?? 0) + 1,
          activity: { ...state.activity, [day]: (state.activity[day] ?? 0) + 1 },
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
          task.id === id ? { ...task, progress: Math.min(task.target, task.progress + amount) } : task,
        );
        set({ daily });
        const complete = daily.every((task) => task.progress >= task.target);
        if (complete && !state.dailyCompleteAwarded[state.today]) {
          set({ dailyCompleteAwarded: { ...state.dailyCompleteAwarded, [state.today]: true } });
          return get().award("daily_complete", { detail: "All daily tasks" });
        }
        return null;
      },
      completeWriting: (id, text) => {
        set({
          writing: { ...get().writing, [id]: { text, at: new Date().toISOString() } },
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
      completeLesson: (id) => {
        const done = new Set(get().lessonsDone);
        if (done.has(id)) return { awarded: 0, levelUp: false, unlocked: [] };
        done.add(id);
        set({ lessonsDone: [...done] });
        get().setLastTopic(id);
        return get().award("lesson_complete", { detail: id });
      },
      waterGarden: () => {
        const state = get();
        const day = todayKey();
        if (state.wateredOn === day) return null;
        set({ wateredOn: day, waterCount: state.waterCount + 1 });
        get().bumpDaily("tend-garden", 1);
        return get().award("garden_water", { detail: "Watered the garden" });
      },
      resetAll: () => set(initialState()),
    }),
    {
      name: "lux-scholar-garden-v1",
      version: 4,
      migrate: (persisted) => {
        const p = persisted as ScholarState & { equippedOutfit?: string; unlockedOutfits?: string[]; look?: ScholarLook; year?: 8 | 9 };
        const outfits = (p.unlockedOutfits ?? ["day"]).map(mapLegacyOutfit);
        const equipped = mapLegacyOutfit(p.equippedOutfit);
        return {
          ...initialState(),
          ...p,
          version: 4,
          philosophy: p.philosophy || "Small steps, consistent effort, and a curious mind.",
          chemXp: p.chemXp ?? 0,
          physXp: p.physXp ?? 0,
          engXp: p.engXp ?? 0,
          music: p.music ?? false,
          notifications: p.notifications ?? true,
          lessonsDone: p.lessonsDone ?? [],
          waterCount: p.waterCount ?? 0,
          wateredOn: p.wateredOn ?? "",
          activity: p.activity ?? {},
          xpToday: p.xpToday ?? 0,
          questionsToday: p.questionsToday ?? 0,
          equippedOutfit: equipped,
          look: p.look ?? lookFromOutfit(equipped),
          year: p.year === 8 ? 8 : 9,
          unlockedOutfits: [...new Set(["day", ...outfits])],
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

export function subjectXp(state: Pick<ScholarState, "latinXp" | "frenchXp" | "bioXp" | "chemXp" | "physXp" | "engXp">, id: string) {
  if (id === "latin") return state.latinXp;
  if (id === "french") return state.frenchXp;
  if (id === "biology") return state.bioXp;
  if (id === "chemistry") return state.chemXp ?? 0;
  if (id === "physics") return state.physXp ?? 0;
  if (id === "english") return state.engXp ?? 0;
  return 0;
}

export { gardenStage, levelFromXp };
