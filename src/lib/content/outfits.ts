import { gardenStage, levelFromXp } from "@/lib/xp";

export const DEFAULT_SCHOLAR_NAME = "Iris";

export type OutfitId = "day" | "summer" | "pe" | "house" | "winter" | "garden" | "prize";

export type Outfit = {
  id: OutfitId;
  name: string;
  blurb: string;
  art: string;
  need: string;
};

export const OUTFITS: Outfit[] = [
  {
    id: "day",
    name: "Day Uniform",
    blurb: "Cornflower jumper, blue-and-white blouse, charcoal pleated skirt.",
    art: "/art/outfits/day.jpg",
    need: "Starter outfit",
  },
  {
    id: "summer",
    name: "Summer Blouse",
    blurb: "Short sleeves for warm days on the quad.",
    art: "/art/outfits/summer.jpg",
    need: "Earn 60 Scholar XP",
  },
  {
    id: "pe",
    name: "PE Kit",
    blurb: "White polo, navy skort, hockey socks — ready for the circuit.",
    art: "/art/outfits/pe.jpg",
    need: "Complete one PE circuit",
  },
  {
    id: "house",
    name: "House Colours",
    blurb: "Teal house shirt for matches and sports day.",
    art: "/art/outfits/house.jpg",
    need: "Score in two different games",
  },
  {
    id: "winter",
    name: "Winter Coat",
    blurb: "Navy overcoat and cream scarf for cold mornings.",
    art: "/art/outfits/winter.jpg",
    need: "Study on 3 different days, or reach 200 XP",
  },
  {
    id: "garden",
    name: "Garden Club",
    blurb: "Sage apron and a pot of herbs from the walled garden.",
    art: "/art/outfits/garden.jpg",
    need: "Grow the garden to Young Growth",
  },
  {
    id: "prize",
    name: "Prize Day",
    blurb: "Navy blazer, gold badge, and a medal for the hall.",
    art: "/art/outfits/prize.jpg",
    need: "Reach Scholar level 4, or earn 3 medals",
  },
];

export type UnlockContext = {
  xp: number;
  peSessions: number;
  studyDays: number;
  medals: number;
  gameSessions: number;
};

export function isOutfitUnlocked(id: OutfitId, ctx: UnlockContext) {
  const level = levelFromXp(ctx.xp).level;
  const garden = gardenStage(ctx.xp);
  switch (id) {
    case "day":
      return true;
    case "summer":
      return ctx.xp >= 60;
    case "pe":
      return ctx.peSessions >= 1;
    case "house":
      return ctx.gameSessions >= 2;
    case "winter":
      return ctx.studyDays >= 3 || ctx.xp >= 200;
    case "garden":
      return garden >= 2;
    case "prize":
      return level >= 4 || ctx.medals >= 3;
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
    return "The day's work is done. The garden looks brighter already.";
  }
  if (opts.hour < 12) {
    return opts.peDone
      ? "Morning circuit done. Shall we open a Latin book?"
      : "Good morning. Latin first, or a turn on the quad?";
  }
  if (opts.hour < 17) {
    return opts.peDone
      ? "Afternoon light on the walls. A little more practice will do."
      : "The quad is free. A short circuit would wake the mind.";
  }
  return "Evening study holds. One more page, then rest.";
}

export function statFill(value: number) {
  return Math.round((value / (value + 90)) * 100);
}
