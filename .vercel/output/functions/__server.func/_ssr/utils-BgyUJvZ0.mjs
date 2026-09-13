import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BgyUJvZ0.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function todayKey(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function shuffle(items, seed) {
	const copy = [...items];
	let random = seed ?? Math.floor(Math.random() * 1e6);
	const next = () => {
		random = (random * 1664525 + 1013904223) % 4294967296;
		return random / 4294967296;
	};
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(next() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
function addDays(iso, days) {
	const date = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
	date.setDate(date.getDate() + days);
	return todayKey(date);
}
function foldLatin(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/æ/g, "ae").replace(/œ/g, "oe").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}
function foldFrench(value) {
	return value.normalize("NFC").trim().replace(/\s+/g, " ");
}
function foldFrenchLoose(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9 ']/g, "").replace(/\s+/g, " ").trim();
}
//#endregion
export { foldLatin as a, foldFrenchLoose as i, cn as n, shuffle as o, foldFrench as r, todayKey as s, addDays as t };
