# 2005 Subaru Impreza WRX STi — U.S. options research

Research date: September 20, 2026. Scope: **U.S. model-year 2005**, historical U.S. dollars. This follows the U.S. Subaru builder used as the design reference. Canadian, European and Japanese offerings must remain separate datasets.

## What the evidence establishes

The core configuration is now well established, and six original window stickers provide unusually strong price evidence. The remaining uncertainty is concentrated in standalone accessory prices, dealer-installed equipment, and dates of introduction. This is a substantial working catalog, **not a claim that every dealer accessory has been conclusively identified and priced**.

The research combines Subaru sales literature, a Subaru launch release, a Subaru service magazine, original stickers, dealer records, period magazine tests, historical price guides, current OEM parts catalogs, and owner discussions. The [source register](SOURCES.md) explains what each of the 33 sources can support. The [JSON catalog](options.json) preserves conflicting observations instead of silently replacing them with guesses.

## 1. The actual factory configuration

| Choice | U.S. MY2005 offering | Builder treatment |
|---|---|---|
| Body / model | WRX STi four-door sedan | Fixed |
| Engine / transmission | 2.5-liter turbo; six-speed manual | Fixed |
| Interior | Blue perforated Ecsaine with black trim | Fixed |
| Wheels | Gold or silver 17×8 BBS | Two no-cost selections |
| Paint | Five colors below | Five no-cost selections |

The manufacturer color matrix establishes the five paints and single interior. The launch release establishes both wheel finishes; original stickers list those wheels as standard equipment rather than a paid upgrade. Thus the base visual matrix is **five paints × two wheel finishes = ten combinations**. [Subaru brochure, PDF pp.24–26][S01] · [launch release][S03] · [gold-wheel sticker][S22] · [silver-wheel sticker][S24]

| Official U.S. paint name | Paint code | Finish | Upgrade charge |
|---|---|---|---:|
| Aspen White | 51E | Solid | $0 |
| Crystal Gray Metallic | 48W | Metallic | $0 |
| Obsidian Black Pearl | 32J | Pearl | $0 |
| Platinum Silver Metallic | 01G | Metallic | $0 |
| WR Blue Pearl | 02C | Pearl | $0 |

Availability comes from Subaru's STI-specific matrix; codes are cross-checked against the [paint archive][S13] and photographed vehicles. A paint supplier's all-Impreza list is not an STI option list. In particular, San Remo Red and Regal Blue Pearl must not appear in this U.S. STI builder. [S01][S01]

The **300 hp / 300 lb-ft engine, DCCD AWD, Brembo brakes, HID headlights, large rear wing, intercooler spray, automatic climate control and immobilizer** belong in standard equipment. The 140-watt six-disc/six-speaker stereo became standard for 2005. Charging for that stereo would recreate a 2004 distinction in the wrong model year. [Original sticker][S24] · [Subaru launch release][S03]

No U.S. 2005 STI automatic, wagon, sunroof, leather-seat package, heated seats or WRX Premium package was established. The ordinary WRX's option columns cannot be copied into the STI column. [Subaru equipment matrix][S01]

## 2. There was more than one correct base MSRP

| Pricing period | Base MSRP | Normal destination | Base plus destination |
|---|---:|---:|---:|
| Launch in 2004 | $32,195 | $575 | $32,770 |
| Dealer deliveries from September 2004, as reported | $32,295 | $575 | $32,870 |
| Dealer deliveries from May 2005, as reported | $32,445 | $575 | $33,020 |

The launch price and $575 destination are explicit in Subaru's June 1, 2004 release. It gives Alaska destination as $725. September and May change months come from the contemporary pricing compilation; original stickers corroborate $32,295, and a period road-test table corroborates $32,445. Exact effective days were not recovered. [S03][S03] · [S02][S02] · [S19][S19] · [S21][S21] · [S09][S09]

**Implementation consequence:** preserve a pricing profile/date rather than one unqualified “2005 MSRP.” Dealer delivery timing is not necessarily the same as the customer's purchase date. The default can be the documented launch profile, with later pricing retained in the data. Do not claim the entire accessory tariff changed on the same dates as the vehicle price.

Taxes, registration, negotiated discounts, financing and dealer fees are outside these sticker totals. No national dealer markup or advertising fee should be invented.

## 3. Confirmed accessories and historical price evidence

“Confirmed” below means there is evidence for the accessory on this model. Price confidence is a separate question. A parts-only price must not masquerade as an installed charge.

