import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
import { asOf, source, prototype, finalAdditions, decisions, power, tools, changes, reused } from './bom-data.mjs';

const root = '/home/hans/repos/cctv-smoke-detector';
const out = `${root}/outputs/bom-review-2026-10-22-f01c1aae`;
await fs.mkdir(out, {recursive:true});
const total = items => Math.round(items.reduce((sum,x)=>sum+x.qty*x.price,0)*100)/100;
const aTotal=total(prototype), bTotal=total(finalAdditions), grand=aTotal+bTotal;
const peso = x => `PHP ${x.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const mdEscape = x => String(x).replaceAll('|','/').replaceAll('\n',' ');
const table = items => [
  '| # | Item name | Exact model/spec | Qty | Est. unit price (PHP) | Subtotal (PHP) | Where to buy (PH) | Why it is needed and how it makes the project work |',
  '| --- | --- | --- | --- | ---: | ---: | --- | --- |',
  ...items.map(x=>`| ${x.id} | ${x.name} | ${mdEscape(x.spec)} | ${x.qty} ${x.unit} | ${x.price.toFixed(2)} (${x.status}) | ${(x.qty*x.price).toFixed(2)} | ${mdEscape(x.store)} | ${mdEscape(x.purpose)} |`)
].join('\n');

let bom = `# Sentrion SDS200 - reviewed bill of materials\n\nPHASE 1: MATERIALS BUYING. Price check: ${asOf}, Asia/Manila. All costs are Philippine Peso (PHP).\n\n`;
bom += `## Scope and architecture\n\nThe user confirmed that **camera detection, MQ-2 sensing and battery backup are required**. The paper specifies one indoor Raspberry Pi 4 system using Python and OpenCV (a library that processes images), with a USB/IP camera, audible/visual alerts, Wi-Fi and event snapshots. This BOM budgets a USB camera because no existing CCTV model or stream was supplied. A Raspberry Pi is a small Linux computer; its USB and network interfaces suit this software better than an Arduino/ESP32 microcontroller. An ADS1115 analog-to-digital converter (ADC) translates the MQ-2 voltage into numbers the Pi can read.\n\n`;
bom += `**Recommended backup:** a closed, ready-made external CyberPower VP700ELCD UPS (uninterruptible power supply) powers the official Pi USB-C adapter. Its battery and charger are already inside. The existing router/ONT can also be plugged into suitable battery-backed outlets, subject to connector and load checks. This adds size and cost but avoids a beginner assembling loose lithium cells. The UPS stays outside the detector enclosure. This recommendation awaits BOM approval; it is not a purchase.\n\n`;
bom += `Assumptions: one indoor camera, existing Linux setup computer and working Wi-Fi/LAN/router, no owned project parts deducted. Budget, deadline, room size and required backup duration remain unspecified. Phase 2 software must validate the actual camera/frame rate, detection method and alarm logic; no performance claim is established by buying these parts.\n\n`;
bom += `## Price basis and buying checks\n\n**LISTED** means a retailer price was observed; it is not a guaranteed available offer. **ESTIMATE** means no exact current Philippine quote was verified and you must confirm the amount. Shipping, unknown import costs, tools, installation labour, router/ONT purchases and certified smoke alarms are excluded from materials totals. Do not count workshop tools or optional alternatives in the grand total.\n\nThe exact Makerlab 4GB Pi listing is ${peso(10449)} and unavailable; e-Gizmo lists PHP 4,800 including VAT, also unavailable. The higher observed listing is used as a cautious reference while sourcing. The official adapter and selected buzzer are also listed out of stock. The camera is an estimate. Obtain live quotes before ordering. A PHP 699 Makerlab adapter listing currently selects OKDO despite its official-Pi title; it is not silently substituted.\n\n`;
bom += `## Table A: Prototype phase materials\n\nThese are purchases made during Phase 1 for Phase 2 prototyping. Camera, backup and cooling are included now so all required functions can be tested before final construction.\n\n${table(prototype)}\n\n**Table A total: ${peso(aTotal)}**\n\n`;
bom += `## Table B: Main product phase materials - additional items only\n\nPurchase these for Phase 3 after the prototype succeeds.\n\n${table(finalAdditions)}\n\n**Table B total: ${peso(bTotal)}**\n\n**Reused from prototype:** ${reused}\n\n**Estimated grand total, A + B: ${peso(grand)}**\n\nThe prototype switches become bench spares when panel switches are installed. This mechanical upgrade is explicit; all reusable sensing, compute, indicator and power parts are purchased only once.\n\n`;
bom += `## Price evidence by item\n\n`;
for(const x of [...prototype,...finalAdditions]) bom+=`- **${x.id} ${x.name} - ${x.status}:** ${x.evidence}${x.urls.length?' Sources: '+x.urls.map((u,i)=>`[${i+1}](${u})`).join(', '):' Confirm with the suggested Philippine store.'}\n`;
bom += `\n## Compatibility and power review\n\n`;
for(const [category,title,detail,evidence] of decisions.filter(x=>!['Scope','Architecture','Sources','Price issue'].includes(x[0]))) bom+=`### ${title}\n\n${detail}\n\nReference: ${evidence}\n\n`;
bom+=`### 5V rail planning budget\n\nThese are design allowances, not measured current ratings. The computer allowance includes its microSD and radio; the separate camera allowance must not be counted inside it again.\n\n| Load | Current allowance (A) | Basis |\n| --- | ---: | --- |\n`;
for(const p of power) bom+=`| ${p[0]} | ${p[1].toFixed(2)} | ${p[2]} |\n`;
const current=power.reduce((s,p)=>s+p[1],0);
bom+=`| Total | ${current.toFixed(2)} | Approximately ${(current*5.1).toFixed(2)}W at 5.1V |\n| Adapter capacity | 3.00 | Official 5.1V/3A USB-C adapter |\n| Reserved margin | ${(3-current).toFixed(2)} | ${(100*(3-current)/3).toFixed(1)}% of rated output |\n\nAcceptance condition: measure the actual video-processing workload with camera, Wi-Fi, fan, heater and alarm active. Keep sustained current within 2.5A and short peaks below the adapter's 3A rating, with no undervoltage or thermal throttling. If measurements exceed this plan, revise the power architecture (for example an independently powered USB hub) before the final build; that contingent hardware is not priced as if already required. The UPS 390W AC rating does not increase the Pi adapter's 3A DC limit. Check sensor supply is 4.9-5.1V at its pins. The Pi 4 USB aggregate limit remains 1.2A, and camera plus UPS data allowances total 0.55A.\n\nThe UPS can provide ordinary outage backup but no runtime is promised. Manufacturer runtime at half rated load is not a valid prediction for this much smaller load. Test it with the detector and any networking equipment actually connected. USB HID is a reporting interface, not a 5V high-current Pi power socket.\n\n`;
bom+=`## Cheaper or better alternatives\n\n- If a genuine 4GB Pi can be supplied at e-Gizmo's listed PHP 4,800 including VAT, it would save PHP 5,649 from this reference budget. That listing is currently out of stock; confirm price and stock first. Do not buy a different RAM variant based on a multi-variant search headline.\n- A working existing Linux-UVC USB camera can replace A03, saving the camera allowance; check scene coverage, focus, exposure and Linux support. An existing IP camera is only a substitute after its accessible RTSP/ONVIF stream, power and network path are confirmed. An analog BNC camera needs a compatible USB capture device, which is not included.\n- A generic 1080p UVC PCB camera may cost less, but no exact PH model/price was verified. Keep the same purchase requirements and measure current. The named Waveshare camera provides a documented baseline.\n- A cheaper ADC breakout may be available, but verify it is an ADS1115, has soldered headers, and supports 3.3V operation. The selected PHP 500 item has a verified local variant.\n- Existing USB reader, wire assortment, buttons or cooling can be deducted by setting their quantities to zero in Excel after confirming suitability. A blank price means missing information, not zero cost.\n- A compact Waveshare UPS HAT (B) is an alternative only. Estimate PHP 3,000-4,500 for board, matched charger and two genuine cells; no current exact PH bundle quote was verified. It would replace the external backup arrangement after a power and safety review. Do not buy both designs or add its estimate to the total.\n\n`;
bom+=`## Tools you may need\n\nThese are workshop purchases, **excluded from A/B and the project-materials grand total**. All tool prices below are ESTIMATES; verify with Makerlab, Alexan, Circuitrocks, local hardware stores or reputable PH sellers. Borrow tools where practical.\n\n| Tool | Specification | Estimated PHP range | Why needed |\n| --- | --- | ---: | --- |\n`;
for(const t of tools) bom+=`| ${t[0]} | ${t[1]} | ${t[2]===null?'Already-owned assumption; no price':`${t[2]}-${t[3]}`} | ${t[4]} |\n`;
bom+=`\n## Phase boundary\n\nNo wiring, flashing or package setup is performed in this review. Phase 2 will provide exact Linux setup commands, wiring pin tables, code and component-by-component checks. Ask before installing packages, using sudo, flashing anything or changing files outside the project. Use only closed approved mains adapters/UPS products; do not open or wire 220-230V circuits. Keep an independent certified smoke alarm in service.\n\nAre you happy with this BOM? Should I proceed to Phase 2?\n`;
await fs.writeFile(`${root}/docs/BOM.md`,bom);
let review='# BOM audit and changes\n\nPHASE 1: MATERIALS BUYING. Reviewed '+asOf+'.\n\n';
review+='Read all four original project files, including all three BOM PDF pages and both specification PDF pages. PROJECT.md contained only an unfilled template. The attached fingerprint-drawer screenshots supplied layout guidance only; their electronics and text were not copied into the smoke detector BOM. Original PDFs are preserved unchanged.\n\n';
review+='## Original item disposition\n\n| Original item/group | Action | Reason |\n| --- | --- | --- |\n'+changes.map(x=>`| ${x.map(mdEscape).join(' | ')} |`).join('\n');
review+='\n\n## Engineering review and unresolved checks\n\n'+decisions.map(x=>`### ${x[0]}: ${x[1]}\n\n${x[2]}\n\nReference: ${x[3]}\n`).join('\n');
review+='\n## Verification limits\n\nThe review checks the paper design, component roles, pin-resource availability, nominal voltage/interface compatibility and a planning power budget. No hardware or computer-vision code exists in the original folder and none has been built or physically tested. The workbook calculations will be verified separately. Phase 1 ends at BOM approval.\n';
await fs.writeFile(`${root}/docs/BOM_REVIEW.md`,review);
await fs.writeFile(`${root}/PROJECT.md`,`# PROJECT.md: Project Brief\n\nUpdated ${asOf} from the supplied product-specification PDF and the user's clarifications. Recommendations and assumptions below are distinct from confirmed requirements.\n\n## Basics\n- **Project name:** Sentrion SDS200\n- **Goal:** Indoor CCTV-based visible-smoke detection and automated local/network alerts.\n- **Required features:** Camera detection, MQ-2 sensing and battery backup (user-confirmed); buzzer, LED, Wi-Fi/local-network alerts, event logs, timestamps and snapshots (paper).\n- **Optional features:** Remote/mobile/email/web notifications; final method not chosen.\n\n## Usage\n- **Environment:** Indoor fixed installation; room size, lighting and humidity to be confirmed.\n- **Power:** Recommend official Pi 5.1V/3A adapter supplied by a packaged external 230V UPS. User requested a recommendation; this choice awaits BOM approval.\n- **Connectivity:** Existing Wi-Fi/LAN/router assumed. Network gear also needs backup for outage notifications.\n\n## Budget and constraints\n- **Budget limit (PHP):** Not specified. See docs/BOM.md for the checked estimate and availability limits.\n- **Size / weight limits:** Not specified; external UPS is separate from detector enclosure.\n- **Deadline:** Not specified.\n- **Required battery runtime:** Not specified; measure with actual load.\n\n## Platform\n- **Computer:** Raspberry Pi 4 Model B (paper); 4GB variant retained from original BOM.\n- **Language / framework:** Python with OpenCV (paper). Exact versions belong to Phase 2.\n- **Camera:** Budget one Waveshare OV2710 2MP USB Camera (A), UVC; recommended documented replacement for unspecified 120° board camera. No exact PH quote yet. Existing IP/USB cameras can be evaluated before purchase.\n- **MQ-2 interface:** Recommended ADS1115 at 3.3V with a two-resistor voltage divider, not a digital logic converter.\n\n## What is already owned\n- **Tools:** Not specified. Assume access to existing Linux computer/router only; confirm before deductions.\n- **Parts:** Not specified; BOM currently budgets all listed parts.\n\n## Status and constraints\n- Current phase: Phase 1 BOM review. No permission to start Phase 2 has been given.\n- Physical detector performance, camera coverage, power draw, shutdown/restart behaviour and backup runtime remain untested.\n- Research prototype; keep independent certified smoke alarms.\n- Source PDFs remain unchanged. Detailed decisions and item corrections are in docs/BOM_REVIEW.md.\n`);

