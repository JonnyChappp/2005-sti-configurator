// Format/size optimization only. Original generated PNGs remain untouched.
import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
const roots = [
  {
    source: "references/2005-sti/studio-originals",
    output: "public/assets/studio",
  },
  {
    source: "references/2005-sti/interior-originals",
    output: "public/assets/interior",
  },
  {
    source: "references/2005-sti/accessory-originals/paint-aware",
    output: "public/assets/accessories",
  },
];
let original = 0,
  optimized = 0;
for (const root of roots) {
  await mkdir(root.output, { recursive: true });
  for (const name of await readdir(root.source)) {
    if (!name.endsWith(".png")) continue;
    const src = `${root.source}/${name}`,
      output = `${root.output}/${name.replace(/\.png$/, ".webp")}`;
    await sharp(src).webp({ quality: 88, effort: 6 }).toFile(output);
    original += (await stat(src)).size;
    optimized += (await stat(output)).size;
  }
}
for (const name of ["security-system", "floor-mats", "mirror-homelink", "wheel-locks"]) {
  const src = `references/2005-sti/accessory-originals/${name}.png`,
    output = `public/assets/accessories/${name}.webp`;
  await sharp(src).webp({ quality: 88, effort: 6 }).toFile(output);
  original += (await stat(src)).size;
  optimized += (await stat(output)).size;
}
console.log(
  `Showcase delivery: ${(original / 1048576).toFixed(2)} MB → ${(optimized / 1048576).toFixed(2)} MB (${Math.round(100 * (1 - optimized / original))}% smaller). Original PNGs preserved.`,
);
