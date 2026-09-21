import { colors, money, profiles } from "./catalog";
import { normalize, price, type Build } from "./engine";
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
export function buildDocument(raw: Build) {
  const build = normalize(raw);
  const cost = price(build);
  const color = colors.find((c) => c.id === build.color)!;
  const row = (a: string, b: string) =>
    `<tr><td>${escape(a)}</td><td>${escape(b)}</td></tr>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>My 2005 WRX STi build</title><style>body{font:16px/1.6 Arial,sans-serif;color:#25323b;max-width:760px;margin:40px auto;padding:0 24px}h1{font-size:32px}h2{font-size:20px;border-bottom:1px solid #c9d1d6;padding-top:16px}table{width:100%;border-collapse:collapse}td{padding:9px 0;vertical-align:top}td:last-child{text-align:right;padding-left:20px}small,.note{color:#596c79;font-size:13px}.total{font-size:23px;font-weight:bold;border-top:1px solid #81919b;padding-top:15px}footer{margin-top:35px;font-size:12px}@media print{body{margin:0;max-width:none}h2,tr{break-inside:avoid}}</style></head><body><small>INDEPENDENT HISTORICAL ARCHIVE</small><h1>2005 Subaru Impreza WRX STi</h1><p>2.5-liter turbocharged SUBARU BOXER · 6-speed manual · U.S. specification</p><h2>Your configuration</h2><table>${row("Exterior", color.name + " · " + color.paint_code)}${row("Wheels", build.wheels === "gold" ? "Gold BBS 17 × 8" : "Silver BBS 17 × 8")}${row("Interior", "Blue / black perforated Ecsaine")}${row("Pricing period", profiles.find((p) => p.id === build.profile)!.name)}</table><h2>Packages & accessories</h2><table>${cost.lines.map((l) => row(l.item.name, l.amount === null ? "Historical price unverified" : money(l.amount))).join("") || row("No additional equipment", "—")}</table><h2>Historical pricing</h2><table>${row("Base MSRP", money(cost.base))}${row("Equipment with verified prices", money(cost.extras))}${row("Destination & delivery" + (build.region === "alaska" ? " · Alaska" : ""), money(cost.destination))}</table><p class="total">${cost.unknown.length ? "Known subtotal" : "Total MSRP"}: ${money(cost.total)}</p>${cost.unknown.length ? `<p>Full total unknown. Excludes unverified prices for: ${escape(cost.unknown.map((l) => l.item.name).join(", "))}.</p>` : ""}${cost.lines.some((l) => ["fog_lights", "hood_protector"].includes(l.item.id)) ? "<p>Installation charges for the hood protector and/or fog lamp kit are not included.</p>" : ""}<p class="note">Historical reference MSRP in 2004–05 dollars. Taxes, title, registration and dealer installation are extra. Accessory prices may vary between original stickers; the short shifter uses the documented $439 reference price. This is not a current vehicle offer.</p><footer>Independent historical reconstruction. Not affiliated with Subaru. Save or print this page using your browser.</footer></body></html>`;
}
export function downloadBuild(build: Build) {
  const blob = new Blob([buildDocument(build)], {
    type: "text/html;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "2005-wrx-sti-build.html";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
