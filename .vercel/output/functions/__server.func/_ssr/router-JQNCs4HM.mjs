import { i as __toESM } from "../_runtime.mjs";
import { n as cn, s as todayKey, t as addDays } from "./utils-BgyUJvZ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Landmark, i as Search, n as UserRound, o as House, r as TriangleAlert, s as Gamepad2, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogPortal$1, i as DialogOverlay$1, n as DialogClose, o as DialogTitle$1, r as DialogContent$1, s as DialogTrigger$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-JQNCs4HM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-navy/40 data-[state=open]:animate-in data-[state=closed]:animate-out", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-[12%] z-50 w-[min(560px,calc(100%-1.5rem))] -translate-x-1/2 rounded-xl bg-card p-5 text-ink shadow-[var(--shadow-border)]", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-md p-2 text-muted hover:bg-sage hover:text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-2xl font-semibold", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md border border-line bg-card px-3 py-2 text-base text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var BIO_TOPICS = [
	{
		id: "cells",
		name: "Cells",
		blurb: "Animal and plant cells, organelles, specialised cells."
	},
	{
		id: "photo",
		name: "Photosynthesis",
		blurb: "Word equation, leaf adaptations, factors."
	},
	{
		id: "digest",
		name: "Digestion",
		blurb: "The digestive system, enzymes, absorption."
	},
	{
		id: "respire",
		name: "Respiration",
		blurb: "Aerobic and anaerobic respiration."
	},
	{
		id: "eco",
		name: "Ecosystems",
		blurb: "Food chains, interdependence, sampling."
	}
];
var BIO_QUESTIONS = [
	{
		id: "b1",
		topic: "cells",
		prompt: "Which organelle controls the cell and contains DNA?",
		answer: "nucleus",
		accepted: ["nucleus", "the nucleus"],
		choices: [
			"nucleus",
			"mitochondrion",
			"ribosome",
			"vacuole"
		],
		explain: "The nucleus holds genetic material and controls cell activities."
	},
	{
		id: "b2",
		topic: "cells",
		prompt: "Which organelle is the site of aerobic respiration?",
		answer: "mitochondria",
		accepted: [
			"mitochondria",
			"mitochondrion",
			"the mitochondria"
		],
		choices: [
			"chloroplast",
			"nucleus",
			"mitochondria",
			"cell wall"
		],
		explain: "Mitochondria release energy from glucose by aerobic respiration."
	},
	{
		id: "b3",
		topic: "cells",
		prompt: "Which feature is found in plant cells but not animal cells?",
		answer: "cell wall",
		accepted: [
			"cell wall",
			"a cell wall",
			"cellulose cell wall",
			"chloroplast",
			"chloroplasts",
			"permanent vacuole"
		],
		choices: [
			"nucleus",
			"cell membrane",
			"mitochondria",
			"cell wall"
		],
		explain: "Plant cells have a cellulose cell wall, chloroplasts, and a permanent vacuole."
	},
	{
		id: "b4",
		topic: "cells",
		prompt: "What is the function of the cell membrane?",
		answer: "controls what enters and leaves the cell",
		accepted: [
			"controls what enters and leaves the cell",
			"controls what goes in and out",
			"partially permeable barrier",
			"controls entry and exit of substances"
		],
		choices: [
			"controls what enters and leaves the cell",
			"makes glucose",
			"stores DNA",
			"gives the cell its rigid shape"
		],
		explain: "The membrane is partially permeable and controls transport of substances."
	},
	{
		id: "b5",
		topic: "photo",
		prompt: "What is the word equation for photosynthesis?",
		answer: "carbon dioxide + water → glucose + oxygen",
		accepted: [
			"carbon dioxide + water → glucose + oxygen",
			"carbon dioxide + water -> glucose + oxygen",
			"co2 + h2o → glucose + oxygen"
		],
		choices: [
			"carbon dioxide + water → glucose + oxygen",
			"glucose + oxygen → carbon dioxide + water",
			"oxygen + water → glucose + carbon dioxide",
			"nitrogen + water → protein + oxygen"
		],
		explain: "Photosynthesis uses light energy to convert CO₂ and water into glucose and oxygen."
	},
	{
		id: "b6",
		topic: "photo",
		prompt: "Where in a plant cell does photosynthesis happen?",
		answer: "chloroplasts",
		accepted: [
			"chloroplasts",
			"chloroplast",
			"in the chloroplasts"
		],
		choices: [
			"mitochondria",
			"nucleus",
			"chloroplasts",
			"ribosomes"
		],
		explain: "Chloroplasts contain chlorophyll, which absorbs light."
	},
	{
		id: "b7",
		topic: "photo",
		prompt: "Which factor does not limit the rate of photosynthesis?",
		answer: "soil colour",
		accepted: ["soil colour", "soil color"],
		choices: [
			"light intensity",
			"carbon dioxide concentration",
			"temperature",
			"soil colour"
		],
		explain: "Light, CO₂ and temperature are the classic limiting factors."
	},
	{
		id: "b8",
		topic: "digest",
		prompt: "Which enzyme breaks down starch into sugars?",
		answer: "amylase",
		accepted: [
			"amylase",
			"carbohydrase",
			"carbohydrases"
		],
		choices: [
			"amylase",
			"protease",
			"lipase",
			"catalase"
		],
		explain: "Amylase (a carbohydrase) is in saliva and pancreatic juice."
	},
	{
		id: "b9",
		topic: "digest",
		prompt: "Where is digested food absorbed into the blood?",
		answer: "small intestine",
		accepted: [
			"small intestine",
			"the small intestine",
			"ileum"
		],
		choices: [
			"stomach",
			"large intestine",
			"small intestine",
			"oesophagus"
		],
		explain: "Villi in the small intestine give a large surface area for absorption."
	},
	{
		id: "b10",
		topic: "digest",
		prompt: "What is the role of bile in digestion?",
		answer: "emulsifies fats",
		accepted: [
			"emulsifies fats",
			"emulsify fats",
			"breaks fats into droplets",
			"neutralises stomach acid"
		],
		choices: [
			"digests protein",
			"emulsifies fats",
			"absorbs water",
			"kills bacteria only"
		],
		explain: "Bile emulsifies fats (larger surface area) and helps neutralise stomach acid."
	},
	{
		id: "b11",
		topic: "respire",
		prompt: "What is the word equation for aerobic respiration?",
		answer: "glucose + oxygen → carbon dioxide + water",
		accepted: ["glucose + oxygen → carbon dioxide + water", "glucose + oxygen -> carbon dioxide + water"],
		choices: [
			"glucose + oxygen → carbon dioxide + water",
			"carbon dioxide + water → glucose + oxygen",
			"glucose → lactic acid",
			"protein + oxygen → urea"
		],
		explain: "Aerobic respiration releases energy from glucose using oxygen."
	},
	{
		id: "b12",
		topic: "respire",
		prompt: "Anaerobic respiration in human muscle produces:",
		answer: "lactic acid",
		accepted: ["lactic acid", "lactate"],
		choices: [
			"alcohol",
			"lactic acid",
			"oxygen",
			"starch"
		],
		explain: "In mammals: glucose → lactic acid. Yeast instead makes ethanol + CO₂."
	},
	{
		id: "b13",
		topic: "eco",
		prompt: "In a food chain, arrows show:",
		answer: "the direction of energy flow",
		accepted: [
			"the direction of energy flow",
			"energy flow",
			"where energy goes",
			"transfer of energy"
		],
		choices: [
			"the direction of energy flow",
			"which animal is larger",
			"who lives longest",
			"the direction animals walk"
		],
		explain: "Arrows point from food to feeder: grass → rabbit → fox."
	},
	{
		id: "b14",
		topic: "eco",
		prompt: "A producer in a food chain is usually:",
		answer: "a green plant",
		accepted: [
			"a green plant",
			"plant",
			"plants",
			"producer",
			"a plant"
		],
		choices: [
			"a green plant",
			"a fox",
			"a fungus only",
			"a decomposing fox"
		],
		explain: "Producers make their own food by photosynthesis."
	},
	{
		id: "b15",
		topic: "eco",
		prompt: "Why are food chains usually short?",
		answer: "energy is lost at each trophic level",
		accepted: [
			"energy is lost at each trophic level",
			"energy is lost",
			"not enough energy is passed on",
			"energy decreases along the chain"
		],
		choices: [
			"energy is lost at each trophic level",
			"animals refuse to eat each other",
			"there are not enough plants",
			"predators cannot run"
		],
		explain: "Only about 10% of energy is passed on; the rest is lost as heat, waste and movement."
	}
];
var FRENCH_VOCAB = [
	{
		id: "fv1",
		french: "bonjour",
		english: "hello / good morning",
		topic: "Greetings",
		section: 1,
		spelling: true
	},
	{
		id: "fv2",
		french: "au revoir",
		english: "goodbye",
		topic: "Greetings",
		section: 1,
		spelling: true
	},
	{
		id: "fv3",
		french: "merci",
		english: "thank you",
		topic: "Greetings",
		section: 1,
		spelling: true
	},
	{
		id: "fv4",
		french: "s'il vous plaît",
		english: "please (formal)",
		topic: "Greetings",
		section: 1,
		spelling: true
	},
	{
		id: "fv5",
		french: "s'il te plaît",
		english: "please (informal)",
		topic: "Greetings",
		section: 1,
		spelling: true
	},
	{
		id: "fv6",
		french: "comment tu t'appelles ?",
		english: "what is your name?",
		topic: "Greetings",
		section: 1,
		spelling: false
	},
	{
		id: "fv7",
		french: "je m'appelle",
		english: "my name is",
		topic: "Greetings",
		section: 1,
		spelling: true
	},
	{
		id: "fv8",
		french: "la mère",
		english: "the mother",
		topic: "Family",
		section: 2,
		spelling: true
	},
	{
		id: "fv9",
		french: "le père",
		english: "the father",
		topic: "Family",
		section: 2,
		spelling: true
	},
	{
		id: "fv10",
		french: "le frère",
		english: "the brother",
		topic: "Family",
		section: 2,
		spelling: true
	},
	{
		id: "fv11",
		french: "la sœur",
		english: "the sister",
		topic: "Family",
		section: 2,
		spelling: true
	},
	{
		id: "fv12",
		french: "la famille",
		english: "the family",
		topic: "Family",
		section: 2,
		spelling: true
	},
	{
		id: "fv13",
		french: "l'école",
		english: "the school",
		topic: "School",
		section: 3,
		spelling: true
	},
	{
		id: "fv14",
		french: "le livre",
		english: "the book",
		topic: "School",
		section: 3,
		spelling: true
	},
	{
		id: "fv15",
		french: "le professeur",
		english: "the teacher",
		topic: "School",
		section: 3,
		spelling: true
	},
	{
		id: "fv16",
		french: "un cahier",
		english: "an exercise book",
		topic: "School",
		section: 3,
		spelling: true
	},
	{
		id: "fv17",
		french: "j'aime",
		english: "I like",
		topic: "Opinions",
		section: 4,
		spelling: true
	},
	{
		id: "fv18",
		french: "je n'aime pas",
		english: "I don't like",
		topic: "Opinions",
		section: 4,
		spelling: true
	},
	{
		id: "fv19",
		french: "parce que",
		english: "because",
		topic: "Opinions",
		section: 4,
		spelling: true
	},
	{
		id: "fv20",
		french: "intéressant",
		english: "interesting",
		topic: "Opinions",
		section: 4,
		spelling: true
	},
	{
		id: "fv21",
		french: "ennuyeux",
		english: "boring",
		topic: "Opinions",
		section: 4,
		spelling: true
	},
	{
		id: "fv22",
		french: "être",
		english: "to be",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv23",
		french: "avoir",
		english: "to have",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv24",
		french: "aller",
		english: "to go",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv25",
		french: "faire",
		english: "to do / to make",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv26",
		french: "je suis",
		english: "I am",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv27",
		french: "j'ai",
		english: "I have",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv28",
		french: "je vais",
		english: "I go / I am going",
		topic: "Verbs",
		section: 5,
		spelling: true
	},
	{
		id: "fv29",
		french: "lundi",
		english: "Monday",
		topic: "Time",
		section: 6,
		spelling: true
	},
	{
		id: "fv30",
		french: "aujourd'hui",
		english: "today",
		topic: "Time",
		section: 6,
		spelling: true
	},
	{
		id: "fv31",
		french: "demain",
		english: "tomorrow",
		topic: "Time",
		section: 6,
		spelling: true
	},
	{
		id: "fv32",
		french: "le week-end",
		english: "the weekend",
		topic: "Time",
		section: 6,
		spelling: true
	}
];
var FRENCH_QUESTIONS = [
	{
		id: "fq1",
		prompt: "What does bonjour mean?",
		answer: "hello",
		accepted: [
			"hello",
			"good morning",
			"good day",
			"hello / good morning"
		],
		choices: [
			"hello",
			"goodbye",
			"please",
			"thank you"
		],
		explain: "bonjour is the standard daytime greeting.",
		topic: "Greetings"
	},
	{
		id: "fq2",
		prompt: "How do you say ‘thank you’ in French?",
		answer: "merci",
		accepted: ["merci"],
		choices: [
			"merci",
			"bonjour",
			"au revoir",
			"salut"
		],
		explain: "merci = thank you. merci beaucoup = thank you very much.",
		topic: "Greetings"
	},
	{
		id: "fq3",
		prompt: "la sœur means:",
		answer: "the sister",
		accepted: ["the sister", "sister"],
		choices: [
			"the mother",
			"the sister",
			"the daughter",
			"the aunt"
		],
		explain: "Watch the œ in sœur — it is not soeur without the ligature in careful spelling, but soeur is also accepted in many exams.",
		topic: "Family"
	},
	{
		id: "fq4",
		prompt: "What is the French for ‘the father’?",
		answer: "le père",
		accepted: [
			"le père",
			"le pere",
			"père"
		],
		choices: [
			"le père",
			"la mère",
			"le frère",
			"le fils"
		],
		explain: "père takes a grave accent on the first e.",
		topic: "Family"
	},
	{
		id: "fq5",
		prompt: "je m'appelle is used to say:",
		answer: "my name is",
		accepted: [
			"my name is",
			"i am called",
			"i'm called"
		],
		choices: [
			"my name is",
			"I am",
			"I live",
			"I like"
		],
		explain: "s'appeler = to be called. je m'appelle Sam.",
		topic: "Greetings"
	},
	{
		id: "fq6",
		prompt: "Which verb means ‘to go’?",
		answer: "aller",
		accepted: ["aller"],
		choices: [
			"être",
			"avoir",
			"aller",
			"faire"
		],
		explain: "aller is irregular: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont.",
		topic: "Verbs"
	},
	{
		id: "fq7",
		prompt: "je n'aime pas means:",
		answer: "I don't like",
		accepted: [
			"i don't like",
			"i do not like",
			"i dislike"
		],
		choices: [
			"I like",
			"I love",
			"I don't like",
			"I prefer"
		],
		explain: "ne … pas around the verb makes a negative. j'aime → je n'aime pas.",
		topic: "Opinions"
	},
	{
		id: "fq8",
		prompt: "parce que means:",
		answer: "because",
		accepted: ["because"],
		choices: [
			"but",
			"because",
			"and",
			"so"
		],
		explain: "Use parce que to justify an opinion: J'aime le français parce que c'est intéressant.",
		topic: "Opinions"
	},
	{
		id: "fq9",
		prompt: "Which is ‘I have’?",
		answer: "j'ai",
		accepted: [
			"j'ai",
			"j ai",
			"jai"
		],
		choices: [
			"je suis",
			"j'ai",
			"je vais",
			"je fais"
		],
		explain: "avoir: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.",
		topic: "Verbs"
	},
	{
		id: "fq10",
		prompt: "aujourd'hui means:",
		answer: "today",
		accepted: ["today"],
		choices: [
			"yesterday",
			"today",
			"tomorrow",
			"tonight"
		],
		explain: "aujourd'hui = today. demain = tomorrow. hier = yesterday.",
		topic: "Time"
	},
	{
		id: "fq11",
		prompt: "l'école means:",
		answer: "the school",
		accepted: ["the school", "school"],
		choices: [
			"the book",
			"the school",
			"the teacher",
			"the lesson"
		],
		explain: "école is feminine; elision gives l'école.",
		topic: "School"
	},
	{
		id: "fq12",
		prompt: "How do you say ‘I am’?",
		answer: "je suis",
		accepted: ["je suis"],
		choices: [
			"j'ai",
			"je suis",
			"je vais",
			"je fais"
		],
		explain: "être: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.",
		topic: "Verbs"
	}
];
var FRENCH_WRITING = [
	{
		id: "w1",
		title: "Introduce yourself",
		prompt: "Write 3–4 sentences presenting yourself: name, age, family, and one thing you like.",
		sentences: 3,
		requirements: [
			"Use je m'appelle",
			"Give an age with j'ai … ans",
			"Mention family or a friend",
			"Include j'aime or je n'aime pas"
		],
		model: "Je m'appelle Sam et j'ai treize ans. J'habite avec ma mère et mon frère. J'aime le français parce que c'est intéressant."
	},
	{
		id: "w2",
		title: "A day at school",
		prompt: "Describe your school day in 3–4 sentences. Mention a subject, an opinion, and when.",
		sentences: 3,
		requirements: [
			"Name at least one school subject",
			"Give an opinion with parce que",
			"Use a time word (aujourd'hui, lundi, le week-end)"
		],
		model: "Aujourd'hui j'ai français et sciences. J'aime le français parce que le professeur est sympa. Je n'aime pas les maths parce que c'est difficile."
	},
	{
		id: "w3",
		title: "Weekend plans",
		prompt: "Say what you are going to do this weekend using aller + infinitive.",
		sentences: 3,
		requirements: [
			"Use je vais at least once",
			"Mention a place or activity",
			"Use le week-end or demain"
		],
		model: "Le week-end, je vais au parc avec mon frère. Demain je vais faire mes devoirs. Ensuite je vais regarder un film."
	}
];
var LATIN_VOCAB = [
	{
		id: "v-amo",
		latin: "amō",
		english: "I love",
		topic: "Verbs",
		extra: ["i love", "love"]
	},
	{
		id: "v-porto",
		latin: "portō",
		english: "I carry",
		topic: "Verbs",
		extra: ["i carry", "carry"]
	},
	{
		id: "v-laudo",
		latin: "laudō",
		english: "I praise",
		topic: "Verbs",
		extra: ["i praise", "praise"]
	},
	{
		id: "v-specto",
		latin: "spectō",
		english: "I watch",
		topic: "Verbs",
		extra: [
			"i watch",
			"watch",
			"i look at"
		]
	},
	{
		id: "v-do",
		latin: "dō",
		english: "I give",
		topic: "Verbs",
		extra: ["i give", "give"]
	},
	{
		id: "v-video",
		latin: "videō",
		english: "I see",
		topic: "Verbs",
		extra: ["i see", "see"]
	},
	{
		id: "v-duco",
		latin: "dūcō",
		english: "I lead",
		topic: "Verbs",
		extra: ["i lead", "lead"]
	},
	{
		id: "v-scribo",
		latin: "scrībō",
		english: "I write",
		topic: "Verbs",
		extra: ["i write", "write"]
	},
	{
		id: "v-lego",
		latin: "legō",
		english: "I read",
		topic: "Verbs",
		extra: [
			"i read",
			"read",
			"i choose"
		]
	},
	{
		id: "v-sum",
		latin: "sum",
		english: "I am",
		topic: "Verbs",
		extra: ["i am", "am"]
	},
	{
		id: "v-est",
		latin: "est",
		english: "he/she/it is",
		topic: "Verbs",
		extra: [
			"is",
			"he is",
			"she is",
			"it is"
		]
	},
	{
		id: "v-sunt",
		latin: "sunt",
		english: "they are",
		topic: "Verbs",
		extra: ["they are", "are"]
	},
	{
		id: "n-puella",
		latin: "puella",
		english: "girl",
		topic: "Nouns"
	},
	{
		id: "n-puer",
		latin: "puer",
		english: "boy",
		topic: "Nouns"
	},
	{
		id: "n-hortus",
		latin: "hortus",
		english: "garden",
		topic: "Nouns"
	},
	{
		id: "n-liber",
		latin: "liber",
		english: "book",
		topic: "Nouns"
	},
	{
		id: "n-canis",
		latin: "canis",
		english: "dog",
		topic: "Nouns"
	},
	{
		id: "n-mater",
		latin: "māter",
		english: "mother",
		topic: "Nouns"
	},
	{
		id: "n-pater",
		latin: "pater",
		english: "father",
		topic: "Nouns"
	},
	{
		id: "n-domus",
		latin: "domus",
		english: "house",
		topic: "Nouns",
		extra: ["home", "house"]
	},
	{
		id: "n-amicus",
		latin: "amīcus",
		english: "friend",
		topic: "Nouns"
	},
	{
		id: "n-epistula",
		latin: "epistula",
		english: "letter",
		topic: "Nouns"
	},
	{
		id: "n-cibus",
		latin: "cibus",
		english: "food",
		topic: "Nouns"
	},
	{
		id: "n-via",
		latin: "via",
		english: "road",
		topic: "Nouns",
		extra: [
			"street",
			"way",
			"road"
		]
	},
	{
		id: "n-villa",
		latin: "vīlla",
		english: "house / country estate",
		topic: "Nouns",
		extra: [
			"house",
			"villa",
			"country house"
		]
	},
	{
		id: "n-servus",
		latin: "servus",
		english: "slave",
		topic: "Nouns"
	},
	{
		id: "n-filius",
		latin: "fīlius",
		english: "son",
		topic: "Nouns"
	},
	{
		id: "n-filia",
		latin: "fīlia",
		english: "daughter",
		topic: "Nouns"
	},
	{
		id: "n-aqua",
		latin: "aqua",
		english: "water",
		topic: "Nouns"
	},
	{
		id: "n-urbs",
		latin: "urbs",
		english: "city",
		topic: "Nouns"
	},
	{
		id: "p-in",
		latin: "in",
		english: "in / on / into",
		topic: "Prepositions",
		extra: [
			"in",
			"on",
			"into"
		]
	},
	{
		id: "p-ad",
		latin: "ad",
		english: "to / towards",
		topic: "Prepositions",
		extra: ["to", "towards"]
	},
	{
		id: "p-cum",
		latin: "cum",
		english: "with",
		topic: "Prepositions"
	},
	{
		id: "p-e",
		latin: "ē / ex",
		english: "out of / from",
		topic: "Prepositions",
		extra: [
			"out of",
			"from",
			"e",
			"ex"
		]
	}
];
var LATIN_QUESTIONS = [
	{
		id: "q-amo",
		category: "Vocabulary",
		prompt: "What does amō mean?",
		answer: "I love",
		accepted: [
			"i love",
			"love",
			"i am loving"
		],
		choices: [
			"I love",
			"I carry",
			"I lead",
			"I write"
		],
		explain: "amō is a first-conjugation verb: I love.",
		topic: "Present tense"
	},
	{
		id: "q-puella",
		category: "Vocabulary",
		prompt: "What does puella mean?",
		answer: "girl",
		accepted: [
			"girl",
			"a girl",
			"the girl"
		],
		choices: [
			"girl",
			"boy",
			"garden",
			"mother"
		],
		explain: "puella, puellae (f.) — girl. First declension.",
		topic: "Nouns"
	},
	{
		id: "q-hortus",
		category: "Vocabulary",
		prompt: "What does hortus mean?",
		answer: "garden",
		accepted: [
			"garden",
			"a garden",
			"the garden"
		],
		choices: [
			"house",
			"garden",
			"book",
			"road"
		],
		explain: "hortus, hortī (m.) — garden. Second declension.",
		topic: "Nouns"
	},
	{
		id: "q-est",
		category: "Grammar",
		prompt: "Which person and number is est?",
		answer: "3rd singular",
		accepted: [
			"3rd singular",
			"third singular",
			"3s",
			"he she it is"
		],
		choices: [
			"1st singular",
			"2nd singular",
			"3rd singular",
			"3rd plural"
		],
		explain: "sum, es, est — est is 3rd person singular: he/she/it is.",
		topic: "sum"
	},
	{
		id: "q-amat",
		category: "Grammar",
		prompt: "Which form of amō means ‘he/she loves’?",
		answer: "amat",
		accepted: ["amat"],
		choices: [
			"amō",
			"amās",
			"amat",
			"amant"
		],
		explain: "1st conjugation present: amō, amās, amat, amāmus, amātis, amant.",
		topic: "Present tense"
	},
	{
		id: "q-amant",
		category: "Grammar",
		prompt: "What does amant mean?",
		answer: "they love",
		accepted: ["they love", "they are loving"],
		choices: [
			"I love",
			"we love",
			"they love",
			"you love"
		],
		explain: "The -nt ending marks 3rd person plural in the present tense.",
		topic: "Present tense"
	},
	{
		id: "q-acc",
		category: "Grammar",
		prompt: "In Puella hortum amat, why is hortum not hortus?",
		answer: "It is the object (accusative)",
		accepted: [
			"accusative",
			"it is the object",
			"object",
			"it is the object (accusative)",
			"direct object"
		],
		choices: [
			"It is the subject (nominative)",
			"It is the object (accusative)",
			"It is possession (genitive)",
			"It is the verb"
		],
		explain: "hortum is accusative singular of hortus — the thing being loved.",
		topic: "Cases"
	},
	{
		id: "q-nom",
		category: "Grammar",
		prompt: "Which case is used for the subject of a Latin sentence?",
		answer: "nominative",
		accepted: ["nominative", "nom"],
		choices: [
			"nominative",
			"accusative",
			"ablative",
			"dative"
		],
		explain: "The nominative marks the person or thing doing the verb.",
		topic: "Cases"
	},
	{
		id: "q-dat",
		category: "Grammar",
		prompt: "Which case often marks the person to whom something is given?",
		answer: "dative",
		accepted: ["dative", "dat"],
		choices: [
			"nominative",
			"genitive",
			"dative",
			"ablative"
		],
		explain: "dō + dative: Māter fīliō cibum dat — Mother gives food to her son.",
		topic: "Cases"
	},
	{
		id: "q-in-abl",
		category: "Grammar",
		prompt: "in hortō (with a long ō) most often means:",
		answer: "in the garden",
		accepted: [
			"in the garden",
			"in garden",
			"on the garden"
		],
		choices: [
			"into the garden",
			"in the garden",
			"from the garden",
			"of the garden"
		],
		explain: "in + ablative = in/on a place. in + accusative = into/onto.",
		topic: "Prepositions"
	},
	{
		id: "q-tr1",
		category: "Translation",
		prompt: "Translate: Puella in hortō lūdit.",
		answer: "The girl plays in the garden.",
		accepted: [
			"the girl plays in the garden",
			"a girl plays in the garden",
			"the girl is playing in the garden"
		],
		choices: [
			"The girl plays in the garden.",
			"The girl loves the garden.",
			"The boy plays in the garden.",
			"The girl walks to the garden."
		],
		explain: "puella = girl (subject). lūdit = plays. in hortō = in the garden.",
		topic: "Simple sentences"
	},
	{
		id: "q-tr2",
		category: "Translation",
		prompt: "Translate: Canis in viā lātrat.",
		answer: "The dog barks in the street.",
		accepted: [
			"the dog barks in the street",
			"a dog barks in the road",
			"the dog is barking in the street",
			"the dog barks on the road"
		],
		choices: [
			"The dog barks in the street.",
			"The dog runs in the garden.",
			"The boy shouts in the street.",
			"The dog sits in the house."
		],
		explain: "canis = dog. lātrat = barks. in viā = in/on the road.",
		topic: "Simple sentences"
	},
	{
		id: "q-tr3",
		category: "Translation",
		prompt: "Translate: Māter fīliō cibum dat.",
		answer: "The mother gives food to her son.",
		accepted: [
			"the mother gives food to her son",
			"mother gives food to the son",
			"the mother gives the son food",
			"a mother gives food to her son"
		],
		choices: [
			"The mother gives food to her son.",
			"The son gives food to his mother.",
			"The mother carries food to the house.",
			"The father gives a book to his son."
		],
		explain: "dat = gives. cibum (acc.) = food. fīliō (dat.) = to the son.",
		topic: "Simple sentences"
	},
	{
		id: "q-tr4",
		category: "Translation",
		prompt: "Translate: Pater ad villam redit.",
		answer: "The father returns to the house.",
		accepted: [
			"the father returns to the house",
			"father returns to the villa",
			"the father goes back to the house",
			"the father returns to the country house"
		],
		choices: [
			"The father returns to the house.",
			"The father leaves the house.",
			"The son returns to the garden.",
			"The father lives in the house."
		],
		explain: "redit = returns. ad + accusative = to/towards.",
		topic: "Simple sentences"
	},
	{
		id: "q-tr5",
		category: "Translation",
		prompt: "Translate: Soror librum legit.",
		answer: "The sister reads a book.",
		accepted: [
			"the sister reads a book",
			"the sister is reading a book",
			"sister reads the book",
			"the sister reads the book"
		],
		choices: [
			"The sister reads a book.",
			"The sister writes a letter.",
			"The brother reads a book.",
			"The sister carries a book."
		],
		explain: "legit from legō = reads. librum is the accusative object.",
		topic: "Simple sentences"
	},
	{
		id: "q-rome",
		category: "Roman World",
		prompt: "What was a Roman atrium?",
		answer: "The main hall of a town house",
		accepted: [
			"the main hall of a town house",
			"main hall",
			"the central hall of a house",
			"hall of a house"
		],
		choices: [
			"The main hall of a town house",
			"A covered market",
			"A public bath",
			"A country farm"
		],
		explain: "The atrium was the central reception hall of a Roman domus, often with an impluvium.",
		topic: "Houses"
	},
	{
		id: "q-forum",
		category: "Roman World",
		prompt: "The Roman forum was primarily:",
		answer: "A civic and market centre",
		accepted: [
			"a civic and market centre",
			"marketplace",
			"civic centre",
			"public square"
		],
		choices: [
			"A civic and market centre",
			"A private dining room",
			"A military barracks",
			"A temple to one god only"
		],
		explain: "The forum was the public heart of a Roman town: law, trade, speeches, temples.",
		topic: "Towns"
	},
	{
		id: "q-insula",
		category: "Roman World",
		prompt: "An īnsula in a Roman town was:",
		answer: "A block of flats",
		accepted: [
			"a block of flats",
			"apartment block",
			"block of flats",
			"tenement"
		],
		choices: [
			"A block of flats",
			"A country villa",
			"A warship",
			"A public fountain"
		],
		explain: "īnsulae were multi-storey apartment buildings where poorer city-dwellers lived.",
		topic: "Houses"
	},
	{
		id: "q-slaves",
		category: "Roman World",
		prompt: "In a typical Roman town house, enslaved people often:",
		answer: "Lived and worked within the household",
		accepted: [
			"lived and worked within the household",
			"worked in the house",
			"were part of the household"
		],
		choices: [
			"Lived and worked within the household",
			"Were never present in the city",
			"Only worked on farms",
			"Held elected office"
		],
		explain: "Enslaved labour was built into Roman domestic life; many servī lived in the household.",
		topic: "Society"
	},
	{
		id: "q-via",
		category: "Vocabulary",
		prompt: "Give the Latin for ‘road’ or ‘street’.",
		answer: "via",
		accepted: ["via", "viae"],
		choices: [
			"via",
			"villa",
			"hortus",
			"aqua"
		],
		explain: "via, viae (f.) — road, street, way.",
		topic: "Nouns"
	},
	{
		id: "q-sumus",
		category: "Grammar",
		prompt: "What does sumus mean?",
		answer: "we are",
		accepted: ["we are"],
		choices: [
			"I am",
			"you are",
			"we are",
			"they are"
		],
		explain: "sum, es, est, sumus, estis, sunt.",
		topic: "sum"
	},
	{
		id: "q-ducit",
		category: "Vocabulary",
		prompt: "What does dūcit mean?",
		answer: "he/she leads",
		accepted: [
			"he leads",
			"she leads",
			"he/she leads",
			"it leads",
			"leads"
		],
		choices: [
			"he/she leads",
			"I lead",
			"they carry",
			"we write"
		],
		explain: "dūcō, dūcis, dūcit — 3rd conjugation, he/she/it leads.",
		topic: "Present tense"
	},
	{
		id: "q-scribit",
		category: "Translation",
		prompt: "Translate: Amīcus epistulam scrībit.",
		answer: "The friend writes a letter.",
		accepted: [
			"the friend writes a letter",
			"a friend writes a letter",
			"the friend is writing a letter"
		],
		choices: [
			"The friend writes a letter.",
			"The friend reads a letter.",
			"The girl writes a book.",
			"The friend carries a letter."
		],
		explain: "scrībit = writes. epistulam is accusative of epistula.",
		topic: "Simple sentences"
	},
	{
		id: "q-abl-prep",
		category: "Grammar",
		prompt: "Which case does cum (‘with’) take?",
		answer: "ablative",
		accepted: ["ablative", "abl"],
		choices: [
			"nominative",
			"accusative",
			"genitive",
			"ablative"
		],
		explain: "cum + ablative: cum amīcō — with a friend.",
		topic: "Prepositions"
	}
];
var LATIN_NOTES = [
	{
		id: "n1",
		title: "Present tense, first conjugation",
		body: "amō, amās, amat, amāmus, amātis, amant. Stem amā- + person endings -ō, -s, -t, -mus, -tis, -nt. First conjugation verbs have an -ā- in the present stem."
	},
	{
		id: "n2",
		title: "Nominative and accusative",
		body: "The nominative is the subject. The accusative is usually the direct object. In Puella hortum amat, puella does the loving; hortum is what is loved."
	},
	{
		id: "n3",
		title: "sum — the verb ‘to be’",
		body: "sum, es, est, sumus, estis, sunt. It does not take an accusative object. What follows is usually nominative: Puella est laeta — the girl is happy."
	},
	{
		id: "n4",
		title: "in + ablative / in + accusative",
		body: "in hortō = in the garden (place where). in hortum = into the garden (place to which). The case after in changes the meaning."
	}
];
var FORMA_ITEMS = [
	{
		id: "f1",
		target: "amō",
		stem: "am",
		ending: "ō",
		person: "1st singular",
		meaning: "I love",
		conjugation: "1st"
	},
	{
		id: "f2",
		target: "amās",
		stem: "amā",
		ending: "s",
		person: "2nd singular",
		meaning: "you love",
		conjugation: "1st"
	},
	{
		id: "f3",
		target: "amat",
		stem: "ama",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she loves",
		conjugation: "1st"
	},
	{
		id: "f4",
		target: "amāmus",
		stem: "amā",
		ending: "mus",
		person: "1st plural",
		meaning: "we love",
		conjugation: "1st"
	},
	{
		id: "f5",
		target: "amant",
		stem: "ama",
		ending: "nt",
		person: "3rd plural",
		meaning: "they love",
		conjugation: "1st"
	},
	{
		id: "f6",
		target: "portō",
		stem: "port",
		ending: "ō",
		person: "1st singular",
		meaning: "I carry",
		conjugation: "1st"
	},
	{
		id: "f7",
		target: "portat",
		stem: "porta",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she carries",
		conjugation: "1st"
	},
	{
		id: "f8",
		target: "portant",
		stem: "porta",
		ending: "nt",
		person: "3rd plural",
		meaning: "they carry",
		conjugation: "1st"
	},
	{
		id: "f9",
		target: "laudat",
		stem: "lauda",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she praises",
		conjugation: "1st"
	},
	{
		id: "f10",
		target: "spectāmus",
		stem: "spectā",
		ending: "mus",
		person: "1st plural",
		meaning: "we watch",
		conjugation: "1st"
	},
	{
		id: "f11",
		target: "videō",
		stem: "vid",
		ending: "eō",
		person: "1st singular",
		meaning: "I see",
		conjugation: "2nd"
	},
	{
		id: "f12",
		target: "videt",
		stem: "vide",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she sees",
		conjugation: "2nd"
	},
	{
		id: "f13",
		target: "vident",
		stem: "vide",
		ending: "nt",
		person: "3rd plural",
		meaning: "they see",
		conjugation: "2nd"
	},
	{
		id: "f14",
		target: "dūcō",
		stem: "dūc",
		ending: "ō",
		person: "1st singular",
		meaning: "I lead",
		conjugation: "3rd"
	},
	{
		id: "f15",
		target: "dūcit",
		stem: "dūci",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she leads",
		conjugation: "3rd"
	},
	{
		id: "f16",
		target: "dūcunt",
		stem: "dūcu",
		ending: "nt",
		person: "3rd plural",
		meaning: "they lead",
		conjugation: "3rd"
	},
	{
		id: "f17",
		target: "scrībit",
		stem: "scrībi",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she writes",
		conjugation: "3rd"
	},
	{
		id: "f18",
		target: "legunt",
		stem: "legu",
		ending: "nt",
		person: "3rd plural",
		meaning: "they read",
		conjugation: "3rd"
	},
	{
		id: "f19",
		target: "dat",
		stem: "da",
		ending: "t",
		person: "3rd singular",
		meaning: "he/she gives",
		conjugation: "1st"
	},
	{
		id: "f20",
		target: "sunt",
		stem: "su",
		ending: "nt",
		person: "3rd plural",
		meaning: "they are",
		conjugation: "irregular"
	}
];
var FORMA_DISTRACTORS = [
	"ō",
	"s",
	"t",
	"mus",
	"tis",
	"nt",
	"eō",
	"unt",
	"ī"
];
var MOSAIC_ITEMS = [
	{
		id: "m1",
		words: [
			"Puella",
			"in",
			"hortō",
			"lūdit"
		],
		english: "The girl plays in the garden.",
		hint: "Start with the subject."
	},
	{
		id: "m2",
		words: [
			"Canis",
			"in",
			"viā",
			"lātrat"
		],
		english: "The dog barks in the street.",
		hint: "in + ablative for place where."
	},
	{
		id: "m3",
		words: [
			"Māter",
			"fīliō",
			"cibum",
			"dat"
		],
		english: "Mother gives food to her son.",
		hint: "dative person, accusative thing."
	},
	{
		id: "m4",
		words: [
			"Pater",
			"ad",
			"villam",
			"redit"
		],
		english: "Father returns to the house.",
		hint: "ad takes the accusative."
	},
	{
		id: "m5",
		words: [
			"Soror",
			"librum",
			"legit"
		],
		english: "The sister reads a book.",
		hint: "Object in the accusative."
	},
	{
		id: "m6",
		words: [
			"Amīcus",
			"epistulam",
			"scrībit"
		],
		english: "The friend writes a letter.",
		hint: "Subject — object — verb is common."
	},
	{
		id: "m7",
		words: [
			"Puer",
			"cum",
			"cane",
			"ambulat"
		],
		english: "The boy walks with the dog.",
		hint: "cum + ablative."
	},
	{
		id: "m8",
		words: [
			"Servus",
			"aquam",
			"portat"
		],
		english: "The slave carries water.",
		hint: "portat = carries."
	},
	{
		id: "m9",
		words: [
			"Fīlia",
			"in",
			"ātriō",
			"sedet"
		],
		english: "The daughter sits in the atrium.",
		hint: "Place where uses the ablative."
	},
	{
		id: "m10",
		words: [
			"Dominus",
			"servōs",
			"laudat"
		],
		english: "The master praises the slaves.",
		hint: "Plural object: servōs."
	}
];
var MATCH_PAIRS = [
	{
		id: "p1",
		left: "amō",
		right: "I love",
		kind: "meaning"
	},
	{
		id: "p2",
		left: "portō",
		right: "I carry",
		kind: "meaning"
	},
	{
		id: "p3",
		left: "dūcō",
		right: "I lead",
		kind: "meaning"
	},
	{
		id: "p4",
		left: "scrībō",
		right: "I write",
		kind: "meaning"
	},
	{
		id: "p5",
		left: "hortus",
		right: "garden",
		kind: "meaning"
	},
	{
		id: "p6",
		left: "puella",
		right: "girl",
		kind: "meaning"
	},
	{
		id: "p7",
		left: "canis",
		right: "dog",
		kind: "meaning"
	},
	{
		id: "p8",
		left: "via",
		right: "road",
		kind: "meaning"
	},
	{
		id: "p9",
		left: "amō",
		right: "amāvī",
		kind: "form"
	},
	{
		id: "p10",
		left: "portō",
		right: "portāvī",
		kind: "form"
	},
	{
		id: "p11",
		left: "dūcō",
		right: "dūxī",
		kind: "form"
	},
	{
		id: "p12",
		left: "videō",
		right: "vīdī",
		kind: "form"
	},
	{
		id: "p13",
		left: "canis",
		right: "noun",
		kind: "class"
	},
	{
		id: "p14",
		left: "amat",
		right: "verb",
		kind: "class"
	},
	{
		id: "p15",
		left: "in",
		right: "preposition",
		kind: "class"
	},
	{
		id: "p16",
		left: "et",
		right: "conjunction",
		kind: "class"
	}
];
var MANUSCRIPT_CASES = [
	{
		id: "c1",
		title: "Case File I — In the garden",
		passage: "Puella in ___ lūdit. Canis quoque adest.",
		blanks: [{
			id: "b1",
			answer: "hortō",
			choices: [
				"hortō",
				"hortum",
				"hortus",
				"via"
			]
		}],
		inspect: {
			word: "lūdit",
			question: "lūdit is:",
			answer: "3rd singular present",
			choices: [
				"1st singular present",
				"3rd singular present",
				"3rd plural present",
				"infinitive"
			]
		},
		english: "The girl plays in the garden. A dog is also present."
	},
	{
		id: "c2",
		title: "Case File II — A gift of food",
		passage: "Māter fīliō ___ dat. Puer laetus est.",
		blanks: [{
			id: "b1",
			answer: "cibum",
			choices: [
				"cibum",
				"cibus",
				"cibō",
				"aquam"
			]
		}],
		inspect: {
			word: "fīliō",
			question: "Why is fīliō in this form?",
			answer: "dative — to her son",
			choices: [
				"nominative — subject",
				"accusative — object",
				"dative — to her son",
				"ablative — by her son"
			]
		},
		english: "Mother gives food to her son. The boy is happy."
	},
	{
		id: "c3",
		title: "Case File III — A letter home",
		passage: "Amīcus ___ scrībit et ad villam mittit.",
		blanks: [{
			id: "b1",
			answer: "epistulam",
			choices: [
				"epistulam",
				"epistula",
				"librum",
				"villam"
			]
		}],
		inspect: {
			word: "mittit",
			question: "mittit means:",
			answer: "he/she sends",
			choices: [
				"he/she writes",
				"he/she sends",
				"he/she reads",
				"he/she carries"
			]
		},
		english: "The friend writes a letter and sends it to the house."
	},
	{
		id: "c4",
		title: "Case File IV — On the road",
		passage: "Pater ___ viā ambulat. Servus aquam portat.",
		blanks: [{
			id: "b1",
			answer: "in",
			choices: [
				"in",
				"ad",
				"ē",
				"cum"
			]
		}],
		inspect: {
			word: "portat",
			question: "portat is from which verb?",
			answer: "portō — I carry",
			choices: [
				"portō — I carry",
				"amō — I love",
				"dūcō — I lead",
				"sum — I am"
			]
		},
		english: "Father walks on the road. The slave carries water."
	},
	{
		id: "c5",
		title: "Case File V — Praise in the atrium",
		passage: "Dominus servōs in ___ laudat.",
		blanks: [{
			id: "b1",
			answer: "ātriō",
			choices: [
				"ātriō",
				"ātrium",
				"hortō",
				"viā"
			]
		}],
		inspect: {
			word: "servōs",
			question: "servōs is:",
			answer: "accusative plural",
			choices: [
				"nominative singular",
				"nominative plural",
				"accusative singular",
				"accusative plural"
			]
		},
		english: "The master praises the slaves in the atrium."
	},
	{
		id: "c6",
		title: "Case File VI — They are in the city",
		passage: "Puella et māter in urbe ___. Forum spectant.",
		blanks: [{
			id: "b1",
			answer: "sunt",
			choices: [
				"est",
				"sunt",
				"sum",
				"erat"
			]
		}],
		inspect: {
			word: "spectant",
			question: "spectant means:",
			answer: "they watch",
			choices: [
				"I watch",
				"he watches",
				"they watch",
				"we watch"
			]
		},
		english: "The girl and her mother are in the city. They look at the forum."
	}
];
var LATIN_GAMES = [
	{
		id: "forma-forge",
		name: "Forma Forge",
		kicker: "Forms",
		blurb: "Repair forms, endings and patterns.",
		levels: 6
	},
	{
		id: "sentence-mosaic",
		name: "Sentence Mosaic",
		kicker: "Sentences",
		blurb: "Build valid Latin sentences.",
		levels: 6
	},
	{
		id: "verbum-match",
		name: "Verbum Match",
		kicker: "Connections",
		blurb: "Meanings, forms and grammar links.",
		levels: 6
	},
	{
		id: "manuscript",
		name: "Manuscript Mystery",
		kicker: "Investigate",
		blurb: "Restore, inspect and interpret.",
		levels: 6
	}
];
var INDEX = [
	...LATIN_VOCAB.map((item) => ({
		id: `lv-${item.id}`,
		title: item.latin,
		detail: `${item.english} · Latin vocabulary`,
		href: "/session/latin-vocab",
		group: "Latin"
	})),
	...LATIN_NOTES.map((item) => ({
		id: `ln-${item.id}`,
		title: item.title,
		detail: "Teacher notes · Latin",
		href: "/study/latin",
		group: "Latin"
	})),
	...LATIN_GAMES.map((item) => ({
		id: `lg-${item.id}`,
		title: item.name,
		detail: item.blurb,
		href: `/play/${item.id}`,
		group: "Games"
	})),
	...FRENCH_VOCAB.map((item) => ({
		id: `fv-${item.id}`,
		title: item.french,
		detail: `${item.english} · French vocabulary`,
		href: "/session/french-vocab",
		group: "French"
	})),
	...FRENCH_WRITING.map((item) => ({
		id: `fw-${item.id}`,
		title: item.title,
		detail: "Writing challenge · French",
		href: "/session/french-writing",
		group: "French"
	})),
	...BIO_TOPICS.map((item) => ({
		id: `bt-${item.id}`,
		title: item.name,
		detail: `${item.blurb} · Year 8 Biology`,
		href: "/session/bio-practice",
		group: "Biology"
	})),
	...BIO_QUESTIONS.map((item) => ({
		id: `bq-${item.id}`,
		title: item.prompt,
		detail: "Year 8 Biology",
		href: "/session/bio-practice",
		group: "Biology"
	})),
	{
		id: "pe-circuit",
		title: "Quad Circuit",
		detail: "PE · catch, memory, cadence",
		href: "/play/pe-circuit",
		group: "Play"
	},
	{
		id: "play-hub",
		title: "Play hub",
		detail: "PE and Latin games",
		href: "/play",
		group: "Play"
	},
	{
		id: "wardrobe",
		title: "Wardrobe",
		detail: "Outfits and medals",
		href: "/scholar",
		group: "Scholar"
	},
	{
		id: "garden",
		title: "Scholar’s Garden",
		detail: "Growth world",
		href: "/garden",
		group: "Garden"
	}
];
function searchTopics(query) {
	const q = query.trim().toLowerCase();
	if (!q) return INDEX.slice(0, 8);
	return INDEX.filter((hit) => `${hit.title} ${hit.detail} ${hit.group}`.toLowerCase().includes(q)).slice(0, 16);
}
function linkFromHref(href) {
	if (href === "/play") return { to: "/play" };
	if (href.startsWith("/study/") && href !== "/study") return {
		to: "/study/$subject",
		params: { subject: href.slice(7) }
	};
	if (href.startsWith("/play/")) return {
		to: "/play/$game",
		params: { game: href.slice(6) }
	};
	if (href.startsWith("/session/")) return {
		to: "/session/$kind",
		params: { kind: href.slice(9) }
	};
	return { to: href };
}
function SearchDialog({ compact = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const hits = (0, import_react.useMemo)(() => searchTopics(query), [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: compact ? "flex size-11 items-center justify-center rounded-md text-ink hover:bg-sage" : "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-card/85 hover:bg-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0" }),
					!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "block text-sm font-semibold text-card",
							children: "Find topic"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "block text-xs text-card/60",
							children: "Search revision"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Search revision topics"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Find a topic" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Search Latin, French, Biology, games and the garden."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus: true,
				value: query,
				onChange: (event) => setQuery(event.target.value),
				placeholder: "Vocabulary, cases, photosynthesis…",
				className: "mt-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 max-h-80 overflow-y-auto",
				children: [hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full flex-col rounded-md px-3 py-2.5 text-left hover:bg-sage",
					onClick: () => {
						setOpen(false);
						navigate(linkFromHref(hit.href));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: hit.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: hit.detail
					})]
				}) }, hit.id)), hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-6 text-sm text-muted",
					children: "No matching topics."
				})]
			})
		] })]
	});
}
var ctx = null;
function context() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const Ctor = window.AudioContext || window.webkitAudioContext;
		if (!Ctor) return null;
		ctx = new Ctor();
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function unlockAudio() {
	context();
}
function tone(freq, duration, type, gain = .05, delay = 0) {
	const audio = context();
	if (!audio) return;
	const osc = audio.createOscillator();
	const amp = audio.createGain();
	osc.type = type;
	osc.frequency.value = freq;
	amp.gain.value = 0;
	osc.connect(amp);
	amp.connect(audio.destination);
	const t = audio.currentTime + delay;
	amp.gain.setValueAtTime(0, t);
	amp.gain.linearRampToValueAtTime(gain, t + .02);
	amp.gain.exponentialRampToValueAtTime(1e-4, t + duration);
	osc.start(t);
	osc.stop(t + duration + .02);
}
function playCorrect() {
	tone(523.25, .12, "sine", .04);
	tone(659.25, .16, "sine", .035, .08);
}
function playWrong() {
	tone(196, .18, "triangle", .03);
}
function playComplete() {
	tone(523.25, .12, "sine", .04);
	tone(659.25, .14, "sine", .035, .1);
	tone(783.99, .22, "sine", .04, .2);
}
var COLLECTIBLES = [
	{
		id: "ink-pot",
		name: "Ink Pot",
		blurb: "A scholar’s first tool.",
		art: "/art/ink-pot.jpg",
		need: "40 XP"
	},
	{
		id: "study-books",
		name: "Study Books",
		blurb: "A small working library.",
		art: "/art/books.jpg",
		need: "250 XP"
	},
	{
		id: "scholars-globe",
		name: "Scholar’s Globe",
		blurb: "Latin and French, side by side.",
		art: "/art/globe.jpg",
		need: "300 Latin XP and 300 French XP"
	}
];
var MEDALS = [
	{
		id: "first-steps",
		name: "First Steps",
		blurb: "Reach 100 Scholar XP."
	},
	{
		id: "daily-disciplina",
		name: "Disciplina",
		blurb: "Study on 7 different days."
	},
	{
		id: "latin-scholar",
		name: "Latin Scholar",
		blurb: "Earn 200 Latin XP."
	},
	{
		id: "french-scholar",
		name: "French Scholar",
		blurb: "Earn 200 French XP."
	},
	{
		id: "polyglot",
		name: "Polyglot",
		blurb: "Earn 150 Latin XP and 150 French XP."
	},
	{
		id: "first-circuit",
		name: "First Circuit",
		blurb: "Complete a PE session on the quad."
	},
	{
		id: "three-looks",
		name: "Three Looks",
		blurb: "Unlock three outfits."
	},
	{
		id: "body-trained",
		name: "Trained",
		blurb: "Earn 80 Body XP from exercise."
	},
	{
		id: "full-wardrobe",
		name: "Full Wardrobe",
		blurb: "Unlock every outfit."
	}
];
var XP_RULES = {
	daily_complete: 60,
	practice_first_correct: 4,
	practice_repeat_correct: 1,
	practice_repair_correct: 2,
	due_review_correct: 6,
	spelling_first: 8,
	spelling_repair: 2,
	vocab_review: 10,
	quiz_complete_80: 30,
	quiz_bonus_90: 15,
	game_complete: 20,
	writing_complete: 20,
	weak_area_complete: 8,
	pe_complete: 24
};
function xpNeed(level) {
	return Math.round(100 + (level - 1) * 40 + (level - 1) ** 1.35 * 10);
}
function levelFromXp(total) {
	let remaining = Math.max(0, total);
	for (let level = 1; level <= 50; level++) {
		const need = xpNeed(level);
		if (remaining < need) return {
			level,
			into: remaining,
			next: need
		};
		remaining -= need;
	}
	return {
		level: 50,
		into: remaining,
		next: xpNeed(50)
	};
}
function gardenStage(total) {
	if (total >= 2200) return 4;
	if (total >= 1e3) return 3;
	if (total >= 400) return 2;
	return 1;
}
var GARDEN_MILESTONES = [
	{
		stage: 1,
		min: 0,
		name: "Seedling",
		copy: "The first signs of your study habit are taking root.",
		art: "/art/garden-1.jpg"
	},
	{
		stage: 2,
		min: 400,
		name: "Young Growth",
		copy: "Regular learning has grown a stronger, leafier plant.",
		art: "/art/garden-2.jpg"
	},
	{
		stage: 3,
		min: 1e3,
		name: "Budding",
		copy: "Your Garden is established and preparing to bloom.",
		art: "/art/garden-3.jpg"
	},
	{
		stage: 4,
		min: 2200,
		name: "In Bloom",
		copy: "A flourishing Scholar Garden grown through sustained study.",
		art: "/art/garden-4.jpg"
	}
];
function nextGarden(total) {
	const stage = gardenStage(total);
	const current = GARDEN_MILESTONES[stage - 1];
	const upcoming = GARDEN_MILESTONES.slice(stage)[0] ?? null;
	if (!upcoming) return {
		stage,
		current,
		upcoming: null,
		left: 0,
		target: current.min
	};
	return {
		stage,
		current,
		upcoming,
		left: Math.max(0, upcoming.min - total),
		target: upcoming.min
	};
}
var DEFAULT_SCHOLAR_NAME = "Iris";
var OUTFITS = [
	{
		id: "day",
		name: "Day Uniform",
		blurb: "Cornflower jumper, blue-and-white blouse, charcoal pleated skirt.",
		art: "/art/outfits/day.jpg",
		need: "Starter outfit"
	},
	{
		id: "summer",
		name: "Summer Blouse",
		blurb: "Short sleeves for warm days on the quad.",
		art: "/art/outfits/summer.jpg",
		need: "Earn 60 Scholar XP"
	},
	{
		id: "pe",
		name: "PE Kit",
		blurb: "White polo, navy skort, hockey socks — ready for the circuit.",
		art: "/art/outfits/pe.jpg",
		need: "Complete one PE circuit"
	},
	{
		id: "house",
		name: "House Colours",
		blurb: "Teal house shirt for matches and sports day.",
		art: "/art/outfits/house.jpg",
		need: "Score in two different games"
	},
	{
		id: "winter",
		name: "Winter Coat",
		blurb: "Navy overcoat and cream scarf for cold mornings.",
		art: "/art/outfits/winter.jpg",
		need: "Study on 3 different days, or reach 200 XP"
	},
	{
		id: "garden",
		name: "Garden Club",
		blurb: "Sage apron and a pot of herbs from the walled garden.",
		art: "/art/outfits/garden.jpg",
		need: "Grow the garden to Young Growth"
	},
	{
		id: "prize",
		name: "Prize Day",
		blurb: "Navy blazer, gold badge, and a medal for the hall.",
		art: "/art/outfits/prize.jpg",
		need: "Reach Scholar level 4, or earn 3 medals"
	}
];
function isOutfitUnlocked(id, ctx) {
	const level = levelFromXp(ctx.xp).level;
	const garden = gardenStage(ctx.xp);
	switch (id) {
		case "day": return true;
		case "summer": return ctx.xp >= 60;
		case "pe": return ctx.peSessions >= 1;
		case "house": return ctx.gameSessions >= 2;
		case "winter": return ctx.studyDays >= 3 || ctx.xp >= 200;
		case "garden": return garden >= 2;
		case "prize": return level >= 4 || ctx.medals >= 3;
	}
}
function outfitById(id) {
	return OUTFITS.find((item) => item.id === id) ?? OUTFITS[0];
}
function nextOutfit(unlocked, ctx) {
	return OUTFITS.find((item) => !unlocked.includes(item.id) && !isOutfitUnlocked(item.id, ctx)) ?? null;
}
function scholarLine(opts) {
	if (opts.dailyDone >= opts.dailyTotal) return "The day's work is done. The garden looks brighter already.";
	if (opts.hour < 12) return opts.peDone ? "Morning circuit done. Shall we open a Latin book?" : "Good morning. Latin first, or a turn on the quad?";
	if (opts.hour < 17) return opts.peDone ? "Afternoon light on the walls. A little more practice will do." : "The quad is free. A short circuit would wake the mind.";
	return "Evening study holds. One more page, then rest.";
}
function statFill(value) {
	return Math.round(value / (value + 90) * 100);
}
var GAME_IDS = [
	"forma-forge",
	"sentence-mosaic",
	"verbum-match",
	"manuscript",
	"pe-circuit"
];
function emptyGames() {
	return Object.fromEntries(GAME_IDS.map((id) => [id, {
		points: 0,
		unlocked: 1,
		stars: [
			0,
			0,
			0,
			0,
			0,
			0
		],
		streak: 0
	}]));
}
function buildDaily() {
	return [
		{
			id: "latin-practice",
			title: "Latin practice",
			detail: "Eight focused questions.",
			href: "/session/latin-practice",
			target: 8,
			progress: 0
		},
		{
			id: "pe-circuit",
			title: "PE circuit",
			detail: "Catch, remember, keep time.",
			href: "/play/pe-circuit",
			target: 1,
			progress: 0
		},
		{
			id: "play-game",
			title: "A study game",
			detail: "One short Latin game.",
			href: "/play",
			target: 1,
			progress: 0
		}
	];
}
function initialState() {
	return {
		version: 2,
		displayName: "",
		xp: 0,
		latinXp: 0,
		frenchXp: 0,
		bioXp: 0,
		bodyXp: 0,
		studyDays: [],
		today: todayKey(),
		daily: buildDaily(),
		dailyCompleteAwarded: {},
		reviews: {},
		seenCorrect: {},
		seenTotal: {},
		games: emptyGames(),
		collectibles: [],
		medals: [],
		history: [],
		spellingDue: {},
		writing: {},
		sound: true,
		lastSubject: null,
		eventCounts: {},
		equippedOutfit: "day",
		unlockedOutfits: ["day"],
		peSessions: 0
	};
}
function applyUnlocks(state) {
	const nextCollect = new Set(state.collectibles);
	const nextMedals = new Set(state.medals);
	const nextOutfits = new Set(state.unlockedOutfits ?? ["day"]);
	const unlocked = [];
	const gameSessions = Object.values(state.games).filter((game) => game.points > 0).length;
	const ctx = {
		xp: state.xp,
		peSessions: state.peSessions ?? 0,
		studyDays: state.studyDays.length,
		medals: nextMedals.size,
		gameSessions
	};
	for (const outfit of OUTFITS) if (isOutfitUnlocked(outfit.id, ctx) && !nextOutfits.has(outfit.id)) {
		nextOutfits.add(outfit.id);
		unlocked.push(`outfit:${outfit.id}`);
	}
	const checks = [
		{
			id: "ink-pot",
			ok: state.xp >= 40,
			kind: "item"
		},
		{
			id: "study-books",
			ok: state.xp >= 250,
			kind: "item"
		},
		{
			id: "scholars-globe",
			ok: state.latinXp >= 300 && state.frenchXp >= 300,
			kind: "item"
		},
		{
			id: "first-steps",
			ok: state.xp >= 100,
			kind: "medal"
		},
		{
			id: "daily-disciplina",
			ok: state.studyDays.length >= 7,
			kind: "medal"
		},
		{
			id: "latin-scholar",
			ok: state.latinXp >= 200,
			kind: "medal"
		},
		{
			id: "french-scholar",
			ok: state.frenchXp >= 200,
			kind: "medal"
		},
		{
			id: "polyglot",
			ok: state.latinXp >= 150 && state.frenchXp >= 150,
			kind: "medal"
		},
		{
			id: "first-circuit",
			ok: state.peSessions >= 1,
			kind: "medal"
		},
		{
			id: "three-looks",
			ok: nextOutfits.size >= 3,
			kind: "medal"
		},
		{
			id: "body-trained",
			ok: state.bodyXp >= 80,
			kind: "medal"
		},
		{
			id: "full-wardrobe",
			ok: nextOutfits.size >= OUTFITS.length,
			kind: "medal"
		}
	];
	for (const check of checks) {
		const already = check.kind === "item" ? nextCollect.has(check.id) : nextMedals.has(check.id);
		if (check.ok && !already) {
			if (check.kind === "item") nextCollect.add(check.id);
			else nextMedals.add(check.id);
			unlocked.push(check.id);
		}
	}
	state.collectibles = [...nextCollect];
	state.medals = [...nextMedals];
	state.unlockedOutfits = [...nextOutfits];
	return unlocked;
}
function noteStudyDay(state) {
	const day = todayKey();
	if (!state.studyDays.includes(day)) state.studyDays = [...state.studyDays, day].slice(-60);
}
var useScholar = create()(persist((set, get) => ({
	...initialState(),
	hydrateDay: () => {
		const day = todayKey();
		const current = get();
		const hasPe = current.daily.some((task) => task.id === "pe-circuit");
		const next = { ...current };
		if (current.today !== day || !hasPe) {
			next.today = day;
			next.daily = buildDaily();
		}
		applyUnlocks(next);
		set({
			today: next.today,
			daily: next.daily,
			unlockedOutfits: next.unlockedOutfits,
			medals: next.medals,
			collectibles: next.collectibles
		});
	},
	setName: (name) => set({ displayName: name.slice(0, 32) }),
	setSound: (on) => set({ sound: on }),
	setLastSubject: (id) => set({ lastSubject: id }),
	equipOutfit: (id) => {
		if (!get().unlockedOutfits.includes(id)) return;
		set({ equippedOutfit: id });
	},
	award: (event, opts) => {
		const state = get();
		const count = state.eventCounts[event] ?? 0;
		const oneShot = event === "daily_complete" || event === "writing_complete";
		let multiplier = 1;
		if (oneShot) multiplier = count === 0 ? 1 : 0;
		else if (count === 1) multiplier = .2;
		else if (count >= 2 && event !== "practice_first_correct" && event !== "practice_repeat_correct" && event !== "practice_repair_correct" && event !== "due_review_correct" && event !== "spelling_first" && event !== "spelling_repair" && event !== "vocab_review" && event !== "game_complete" && event !== "pe_complete") multiplier = 0;
		const awarded = Math.round(XP_RULES[event] * multiplier);
		const before = levelFromXp(state.xp).level;
		const next = {
			...state,
			xp: state.xp + awarded,
			bodyXp: (state.bodyXp ?? 0) + (event === "pe_complete" ? awarded : 0),
			latinXp: state.latinXp + (opts?.subject === "latin" ? awarded : 0),
			frenchXp: state.frenchXp + (opts?.subject === "french" ? awarded : 0),
			bioXp: state.bioXp + (opts?.subject === "biology" ? awarded : 0),
			eventCounts: {
				...state.eventCounts,
				[event]: count + 1
			}
		};
		noteStudyDay(next);
		const unlocked = applyUnlocks(next);
		if (awarded > 0) next.history = [{
			at: (/* @__PURE__ */ new Date()).toISOString(),
			kind: event,
			detail: opts?.detail ?? event,
			xp: awarded
		}, ...next.history].slice(0, 40);
		set(next);
		return {
			awarded,
			levelUp: levelFromXp(next.xp).level > before,
			unlocked
		};
	},
	recordAttempt: (id, ok, subject) => {
		const state = get();
		const seen = (state.seenTotal[id] ?? 0) + 1;
		const correct = (state.seenCorrect[id] ?? 0) + (ok ? 1 : 0);
		const reviews = { ...state.reviews };
		if (!ok) reviews[id] = {
			stage: 1,
			due: addDays(todayKey(), 2)
		};
		else if (reviews[id]) {
			if (reviews[id].stage === 1) reviews[id] = {
				stage: 2,
				due: addDays(todayKey(), 7)
			};
			else delete reviews[id];
		}
		set({
			seenTotal: {
				...state.seenTotal,
				[id]: seen
			},
			seenCorrect: {
				...state.seenCorrect,
				[id]: correct
			},
			reviews
		});
		const due = state.reviews[id] && state.reviews[id].due <= todayKey();
		const event = !ok ? "practice_repair_correct" : due ? "due_review_correct" : seen === 1 ? "practice_first_correct" : "practice_repeat_correct";
		if (!ok) {
			noteStudyDay(get());
			return {
				awarded: 0,
				levelUp: false,
				unlocked: []
			};
		}
		return get().award(event, {
			subject,
			detail: id
		});
	},
	bumpDaily: (id, amount = 1) => {
		const state = get();
		const daily = state.daily.map((task) => task.id === id ? {
			...task,
			progress: Math.min(task.target, task.progress + amount)
		} : task);
		set({ daily });
		if (daily.every((task) => task.progress >= task.target) && !state.dailyCompleteAwarded[state.today]) {
			set({ dailyCompleteAwarded: {
				...state.dailyCompleteAwarded,
				[state.today]: true
			} });
			return get().award("daily_complete", { detail: "All three tasks" });
		}
		return null;
	},
	completeWriting: (id, text) => {
		set({ writing: {
			...get().writing,
			[id]: {
				text,
				at: (/* @__PURE__ */ new Date()).toISOString()
			}
		} });
		return get().award("writing_complete", {
			subject: "french",
			detail: id
		});
	},
	recordSpelling: (id, ok) => {
		const due = { ...get().spellingDue };
		if (!ok) due[id] = {
			due: addDays(todayKey(), 2),
			wrong: true
		};
		else delete due[id];
		set({ spellingDue: due });
		if (!ok) return {
			awarded: 0,
			levelUp: false,
			unlocked: []
		};
		const event = get().spellingDue[id] ? "spelling_repair" : "spelling_first";
		return get().award(event, {
			subject: "french",
			detail: id
		});
	},
	recordGame: (gameId, points, stars, level) => {
		const games = { ...get().games };
		const current = games[gameId] ?? {
			points: 0,
			unlocked: 1,
			stars: [
				0,
				0,
				0,
				0,
				0,
				0
			],
			streak: 0
		};
		const nextStars = [...current.stars];
		nextStars[level - 1] = Math.max(nextStars[level - 1] ?? 0, stars);
		const unlocked = Math.max(current.unlocked, stars >= 1 ? Math.min(6, level + 1) : current.unlocked);
		games[gameId] = {
			points: current.points + points,
			unlocked,
			stars: nextStars,
			streak: stars >= 2 ? current.streak + 1 : 0
		};
		set({ games });
		get().bumpDaily("play-game", 1);
		return get().award("game_complete", {
			subject: "latin",
			detail: gameId
		});
	},
	recordPe: (points, stars, level) => {
		const games = { ...get().games };
		const current = games["pe-circuit"] ?? {
			points: 0,
			unlocked: 1,
			stars: [
				0,
				0,
				0,
				0,
				0,
				0
			],
			streak: 0
		};
		const nextStars = [...current.stars];
		nextStars[level - 1] = Math.max(nextStars[level - 1] ?? 0, stars);
		const unlocked = Math.max(current.unlocked, stars >= 1 ? Math.min(3, level + 1) : current.unlocked);
		games["pe-circuit"] = {
			points: current.points + points,
			unlocked,
			stars: nextStars,
			streak: stars >= 2 ? current.streak + 1 : 0
		};
		set({
			games,
			peSessions: get().peSessions + 1
		});
		get().bumpDaily("pe-circuit", 1);
		return get().award("pe_complete", { detail: "PE circuit" });
	},
	resetAll: () => set(initialState())
}), {
	name: "lux-scholar-garden-v1",
	version: 2,
	migrate: (persisted) => {
		const p = persisted;
		return {
			...p,
			version: 2,
			bodyXp: p.bodyXp ?? 0,
			equippedOutfit: p.equippedOutfit ?? "day",
			unlockedOutfits: p.unlockedOutfits?.length ? p.unlockedOutfits : ["day"],
			peSessions: p.peSessions ?? 0,
			games: {
				...emptyGames(),
				...p.games
			}
		};
	},
	onRehydrateStorage: () => (state) => {
		state?.hydrateDay();
	}
}));
function dueReviewCount(reviews) {
	const today = todayKey();
	return Object.values(reviews).filter((item) => item.due <= today).length;
}
function nextUnlock(xp, owned) {
	return COLLECTIBLES.find((item) => !owned.includes(item.id)) ?? COLLECTIBLES[COLLECTIBLES.length - 1];
}
function gameSessionCount(games) {
	return Object.values(games).filter((game) => game.points > 0).length;
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/study",
		label: "Study",
		icon: Landmark
	},
	{
		to: "/play",
		label: "Play",
		icon: Gamepad2
	},
	{
		to: "/scholar",
		label: "Scholar",
		icon: UserRound
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hydrateDay = useScholar((s) => s.hydrateDay);
	const { level, into } = levelFromXp(useScholar((s) => s.xp));
	(0, import_react.useEffect)(() => {
		hydrateDay();
		const onFirst = () => unlockAudio();
		window.addEventListener("pointerdown", onFirst, { once: true });
		return () => window.removeEventListener("pointerdown", onFirst);
	}, [hydrateDay]);
	const isActive = (to) => to === "/" ? pathname === "/" : pathname.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink lg:pl-[184px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-40 hidden w-[184px] flex-col bg-navy text-card lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3 px-4 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center overflow-hidden rounded-md bg-navy-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/favicon.svg",
								alt: "",
								className: "size-10 outline-none"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "block font-display text-lg leading-tight",
							children: "Lux et Labor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "block text-[11px] tracking-wide text-card/65",
							children: "Raise your scholar"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-4 mb-4 flex items-center justify-between rounded-md bg-white/8 px-3 py-2 text-xs tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Lv ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: level })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: into }), " XP"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1 px-2",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-card/80 hover:bg-white/10 hover:text-card", isActive(item.to) && "bg-white/12 text-card"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 pb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDialog, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "block font-display text-lg leading-none",
						children: "Lux et Labor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-[11px] text-muted",
						children: "Raise your scholar"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-full bg-navy px-3 py-1 text-xs text-card tabular-nums",
						children: [
							"Lv ",
							level,
							" · ",
							into,
							" XP"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchDialog, { compact: true })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 pb-28 pt-5 lg:px-8 lg:pb-10 lg:pt-8",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-card/95 px-1 py-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] lg:hidden",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md text-[11px] font-medium text-muted", isActive(item.to) && "text-navy"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
				}, item.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: false
			})
		]
	});
}
var styles_default = "/assets/styles-CTax9ixB.css";
var APP_NAME = "Lux et Labor";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0e344d"
			},
			{
				name: "description",
				content: "Raise a Tiffin scholar through study, PE and mini games. Unlock outfits, medals and a walled garden."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-B9lo5-1Z.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./garden-OgzPMlj7.mjs");
var Route$8 = createFileRoute("/garden")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./play-Q9m0Bh54.mjs");
var Route$7 = createFileRoute("/play")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./scholar-CAnmwqrH.mjs");
var Route$6 = createFileRoute("/scholar")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./study-kHMRJlWa.mjs");
var Route$5 = createFileRoute("/study")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./play.index-4Aq2Zik0.mjs");
var Route$4 = createFileRoute("/play/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./play._game-Cp57122U.mjs");
var Route$3 = createFileRoute("/play/$game")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./session._kind-YYE05TRq.mjs");
var Route$2 = createFileRoute("/session/$kind")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./study.index-D-sNjrst.mjs");
var Route$1 = createFileRoute("/study/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./study._subject-XW5Epj9g.mjs");
var Route = createFileRoute("/study/$subject")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var GardenRoute = Route$8.update({
	id: "/garden",
	path: "/garden",
	getParentRoute: () => Route$10
});
var PlayRoute = Route$7.update({
	id: "/play",
	path: "/play",
	getParentRoute: () => Route$10
});
var ScholarRoute = Route$6.update({
	id: "/scholar",
	path: "/scholar",
	getParentRoute: () => Route$10
});
var StudyRoute = Route$5.update({
	id: "/study",
	path: "/study",
	getParentRoute: () => Route$10
});
var PlayIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => PlayRoute
});
var PlayGameRoute = Route$3.update({
	id: "/$game",
	path: "/$game",
	getParentRoute: () => PlayRoute
});
var SessionKindRoute = Route$2.update({
	id: "/session/$kind",
	path: "/session/$kind",
	getParentRoute: () => Route$10
});
var StudyIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => StudyRoute
});
var StudySubjectRoute = Route.update({
	id: "/$subject",
	path: "/$subject",
	getParentRoute: () => StudyRoute
});
var PlayRouteChildren = {
	PlayGameRoute,
	PlayIndexRoute
};
var PlayRouteWithChildren = PlayRoute._addFileChildren(PlayRouteChildren);
var StudyRouteChildren = {
	StudySubjectRoute,
	StudyIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	GardenRoute,
	PlayRoute: PlayRouteWithChildren,
	ScholarRoute,
	StudyRoute: StudyRoute._addFileChildren(StudyRouteChildren),
	SessionKindRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { MANUSCRIPT_CASES as A, linkFromHref as C, LATIN_NOTES as D, LATIN_GAMES as E, FRENCH_WRITING as F, BIO_QUESTIONS as I, BIO_TOPICS as L, MOSAIC_ITEMS as M, FRENCH_QUESTIONS as N, LATIN_QUESTIONS as O, FRENCH_VOCAB as P, Input as R, playWrong as S, FORMA_ITEMS as T, nextGarden as _, dueReviewCount as a, playComplete as b, useScholar as c, nextOutfit as d, outfitById as f, levelFromXp as g, GARDEN_MILESTONES as h, Route$3 as i, MATCH_PAIRS as j, LATIN_VOCAB as k, DEFAULT_SCHOLAR_NAME as l, statFill as m, Route as n, gameSessionCount as o, scholarLine as p, Route$2 as r, nextUnlock as s, router_exports as t, OUTFITS as u, COLLECTIBLES as v, FORMA_DISTRACTORS as w, playCorrect as x, MEDALS as y };
