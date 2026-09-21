# 2005 Subaru WRX STi configurator — implementation plan

Date: September 21, 2026. Status: implementation in progress. Working configurator, 30 reconstructed exterior views, complete accessory-card image coverage, fixed May 2005 pricing rules and exports implemented; remaining evidence and licensing limits are tracked in README.md.

## Product objective

Recreate the current Subaru Impreza Build & Price experience as closely as practical, particularly its mobile layout, with the car, choices, imagery and historical prices replaced by the U.S.-market 2005 Impreza WRX STi.

Visual fidelity and historical accuracy are equal requirements. A convincing interface containing incorrect equipment, or correct data presented in a substantially redesigned interface, does not meet the brief.

Use this repository as the source of truth. No backend, accounts or live dealer integration are required for the configurator. Public deployment is a separate delivery step after local verification.

## Existing inputs

- [Reference screenshot gallery](references/impreza-mobile/index.html): 11 captures at 390 × 844 CSS pixels, including full-page accessory and summary views.
- [Historical research](references/2005-sti/RESEARCH.md): findings, conflicts and remaining gaps.
- [Research catalog](references/2005-sti/options.json): prices, packages, provenance, compatibility and six original sticker fixtures.
- [Source register](references/2005-sti/SOURCES.md): 33 sources.
- [Image reference guide](references/2005-sti/ASSET-REFERENCES.md): paint references and known modifications.

The screenshots include scrolled states. They are not eleven distinct routes, and their current scroll offsets must not be mistaken for initial page layouts. The existing gallery contains mobile evidence; desktop behavior needs its own capture before claiming a faithful desktop reproduction.

## Scope and defaults

The standard build is a U.S. MY2005 four-door STI with its fixed 2.5-liter engine, six-speed manual transmission and black/blue interior. Present five paints and gold/silver BBS wheels, yielding ten base exterior combinations.

Initial presentation: WR Blue Pearl with gold BBS wheels, no paid accessories. This is a presentation choice, not a claim that Subaru historically selected this default. The pricing profile starts with the documented $32,195 launch MSRP and $575 normal destination. Preserve later $32,295 and $32,445 base-price profiles and the documented Alaska destination separately.

Known accessories remain selectable. Confirmed accessories with unresolved prices can also be selected, but must display “Historical price unverified” and turn the total into a clearly labeled known subtotal. Never use $0 for an unknown price. Items whose U.S. availability itself remains unverified stay in the research catalog until supported; do not silently turn global or later-fitment items into factory options.

The end target is all historically verified U.S. selections. A release must explicitly state remaining coverage gaps if the missing period documents cannot be recovered. No claim of fully verified completeness while unresolved items remain.

## Phase 1 — complete the interaction and visual specification

Inspect the original builder and reconcile it with every saved screenshot. Record:

- Header and bottom bar dimensions, content width, vertical spacing, card padding and color values.
- Font family or closest legitimate available match, weights, sizes, line heights and wrapping.
- Step navigation, completed/current state, previous/next behavior and scroll restoration.
- Exterior/interior/combined view control, swatch scrolling, selected treatment and vehicle framing.
- Package and accessory addition, removal, details dialogs, category filtering and conflict behavior.
- Summary edit links, itemization, destination information, disclaimer placement and export actions.
- Sticky behavior, safe areas, modal background scrolling and transitions.

Capture initial page positions as well as the existing scrolled positions. Add missing interaction states, a narrow mobile reference and desktop/tablet references. Record what was directly observed versus inferred. Maintain a reference-state checklist with screenshot filenames and reproducible viewport/scroll settings.

Deliverable: `docs/reference-spec.md`, added reference images, and a screen/state map. Exit condition: no major visible control lacks specified behavior.

## Phase 2 — normalize the historical catalog

Preserve the original research JSON. Build a separate validated application catalog with stable IDs and explicit fields for model year, market, display name, original order code, part number, availability, price observations, chosen pricing profile, package contents, dependencies, exclusions, image mapping and sources.

Use integer cents for monetary arithmetic. Separate vehicle MSRP, option MSRP, dealer parts charges, installation and destination. Installation that is unknown is neither free nor included.

