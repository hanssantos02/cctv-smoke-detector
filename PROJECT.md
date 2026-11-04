# PROJECT.md: Project Brief

Updated 2026-11-05. Original brief came from the supplied product-specification PDF and user clarifications on 2026-10-22. Current status supersedes older dated sourcing/status entries; recommendations and assumptions remain distinct from confirmed requirements.

## Basics
- **Project name:** Sentrion SDS200
- **Goal:** Indoor CCTV-based visible-smoke detection and automated local/network alerts.
- **Required features:** Camera detection, MQ-2 sensing and battery backup (user-confirmed); buzzer, LED, Wi-Fi/local-network alerts, event logs, timestamps and snapshots (paper).
- **Optional features:** Remote/mobile/email/web notifications; final method not chosen.

## Usage
- **Environment:** Indoor fixed installation; room size, lighting and humidity to be confirmed.
- **Power:** Recommend official Pi 5.1V/3A adapter supplied by a packaged external 230V UPS. User requested a recommendation; this choice awaits BOM approval.
- **Connectivity:** Existing Wi-Fi/LAN/router assumed. Network gear also needs backup for outage notifications.

## Budget and constraints
- **Budget limit (PHP):** Not specified. See docs/BOM.md for the checked estimate and availability limits.
- **Size / weight limits:** Not specified; external UPS is separate from detector enclosure.
- **Deadline:** Not specified.
- **Required battery runtime:** Not specified; measure with actual load.

## Platform
- **Computer:** Raspberry Pi 4 Model B (paper); 4GB variant retained from original BOM.
- **Language / framework:** Python with OpenCV (paper). Exact versions belong to Phase 2.
- **Camera:** Budget one Waveshare OV2710 2MP USB Camera (A), UVC; recommended documented replacement for unspecified 120° board camera. No exact PH quote yet. Existing IP/USB cameras can be evaluated before purchase.
- **Camera sourcing, 2026-10-23:** User supplied a Circuitrocks generic USB camera listing at PHP 268 (direct-store SKU AG039). Saved as an unverified A03 alternative with clickable Excel links. Linux UVC support, video modes/frame rates, native sensor resolution, viewing angle and USB current still need confirmation. Baseline specification and PHP 2,500 camera allowance are unchanged.
- **Camera sourcing, 2026-10-24:** Added Actual Shop generic webcam, selected 2K variation, PHP 433 after voucher in user screenshots. Seller explicitly claims Linux support and USB plug-and-play, making it a promising candidate. Exact UVC support, video modes/frame rates, native resolution, viewing angle and USB current still need confirmation. Both candidates remain recorded; no substitution or budget change. B10 mount must be reviewed if an enclosed webcam is selected.
- **MQ-2 sourcing, 2026-10-24:** Selected ENG LAB.ph assembled MQ-2 variation at PHP 89 from user screenshot. Replaces Makerlab PHP 75 reference. Confirm delivered module labels, pin order and nominal 5V operation before wiring; no physical test yet.
- **ADC sourcing, 2026-10-24:** Selected Circuitrocks ADS1115 breakout at PHP 49 from Shopee and user screenshot, replacing PHP 500 reference. Loose header is acceptable because user owns soldering equipment; confirm included header and solder before use. Delivered chip/board still needs functional inspection.
- **Resistor sourcing, 2026-10-24:** Selected fulabs.ph 300 Pcs Box at PHP 68. Seller chart includes 470Ω and 10kΩ, ten each; listed 1/4W, 1% metal-film specification matches design. Verify actual values before use.
- **Capacitor sourcing, 2026-10-24:** Selected The Library 100nF/0.1uF 50V ceramic capacitors, six individual pieces at displayed PHP 3 each (PHP 18); seller minimum six. Confirm six-piece checkout price since wholesale tier separately starts at seven. Two allocated, four spares.
- **Buzzer sourcing, 2026-10-24:** Selected ENG LAB.ph Active module at PHP 65. Advertised 3.3–5V and LOW trigger; plan 3.3V VCC, LOW on/HIGH off and a 10kΩ I/O pull-up to 3.3V from A06. Input/supply current, startup and loudness need tests; do not inherit AF170 figures or connect a 5V-powered input directly to Pi.
- **Fan sourcing, 2026-10-24:** Follow-up screenshot confirms Welcome Home & Living Store 30×30×10mm, DC 5V, quantity 1 at PHP 64. Quote replaces PHP 75 reference. Rated current and connector details remain pending; retain provisional 0.20A allowance until verified. Size/voltage/price confirmation does not establish final electrical acceptance.
- **Heatsink sourcing, 2026-10-24:** Selected Circuitrocks four-piece Raspberry Pi 4B kit, Blue, at PHP 18 in screenshot, replacing PHP 120 reference. Listed sizes: 14×14×6, 14×10×6, 9×9×5mm; quantities per size unspecified. Confirm thermal adhesive and installation clearance; actual thermal performance untested. Browser-readable page shows PHP 55 without colour selection, so verify Blue checkout price. Earlier BuildCore.Tool candidate not selected.
- **Power-supply sourcing, 2026-10-24:** TECHDIY advertised official Pi USB-C supply at PHP 660 screenshot quote, budgeted provisionally instead of PHP 1,237.60. Confirm actual label output 5.1V/3A; plug reference: official HE is EU round-pin, HU US flat-pin. Seller banner KAS versus official KSA may be a graphic typo; authenticity unverified. User accepts HE with one round-to-flat plug adapter; physical fit still needs checking. A12 set now PHP 699 = PSU PHP 660 + OMNI WRA-001-PK plug PHP 39 reference; plug goes on Physical Store list and is counted once. Earlier wuzhihui2020.ph generic offer remains NOT SELECTED.
- **MQ-2 interface:** Recommended ADS1115 at 3.3V with a two-resistor voltage divider, not a digital logic converter.
- **LED procurement, 2026-10-24:** User will buy A09 in a physical store: one red and one green 5mm diffused LED with two leads each. Separate shopping table added to BOM and Excel Physical Store sheet. Shop/actual quote/purchase unconfirmed; existing PHP 10 pair estimate remains counted once.