| Accessory | Historical price / observation | Evidence and decision |
|---|---:|---|
| STI security-system upgrade | **$232** | Original blue and white stickers. Separate from standard immobilizer. [S22][S22], [S24][S24] |
| Black armrest extension | **$128** | Multiple stickers. [S05][S05], [S20][S20], [S21][S21] |
| Auto-dimming mirror + compass | **$183** | Historical price table; also consistent with $415 package less $232 alarm. [S04][S04], [S05][S05] |
| Auto-dimming mirror + compass + HomeLink | **$268** | Period guide; original sticker still needed. Reported as a new accessory in October 2004. [S02][S02] |
| STI six-speed short shifter | **$439 / $445 / $449** | All three are visible on original stickers. Use $439 for the documented launch example; retain other observations. [S24][S24], [S20][S20], [S19][S19] |
| STI column-mounted boost gauge | **$310** | Original black-car sticker. [S19][S19] |
| Six-speed titanium knob | **$179 derived reference price** | $928 package less the documented $439 shifter and $310 boost gauge. The two mirror equipment groups are also exact component-price sums, supporting this interpretation. [S21][S21], [S06][S06] |
| STI three-gauge pack + housing | **$740** | Original blue-car sticker resolves the generic $725 guide conflict. [S22][S22] |
| Blue carpeted STI mats | **$80** | Two stickers; guide reports October 2004 introduction. [S19][S19], [S20][S20], [S02][S02] |
| Wheel locks | **$41** | Repeated on five stickers. [S05][S05], [S19][S19], [S20][S20], [S22][S22], [S24][S24] |
| Hood protector / deflector | **$76, not installed** | Historical guide. Keep distinct from soft front-end covers. [S02][S02] |
| Fog-lamp kit | **$354 parts-price lead** | Model availability confirmed; price from dealer-accessory guide, installation excluded. Complete priced kit contents remain uncertain. [S01][S01], [S02][S02] |
| SPT STI cat-back exhaust | **Price unresolved** | Subaru explicitly announces it in May 2005. This is a real period offering, not merely a later compatible part. [S10][S10] |

### Packages and dependencies

| Package | Price | Included equipment | Evidence |
|---|---:|---|---|
| Popular Equipment Group 2B | **$415** | Alarm + auto-dimming compass mirror | Exact name and amount on original stickers. [S05][S05], [S20][S20] |
| Popular Equipment Group with HomeLink | **$500** | Alarm + compass/HomeLink mirror | Guide combines 2C/2D labels; exact STI suffix remains unverified. [S02][S02] |
| STI Performance Group | **$928** | Six-speed short shifter + column boost gauge + six-speed titanium knob | Original sticker confirms contents; period reviews agree. [S21][S21], [S06][S06], [S08][S08] |

The performance package's content is settled even though its exact order suffix is not. One guide calls its knob “MOMO”; the original sticker explicitly identifies titanium. The stock shifter, short shifter and knob must be modeled as related components: buying the package does not add a second shifter or a second knob.

The three-gauge pack measures **boost, oil temperature and voltage**, and uses a dashboard housing in the clock location. It is an alternative to the column boost gauge. Do not use the different Legacy pack's oil-pressure specification. Current OEM kit documentation identifies the STI gauge assembly and housing. [S14][S14]

For the convenience packages, $183 + $232 = $415 and $268 + $232 = $500. These observed sums do **not** establish a package discount. The pricing engine should charge the package once and mark its components included.

## 4. Six original stickers: reproducible historical builds

These are transcribed from photographs/scans, not generated VIN-decoder recreations. The arithmetic has been checked programmatically in `build_research.py`.

| Car / VIN suffix | Base | Options shown | Destination | Sticker total |
|---|---:|---|---:|---:|
| Crystal Gray / 504987 | $32,195 | Locks $41; armrest $128; PEG2B $415 | $575 | **$33,354** |
| Obsidian Black / 512251 | $32,295 | Shifter $449; boost $310; locks $41; mats $80 | $575 | **$33,750** |
| Obsidian Black / 510972 | $32,195 | Shifter $445; locks $41; armrest $128; PEG2B $415; mats $80 | $575 | **$33,879** |
| Platinum Silver / 510361 | $32,295 | Armrest $128; performance package $928 | $575 | **$33,926** |
| WR Blue / 501349 | $32,195 | Alarm $232; gauge pack $740; locks $41; armrest $128 | $575 | **$33,911** |
| Aspen White / 500521 | $32,195 | Shifter $439; alarm $232; locks $41 | $575 | **$33,482** |

Evidence: [gray][S05], [black 512251][S19], [black 510972][S20], [silver][S21], [blue][S22], [white][S24]. Saved images and PDFs are linked in the source register. These six records provide useful acceptance cases for the future builder's pricing engine.

The white sticker was issued to Langston Subaru in Monroeville. The later selling description uses Cochran's name for the dealership history; the sticker's wording should be retained when reproducing that document.

## 5. Dealer accessories: evidence without false certainty

### Subwoofer: possible dealer installation, not yet a verified STI order option

