export function linkFromHref(href: string) {
  if (href === "/play") {
    return { to: "/play" as const };
  }
  if (href.startsWith("/study/") && href !== "/study") {
    return { to: "/study/$subject" as const, params: { subject: href.slice("/study/".length) } };
  }
  if (href.startsWith("/play/")) {
    return { to: "/play/$game" as const, params: { game: href.slice("/play/".length) } };
  }
  if (href.startsWith("/session/")) {
    return { to: "/session/$kind" as const, params: { kind: href.slice("/session/".length) } };
  }
  return { to: href as "/" };
}
