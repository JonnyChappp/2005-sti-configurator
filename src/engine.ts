import { byId, colors, profiles } from "./catalog";
export type Build = {
  version: 1;
  color: string;
  wheels: "gold" | "silver";
  profile: string;
  region: "continental" | "alaska";
  selected: string[];
  step: number;
};
export const initial: Build = {
  version: 1,
  color: "blue",
  wheels: "gold",
  profile: "may",
  region: "continental",
  selected: [],
  step: 0,
};
export const contents = (id: string): string[] =>
  byId[id]?.includes.length ? byId[id].includes : [id];
export function conflicts(a: string, b: string) {
  const aa = contents(a),
    bb = contents(b);
  return aa.some((x) =>
    bb.some(
      (y) =>
        x !== y &&
        [
          ["mirror_compass", "mirror_homelink"],
          ["boost_gauge", "gauge_pack"],
        ].some((g) => g.includes(x) && g.includes(y)),
    ),
  );
}
export function available(id: string, profile: string) {
  return (
    Object.hasOwn(byId, id) &&
    byId[id].date <=
      (profiles.find((p) => p.id === profile) || profiles[0]).date
  );
}
export function add(build: Build, id: string): Build {
  if (!available(id, build.profile)) return build;
  const selected = build.selected.filter((x) => x !== id && !conflicts(x, id));
  if (selected.some((x) => byId[x].includes.includes(id)))
    return { ...build, selected };
  return {
    ...build,
    selected: [...selected.filter((x) => !byId[id].includes.includes(x)), id],
  };
}
export function remove(build: Build, id: string, keep = false): Build {
  let next = { ...build, selected: build.selected.filter((x) => x !== id) };
  if (keep) for (const child of byId[id].includes) next = add(next, child);
  return next;
}
export function normalize(raw: unknown): Build {
  if (!raw || typeof raw !== "object") return { ...initial, selected: [] };
  const r = raw as Partial<Build>;
  let b: Build = {
    ...initial,
    color: colors.some((c) => c.id === r.color) ? r.color! : initial.color,
    wheels: r.wheels === "silver" ? "silver" : "gold",
    // The public configurator represents the fully available late-model-year
    // catalog. Older shared/local builds are migrated to this fixed profile.
    profile: "may",
    region: r.region === "alaska" ? "alaska" : "continental",
    step: Number.isInteger(r.step) ? Math.min(4, Math.max(0, r.step!)) : 0,
    selected: [],
  };
  if (Array.isArray(r.selected))
    for (const id of r.selected)
      if (typeof id === "string" && Object.hasOwn(byId, id)) b = add(b, id);
  return b;
}
export function price(
  build: Build,
  overrides: Record<string, number> = {},
  baseOverride?: number,
) {
  const base =
    baseOverride ?? profiles.find((p) => p.id === build.profile)!.base;
  const covered = new Set(build.selected.flatMap((x) => byId[x].includes));
  const lines = build.selected
    .filter((id) => !covered.has(id))
    .map((id) => ({ item: byId[id], amount: overrides[id] ?? byId[id].price }));
  const unknown = lines.filter((l) => l.amount === null);
  const extras = lines.reduce((n, l) => n + (l.amount ?? 0), 0);
  const destination = build.region === "alaska" ? 72500 : 57500;
  return {
    base,
    lines,
    unknown,
    extras,
    destination,
    subtotal: base + extras,
    total: base + extras + destination,
  };
}
export function decode(search: string): Build | null {
  const value = new URLSearchParams(search).get("build");
  if (!value) return null;
  try {
    return normalize(JSON.parse(value));
  } catch {
    return null;
  }
}
export const encode = (b: Build) =>
  "?build=" + encodeURIComponent(JSON.stringify(b));