An archived dealer record for the white STI documents **subwoofer installation at 725 miles**. Its PDI record at 15 miles separately documents a mirror, carpet mats and a wheel swap. This is stronger evidence than forum recollections that such work occurred on an actual car. However, the reprinted records obscure dates and omit usable part identities. Their internal line amounts cannot be promoted to national MSRP. [Dealer records, PDF pp.26–28][S25]

The historical guide marks the normal WRX D2B subwoofer unavailable in the STI order column. Both statements can coexist: a dealer can install equipment that is not a factory/port ordering choice. Keep an “audio dealer-installation research” record, but do not label the generic $273 WRX subwoofer a confirmed STI factory option. [S02][S02]

### Other candidates retained in the catalog

| Candidate | What remains to establish |
|---|---|
| Engine-block heater | Exact U.S. period kit and price. Canadian period availability and present STI fitment are corroborated. [S18][S18], [S31][S31] |
| Battery warmer | U.S. STI-specific kit/application and period price confirmation |
| Car cover and storage bag | Fit around the tall STI wing; exact SKU and price |
| Cigarette lighter | Part identity and historical accessory charge |
| Soft full/front hood cover | STI bumper/scoop compatibility |
| Sedan rack and roof attachments | U.S. sedan base/mounting kit, accessory compatibility, contemporary prices |
| Speaker/tweeter upgrades | Whether there was an upgrade beyond the already upgraded standard system |
| Splash guards | Correct STI application rather than a generic Impreza photograph |

The remaining generic accessories are leads from the U.S. brochure, not established STI selections. A visual accessory pictured beside a WRX can easily be wrong for the STI's bodywork. [S01][S01]

### SPT exhaust and other performance parts

The May 2005 **End Wrench** announcement establishes that an STI-specific SPT cat-back existed by that month. It does not establish the exact introduction day, stock number, or price. The $449 generic exhaust and $375 muffler in the historical WRX table should not be assigned to it. [Subaru service magazine, PDF p.7][S10]

A later Subaru catalog identifies compatible exhaust, braces, mounts, hoses and STI-specific suspension pieces. That catalog reaches model year 2012 despite its mirror filename containing “2011.” It is useful for fitment, but it cannot prove that each item could be bought in 2004–05. The JSON contains a separate list of later-fitment leads, all disabled by default. [S12][S12]

## 6. Part-number traps

| Item | Useful identity | Limitation |
|---|---|---|
| Six-speed short shifter | C1010FE001; later C1010FE004 | Do not use WRX five-speed assembly. [S11][S11], [S16][S16] |
| Titanium six-speed knob | C1010FE100 | Part identity plus package arithmetic support the $179 reference price; no standalone 2005 sticker has been recovered. [S11][S11], [S21][S21] |
| STI three-gauge assembly | H5010FE056 + H0010FE920OE housing | Kit and bare assembly differ. [S14][S14] |
| STI column gauge | H5010FE055 in later catalog | Original revision must be checked before sourcing an exact historic asset. [S12][S12] |
| HomeLink mirror | H501SAG010 + H501SSA040 adapter | Later catalog relationship; verify contemporary revision. [S15][S15] |
| Fog-kit candidate | H4510FE020 + appropriate surrounds | Current catalog contains erroneous paint applications and a mixed-color component row. [S17][S17] |
| Blue mats | J5010SS700 in later catalog | Linking this definitively to original B5B and its logo treatment needs more evidence. [S12][S12] |

A current retailer's “fits 2005 STI” filter is insufficient. One fog-kit page even offers Regal Blue and San Remo Red selections under STI; those colors fail Subaru's U.S. model-year matrix. Product fitment and factory paint availability answer different questions.

## 7. Overseas catalog findings

The global accessory catalog was printed in **August 2004**, and its application tables are useful period evidence. It lists additional STI-applicable items such as visors, protection trim, other six-speed knobs, a blue boot, a sedan rack and parking aid. It also contains regional notes, including a right-hand-drive brace and European navigation. These have been retained as **other-market leads**, with no invented U.S. prices. [Global catalog, PDF pp.13–14][S11]

A genuine Subaru-branded accessory can still be unavailable through U.S. distribution. Likewise, “2005 STI” can refer to a different market's model designation. The initial builder should not silently mix these catalogs. Japanese special editions, later STI Limited equipment, dealer conversions and aftermarket performance packages would need separate explicitly identified experiences.

## 8. Conflicts resolved, and those still open

