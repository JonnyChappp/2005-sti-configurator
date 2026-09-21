import research from "../references/2005-sti/options.json";
export const sourceData = research;
export type Item = {
  id: string;
  name: string;
  price: number | null;
  includes: string[];
  note: string;
  date: string;
  source_ids: string[];
  category: string;
};
export const items: Item[] = [...research.options, ...research.packages].map(
  (raw) => {
    const r = raw as unknown as Record<string, unknown>;
    return {
      id: raw.id,
      name: raw.name,
      price:
        raw.reference_price_usd === null ? null : raw.reference_price_usd * 100,
      includes: (r.includes as string[]) || [],
      note: (r.note as string) || "",
      date: (r.first_reported_available_month ||
        r.first_confirmed_by_month ||
        "2004-06") as string,
      source_ids: raw.source_ids,
      category: (r.category as string) || "package",
    };
  },
);
export const byId = Object.fromEntries(items.map((i) => [i.id, i]));
export const colors = research.factory_configuration.colors.map((c, i) => ({
  ...c,
  id: ["white", "gray", "black", "silver", "blue"][i],
  hex: ["#edece6", "#727779", "#141719", "#b9bec2", "#1257ac"][i],
}));
export const profiles = [
  { id: "launch", name: "Launch · June 2004", date: "2004-06", base: 3219500 },
  { id: "september", name: "September 2004", date: "2004-09", base: 3229500 },
  { id: "october", name: "October 2004", date: "2004-10", base: 3229500 },
  { id: "may", name: "May 2005", date: "2005-05", base: 3244500 },
];
export const money = (c: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(c / 100);
