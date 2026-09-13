import { BIO_QUESTIONS, BIO_TOPICS } from "@/lib/content/biology";
import { FRENCH_VOCAB, FRENCH_WRITING } from "@/lib/content/french";
import { LATIN_GAMES, LATIN_NOTES, LATIN_VOCAB } from "@/lib/content/latin";

export type SearchHit = {
  id: string;
  title: string;
  detail: string;
  href: string;
  group: string;
};

const INDEX: SearchHit[] = [
  ...LATIN_VOCAB.map((item) => ({
    id: `lv-${item.id}`,
    title: item.latin,
    detail: `${item.english} · Latin vocabulary`,
    href: "/session/latin-vocab",
    group: "Latin",
  })),
  ...LATIN_NOTES.map((item) => ({
    id: `ln-${item.id}`,
    title: item.title,
    detail: "Teacher notes · Latin",
    href: "/study/latin",
    group: "Latin",
  })),
  ...LATIN_GAMES.map((item) => ({
    id: `lg-${item.id}`,
    title: item.name,
    detail: item.blurb,
    href: `/play/${item.id}`,
    group: "Games",
  })),
  ...FRENCH_VOCAB.map((item) => ({
    id: `fv-${item.id}`,
    title: item.french,
    detail: `${item.english} · French vocabulary`,
    href: "/session/french-vocab",
    group: "French",
  })),
  ...FRENCH_WRITING.map((item) => ({
    id: `fw-${item.id}`,
    title: item.title,
    detail: "Writing challenge · French",
    href: "/session/french-writing",
    group: "French",
  })),
  ...BIO_TOPICS.map((item) => ({
    id: `bt-${item.id}`,
    title: item.name,
    detail: `${item.blurb} · Year 8 Biology`,
    href: "/session/bio-practice",
    group: "Biology",
  })),
  ...BIO_QUESTIONS.map((item) => ({
    id: `bq-${item.id}`,
    title: item.prompt,
    detail: "Year 8 Biology",
    href: "/session/bio-practice",
    group: "Biology",
  })),
  {
    id: "pe-circuit",
    title: "Quad Circuit",
    detail: "PE · catch, memory, cadence",
    href: "/play/pe-circuit",
    group: "Play",
  },
  {
    id: "play-hub",
    title: "Play hub",
    detail: "PE and Latin games",
    href: "/play",
    group: "Play",
  },
  {
    id: "wardrobe",
    title: "Wardrobe",
    detail: "Outfits and medals",
    href: "/scholar",
    group: "Scholar",
  },
  {
    id: "garden",
    title: "Scholar’s Garden",
    detail: "Growth world",
    href: "/garden",
    group: "Garden",
  },
];

export function searchTopics(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return INDEX.slice(0, 8);
  return INDEX.filter((hit) => `${hit.title} ${hit.detail} ${hit.group}`.toLowerCase().includes(q)).slice(0, 16);
}
