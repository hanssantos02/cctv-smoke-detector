import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const root='/home/hans/repos/cctv-smoke-detector';
const file=`${root}/outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx`;
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(file));
const main=wb.worksheets.getItem('BOM Summary');
const notes=wb.worksheets.getItem('Review Notes');
const url='https://shopee.ph/USB-Camera-For-Raspberry-Pi-2-Model-B-B-A-3-3B-Pc-i.20469516.1308983059?extraParams=%7B%22display_model_id%22%3A32045113822%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-22120-n6s1qjrv7okv60';
const direct='https://circuit.rocks/products/usb-camera';
if(process.argv.includes('--wire-store-inspect')) {
  for(const [name,sheetName,range] of [['wire-main-before','BOM Summary','A33:J34'],['wire-shop-before','Physical Store','A54:F58']]) {
    const b=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));
  }
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!F33:J34",include:'values,formulas',tableMaxRows:2,tableMaxCols:5,maxChars:1500})).ndjson);
  process.exit(0);
}
if(process.argv.includes('--wire-store')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('D33').values=[['Stranded copper, silicone insulation:22AWG red/black/orange1m each;24AWG yellow/green/blue/white0.5m each;5m total; no CCA']];
  main.getRange('F33').values=[['PHYSICAL STORE\nSee colours/lengths table\n₱150/set ESTIMATE; quote TBD']];
  main.getRange('F34').values=[['Reuse A19 mounting kit first\nBuy only missing final pieces\n₱120 conditional ESTIMATE']];
  const shop=wb.worksheets.getItem('Physical Store');
  const band=(range,txt,fill,height,color='#142536')=>{shop.mergeCells(range);shop.getRange(range).values=[[txt]];shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};};
  band('A60:F60','B05 — COPPER HOOKUP WIRE — BUY IN PHYSICAL STORE','#285D36',28,'#FFFFFF');
  shop.getRange('A61:F61').values=[['BOM item','Colour / planned use','Variant / exact material','Length','Unit','Buying status / store']];
  shop.getRange('A61:F61').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  const wires=[['Red — 5V peripheral power','22AWG',1],['Black — ground / return','22AWG',1],['Orange — 3.3V supply','22AWG',1],['Yellow — I2C clock (SCL)','24AWG',0.5],['Green — I2C data (SDA)','24AWG',0.5],['Blue — analog sensor signal','24AWG',0.5],['White — labelled control / LED signals','24AWG',0.5]];
  shop.getRange('A62:F68').values=wires.map(([colour,gauge,length])=>['B05',colour,`${gauge} stranded copper (tinned copper acceptable), flexible silicone insulation; no copper-clad aluminium`,length,'m','TO BUY — physical store; shop / quote pending']);
  shop.getRange('A62:F68').format={fill:'#FFFFFF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:60,verticalAlignment:'center'};
  for(const row of [63,65,67])shop.getRange(`A${row}:F${row}`).format.fill='#F5F7FA';
  shop.getRange('D62:E68').format.horizontalAlignment='center';shop.getRange('D62:D68').setNumberFormat('0.0');
  band('A69:F69','Buying allowance:5m total, not a measured final harness. Colours are planned conventions, not a wiring pinout. Label individual white leads and verify actual connector pin mapping; keep Pi power on its USB-C adapter cable.','#FFF4CF',48);
  band('A70:E70','TOTAL WIRE LENGTH (metres)','#E8EBEF',30);shop.getRange('F70').formulas=[['=SUM(D62:D68)']];shop.getRange('F70').setNumberFormat('0.0');
  band('A71:E71','FULL B05 SET ALLOWANCE (PHP; ESTIMATE; counted once in BOM)','#E8EBEF',30);shop.getRange('F71').formulas=[["='BOM Summary'!J33"]];shop.getRange('F71').setNumberFormat('"₱"#,##0.00');
  shop.getRange('F70:F71').format={fill:'#E8EBEF',font:{name:'Arial',size:10,bold:true,color:'#142536'},horizontalAlignment:'right',rowHeight:30};
  band('A72:F72','PHP150 is the whole assortment estimate, not a per-metre quote. Update I33 with actual combined price. If minimum sale is1m/colour, the four24AWG colours become1m each:7m total; record extra length/cost rather than calling it5m.','#F0F3F6',50);
  wb.recalculate();
  assert.equal(shop.getRange('F70').values[0][0],5);assert.equal(shop.getRange('F71').values[0][0],150);
  for(const [c,v] of Object.entries({I33:150,J33:150,I34:120,J34:120,J25:20864,J30:48}))assert.equal(main.getRange(c).values[0][0],v,c);
  for(const c of ['J29','J41','J44'])assert.equal(main.getRange(c).values[0][0],'INPUT NEEDED',c);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Wire shopping-list formula scan'})).ndjson);
  for(const [name,sheetName,range] of [['wire-main-after','BOM Summary','A33:J34'],['wire-shop-after','Physical Store','A60:F72']]){const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  const wireNote='Updated2026-10-24: user will buy B05 wire in physical store. Planned5m assortment:22AWG strandedcopper red1m,black1m,orange1m;24AWG strandedcopper yellow0.5m,green0.5m,blue0.5m,white0.5m. Flexible silicone insulation; tinnedcopper acceptable; noCCA. No26AWG purchase needed with chosen24AWG signal variant. Planned colours:5Vred,GNDblack,3.3Vorange,SCLyellow,SDAgreen,analogblue,individuallylabelledcontrol/LEDwhite; not wiring instructions. Actual routing unknown; adjust later. ExistingPHP150whole-setestimate counted once, store/quote unknown. If1mminimumpercolour,7mtotal and actual cost mustbe recorded. Pi supply cable unchanged; not mains wiring. Physical Store rows60:72; no purchase/assembly.';
  const mountNote='B06 procurement clarification2026-10-24: reuse A19 nylonM2.5/M3 kit first. Buy only genuinely missing final spacers, screws, washers/nuts after layout/actual kit inspection. ExistingPHP120 is a CONDITIONAL additional allowance, not instruction to buy a second identical kit. Exact final quantities/lengths and quote unknown; deduct unused allowance when reuse confirmed. No new mounting purchase or cost change now.';
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['D33','F33','F34']},expected:{I33:150,J33:150,I34:120,J34:120,J25:20864,J30:48,I29:null,J29:'INPUT NEEDED',J41:'INPUT NEEDED',J44:'INPUT NEEDED'},noteUpdates:[{sheet:1,cell:'I33',text:wireNote},{sheet:1,cell:'I34',text:mountNote}]},null,2));
  console.log('B05 physical-store colours/lengths total5m; B06 reuse-first; allowances unchanged.');
  process.exit(0);
}
if(process.argv.includes('--header-store-inspect')) {
  for(const [name,sheetName,range] of [['header-main-before','BOM Summary','A31:J31'],['header-shop-before','Physical Store','A46:F52']]) {
    const b=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));
  }
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!F31:J31",include:'values,formulas',tableMaxRows:1,tableMaxCols:5,maxChars:1200})).ndjson);
  process.exit(0);
}
if(process.argv.includes('--male-store')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F31').values=[['Male / female: PHYSICAL STORE\nPi connector: pending\n₱150 full-kit ESTIMATE']];
  const shop=wb.worksheets.getItem('Physical Store');
  shop.getRange('A50').values=[['Female and male header strips are assigned to physical-store shopping. The 2×20 keyed Pi ribbon/header connection remains pending; verify actual module and Pi-case clearance before assembly.']];
  shop.getRange('A52').values=[['Header-strip prices are unknown. PHP150 is the existing estimate for ALL B03 connectors, counted once in the BOM. Update I31 with the full kit cost after all constituent prices are known; do not enter only the strip prices there.']];
  const band=(range,txt,fill,height,color='#142536')=>{shop.mergeCells(range);shop.getRange(range).values=[[txt]];shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};};
  band('A54:F54','B03 — MALE HEADER STRIP — BUY IN PHYSICAL STORE','#285D36',28,'#FFFFFF');
  shop.getRange('A55:F55').values=[['BOM item','Part','Exact specification','Qty','Unit','Buying status / store']];
  shop.getRange('A55:F55').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  shop.getRange('A56:F56').values=[['B03 (male strip)','Male PCB header strip','1×40 pins, single row, straight through-hole solder legs, 2.54mm pitch; pin connections on perfboard',1,'strip','TO BUY — physical store; shop and actual quote pending']];
  shop.getRange('A56:F56').format={fill:'#FFFFFF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:72,verticalAlignment:'center'};
  shop.getRange('D56:E56').format.horizontalAlignment='center';
  band('A57:F57','Tell the shop: One straight, single-row, 40-pin male PCB header strip, 2.54mm spacing, through-hole solder legs.','#FFF4CF',42);
  band('A58:F58','Check included ADS1115 header before buying a duplicate for that module. Male-strip price is pending and included in the existing FULL B03 kit PHP150 estimate; no additional charge is added here. Pi connector remains to source.','#F0F3F6',50);
  wb.recalculate();
  assert.equal(shop.getRange('D56').values[0][0],1);
  assert.equal(shop.getRange('F51').values[0][0],150);
  for(const [c,v] of Object.entries({I31:150,J31:150,J25:20864,J30:48}))assert.equal(main.getRange(c).values[0][0],v,c);
  for(const c of ['J29','J41','J44'])assert.equal(main.getRange(c).values[0][0],'INPUT NEEDED',c);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'B03 male-header procurement scan'})).ndjson);
  for(const [name,sheetName,range] of [['header-main-after','BOM Summary','A31:J31'],['header-shop-after','Physical Store','A46:F58']]){const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  const evidence='Updated2026-10-24: user will buy both B03 female and male header strips in physical store, one each straight single-row1x40,2.54mm through-hole. Female shopping rows46:52; male54:58. Actual shop and strip prices unknown. Check included ADS1115 header before buying a duplicate for that module. Full B03 kit PHP150 estimate unchanged, counted once, includes remaining Pi2x20 keyed ribbon/header connection (sourcing pending). Update I31 only with total kit cost after constituent prices known; no order or assembly performed.';
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['F31'],3:['A50','A52']},expected:{I31:150,J31:150,J25:20864,J30:48,I29:null,J29:'INPUT NEEDED',J41:'INPUT NEEDED',J44:'INPUT NEEDED'},noteUpdates:[{sheet:1,cell:'I31',text:evidence}]},null,2));
  console.log('B03 male header assigned to physical store; complete-kit estimate unchanged.');
  process.exit(0);
}
if(process.argv.includes('--header-store')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F31').values=[['Female strip: PHYSICAL STORE\nMale / Pi connector: pending\n₱150 full-kit ESTIMATE']];
  const shop=wb.worksheets.getItem('Physical Store');
  const band=(range,txt,fill,height,color='#142536')=>{shop.mergeCells(range);shop.getRange(range).values=[[txt]];shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};};
  band('A46:F46','B03 — FEMALE HEADER STRIP — BUY IN PHYSICAL STORE','#285D36',28,'#FFFFFF');
  shop.getRange('A47:F47').values=[['BOM item','Part','Exact specification','Qty','Unit','Buying status / store']];
  shop.getRange('A47:F47').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  shop.getRange('A48:F48').values=[['B03 (female strip)','Female PCB header strip','1×40 sockets, single row, straight through-hole solder legs, 2.54mm pitch; for removable ADS1115 connection',1,'strip','TO BUY — physical store; shop and actual quote pending']];
  shop.getRange('A48:F48').format={fill:'#FFFFFF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:72,verticalAlignment:'center'};
  shop.getRange('D48:E48').format.horizontalAlignment='center';
  band('A49:F49','Tell the shop: One straight, single-row, 40-pin female PCB header strip with 2.54mm spacing and through-hole solder legs.','#FFF4CF',42);
  band('A50:F50','Only the female strip is assigned here. B03 male header strips and the 2×20 keyed Pi ribbon/header connection remain pending; verify actual module and Pi-case clearance before assembly.','#F0F3F6',46);
  band('A51:E51','FULL B03 KIT ALLOWANCE — NOT THE FEMALE STRIP PRICE (PHP; ESTIMATE)','#E8EBEF',38);
  shop.getRange('F51').formulas=[["='BOM Summary'!J31"]];
  shop.getRange('F51').setNumberFormat('"₱"#,##0.00');
  shop.getRange('F51').format={fill:'#E8EBEF',font:{name:'Arial',size:10,bold:true,color:'#142536'},rowHeight:38,horizontalAlignment:'right'};
  band('A52:F52','Female-strip price is unknown. PHP150 is the existing estimate for ALL B03 connectors, counted once in the BOM. Update I31 with the full kit cost after all constituent prices are known; do not enter the female-strip-only price there.','#F0F3F6',50);
  wb.recalculate();
  assert.equal(shop.getRange('F51').values[0][0],150);
  for(const [c,v] of Object.entries({I31:150,J31:150,J25:20864,J30:48})) assert.equal(main.getRange(c).values[0][0],v,c);
  for(const c of ['J29','J41','J44'])assert.equal(main.getRange(c).values[0][0],'INPUT NEEDED',c);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'B03 physical-store procurement scan'})).ndjson);
  for(const [name,sheetName,range] of [['header-main-after','BOM Summary','A31:J31'],['header-shop-after','Physical Store','A46:F52']]){const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  const evidence='Updated2026-10-24 at user request: B03 female header strip will be bought in a physical store. One straight single-row 1x40 female PCB header, 2.54mm pitch, through-hole solder legs. Physical Store rows46:52. Female-strip actual price/shop unknown. Existing PHP150 estimate covers the FULL B03 socket/header kit, including remaining male strips and 2x20 keyed Pi connection; those remain sourcing-pending. Do not substitute the female-strip-only price for full kit cost in I31. Count shopping list once; no new expense or purchase claimed. Verify actual ADS1115 header fit and Pi-case clearance later.';
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['F31']},expected:{I31:150,J31:150,J25:20864,J30:48,I29:null,J29:'INPUT NEEDED',J41:'INPUT NEEDED',J44:'INPUT NEEDED'},noteUpdates:[{sheet:1,cell:'I31',text:evidence}]},null,2));
  console.log('B03 female strip assigned to Physical Store; full kit estimate unchanged; remaining connector sourcing pending.');
  process.exit(0);
}
if(process.argv.includes('--inspect')) {
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!A8:J8",include:'values,formulas',tableMaxRows:1,tableMaxCols:10,maxChars:3000})).ndjson);
  const inspectTask=JSON.parse(await fs.readFile(`${root}/tmp/review/pending-store-item.json`,'utf8'));
  const preview=await wb.render({sheetName:'BOM Summary',range:process.argv.includes('--physical')?'A12:J15':inspectTask.mainRender,scale:1.2,format:'png'});
  await fs.writeFile(`${root}/tmp/review/store-link-before.png`,new Uint8Array(await preview.arrayBuffer()));
  const toolPreview=await wb.render({sheetName:'Review Notes',range:'A64:F67',scale:1.2,format:'png'});
  await fs.writeFile(`${root}/tmp/review/tools-before.png`,new Uint8Array(await toolPreview.arrayBuffer()));
  process.exit(0);
}
if(process.argv.includes('--button-store')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F22').values=[['PHYSICAL STORE\nSee Physical Store table\nESTIMATE; shop TBD']];
  const shop=wb.worksheets.getItem('Physical Store');
  const band=(range,txt,fill,height,color='#142536')=>{shop.mergeCells(range);shop.getRange(range).values=[[txt]];shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};};
  band('A22:F22','A17 — MOMENTARY PUSH BUTTONS — BUY IN PHYSICAL STORE','#285D36',28,'#FFFFFF');
  shop.getRange('A23:F23').values=[['BOM item','Part','Exact specification','Qty','Unit','Buying status / store']];
  shop.getRange('A23:F23').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  shop.getRange('A24:F24').values=[['A17','Momentary tactile push buttons','6×6mm, normally open (NO), through-hole tactile switch with 4 wire legs; returns when released; one TEST + one SHUTDOWN',2,'pc','TO BUY — physical store; shop and actual quote pending']];
  shop.getRange('A24:F24').format={fill:'#FFFFFF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:70,verticalAlignment:'center'};
  shop.getRange('D24:E24').format.horizontalAlignment='center';
  band('A25:F25','Tell the shop: Two 6×6mm, four-leg, normally open momentary tactile push buttons for a breadboard.','#FFF4CF',40);
  band('A26:E26','A17 TOTAL ALLOWANCE (PHP; ESTIMATE; already counted in BOM)','#E8EBEF',30);
  shop.getRange('F26').formulas=[["='BOM Summary'!J22"]];
  shop.getRange('F26').setNumberFormat('"₱"#,##0.00');
  shop.getRange('F26').format={fill:'#E8EBEF',font:{name:'Arial',size:10,color:'#142536',bold:true},rowHeight:30,horizontalAlignment:'right'};
  band('A27:F27','PHP5 each × 2 = PHP10 estimate, not a store quote. After obtaining a quote, update BOM Summary I22 (unit price); G22 stays 2. Do not count this shopping list again.','#F0F3F6',46);
  wb.recalculate();
  assert.equal(shop.getRange('F26').values[0][0],10);
  for(const [c,v] of Object.entries({I22:5,J22:10,J25:20564,J41:1470,J44:22034})) assert.equal(main.getRange(c).values[0][0],v,c);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'A17 procurement update formula scan'})).ndjson);
  for(const [name,sheetName,range] of [['button-main-after','BOM Summary','A21:J24'],['button-shop-after','Physical Store','A22:F27']]) {const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['F22']},expected:{I22:5,J22:10,J25:20564,J41:1470,J44:22034},noteUpdates:[{sheet:1,cell:'I22',text:'Updated 2026-10-24. User will buy A17 in a physical store. Two 6×6mm normally open momentary tactile switches, through-hole 4-leg type for prototype TEST and SHUTDOWN requests. PHP5 each / PHP10 total remains an ESTIMATE, not a store quote. Physical Store rows22:27 show purchase details; cost is included once in BOM. Shop/actual price/purchase not confirmed. Update I22 with actual per-piece price; G22 remains2.'}]},null,2));
  console.log('A17 added to Physical Store; PHP10 counted once; total unchanged.');
  process.exit(0);
}
if(process.argv.includes('--fuse-store')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F23').values=[['PHYSICAL STORE\nSee Physical Store table\nESTIMATE; shop TBD']];
  const shop=wb.worksheets.getItem('Physical Store');
  const band=(range,txt,fill,height,color='#142536')=>{shop.mergeCells(range);shop.getRange(range).values=[[txt]];shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};};
  band('A29:F29','A18 — FUSE AND HOLDER — BUY IN PHYSICAL STORE','#285D36',28,'#FFFFFF');
  shop.getRange('A30:F30').values=[['BOM item','Part','Exact specification','Qty','Unit','Buying status / store']];
  shop.getRange('A30:F30').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  shop.getRange('A31:F31').values=[['A18','Inline fuse holder + fuse','One 5×20mm inline holder with insulated wire leads + one matching 500mA (0.5A) fast-blow cartridge fuse; verify suitability for 5V DC',1,'set','TO BUY — physical store; exact model and actual quote pending']];
  shop.getRange('A31:F31').format={fill:'#FFFFFF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:70,verticalAlignment:'center'};
  shop.getRange('D31:E31').format.horizontalAlignment='center';
  band('A32:F32','Tell the shop: One 5×20mm inline fuse holder with wire leads and one matching 500mA (0.5A) fast-blow fuse, suitable for a 5V DC circuit.','#FFF4CF',40);
  band('A33:E33','A18 SET ALLOWANCE (PHP; ESTIMATE; already counted in BOM)','#E8EBEF',30);
  shop.getRange('F33').formulas=[["='BOM Summary'!J23"]];
  shop.getRange('F33').setNumberFormat('"₱"#,##0.00');
  shop.getRange('F33').format={fill:'#E8EBEF',font:{name:'Arial',size:10,color:'#142536',bold:true},rowHeight:30,horizontalAlignment:'right'};
  band('A34:F34','PHP60 per set ESTIMATE. For MQ-2/fan 5V branch only. Confirm exact fuse DC suitability and holder fit. Update BOM Summary I23 with actual set price; G23 stays 1. Already counted once.','#F0F3F6',46);
  wb.recalculate();
  assert.equal(shop.getRange('F33').values[0][0],60);
  for(const [c,v] of Object.entries({I23:60,J23:60,J25:20564,J41:1470,J44:22034})) assert.equal(main.getRange(c).values[0][0],v,c);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'A18 procurement update formula scan'})).ndjson);
  for(const [name,sheetName,range] of [['fuse-main-after','BOM Summary','A22:J24'],['fuse-shop-after','Physical Store','A29:F34']]) {const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['F23']},expected:{I23:60,J23:60,J25:20564,J41:1470,J44:22034},noteUpdates:[{sheet:1,cell:'I23',text:'Updated 2026-10-24. User will buy A18 in a physical store. One matching set: 5×20mm inline fuse holder with insulated wire leads + 500mA (0.5A) fast-blow cartridge fuse for 5V MQ-2/fan branch only. PHP60/set is an ESTIMATE, not a quote. Physical Store rows29:34; counted once in BOM. Exact model, DC suitability, shop/price and purchase remain unconfirmed. Check delivered holder fit and fuse time-current behaviour against measured start-up load later. Update I23 actual set price; G23 remains1.'}]},null,2));
  console.log('A18 added to Physical Store; PHP60 counted once; total unchanged.');
  process.exit(0);
}
if(process.argv.includes('--mount-store')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F24').values=[['Case ₱150; acrylic ₱150\nHardware ₱100: PHYSICAL STORE\nFan contents unconfirmed']];
  const shop=wb.worksheets.getItem('Physical Store');
  const band=(range,txt,fill,height,color='#142536')=>{shop.mergeCells(range);shop.getRange(range).values=[[txt]];shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};};
  band('A36:F36','A19 — MOUNTING HARDWARE — BUY IN PHYSICAL STORE','#285D36',28,'#FFFFFF');
  shop.getRange('A37:F37').values=[['BOM item','Part','Exact specification','Qty','Unit','Buying status / store']];
  shop.getRange('A37:F37').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  shop.getRange('A38:F39').values=[['A19 (hardware)','Nylon mounting kit','Assorted M2.5/M3 nylon spacers or standoffs with matching screws and nuts; actual diameters/lengths matched to board/case layout',1,'set','TO BUY — physical store; contents, shop and quote pending'],['A19 (hardware)','Adhesive rubber feet','Four self-adhesive rubber feet for acrylic base; size and height to suit actual base/layout',4,'pc','TO BUY — physical store; size, shop and quote pending']];
  shop.getRange('A38:F39').format={fill:'#FFFFFF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:72,verticalAlignment:'center'};
  shop.getRange('A39:F39').format.fill='#F5F7FA';shop.getRange('D38:E39').format.horizontalAlignment='center';
  band('A40:F40','Tell the shop: One small nylon mounting kit (spacers, matching screws and nuts) and four adhesive rubber feet for an electronics base.','#FFF4CF',42);
  band('A41:F41','Choose exact screw diameter and spacer length after checking actual parts/layout. M2.5 is for bare Pi holes; do not force M3 screws into them.','#F0F3F6',42);
  band('A42:E42','COMBINED HARDWARE ALLOWANCE (PHP; ESTIMATE; included in A19)','#E8EBEF',30);
  shop.getRange('F42').values=[[100]];shop.getRange('F42').setNumberFormat('"₱"#,##0.00');
  shop.getRange('F42').format={fill:'#E8EBEF',font:{name:'Arial',size:10,color:'#142536',bold:true},rowHeight:30,horizontalAlignment:'right'};
  band('A43:F43','PHP100 covers mounting kit AND feet together; not PHP100 each. Already in A19 PHP400 (base150 + case150 + hardware100). After quote, update I24 with base + case + actual combined hardware cost.','#F0F3F6',50);
  band('A44:F44','Reuse suitable hardware in the final build. Check actual kit contents before buying any B06 extras. Acrylic sheet and Pi case stay on their online purchase links.','#F0F3F6',42);
  wb.recalculate();
  assert.equal(shop.getRange('F42').values[0][0],100);
  for(const [c,v] of Object.entries({I24:400,J24:400,J25:20864,J41:1470,J44:22334}))assert.equal(main.getRange(c).values[0][0],v,c);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'A19 physical-store procurement scan'})).ndjson);
  for(const [name,sheetName,range] of [['mount-main-after','BOM Summary','A24:J25'],['mount-shop-after','Physical Store','A36:F44']]){const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  const task=JSON.parse(await fs.readFile(`${root}/tmp/review/pending-store-item.json`,'utf8'));
  const evidence=task.evidence+'\nUser procurement update2026-10-24: remaining A19 mounting hardware assigned to Physical Store rows36:44. One small nylon M2.5/M3 spacer/screw/nut kit plus4adhesive rubber feet. Exact diameters/lengths/feet size, kit counts, shop and actual quote pending. PHP100 COMBINED estimate counted once within A19set400; no extra charge. Actual order/purchase not confirmed. Reconcile reusable kit against B06 additional needs later. Case/acrylic online links retained. Grand22334 unchanged.';
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['F24']},expected:{I24:400,J24:400,J25:20864,J41:1470,J44:22334},noteUpdates:[{sheet:1,cell:'I24',text:evidence}]},null,2));
  console.log('A19 mounting kit and feet added to Physical Store; PHP100 combined already included; grand unchanged.');
  process.exit(0);
}
if(process.argv.includes('--printed-enclosure')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  const updates={C29:'Custom 3D-printed enclosure',D29:'User-owned printer; custom shell/lid; material, dimensions and filament use TBD after prototype; vents, sensor air path and cable entries required',E29:'Protects and mounts final electronics. Design around the delivered Pi case/boards with cooling airflow and exposed MQ-2 air access; print material and heat performance need verification.',F29:'3D PRINT IN HOUSE\nPrinter available\nFilament cost TBD',I29:null};
  for(const [c,v] of Object.entries(updates))main.getRange(c).values=[[v]];
  notes.getRange('B22').values=[['Custom printed enclosure']];
  notes.getRange('C22').values=[['User has a3D printer and will make B01. Material, size and filament cost remain unconfirmed; no flame/IP rating claimed. Plan ventilation, MQ-2 air access, case/board clearance and fasteners after prototype testing. Retail ABS box is no longer a purchase.']];
  notes.getRange('F22').values=[['User decision; material/cost TBD.']];
  wb.recalculate();
  const expected={I29:null,J29:'INPUT NEEDED',J25:20864,J41:'INPUT NEEDED',J44:'INPUT NEEDED'};
  for(const [c,v] of Object.entries(expected))assert.equal(main.getRange(c).values[0][0]??null,v,c);
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!F29:J30",include:'values,formulas',tableMaxRows:2,tableMaxCols:5,maxChars:1600})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Printed enclosure unpriced input scan'})).ndjson);
  for(const [name,sheetName,range] of [['print-main-after','BOM Summary','A28:J30'],['print-review-after','Review Notes','A22:F22'],['print-total-after','BOM Summary','H41:J44']]){const b=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await b.arrayBuffer()));}
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  const evidence='Updated2026-10-24. User owns a3D printer and elects to print the B01 final enclosure. Retail Makerlab MLE00652 ABS box PHP365 superseded, not purchased. Custom enclosure1pc required; printer already available. Filament material, print mass/support waste and cost are unknown; I29 intentionally blank, not zero. J29/J41/J44 flag INPUT NEEDED until cost entered. Prototype20864 unchanged; known final additions1105 excluding unpriced print; known materials21969 + printing costTBD. No CAD/printing/Phase2 or3 work started. Dimensions, vents/sensor-air path, case/board clearance, material/heat suitability and fastener choice are future design checks; no flame/IP certification claimed. Reuse A19/B06 fasteners where suitable; inserts not assumed mandatory or double-budgeted.';
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:[...Object.keys(updates),'J29','J41','J44'],2:['B22','C22','F22']},expected,noteUpdates:[{sheet:1,cell:'I29',text:evidence},{sheet:2,cell:'F22',text:evidence}]},null,2));
  console.log('B01 now custom print; retail365 removed; filament cost missing explicitly. Known materials21969 + printingTBD.');
  process.exit(0);
}
if(process.argv.includes('--physical')) {
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F14').values=[['PHYSICAL STORE\nSee Physical Store table\nESTIMATE; shop TBD']];
  const shop=wb.worksheets.add('Physical Store');
  shop.showGridLines=false;
  const widths=[12,22,66,9,10,35];
  widths.forEach((x,i)=>shop.getRange(`${String.fromCharCode(65+i)}:${String.fromCharCode(65+i)}`).format.columnWidth=x);
  shop.getRange('A1:F12').format.font={name:'Arial',size:10,color:'#142536'};
  shop.getRange('A1:F12').format.verticalAlignment='center';
  function shopBand(range,text,fill,height,color='#FFFFFF') {
    shop.mergeCells(range);shop.getRange(range).values=[[text]];
    shop.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};
  }
  shopBand('A1:F1','PHYSICAL-STORE SHOPPING LIST','#102B49',32);
  shopBand('A2:F2','A09 LEDs • Planned purchase in person • Added 24 Oct 2026','#E9F1EA',26,'#284B30');
  shopBand('A3:F3','Tell the shop: One red and one green 5mm diffused indicator LED, each with two wire leads.','#FFF4CF',34,'#554314');
  shop.getRange('A5:F5').values=[['BOM item','Part','Exact specification','Qty','Unit','Buying status / store']];
  shop.getRange('A5:F5').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',verticalAlignment:'center',wrapText:true,rowHeight:28};
  shop.getRange('A6:F7').values=[['A09','Red LED','5mm diffused red indicator LED; bare through-hole part with two leads',1,'pc','TO BUY — physical store; shop not chosen'],['A09','Green LED','5mm diffused green indicator LED; bare through-hole part with two leads',1,'pc','TO BUY — physical store; shop not chosen']];
  shop.getRange('A6:F7').format={wrapText:true,rowHeight:48,verticalAlignment:'center'};
  shop.getRange('A7:F7').format.fill='#F5F7FA';
  shop.getRange('D6:E7').format.horizontalAlignment='center';
  shopBand('A9:F9','Each LED uses its own 470Ω resistor from the A06 kit. The same LEDs are reused in the final build.','#F0F3F6',34,'#142536');
  shopBand('A10:E10','A09 ALLOWANCE FOR BOTH LEDs (PHP; ESTIMATE)','#E8EBEF',28,'#142536');
  shop.getRange('F10').formulas=[["='BOM Summary'!J14"]];
  shop.getRange('F10').setNumberFormat('"₱"#,##0.00');
  shop.getRange('F10').format={fill:'#E8EBEF',font:{name:'Arial',size:10,bold:true,color:'#142536'},rowHeight:28,horizontalAlignment:'right'};
  shopBand('A11:F11','This allowance is already included in the BOM total. After obtaining a store quote, enter the price for BOTH LEDs in BOM Summary I14 (quantity remains one pair).','#FFF4CF',38,'#554314');
  wb.recalculate();
  assert.equal(shop.getRange('F10').values[0][0],10);
  assert.ok(Math.abs(main.getRange('J44').values[0][0]-22685.6)<0.001);
  console.log((await wb.inspect({kind:'table',range:"'Physical Store'!A6:F7",include:'values',tableMaxRows:2,tableMaxCols:6,maxChars:1800})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Physical-store table formula error scan'})).ndjson);
  for(const [name,sheetName,range] of [['physical-store-after','Physical Store','A1:F11'],['store-link-after','BOM Summary','A12:J15']]) {
    const img=await wb.render({sheetName,range,scale:1.3,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await img.arrayBuffer()));
  }
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:prior.links,changedCells:{1:['F14']},expected:{I14:10,J14:10,J25:21215.6,J41:1470,J44:22685.6},noteUpdates:[{sheet:1,cell:'I14',text:'Updated 2026-10-24. User will buy A09 in a physical store. One red and one green 5mm diffused two-lead LED; purchase list on Physical Store sheet. PHP10 allowance for the pair remains an ESTIMATE, not a store quote. Already included once in project total. Enter actual pair price in I14 after quote; current quantity is one pair. No shop chosen or purchase confirmed.'}]},null,2));
  console.log('Physical Store table added; A09 counted once; total unchanged.');
  process.exit(0);
}
if(process.argv.includes('--item')) {
  const task=JSON.parse(await fs.readFile(`${root}/tmp/review/pending-store-item.json`,'utf8'));
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  for(const [cell,value] of Object.entries(task.updates)) main.getRange(cell).values=[[value]];
  for(const [cell,value] of Object.entries(task.notesUpdates||{})) notes.getRange(cell).values=[[value]];
  for(const edit of task.extraEdits||[]) {
    const sheet=wb.worksheets.getItem(edit.sheet);
    if(edit.merge) sheet.mergeCells(edit.range);
    if(edit.values) sheet.getRange(edit.range).values=edit.values;
    if(edit.formulas) sheet.getRange(edit.range).formulas=edit.formulas;
    if(edit.format) sheet.getRange(edit.range).format=edit.format;
    if(edit.numberFormat) sheet.getRange(edit.range).setNumberFormat(edit.numberFormat);
  }
  main.getRange(task.sourceCell).format.font={name:'Arial',size:10,color:task.url?'#1664B2':'#142536'};
  const start=task.reviewStart, head=start+1, data=start+2;
  if(!task.updateExistingReview) notes.mergeCells(`A${start}:F${start}`); notes.getRange(`A${start}`).values=[[task.title]];
  notes.getRange(`A${start}:F${start}`).format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  notes.getRange(`A${head}:F${head}`).values=[['Item','Seller / selected variant','Unit price (PHP)','Purchase quantity','Checked','Clickable listing']];
  notes.getRange(`A${head}:F${head}`).format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,horizontalAlignment:'center',verticalAlignment:'center'};
  notes.getRange(`A${data}:F${data}`).values=[[task.id,task.sellerVariant,task.unitPrice,task.qty,new Date('2026-10-24T00:00:00Z'),task.linkLabel]];
  notes.getRange(`A${data}:F${data}`).format={fill:task.reviewFill||'#E9F1EA',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:52,verticalAlignment:'center'};
  notes.getRange(`C${data}`).setNumberFormat('"₱"#,##0.00'); notes.getRange(`D${data}`).setNumberFormat('0'); notes.getRange(`E${data}`).setNumberFormat('yyyy-mm-dd');
  notes.getRange(`F${data}`).format.font={name:'Arial',size:10,color:task.url?'#1664B2':'#142536'};
  for(const [i,txt] of task.review.entries()) {
    const row=data+1+i;
    if(!task.updateExistingReview) notes.mergeCells(`A${row}:F${row}`); notes.getRange(`A${row}`).values=[[txt]];
    notes.getRange(`A${row}:F${row}`).format={fill:'#F0F3F6',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:44,verticalAlignment:'center'};
  }
  wb.recalculate();
  for(const [cell,expected] of Object.entries(task.expected)) {
    const actual=main.getRange(cell).values[0][0];
    if(expected===null)assert.ok(actual===null||actual===undefined||actual==='',cell);
    else if(typeof expected==='string')assert.equal(actual,expected,cell);
    else assert.ok(Math.abs(actual-expected)<0.001,cell);
  }
  console.log((await wb.inspect({kind:'table',range:`'BOM Summary'!F${task.mainRow}:J${task.mainRow}`,include:'values,formulas',tableMaxRows:1,tableMaxCols:5,maxChars:1200})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Store item formula error scan'})).ndjson);
  for(const [name,sheetName,range] of [['store-link-after','BOM Summary',task.mainRender],['store-link-review','Review Notes',`A${start}:F${data+task.review.length}`],...(task.extraRenders||[])]) {
    const img=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await img.arrayBuffer()));
  }
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  const retainedLinks=prior.links.filter(x=>!(x.sheet===1&&x.cell===task.sourceCell)&&!(x.sheet===2&&x.cell===`F${data}`));
  const reviewChanges=task.updateExistingReview?[`A${start}`,`B${data}`,`C${data}`,`D${data}`,`E${data}`,`F${data}`,...task.review.map((_,i)=>`A${data+1+i}`)]:[];
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:[...retainedLinks,...(task.url?[{sheet:1,cell:task.sourceCell,url:task.url},{sheet:2,cell:`F${data}`,url:task.reviewUrl||task.url}]:[])],changedCells:{1:[...Object.keys(task.updates),...task.changedResults],2:[...Object.keys(task.notesUpdates||{}),...reviewChanges],...(task.extraChangedCells||{})},expected:task.expected,noteUpdates:[{sheet:1,cell:task.priceCell,text:task.evidence},...(task.noteUpdates||[])]},null,2));
  console.log(`${task.id} updated; source links and quote staged.`);
  process.exit(0);
}
if(process.argv.includes('--resistors')) {
  const resistorUrl='https://shopee.ph/300pcs-600pcs-1-4W-Resistance-1-30-Kind-Each-10pcs-20pcs-Film-Resistor-Assorted-Kit-with-box-i.1367148707.26913804058?extraParams=%7B%22display_model_id%22%3A246760953056%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134253-8260z-mkwpstqtmxhf04&rModelId=246760953056&vItemId=53656276135&vModelId=282412317684&vShopId=1257811163';
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('D11').values=[['300 Pcs Box; metal-film axial resistors, 1/4W, ±1% claimed; 30 values × 10 each; includes 470Ω and 10kΩ']];
  main.getRange('F11').values=[['fulabs.ph / Shopee\n300 Pcs Box selected\nSCREENSHOT QUOTE']];
  main.getRange('F11').format.font={name:'Arial',size:10,color:'#1664B2'};
  main.getRange('I11').values=[[68]];
  const evidence='Checked 2026-10-24. User screenshots show fulabs.ph, selected 300 Pcs Box, quantity 1, PHP68. Enlarged chart lists 30 values x10 each including 470R (470 ohms) and 10K (10,000 ohms). Title claims 1/4W, 1%; photo describes metal film. Adequate for two 10k divider resistors and two 470-ohm LED resistors, with spares. Buy one 300-piece box; 600-piece variants unnecessary. Accessible Shopee page confirms listing/seller and PHP68-102 mixed-variant range; selected quote comes from screenshot. Check delivered values with multimeter; tolerance/material claims not independently tested. Replaces PHP69 120-piece reference: saving PHP1. Excludes shipping.\n'+resistorUrl;
  notes.mergeCells('A103:F103'); notes.getRange('A103:F103').values=[['STORE LINK REVIEW — A06 RESISTOR ASSORTMENT — 24 OCT 2026']];
  notes.getRange('A103:F103').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  notes.getRange('A104:F104').values=[['Item','Seller / selected variant','Price (PHP)','Status','Checked','Clickable listing']];
  notes.getRange('A104:F104').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,horizontalAlignment:'center',verticalAlignment:'center'};
  notes.getRange('A105:F105').values=[['A06','fulabs.ph; 300 Pcs Box; 30 values × 10',68,'Matches required values/specification',new Date('2026-10-24T00:00:00Z'),'Open Shopee resistor kit listing']];
  notes.getRange('A105:F105').format={fill:'#E9F1EA',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:52,verticalAlignment:'center'};
  notes.getRange('C105').setNumberFormat('"₱"#,##0.00'); notes.getRange('E105').setNumberFormat('yyyy-mm-dd');
  notes.getRange('F105').format.font={name:'Arial',size:10,color:'#1664B2'};
  for(const [row,txt] of [[106,'Selection: buy one 300 Pcs Box at PHP68, not either 600-piece variant. Seller chart shows 30 values with 10 of each, including 470R = 470Ω and 10K = 10,000Ω. Listed 1/4W metal-film, 1% tolerance meets the intended specification.'],[107,'Use: two 10kΩ resistors form the MQ-2 analog voltage divider; two 470Ω resistors limit current through the red/green LEDs. Ten of each value supplies enough parts and spares. Verify resistance with a multimeter before use; listed tolerance/material is not independently tested.'],[108,'Budget: A06 changes from PHP69 to PHP68 (saving PHP1). Prototype subtotal PHP21,207.60; final additions PHP1,470.00; grand total PHP22,677.60. Selected price is from user screenshot; accessible Shopee page shows PHP68–102 across variants. Shipping excluded.']]) {
    notes.mergeCells(`A${row}:F${row}`); notes.getRange(`A${row}`).values=[[txt]];
    notes.getRange(`A${row}:F${row}`).format={fill:'#F0F3F6',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:44,verticalAlignment:'center'};
  }
  wb.recalculate();
  assert.equal(main.getRange('J11').values[0][0],68);
  assert.ok(Math.abs(main.getRange('J25').values[0][0]-21207.6)<0.001);
  assert.ok(Math.abs(main.getRange('J44').values[0][0]-22677.6)<0.001);
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!F11:J11",include:'values,formulas',tableMaxRows:1,tableMaxCols:5,maxChars:1200})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Resistor quote formula error scan'})).ndjson);
  for(const [name,sheetName,range] of [['store-link-after','BOM Summary','A9:J12'],['store-link-review','Review Notes','A103:F108']]) {
    const img=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await img.arrayBuffer()));
  }
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:[...prior.links,{sheet:1,cell:'F11',url:resistorUrl},{sheet:2,cell:'F105',url:resistorUrl}],changedCells:{1:['D11','F11','I11','J11','J25','J44']},expected:{I8:2500,I9:89,I10:49,I11:68,J11:68,J25:21207.6,J41:1470,J44:22677.6},noteUpdates:[{sheet:1,cell:'I11',text:evidence}]},null,2));
  console.log('A06 updated to 300-piece kit at PHP68; subtotal and grand total down PHP1.');
  process.exit(0);
}
if(process.argv.includes('--adc')) {
  const adcUrl='https://shopee.ph/ADS1115-16-Bit-ADC-Module-4-Channel-Programmable-Gain-Amplifier-I2C-Arduino-ESP32-Raspberry-Pi-i.20469516.936425709?extraParams=%7B%22display_model_id%22%3A80024629775%2C%22model_selection_logic%22%3A3%7D&image_ids=a5c8493527960af4d0ba9397035849d5';
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('D10').values=[['ADS1115 16-bit, 4-channel I2C breakout; 3.3V in this design; ADDR to GND = 0x48; loose header shown, solder before use']];
  main.getRange('F10').values=[['Circuitrocks / Shopee\nADS1115 + loose header\nLISTED / ₱49 quote']];
  main.getRange('F10').format.font={name:'Arial',size:10,color:'#1664B2'};
  main.getRange('I10').values=[[49]];
  notes.getRange('C66').values=[['OWNED: soldering equipment (user, 2026-10-24); exact station/specification not supplied']];
  notes.getRange('D66:E66').values=[[0,0]];
  notes.getRange('F66').values=[['No new iron/station budgeted. Use for loose module headers and permanent joints; confirm solder/flux supplies separately.']];
  const evidence='Checked 2026-10-24. Circuitrocks Shopee title identifies ADS1115 16-bit 4-channel I2C module; board photo labelled ADS1115 with loose header strip. PHP49 in user screenshot and accessible Shopee page; crossed-out PHP215 is not used. Buy one module/header set; confirm included header at checkout. User owns soldering equipment, so unsoldered headers are acceptable. Design uses VDD and I2C pull-ups at 3.3V, ADDR grounded for 0x48; MQ-2 AO still needs two 10k divider resistors. TI ADS1115 documentation establishes IC capabilities, not authenticity or exact breakout schematic. Inspect delivered board/pull-ups and test before use. Replaces PHP500 Makerlab reference: saving PHP451; shipping excluded.\n'+adcUrl+'\nhttps://www.ti.com/product/ADS1115';
  notes.mergeCells('A96:F96'); notes.getRange('A96:F96').values=[['STORE LINK REVIEW — A05 ADS1115 ADC — 24 OCT 2026']];
  notes.getRange('A96:F96').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  notes.getRange('A97:F97').values=[['Item','Seller / selected item','Price (PHP)','Status','Checked','Clickable listing']];
  notes.getRange('A97:F97').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,horizontalAlignment:'center',verticalAlignment:'center'};
  notes.getRange('A98:F98').values=[['A05','Circuitrocks ADS1115 breakout + loose header',49,'Matches required type; solder header',new Date('2026-10-24T00:00:00Z'),'Open Shopee ADS1115 listing']];
  notes.getRange('A98:F98').format={fill:'#E9F1EA',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:52,verticalAlignment:'center'};
  notes.getRange('C98').setNumberFormat('"₱"#,##0.00'); notes.getRange('E98').setNumberFormat('yyyy-mm-dd');
  notes.getRange('F98').format.font={name:'Arial',size:10,color:'#1664B2'};
  for(const [row,txt] of [[99,'Selection: one ADS1115 16-bit 4-channel I2C breakout. Photo shows matching board label and loose header strip. User has soldering equipment; solder header before breadboard use. Confirm header included; board identity/function still require arrival inspection and tests.'],[100,'Compatibility: power this breakout and its I2C pull-ups from 3.3V for the Pi. Set ADDR to GND for address 0x48. MQ-2 remains on nominal 5V with its AO reduced through two 10kΩ resistors before AIN0. The programmable gain range does not permit input above the supply rail.'],[101,'Price: PHP49 in user screenshot and accessible Shopee page; replaces PHP500 Makerlab reference (saving PHP451). Prototype subtotal PHP21,208.60; final additions PHP1,470.00; grand PHP22,678.60. Shipping and tools excluded. Soldering equipment marked owned; consumables not assumed owned.']]) {
    notes.mergeCells(`A${row}:F${row}`); notes.getRange(`A${row}`).values=[[txt]];
    notes.getRange(`A${row}:F${row}`).format={fill:'#F0F3F6',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:44,verticalAlignment:'center'};
  }
  wb.recalculate();
  assert.equal(main.getRange('J10').values[0][0],49);
  assert.ok(Math.abs(main.getRange('J25').values[0][0]-21208.6)<0.001);
  assert.ok(Math.abs(main.getRange('J44').values[0][0]-22678.6)<0.001);
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!F10:J10",include:'values,formulas',tableMaxRows:1,tableMaxCols:5,maxChars:1200})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'ADS1115 quote formula error scan'})).ndjson);
  for(const [name,sheetName,range] of [['store-link-after','BOM Summary','A8:J11'],['store-link-review','Review Notes','A96:F101'],['tools-after','Review Notes','A64:F67']]) {
    const img=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await img.arrayBuffer()));
  }
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:[...prior.links,{sheet:1,cell:'F10',url:adcUrl},{sheet:2,cell:'F98',url:adcUrl}],changedCells:{1:['D10','F10','I10','J10','J25','J44'],2:['C66','D66','E66','F66']},expected:{I8:2500,I9:89,I10:49,J10:49,J25:21208.6,J41:1470,J44:22678.6},noteUpdates:[{sheet:1,cell:'I10',text:evidence}]},null,2));
  console.log('A05 ADS1115 updated to PHP49; soldering equipment marked owned.');
  process.exit(0);
}
if(process.argv.includes('--mq')) {
  const mqUrl='https://shopee.ph/ENGLAB%E2%98%85MQ-Series-Gas-Sensor-Detection-Modules-for-Gas-Detection-Smog-Alcohol-Methane-Carbon-monoxide-AIR-Quality-Hydrogen-Propane-Detection-Sensor-MQ-2-3-4-5-6-7-8-9-135-i.1021339444.17295791325?extraParams=%7B%22display_model_id%22%3A231949058250%2C%22model_selection_logic%22%3A3%7D&image_ids=sg-11134201-7rbk0-lks54h6z1irc91';
  const prior=JSON.parse(await fs.readFile(`${root}/tmp/review/store-link-targets.json`,'utf8'));
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('D9').values=[['MQ-2 sensor on assembled 4-pin module; VCC/GND/AO/DO required; nominal 5V heater; ENG LAB.ph MQ-2 variation']];
  main.getRange('F9').values=[['ENG LAB.ph / Shopee\nMQ-2 selected\nSCREENSHOT QUOTE']];
  main.getRange('F9').format.font={name:'Arial',size:10,color:'#1664B2'};
  main.getRange('I9').values=[[89]];
  const evidence='Checked 2026-10-24. User screenshot shows ENG LAB.ph MQ-2 variant selected at PHP89, quantity 1; module with sensor already mounted. Shopee accessible page confirms listing/seller and range PHP89-99 across MQ variants, not live selected-variant checkout price. Accept as A04 module type; physical module labels VCC/GND/AO/DO and nominal 5V operation must be checked before wiring. No exact ENGLAB datasheet, pin order or current verified. MQ-2 is not interchangeable with other MQ models. Standard Winsen MQ-2 heater reference 5.0V ±0.1V; it does not prove the ENGLAB sensor is made by Winsen. Use planned 3.3V ADS1115 and two 10k divider resistors; do not connect module output directly to Pi GPIO. DO unused. Replaces Makerlab PHP75 reference, budget +PHP14. Excludes shipping.\n'+mqUrl;
  notes.mergeCells('A89:F89'); notes.getRange('A89:F89').values=[['STORE LINK REVIEW — A04 MQ-2 MODULE — 24 OCT 2026']];
  notes.getRange('A89:F89').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  notes.getRange('A90:F90').values=[['Item','Seller / selected variant','Price (PHP)','Status','Checked','Clickable listing']];
  notes.getRange('A90:F90').format={fill:'#285D36',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,horizontalAlignment:'center',verticalAlignment:'center'};
  notes.getRange('A91:F91').values=[['A04','ENG LAB.ph; MQ-2 assembled module',89,'Matches module type; inspect on arrival',new Date('2026-10-24T00:00:00Z'),'Open Shopee MQ-2 listing']];
  notes.getRange('A91:F91').format={fill:'#E9F1EA',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:52,verticalAlignment:'center'};
  notes.getRange('C91').setNumberFormat('"₱"#,##0.00'); notes.getRange('E91').setNumberFormat('yyyy-mm-dd');
  notes.getRange('F91').format.font={name:'Arial',size:10,color:'#1664B2'};
  for(const [row,txt] of [[92,'Selection: buy one assembled MQ-2 module, not MQ-3/4/5/6/7/8/9/135. User screenshot confirms selected MQ-2 and PHP89. Web listing confirms seller and PHP89–99 range across variants. Shipping and final checkout price are not verified.'],[93,'Compatibility: use nominal 5V module with VCC/GND/AO/DO. Confirm the delivered labels, pin order and supply specification before wiring; the screenshot is not a complete pinout. No direct module output to Pi GPIO: use the planned ADS1115 plus two 10kΩ divider resistors.'],[94,'Budget: A04 changes from PHP75 to PHP89 (+PHP14). Prototype subtotal PHP21,659.60; final additions PHP1,470.00; grand total PHP23,129.60. Camera alternatives remain pending. No physical performance, calibration or certification has been tested.']]) {
    notes.mergeCells(`A${row}:F${row}`); notes.getRange(`A${row}`).values=[[txt]];
    notes.getRange(`A${row}:F${row}`).format={fill:'#F0F3F6',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:44,verticalAlignment:'center'};
  }
  wb.recalculate();
  assert.equal(main.getRange('J9').values[0][0],89);
  assert.ok(Math.abs(main.getRange('J25').values[0][0]-21659.6)<0.001);
  assert.ok(Math.abs(main.getRange('J44').values[0][0]-23129.6)<0.001);
  console.log((await wb.inspect({kind:'table',range:"'BOM Summary'!F9:J9",include:'values,formulas',tableMaxRows:1,tableMaxCols:5,maxChars:1200})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'MQ-2 quote formula error scan'})).ndjson);
  for(const [name,sheetName,range] of [['store-link-after','BOM Summary','A5:J10'],['store-link-review','Review Notes','A89:F94']]) {
    const img=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await img.arrayBuffer()));
  }
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:[...prior.links,{sheet:1,cell:'F9',url:mqUrl},{sheet:2,cell:'F91',url:mqUrl}],changedCells:{1:['D9','F9','I9','J9','J25','J44']},expected:{I8:2500,I9:89,J9:89,J25:21659.6,J41:1470,J44:23129.6},noteUpdates:[{sheet:1,cell:'I9',text:evidence}]},null,2));
  console.log('A04 MQ-2 updated to PHP89; prototype and grand totals increased by PHP14.');
  process.exit(0);
}
if(process.argv.includes('--2k')) {
  const url2='https://shopee.ph/2K-Full-HD-Webcam-With-Microphone-4-Million-Pixels-USB-Web-Camera-Adjustable-FOV-Noise-Canceling-i.1080991217.21486145835?extraParams=%7B%22display_model_id%22%3A157101677860%2C%22model_selection_logic%22%3A3%7D&image_ids=ph-11134207-7rasi-m52oa72gyqmb0a&rModelId=157101677860&vItemId=40110614131&vModelId=300892483736&vShopId=1257811163';
  await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
  main.getRange('F8').values=[['2K candidate: ₱433*\nPENDING; *after voucher\nBaseline quote pending']];
  const evidence='Checked 2026-10-24 from two user screenshots; Shopee could not be independently accessed. Actual Shop, selected variant 2K, displayed PHP433 AFTER VOUCHER, excluding shipping. Regular price and voucher eligibility not established. Seller explicitly claims Linux compatibility and USB plug-and-play without extra drivers. This is stronger compatibility evidence than the earlier generic camera description, but not a test on Raspberry Pi OS. UVC is not named, exact model/sensor, native resolution, video modes/fps, viewing angle and maximum current are missing. Title claims 4 million pixels, 2K and adjustable FOV; these are unverified. Physical mount adjustment does not establish adjustable optical FOV. Microphone is not required for smoke detection. Candidate only: PHP2500 Waveshare baseline and totals unchanged. If accepted later, review B10 mount.\n'+url2;
  notes.mergeCells('A81:F81'); notes.getRange('A81:F81').values=[['STORE LINK REVIEW — A03 SECOND CAMERA CANDIDATE — 24 OCT 2026']];
  notes.getRange('A81:F81').format={fill:'#254E79',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,verticalAlignment:'center'};
  notes.getRange('A82:F82').values=[['Item','Seller / selected variant','Price (PHP)','Status','Checked','Clickable listing']];
  notes.getRange('A82:F82').format={fill:'#254E79',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,horizontalAlignment:'center',verticalAlignment:'center'};
  notes.getRange('A83:F83').values=[['A03','Actual Shop generic webcam; selected 2K variant',433,'PENDING; price after voucher',new Date('2026-10-24T00:00:00Z'),'Open Shopee 2K webcam listing']];
  notes.getRange('A83:F83').format={fill:'#FFF4CF',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:52,verticalAlignment:'center'};
  notes.getRange('C83').setNumberFormat('"₱"#,##0.00'); notes.getRange('E83').setNumberFormat('yyyy-mm-dd');
  notes.getRange('F83').format.font={name:'Arial',size:10,color:'#1664B2'};
  for(const [row,txt] of [
    [84,'Seller claims: Linux support, USB plug-and-play without extra drivers, microphone, and selected 2K variant. These claims make it a promising compatibility candidate; Raspberry Pi OS operation has not been tested.'],
    [85,'Missing: UVC confirmation, exact model/sensor, native resolution, video resolutions/frame rates, actual viewing angle and maximum USB current. “Adjustable FOV” may refer to mount positioning; it does not establish optical zoom or a wide-angle lens.'],
    [86,'Price evidence: user screenshots show PHP433 AFTER VOUCHER for the selected 2K variation. Regular price, voucher eligibility and shipping are unknown. Shopee could not be independently opened. Candidate quote is excluded from totals; A03 baseline remains PHP2,500.'],
    [87,'Ask seller: Is the selected 2K variant UVC compatible on Raspberry Pi OS? Can it output 1920×1080 video at 30fps? What is its viewing angle and maximum USB current? Please send exact model/video-mode specifications. Review B10 camera mounting if accepted.']
  ]) {
    notes.mergeCells(`A${row}:F${row}`); notes.getRange(`A${row}`).values=[[txt]];
    notes.getRange(`A${row}:F${row}`).format={fill:'#F0F3F6',font:{name:'Arial',size:10,color:'#142536'},wrapText:true,rowHeight:44,verticalAlignment:'center'};
  }
  wb.notes.add({id:'candidate-A03-2K-20261024',target:{cell:{sheetName:notes.name,sheetId:notes.sheetId,address:'F83'}},authorId:'',createdAt:'',body:{plainText:evidence}});
  wb.recalculate();
  assert.equal(main.getRange('I8').values[0][0],2500);
  assert.ok(Math.abs(main.getRange('J44').values[0][0]-23115.6)<0.001);
  console.log((await wb.inspect({kind:'table',range:"'Review Notes'!A83:F83",include:'values',tableMaxRows:1,tableMaxCols:6,maxChars:1200})).ndjson);
  console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Formula error scan after second candidate'})).ndjson);
  for(const [name,sheetName,range] of [['store-link-after','BOM Summary','A5:J10'],['store-link-review','Review Notes','A81:F87']]) {
    const img=await wb.render({sheetName,range,scale:1.2,format:'png'});
    await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await img.arrayBuffer()));
  }
  await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
  await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:[{sheet:1,cell:'F8',url:url2},{sheet:2,cell:'F75',url},{sheet:2,cell:'B79',url:direct},{sheet:2,cell:'F83',url:url2}]},null,2));
  console.log('Second A03 candidate staged; original candidate retained; budget unchanged.');
  process.exit(0);
}
await fs.copyFile(file,`${root}/tmp/review/bom-before-store-links.xlsx`);
main.getRange('F8').values=[['Shopee candidate: ₱268\nUNVERIFIED\nBaseline quote pending']];
main.getRange('F8').format.font={name:'Arial',size:10,color:'#1664B2'};
const evidence='A03 candidate only, checked 2026-10-23. Circuitrocks generic USB camera, direct-store SKU AG039. PHP268 shown in user Shopee screenshots and seller direct page. Shopee page could not be accessed independently. The seller claims plug-and-play and up to 5MP output but does not establish native sensor resolution, Linux UVC compatibility, video modes/frame rates, field of view or maximum current. 8cm to infinity describes focus distance, not optical focal length. Do not assume it is equivalent to the Waveshare OV2710 baseline. I8 remains the PHP2500 baseline estimate, not this candidate price.\nShopee: '+url+'\nSeller page: '+direct;
wb.notes.add({id:'candidate-A03-20261023',target:{cell:{sheetName:main.name,sheetId:main.sheetId,address:'F8'}},authorId:'',createdAt:'',body:{plainText:evidence}});
function band(range,text,fill,height,color='#FFFFFF') {
  notes.mergeCells(range); notes.getRange(range).values=[[text]];
  notes.getRange(range).format={fill,font:{name:'Arial',size:10,bold:true,color},wrapText:true,rowHeight:height,verticalAlignment:'center'};
}
band('A73:F73','STORE LINK REVIEW — A03 CAMERA CANDIDATE — 23 OCT 2026','#254E79',28);
notes.getRange('A74:F74').values=[['Item','Seller / candidate','Price (PHP)','Status','Checked','Clickable listing']];
notes.getRange('A74:F74').format={fill:'#254E79',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:28,horizontalAlignment:'center',verticalAlignment:'center'};
notes.getRange('A75:F75').values=[['A03','Circuitrocks generic USB camera; direct-store SKU AG039',268,'PENDING verification',new Date('2026-10-23T00:00:00Z'),'Open Shopee camera listing']];
notes.getRange('A75:F75').format={fill:'#FFF4CF',wrapText:true,rowHeight:52,verticalAlignment:'center'};
notes.getRange('C75').setNumberFormat('"₱"#,##0.00');
notes.getRange('E75').setNumberFormat('yyyy-mm-dd');
notes.getRange('F75').format.font={name:'Arial',size:10,color:'#1664B2'};
band('A76:F76','Decision: candidate only; not yet confirmed as the final A03 replacement. The PHP268 quote is excluded from totals. The existing Waveshare camera allowance of PHP2,500 and project total remain unchanged.','#F0F3F6',40,'#142536');
band('A77:F77','Missing: exact sensor/model and native resolution; Raspberry Pi OS/Linux UVC support; available live-video resolutions and frame rates; field of view; maximum USB current. The seller’s 5MP claim does not establish native 5MP video. “8cm to infinity” is focus range.','#F0F3F6',44,'#142536');
band('A78:F78','Evidence: PHP268 in the user’s Shopee screenshots and matching Circuitrocks direct listing. Shopee could not be independently opened. Ask seller for Linux UVC confirmation, video modes/fps (ideally v4l2-ctl --list-formats-ext), viewing angle and maximum current before approving the substitute.','#F0F3F6',44,'#142536');
notes.getRange('A79').values=[['Seller page']];
notes.getRange('B79').values=[['Open Circuitrocks specifications']];
notes.getRange('B79').format.font={name:'Arial',size:10,color:'#1664B2'};
notes.getRange('A79:F79').format.rowHeight=25;
wb.notes.add({id:'candidate-A03-source-20261023',target:{cell:{sheetName:notes.name,sheetId:notes.sheetId,address:'F75'}},authorId:'',createdAt:'',body:{plainText:evidence}});
wb.recalculate();
assert.equal(main.getRange('I8').values[0][0],2500);
assert.equal(main.getRange('J25').values[0][0],21645.6);
assert.equal(main.getRange('J41').values[0][0],1470);
assert.ok(Math.abs(main.getRange('J44').values[0][0]-23115.6)<0.001);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:15},summary:'Formula error scan after store-link entry'})).ndjson);
for(const [name,sheetName,range] of [['store-link-after','BOM Summary','A5:J10'],['store-link-review','Review Notes','A73:F79']]) {
 const preview=await wb.render({sheetName,range,scale:1.2,format:'png'});
 await fs.writeFile(`${root}/tmp/review/${name}.png`,new Uint8Array(await preview.arrayBuffer()));
}
await (await SpreadsheetFile.exportXlsx(wb)).save(`${root}/tmp/review/bom-store-links-staged.xlsx`);
await fs.writeFile(`${root}/tmp/review/store-link-targets.json`,JSON.stringify({file,staged:`${root}/tmp/review/bom-store-links-staged.xlsx`,links:[{sheet:1,cell:'F8',url},{sheet:2,cell:'F75',url},{sheet:2,cell:'B79',url:direct}]},null,2));
console.log('Staged narrow A03 edit; baseline inputs and totals preserved.');