const wb = Workbook.create();
const main = wb.worksheets.add('BOM Summary');
const notes = wb.worksheets.add('Review Notes');
const navy='#102B49', blue='#254E79', green='#285D36', yellow='#F4C135', grey='#E8EBEF';
const money='"₱"#,##0.00;[Red]("₱"#,##0.00);"₱"0.00';
for(const s of [main,notes]) {s.showGridLines=false; s.tabColor=s===main?navy:'#7291A5';}
main.getRange('A1:J70').format.font={name:'Arial',size:10,color:'#142536'};
main.getRange('A1:J70').format.verticalAlignment='center';
const widths=[8,19,31,47,55,26,7,9,19,20];
widths.forEach((v,i)=>main.getRange(`${String.fromCharCode(65+i)}:${String.fromCharCode(65+i)}`).format.columnWidth=v);
function merged(s,range,text,fill=navy,height=26,size=10,align='left') {
  s.mergeCells(range); const r=s.getRange(range); r.values=[[text]];
  r.format={fill,font:{name:'Arial',size,bold:true,color:'#FFFFFF'},verticalAlignment:'center',horizontalAlignment:align,wrapText:true,rowHeight:height};
}
merged(main,'A1:J1','BILL OF MATERIALS: SENTRION SDS200 CCTV-BASED SMOKE DETECTION',navy,34,15,'center');
main.getRange('A1:J1').format.borders={bottom:{style:'medium',color:yellow}};
merged(main,'A2:J2',`Philippine market reference • ${asOf} • Raspberry Pi 4 + USB camera + MQ-2 + external battery backup`,navy,24,10,'center');
merged(main,'A3:J3','Budget estimate; tools, shipping and labour excluded. Out-of-stock references and estimates need quotes. Price-source notes are attached to unit-price cells.', '#FFF4CF',28);
main.getRange('A3:J3').format.font={name:'Arial',size:10,color:'#554314'};
merged(main,'A4:J4','TABLE A: PROTOTYPE MATERIALS (Phase 1 purchases for Phase 2; core parts reused in final build)',blue,27);
const headers=['Item #','Category','Item Description','Model / Technical Specification','Purpose & Project Justification','Local PH Source','Qty','Unit','Unit Price (PHP)','Total Price (PHP)'];
function header(s,row,fill=blue) {
  const r=s.getRange(`A${row}:J${row}`); r.values=[headers];
  r.format={fill,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',verticalAlignment:'center',wrapText:true,rowHeight:30};
  r.format.borders={preset:'all',color:'#FFFFFF',style:'thin'};
}
header(main,5);
const rowMap={};
function rows(items,start) {
  main.getRange(`A${start}:J${start+items.length-1}`).values=items.map(x=>[x.id,x.category,x.name,x.spec,x.purpose,`${x.store}\n${x.status}`,x.qty,x.unit,x.price,null]);
  for(let i=0;i<items.length;i++) {
    const row=start+i,x=items[i]; rowMap[x.id]=row;
    const r=main.getRange(`A${row}:J${row}`);
    r.format.wrapText=true;r.format.rowHeight=56;
    r.format.fill=i%2===0?'#FFFFFF':'#F5F7FA';
    r.format.borders={preset:'all',color:'#D9DFE5',style:'thin'};
    main.getRange(`A${row}:B${row}`).format.font={name:'Arial',size:10,color:'#142536'};
    main.getRange(`G${row}:I${row}`).format.fill='#FFF9E9';
    main.getRange(`G${row}`).format.horizontalAlignment='center';
    main.getRange(`H${row}`).format.horizontalAlignment='center';
    main.getRange(`I${row}:J${row}`).format.horizontalAlignment='right';
    main.getRange(`I${row}:J${row}`).setNumberFormat(money);
    main.getRange(`J${row}`).formulas=[[`=IF(AND(ISNUMBER(G${row}),ISNUMBER(I${row})),G${row}*I${row},"INPUT NEEDED")`]];
    if(x.status.includes('OUT OF STOCK'))main.getRange(`F${row}`).format.font={name:'Arial',size:10,color:'#9B3E18'};
    wb.notes.add({id:`price-${x.id}`,target:{cell:{sheetName:main.name,sheetId:main.sheetId,address:`I${row}`}},authorId:'',createdAt:'',body:{plainText:`Checked ${asOf}. ${x.status}. ${x.evidence}\n${x.urls.join('\n')||'No exact current PH quote verified; budget estimate.'}`}});
  }
  const end=start+items.length-1;
  main.getRange(`G${start}:G${end}`).dataValidation={rule:{type:'whole',operator:'greaterThanOrEqual',formula1:0}};
  main.getRange(`I${start}:I${end}`).dataValidation={rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}};
  return end;
}
const aStart=6,aEnd=rows(prototype,aStart),aSub=aEnd+1;
function subtotal(row,label,start,end) {
  merged(main,`A${row}:I${row}`,label,grey,28,10,'right');
  main.getRange(`A${row}:I${row}`).format.font={name:'Arial',size:10,bold:true,color:'#142536'};
  main.getRange(`J${row}`).formulas=[[`=IF(COUNT(J${start}:J${end})=ROWS(J${start}:J${end}),SUM(J${start}:J${end}),"INPUT NEEDED")`]];
  main.getRange(`J${row}`).format={fill:grey,font:{name:'Arial',size:10,bold:true,color:'#142536'},horizontalAlignment:'right',verticalAlignment:'center',rowHeight:28};
  main.getRange(`J${row}`).setNumberFormat(money);
}
subtotal(aSub,'SUBTOTAL: PROTOTYPE PURCHASES',aStart,aEnd);
const bBand=aSub+2,bHead=bBand+1,bStart=bHead+1;
merged(main,`A${bBand}:J${bBand}`,'TABLE B: MAIN PRODUCT MATERIALS (Phase 3 permanent-build additions only)',green,27);
header(main,bHead,green);
const bEnd=rows(finalAdditions,bStart),bSub=bEnd+1;
subtotal(bSub,'SUBTOTAL: PERMANENT BUILD ADDITIONS',bStart,bEnd);
const reuseRow=bSub+1,grandRow=bSub+3;
merged(main,`A${reuseRow}:J${reuseRow}`,`REUSED FROM PROTOTYPE: ${reused}`,'#E9F1EA',32);
main.getRange(`A${reuseRow}:J${reuseRow}`).format.font={name:'Arial',size:10,color:'#284B30'};
merged(main,`A${grandRow}:I${grandRow}`,'ESTIMATED GRAND TOTAL PROJECT MATERIALS (PHP)',navy,34,11,'right');
main.getRange(`J${grandRow}`).formulas=[[`=IF(AND(ISNUMBER(J${aSub}),ISNUMBER(J${bSub})),J${aSub}+J${bSub},"INPUT NEEDED")`]];
main.getRange(`J${grandRow}`).format={fill:navy,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},rowHeight:34,horizontalAlignment:'right',verticalAlignment:'center'};
main.getRange(`J${grandRow}`).setNumberFormat(money);
merged(main,`A${grandRow+1}:J${grandRow+1}`,'Edit pale-yellow quantity and price cells to use confirmed quotes or deduct owned items. Use zero for owned items; blanks flag missing inputs. Review Notes explains corrections, power checks and tool costs.','#F0F3F6',28);
main.getRange(`A${grandRow+1}:J${grandRow+1}`).format.font={name:'Arial',size:10,color:'#455566'};
main.freezePanes.freezeRows(5);

