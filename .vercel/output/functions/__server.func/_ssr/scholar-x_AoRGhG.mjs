import { i as __toESM } from "../_runtime.mjs";
import { n as cn } from "./utils-BgyUJvZ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { R as Input, c as useScholar, g as levelFromXp, l as DEFAULT_SCHOLAR_NAME, u as OUTFITS, v as COLLECTIBLES, y as MEDALS } from "./router-CdJR-mf5.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
import { t as Button } from "./button-BtPXJ6vz.mjs";
import { t as Badge } from "./badge-9WJrS4ux.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scholar-x_AoRGhG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-line transition-colors data-[state=checked]:bg-navy data-[state=unchecked]:bg-sage-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 rounded-full bg-card shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5" })
}));
Switch.displayName = Switch$1.displayName;
function ScholarPage() {
	const store = useScholar();
	const { level, into, next } = levelFromXp(store.xp);
	const [name, setName] = (0, import_react.useState)(store.displayName);
	const [tab, setTab] = (0, import_react.useState)("wardrobe");
	const shownName = store.displayName.trim() || "Iris";
	const outfit = OUTFITS.find((item) => item.id === store.equippedOutfit) ?? OUTFITS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-[0.22em] text-navy uppercase",
					children: "Your scholar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold",
					children: shownName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "Wardrobe, medals and the work that earned them."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-[240px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: outfit.art,
						alt: `${shownName} in ${outfit.name}`,
						className: "h-72 w-full object-cover object-[50%_12%] md:h-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 md:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.18em] text-navy uppercase",
								children: outfit.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold",
								children: shownName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Level ",
									level,
									" · ",
									store.xp,
									" XP · ",
									into,
									" / ",
									next,
									" to the next level"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["Mind ", store.latinXp + store.frenchXp + store.bioXp] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "sage",
										children: ["Body ", store.bodyXp]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										children: [
											store.unlockedOutfits.length,
											" / ",
											OUTFITS.length,
											" outfits"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted",
								children: [store.studyDays.length, " study days recorded in this browser."]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: tab === "wardrobe" ? "default" : "secondary",
						onClick: () => setTab("wardrobe"),
						children: "Wardrobe"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: tab === "profile" ? "default" : "secondary",
						onClick: () => setTab("profile"),
						children: "Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: tab === "settings" ? "default" : "secondary",
						onClick: () => setTab("settings"),
						children: "Settings"
					})
				]
			}),
			tab === "wardrobe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: OUTFITS.map((item) => {
					const have = store.unlockedOutfits.includes(item.id);
					const equipped = store.equippedOutfit === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: !have,
						onClick: () => store.equipOutfit(item.id),
						className: cn("overflow-hidden rounded-xl bg-card text-left shadow-[var(--shadow-border)] transition-transform duration-150 active:scale-[0.98]", have ? "hover:bg-sage" : "opacity-70", equipped && "ring-2 ring-navy"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.art,
							alt: "",
							className: cn("h-56 w-full object-cover object-[50%_12%]", !have && "grayscale")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: item.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: have ? item.blurb : item.need
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium tracking-wide text-navy uppercase",
									children: equipped ? "Wearing" : have ? "Tap to wear" : "Locked"
								})
							]
						})]
					}, item.id);
				})
			}) : tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-semibold",
								children: "Scholar’s name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Stored only in this browser. Changing it does not alter mastery, XP or revision history."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: DEFAULT_SCHOLAR_NAME,
										maxLength: 32
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => store.setName(name.trim()),
										children: "Save name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										onClick: () => {
											setName("");
											store.setName("");
										},
										children: "Clear"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-semibold",
							children: "Medals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: MEDALS.map((medal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start justify-between gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: medal.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-muted",
									children: medal.blurb
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: store.medals.includes(medal.id) ? "default" : "outline",
									children: store.medals.includes(medal.id) ? "Earned" : "Locked"
								})]
							}, medal.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-semibold",
							children: "Collection"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-3",
							children: COLLECTIBLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-lg bg-sage/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.art,
									alt: "",
									className: `h-32 w-full object-cover ${store.collectibles.includes(item.id) ? "" : "grayscale"}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: store.collectibles.includes(item.id) ? item.blurb : item.need
									})]
								})]
							}, item.id))
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-semibold",
						children: "App preferences"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: "Sound"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Short chimes on answers and completed sessions."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: store.sound,
							onCheckedChange: store.setSound
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "This garden lives in your browser. Clearing site data will reset XP, reviews, outfits and the plant."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => store.resetAll(),
						children: "Reset local progress"
					})
				]
			})
		]
	});
}
//#endregion
export { ScholarPage as component };
