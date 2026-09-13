import { BIO_GAMES, BIO_QUESTIONS, BIO_TOPICS } from "@/lib/content/biology";
import { CHEM_GAMES, CHEM_QUESTIONS, CHEM_TOPICS } from "@/lib/content/chemistry";
import { ENG_GAMES, ENG_QUESTIONS, ENG_TOPICS, ENG_VOCAB } from "@/lib/content/english";
import { FRENCH_GAMES, FRENCH_QUESTIONS, FRENCH_VOCAB } from "@/lib/content/french";
import { LATIN_GAMES, LATIN_QUESTIONS, LATIN_VOCAB } from "@/lib/content/latin";
import { PHYS_GAMES, PHYS_QUESTIONS, PHYS_TOPICS } from "@/lib/content/physics";
import { year8Questions } from "@/lib/content/year8";
import type { QuizItem } from "@/components/quiz-session";
import type { SubjectId } from "@/lib/content/subjects";

export function questionsFor(subject: string, year: 8 | 9 = 9): (QuizItem & { topic?: string })[] {
  if (year === 8) return year8Questions(subject);
  if (subject === "latin") return LATIN_QUESTIONS;
  if (subject === "french") return FRENCH_QUESTIONS;
  if (subject === "biology") return BIO_QUESTIONS;
  if (subject === "chemistry") return CHEM_QUESTIONS;
  if (subject === "physics") return PHYS_QUESTIONS;
  if (subject === "english") return ENG_QUESTIONS;
  return [];
}

export function topicsFor(subject: string, year: 8 | 9 = 9) {
  const qs = questionsFor(subject, year);
  const fromQs = [...new Set(qs.map((q) => q.topic).filter(Boolean))] as string[];
  if (fromQs.length) return fromQs.map((name) => ({ id: name, name }));
  if (subject === "latin") {
    return [...new Set(LATIN_QUESTIONS.map((q) => q.topic))].map((name) => ({ id: name, name }));
  }
  if (subject === "french") {
    return [...new Set(FRENCH_VOCAB.map((q) => q.topic))].map((name) => ({ id: name, name }));
  }
  if (subject === "biology") return BIO_TOPICS.map((t) => ({ id: t.id, name: t.name }));
  if (subject === "chemistry") return CHEM_TOPICS.map((t) => ({ id: t.id, name: t.name }));
  if (subject === "physics") return PHYS_TOPICS.map((t) => ({ id: t.id, name: t.name }));
  if (subject === "english") return ENG_TOPICS.map((t) => ({ id: t.id, name: t.name }));
  return [];
}

export function hasDictation(subject: string) {
  return subject === "latin" || subject === "french" || subject === "english";
}

export function hasGames(subject: SubjectId) {
  return (
    subject === "latin" ||
    subject === "french" ||
    subject === "chemistry" ||
    subject === "physics" ||
    subject === "english" ||
    subject === "biology"
  );
}

export function gamesFor(subject: string) {
  if (subject === "latin") return LATIN_GAMES;
  if (subject === "french") return FRENCH_GAMES;
  if (subject === "chemistry") return CHEM_GAMES;
  if (subject === "physics") return PHYS_GAMES;
  if (subject === "english") return ENG_GAMES;
  if (subject === "biology") return BIO_GAMES;
  return [];
}

export function gameArt(id: string) {
  if (id === "forma-forge") return "/art/games/forma.jpg";
  if (id === "sentence-mosaic" || id === "phrase-mosaic") return "/art/games/mosaic.jpg";
  if (id === "manuscript") return "/art/games/manuscript.jpg";
  if (id === "pe-circuit") return "/art/outfits/pe.jpg";
  return "/art/games/match.jpg";
}
