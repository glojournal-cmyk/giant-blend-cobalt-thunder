import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as nextGarden, c as useScholar, g as levelFromXp, h as GARDEN_MILESTONES, v as COLLECTIBLES } from "./router-CdJR-mf5.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Progress } from "./progress-BI6Z_qWx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/garden-DoTCEIPz.js
var import_jsx_runtime = require_jsx_runtime();
function GardenPage() {
	const xp = useScholar((s) => s.xp);
	const collectibles = useScholar((s) => s.collectibles);
	const history = useScholar((s) => s.history);
	const { level } = levelFromXp(xp);
	const garden = nextGarden(xp);
	const pct = garden.upcoming ? (xp - garden.current.min) / (garden.target - garden.current.min) * 100 : 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.22em] text-navy uppercase",
					children: "Your growth world"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold",
					children: "Scholar’s Garden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "The plant follows your existing Scholar XP milestones. It does not change academic mastery or review scheduling."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "overflow-hidden p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/garden-wide.jpg",
					alt: "An English walled garden at warm evening light",
					className: "h-52 w-full object-cover sm:h-72"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 p-5 md:grid-cols-[220px_1fr] md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: garden.current.art,
						alt: garden.current.name,
						className: "aspect-[3/4] w-full rounded-lg object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tracking-[0.18em] text-navy uppercase",
							children: ["Garden stage ", garden.stage]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold",
							children: garden.current.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: garden.current.copy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm tabular-nums text-muted",
							children: [
								"Scholar level ",
								level,
								" · ",
								xp,
								" XP"
							]
						}),
						garden.upcoming && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: [
								garden.left,
								" XP until Stage ",
								garden.upcoming.stage,
								" · ",
								garden.upcoming.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							className: "mt-3",
							value: Math.min(100, pct)
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: "Growth path"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: GARDEN_MILESTONES.map((m) => {
					const locked = garden.stage < m.stage;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: locked ? "overflow-hidden p-0 opacity-60" : "overflow-hidden p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: m.art,
							alt: "",
							className: "h-40 w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tracking-[0.16em] text-navy uppercase",
									children: ["Stage ", m.stage]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl font-semibold",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: locked ? `${m.min} XP to unlock` : m.copy
								})
							]
						})]
					}, m.stage);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: "Collection"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: COLLECTIBLES.map((item) => {
					const have = collectibles.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.art,
							alt: "",
							className: `h-36 w-full object-cover ${have ? "" : "grayscale"}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: have ? item.blurb : item.need
							})]
						})]
					}, item.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Recent growth"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "What your study has grown."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2",
					children: [history.slice(0, 8).map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.detail }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								"+",
								item.xp,
								" XP"
							]
						})]
					}, `${item.at}-${index}`)), history.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "Study a little, and the first leaves will show here."
					})]
				})
			] })
		]
	});
}
//#endregion
export { GardenPage as component };
