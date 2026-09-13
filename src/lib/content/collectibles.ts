export type Collectible = {
  id: string;
  name: string;
  blurb: string;
  art: string;
  need: string;
  kind: "Books" | "Plants" | "Artefacts" | "Keepsakes" | "Tools" | "Garden";
};

export const COLLECTIBLES: Collectible[] = [
  { id: "garden-within", name: "The Garden Within", blurb: "Find beauty in steady progress.", art: "/art/items/garden-within.jpg", need: "40 XP", kind: "Books" },
  { id: "riviere-notes", name: "Rivière Notes", blurb: "Ideas flow further together.", art: "/art/books.jpg", need: "120 XP", kind: "Books" },
  { id: "lunar-bloom", name: "Lunar Bloom", blurb: "A rare flower that blooms under moonlight.", art: "/art/items/lunar-bloom.jpg", need: "Study 3 days", kind: "Plants" },
  { id: "lily-renewal", name: "Lily of Renewal", blurb: "A symbol of fresh beginnings.", art: "/art/items/herb.jpg", need: "200 XP", kind: "Plants" },
  { id: "compass", name: "Scholar’s Compass", blurb: "For those who seek a clearer direction.", art: "/art/items/compass.jpg", need: "Complete 20 questions", kind: "Artefacts" },
  { id: "celestial-globe", name: "Celestial Globe", blurb: "A map for bigger dreams.", art: "/art/items/celestial-globe.jpg", need: "300 Latin XP and 200 French XP", kind: "Artefacts" },
  { id: "pressed", name: "Pressed Memories", blurb: "Small moments, kept forever.", art: "/art/items/pressed.jpg", need: "Water the garden", kind: "Keepsakes" },
  { id: "midnight-ink", name: "Midnight Ink", blurb: "For thoughts worth keeping.", art: "/art/items/midnight-ink.jpg", need: "Complete a writing task", kind: "Tools" },
  { id: "bench", name: "Wooden Bench", blurb: "A quiet place to think.", art: "/art/items/bench.jpg", need: "80 XP", kind: "Garden" },
  { id: "herb", name: "Potted Herb", blurb: "Basil — curiosity takes root.", art: "/art/items/herb.jpg", need: "Starter", kind: "Garden" },
  { id: "lantern", name: "Garden Lantern", blurb: "Lights the way.", art: "/art/items/lantern.jpg", need: "150 XP", kind: "Garden" },
  { id: "cat-companion", name: "Cat Companion", blurb: "A cozy friend.", art: "/art/cat.jpg", need: "Play a game", kind: "Garden" },
  { id: "bookshelf", name: "Bookshelf", blurb: "For growing minds.", art: "/art/items/bookshelf.jpg", need: "250 XP", kind: "Garden" },
  { id: "roses", name: "White Roses", blurb: "Symbol of new beginnings.", art: "/art/items/roses.jpg", need: "Garden stage 2", kind: "Garden" },
  { id: "fountain", name: "Stone Fountain", blurb: "A place for deeper thoughts.", art: "/art/items/fountain.jpg", need: "Reach garden stage 3", kind: "Garden" },
];

export type Medal = {
  id: string;
  name: string;
  blurb: string;
  group: "Academic" | "Streaks" | "Garden" | "Games" | "Special";
  target: number;
};

export const MEDALS: Medal[] = [
  { id: "first-steps", name: "First Steps", blurb: "Complete your first study session.", group: "Academic", target: 1 },
  { id: "study-streak", name: "Study Streak", blurb: "Study for 7 days in a row.", group: "Streaks", target: 7 },
  { id: "garden-lover", name: "Garden Lover", blurb: "Tend the garden 5 times.", group: "Garden", target: 5 },
  { id: "language-star", name: "Language Star", blurb: "Complete 50 language exercises.", group: "Academic", target: 50 },
  { id: "latin-explorer", name: "Latin Explorer", blurb: "Answer 10 Latin questions.", group: "Academic", target: 10 },
  { id: "french-explorer", name: "French Explorer", blurb: "Answer 10 French questions.", group: "Academic", target: 10 },
  { id: "scholar-spirit", name: "Scholar Spirit", blurb: "Log in for 30 days total.", group: "Streaks", target: 30 },
  { id: "brighter-you", name: "A Brighter You", blurb: "Reach Scholar Level 10.", group: "Special", target: 10 },
];

export const QUOTES = [
  "Knowledge is a garden that always grows.",
  "Small steps today, a brighter tomorrow.",
  "Discipline today, freedom tomorrow.",
  "Progress, not perfection.",
  "The best things in life are built, not given.",
  "A different language is a different vision of life.",
  "Little by little, much becomes possible.",
  "Progress looks good on you.",
];
