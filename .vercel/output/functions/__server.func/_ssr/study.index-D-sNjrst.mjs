import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-DQJTLHwf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study.index-D-sNjrst.js
var import_jsx_runtime = require_jsx_runtime();
var CURRENT = [{
	id: "latin",
	name: "Latin",
	kicker: "Year 9 · Current curriculum",
	blurb: "Build fluency through short, focused sessions.",
	art: "/art/latin.jpg"
}, {
	id: "french",
	name: "French",
	kicker: "Year 9 · Current curriculum",
	blurb: "Vocabulary, spelling and writing, with accents that count.",
	art: "/art/french.jpg"
}];
var FOUNDATION = [{
	id: "biology",
	name: "Biology",
	kicker: "Year 8 · Foundation consolidation",
	blurb: "Cells, photosynthesis, digestion, respiration, ecosystems.",
	art: "/art/biology.jpg"
}];
function StudyHub() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.22em] text-navy uppercase",
						children: "Discover · Practise · Make progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-semibold",
						children: "Study Hub"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Choose a subject and continue your learning journey. Current Year 9 learning stays separate from Year 8 Foundation Review."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
					children: "Year 9 · Current curriculum"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: CURRENT.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectCard, { ...subject }, subject.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold tracking-[0.18em] text-navy uppercase",
					children: "Year 8 · Foundation consolidation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: FOUNDATION.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectCard, { ...subject }, subject.id))
				})]
			})
		]
	});
}
function SubjectCard({ id, name, kicker, blurb, art }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/study/$subject",
		params: { subject: id },
		className: "group block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0 transition-transform duration-200 group-hover:-translate-y-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: art,
				alt: "",
				className: "h-40 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-navy uppercase",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-semibold",
						children: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: blurb
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mb-1 size-4 shrink-0 text-navy" })]
			})]
		})
	});
}
//#endregion
export { StudyHub as component };
