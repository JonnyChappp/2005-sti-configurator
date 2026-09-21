import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { colors, byId, sourceData } from "../src/catalog";
import {
  studioImage,
  interiorImage,
  accessoryImage,
  accessoryImages,
} from "../src/assets";
describe("image coverage", () => {
  it("provides distinct valid files for all thirty exterior views", () => {
    const paths = new Set<string>();
    for (const color of colors)
      for (const wheel of ["gold", "silver"]) {
        for (const angle of ["front", "side", "rear"] as const) {
          const path = "public" + studioImage(color.id, wheel, angle);
          paths.add(path);
          const delivery = readFileSync(path);
          expect(delivery.subarray(0, 4).toString()).toBe("RIFF");
          expect(delivery.subarray(8, 12).toString()).toBe("WEBP");
          const data = readFileSync(
            path
              .replace(
                "public/assets/studio",
                "references/2005-sti/studio-originals",
              )
              .replace(".webp", ".png"),
          );
          expect(data.subarray(1, 4).toString()).toBe("PNG");
          expect(data.readUInt32BE(16)).toBe(1536);
          expect(data.readUInt32BE(20)).toBe(1024);
        }
      }
    expect(paths.size).toBe(30);
  });
  it("provides three matching interior showcase views", () => {
    const paths = [
      interiorImage("cockpit"),
      interiorImage("cabin"),
      ...colors.map((color) => interiorImage("rear", color.id)),
    ];
    for (const assetPath of paths) {
      const path = "public" + assetPath;
      const delivery = readFileSync(path);
      expect(delivery.subarray(0, 4).toString()).toBe("RIFF");
      expect(delivery.subarray(8, 12).toString()).toBe("WEBP");
      const original = readFileSync(
        path
          .replace(
            "public/assets/interior",
            "references/2005-sti/interior-originals",
          )
          .replace(".webp", ".png"),
      );
      expect(original.subarray(1, 4).toString()).toBe("PNG");
      expect(original.readUInt32BE(16)).toBe(1536);
      expect(original.readUInt32BE(20)).toBe(1024);
    }
  });
  it("every accessory photo has a catalog item, file, source and caveat", () => {
    for (const [id, asset] of Object.entries(accessoryImages)) {
      expect(byId[id]).toBeDefined();
      const variants = ["hood_protector", "fog_lights"].includes(id)
        ? colors.map((color) => accessoryImage(id, color.id))
        : [accessoryImage(id, "blue")];
      for (const file of variants) expect(existsSync("public" + file)).toBe(true);
      expect(Object.hasOwn(sourceData.sources, asset.source)).toBe(true);
      expect(asset.caption.length).toBeGreaterThan(10);
    }
  });
});
