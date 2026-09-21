# Development verification — September 21, 2026

## Last completed checks

These checks predate the final three-angle, fixed-May and accessory-image changes. Per user instruction, the updated build will not be tested until explicitly requested.

- `npm test`: 30 tests pass across pricing/rules, export documents and asset coverage.
- Six original window-sticker configurations reproduce their documented totals with the correct per-sticker price overrides.
- `npm run build`: TypeScript and both production entrypoints (`index.html`, `print.html`) pass.
- All ten front-view paint/wheel selections were exercised through the browser and pointed to distinct, correct WebP files. The added side/rear views have not yet had their requested final test pass.
- Generated PNGs remain in `references/2005-sti/studio-originals/`. WebP delivery files total 1.03 MB versus 17.64 MB original PNGs, a 94% size reduction. This is an asset-size measurement, not a measured LCP claim.
- Browser document width equals viewport width at 360, 390, 430, 768 and 1440 pixels. Desktop layout is an adaptation; no claim of a measured Subaru desktop match.
- Interior and combined exterior/interior modes worked. The customer-facing original-photo option has since been removed.
- The pricing-period dialog has since been removed and all builds now migrate to the fixed May 2005 profile.
- Titanium knob detail displays the correct six-speed catalog reference. Its current $179 derived reference price has not yet had the requested final test pass.
- Printable-copy entrypoint opens with the selected paint, wheel finish, fixed May 2005 pricing, line items and destination-inclusive total. Export-domain tests cover unknown prices, package deduplication and installation exclusions.
- The embedded browser did not expose a completed HTML download event in two attempts. A printable-copy fallback is provided and browser-verified; direct download remains implemented using a conventional Blob/download link but is not claimed browser-verified here.
- Earlier pass verified package inclusion, gauge conflict replacement, Alaska destination, reload persistence and back/forward navigation. Pricing engine remains covered by regression tests.
- No console errors/warnings appeared during the current export investigation.

## Review artifacts

- `mobile-colors-v2.png`: refined studio/color screen.
- `mobile-combined-v2.png`: combined exterior/interior view.
- `mobile-pricing-removal.png`: superseded historical-period behavior retained only as an earlier development record.
- `mobile-accessory-detail-v2.png`: catalog image and historical-price detail.
- `desktop-summary-v2.png`: wide summary layout.
- `studio-gallery.png`: earlier ten-image front-view gallery capture.
- `/asset-review.html`: live 30-image review gallery.

## Remaining release gates

The viewer is a labeled AI-assisted reconstruction, not calibrated paint imagery or exact factory geometry. Fine badges, wheel details and reflections vary. The app has three matched named angles rather than a 360 sequence, and accessories are not composited onto the car or cabin. All accessory cards have images, but three are labeled reconstructions because verified period product photos were not recovered. Public reuse permissions for brochure/catalog images remain unestablished. The 2005 SPT exhaust price remains unresolved. No public deployment or measured mobile performance benchmark is claimed. The current changes await the user-requested final test pass.