- **A17 procurement, 2026-10-24:** Buy two 6×6mm normally open momentary tactile switches (through-hole, 4 wire legs) in a physical store; TEST and SHUTDOWN requests. Physical Store list updated. PHP5 each / PHP10 total remains an estimate counted once; actual shop/quote unconfirmed.

- **A18 procurement, 2026-10-24:** Buy one 5×20mm inline holder with insulated wire leads + matching500mA fast-blow fuse in a physical store. For 5V MQ-2/fan branch only. Exact model, DC suitability, fit and actual quote pending. PHP60/set estimate counted once; Physical Store list updated.

- **A19 sourcing, 2026-10-24:** Circuitrocks Uno/breadboard acrylic plate candidate, PHP25 screenshot versus PHP55 direct-store page AC071. Seller specifies120×83×3mm for Uno +400-point breadboard. A14 is830-point; Pi4 mounting and board attachment unverified. No fan bracket included. Candidate link saved; keep original PHP100 complete mount/base allowance until layout and remaining hardware are confirmed.

- **A19 second candidate, 2026-10-24:** Signako acrylic sheet selected297×420×2mm at PHP200 screenshot quote; not yet selected for purchase. Prefer smaller3mm base (custom200×150×3mm or shown10×12in3mm), pending quote and layout. Raw sheet has no confirmed mounting hardware/fan bracket. Keep provisional PHP100 allowance until repricing complete; accepting200 sheet exceeds it before hardware. Earlier small Circuitrocks plate remains history.

- **A19 selected base, 2026-10-24:** Follow-up screenshot selects10×12in3mm acrylic (254×304.8×3mm), one at PHP150, seller spartan-888 Trading. A19 now PHP250/set = sheet150 quote + remaining fan bracket/mounting hardware100 ESTIMATE; exact hardware quote and final fit pending. Earlier plate/A3 options not selected. Main/review links use canonical product URL; choose correct variant and confirm seller at checkout.

- **A19 bracket review, 2026-10-24:** phadvanceautoshop automotive auxiliary fan bracket pair PHP150 screenshot is NOT SELECTED. No dimensions/hole fit to30mm fan confirmed. Link retained only in review; acrylic choice and PHP100 remaining mounting allowance unchanged.

- **A19 case/fan candidate, 2026-10-24:** MakerLab Shopee Pi4 Black Case with Fan PHP150; direct MLE01114 PHP149 lists case only. Confirm fan/fasteners, voltage/current/dimensions,6mm-heatsink clearance and GPIO cable exit. Candidate saved, excluded from budget. If accepted, remove duplicate separate fan/bracket and recheck final enclosure fit. A19selected base and A10fan budgets unchanged.

- **A19 case selection, 2026-10-24:** User chooses to buy MakerLab Pi4 case PHP150 and will check whether fan included on arrival. Selected to buy, not an order/receipt claim. A19 now400 = acrylic150 + case150 + base/case mounting hardware100 ESTIMATE. A10fan64/A11heatsinks18 retained pending contents. No standalone bracket currently specified; inspect fan/mount,6mm-heatsink clearance, GPIO access and final enclosure ventilation later. User does not need a seller reply to proceed with this selection.

- **A19 mounting procurement, 2026-10-24:** User will buy nylon mounting spacers/standoffs, matching screws/nuts and four adhesive rubber feet in a physical store. One combined PHP100 estimate remains included in A19 PHP400; exact kit contents/sizes and shop/quote pending. Case/acrylic stay online purchases. Reuse hardware and reconcile B06 additional needs before buying duplicate kit.

