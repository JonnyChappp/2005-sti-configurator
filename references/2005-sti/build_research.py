"""Build the research catalog and source register; not website implementation."""
import json
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sources = {}
def source(key, title, url, kind, use, local=None):
    sources[key] = dict(title=title, url=url, kind=kind, evidentiary_use=use,
                        accessed='2026-09-20', local_file=local)

source('S01','Subaru of America: 2005 Impreza brochure','https://www.auto-brochures.com/makes/Subaru/Impreza/Subaru_US%20Impreza_2005.pdf','primary_manufacturer_brochure_mirror','PDF pp.24–27: colors, specifications, trim applicability. Generic accessories pp.20–22 require separate STI fitment verification.','sources/2005-us-impreza-brochure.pdf')
source('S02','Joe Spitz / Cars101: 2005 WRX and STi','https://www.cars101.com/subaru/impreza/wrxsti2005.html','secondary_period_pricing_compilation','Order codes, price-change months, accessory table. Contains transcription and applicability errors; corroboration recorded per item.')
source('S03','Subaru announces 2005 pricing, June 1, 2004','https://www.theautochannel.com/news/2004/06/01/198066.html','primary_manufacturer_press_release_republication','Launch MSRP, delivery charge and new standard equipment. Retrieved directly when web reader failed.')
source('S04','Consumer Guide: 2002–07 Subaru Impreza, 2005 prices','https://consumerguide.com/used/2002-07-subaru-impreza/','secondary_historical_price_table','Independent accessory-price cross-check; internally inconsistent gauge description and stale base-price date.')
source('S05','Crystal Gray original window sticker, VIN ending 504987','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-113/','primary_window_sticker_in_auction_gallery','Visually transcribed: $32,195 base, $41 locks, $128 armrest, $415 PEG2B, $575 delivery, $33,354 total.','sources/window-sticker-crystal-gray-5jj.jpg')
source('S06','Autoweek: 2005 Subaru Impreza WRX STi, September 19, 2004','https://www.autoweek.com/news/a2090076/2005-subaru-impreza-wrx-sti/','period_firsthand_magazine_review','Corroborates $928 performance package and titanium knob.')
source('S07','Car and Driver: Evo MR versus STi, February 1, 2005','https://www.caranddriver.com/reviews/comparison-test/a15387088/2005-mitsubishi-lancer-evolution-mr-edition-vs-subaru-impreza-wrx-sti-comparison-tests/','period_firsthand_magazine_comparison','Cross-checks MY2005 changes; tested-car price is not a universal option tariff.')
source('S08','Dan Jedlicka / DriveChicago: Exotic sports car acceleration','https://drivechicago.com/reviews/article/1203/exotic-sports-car-acceleration','period_firsthand_road_test','Additional $928 package corroboration.')
source('S09','Carey Russ STi road-test specification table, republished March 18, 2009','https://www.theautochannel.com/news/2009/03/18/453770.html','period_road_test_later_republication','2005-car table lists $32,445 base and $33,890 total; accessory prices differ from stickers. Related June 23, 2005 review: /news/2005/06/23/134049.html.')
source('S10','Subaru End Wrench, May 2005, Number 30','https://automotivetechinfo.com/wp-content/uploads/2005/05/Subaru-EndWrench-May-2005.pdf','primary_manufacturer_service_magazine','PDF p.7 announces a new STI SPT cat-back exhaust. No price or part number. Read via web; direct file download returned HTTP 403.')
source('S11','Fuji Heavy Industries: Impreza accessories, printed August 2004','https://www.subaru.ee/media/uf2lr0rf/impreza2005en.pdf','primary_global_accessory_catalog','Visually inspected PDF pp.13–14 application matrix; print code 05AC 47E 2004.08. Regional applicability is not U.S. availability.','sources/2005-global-accessories.pdf')
source('S12','Subaru Genuine Performance Parts, later catalog covering 2012','https://www.auto-brochures.com/makes/Subaru/Accessories/Subaru_US%20Performance%20Parts_2011.pdf','primary_later_manufacturer_catalog','Filename says 2011; content reaches 2012. Useful for fitment and supersessions, not 2005 introduction dates.','sources/2011-us-performance-parts.pdf')
source('S13','ImportArchive: U.S. Impreza paint archive','https://importarchive.com/subaru/impreza/2002-2007','secondary_paint_archive','Paint-code cross-reference only; STI color availability comes from S01.')
source('S14','OEM STI gauge-pack kit and housing','https://www.subarupartsdeal.com/parts/subaru-accessories_perf_gauge_pack_turbo_boost_oil_temp_volts_3_with_housing-kith5010fe056.html','current_oem_parts_retail_catalog','H5010FE056 plus H0010FE920OE; current prices are not period MSRP.')
source('S15','OEM HomeLink mirror with adapter','https://www.subarupartsdeal.com/parts/subaru-accessories_auto_dimming_mirror_compass_w_homelink_with_adapter-kith501sag010.html','current_oem_parts_retail_catalog','H501SAG010 plus H501SSA040; verify revision for historical visual fidelity.')
source('S16','OEM STI short-throw shifter listings','https://www.subarupartsdeal.com/accessories/subaru-impreza_sti-performance_short_throw_shifter.html','current_oem_parts_retail_catalog','C1010FE001 superseded by C1010FE004; current price not historic MSRP.')
source('S17','OEM fog kits and colored surrounds','https://www.subarupartsdeal.com/accessories/subaru-impreza_sti-fog_light.html','current_oem_parts_retail_catalog','H4510FE020 with surrounds; catalog erroneously suggests unavailable STI paint colors and has a mismatched silver/white component row. Do not import automatically.')
source('S18','Subaru Canada: 2005 Impreza WRX STi specifications','https://www.subaru.ca/Content/7907/media/en-ca/download/2005ImprezaWRXSTi.pdf','primary_other_market_specification','Confirms Canadian block-heater option; C$47,995 is Canadian and must never enter U.S. pricing.')
source('S19','Obsidian Black original sticker, VIN ending 512251','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-129/','primary_window_sticker_in_auction_gallery','Visually transcribed: $32,295 base, $449 shifter, $310 boost, $41 locks, $80 mats, $575 delivery, $33,750 total.','sources/sticker-candidate-129-1.jpg')
source('S20','Obsidian Black original sticker, VIN ending 510972','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-73/','primary_window_sticker_in_auction_gallery','Visually transcribed: $32,195 base, $445 shifter, $41 locks, $128 armrest, $415 PEG2B, $80 mats, $575 delivery, $33,879 total.','sources/sticker-candidate-73-2.jpg')
source('S21','Platinum Silver original sticker, VIN ending 510361','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-39/','primary_window_sticker_in_auction_gallery','Visually transcribed: $32,295 base, $128 armrest, $928 performance package, $575 delivery, $33,926 total. Package contents explicitly titanium 6MT knob, boost gauge, 6MT shifter. Package suffix visually ambiguous.','sources/sticker-candidate-39-2.jpg')
source('S22','WR Blue original sticker, VIN ending 501349','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-128-2/','primary_window_sticker_in_auction_gallery','Visually transcribed: $32,195 base, $232 alarm, $740 gauge pack, $41 locks, $128 armrest, $575 delivery, $33,911 total.','sources/window-sticker-blue.jpg')
source('S23','LBI Limited: Aspen White 2005 STi, VIN ending 500521','https://lbilimited.com/offerings/2005-subaru-impreza-wrx-sti/','firsthand_dealer_vehicle_documentation','Useful original exterior/interior gallery and accessory history. Seller summary mislabels paint Alpine White; sticker says Aspen White. Wheels were swapped by dealer.')
source('S24','Aspen White original window sticker, VIN ending 500521','https://lbi-limited.imgix.net/2024/05/Window-Sticker-0521.pdf','primary_window_sticker_scan','Visually transcribed: $32,195 base, $439 shifter, $232 alarm, $41 locks, $575 delivery, $33,482 total.','sources/window-sticker-aspen-white.pdf')
source('S25','Dealer historical repair-order printouts, VIN ending 500521','https://lbi-limited.imgix.net/2024/05/Prior-Owner-Service-Records-0521-1.pdf','primary_dealer_records_reprinted_2024','PDF p.27: PDI at 15 miles includes wheel swap, mirror and mats; p.26: subwoofer installation at 725 miles. Dates/part identities obscured; internal accounting is not national MSRP.','sources/aspen-white-dealer-records.pdf')
source('S26','Photographs of period booklets accompanying white car','https://lbi-limited.imgix.net/2024/05/Period-Brochures-0521.pdf','primary_booklet_cover_photographs','Existence of separate U.S. 2005 accessories booklet established; these are covers, not a complete scanned application/price list.','sources/period-booklet-covers.pdf')
source('S27','Subaru TechTIPS locator index, updated through June 2019','https://static.nhtsa.gov/odi/tsbs/2019/MC-10163011-9999.pdf','primary_manufacturer_index_nhtsa_host','PDF p.43 points to period mirror, subwoofer, heater and STI accessory bulletins. An index is not evidence of their full contents.','sources/subaru-techtips-index-through-2019.pdf')
source('S28','WR Blue 2005 STi gallery, BaT lot 67,553','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-67/','vehicle_photo_reference','Blue paint/gold BBS reference; aftermarket mudflaps, stereo and mats must be excluded from stock render.')
source('S29','Platinum Silver original-owner STi gallery, BaT lot 1,325','https://bringatrailer.com/listing/2005-subaru-sti/','vehicle_photo_reference','Useful stock body reference; later hitch and repaired paint are disclosed.')
source('S30','Obsidian Black STi gallery, BaT lot 21,163','https://bringatrailer.com/listing/2005-subaru-impreza-wrx-sti-20/','vehicle_photo_reference','Black paint/silver BBS reference; requires per-image review before use as stock asset.')
source('S31','Flatirons Tuning: genuine Subaru block heater','https://www.flatironstuning.com/a0910as100','current_oem_parts_retail_catalog','A0910AS100/101 family with older supersessions; physical STI fitment corroboration only, not 2005 retail price.')
source('S32','NASIOC: 2005 owner accessory discussion, April 2006','https://forums.nasioc.com/forums/showthread.php?t=993035','period_owner_account','Subwoofer and mirror lead; owner language does not establish factory orderability.')
source('S33','NASIOC: SPT exhaust discussion, August 2005','https://forums.nasioc.com/forums/showthread.php?t=829766','period_owner_discussion','Temporal cross-check only; muffler versus cat-back confusion prevents a reliable national STI price.')

