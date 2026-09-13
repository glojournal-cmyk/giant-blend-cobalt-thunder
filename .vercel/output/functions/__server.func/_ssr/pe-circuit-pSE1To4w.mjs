import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-BgyUJvZ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as playWrong, b as playComplete, c as useScholar, f as outfitById, x as playCorrect } from "./router-CdJR-mf5.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Button } from "./button-BtPXJ6vz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pe-circuit-pSE1To4w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PE_GAME = {
	id: "pe-circuit",
	name: "Quad Circuit",
	kicker: "PE",
	blurb: "Catch, remember, keep time. Raises Body, and unlocks kit.",
	levels: 3
};
var HOUSE = [
	{
		id: "navy",
		label: "Navy",
		className: "bg-navy text-card"
	},
	{
		id: "leaf",
		label: "Leaf",
		className: "bg-leaf text-card"
	},
	{
		id: "bronze",
		label: "Bronze",
		className: "bg-bronze text-card"
	},
	{
		id: "sage",
		label: "Sage",
		className: "bg-sage-2 text-ink"
	}
];
function announce(unlocked) {
	for (const id of unlocked) if (id.startsWith("outfit:")) {
		const outfit = outfitById(id.slice(7));
		toast("Outfit unlocked", { description: outfit.name });
	}
}
function PeCircuit({ level }) {
	const recordPe = useScholar((s) => s.recordPe);
	const sound = useScholar((s) => s.sound);
	const [station, setStation] = (0, import_react.useState)(0);
	const [scores, setScores] = (0, import_react.useState)([]);
	const finishStation = (score) => {
		const next = [...scores, score];
		setScores(next);
		if (station === 3) {
			const avg = Math.round(next.reduce((a, b) => a + b, 0) / next.length);
			const stars = avg >= 88 ? 3 : avg >= 68 ? 2 : avg >= 40 ? 1 : 0;
			const points = 40 + avg + level * 8;
			const result = recordPe(points, stars, level);
			if (sound) playComplete();
			announce(result.unlocked);
			toast("Circuit complete", { description: `${stars} star${stars === 1 ? "" : "s"} · ${result.awarded} XP` });
			setStation(4);
			return;
		}
		setStation((s) => s + 1);
	};
	if (station === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { level }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/outfits/pe.jpg",
				alt: "",
				className: "h-44 w-full object-cover object-[50%_18%]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Three stations on the quad: catch, remember, keep time. Accuracy raises Body XP and can unlock the PE kit."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: () => setStation(1),
					children: "Take your mark"
				})]
			})]
		})]
	});
	if (station === 4) {
		const avg = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
		const stars = avg >= 88 ? 3 : avg >= 68 ? 2 : avg >= 40 ? 1 : 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { level }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-navy uppercase",
						children: "Circuit complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "Back to the changing rooms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							"Catch ",
							scores[0] ?? 0,
							" · Memory ",
							scores[1] ?? 0,
							" · Cadence ",
							scores[2] ?? 0,
							". Average ",
							avg,
							". ",
							stars,
							" star",
							stars === 1 ? "" : "s",
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "See your scholar"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/play",
								children: "More play"
							})
						})]
					})
				]
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { level }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
				children: [
					"Station ",
					station,
					" of 3"
				]
			}),
			station === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatchStation, {
				level,
				onDone: finishStation,
				sound
			}),
			station === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryStation, {
				level,
				onDone: finishStation,
				sound
			}),
			station === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CadenceStation, {
				level,
				onDone: finishStation,
				sound
			})
		]
	});
}
function Header({ level }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
		children: "PE · Quad circuit"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
		className: "font-display text-3xl font-semibold",
		children: ["Circuit ", level]
	})] });
}
function CatchStation({ level, onDone, sound }) {
	const total = 4 + level;
	const [round, setRound] = (0, import_react.useState)(0);
	const [hits, setHits] = (0, import_react.useState)(0);
	const [ballY, setBallY] = (0, import_react.useState)(-12);
	const [live, setLive] = (0, import_react.useState)(false);
	const yRef = (0, import_react.useRef)(-12);
	const running = (0, import_react.useRef)(false);
	const raf = (0, import_react.useRef)(0);
	const start = (0, import_react.useRef)(0);
	const duration = (0, import_react.useRef)(1400);
	const tapped = (0, import_react.useRef)(false);
	const hitsRef = (0, import_react.useRef)(0);
	const roundRef = (0, import_react.useRef)(0);
	const ZONE_TOP = 66;
	const ZONE_BOT = 86;
	const endRound = (hit) => {
		if (!running.current) return;
		running.current = false;
		cancelAnimationFrame(raf.current);
		if (hit) {
			hitsRef.current += 1;
			setHits(hitsRef.current);
			if (sound) playCorrect();
		} else if (sound) playWrong();
		const nextRound = roundRef.current + 1;
		roundRef.current = nextRound;
		setRound(nextRound);
		setLive(false);
		setBallY(-12);
		yRef.current = -12;
		if (nextRound >= total) {
			onDone(Math.round(hitsRef.current / total * 100));
			return;
		}
		window.setTimeout(() => launch(), 380);
	};
	const launch = () => {
		cancelAnimationFrame(raf.current);
		tapped.current = false;
		running.current = true;
		duration.current = Math.max(620, 1500 - level * 140 - roundRef.current * 70);
		start.current = performance.now();
		setLive(true);
		const loop = (now) => {
			const t = Math.min(1, (now - start.current) / duration.current);
			const y = t * 112;
			yRef.current = y;
			setBallY(y);
			if (t >= 1) {
				endRound(false);
				return;
			}
			raf.current = requestAnimationFrame(loop);
		};
		raf.current = requestAnimationFrame(loop);
	};
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => launch(), 500);
		return () => {
			window.clearTimeout(t);
			cancelAnimationFrame(raf.current);
			running.current = false;
		};
	}, []);
	const tryCatch = () => {
		if (!running.current || tapped.current) return;
		tapped.current = true;
		const y = yRef.current;
		endRound(y >= ZONE_TOP && y <= ZONE_BOT);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 py-3 text-sm tabular-nums",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Catch ",
				Math.min(round + (live ? 1 : 0), total),
				" / ",
				total
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: [hits, " clean"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: tryCatch,
			className: "relative block h-[320px] w-full touch-manipulation bg-navy text-left",
			"aria-label": "Tap when the ball is in the catch band",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bg-leaf/35",
					style: {
						top: `${ZONE_TOP}%`,
						height: `20%`
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute top-3 left-3 text-xs tracking-[0.16em] text-card/70 uppercase",
					children: "Catch band"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-1/2 size-11 -translate-x-1/2 rounded-full bg-card shadow-[0_8px_16px_rgba(0,0,0,0.25)]",
					style: {
						top: `${ballY}%`,
						marginTop: "-22px"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-x-0 bottom-3 text-center text-sm text-card/80",
					children: "Tap when the ball is in the band"
				})
			]
		})]
	});
}
function MemoryStation({ level, onDone, sound }) {
	const rounds = 3 + level;
	const sequence = (0, import_react.useMemo)(() => {
		const out = [];
		let seed = 17 + level * 9;
		for (let i = 0; i < rounds; i++) {
			seed = seed * 1103515245 + 12345 >>> 0;
			out.push(seed % 4);
		}
		return out;
	}, [level, rounds]);
	const [shown, setShown] = (0, import_react.useState)(-1);
	const [lit, setLit] = (0, import_react.useState)(null);
	const [input, setInput] = (0, import_react.useState)([]);
	const [locked, setLocked] = (0, import_react.useState)(true);
	const [hits, setHits] = (0, import_react.useState)(0);
	const playing = (0, import_react.useRef)(false);
	const playSeq = async (count) => {
		playing.current = true;
		setLocked(true);
		setInput([]);
		for (let i = 0; i < count; i++) {
			await wait(280);
			setLit(sequence[i]);
			if (sound) playCorrect();
			await wait(420);
			setLit(null);
		}
		playing.current = false;
		setLocked(false);
	};
	(0, import_react.useEffect)(() => {
		playSeq(1);
	}, []);
	const press = (index) => {
		if (locked || playing.current) return;
		const next = [...input, index];
		setInput(next);
		setLit(index);
		window.setTimeout(() => setLit(null), 160);
		if (index !== sequence[next.length - 1]) {
			if (sound) playWrong();
			onDone(Math.round(hits / rounds * 100));
			return;
		}
		const needed = shown === -1 ? 1 : shown + 1;
		if (next.length === needed) {
			const roundNow = needed;
			const newHits = hits + 1;
			setHits(newHits);
			setLocked(true);
			if (sound) playCorrect();
			if (roundNow >= rounds) {
				onDone(100);
				return;
			}
			setShown(roundNow);
			window.setTimeout(() => void playSeq(roundNow + 1), 500);
		}
	};
	const roundNow = shown === -1 ? 1 : Math.min(shown + 1, rounds);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between text-sm tabular-nums",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"House memory ",
				roundNow,
				" / ",
				rounds
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: locked ? "Watch" : "Repeat"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2",
			children: HOUSE.map((house, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: locked,
				onClick: () => press(index),
				className: cn("min-h-24 rounded-lg text-sm font-semibold tracking-wide uppercase transition-transform duration-150 active:scale-[0.96]", house.className, lit === index ? "ring-4 ring-card ring-offset-2 ring-offset-paper" : "opacity-90", locked && "cursor-default"),
				children: house.label
			}, house.id))
		})]
	});
}
function CadenceStation({ level, onDone, sound }) {
	const beats = 6 + level * 2;
	const interval = 60 / (76 + level * 10);
	const [count, setCount] = (0, import_react.useState)(0);
	const [pulse, setPulse] = (0, import_react.useState)(1);
	const [started, setStarted] = (0, import_react.useState)(false);
	const errors = (0, import_react.useRef)([]);
	const beatAt = (0, import_react.useRef)(0);
	const beatIndex = (0, import_react.useRef)(0);
	const raf = (0, import_react.useRef)(0);
	const done = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		beatAt.current = performance.now() + 400;
		beatIndex.current = 0;
		const loop = (now) => {
			if (done.current) return;
			const until = beatAt.current - now;
			const phase = 1 - Math.min(1, Math.max(0, until / interval));
			setPulse(.92 + Math.sin(phase * Math.PI) * .1);
			if (now >= beatAt.current + interval * .48 && beatIndex.current < beats) {
				const missedFor = beatIndex.current;
				if (errors.current.length === missedFor) {
					errors.current.push(1);
					if (sound) playWrong();
					beatIndex.current += 1;
					beatAt.current += interval;
					setCount(beatIndex.current);
					if (beatIndex.current >= beats) {
						finish();
						return;
					}
				}
			}
			raf.current = requestAnimationFrame(loop);
		};
		raf.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf.current);
	}, [started]);
	const finish = () => {
		if (done.current) return;
		done.current = true;
		cancelAnimationFrame(raf.current);
		const acc = errors.current.reduce((s, e) => s + (1 - e), 0);
		onDone(Math.round(acc / beats * 100));
	};
	const tap = () => {
		if (!started) {
			setStarted(true);
			return;
		}
		if (done.current || beatIndex.current >= beats) return;
		const now = performance.now();
		const delta = Math.abs(now - beatAt.current) / interval;
		const err = Math.min(1, delta);
		errors.current.push(err);
		if (err < .28) {
			if (sound) playCorrect();
		} else if (sound) playWrong();
		beatIndex.current += 1;
		beatAt.current += interval;
		setCount(beatIndex.current);
		if (beatIndex.current >= beats) finish();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col items-center gap-4 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tabular-nums text-muted",
				children: started ? `Beat ${Math.min(count + 1, beats)} / ${beats}` : "Tap to start the metronome"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: tap,
				className: "grid size-36 place-items-center rounded-full bg-navy text-card transition-transform duration-75 active:scale-[0.96]",
				style: { transform: `scale(${pulse})` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl",
					children: started ? "Tap" : "Start"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: "Tap on the pulse. Closer to the beat scores higher."
			})
		]
	});
}
function wait(ms) {
	return new Promise((resolve) => window.setTimeout(resolve, ms));
}
//#endregion
export { PeCircuit as n, PE_GAME as t };
