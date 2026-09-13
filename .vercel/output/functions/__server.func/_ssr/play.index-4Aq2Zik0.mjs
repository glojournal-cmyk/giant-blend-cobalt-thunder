import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as LATIN_GAMES, c as useScholar } from "./router-JQNCs4HM.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as PE_GAME } from "./pe-circuit-Dpo0WKxB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play.index-4Aq2Zik0.js
var import_jsx_runtime = require_jsx_runtime();
function PlayHub() {
	const games = useScholar((s) => s.games);
	const pe = games[PE_GAME.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.22em] text-navy uppercase",
						children: "Exercise · Mini games"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-semibold",
						children: "Play"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Train Body on the quad, then sharpen Spark with Latin games. Outfits and medals unlock as you go."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/play/$game",
				params: { game: PE_GAME.id },
				className: "block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "overflow-hidden p-0 transition-colors hover:bg-sage",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-[200px_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/art/outfits/pe.jpg",
							alt: "",
							className: "h-44 w-full object-cover object-[50%_12%] sm:h-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
									children: PE_GAME.kicker
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-semibold",
									children: PE_GAME.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: PE_GAME.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-sm tabular-nums text-muted",
									children: [
										"Circuit ",
										pe?.unlocked ?? 1,
										"/",
										PE_GAME.levels,
										" · ",
										pe?.points ?? 0,
										" pts"
									]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
					children: "Latin games"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: LATIN_GAMES.map((game) => {
						const progress = games[game.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/play/$game",
							params: { game: game.id },
							className: "group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "h-full p-4 transition-colors group-hover:bg-sage",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-[0.16em] text-navy uppercase",
										children: game.kicker
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl font-semibold",
										children: game.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: game.blurb
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-xs tabular-nums text-muted",
										children: [
											"Lv ",
											progress?.unlocked ?? 1,
											"/6 · ",
											progress?.points ?? 0,
											" pts"
										]
									})
								]
							})
						}, game.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { PlayHub as component };