def observation(amount, source_ids, basis='historical_msrp', note=''):
    return dict(amount_usd=amount, source_ids=source_ids, basis=basis, note=note)

options=[]
def option(id, name, category, amount, evidence, confidence, observations=None, **kw):
    options.append(dict(id=id,name=name,category=category,
        reference_price_usd=amount,price_confidence=confidence,
        availability_status=kw.pop('availability_status','confirmed_us_model_year'),
        source_ids=evidence,price_observations=observations or [],**kw))

option('alarm','Security system upgrade kit, STI','comfort_security',232,['S22','S24','S04'],'high',
       [observation(232,['S22','S24'])],note='Optional alarm; factory immobilizer and remote keyless entry are already standard.')
option('armrest','Center armrest extension, black','comfort_security',128,['S05','S20','S21'],'high',
       [observation(128,['S05','S20','S21'])],order_code='K5B',order_code_source='S02')
option('mirror_compass','Auto-dimming mirror with compass','comfort_security',183,['S04','S05'],'medium_high',
       [observation(183,['S04']),observation(178.43,['S25'],'dealer_internal_record','PDI line amount; not national MSRP, not confirmed customer charge.')],
       order_code='KYE',order_code_source='S02',exclusive_group='mirror',note='Also independently consistent with $415 package less $232 alarm.')
