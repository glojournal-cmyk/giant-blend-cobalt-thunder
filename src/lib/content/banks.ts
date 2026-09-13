import { BIO_QUESTIONS, BIO_TOPICS } from "@/lib/content/biology";
import { CHEM_QUESTIONS, CHEM_TOPICS } from "@/lib/content/chemistry";
import { ENG_QUESTIONS, ENG_TOPICS } from "@/lib/content/english";
import { FRENCH_QUESTIONS, FRENCH_VOCAB } from "@/lib/content/french";
import { LATIN_QUESTIONS, LATIN_VOCAB } from "@/lib/content/latin";
import { PHYS_QUESTIONS, PHYS_TOPICS } from "@/lib/content/physics";
import type { QuizItem } from "@/components/quiz-session";
import type { SubjectId } from "@/lib/content/subjects";

export function questionsFor(subject: string): (QuizItem & { topic?: string })[] {
  if (subject === "latin") return LATIN_QUESTIONS;
  if (subject === "french") return FRENCH_QUESTIONS;
  if (subject === "biology") return BIO_QUESTIONS;
  if (subject === "chemistry") return CHEM_QUESTIONS;
  if (subject === "physics") return PHYS_QUESTIONS;
  if (subject === "english") return ENG_QUESTIONS;
  return [];
}

export function topicsFor(subject: string) {
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
  return subject === "latin" || subject === "french";
}

export function hasGames(subject: SubjectId) {
  return subject === "latin" || subject === "french";
}
