import { i as __toESM } from "../_runtime.mjs";
import { a as foldLatin, i as foldFrenchLoose, o as shuffle, r as foldFrench, s as todayKey } from "./utils-BgyUJvZ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as linkFromHref, D as LATIN_NOTES, F as FRENCH_WRITING, I as BIO_QUESTIONS, N as FRENCH_QUESTIONS, O as LATIN_QUESTIONS, P as FRENCH_VOCAB, R as Input, S as playWrong, b as playComplete, c as useScholar, k as LATIN_VOCAB, r as Route$2, x as playCorrect } from "./router-JQNCs4HM.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Progress } from "./progress-BI6Z_qWx.mjs";
import { t as Button } from "./button-BtPXJ6vz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session._kind-YYE05TRq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizSession({ title, kicker, items, subject, dailyId, fold = "latin", backHref }) {
	const sound = useScholar((s) => s.sound);
	const recordAttempt = useScholar((s) => s.recordAttempt);
	const bumpDaily = useScholar((s) => s.bumpDaily);
	const award = useScholar((s) => s.award);
	const deck = (0, import_react.useMemo)(() => shuffle(items).slice(0, Math.min(8, items.length)), [items]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("choice");
	const [verdict, setVerdict] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const item = deck[index];
	const total = deck.length;
	function matches(given) {
		const check = fold === "french" ? foldFrenchLoose : foldLatin;
		return [item.answer, ...item.accepted].map(check).includes(check(given));
	}
	function submit(given) {
		if (!item || verdict) return;
		const ok = matches(given);
		setVerdict({
			ok,
			given
		});
		if (ok) setScore((n) => n + 1);
		recordAttempt(item.id, ok, subject);
		if (dailyId) bumpDaily(dailyId, 1);
		if (sound) (ok ? playCorrect : playWrong)();
	}
	function next() {
		if (index + 1 >= total) {
			setDone(true);
			const pct = Math.round(score / total * 100);
			if (pct >= 80) award("quiz_complete_80", {
				subject,
				detail: title
			});
			if (pct >= 90) award("quiz_bonus_90", {
				subject,
				detail: title
			});
			if (sound) playComplete();
			toast(pct >= 80 ? "Session complete" : "Session saved", { description: `${score} / ${total} · Scholar XP updated.` });
			return;
		}
		setIndex((n) => n + 1);
		setTyped("");
		setVerdict(null);
		setMode(index % 2 === 0 ? "type" : "choice");
	}
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nothing is due right now." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				...linkFromHref(backHref),
				children: "Back"
			})
		})]
	});
	if (done) {
		const pct = Math.round(score / total * 100);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-navy uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-semibold",
					children: "Session complete"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-lg",
					children: [
						score,
						" / ",
						total,
						" · ",
						pct,
						"%"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-md text-muted",
					children: "Formal mastery stays academic. Scholar XP is awarded separately, and the garden grows from the habit."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							...linkFromHref(backHref),
							children: "Return"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => window.location.reload(),
						children: "Practise again"
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted tabular-nums",
				children: [
					index + 1,
					" of ",
					total
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				className: "mt-3",
				value: (index + (verdict ? 1 : 0)) / total * 100
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold leading-snug",
					children: item.prompt
				}),
				mode === "choice" || item.choices.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-2",
					children: item.choices.map((choice) => {
						const selected = verdict?.given === choice;
						const ok = verdict && matches(choice);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: Boolean(verdict),
							onClick: () => submit(choice),
							className: `min-h-12 rounded-lg border px-4 py-3 text-left text-sm ${verdict && ok ? "border-good bg-sage-2" : selected && verdict && !verdict.ok ? "border-danger bg-danger/10" : "border-line bg-card hover:bg-sage"}`,
							children: choice
						}, choice);
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 flex gap-2",
					onSubmit: (event) => {
						event.preventDefault();
						submit(typed);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: typed,
						onChange: (e) => setTyped(e.target.value),
						placeholder: "Type the answer",
						disabled: Boolean(verdict),
						autoCapitalize: "off",
						autoCorrect: "off"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: Boolean(verdict) || !typed.trim(),
						children: "Check"
					})]
				}),
				verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-lg bg-sage p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: verdict.ok ? "Correct." : "Not yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-muted",
							children: [item.answer, item.explain ? ` — ${item.explain}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							onClick: next,
							children: index + 1 >= total ? "Finish" : "Continue"
						})
					]
				})
			]
		})]
	});
}
function SpellingWorkshop() {
	const sound = useScholar((s) => s.sound);
	const spellingDue = useScholar((s) => s.spellingDue);
	const recordSpelling = useScholar((s) => s.recordSpelling);
	const pool = (0, import_react.useMemo)(() => {
		const spellable = FRENCH_VOCAB.filter((item) => item.spelling);
		const due = spellable.filter((item) => spellingDue[item.id]);
		const rest = spellable.filter((item) => !spellingDue[item.id]);
		return [...due, ...shuffle(rest)].slice(0, 8);
	}, [spellingDue]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [verdict, setVerdict] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const item = pool[index];
	function check() {
		if (!item || verdict !== null) return;
		const ok = foldFrench(typed) === foldFrench(item.french);
		setVerdict(ok);
		if (ok) setScore((n) => n + 1);
		recordSpelling(item.id, ok);
		if (sound) (ok ? playCorrect : playWrong)();
	}
	function next() {
		if (index + 1 >= pool.length) {
			setDone(true);
			if (sound) playComplete();
			return;
		}
		setIndex((n) => n + 1);
		setTyped("");
		setVerdict(null);
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mx-auto max-w-xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Atelier complete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					score,
					" / ",
					pool.length,
					" spelled independently. Wrong words return later, not immediately."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/study/$subject",
					params: { subject: "french" },
					children: "Return to French"
				})
			})
		]
	});
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
				children: "Atelier d’orthographe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Spell what you know"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Exact learned French spelling. Accents count."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "English prompt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-semibold",
						children: item.english
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-5 flex gap-2",
						onSubmit: (event) => {
							event.preventDefault();
							check();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: typed,
							onChange: (e) => setTyped(e.target.value),
							placeholder: "Type the French",
							disabled: verdict !== null,
							lang: "fr",
							autoCapitalize: "off",
							autoCorrect: "off"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: verdict !== null,
							children: "Check"
						})]
					}),
					verdict !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: verdict ? "Exact." : "Returned for later."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: item.french
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								onClick: next,
								children: "Continue"
							})
						]
					})
				]
			})
		]
	});
}
function TeacherNotes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
				children: "Teacher notes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Browse by idea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Content, not calendar date. Short notes that sit beside the games and quizzes."
			}),
			LATIN_NOTES.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: note.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: note.body
				})]
			}, note.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/study/$subject",
					params: { subject: "latin" },
					children: "Back to Latin"
				})
			})
		]
	});
}
function VocabReview({ title, items, subject, strict = false, dailyId, backHref }) {
	const sound = useScholar((s) => s.sound);
	const recordAttempt = useScholar((s) => s.recordAttempt);
	const bumpDaily = useScholar((s) => s.bumpDaily);
	const award = useScholar((s) => s.award);
	const deck = (0, import_react.useMemo)(() => shuffle(items).slice(0, 8), [items]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const item = deck[index];
	function check() {
		if (!item) return;
		const given = typed.trim();
		const ok = strict ? foldFrench(given) === foldFrench(item.back) : [item.back, ...item.extra ?? []].some((value) => foldLatin(value) === foldLatin(given));
		recordAttempt(item.id, ok, subject);
		if (dailyId) bumpDaily(dailyId, 1);
		award("vocab_review", {
			subject,
			detail: item.front
		});
		if (sound) (ok ? playCorrect : playWrong)();
		if (index + 1 >= deck.length) setDone(true);
		else {
			setIndex((n) => n + 1);
			setFlipped(false);
			setTyped("");
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mx-auto max-w-xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Vocabulary pass complete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Eight cards reviewed. Weak items will return in due course."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					...linkFromHref(backHref),
					children: "Return"
				})
			})
		]
	});
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted tabular-nums",
				children: [
					index + 1,
					" / ",
					deck.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "w-full text-left",
				onClick: () => setFlipped((v) => !v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "grid min-h-48 place-items-center p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-semibold",
						children: flipped ? item.back : item.front
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs tracking-[0.16em] text-muted uppercase",
						children: flipped ? "English" : "Tap to peek"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					check();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: typed,
					onChange: (e) => setTyped(e.target.value),
					placeholder: strict ? "Exact spelling, accents included" : "Type the meaning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Check"
				})]
			})
		]
	});
}
function WritingStudio() {
	const writing = useScholar((s) => s.writing);
	const completeWriting = useScholar((s) => s.completeWriting);
	const sound = useScholar((s) => s.sound);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [text, setText] = (0, import_react.useState)(writing[FRENCH_WRITING[0].id]?.text ?? "");
	const task = FRENCH_WRITING[index];
	function load(next) {
		const nextTask = FRENCH_WRITING[next];
		setIndex(next);
		setText(writing[nextTask.id]?.text ?? "");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
				children: "Écriture"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: task.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: task.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: FRENCH_WRITING.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: i === index ? "default" : "secondary",
					onClick: () => load(i),
					children: item.title
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mb-4 list-disc space-y-1 pl-5 text-sm text-muted",
						children: task.requirements.map((req) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: req }, req))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						onChange: (e) => setText(e.target.value),
						rows: 8,
						className: "w-full rounded-lg border border-line bg-card p-3 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40",
						placeholder: "Write in French. Model answers are examples, not the only valid response."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								completeWriting(task.id, text);
								if (sound) playComplete();
								toast("Writing saved", { description: "Scholar XP awarded for completing the challenge." });
							},
							disabled: text.trim().length < 20,
							children: "Save and complete"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "mt-5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "cursor-pointer font-medium",
							children: "Model answer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: task.model
						})]
					})
				]
			})
		]
	});
}
function SessionPage() {
	const { kind } = Route$2.useParams();
	const reviews = useScholar((s) => s.reviews);
	const today = todayKey();
	if (kind === "latin-practice") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizSession, {
		title: "Latin practice",
		kicker: "Focused session",
		items: LATIN_QUESTIONS,
		subject: "latin",
		dailyId: "latin-practice",
		backHref: "/study/latin"
	});
	if (kind === "latin-review") {
		const dueIds = Object.entries(reviews).filter(([, item]) => item.due <= today).map(([id]) => id);
		const due = LATIN_QUESTIONS.filter((q) => dueIds.includes(q.id));
		const weak = LATIN_QUESTIONS.filter((q) => reviews[q.id]);
		const items = due.length ? due : weak.length ? weak : LATIN_QUESTIONS;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizSession, {
			title: due.length ? "Due review" : "Weak areas",
			kicker: "Latin",
			items,
			subject: "latin",
			backHref: "/study/latin"
		});
	}
	if (kind === "latin-vocab") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VocabReview, {
		title: "Latin vocabulary",
		items: LATIN_VOCAB.map((item) => ({
			id: item.id,
			front: item.latin,
			back: item.english,
			extra: item.extra
		})),
		subject: "latin",
		dailyId: "vocab-pass",
		backHref: "/study/latin"
	});
	if (kind === "latin-notes") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherNotes, {});
	if (kind === "french-practice") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizSession, {
		title: "French practice",
		kicker: "Pratique",
		items: FRENCH_QUESTIONS,
		subject: "french",
		fold: "french",
		backHref: "/study/french"
	});
	if (kind === "french-vocab") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VocabReview, {
		title: "Vocabulaire",
		items: FRENCH_VOCAB.map((item) => ({
			id: item.id,
			front: item.french,
			back: item.english
		})),
		subject: "french",
		dailyId: "vocab-pass",
		backHref: "/study/french"
	});
	if (kind === "french-spelling") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpellingWorkshop, {});
	if (kind === "french-writing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WritingStudio, {});
	if (kind === "bio-practice") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizSession, {
		title: "Biology foundation",
		kicker: "Year 8",
		items: BIO_QUESTIONS,
		subject: "biology",
		backHref: "/study/biology"
	});
	throw notFound();
}
//#endregion
export { SessionPage as component };