option('mirror_homelink','Auto-dimming mirror with compass and HomeLink','comfort_security',268,['S02','S15'],'medium',
       [observation(268,['S02'])],order_code='K5I',order_code_source='S02',exclusive_group='mirror',
       first_reported_available_month='2004-10',date_source='S02',parts=[dict(number='H501SAG010',role='mirror',evidence='S15'),dict(number='H501SSA040',role='adapter',evidence='S15')],
       note='Later parts catalog verifies kit relationship, not original revision or introduction day.')
option('short_shifter','STI six-speed short-throw shifter','performance',439,['S24','S19','S20','S04'],'high_for_observed_launch_price',
       [observation(439,['S24','S04']),observation(445,['S20']),observation(449,['S19']),observation(395,['S09'],'road_test_listed_option_price','Installation basis unspecified.')],
       order_code='T5B',order_code_source='S02',parts=[dict(number='C1010FE001',role='period six-speed assembly',evidence='S11'),dict(number='C1010FE004',role='later supersession',evidence='S16')],
       note='All three sticker prices are genuine observations; no exact change schedule established. Reference uses the launch-era white-car sticker.')
option('boost_gauge','STI steering-column turbo-boost gauge','performance',310,['S19','S04'],'high',
       [observation(310,['S19','S04']),observation(230,['S09'],'road_test_listed_option_price','Do not substitute for sticker MSRP.')],
       order_code='T4B',order_code_source='S02',exclusive_group='gauge_system',parts=[dict(number='H5010FE055',role='STI assembly in later catalog',evidence='S12')])
