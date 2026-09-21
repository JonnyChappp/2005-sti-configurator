export type ExteriorAngle = "front" | "side" | "rear";
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const studioImage = (color: string, wheels: string, angle: ExteriorAngle = "front") =>
  publicAsset(`assets/studio/${color}-${wheels}${angle === "front" ? "" : `-${angle}`}.webp`);
export type InteriorAngle = "cockpit" | "cabin" | "rear";
export const interiorImage = (
  angle: InteriorAngle = "cockpit",
  color = "blue",
) =>
  angle === "rear"
    ? publicAsset(`assets/interior/rear-${color}.webp`)
    : publicAsset(`assets/interior/${angle}.webp`);
export type AccessoryImage = {
  file: string;
  caption: string;
  source: string;
  page: number;
};
export const accessoryImage = (id: string, color: string) => {
  if (id === "hood_protector")
    return publicAsset(`assets/accessories/hood-protector-${color}.webp`);
  if (id === "fog_lights")
    return publicAsset(`assets/accessories/fog-lights-${color}.webp`);
  const asset = accessoryImages[id];
  return asset ? publicAsset(`assets/accessories/${asset.file}`) : "";
};
export const accessoryImages: Record<string, AccessoryImage> = {
  armrest: {
    file: "armrest.jpg",
    caption: "2005 Subaru brochure illustration",
    source: "S01",
    page: 22,
  },
  mirror_compass: {
    file: "mirror-compass.jpg",
    caption: "2005 Subaru brochure illustration",
    source: "S01",
    page: 22,
  },
  mirror_homelink: {
    file: "mirror-homelink.webp",
    caption: "Reconstructed product illustration · period kit evidence",
    source: "S02",
    page: 1,
  },
  alarm: {
    file: "security-system.webp",
    caption: "Period Impreza security upgrade kit reconstruction",
    source: "S01",
    page: 22,
  },
  hood_protector: {
    file: "hood-protector-blue.webp",
    caption: "Paint-matched 2005 brochure-based reconstruction",
    source: "S01",
    page: 21,
  },
  titanium_knob: {
    file: "titanium-knob.png",
    caption: "C1010FE100 · six-speed · later catalog photo",
    source: "S12",
    page: 3,
  },
  short_shifter: {
    file: "short-shifter.jpg",
    caption: "Six-speed assembly · later catalog reference",
    source: "S12",
    page: 3,
  },
  boost_gauge: {
    file: "boost-gauge.jpg",
    caption: "2005 Subaru brochure · column gauge illustration",
    source: "S01",
    page: 21,
  },
  gauge_pack: {
    file: "gauge-pack.jpg",
    caption: "2005 Subaru brochure · three-gauge illustration",
    source: "S01",
    page: 22,
  },
  floor_mats: {
    file: "floor-mats.webp",
    caption: "J5010SS700 · blue, no-logo set · reconstructed illustration",
    source: "S12",
    page: 13,
  },
  wheel_locks: {
    file: "wheel-locks.webp",
    caption: "Reconstructed product illustration · sticker-verified option",
    source: "S05",
    page: 1,
  },
  fog_lights: {
    file: "fog-lights-blue.webp",
    caption: "Paint-matched 2005 brochure-based reconstruction",
    source: "S01",
    page: 21,
  },
  spt_catback: {
    file: "spt-catback.jpg",
    caption: "SOA8377900 · later Subaru performance catalog photo",
    source: "S12",
    page: 4,
  },
};
