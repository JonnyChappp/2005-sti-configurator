import { describe, it, expect } from "vitest";
import {
  add,
  available,
  conflicts,
  decode,
  encode,
  initial,
  normalize,
  price,
  remove,
} from "../src/engine";
import { sourceData, colors } from "../src/catalog";
describe("historical window stickers", () => {
  for (const f of sourceData.sticker_validation_fixtures)
    it(f.id, () => {
      const build = normalize({
        ...initial,
        profile: "may",
        selected: Object.keys(f.lines),
      });
      const overrides = Object.fromEntries(
        Object.entries(f.lines).map(([id, v]) => [id, v * 100]),
      );
      expect(price(build, overrides, f.base * 100).total).toBe(f.total * 100);
    });
});
describe("configuration rules", () => {
  it("May 2005 delivery is separate", () => {
    expect(price(initial).subtotal).toBe(3244500);
    expect(price(initial).total).toBe(3302000);
  });
  it("Alaska delivery", () =>
    expect(price({ ...initial, region: "alaska" }).total).toBe(3317000));
  it("all ten color and wheel combinations cost the same", () => {
    for (const c of colors)
      for (const w of ["gold", "silver"] as const)
        expect(price({ ...initial, color: c.id, wheels: w }).total).toBe(
          3302000,
        );
  });
  it("package replaces individual charges", () => {
    const b = add(add(add(initial, "alarm"), "mirror_compass"), "peg_2b");
    expect(b.selected).toEqual(["peg_2b"]);
    expect(price(b).extras).toBe(41500);
  });
  it("included accessories cannot be charged twice", () =>
    expect(price(add(add(initial, "peg_2b"), "alarm")).extras).toBe(41500));
  it("performance package gives the knob a verified package price", () => {
    const b = add(add(initial, "titanium_knob"), "performance_package");
    expect(price(b).unknown).toHaveLength(0);
    expect(price(b).extras).toBe(92800);
  });
  it("derived titanium-knob reference price is included", () =>
    expect(price(add(initial, "titanium_knob")).extras).toBe(17900));
  it("gauge pack conflicts with performance package", () => {
    expect(conflicts("performance_package", "gauge_pack")).toBe(true);
    expect(
      add(add(initial, "performance_package"), "gauge_pack").selected,
    ).toEqual(["gauge_pack"]);
  });
  it("mirror replacement removes incompatible package", () =>
    expect(
      add(add({ ...initial, profile: "october" }, "peg_2b"), "mirror_homelink")
        .selected,
    ).toEqual(["mirror_homelink"]));
  it("removing package may preserve components", () => {
    const b = remove(
      add(initial, "performance_package"),
      "performance_package",
      true,
    );
    expect(b.selected).toHaveLength(3);
    expect(price(b).unknown).toHaveLength(0);
    expect(price(b).extras).toBe(92800);
  });
  it("removing package without components empties build", () =>
    expect(remove(add(initial, "peg_2b"), "peg_2b").selected).toEqual([]));
  it("October equipment is date gated", () => {
    expect(available("floor_mats", "september")).toBe(false);
    expect(available("floor_mats", "october")).toBe(true);
  });
  it("SPT exhaust first enabled in May", () => {
    expect(add(initial, "spt_catback").selected).toEqual(["spt_catback"]);
    expect(price(add(initial, "spt_catback")).unknown).toHaveLength(1);
  });
  it("shared earlier-period builds migrate to May and retain equipment", () =>
    expect(
      normalize({
        ...initial,
        profile: "launch",
        selected: ["floor_mats", "mirror_homelink", "spt_catback"],
      }).selected,
    ).toEqual(["floor_mats", "mirror_homelink", "spt_catback"]));
  it("malformed state is sanitized", () =>
    expect(
      normalize({
        color: "red",
        step: 99,
        selected: ["bogus", null, 42],
        wheels: "chrome",
      }),
    ).toEqual({ ...initial, step: 4 }));
  it("round trips shared build", () => {
    const b = add({ ...initial, color: "white", step: 4 }, "peg_2b");
    expect(decode(encode(b))).toEqual(b);
  });
  it("invalid URL fails safely", () =>
    expect(decode("?build=broken")).toBe(null));
});

describe("untrusted shared selections", () => {
  it("ignores inherited object keys", () => {
    expect(
      normalize({
        ...initial,
        selected: ["__proto__", "constructor", "toString", "alarm"],
      }).selected,
    ).toEqual(["alarm"]);
  });
  it("deduplicates repeated package and component IDs", () => {
    const b = normalize({
      ...initial,
      selected: ["alarm", "peg_2b", "alarm", "peg_2b"],
    });
    expect(b.selected).toEqual(["peg_2b"]);
    expect(price(b).extras).toBe(41500);
  });
});
