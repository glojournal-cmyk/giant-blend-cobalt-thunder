export type SubjectId = "latin" | "french" | "biology" | "chemistry" | "physics" | "english";

export type Subject = {
  id: SubjectId;
  name: string;
  year: 8 | 9;
  tags: string[];
  quote: string;
  quoteBy?: string;
  blurb: string;
  art: string;
  accent: "navy" | "leaf" | "blush" | "sky" | "lilac";
};

export const SUBJECTS: Subject[] = [
  {
    id: "latin",
    name: "Latin",
    year: 9,
    tags: ["Language", "Thinking", "Culture"],
    quote: "Lingua Latina per semper.",
    blurb: "Language, culture, and a brighter you.",
    art: "/art/subjects/latin.jpg",
    accent: "navy",
  },
  {
    id: "french",
    name: "French",
    year: 9,
    tags: ["Language", "Communication", "Culture"],
    quote: "Un monde plus grand t’attend.",
    blurb: "Language opens a brighter world.",
    art: "/art/subjects/french.jpg",
    accent: "blush",
  },
  {
    id: "biology",
    name: "Biology",
    year: 9,
    tags: ["Life", "Systems", "Discovery"],
    quote: "Small wonders, big connections.",
    blurb: "Explore life. Ask questions. Grow your understanding.",
    art: "/art/subjects/biology.jpg",
    accent: "leaf",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    year: 9,
    tags: ["Matter", "Change", "Possibility"],
    quote: "Change creates opportunity.",
    blurb: "From elements to a brighter tomorrow.",
    art: "/art/subjects/chemistry.jpg",
    accent: "sky",
  },
  {
    id: "physics",
    name: "Physics",
    year: 9,
    tags: ["Forces", "Ideas", "The Universe"],
    quote: "Curiosity moves the world.",
    blurb: "Explore. Question. Discover.",
    art: "/art/subjects/physics.jpg",
    accent: "lilac",
  },
  {
    id: "english",
    name: "English",
    year: 9,
    tags: ["Reading", "Writing", "Expression"],
    quote: "Better words, brighter worlds.",
    blurb: "Literature, expression, and imagination.",
    art: "/art/subjects/english.jpg",
    accent: "navy",
  },
];

export function subjectById(id: string) {
  return SUBJECTS.find((item) => item.id === id) ?? null;
}

export const SUBJECT_MODES = [
  { id: "learn", label: "Learn", detail: "Explore grammar, vocabulary and culture.", tint: "bg-sky/60" },
  { id: "practise", label: "Practise", detail: "Build your skills with targeted exercises.", tint: "bg-sage" },
  { id: "play", label: "Play", detail: "Make learning feel like play.", tint: "bg-blush" },
  { id: "progress", label: "Progress", detail: "See how far you’ve grown.", tint: "bg-lilac/70" },
] as const;
