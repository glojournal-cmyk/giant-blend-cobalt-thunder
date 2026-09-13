import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Dumbbell, s as Gamepad2, u as BookOpen } from "../_libs/lucide-react.mjs";
import { C as linkFromHref, _ as nextGarden, a as dueReviewCount, c as useScholar, d as nextOutfit, f as outfitById, g as levelFromXp, h as GARDEN_MILESTONES, m as statFill, o as gameSessionCount, p as scholarLine, s as nextUnlock } from "./router-JQNCs4HM.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Progress } from "./progress-BI6Z_qWx.mjs";
import { t as Badge } from "./badge-9WJrS4ux.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B9lo5-1Z.js
var import_jsx_runtime = require_jsx_runtime();
function CharacterStage({ outfitId, name, line, level }) {
	const outfit = outfitById(outfitId);
	const label = name.trim() || "Iris";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-xl bg-navy",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: outfit.art,
				alt: `${label} in ${outfit.name}`,
				className: "scholar-idle mx-auto block max-h-[min(78vh,860px)] w-full object-contain outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy via-navy/55 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 space-y-3 p-4 text-card sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.22em] text-card/70 uppercase",
						children: "Lux et Labor · Raise your scholar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-semibold leading-tight sm:text-5xl",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-card/80",
							children: [
								"Lv ",
								level,
								" · ",
								outfit.name
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/scholar",
							className: "pointer-events-auto shrink-0 rounded-full bg-card/15 px-3 py-2 text-xs font-medium tracking-wide text-card backdrop-blur-sm hover:bg-card/25",
							children: "Wardrobe"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md rounded-lg bg-navy/55 px-3 py-2.5 font-display text-lg leading-snug text-card/95 backdrop-blur-sm sm:text-xl",
						children: line
					})
				]
			})
		]
	});
}
function Home() {
	const xp = useScholar((s) => s.xp);
	const daily = useScholar((s) => s.daily);
	const name = useScholar((s) => s.displayName);
	const collectibles = useScholar((s) => s.collectibles);
	const lastSubject = useScholar((s) => s.lastSubject);
	const reviews = useScholar((s) => s.reviews);
	const latinXp = useScholar((s) => s.latinXp);
	const frenchXp = useScholar((s) => s.frenchXp);
	const bioXp = useScholar((s) => s.bioXp);
	const bodyXp = useScholar((s) => s.bodyXp);
	const games = useScholar((s) => s.games);
	const equippedOutfit = useScholar((s) => s.equippedOutfit);
	const unlockedOutfits = useScholar((s) => s.unlockedOutfits);
	const peSessions = useScholar((s) => s.peSessions);
	const studyDays = useScholar((s) => s.studyDays);
	const medals = useScholar((s) => s.medals);
	const { level, into, next } = levelFromXp(xp);
	const garden = nextGarden(xp);
	const done = daily.filter((t) => t.progress >= t.target).length;
	const unlock = nextUnlock(xp, collectibles);
	const peDone = (daily.find((t) => t.id === "pe-circuit")?.progress ?? 0) >= 1;
	const line = scholarLine({
		hour: (/* @__PURE__ */ new Date()).getHours(),
		dailyDone: done,
		dailyTotal: daily.length,
		peDone
	});
	const continueHref = lastSubject === "french" ? "/study/french" : lastSubject === "biology" ? "/study/biology" : "/study/latin";
	const due = dueReviewCount(reviews);
	const mind = latinXp + frenchXp + bioXp;
	const spark = Object.values(games).reduce((sum, game) => sum + game.points, 0);
	const upcomingOutfit = nextOutfit(unlockedOutfits, {
		xp,
		peSessions,
		studyDays: studyDays.length,
		medals: medals.length,
		gameSessions: gameSessionCount(games)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterStage, {
			outfitId: equippedOutfit,
			name,
			line,
			level
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
							children: "Scholar level"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-4xl font-semibold",
								children: ["Lv ", level]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted tabular-nums",
								children: [
									into,
									" / ",
									next,
									" XP"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							className: "mt-3",
							value: into / next * 100
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-3 gap-2 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Mind",
									value: mind
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Body",
									value: bodyXp
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Spark",
									value: spark
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							to: continueHref,
							icon: BookOpen,
							label: "Practise",
							detail: "Study"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							to: "/play/pe-circuit",
							icon: Dumbbell,
							label: "Exercise",
							detail: "PE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
							to: "/play",
							icon: Gamepad2,
							label: "Play",
							detail: "Games"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
								children: "Today"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold",
								children: "Raise her today"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "sage",
								children: [
									done,
									" / ",
									daily.length,
									" tasks"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: daily.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								...linkFromHref(task.href),
								className: "block rounded-lg p-1 hover:bg-sage",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: task.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted tabular-nums",
										children: [
											task.progress,
											"/",
											task.target
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									className: "mt-1.5",
									value: task.progress / task.target * 100
								})]
							}) }, task.id))
						}),
						due > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-bronze",
							children: [
								due,
								" due review",
								due === 1 ? "" : "s",
								" waiting in Latin."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "overflow-hidden p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[88px_1fr] sm:grid-cols-[108px_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: GARDEN_MILESTONES[garden.stage - 1].art,
							alt: garden.current.name,
							className: "h-full min-h-[108px] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
									children: "Your garden"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-xl font-semibold",
									children: [
										"Garden Stage ",
										garden.stage,
										" · ",
										garden.current.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: garden.current.copy
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/garden",
									className: "mt-2 inline-block text-sm font-medium text-navy hover:underline",
									children: "Open the garden"
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center gap-4 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: upcomingOutfit?.art ?? unlock.art,
						alt: "",
						className: "size-16 rounded-lg object-cover object-top"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
								children: "Next unlock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: upcomingOutfit?.name ?? unlock.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: upcomingOutfit?.need ?? unlock.need
							})
						]
					})]
				})
			]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-sage/70 px-2 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[11px] font-semibold tracking-[0.16em] text-navy uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "font-display text-xl font-semibold tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				className: "mt-1.5",
				value: statFill(value)
			})
		]
	});
}
function Action({ to, icon: Icon, label, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		...linkFromHref(to),
		className: "flex min-h-20 flex-col items-center justify-center gap-1 rounded-xl bg-navy px-2 py-3 text-card transition-transform duration-150 hover:bg-navy-2 active:scale-[0.96]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg leading-none",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] tracking-wide text-card/70",
				children: detail
			})
		]
	});
}
//#endregion
export { Home as component };