// The second sheet serves the technical review and tools workflow, not a second BOM calculation.
notes.getRange('A1:F100').format.font={name:'Arial',size:10,color:'#142536'};
notes.getRange('A1:F100').format.verticalAlignment='center';
const nWidths=[20,34,50,20,20,52];
nWidths.forEach((v,i)=>notes.getRange(`${String.fromCharCode(65+i)}:${String.fromCharCode(65+i)}`).format.columnWidth=v);
merged(notes,'A1:F1','BOM REVIEW: DECISIONS, COMPATIBILITY AND BUYING CHECKS',navy,34,14);
merged(notes,'A2:F2',`Checked ${asOf}. Specifications reviewed on paper; physical compatibility, software and smoke-detection performance remain untested.`,'#FFF4CF',30);
notes.getRange('A2:F2').format.font={name:'Arial',size:10,color:'#554314'};
merged(notes,'A4:F4','ENGINEERING AND PROCUREMENT REVIEW',blue,26);
notes.getRange('A5:F5').values=[['Topic','Decision / Check','Details',null,null,'Evidence / Reference']];
notes.mergeCells('C5:E5');
notes.getRange('A5:F5').format={fill:blue,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:28,verticalAlignment:'center',wrapText:true};
let nr=6;
for(const [topic,title,detail,evidence] of decisions) {
  notes.getRange(`A${nr}:B${nr}`).values=[[topic,title]];
  notes.mergeCells(`C${nr}:E${nr}`); notes.getRange(`C${nr}`).values=[[detail]];
  const evidenceUrl=evidence.match(/https?:\/\/\S+/)?.[0];
  if(evidenceUrl) {
    const label=evidence.split('http')[0].trim().replace(/[;:]$/,'')+'. URL in cell note.';
    notes.getRange(`F${nr}`).values=[[label]];
    wb.notes.add({id:`review-ref-${nr}`,target:{cell:{sheetName:notes.name,sheetId:notes.sheetId,address:`F${nr}`}},authorId:'',createdAt:'',body:{plainText:evidence}});
  } else notes.getRange(`F${nr}`).values=[[evidence]];
  notes.getRange(`A${nr}:F${nr}`).format={fill:nr%2?'#F4F6F8':'#FFFFFF',wrapText:true,rowHeight:68,verticalAlignment:'center'};
  notes.getRange(`F${nr}`).format.font={name:'Arial',size:10,color:'#53697B'};
  nr++;
}
nr++;
const powerBand=nr;
merged(notes,`A${nr}:F${nr}`,'5V POWER BUDGET: DESIGN ALLOWANCES, NOT MEASUREMENTS',green,27);nr++;
notes.getRange(`A${nr}:F${nr}`).values=[['Load',null,'Current allowance (A)',null,'Power at 5.1V (W)','Basis']];notes.mergeCells(`A${nr}:B${nr}`);notes.mergeCells(`C${nr}:D${nr}`);
notes.getRange(`A${nr}:F${nr}`).format={fill:green,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:30,wrapText:true};nr++;
const pStart=nr;
for(const p of power) {
  notes.mergeCells(`A${nr}:B${nr}`);notes.getRange(`A${nr}`).values=[[p[0]]];
  notes.mergeCells(`C${nr}:D${nr}`);notes.getRange(`C${nr}`).values=[[p[1]]];
  notes.getRange(`E${nr}`).formulas=[[`=C${nr}*$E$${pStart+power.length+1}`]];
  notes.getRange(`F${nr}`).values=[[p[2]]];
  notes.getRange(`A${nr}:F${nr}`).format={fill:nr%2?'#F5F7FA':'#FFFFFF',wrapText:true,rowHeight:38};nr++;
}
const pEnd=nr-1;
notes.mergeCells(`A${nr}:B${nr}`);notes.getRange(`A${nr}`).values=[['Total allowance']];notes.mergeCells(`C${nr}:D${nr}`);notes.getRange(`C${nr}`).formulas=[[`=SUM(C${pStart}:C${pEnd})`]];notes.getRange(`E${nr}`).formulas=[[`=SUM(E${pStart}:E${pEnd})`]];notes.getRange(`A${nr}:F${nr}`).format={fill:grey,font:{name:'Arial',size:10,bold:true},rowHeight:28};const pTotal=nr;nr++;
notes.mergeCells(`A${nr}:D${nr}`);notes.getRange(`A${nr}`).values=[['Adapter output voltage (V)']];notes.getRange(`E${nr}`).values=[[5.1]];nr++;
notes.mergeCells(`A${nr}:D${nr}`);notes.getRange(`A${nr}`).values=[['Adapter current capacity (A)']];notes.getRange(`E${nr}`).values=[[3]];const capacityRow=nr;nr++;
notes.mergeCells(`A${nr}:D${nr}`);notes.getRange(`A${nr}`).values=[['Current reserve (A)']];notes.getRange(`E${nr}`).formulas=[[`=E${capacityRow}-C${pTotal}`]];nr++;
notes.getRange(`C${pStart}:E${nr}`).setNumberFormat('0.00');
merged(notes,`A${nr}:F${nr}`,'Acceptance: measure ≤2.5A sustained, peaks below 3A, no undervoltage/throttling, and MQ-2 supply 4.9-5.1V. Revise power parts if the actual load exceeds this plan. UPS AC capacity does not raise the adapter DC limit.','#FFF4CF',44);
notes.getRange(`A${nr}:F${nr}`).format.font={name:'Arial',size:10,color:'#554314'};nr+=2;
const changeBand=nr;
merged(notes,`A${nr}:F${nr}`,'CHANGES TO THE ORIGINAL BOM',blue,27);nr++;
for(const [name,action,reason] of changes) {
  notes.mergeCells(`A${nr}:B${nr}`);notes.getRange(`A${nr}`).values=[[name]];
  notes.getRange(`C${nr}`).values=[[action]];
  notes.mergeCells(`D${nr}:F${nr}`);notes.getRange(`D${nr}`).values=[[reason]];
  notes.getRange(`A${nr}:F${nr}`).format={fill:nr%2?'#F5F7FA':'#FFFFFF',wrapText:true,rowHeight:46};nr++;
}
nr++;
const toolsBand=nr;
merged(notes,`A${nr}:F${nr}`,'WORKSHOP TOOLS: ESTIMATES ONLY, EXCLUDED FROM MATERIALS TOTAL',green,27);nr++;
notes.getRange(`A${nr}:F${nr}`).values=[['Tool',null,'Specification','Low PHP','High PHP','Why needed']];notes.mergeCells(`A${nr}:B${nr}`);notes.getRange(`A${nr}:F${nr}`).format={fill:green,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:28};nr++;
for(const [name,spec,low,high,purpose] of tools) {
  notes.mergeCells(`A${nr}:B${nr}`);notes.getRange(`A${nr}`).values=[[name]];
  notes.getRange(`C${nr}:F${nr}`).values=[[spec,low,high,purpose]];
  notes.getRange(`D${nr}:E${nr}`).setNumberFormat(money);
  notes.getRange(`A${nr}:F${nr}`).format={fill:nr%2?'#F5F7FA':'#FFFFFF',wrapText:true,rowHeight:58};nr++;
}
notes.freezePanes.freezeRows(5);