option('titanium_knob','STI titanium shift knob, six-speed','performance',None,['S21','S06','S11'],'unresolved_standalone_price',
       [observation(159,['S02'],'disputed_guide_price','Guide shows invoice higher than retail; possible transcription error.'),observation(170,['S09'],'road_test_listed_option_price','Unspecified installed/parts basis.')],
       order_code='J5D',order_code_source='S02',parts=[dict(number='C1010FE100',role='six-speed titanium knob',evidence='S11')],
       note='Existence and $928 package inclusion confirmed. $179 is only an arithmetic residual from 928-439-310, not verified standalone MSRP.')
option('gauge_pack','STI three-gauge performance pack with housing','performance',740,['S22','S14'],'high',
       [observation(740,['S22','S04']),observation(725,['S02'],'conflicting_generic_guide_price','Use STI sticker-specific $740 instead.')],
       exclusive_group='gauge_system',parts=[dict(number='H5010FE056',role='STI gauge pack, later catalog',evidence='S14'),dict(number='H0010FE920OE',role='required housing',evidence='S14')],
       note='Boost, oil temperature, voltage. Replaces dashboard clock; do not use Legacy oil-pressure pack or non-turbo vacuum pack.')
option('floor_mats','Blue carpeted STI floor mats','interior',80,['S19','S20'],'high',
       [observation(80,['S19','S20']),observation(75,['S09'],'road_test_listed_option_price')],
       order_code='B5B',order_code_source='S02',first_reported_available_month='2004-10',date_source='S02',
       parts=[dict(number='J5010SS700',role='blue/no-logo mats in later catalog; original B5B linkage not fully proved',evidence='S12')],
       note='Loose mats are not standard. Dealer fitted unspecified carpet mats on one early car; that does not refute later blue B5B introduction.')
option('wheel_locks','Wheel lock set','exterior',41,['S05','S19','S20','S22','S24'],'high',
       [observation(41,['S05','S19','S20','S22','S24'])],order_code='MSV',order_code_source='S02')
option('hood_protector','Hood protector / deflector','exterior',76,['S02'],'medium',
       [observation(76,['S02'],'historical_price_not_installed')],installation_included=False,
       note='Do not conflate the acrylic deflector with a soft front-end cover.')
option('fog_lights','Fog lamp kit','exterior',354,['S01','S02','S17'],'medium_parts_price',
       [observation(354,['S02'],'historical_parts_list_price','Installation excluded; exact contents of priced kit not recovered.')],installation_included=False,
       parts=[dict(number='H4510FE020',role='U.S. kit candidate from current catalog',evidence='S17')],
       note='Requires appropriate surrounds, switch/wiring/mounting verification; replaces closed STI covers. Current fitment page has errors; do not adopt its entire BOM.')
option('spt_catback','SPT STI cat-back exhaust','dealer_performance',None,['S10','S33'],'unresolved_price',
       availability_status='confirmed_us_by_may_2005',first_confirmed_by_month='2005-05',
       parts=[dict(number='SOA8377900',role='later compatible cat-back; 2005 introduction SKU not proved',evidence='S12')],
       note='Official May 2005 launch announcement. Do not assign generic WRX $449 exhaust or $375 muffler prices to this item.')

