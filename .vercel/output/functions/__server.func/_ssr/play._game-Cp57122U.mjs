import { i as __toESM } from "../_runtime.mjs";
import { o as shuffle } from "./utils-BgyUJvZ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ArrowLeft, l as Diamond } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as MANUSCRIPT_CASES, E as LATIN_GAMES, M as MOSAIC_ITEMS, S as playWrong, T as FORMA_ITEMS, b as playComplete, c as useScholar, i as Route$3, j as MATCH_PAIRS, w as FORMA_DISTRACTORS, x as playCorrect } from "./router-JQNCs4HM.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Button } from "./button-BtPXJ6vz.mjs";
import { n as PeCircuit, t as PE_GAME } from "./pe-circuit-Dpo0WKxB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._game-Cp57122U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GameChrome({ title, level, points, streak, shields, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
				children: "Latin game"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 text-sm tabular-nums text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Level ",
						level,
						" / 6"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [points, " pts"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Streak ", streak] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex items-center gap-1 text-navy",
						children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diamond, { className: `size-3.5 ${i < shields ? "fill-navy" : "opacity-30"}` }, i))
					})
				]
			})]
		}), children]
	});
}
function ResultCard({ title, points, stars }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-navy uppercase",
				children: "Session complete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					points,
					" game points · ",
					stars,
					" star",
					stars === 1 ? "" : "s",
					". Game points do not change formal mastery."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/study/$subject",
						params: { subject: "latin" },
						children: "Back to Latin"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/study/$subject",
						params: { subject: "latin" },
						children: "More games"
					})
				})]
			})
		]
	});
}
function FormaForge({ level }) {
	const recordGame = useScholar((s) => s.recordGame);
	const sound = useScholar((s) => s.sound);
	const progress = useScholar((s) => s.games["forma-forge"]);
	const items = (0, import_react.useMemo)(() => shuffle(FORMA_ITEMS).slice(0, 6), []);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [stem, setStem] = (0, import_react.useState)(null);
	const [ending, setEnding] = (0, import_react.useState)(null);
	const [points, setPoints] = (0, import_react.useState)(0);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [shields, setShields] = (0, import_react.useState)(3);
	const [done, setDone] = (0, import_react.useState)(false);
	const item = items[index];
	const stems = (0, import_react.useMemo)(() => {
		if (!item) return [];
		const others = shuffle(FORMA_ITEMS.filter((row) => row.stem !== item.stem)).slice(0, 2).map((row) => row.stem);
		return shuffle([item.stem, ...others]);
	}, [item]);
	const endings = (0, import_react.useMemo)(() => {
		if (!item) return [];
		const extra = shuffle(FORMA_DISTRACTORS.filter((end) => end !== item.ending)).slice(0, 3);
		return shuffle([item.ending, ...extra]);
	}, [item]);
	function finish(nextCorrect, nextPoints) {
		const accuracy = nextCorrect / items.length;
		const stars = accuracy >= .9 ? 3 : accuracy >= .85 ? 2 : accuracy >= .7 ? 1 : 0;
		recordGame("forma-forge", nextPoints, stars, level);
		if (sound) playComplete();
		toast("Forma Forge complete", { description: `${stars} stars · ${nextPoints} points` });
		setDone(true);
	}
	function check() {
		if (!item || !stem || !ending) return;
		const ok = stem === item.stem && ending === item.ending;
		const nextPoints = points + (ok ? 12 : 0);
		const nextCorrect = correct + (ok ? 1 : 0);
		const nextShields = ok ? shields : shields - 1;
		setPoints(nextPoints);
		setCorrect(nextCorrect);
		setShields(nextShields);
		if (sound) (ok ? playCorrect : playWrong)();
		if (!ok && nextShields <= 0) {
			finish(nextCorrect, nextPoints);
			return;
		}
		if (index + 1 >= items.length) finish(nextCorrect, nextPoints);
		else {
			setIndex((n) => n + 1);
			setStem(null);
			setEnding(null);
		}
	}
	if (done) {
		const accuracy = correct / items.length;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			title: "Forma Forge",
			points,
			stars: accuracy >= .9 ? 3 : accuracy >= .85 ? 2 : accuracy >= .7 ? 1 : 0,
			href: "/study/latin"
		});
	}
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameChrome, {
		title: "Forma Forge",
		level,
		points: progress?.points ?? 0,
		streak: progress?.streak ?? 0,
		shields,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Repair the present form."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl font-semibold",
					children: [
						item.meaning,
						" · ",
						item.person
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [item.conjugation, " conjugation"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-navy uppercase",
						children: "Stem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: stems.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							active: stem === value,
							onClick: () => setStem(value),
							label: value
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-navy uppercase",
						children: "Ending"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: endings.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							active: ending === value,
							onClick: () => setEnding(value),
							label: value
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 font-display text-2xl",
					children: [stem ?? "—", ending ?? ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: check,
					disabled: !stem || !ending,
					children: "Forge"
				})
			]
		})
	});
}
function SentenceMosaic({ level }) {
	const recordGame = useScholar((s) => s.recordGame);
	const sound = useScholar((s) => s.sound);
	const progress = useScholar((s) => s.games["sentence-mosaic"]);
	const items = (0, import_react.useMemo)(() => shuffle(MOSAIC_ITEMS).slice(0, 5), []);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [built, setBuilt] = (0, import_react.useState)([]);
	const [points, setPoints] = (0, import_react.useState)(0);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [shields, setShields] = (0, import_react.useState)(3);
	const [done, setDone] = (0, import_react.useState)(false);
	const item = items[index];
	const tray = (0, import_react.useMemo)(() => item ? shuffle(item.words) : [], [item]);
	function pick(word) {
		if (built.includes(word) && built.filter((w) => w === word).length >= item.words.filter((w) => w === word).length) return;
		setBuilt((current) => [...current, word]);
	}
	function check() {
		if (!item) return;
		const ok = built.join(" ") === item.words.join(" ");
		const nextPoints = points + (ok ? 15 : 0);
		const nextCorrect = correct + (ok ? 1 : 0);
		const nextShields = ok ? shields : shields - 1;
		setPoints(nextPoints);
		setCorrect(nextCorrect);
		setShields(nextShields);
		if (sound) (ok ? playCorrect : playWrong)();
		if (index + 1 >= items.length || nextShields <= 0) {
			const accuracy = nextCorrect / items.length;
			recordGame("sentence-mosaic", nextPoints, accuracy >= .9 ? 3 : accuracy >= .85 ? 2 : accuracy >= .7 ? 1 : 0, level);
			if (sound) playComplete();
			setDone(true);
		} else {
			setIndex((n) => n + 1);
			setBuilt([]);
		}
	}
	if (done) {
		const accuracy = correct / items.length;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			title: "Sentence Mosaic",
			points,
			stars: accuracy >= .9 ? 3 : accuracy >= .85 ? 2 : accuracy >= .7 ? 1 : 0,
			href: "/study/latin"
		});
	}
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameChrome, {
		title: "Sentence Mosaic",
		level,
		points: progress?.points ?? 0,
		streak: progress?.streak ?? 0,
		shields,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: item.english
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-bronze",
					children: item.hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 min-h-16 rounded-lg border border-dashed border-line bg-sage/40 p-3",
					children: built.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Tap tiles in order."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: built.join(" ")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: tray.map((word, i) => {
						const usedCount = built.filter((w) => w === word).length;
						const totalCount = item.words.filter((w) => w === word).length;
						if (tray.slice(0, i).filter((w) => w === word).length >= totalCount || usedCount >= totalCount) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: word,
							onClick: () => pick(word)
						}, `${word}-${i}`);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: check,
						disabled: built.length !== item.words.length,
						children: "Check sentence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setBuilt([]),
						children: "Clear"
					})]
				})
			]
		})
	});
}
function VerbumMatch({ level }) {
	const recordGame = useScholar((s) => s.recordGame);
	const sound = useScholar((s) => s.sound);
	const progress = useScholar((s) => s.games["verbum-match"]);
	const pairs = (0, import_react.useMemo)(() => {
		const unique = [];
		const usedL = /* @__PURE__ */ new Set();
		const usedR = /* @__PURE__ */ new Set();
		for (const pair of shuffle(MATCH_PAIRS)) {
			if (usedL.has(pair.left) || usedR.has(pair.right)) continue;
			usedL.add(pair.left);
			usedR.add(pair.right);
			unique.push(pair);
			if (unique.length === 6) break;
		}
		return unique;
	}, []);
	const left = (0, import_react.useMemo)(() => shuffle(pairs.map((p) => p.left)), [pairs]);
	const right = (0, import_react.useMemo)(() => shuffle(pairs.map((p) => p.right)), [pairs]);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [matched, setMatched] = (0, import_react.useState)([]);
	const [points, setPoints] = (0, import_react.useState)(0);
	const [misses, setMisses] = (0, import_react.useState)(0);
	const [shields, setShields] = (0, import_react.useState)(3);
	const [done, setDone] = (0, import_react.useState)(false);
	function choose(side, value) {
		if (matched.includes(value)) return;
		if (!selected) {
			setSelected(`${side}:${value}`);
			return;
		}
		const [fromSide, fromValue] = selected.split(":");
		if (fromSide === side) {
			setSelected(`${side}:${value}`);
			return;
		}
		const a = fromSide === "left" ? fromValue : value;
		const b = fromSide === "left" ? value : fromValue;
		if (pairs.some((pair) => pair.left === a && pair.right === b)) {
			const nextMatched = [
				...matched,
				a,
				b
			];
			setMatched(nextMatched);
			setPoints((n) => n + 10);
			setSelected(null);
			if (sound) playCorrect();
			if (nextMatched.length >= pairs.length * 2) {
				const stars = misses === 0 ? 3 : misses <= 1 ? 2 : 1;
				recordGame("verbum-match", points + 10, stars, level);
				if (sound) playComplete();
				setDone(true);
			}
		} else {
			const nextShields = shields - 1;
			setMisses((n) => n + 1);
			setShields(nextShields);
			setSelected(null);
			if (sound) playWrong();
			if (nextShields <= 0) {
				recordGame("verbum-match", points, 0, level);
				setDone(true);
			}
		}
	}
	if (done) {
		const stars = matched.length >= pairs.length * 2 ? misses === 0 ? 3 : misses <= 1 ? 2 : 1 : 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			title: "Verbum Match",
			points,
			stars,
			href: "/study/latin"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameChrome, {
		title: "Verbum Match",
		level,
		points: progress?.points ?? 0,
		streak: progress?.streak ?? 0,
		shields,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Connect meanings, forms and grammar classes."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: left.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: value,
						active: selected === `left:${value}`,
						used: matched.includes(value),
						onClick: () => choose("left", value)
					}, value))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: right.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: value,
						active: selected === `right:${value}`,
						used: matched.includes(value),
						onClick: () => choose("right", value)
					}, value))
				})]
			})]
		})
	});
}
function ManuscriptMystery({ level }) {
	const recordGame = useScholar((s) => s.recordGame);
	const sound = useScholar((s) => s.sound);
	const progress = useScholar((s) => s.games.manuscript);
	const cases = (0, import_react.useMemo)(() => MANUSCRIPT_CASES.slice(0, Math.min(6, 2 + level)), [level]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [step, setStep] = (0, import_react.useState)("blank");
	const [points, setPoints] = (0, import_react.useState)(0);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [shields, setShields] = (0, import_react.useState)(3);
	const [done, setDone] = (0, import_react.useState)(false);
	const item = cases[index];
	function answer(ok) {
		const nextPoints = points + (ok ? 12 : 0);
		const nextCorrect = correct + (ok ? 1 : 0);
		const nextShields = ok ? shields : Math.max(0, shields - 1);
		setPoints(nextPoints);
		setCorrect(nextCorrect);
		setShields(nextShields);
		if (sound) (ok ? playCorrect : playWrong)();
		if (nextShields <= 0) {
			wrap(nextCorrect, nextPoints);
			return;
		}
		if (step === "blank") setStep("inspect");
		else if (index + 1 >= cases.length) wrap(nextCorrect, nextPoints);
		else {
			setIndex((n) => n + 1);
			setStep("blank");
		}
	}
	function wrap(nextCorrect, nextPoints) {
		const accuracy = nextCorrect / (cases.length * 2);
		recordGame("manuscript", nextPoints, accuracy >= .9 ? 3 : accuracy >= .85 ? 2 : accuracy >= .7 ? 1 : 0, level);
		if (sound) playComplete();
		setDone(true);
	}
	if (done) {
		const accuracy = correct / (cases.length * 2);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
			title: "Manuscript Mystery",
			points,
			stars: accuracy >= .9 ? 3 : accuracy >= .85 ? 2 : accuracy >= .7 ? 1 : 0,
			href: "/study/latin"
		});
	}
	if (!item) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameChrome, {
		title: "Manuscript Mystery",
		level,
		points: progress?.points ?? 0,
		streak: progress?.streak ?? 0,
		shields,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-navy uppercase",
					children: item.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl leading-snug",
					children: item.passage.replace("___", "_____")
				}),
				step === "blank" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-2",
					children: item.blanks[0].choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						label: choice,
						onClick: () => answer(choice === item.blanks[0].answer)
					}, choice))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: item.inspect.question
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2",
						children: item.inspect.choices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: choice,
							onClick: () => answer(choice === item.inspect.answer)
						}, choice))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted",
					children: item.english
				})
			]
		})
	});
}
function Tile({ label, onClick, active, used }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled: used,
		onClick,
		className: `min-h-11 rounded-md border px-3 py-2 text-sm ${used ? "border-sage-2 bg-sage text-muted" : active ? "border-navy bg-navy text-card" : "border-line bg-card hover:bg-sage"}`,
		children: label
	});
}
function PlayPage() {
	const { game } = Route$3.useParams();
	const latinMeta = LATIN_GAMES.find((item) => item.id === game);
	const meta = game === PE_GAME.id ? PE_GAME : latinMeta;
	const progress = useScholar((s) => s.games[game]);
	const [level, setLevel] = (0, import_react.useState)(null);
	if (!meta) throw notFound();
	const levels = "levels" in meta ? meta.levels : 6;
	if (level) {
		if (game === PE_GAME.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeCircuit, { level });
		if (game === "forma-forge") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormaForge, { level });
		if (game === "sentence-mosaic") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentenceMosaic, { level });
		if (game === "verbum-match") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerbumMatch, { level });
		if (game === "manuscript") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManuscriptMystery, { level });
	}
	const unlocked = progress?.unlocked ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/play",
				className: "inline-flex items-center gap-2 text-sm text-muted hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Play"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
					children: meta.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold",
					children: meta.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: meta.blurb
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center gap-4 p-4 text-sm tabular-nums",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Game points ", progress?.points ?? 0] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Streak ", progress?.streak ?? 0] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Unlocked ",
						unlocked,
						"/",
						levels
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: Array.from({ length: levels }).map((_, i) => {
					const n = i + 1;
					const locked = n > unlocked;
					const stars = progress?.stars[i] ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: locked ? "secondary" : "outline",
						disabled: locked,
						onClick: () => setLevel(n),
						className: "h-16 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: game === PE_GAME.id ? `Circuit ${n}` : `Level ${n}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: locked ? "Locked" : stars ? `${stars} star${stars === 1 ? "" : "s"}` : "Play"
						})]
					}, n);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: game === PE_GAME.id ? "Complete a circuit to raise Body XP and unlock kit." : "Choose a level. Scoring uses game points and focus shields. Formal mastery is unchanged."
			})
		]
	});
}
//#endregion
export { PlayPage as component };
