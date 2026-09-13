export type Collectible = {
  id: string;
  name: string;
  blurb: string;
  art: string;
  need: string;
};

export const COLLECTIBLES: Collectible[] = [
  {
    id: "ink-pot",
    name: "Ink Pot",
    blurb: "A scholar’s first tool.",
    art: "/art/ink-pot.jpg",
    need: "40 XP",
  },
  {
    id: "study-books",
    name: "Study Books",
    blurb: "A small working library.",
    art: "/art/books.jpg",
    need: "250 XP",
  },
  {
    id: "scholars-globe",
    name: "Scholar’s Globe",
    blurb: "Latin and French, side by side.",
    art: "/art/globe.jpg",
    need: "300 Latin XP and 300 French XP",
  },
];

export type Medal = {
  id: string;
  name: string;
  blurb: string;
};

export const MEDALS: Medal[] = [
  { id: "first-steps", name: "First Steps", blurb: "Reach 100 Scholar XP." },
  { id: "daily-disciplina", name: "Disciplina", blurb: "Study on 7 different days." },
  { id: "latin-scholar", name: "Latin Scholar", blurb: "Earn 200 Latin XP." },
  { id: "french-scholar", name: "French Scholar", blurb: "Earn 200 French XP." },
  { id: "polyglot", name: "Polyglot", blurb: "Earn 150 Latin XP and 150 French XP." },
  { id: "first-circuit", name: "First Circuit", blurb: "Complete a PE session on the quad." },
  { id: "three-looks", name: "Three Looks", blurb: "Unlock three outfits." },
  { id: "body-trained", name: "Trained", blurb: "Earn 80 Body XP from exercise." },
  { id: "full-wardrobe", name: "Full Wardrobe", blurb: "Unlock every outfit." },
];

export const QUOTES = [
  "Knowledge is a garden that always grows.",
  "Lux et labor — light, and the work that holds it.",
  "Small steps today, a brighter tomorrow.",
  "The plant follows the study, not the other way around.",
  "Mastery stays academic. The garden is for the habit.",
];