packages=[
 dict(id='peg_2b',name='Popular Equipment Group 2B',reference_price_usd=415,source_ids=['S05','S20'],price_confidence='high',includes=['alarm','mirror_compass'],exclusive_group='convenience_package'),
 dict(id='peg_homelink',name='Popular Equipment Group with HomeLink',reference_price_usd=500,source_ids=['S02'],price_confidence='medium',includes=['alarm','mirror_homelink'],exclusive_group='convenience_package',order_label_status='Guide combines 2C/2D; precise STI suffix not independently confirmed.',first_reported_available_month='2004-10'),
 dict(id='performance_package',name='STI Performance Group',reference_price_usd=928,source_ids=['S21','S06','S04','S08'],price_confidence='high',includes=['short_shifter','boost_gauge','titanium_knob'],conflicts_with=['gauge_pack'],order_label_status='Cars101 calls it 2B. Sticker suffix is visually ambiguous; content and price are clear.')
]

candidate_rows=[
 ('engine_block_heater','Engine block heater',['S01','S02','S18','S31'],29,'Plausible U.S. dealer accessory; generic U.S. pricing cell, Canadian period option and modern STI fitment. Original U.S. kit/price basis still incomplete.'),
 ('battery_warmer','Battery warmer',['S01','S02'],30,'Period generic Impreza accessory; exact STI kit and pricing require confirmation.'),
 ('car_cover','Car cover',['S01','S02'],100,'Verify STI tall-wing fitment; generic sedan cover is insufficient.'),
 ('cover_bag','Car-cover storage bag',['S02'],10,'Accessory to cover; exact contemporary SKU missing.'),
 ('cigarette_lighter','Cigarette lighter',['S02'],None,'Listed generically; no reliable standalone price/SKU recovered.'),
 ('subwoofer','Subwoofer / amplifier',['S01','S02','S25','S32'],None,'Dealer installation at 725 miles documented. OEM identity not explicit in record. Do not treat WRX D2B $273 as confirmed STI order price.'),
 ('audio_upgrades','Speaker/tweeter upgrades',['S01','S03'],None,'Six upgraded speakers already standard; no separate U.S. STI upgrade tariff established.'),
 ('front_end_cover','Full or hood-only soft front-end cover',['S01'],None,'Generic brochure only; exact STI bumper/scoop coverage unproved.'),
 ('roof_carriers','Sedan crossbars, baskets, ski/bike/roof-box attachments',['S01','S11'],None,'Global sedan rack shown applicable; U.S. U2A is wagon-only. Need U.S. sedan base, fitting kit, rated load and historic prices.'),
 ('splash_guards','Subaru splash guards',['S01','S11'],None,'Generic U.S. pictures do not prove STI fitment; global application matrix rejects listed front/rear sets for STI.'),
 ('parking_brake_handle','Carbon-fiber parking-brake handle',['S01','S12'],None,'Later catalog dates handle only through 2004; hold out of 2005 builder.'),
 ('spt_intake','SPT intake and heat shield',['S12','S23'],None,'Later fitment and 2009 installation on white car do not establish 2005 availability.'),
 ('spt_bracing','SPT chassis/strut bracing',['S12'],None,'Later catalog fitment only; period introduction and prices unproved.'),
 ('sti_suspension','STI adjustable struts/springs',['S10','S12'],None,'2005–07-specific later kit exists. Generic 2005 magazine reference does not identify that kit.'),
 ('sti_mounts_links','STI mounts, links, bushings and brake hoses',['S12'],None,'Compatible later catalog parts; do not assume all were offered when the model was new.'),
 ('dealer_services','Protection treatments / service contracts / dealer conversions',['S23','S25'],None,'Local transaction choices with no universal model MSRP. Not Subaru factory configuration choices.')
]
candidates=[dict(id=i,name=n,source_ids=s,unverified_price_lead_usd=p,reference_price_usd=None,builder_enabled=False,note=note) for i,n,s,p,note in candidate_rows]

global_rows=[
 ('Front under spoiler','E2410FE030##'),('Sport grille','J1010FE090##'),('Large fog lamps','H4510FE001 + H4518FE050##'),
 ('Rear waist spoiler','E7210FE200##'),('Sedan visors','E3610FE000'),('RHD strut bar','E4010FE000'),
 ('Bumper protectors','J1010SE020'),('Side protectors','J1010SE010'),('Aluminum six-speed knobs','C1010SE101 / C105EFE100'),
 ('Blue shift boot','C105EFE200'),('Sedan rack base','E3610SE520'),('Sedan cargo tray','J5110SE100'),
 ('Sill plates','E1010FE015 / E1010FE005'),('STI carpet mats','J5010SE400 / J5010SE400RH'),
 ('Parking aid','H481ESA002'),('European navigation','H001ESA010')
]
later_rows=[
 ('STI-specific adjustable suspension','203004S220 / 230 / 240 / 250',7),
 ('Front strut brace','SOA3881020',6),('Lower chassis brace','SOA8431070',6),
 ('Lower arm bar','ST205104S000',8),('Trailing links','ST2027055000',8),
 ('Front/rear strut mounts','B0310FE000 / B0310FE012',9),('Six-speed transmission mount','D1010FE000',9),
 ('Pitch mount','D1040FE000',9),('Engine mounts','D1010FE110 / D1010FE120',9),
 ('STI brake hoses','ST265504S000',12),('Cowl stays','ST508664S000',11)
]

