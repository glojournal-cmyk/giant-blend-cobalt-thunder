import { gardenStage, levelFromXp } from "@/lib/xp";

export const DEFAULT_SCHOLAR_NAME = "Scholar";

export type OutfitId = "day" | "library" | "winter" | "spring" | "latin" | "rose" | "pe";

export type Outfit = {
  id: OutfitId;
  name: string;
  blurb: string;
  art: string;
  closet: string;
  need: string;
  category: "Uniform" | "Study" | "Seasonal" | "Latin" | "French" | "Achievement";
};

export const OUTFITS: Outfit[] = [
  {
    id: "day",
    name: "Day Uniform",
    blurb: "Teal pullover, striped blouse, charcoal pleats.",
    art: "/art/outfits/day.jpg?v=plain",
    closet: "/art/closet/day.jpg",
    need: "Starter outfit",
    category: "Uniform",
  },
  {
    id: "library",
    name: "Cardigan",
    blurb: "The matching teal school cardigan.",
    art: "/art/outfits/library.jpg?v=plain",
    closet: "/art/closet/library.jpg",
    need: "Earn 60 Scholar XP",
    category: "Uniform",
  },
  {
    id: "winter",
    name: "Winter Kit",
    blurb: "Day uniform, autumn light, black tights.",
    art: "/art/outfits/winter.jpg?v=plain",
    closet: "/art/closet/winter.jpg",
    need: "Reach Scholar Level 8",
    category: "Seasonal",
  },
  {
    id: "spring",
    name: "Summer Blouse",
    blurb: "Short-sleeve stripes, no jumper.",
    art: "/art/outfits/spring.jpg",
    closet: "/art/closet/spring.jpg",
    need: "Grow the garden to Courtyard",
    category: "Seasonal",
  },
  {
    id: "latin",
    name: "Prize Day",
    blurb: "Rosette, medal, prize-day kit.",
    art: "/art/outfits/latin.jpg?v=plain",
    closet: "/art/closet/latin.jpg",
    need: "Master 5 Latin topics",
    category: "Latin",
  },
  {
    id: "rose",
    name: "Storm Jacket",
    blurb: "Games jacket over the PE kit.",
    art: "/art/outfits/rose.jpg",
    closet: "/art/closet/rose.jpg",
    need: "Complete two PE circuits",
    category: "Achievement",
  },
  {
    id: "pe",
    name: "PE Kit",
    blurb: "White polo, cyan panels, black skort.",
    art: "/art/outfits/pe.jpg?v=plain",
    closet: "/art/closet/pe.jpg",
    need: "Complete one PE circuit",
    category: "Achievement",
  },
];

export type UnlockContext = {
  xp: number;
  peSessions: number;
  studyDays: number;
  medals: number;
  gameSessions: number;
  latinTopics?: number;
  writingDone?: number;
};

export function isOutfitUnlocked(id: OutfitId, ctx: UnlockContext) {
  const level = levelFromXp(ctx.xp).level;
  const garden = gardenStage(ctx.xp);
  switch (id) {
    case "day":
      return true;
    case "library":
      return ctx.xp >= 60;
    case "pe":
      return ctx.peSessions >= 1;
    case "rose":
      return ctx.peSessions >= 2;
    case "winter":
      return level >= 8 || ctx.xp >= 400;
    case "spring":
      return garden >= 2;
    case "latin":
      return (ctx.latinTopics ?? 0) >= 5 || ctx.xp >= 250;
  }
}

export function outfitById(id: string) {
  return OUTFITS.find((item) => item.id === id) ?? OUTFITS[0];
}

export function nextOutfit(unlocked: string[], ctx: UnlockContext) {
  return OUTFITS.find((item) => !unlocked.includes(item.id) && !isOutfitUnlocked(item.id, ctx)) ?? null;
}

export function scholarLine(opts: { hour: number; dailyDone: number; dailyTotal: number; peDone: boolean }) {
  if (opts.dailyDone >= opts.dailyTotal) {
    return "The day’s work is done. The garden looks brighter already.";
  }
  if (opts.hour < 12) return "Small steps today, a brighter tomorrow.";
  if (opts.hour < 17) return "Discipline today, freedom tomorrow.";
  return "One more page, then rest. Progress looks good on you.";
}

export function statFill(n: number) {
  return Math.max(3, Math.min(100, Math.round(n)));
}