- **B01 enclosure, 2026-10-24:** User has a3D printer and elects to print custom final enclosure. Retail ABS box PHP365 superseded; filament/material, print mass and cost TBD. No zero-cost assumption. Excel final/grand totals flag missing input. Custom design/printing deferred until prototype succeeds; confirm airflow, sensor access, delivered case/board fit and material heat suitability then.

## What is already owned
- **Hardware-label check, 2026-11-04:** Pi4 ModelB visible in photo;4GB RAM user-confirmed. Adapter labelled Raspberry Pi KSA-15E-051300HU, INPUT100–240V AC50/60Hz0.5A, OUTPUT5.1V DC3.0A, two flat blades. Matches planned output rating; authenticity/load performance not established by photo. Actual HU plug supersedes earlier HE assumption; no round-to-flat adapter needed if it fits intended socket normally. Silvertec32GB microSDHC marked UHS-I/A1/Class10, reported empty; use for initial setup attempt. Real capacity/reliability/high-endurance construction unverified. Saved BOM/workbook amounts remain a purchase-plan reference pending reconciliation.
- **Finishing consumables (2026-10-24):** User owns heat-shrink tubing, cable ties AND tie-mount bases; reuse, zero new purchase for those. Sizes/quantities not specified. Wire labels remain unconfirmed/unpriced.
- **Tools:** User owns a3D printer and soldering equipment; models/consumables unconfirmed. Windows PC used for preparation; user also owns a Linux laptop, distribution/version pending. Monitor owned without a confirmed Pi-compatible cable; no Ethernet cable reported. Other tools remain unconfirmed.
- **Parts:** Actual card now identified as Silvertec32GB microSDHC,UHS-I/A1/Class10;OS image written and setup files inspected. High-endurance rating/reliability not established. A02 SanDisk allowance remains an unreconciled purchase-plan reference,not an instruction to buy another card for this diagnostic.
- **First Pi setup inventory, 2026-11-04:** Pi,supply,microSD and reader reported on hand;labels checked and results above supersede earlier pending-identification entries. This covers first-boot items,not all detector components. Original card was reported empty before OS writing.

## Status and constraints
- Current phase: Phase2,Step19 initial Pi setup/log diagnosis. Approved2.4GHz trial applied and card safely returned;Pi last reported powered>=5minutes,green ACT off. No confirmed Pi IP,SSH login,completed OS boot or Wi-Fi association. Windows read-only boot inspection completed,but Linux logs were denied without elevation;bootfs Warning not repaired. User is considering Linux laptop for native ext4 access;next obtain distro/version with cat /etc/os-release and reconfirm physical state. No Linux laptop commands,Windows reader install,detector code or sensor wiring completed. See docs/CONTINUE_ON_ANOTHER_PC.md and docs/READ_STARTUP_LOGS_LINUX.md. Full BOM approval/remaining checks unresolved.
- **Project continuity, 2026-11-04:** Git repository connected to https://github.com/hanssantos02/cctv-smoke-detector. Read README.md and docs/CONTINUE_ON_ANOTHER_PC.md when moving to another PC. Track current documents, original PDFs and final Excel deliverable; local dependencies/scratch work stay excluded. Each PC needs GitHub authentication for pushes. This does not advance the hardware phase.
- Physical detector performance, camera coverage, power draw, shutdown/restart behaviour and backup runtime remain untested.
- Research prototype; keep independent certified smoke alarms.
- Source PDFs remain unchanged. Detailed decisions and item corrections are in docs/BOM_REVIEW.md.

- **B02 sourcing, 2026-10-24:** Selected fulabs.ph 7×9cm double-sided FR4 perfboard, one board at PHP48 screenshot quote. Approx.2.54mm pitch/1mm holes seller claims; inspect pad isolation and hole continuity/plating on arrival. Shopee inaccessible; checkout price/stock unverified. Replaces Makerlab PHP45 reference. Native links saved; no purchase or assembly performed.

- **B03 procurement, 2026-10-24:** Female header strip assigned to physical-store shopping: one straight single-row1×40,2.54mm through-hole female strip. Price/shop unknown. Full B03 kit150 estimate retained; male strips and Pi connector remain pending. No purchase performed.

- **B03 male header procurement, 2026-10-24:** User will buy one straight single-row1×40 male strip,2.54mm through-hole, in physical store. Both strip types now assigned in person; Pi ribbon/header still pending. Full kit150 estimate unchanged; actual prices unknown. Check ADS1115 included header before duplicating for that module.

