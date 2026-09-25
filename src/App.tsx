import React, { useEffect, useRef, useState } from "react";
import {
  byId,
  colors,
  items,
  money,
  profiles,
  sourceData,
  type Item,
} from "./catalog";
import {
  add,
  available,
  conflicts,
  contents,
  decode,
  encode,
  initial,
  normalize,
  price,
  remove,
  type Build,
} from "./engine";
import {
  studioImage,
  interiorImage,
  accessoryImage,
  accessoryImages,
  type ExteriorAngle,
  type InteriorAngle,
} from "./assets";
import { downloadBuild } from "./export";
import CarViewer3D from "./CarViewer3D";
const steps = ["Trim", "Colors", "Packages", "Accessories", "Summary"];
export default function App() {
  const [build, setBuild] = useState<Build>(() => {
    const shared = decode(location.search);
    if (shared) return shared;
    try {
      return normalize(JSON.parse(localStorage.getItem("sti-build") || "null"));
    } catch {
      return initial;
    }
  });
  const [view, setView] = useState("Exterior");
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState<{
    title: string;
    body: React.ReactNode;
    actions?: { label: string; run: () => void }[];
  } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stepNav = useRef<HTMLElement>(null);
  useEffect(() => {
    stepNav.current
      ?.querySelector('[aria-current="step"]')
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [build.step]);
  const cost = price(build);
  const color = colors.find((c) => c.id === build.color)!;
  const included = new Set(build.selected.flatMap(contents));
  useEffect(() => {
    try {
      localStorage.setItem("sti-build", JSON.stringify(build));
    } catch {}
    history.replaceState(null, "", encode(build));
  }, [build]);
  useEffect(() => {
    const listener = () => setBuild(decode(location.search) || initial);
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);
  useEffect(() => {
    if (modal) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    } else dialog.current?.close();
  }, [modal]);
  function change(next: Build) {
    setBuild(next);
  }
  function navigate(step: number) {
    history.pushState(null, "", encode({ ...build, step }));
    setBuild({ ...build, step });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function select(item: Item) {
    if (build.selected.includes(item.id)) {
      if (item.includes.length)
        setModal({
          title: "Remove package?",
          body: "You can remove the whole package or keep its accessories at their individual prices. An unverified individual price will make the total incomplete.",
          actions: [
            {
              label: "Remove package & accessories",
              run: () => change(remove(build, item.id)),
            },
            {
              label: "Keep individual accessories",
              run: () => change(remove(build, item.id, true)),
            },
          ],
        });
      else change(remove(build, item.id));
      return;
    }
    const collisions = build.selected.filter((id) => conflicts(id, item.id));
    if (collisions.length)
      setModal({
        title: "Update your build?",
        body: (
          <>
            <p>{item.name} replaces:</p>
            <ul>
              {collisions.map((id) => (
                <li key={id}>{byId[id].name}</li>
              ))}
            </ul>
            <p>
              Replacing a package also removes its other included accessories.
            </p>
          </>
        ),
        actions: [
          {
            label: "Replace selections",
            run: () => change(add(build, item.id)),
          },
        ],
      });
    else change(add(build, item.id));
  }
  function details(item: Item) {
    setModal({
      title: item.name,
      body: (
        <>
          <AccessoryPhoto id={item.id} color={build.color} />
          <p>
            {item.note ||
              "Genuine Subaru equipment offered for the U.S. 2005 WRX STi."}
          </p>
          <p>
            {item.price === null
              ? "Individual historical price is not verified. This selection is excluded from the known subtotal."
              : `Historical reference price: ${money(item.price)}.`}
          </p>
          {item.id === "short_shifter" && (
            <p>
              Original stickers also show $445 and $449. This build uses the
              documented $439 reference price.
            </p>
          )}
          {["fog_lights", "hood_protector"].includes(item.id) && (
            <p>Installation is not included in this reference price.</p>
          )}
          <h3>Research sources</h3>
          {item.source_ids.map((id) => {
            const s = sourceData.sources[id as keyof typeof sourceData.sources];
            return (
              <a
                className="source"
                key={id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                {s.title} ↗
              </a>
            );
          })}
        </>
      ),
    });
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(location.href);
      setNotice("Build link copied.");
    } catch {
      setModal({
        title: "Share your build",
        body: (
          <input
            aria-label="Build link"
            readOnly
            value={location.href}
            onFocus={(e) => e.target.select()}
          />
        ),
      });
    }
  }
  function card(item: Item) {
    const chosen = build.selected.includes(item.id),
      covered = included.has(item.id) && !chosen,
      enabled = available(item.id, build.profile);
    return (
      <article
        className={"option-card " + (chosen ? "chosen" : "")}
        key={item.id}
      >
        <div className="card-eyebrow">
          {item.includes.length
            ? "EQUIPMENT GROUP"
            : "GENUINE SUBARU ACCESSORY"}
          {chosen && <span>✓ Selected</span>}
        </div>
        <h2>{item.name}</h2>
        <AccessoryPhoto id={item.id} color={build.color} />
        {item.includes.length ? (
          <ul>
            {item.includes.map((id) => (
              <li key={id}>{byId[id].name}</li>
            ))}
          </ul>
        ) : (
          <p className="card-description">{descriptions[item.id]}</p>
        )}
        <button className="text-button" onClick={() => details(item)}>
          View Details <span>＋</span>
        </button>
        <div className="card-price">
          {item.price === null ? "Price unverified" : money(item.price)}
          {item.price !== null && <sup>*</sup>}
        </div>
        <button
          className={chosen ? "outline" : "primary"}
          disabled={covered || !enabled}
          onClick={() => select(item)}
        >
          {!enabled
            ? `Available ${item.date === "2005-05" ? "May 2005" : "October 2004"}`
            : covered
              ? "Included in package"
              : chosen
                ? "Remove"
                : item.includes.length
                  ? "Add Package"
                  : "Add Accessory"}
        </button>
      </article>
    );
  }
  return (
    <>
      <header>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(0);
          }}
        >
          <span className="wordmark">SUBARU</span>
          <span className="header-divider" />
          Build &amp; Price
        </a>
        <span className="period">2005</span>
      </header>
      <nav ref={stepNav} aria-label="Build steps">
        <span className="model-step">✓ Model</span>
        {steps.map((s, i) => (
          <button
            key={s}
            aria-current={i === build.step ? "step" : undefined}
            className={i === build.step ? "active" : ""}
            onClick={() => navigate(i)}
          >
            <span>{i + 1}</span> {s}
          </button>
        ))}
      </nav>
      <main className={build.step === 1 ? "colors-page" : ""}>
        <div className="page-heading">
          <p className="eyebrow">2005 IMPREZA</p>
          <h1>
            {build.step === 0
              ? "Choose your STi."
              : build.step === 1
                ? "Make it yours."
                : build.step === 2
                  ? "Select your packages."
                  : build.step === 3
                    ? "The finishing touches."
                    : "Your WRX STi."}
          </h1>
          <p>
            {
              [
                "Rally-bred. Road-ready.",
                "Five original colors. Two iconic wheel finishes.",
                "Genuine Subaru equipment, together.",
                "Equip your STi for the road ahead.",
                "Built your way. Down to the last detail.",
              ][build.step]
            }
          </p>
        </div>
        {build.step === 0 ? (
          <>
            <Viewer color={build.color} wheels={build.wheels} view="Exterior" />
            <section className="trim-card">
              <div className="trim-title">
                <h2>
                  WRX <i>STi</i>
                </h2>
                <span className="selected-label">✓ Selected</span>
              </div>
              <p className="starting">
                Starting at <strong>{money(cost.base)}</strong>
                <sup>*</sup>
              </p>
              <div className="specs">
                <div>
                  <strong>300</strong>
                  <span>Horsepower</span>
                </div>
                <div>
                  <strong>300</strong>
                  <span>lb-ft of torque</span>
                </div>
                <div>
                  <strong>6-speed</strong>
                  <span>Manual transmission</span>
                </div>
              </div>
              <ul className="features">
                {sourceData.factory_configuration.standard_equipment
                  .slice(1, 8)
                  .map((s) => (
                    <li key={s}>{s}</li>
                  ))}
              </ul>
              <p className="muted">
                U.S. specification · 2.5-liter turbocharged SUBARU BOXER® engine
                · Sedan
              </p>
            </section>
          </>
        ) : null}
        {build.step === 1 ? (
          <>
            <div className="view-control">
              <label htmlFor="view">Change View</label>
              <select
                id="view"
                value={view}
                onChange={(e) => setView(e.target.value)}
              >
                <option>Exterior</option>
                <option>Interior</option>
                <option>Exterior &amp; interior</option>
              </select>
            </div>
            <Viewer color={build.color} wheels={build.wheels} view={view} />
            {view !== "Interior" ? (
              <section className="color-section">
                <div
                  className="swatches"
                  role="group"
                  aria-label="Exterior color"
                >
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      aria-label={c.name}
                      aria-pressed={c.id === build.color}
                      style={{ "--paint": c.hex } as React.CSSProperties}
                      className={
                        "swatch " + (c.id === build.color ? "selected" : "")
                      }
                      onClick={() => change({ ...build, color: c.id })}
                    >
                      {c.id === build.color ? "✓" : ""}
                    </button>
                  ))}
                </div>
                <p className="muted">Exterior</p>
                <h2>{color.name}</h2>
                <p className="included-price">
                  Included · Paint code {color.paint_code}
                </p>
                <div className="wheel-picker">
                  <h3>17-inch forged BBS wheels</h3>
                  <div>
                    {(["gold", "silver"] as const).map((w) => (
                      <button
                        key={w}
                        aria-pressed={build.wheels === w}
                        className={
                          build.wheels === w ? "wheel selected" : "wheel"
                        }
                        onClick={() => change({ ...build, wheels: w })}
                      >
                        <span className={"wheel-dot " + w} />
                        {w === "gold" ? "Gold" : "Silver"}{" "}
                        {build.wheels === w ? "✓" : ""}
                        <small>Included</small>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <section className="color-section">
                <p className="muted">Interior</p>
                <h2>Blue perforated Ecsaine</h2>
                <p>Black trim · Standard on every U.S. STi</p>
              </section>
            )}
          </>
        ) : null}
        {build.step === 2 ? (
          <section className="cards">
            {items.filter((i) => i.includes.length).map(card)}
          </section>
        ) : null}
        {build.step === 3 ? (
          <>
            <div className="filters" aria-label="Accessory categories">
              {["All", "Performance", "Comfort & security", "Exterior"].map(
                (c) => (
                  <button
                    key={c}
                    aria-pressed={c === category}
                    className={c === category ? "active" : ""}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ),
              )}
            </div>
            <section className="cards">
              {items
                .filter(
                  (i) =>
                    !i.includes.length &&
                    (category === "All" ||
                      (category === "Performance" &&
                        [
                          "short_shifter",
                          "boost_gauge",
                          "titanium_knob",
                          "gauge_pack",
                          "spt_catback",
                        ].includes(i.id)) ||
                      (category === "Exterior" &&
                        [
                          "wheel_locks",
                          "hood_protector",
                          "fog_lights",
                        ].includes(i.id)) ||
                      (category === "Comfort & security" &&
                        [
                          "alarm",
                          "armrest",
                          "mirror_compass",
                          "mirror_homelink",
                          "floor_mats",
                        ].includes(i.id))),
                )
                .map(card)}
            </section>
          </>
        ) : null}
        {build.step === 4 ? (
          <>
            <Viewer color={build.color} wheels={build.wheels} view="Exterior" />
            <section className="summary">
              <div className="summary-title">
                <h2>
                  2005 WRX <i>STi</i>
                </h2>
                <span>6-speed manual</span>
              </div>
              <h3>Colors &amp; wheels</h3>
              <SummaryRow
                name="Exterior"
                value={color.name}
                edit={() => {
                  setView("Exterior");
                  navigate(1);
                }}
              />
              <SummaryRow
                name="Interior"
                value="Blue / black Ecsaine"
                edit={() => {
                  setView("Interior");
                  navigate(1);
                }}
              />
              <SummaryRow
                name="Wheels"
                value={`${build.wheels === "gold" ? "Gold" : "Silver"} BBS 17 × 8`}
                edit={() => {
                  setView("Exterior");
                  navigate(1);
                }}
              />
              <h3>Packages &amp; accessories</h3>
              {cost.lines.length ? (
                cost.lines.map((l) => (
                  <SummaryRow
                    key={l.item.id}
                    name={l.item.name}
                    value={l.amount === null ? "Unverified" : money(l.amount)}
                    edit={() => navigate(l.item.includes.length ? 2 : 3)}
                  />
                ))
              ) : (
                <p className="muted">No additional equipment selected.</p>
              )}
              <div className="totals">
                <SummaryRow name="Base MSRP" value={money(cost.base)} />
                <SummaryRow
                  name="Packages & accessories"
                  value={
                    money(cost.extras) +
                    (cost.unknown.length ? " + unverified prices" : "")
                  }
                />
                <SummaryRow
                  name="Destination & delivery"
                  value={money(cost.destination)}
                />
                <div className="grand-total" aria-live="polite">
                  <span>
                    {cost.unknown.length ? "Known subtotal" : "Total MSRP"}
                    <sup>*</sup>
                  </span>
                  <strong>{money(cost.total)}</strong>
                </div>
              </div>
              {cost.unknown.length > 0 && (
                <p className="price-note">
                  Excludes unverified prices for{" "}
                  {cost.unknown.map((l) => l.item.name).join(", ")}. Your full
                  total is not yet known.
                </p>
              )}
              <button className="primary" onClick={share}>
                Copy Build Link ↗
              </button>
              {cost.lines.some((l) =>
                ["fog_lights", "hood_protector"].includes(l.item.id),
              ) && (
                <p className="price-note">
                  Installation charges for the hood protector and/or fog lamp
                  kit are not included.
                </p>
              )}
              <div className="summary-actions">
                <button onClick={() => window.print()}>
                  ↓ Print / Save PDF
                </button>
                <button
                  onClick={() =>
                    setModal({
                      title: "Save your build",
                      body: (
                        <>
                          <p>
                            Download a self-contained HTML summary, or open a
                            printable copy to save as PDF from your browser.
                          </p>
                          <a
                            className="primary export-link"
                            href={`/print.html${encode(build)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open Printable Copy ↗
                          </a>
                          <button
                            className="outline"
                            onClick={() => downloadBuild(build)}
                          >
                            Download HTML
                          </button>
                          <p className="muted">
                            If your embedded browser does not support downloads,
                            use the printable copy.
                          </p>
                        </>
                      ),
                    })
                  }
                >
                  ↓ Download Build
                </button>
              </div>
              <button
                className="text-button"
                onClick={() =>
                  setModal({
                    title: "Start a new build?",
                    body: "This resets your current selections. Copy your build link first to keep them.",
                    actions: [
                      {
                        label: "Start over",
                        run: () => {
                          change({ ...initial, selected: [] });
                          window.scrollTo(0, 0);
                        },
                      },
                    ],
                  })
                }
              >
                Start Over
              </button>
            </section>
          </>
        ) : null}
        <footer>
          <button
            className="text-button"
            onClick={() =>
              setModal({
                title: "About this historical build",
                body: (
                  <>
                    <p>
                      An independent reconstruction of the U.S. 2005 WRX STi
                      buying experience. Not affiliated with Subaru.
                    </p>
                    <p>
                      Prices are historical reference MSRP, not current offers.
                      Some accessory prices vary between original window
                      stickers. Unknown prices are excluded from the known
                      subtotal. Taxes, title, registration and unlisted
                      installation are extra.
                    </p>
                    <p>
                      Studio images are AI-assisted reconstructions based on a
                      real 2005 STi reference. Paint and wheel choices update
                      the illustration; accessories are not rendered on the car.
                      Fine details and on-screen paint appearance are
                      approximate. Catalog accessory images are labeled with
                      their source and any model or date limitations.
                    </p>
                    <p>
                      Interactive exterior geometry is adapted from “Subaru
                      Impreza WRX STi 2004 Custom” by MAC ULT ARTS under a{" "}
                      <a
                        href="https://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        CC BY 4.0 license
                      </a>
                      . Materials, wheel finishes, lighting, presentation and
                      selected body attachments were changed for this archive.
                    </p>
                    <p>
                      The catalog includes verified model-year equipment.
                      Overseas, later-fitment and unresolved accessories are
                      excluded pending evidence.
                    </p>
                  </>
                ),
              })
            }
          >
            Legal Disclaimers &amp; Research Notes
          </button>
          <p>
            * Historical MSRP. Destination {money(cost.destination)} extra until
            summary. {profiles.find((p) => p.id === build.profile)?.name}{" "}
            pricing.
          </p>
          <p className="archive">INDEPENDENT HISTORICAL ARCHIVE · 2005</p>
        </footer>
      </main>
      <div className="build-bar">
        <div aria-live="polite" aria-atomic="true">
          <strong>
            {money(build.step === 4 ? cost.total : cost.subtotal)}
            <sup>*</sup>
          </strong>
          <small>{cost.unknown.length ? "Known subtotal" : "Total MSRP"}</small>
        </div>
        <span className="bar-model">
          2005 Impreza
          <br />
          <b>WRX STi</b>
        </span>
        <button
          className="primary"
          onClick={() =>
            build.step === 4 ? share() : navigate(build.step + 1)
          }
        >
          {build.step === 4 ? "Share Build" : "Next"} <span>›</span>
        </button>
      </div>
      {notice && (
        <div role="status" className="toast">
          {notice}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        aria-labelledby="dialog-title"
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setModal(null);
        }}
      >
        <div className="dialog-content">
          <button
            className="close"
            aria-label="Close dialog"
            onClick={() => setModal(null)}
          >
            ×
          </button>
          <h2 id="dialog-title">{modal?.title}</h2>
          <div>{modal?.body}</div>
          {modal?.actions?.map((a) => (
            <button
              className="primary"
              key={a.label}
              onClick={() => {
                a.run();
                setModal(null);
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
}
function AccessoryPhoto({ id, color }: { id: string; color: string }) {
  const asset = accessoryImages[id];
  if (!asset) return null;
  return (
    <figure className="accessory-photo">
      <img
        src={accessoryImage(id, color)}
        alt={byId[id].name}
        loading="lazy"
      />
    </figure>
  );
}
function Viewer({
  color,
  wheels,
  view,
}: {
  color: string;
  wheels: string;
  view: string;
}) {
  const combined = view === "Exterior & interior";
  const angle: ExteriorAngle = "front";
  const [interiorAngle, setInteriorAngle] = useState<InteriorAngle>("cockpit");
  const interior = view === "Interior";
  const src = interior
    ? interiorImage(interiorAngle, color)
    : studioImage(color, wheels, angle);
  const [loaded, setLoaded] = useState("");
  if (combined)
    return (
      <div className="combined-view">
        <Viewer color={color} wheels={wheels} view="Exterior" />
        <Viewer color={color} wheels={wheels} view="Interior" />
      </div>
    );
  return (
    <figure
      className={
        "viewer " + (interior ? "interior" : "studio")
      }
      aria-busy={interior && loaded !== src}
    >
      {interior ? (
        <img
          key={src}
          src={src}
          onLoad={() => setLoaded(src)}
          alt={`2005 WRX STi blue and black interior — ${interiorAngle} view, official brochure-based reconstruction`}
        />
      ) : (
        <CarViewer3D
          color={color}
          wheels={wheels}
          fallback={src}
          alt={`Interactive 3D view of a 2005 WRX STi in ${colors.find((c) => c.id === color)?.name} with ${wheels} wheels`}
        />
      )}
      {interior && (
        <div
          className="angle-controls"
          role="group"
          aria-label="Interior camera angle"
        >
          {(["cockpit", "cabin", "rear"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={interiorAngle === value}
                onClick={() => setInteriorAngle(value)}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
        </div>
      )}
      <figcaption>
        {interior
          ? "Official 2005 Subaru brochure-based reconstruction"
          : "Interactive 360° model · drag to explore · accessories not shown"}
      </figcaption>
    </figure>
  );
}
function SummaryRow({
  name,
  value,
  edit,
}: {
  name: string;
  value: string;
  edit?: () => void;
}) {
  return (
    <div className="summary-row">
      <span>{name}</span>
      <strong>{value}</strong>
      {edit && (
        <button aria-label={`Edit ${name}`} onClick={edit}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 16.8V20h3.2L18.9 8.3l-3.2-3.2L4 16.8Zm17-11.6a.9.9 0 0 0 0-1.3L20.1 3a.9.9 0 0 0-1.3 0l-1.7 1.7 3.2 3.2L21 5.2Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
const descriptions: Record<string, string> = {
  alarm: "Adds a security alarm to the standard immobilizer and keyless entry.",
  armrest: "A little more comfort between the shifts.",
  mirror_compass: "Automatic dimming with an integrated compass.",
  mirror_homelink:
    "Automatic dimming, compass and integrated HomeLink controls.",
  short_shifter:
    "Shorter throws. A more direct connection to the six-speed gearbox.",
  boost_gauge: "Turbo boost pressure, right in your line of sight.",
  titanium_knob: "Genuine STI titanium knob for the six-speed manual.",
  gauge_pack:
    "Boost, oil temperature and voltage. Replaces the dashboard clock.",
  floor_mats: "Blue carpeted mats for the STi cabin.",
  wheel_locks: "A locking fastener set for your BBS wheels.",
  hood_protector:
    "A protective deflector for the leading edge of the hood. Installation extra.",
  fog_lights:
    "Genuine accessory fog lamps. Installation extra; kit contents require confirmation.",
  spt_catback: "Subaru Performance Tuning exhaust, documented by May 2005.",
};
