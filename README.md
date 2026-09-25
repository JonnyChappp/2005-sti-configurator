# 2005 WRX STi Build & Price

Mobile-first React / TypeScript configurator based on the saved Subaru build-flow references. U.S. model-year 2005 scope.

Live site: https://jonnychappp.github.io/2005-sti-configurator/

## Run

Requires Node 20.19+ (tested with 20.20.2).

```sh
npm ci
npm run dev
npm test
npm run build
```

Local preview: http://127.0.0.1:5173. Production output: `dist/`.

## Implemented

- Trim, paint/wheels, packages, accessories and itemized summary.
- Five paints, two BBS finishes, a touch-controlled 360° exterior, fixed blue/black Ecsaine interior and six-speed manual.
- 13 researched accessories and three equipment groups, with availability dates.
- Fixed May 2005 MSRP and full verified option availability, with contiguous U.S. / Alaska destination charges.
- Package de-duplication, incompatible mirror/gauge replacement confirmation, optional retention of package components.
- Unknown prices remain unknown and visibly make the total incomplete.
- Local persistence, validated share URLs, step history, copy link, print/PDF stylesheet, offline HTML export and standalone printable copy.
- Source links in equipment details, independent historical archive disclosure.
- Domain, export and asset test coverage, including six original window-sticker fixtures and all three interior showcase views.

## Project map

- `src/catalog.ts`: projects preserved research into the application catalog; dollars converted to integer cents.
- `src/engine.ts`: pure availability, selection, normalization and pricing functions.
- `src/App.tsx`: React experience and dialogs; `src/CarViewer3D.tsx` renders the interactive exterior; `src/main.tsx` mounts the application.
- `src/style.css`: mobile-first reference-inspired layout and print styling.
- `references/2005-sti/`: original research, sources and evidence.
- `references/impreza-mobile/`: captured modern Subaru reference screens.
- `docs/`: visual reference notes, asset provenance and validation results.

## Image coverage and remaining fidelity work

All ten paint × BBS finish combinations have matching 1536 × 1024 front, side and rear studio illustrations. Paint and wheel selection update every view in trim, colors and summary. These are **AI-assisted reconstructions**, labeled in the viewer, not authentic factory renders. Fine badges, wheel details and paint appearance remain approximate.

All 13 selectable accessories have a detail image. The security upgrade now uses a sharp period-kit reconstruction instead of the brochure's tiny window-decal crop. Hood-protector and fog-lamp cards follow all five selected paint colors. HomeLink mirror, the blue no-logo J5010SS700 carpet-mat set and wheel locks also use documented reconstructions. The carpet-mat color and lack of embroidery follow Subaru's exact catalog listing for the 2004–07 WRX STI. Generic five-speed parts and incompatible gauge photos were rejected.

The exterior now uses an interactive WebGL model with full horizontal rotation, constrained vertical tilt and disabled zoom. Its physical materials update for all five paints and both wheel finishes; the earlier studio images remain as loading and WebGL fallbacks. The free base mesh is “Subaru Impreza WRX STi 2004 Custom” by MAC ULT ARTS, used under CC BY 4.0 and modified by hiding the obvious diffuser, canards, splitter and bumper attachments. The mesh is a close Blobeye representation rather than factory CAD, so several fine details remain approximate. The cockpit, full-cabin and rear-seat interior reconstructions are grounded in official 2005 Subaru brochure photography and preserve the U.S. left-hand-drive blue/black Ecsaine cabin. The exposed door jamb in the rear view follows all five selected factory paint colors. Selected accessories are not yet composited onto the vehicle or cabin. Original PNGs are preserved under `references/2005-sti/studio-originals/` and `references/2005-sti/interior-originals/`; reproduce delivery files with `node scripts/optimize-assets.mjs`.

Source-photo and brochure publication permissions have not been established; this is a local research preview.

The titanium knob uses a $179 derived reference price: the documented $928 package less its $439 shifter and $310 boost gauge, consistent with the exact-sum structure of the other equipment groups. The SPT exhaust price remains null because no reliable 2005 price circular was recovered. Candidate accessories without confirmed U.S. model-year evidence remain outside the selectable catalog. The configurator is fixed to the May 2005 profile and its $32,445 base MSRP so every verified late-model-year selection is available. Short-shifter sticker variations are disclosed. Share links require a reachable deployment URL to work on another computer.

Generation prompts and per-variant provenance: `docs/studio-generation.json` and `docs/interior-generation.json`. Catalog image mappings: `src/assets.ts`. Extracted catalog originals remain under `references/2005-sti/extracted/`. A combined exterior/interior view and offline HTML build download are also available.

The embedded preview did not expose HTML download completion during testing. The **Open Printable Copy** fallback is verified and works without a download event.