Resolve targeted outstanding questions: standalone titanium-knob price; HomeLink package suffix; shifter price dates; period SPT exhaust SKU/price; complete fog-kit contents; original blue-mat appearance; U.S. dealer applicability of the remaining candidates. Search original accessory application/price sheets and stickers first. Preserve disagreements with a reasoned selection instead of overwriting evidence.

Model temporal availability independently from vehicle price. October 2004 mat/HomeLink evidence and the May 2005 exhaust announcement must not be presented as launch-day availability. Offer a late-model-year historical profile when needed. Do not infer exact change days from month-level evidence.

Deliverable: `src/data/catalog.*`, a validation schema, source references, and an unresolved-items ledger. Exit condition: each enabled item has supported availability, explicit price status and compatible imagery status.

## Phase 3 — obtain and validate vehicle assets

This is the largest fidelity dependency. Research references are available, but a matched production asset set is not.

First seek original Subaru press imagery, period configurator images and suitably usable photographs. Record origin and production-use status. Inspect actual 2005 U.S. details: bodywork, rear wheel-arch trim, wheels, lights, scoop, rear wing, left-hand-drive cabin and six-speed controls.

Build a consistent exterior set for all five paints and both wheel finishes. Keep camera angle, framing, background, ground shadow, scale and ride height aligned. Obtain at least front three-quarter, side and rear three-quarter views for each combination.

For rotation, prefer an accurate model rendered into a synchronized turntable image sequence. If using 24 frames per combination, budget 240 base exterior frames plus visible accessory variants. Verify model geometry and material appearance against period evidence before generating the full set. A three-angle photo gallery must not be labeled “360°.”

AI-generated imagery must not serve as historical evidence. If used to prepare backgrounds or proposed visuals, inspect the car geometry and option details manually and label derived assets in the manifest. Do not accept invented trim, modern components or changing wheel geometry between frames.

Prepare accessory imagery for mirror variants, extended armrest, titanium knob, both gauge arrangements, blue mats, fog lamps, hood deflector, exhaust and non-visible items such as the alarm. Interior selections require either accurate composited layers or distinct verified views. For each option, specify whether it changes the large vehicle view or only its product detail image.

Deliverable: `public/assets/2005-sti/`, `asset-manifest.json`, and a contact sheet covering all required states. Exit condition: ten complete exterior combinations and accurate core accessory pictures; missing assets are tracked explicitly and block a fidelity-complete release.

## Phase 4 — implement the application foundation

Proposed stack: React, TypeScript and Vite with custom CSS. Use established stable dependency versions at implementation time and a lockfile. The interface needs precise styling; avoid a generic component theme that forces different proportions.

Keep these concerns separate:

| Area | Responsibility |
|---|---|
| `data/` | Validated historical catalog and asset manifest |
| `domain/` | Selection rules, package expansion and price calculation |
| `state/` | Reducer/actions, persistence, migration and share-link parsing |
| `components/` | Header, steps, viewer, swatches, cards, dialogs and price bar |
| `screens/` | Trim, colors/wheels, packages, accessories and summary |
| `styles/` | Measured tokens, responsive layouts and motion |
| `tests/` | Pricing fixtures, compatibility, journeys and visual baselines |

Use a single normalized configuration state. Derive totals and included items; do not store conflicting copies. Support browser back/forward, reload restoration and a versioned share URL. Reject or safely normalize invalid/stale URL values. Store only build choices locally; no account or personal data is needed.

Deliverable: an end-to-end local scaffold with placeholder asset indicators restricted to development. Exit condition: navigation and state persistence work before final visual polish.

## Phase 5 — reproduce every screen

| Screen | Reference | 2005 adaptation |
|---|---|---|
| Trim | `01-trim.png` | One STI card with correct fixed specification; no invented trim choices |
| Colors | `02`, `03`, `04` | Five paints, fixed interior, gold/silver wheel control, matching exterior/interior/combined modes |
| Packages | `05`, `06` | Three researched package records, correct price status and included items; matching details dialog |
| Accessories | `07`, `08` | Categorized historical accessories, product imagery, add/remove states and dependency feedback |
| Summary | `09` plus full page | Car image, selections, edit links, itemized historical charges, destination and honest total status |