fixtures=[
 dict(id='gray_504987',source='S05',base=32195,lines={'wheel_locks':41,'armrest':128,'peg_2b':415},destination=575,total=33354),
 dict(id='black_512251',source='S19',base=32295,lines={'short_shifter':449,'boost_gauge':310,'wheel_locks':41,'floor_mats':80},destination=575,total=33750),
 dict(id='black_510972',source='S20',base=32195,lines={'short_shifter':445,'wheel_locks':41,'armrest':128,'peg_2b':415,'floor_mats':80},destination=575,total=33879),
 dict(id='silver_510361',source='S21',base=32295,lines={'armrest':128,'performance_package':928},destination=575,total=33926),
 dict(id='blue_501349',source='S22',base=32195,lines={'alarm':232,'gauge_pack':740,'wheel_locks':41,'armrest':128},destination=575,total=33911),
 dict(id='white_500521',source='S24',base=32195,lines={'short_shifter':439,'alarm':232,'wheel_locks':41},destination=575,total=33482)
]

data=dict(
 schema_version=1,research_date='2026-09-20',
 scope=dict(market='United States',model_year=2005,model='Subaru Impreza WRX STi',currency='USD',
            interpretation='Historically available new-car choices and genuine dealer accessories; overseas and later-fitment leads retained separately.',
            completeness='Deep evidence-based catalog, not a certified exhaustive factory order guide. Unresolved prices remain null.'),
 sources=sources,
 pricing_epochs=[
  dict(id='launch',base_msrp=32195,destination=575,total=32770,period='Model launch in 2004',source_ids=['S03','S24']),
  dict(id='september_2004',base_msrp=32295,destination=575,total=32870,period='Dealer deliveries from September 2004 reported by S02',source_ids=['S02','S19','S21'],date_precision='month_reported_not_exact_day'),
  dict(id='may_2005',base_msrp=32445,destination=575,total=33020,period='Dealer deliveries from May 2005 reported by S02',source_ids=['S02','S09'],date_precision='month_reported_not_exact_day')],
 destination_rules=dict(continental_us=575,alaska=725,source_ids=['S03'],other_regional_variations='Not reconstructed; do not apply a guessed national dealer fee.'),
 factory_configuration=dict(body='4-door sedan',engine='2.5-liter turbocharged flat-four',transmission='6-speed manual',
     interior='Blue perforated Ecsaine with black trim',source_ids=['S01','S03'],
     colors=[dict(name=n,paint_code=c,upcharge_usd=0,source_ids=['S01','S13']) for n,c in [('Aspen White','51E'),('Crystal Gray Metallic','48W'),('Obsidian Black Pearl','32J'),('Platinum Silver Metallic','01G'),('WR Blue Pearl','02C')]],
     wheels=[dict(name='Gold BBS 17×8',model_code='5JI',upcharge_usd=0,source_ids=['S02','S03','S22']),dict(name='Silver BBS 17×8',model_code='5JJ',upcharge_usd=0,source_ids=['S02','S03','S24'])],
     paint_wheel_combinations=10,
     standard_equipment=['300 hp / 300 lb-ft','DCCD AWD','Brembo brakes','HID low beams','Large rear wing','Intercooler water spray','Automatic climate control','140W six-disc/six-speaker stereo','Engine immobilizer','Remote keyless entry'],
     standard_equipment_sources=['S03','S24']),
 options=options,packages=packages,unresolved_us_candidates=candidates,
 other_market_leads=[dict(name=n,part_number=p,source_ids=['S11'],builder_enabled=False,us_price=None,reason='Global application only; verify regional notes and U.S. distribution.') for n,p in global_rows],
 later_fitment_leads=[dict(name=n,part_number=p,pdf_page=pg,source_ids=['S12'],builder_enabled=False,price_2005=None,reason='Later fitment does not establish 2005 sale availability.') for n,p,pg in later_rows],
 excluded_as_us_factory_choices=[
  dict(items=['Automatic transmission','Wagon body','Sunroof','Leather seat package','Heated seats','WRX Premium package','San Remo Red','Regal Blue Pearl'],source_ids=['S01'],reason='Not offered on U.S. MY2005 STI.'),
  dict(items=['WRX five-speed knobs/shifter','U2A wagon roof crossbars','Wagon cargo net/bin/tray','Rear differential protector'],source_ids=['S02','S12'],reason='Wrong model/transmission or explicit STI exclusion.'),
  dict(items=['Spec C','S203','WR Limited','Later STI Limited trim','Aftermarket tuning packages'],source_ids=[],reason='Outside the defined U.S. 2005 model scope; no U.S. factory selection established in reviewed primary material.')],
 builder_rules=[
  'Choose exactly one paint and one wheel finish; paint and wheel upcharges are zero.',
  'Engine, body, transmission and interior are fixed.',
  'Choose at most one mirror and one gauge system.',
  'Package price replaces individual component charges; never double-charge included items.',
  'Performance package includes column boost gauge and conflicts with three-gauge pack.',
  'Fog lamps replace closed fog covers; verify matching surrounds and complete kit before visual implementation.',
  'Display an explicit historical pricing profile; price-change dates are not established to the day.',
  'Unknown price is null, not zero. An incomplete total must be labeled incomplete.',
  'Unverified overseas and later-fitment leads must not enter the default U.S. new-car builder.',
  'Keep parts-only accessory prices and installation costs separate.',
  'Do not generate hypothetical package discounts or infer titanium standalone MSRP from a package total.'
 ],
 sticker_validation_fixtures=fixtures,
 open_questions=[
  'Obtain full U.S. 2005 accessory booklet/application list and all dated price bulletins; only cover photographs located.',
  'Confirm standalone titanium-knob installed MSRP and exact performance-package order suffix.',
  'Date and explain $439/$445/$449 six-speed-shifter price variants.',
  'Confirm HomeLink package STI suffix and price using an original sticker.',
  'Find 2005 STI SPT exhaust SKU, parts MSRP and installation basis.',
  'Resolve complete U.S. fog-kit BOM and whether the $354 lead includes color trim.',
  'Identify original B5B mat part number, color and logo treatment.',
  'Establish U.S. dealer applicability and contemporary price for all unresolved candidates.',
  'Secure consistent stock-car imagery for all 10 paint/wheel combinations; existing galleries are reference material, not a finished matched asset set.'
 ])