- **B03 cable candidate, 2026-10-24:** bopultd.ph Female to Female rainbow40-pin GPIO cable94 screenshot quote; verify2.54mm pitch,length,pin-for-pin mapping,keying and case/fan access. Matching2×20 male PCB header still required. Strips stay physical store; fullkit150estimate unchanged (94cable would leave56allowance, not quote). No purchase.

- **B03 simplified connector decision, 2026-10-24:** Replace separate boxed-header requirement with two adjacent1×20 sections from one male1×40strip on2.54mm grid (both axes). Malephysicalstoreqty2total: one GPIO grid, second modules/spares; femaleqty1 unchanged. Boxedheader optional. Check mating dimensions, markpin1 and verify unpowered mapping/alignment later; no keying on single-row pair. Fullkit150estimate unchanged, cablecandidate94 still requires pitch/length/mapping/fit checks. Earlier required-separate-header entries superseded.

- **B04 candidate, 2026-10-24:** B&K.ph locking SM-style3P/1Set at45 screenshot, total30cm. One pair, not5. WireAWG/material/assembledcurrent unknown; ≥1A requirement unverified. Five-pair kit120estimate flaggedreprice; five singleswould225,5Setpackprice/pinmixunknown. Candidate links saved, no purchase.

- **B05 procurement, 2026-10-24:** Physical store: stranded copper/silicone22AWG red1m,black1m,orange1m;24AWG yellow/green/blue/white0.5m each,5m total. NoCCA; tinnedcopper acceptable. Fullset150estimate retained, actual quote unknown. B06 reuseA19kitfirst,120additionalallowance conditional; nextB07two5mmLEDholders.

- **B07 sourcing, 2026-10-24:** universing.ph UVIG selected0(5MM), advertised20-piece pack69 screenshotquote;1packbudgeted,2used18spares. Confirm packcontents, actualpanelcutout/wallthickness/LEDfit before enclosurework. Bareholdersonly; noLEDduplicates. +49, knownfinal1157/knownmaterials22021 plusprintingTBD. No purchase.

- **B08 candidate, 2026-10-24:** Generic black syntheticrubber cross-membrane grooved grommets, no size selected;74–126range notexactquote. Seller diameter=panelcutout, pack2/5/10pervariant. Notradiallysplit; need dimensionalchart/panelgroove and actualUSBplug/cabledimensions before selection. Separateclampsstillneeded; fullkit100estimate unchanged. No purchase/enclosurework.

- **B08 chart supplied, 2026-10-24:** Sellerchart16mmoption A14/B16/C21/D2.5/E9.5mm;20mm A15/B20/C26/D2/E9. Chart received and recorded. ActualUSBplug/cable and printedwall/seatfit remain pending; do not ask for chartagain. No variantselected or budgetchange.

- **B08 clamp candidate, 2026-10-24:** SasaHardware titled rubber-lined304metalPclips;92–245range, no type/diameterselected.6mmgreyed screenshot,8mmnextvisible, fit/stock unverified. Plan2clamps; measurecablejacketbeforebuying, bolt/mountsupport/metalclearancepending. Grommetchart retained; fullcombinedkit100estimate unchanged, repriceoncechosen. No purchase.

- **B09 ownership update, 2026-10-24:** Removed owned heat-shrink/ties from new purchases. B09 now remaining mounts/labels, costTBD; original100combinedestimate cannot establish remaining cost. Knownfinal1057/knownsum21921 plus BOTH printing and mounts/labelsTBD. No purchase.

- **B09 mounts owned follow-up, 2026-10-24:** User also owns tie-mount bases. B09 now wirelabels only, costTBD; no duplicate mounts. Knownline sum21921 plus printing+labelsTBD unchanged. No purchase.

- **B09 labelcandidate, 2026-10-24:** ShopeeChoiceGlobal colourednylonstrapstyletags98–242range, no packselected. Verifywrite-on/permanentmarkeruse, dimensions and closure; notconfirmedselflaminatinglabels/thinwirefit. I37unpriced; allthreeotherfinishingmaterialsremainowned. No purchase.

- **B09 selected-pack follow-up, 2026-10-24:** Screenshot selects mixed10±2pcs, one pack at PHP98; budget provisionally98, writing surface/dimensions/fit pending. Other finishing materials remain owned. Priced final1155; known sum22019 plus B01 printingTBD. Next B10 camera mount depends on final camera; custom printing is an option, not yet a selected B10 substitution. No purchase or phase change.

- **B12 procurement, 2026-10-24:** User assigns final panel push buttons to physical store: two non-illuminated, momentary normally-open, two-terminal panel switches with mounting nuts/hardware. One TEST, one SHUTDOWN; colour optional. Model, hole diameter, supported panel thickness, low-current contact suitability and actual shop quote pending. PHP25 each / PHP50 total estimate counted once; Physical Store rows74:81. B10/B11 remain pending; no Phase2 approval.