Match the dark header, horizontal progress navigation, pale vehicle stage, blue selection buttons, restrained typography and persistent bottom price/next bar. Keep research explanations in a compact source/details panel rather than expanding every card into a dossier.

The current-site Model step can be represented as the completed 2005 Impreza selection. Add the wheel choice within the color/appearance flow without inventing a separate trim. Exactly one interior remains selected and marked standard.

Modern inventory, offers and dealer buttons need meaningful replacements because the configured car is historical. Preserve their visual treatment where useful, but use “Save Build,” “Share Build,” and “Print / Download Build.” Do not simulate live factory ordering, contemporary incentives or available 2005 inventory. Share copies a URL or uses the device share sheet; no automatic email is sent.

Deliverable: all screens and dialogs with functional controls. Exit condition: a user can configure, revise, save, share and print a build without dead ends.

## Phase 6 — pricing and compatibility behavior

- Exactly one paint, wheel finish, interior and pricing profile.
- Mirror variants are mutually exclusive; gauge arrangements are mutually exclusive.
- Adding a package includes its components and charges only the package price.
- Adding a package over individually selected components replaces duplicate charges deterministically.
- Removing a package removes its included selections unless the user explicitly retains eligible items individually; explain resulting changes before applying them.
- Choosing the three-gauge pack when the performance package is selected requires an explicit conflict resolution. Do not silently remove a paid package.
- Fog lamps replace closed fog covers, with correctly matched surrounds.
- Availability changes across pricing profiles must trigger a clear notice and a deliberate selection adjustment.
- Unpriced confirmed equipment stays visible in the summary, with known subtotal and a count of unpriced items.
- Apply destination once and identify parts-only/installation exclusions in the summary.

Reproduce all six original sticker totals using their observed per-car prices, including the $439/$445/$449 shifter variants. These fixture overrides do not imply a proven universal date schedule.

## Phase 7 — fidelity, accessibility and performance checks

Start comparison at the captured 390 × 844 viewport. Use the same UI state and scroll position; compare geometry separately from unavoidable 2026-versus-2005 image/text differences. Correct header height, bottom bar, vehicle scale, spacing, button placement and typography before small decorative differences.

Test 360, 390 and 430-pixel mobile widths, tablet and desktop. Check iOS/Android safe areas, landscape, keyboard visibility, long accessory names and 200% text enlargement. Desktop behavior remains provisional until supported by desktop reference captures.

Use semantic controls, labeled swatches, visible focus, keyboard-operable selection and rotation, dialog focus containment/return, live price announcements and reduced-motion behavior. Never rely on paint color alone for selected state.

Optimize responsive AVIF/WebP imagery, reserve image dimensions, preload the first selected view and lazy-load other rotations/accessory images. Swatch changes should preserve layout and avoid flashing a wrong-color car. Measure production output; target LCP ≤2.5 seconds, CLS ≤0.1 and INP ≤200 ms under an explicitly recorded mobile test setup. Treat those as acceptance targets, not unmeasured claims.

Meaningful automated checks cover arithmetic, package deduplication, conflicts, temporal availability, unknown amounts, persistence/share restoration, malformed state and complete user journeys. Use visual regression for stable states and manual review for car/paint authenticity.

## Delivery order and release gates

1. Reference specification and normalized catalog.
2. One complete vertical slice: blue/gold STI through all steps and a correct summary.
3. Ten exterior combinations and verified accessory imagery.
4. Full selections, dependency behavior, historical pricing profiles and exports.
5. Mobile visual comparison, responsive coverage and accessibility/performance validation.
6. Reviewable local production build, screenshots, documented remaining limitations and deployment instructions.
7. Publish when a deployment destination is selected and publication is requested.

Do not call the work complete merely because the UI shell looks convincing. Completion requires all enabled selections to persist, price correctly, enforce compatibility, show accurate visuals and survive summary editing/share restoration. An unresolved historical price or unavailable matched image must be explicitly reported, not filled with a plausible invention.

## Final handoff

Provide runnable source, locked dependencies, a short README, production build instructions, reference and final screenshots, asset provenance, historical catalog, passed validation results and an itemized limitations list. Keep research artifacts intact so future corrections can be traced back to their evidence.