assert len(data['factory_configuration']['colors'])*len(data['factory_configuration']['wheels'])==10
ids={o['id'] for o in options}
for p in packages:
    assert set(p['includes'])<=ids
all_ids=ids|{p['id'] for p in packages}
for f in fixtures:
    assert set(f['lines'])<=all_ids
    assert f['base']+sum(f['lines'].values())+f['destination']==f['total'],f['id']
for s in sources.values():
    if s['local_file']:assert (ROOT/s['local_file']).exists(),s['local_file']

(ROOT/'options.json').write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
lines=['# Source register','', 'Research checked September 20, 2026. Mirrors are not independent confirmations. Page references are PDF page numbers, starting at 1.','']
for k,s in sources.items():
    lines += [f"## {k} — {s['title']}",'',f"[Open source]({s['url']}) · `{s['kind']}`",'',s['evidentiary_use'],'']
    if s['local_file']:lines += [f"[Saved evidence]({s['local_file']})",'']
(ROOT/'SOURCES.md').write_text('\n'.join(lines))
manifest=[]
for p in sorted((ROOT/'sources').iterdir()):
    if p.is_file():manifest.append(dict(path=str(p.relative_to(ROOT)),bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
(ROOT/'source-file-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Wrote catalog: {len(sources)} sources, {len(options)} accessory entries, {len(packages)} packages, {len(candidates)} unresolved U.S. candidates, {len(global_rows)} global leads, {len(later_rows)} later-fitment leads; {len(fixtures)} sticker totals validated.')
