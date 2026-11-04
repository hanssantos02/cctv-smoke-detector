import json
from pathlib import Path

root=Path('/home/hans/repos/cctv-smoke-detector')
cfg=json.loads((root/'tmp/review/store-link-targets.json').read_text())
url=cfg['links'][-1]['url']
p=root/'docs/BOM.md'
t=p.read_text()
old=next(x for x in t.splitlines() if x.startswith('| A05 |'))
t=t.replace(old,'| A05 | ADS1115 ADC breakout | ADS1115 16-bit, 4-channel I2C; 3.3V in this design; ADDR to GND = 0x48; loose header shown, solder before use | 1 pc | 49.00 (LISTED / SCREENSHOT) | 49.00 | [Circuitrocks / Shopee — ADS1115]('+url+') | Converts the MQ-2 analog voltage to digital readings the Pi can use. The Pi has no built-in analog input; a level shifter alone cannot do this. |')
old=next(x for x in t.splitlines() if x.startswith('- **A05 ADS1115'))
t=t.replace(old,'- **A05 ADS1115 ADC breakout - LISTED / SCREENSHOT:** PHP 49 in user screenshot and accessible Shopee page (2026-10-24), replacing Makerlab PHP 500 reference, saving PHP 451. Photo shows ADS1115-labelled breakout and loose header strip. Confirm header included; user has soldering equipment, so pre-soldered headers are not required. Verify delivered board, pull-ups and operation before use; exact chip authenticity and breakout schematic are not established by the listing. Sources: [Shopee]('+url+'), [TI ADS1115](https://www.ti.com/product/ADS1115).')
t=t.replace('PHP 21,659.60','PHP 21,208.60').replace('PHP 23,129.60','PHP 22,678.60')
t=t.replace('A04 quote updated 2026-10-24','A04–A05 quotes updated 2026-10-24')
old=next(x for x in t.splitlines() if x.startswith('| Soldering iron/station |'))
t=t.replace(old,'| Soldering iron/station | Already owned (user, 2026-10-24); exact equipment specification not supplied | 0 new purchase | Used for loose module headers and permanent perfboard work. Confirm solder/flux supplies separately. |')
t=t.replace('## Compatibility and power review','''## Store-link verification — A05, 2026-10-24

Selected one Circuitrocks ADS1115 16-bit, four-channel I2C breakout at PHP 49. The screenshot and accessible Shopee listing agree on price. The photo shows a loose header strip alongside the board; confirm it is included and solder it before breadboard use. The user already owns soldering equipment, so a pre-soldered option is unnecessary. Tools remain excluded from materials totals; solder/flux consumables have not been confirmed owned.

The ADS1115 is an analog-to-digital converter: it turns the sensor voltage into numbers the Pi can read. In this design its supply and I2C pull-ups must be at 3.3V. Set ADDR to ground for I2C address 0x48. The MQ-2 signal still passes through the two equal 10kΩ resistors before reaching AIN0. Selecting a wider programmable gain range does not allow an analog input above the chip supply voltage. [TI's ADS1115 documentation](https://www.ti.com/product/ADS1115) supports the intended IC capabilities; it does not verify this generic board's exact schematic or chip authenticity. Inspect and test the delivered module in Phase 2.

A05 reduces the earlier PHP 500 reference by PHP 451. Current prototype subtotal: PHP 21,208.60; final additions: PHP 1,470.00; grand total: PHP 22,678.60. Earlier candidate-review totals above now reflect the current A04–A05 selections.

## Compatibility and power review''')
# Keep the earlier A04 change amount clear while presenting current totals consistently.
t=t.replace('A04 increased by PHP 14 from the prior reference. Current prototype subtotal','A04 increased by PHP 14 from the prior reference. After the subsequent A05 saving, current prototype subtotal')
p.write_text(t)
p=root/'PROJECT.md'; t=p.read_text().replace('- **Tools:** Not specified. Assume access to existing Linux computer/router only; confirm before deductions.','- **Tools:** User owns soldering equipment (2026-10-24); exact iron/station and consumables not specified. Existing Linux computer/router assumed. Other tools remain unconfirmed.')
t=t.replace('- **MQ-2 interface:**','- **ADC sourcing, 2026-10-24:** Selected Circuitrocks ADS1115 breakout at PHP 49 from Shopee and user screenshot, replacing PHP 500 reference. Loose header is acceptable because user owns soldering equipment; confirm included header and solder before use. Delivered chip/board still needs functional inspection.\n- **MQ-2 interface:**')
p.write_text(t)
p=root/'PROGRESS.md'; t=p.read_text().replace('- Table A prototype purchases: PHP 21,659.60.','- Table A prototype purchases: PHP 21,208.60.').replace('- Grand total: PHP 23,129.60,','- Grand total: PHP 22,678.60,')
t=t.replace('Next material is A05 ADS1115 ADC breakout.','A05 has since been selected at PHP 49; next material is A06 resistor assortment.')
t=t.replace('## Reference budget','11. 2026-10-24: Selected Circuitrocks ADS1115 module at PHP 49, replacing PHP 500 reference (saving PHP 451). Added clickable main/review links, updated existing price note, marked soldering equipment owned and zero new tool purchase. Prototype PHP 21,208.60; final PHP 1,470.00; grand PHP 22,678.60. Verified affected visuals, preserved unrelated cells/validation/freeze panes and eight hyperlink targets.\n\n## Reference budget',1)
t=t.replace('## Open questions and limitations','## Open questions and limitations\n- 2026-10-24: User owns soldering equipment; do not budget a new iron/station. Solder/flux supplies and exact equipment specifications remain unconfirmed. ADS1115 photo shows loose header strip; confirm inclusion before ordering. Test delivered module before connection to MQ-2.\n',1)
p.write_text(t)
p=root/'docs/BOM_REVIEW.md'; t=p.read_text().replace('# BOM audit and changes','# BOM audit and changes\n\n## Store-link update — 2026-10-24, A05 and owned tools\n\nSelected Circuitrocks ADS1115 16-bit four-channel I2C breakout at PHP 49, matching user screenshot and accessible Shopee page. Loose header strip shown; user owns soldering equipment, so unsoldered format is acceptable. Confirm header inclusion and delivered board operation. Supply and I2C pull-ups remain 3.3V; MQ-2 still requires divider before AIN0. Replaced PHP 500 reference, saving PHP 451. Added main F10 and Review Notes F98 native hyperlinks, updated I10 source note, marked soldering equipment owned in tools row 66. Prototype PHP 21,208.60, final PHP 1,470.00, grand PHP 22,678.60. Earlier entries describe historical review states.\n',1); p.write_text(t)
p=root/'tmp/review/bom-data.mjs'; t=p.read_text()
old=next(x for x in t.splitlines() if "item('A05'" in x)
new=old.replace('address 0x48; soldered headers required','ADDR to GND = 0x48; loose header shown, solder before use').replace("1,'pc',500,'Makerlab PH'","1,'pc',49,'Circuitrocks / Shopee'").replace("'LISTED','MLE00153: PHP 500, available in retailer product data. Confirm headers are soldered or ask the store to assemble them.'","'LISTED / SCREENSHOT','PHP 49 in user screenshot and accessible Shopee page, 2026-10-24. User owns soldering equipment; confirm included loose header. Verify delivered board before use.'").replace('[source.adc,source.adcDocs]','['+json.dumps(url)+',source.adcDocs]')
t=t.replace(old,new).replace("['Soldering iron/station','Temperature controlled, grounded tip, stand and eye protection',800,1800,'Needed for unsoldered module headers and permanent perfboard work.']","['Soldering iron/station','Already owned (user, 2026-10-24); exact equipment unspecified',0,0,'No new iron/station purchase; confirm solder/flux supplies separately.']")
p.write_text(t)
print('A05 and owned-tools documentation updated; current totals synchronized.')
