import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ArrowRight, f as ArrowLeft } from "../_libs/lucide-react.mjs";
import { C as linkFromHref, D as LATIN_NOTES, E as LATIN_GAMES, F as FRENCH_WRITING, I as BIO_QUESTIONS, L as BIO_TOPICS, O as LATIN_QUESTIONS, P as FRENCH_VOCAB, a as dueReviewCount, c as useScholar, k as LATIN_VOCAB, n as Route } from "./router-JQNCs4HM.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Badge } from "./badge-9WJrS4ux.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study._subject-XW5Epj9g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SubjectPage() {
	const { subject } = Route.useParams();
	const setLast = useScholar((s) => s.setLastSubject);
	(0, import_react.useEffect)(() => {
		if (subject === "latin" || subject === "french" || subject === "biology") setLast(subject);
	}, [subject, setLast]);
	if (subject === "latin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatinHub, {});
	if (subject === "french") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrenchHub, {});
	if (subject === "biology") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BiologyHub, {});
	throw notFound();
}
function LatinHub() {
	const reviews = useScholar((s) => s.reviews);
	const games = useScholar((s) => s.games);
	const seenTotal = useScholar((s) => s.seenTotal);
	const due = dueReviewCount(reviews);
	const answered = Object.keys(seenTotal).filter((id) => LATIN_QUESTIONS.some((q) => q.id === id)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				to: "/study",
				label: "Study"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
				art: "/art/latin.jpg",
				kicker: "Year 9 · Current",
				title: "Latin",
				blurb: "Build fluency through short, focused sessions. Formal mastery stays academic. Scholar XP is separate."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Illustrated study",
						value: "Learn through clear ideas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Practice",
						value: `${answered} answered`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Due reviews",
						value: `${due} waiting`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/latin-practice",
						kicker: "Practice",
						title: "Focused session",
						detail: "Mixed vocabulary, grammar, translation and Roman world. Balanced set of 8."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/latin-review",
						kicker: "Review",
						title: due ? "Due review" : "Weak areas",
						detail: due ? `${due} items are due today.` : "Nothing is due. Practise lingering weak forms."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/latin-vocab",
						kicker: "Vocabulary",
						title: "Vocabulary review",
						detail: `${LATIN_VOCAB.length} core words and phrases.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/latin-notes",
						kicker: "Teacher notes",
						title: "Browse by idea",
						detail: "Short notes on tense, case and place."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
					children: "Latin games"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-semibold",
					children: "Learn by doing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Game points do not change formal mastery."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: LATIN_GAMES.map((game) => {
						const progress = games[game.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/play/$game",
							params: { game: game.id },
							className: "group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex items-center justify-between p-4 transition-colors group-hover:bg-sage",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-[0.16em] text-navy uppercase",
										children: game.kicker
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl font-semibold",
										children: game.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: game.blurb
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-xs text-muted tabular-nums",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										"Lv ",
										progress?.unlocked ?? 1,
										"/6"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [progress?.points ?? 0, " pts"] })]
								})]
							})
						}, game.id);
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
					children: "Teacher notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: LATIN_NOTES.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: [note.title, "."]
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: note.body
							})
						]
					}, note.id))
				})]
			})
		]
	});
}
function FrenchHub() {
	const writing = useScholar((s) => s.writing);
	const spellingDue = useScholar((s) => s.spellingDue);
	const due = Object.keys(spellingDue).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				to: "/study",
				label: "Study"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
				art: "/art/french.jpg",
				kicker: "Year 9 · Current",
				title: "French",
				blurb: "Vocabulaire, écriture, and an atelier d’orthographe where accents count."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/french-practice",
						kicker: "Pratique",
						title: "Focused session",
						detail: "Meanings, verbs and classroom French."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/french-vocab",
						kicker: "Vocabulaire",
						title: "Vocabulary review",
						detail: `${FRENCH_VOCAB.length} words and phrases across six topics.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/french-spelling",
						kicker: "Atelier d’orthographe",
						title: "Spell what you know",
						detail: due ? `${due} words waiting to return.` : "Exact learned spelling. Accents count. Wrong words return later."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						href: "/session/french-writing",
						kicker: "Écriture",
						title: "Writing challenges",
						detail: `${Object.keys(writing).length}/${FRENCH_WRITING.length} model tasks saved. Examples are not the only valid response.`
					})
				]
			})
		]
	});
}
function BiologyHub() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {
				to: "/study",
				label: "Study"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
				art: "/art/biology.jpg",
				kicker: "Year 8 · Foundation",
				title: "Biology",
				blurb: "Consolidate the ideas that Year 9 science still needs: cells, energy, digestion and ecosystems."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: BIO_TOPICS.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold",
						children: topic.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: topic.blurb
					})]
				}, topic.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
				href: "/session/bio-practice",
				kicker: "Foundation review",
				title: `Practice · ${BIO_QUESTIONS.length} questions`,
				detail: "Mixed retrieval across the five Year 8 topics."
			})
		]
	});
}
function Back({ to, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		...linkFromHref(to),
		className: "inline-flex items-center gap-2 text-sm text-muted hover:text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
			" ",
			label
		]
	});
}
function Hero({ art, kicker, title, blurb }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden p-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-[220px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: art,
				alt: "",
				className: "h-40 w-full object-cover md:h-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl font-semibold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-muted",
						children: blurb
					})
				]
			})]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.16em] text-navy uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-medium",
			children: value
		})]
	});
}
function ActionCard({ href, kicker, title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		...linkFromHref(href),
		className: "group block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex items-center justify-between gap-3 p-5 transition-colors group-hover:bg-sage",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-navy uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: detail
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 shrink-0" })]
		})
	});
}
function LatinDueBadge() {
	const due = dueReviewCount(useScholar((s) => s.reviews));
	if (!due) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "bronze",
		children: [due, " due"]
	});
}
//#endregion
export { LatinDueBadge, SubjectPage as component };