wb.recalculate();
assert.equal(main.getRange(`J${aSub}`).values[0][0],aTotal);
assert.equal(main.getRange(`J${bSub}`).values[0][0],bTotal);
assert.ok(Math.abs(main.getRange(`J${grandRow}`).values[0][0]-grand)<0.001);
assert.equal(notes.getRange(`C${pTotal}`).values[0][0],current);

// Verify editable inputs drive line totals and subtotals; restore before export.
const testRow=rowMap.A03;
main.getRange(`G${testRow}`).values=[[2]];
assert.ok(Math.abs(main.getRange(`J${grandRow}`).values[0][0]-(grand+2500))<0.001);
main.getRange(`G${testRow}`).values=[[0]];
assert.ok(Math.abs(main.getRange(`J${grandRow}`).values[0][0]-(grand-2500))<0.001);
main.getRange(`G${testRow}`).values=[[1]];
main.getRange(`I${testRow}`).clear({applyTo:'contents'});
assert.equal(main.getRange(`J${grandRow}`).values[0][0],'INPUT NEEDED');
main.getRange(`I${testRow}`).values=[[2500]];
wb.recalculate();
console.log((await wb.inspect({kind:'table',range:`'BOM Summary'!I${grandRow}:J${grandRow}`,include:'values,formulas',tableMaxRows:2,tableMaxCols:2})).ndjson);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:30},summary:'Final formula error scan'})).ndjson);
await fs.writeFile(`${root}/tmp/review/workbook-checks.json`,JSON.stringify({aTotal,bTotal,grand,current,aSub,bSub,grandRow,pTotal,capacityRow,powerBand,changeBand,toolsBand,lastNoteRow:nr,rowMap},null,2));
for(const [file,sheet,range] of [
  ['main-top','BOM Summary','A1:J12'],
  ['main-middle','BOM Summary','A13:J25'],
  ['main-final','BOM Summary',`A${bBand}:J${grandRow+1}`],
  ['notes-top','Review Notes','A1:F13'],
  ['notes-lower-review','Review Notes','A14:F27'],
  ['notes-power','Review Notes',`A${powerBand}:F${changeBand-2}`],
  ['notes-changes','Review Notes',`A${changeBand}:F${toolsBand-2}`],
  ['notes-tools','Review Notes',`A${toolsBand}:F${nr-1}`],
]) {
  if(process.env.BOM_RENDER_SCOPE==='review' && !['notes-top','notes-lower-review'].includes(file)) continue;
  const preview=await wb.render({sheetName:sheet,range,scale:1.35,format:'png'});
  await fs.writeFile(`${root}/tmp/review/${file}.png`,new Uint8Array(await preview.arrayBuffer()));
}
await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/Sentrion_SDS200_BOM.xlsx`);
console.log(JSON.stringify({file:`${out}/Sentrion_SDS200_BOM.xlsx`,aTotal,bTotal,grand,powerCurrent:current}));
