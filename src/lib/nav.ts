export function linkFromHref(href: string) {
  if (href === "/play") return { to: "/play" as const };
  if (href === "/study") return { to: "/study" as const };
  if (href === "/garden") return { to: "/garden" as const };
  if (href === "/scholar") return { to: "/scholar" as const };
  if (href.startsWith("/study/") && href !== "/study") {
    const rest = href.slice("/study/".length);
    const [subject, mode] = rest.split("/");
    if (mode === "learn") return { to: "/study/$subject/learn" as const, params: { subject } };
    if (mode === "practise") return { to: "/study/$subject/practise" as const, params: { subject } };
    if (mode === "progress") return { to: "/study/$subject/progress" as const, params: { subject } };
    if (mode === "play") return { to: "/study/$subject/play" as const, params: { subject } };
    return { to: "/study/$subject" as const, params: { subject } };
  }
  if (href.startsWith("/play/")) {
    return { to: "/play/$game" as const, params: { game: href.slice("/play/".length) } };
  }
  if (href.startsWith("/session/")) {
    return { to: "/session/$kind" as const, params: { kind: href.slice("/session/".length) } };
  }
  if (href.startsWith("/scholar/")) {
    return { to: "/scholar" as const };
  }
  return { to: href as "/" };
}