| Question | Conclusion |
|---|---|
| $725 or $740 three-gauge pack? | **$740 documented on an STI sticker.** |
| MOMO or titanium in the $928 package? | **Titanium**, documented on an original sticker. |
| $439, $445 or $449 short shifter? | **All documented.** Dates/reasons for differences unresolved. |
| $159 or $179 standalone titanium knob? | **$179 selected.** It is the exact residual of the documented $928 package after its $439 shifter and $310 boost gauge; the other equipment groups are exact component sums. |
| No STI SPT exhaust? | Incorrect as an all-year claim: Subaru announces one in May 2005. |
| Optional stereo? | Standard six-disc/six-speaker system for MY2005. |
| Gold wheels cost extra? | No charge demonstrated; both finishes are standard configurations. |
| Mats standard? | No; stickers charge for them. Some early dealer-installed mats are not identified as the later blue option. |
| $33,890 road-test build? | A separate source observation; do not mix its accessory prices with sticker tariffs. |

The Carey Russ table lists shifter $395, knob $170, boost $230 and mats $75: $32,445 + $395 + $170 + $230 + $75 + $575 = $33,890. It is internally arithmetically consistent. The source does not sufficiently explain why those accessory figures differ, so “parts versus installed” remains a hypothesis rather than a finding. [S09][S09]

## 9. Image research and builder behavior

The [asset-reference guide](ASSET-REFERENCES.md) provides a source for each paint and flags modifications. Existing auction galleries are references, **not a complete matched set of production-ready car renders**.

For the actual site:

1. Build the ten paint/wheel states with consistent camera, lighting, ride height and stock bodywork.
2. Preserve one correct 2005 interior. Change only the selected accessory: mirror, knob, gauge, mats or armrest.
3. Treat fog lamps as a visible replacement of the closed covers; do not overlay both.
4. Keep package contents and individual selections synchronized, with no duplicated charges.
5. Show a historical price profile and distinguish known subtotal from unpriced accessories.
6. Keep unresolved U.S. candidates, foreign-market items and later-fitment parts out of an asserted “fully accurate” total until verified.

## 10. Remaining documents that would close the gaps

The most valuable missing document is the **complete U.S. 2005 Impreza/WRX/STI accessory booklet with its application and price sheets**. Its physical existence is established by the preserved booklet photographs, but those files do not contain the inside pages. [S26][S26]

Other useful targets are dated price-change bulletins, an original HomeLink-equipped STI sticker, a standalone titanium-knob sticker that could independently verify the derived amount, and the 2005 STI SPT exhaust launch/price circular. Subaru's service index identifies period accessory articles that could help settle mounting and revision details; the index itself is not a substitute for the articles. [S27][S27]

The current dataset is ready to guide the builder's structure and most of its historically priced selections. It intentionally leaves unknown amounts as `null`, records observed variants, and carries the unresolved work forward in concrete, item-specific form.

[S01]: https://www.auto-brochures.com/makes/Subaru/Impreza/Subaru_US%20Impreza_2005.pdf
[S02]: https://www.cars101.com/subaru/impreza/wrxsti2005.html
[S03]: https://www.theautochannel.com/news/2004/06/01/198066.html
[S04]: https://consumerguide.com/used/2002-07-subaru-impreza/
[S05]: https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-113/
[S06]: https://www.autoweek.com/news/a2090076/2005-subaru-impreza-wrx-sti/
[S08]: https://drivechicago.com/reviews/article/1203/exotic-sports-car-acceleration
[S09]: https://www.theautochannel.com/news/2009/03/18/453770.html
[S10]: https://automotivetechinfo.com/wp-content/uploads/2005/05/Subaru-EndWrench-May-2005.pdf
[S11]: https://www.subaru.ee/media/uf2lr0rf/impreza2005en.pdf
[S12]: https://www.auto-brochures.com/makes/Subaru/Accessories/Subaru_US%20Performance%20Parts_2011.pdf
[S13]: https://importarchive.com/subaru/impreza/2002-2007
[S14]: https://www.subarupartsdeal.com/parts/subaru-accessories_perf_gauge_pack_turbo_boost_oil_temp_volts_3_with_housing-kith5010fe056.html
[S15]: https://www.subarupartsdeal.com/parts/subaru-accessories_auto_dimming_mirror_compass_w_homelink_with_adapter-kith501sag010.html
[S16]: https://www.subarupartsdeal.com/accessories/subaru-impreza_sti-performance_short_throw_shifter.html
[S17]: https://www.subarupartsdeal.com/accessories/subaru-impreza_sti-fog_light.html
[S18]: https://www.subaru.ca/Content/7907/media/en-ca/download/2005ImprezaWRXSTi.pdf
[S19]: https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-129/
[S20]: https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-73/
[S21]: https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-39/
[S22]: https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-128-2/
[S24]: https://lbi-limited.imgix.net/2024/05/Window-Sticker-0521.pdf
[S25]: https://lbi-limited.imgix.net/2024/05/Prior-Owner-Service-Records-0521-1.pdf
[S26]: https://lbi-limited.imgix.net/2024/05/Period-Brochures-0521.pdf
[S27]: https://static.nhtsa.gov/odi/tsbs/2019/MC-10163011-9999.pdf
[S31]: https://www.flatironstuning.com/a0910as100
