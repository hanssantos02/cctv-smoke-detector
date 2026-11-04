import json
import posixpath
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import xml.etree.ElementTree as ET

root=Path('/home/hans/repos/cctv-smoke-detector')
cfg=json.loads((root/'tmp/review/store-link-targets.json').read_text())
S='http://schemas.openxmlformats.org/spreadsheetml/2006/main'
R='http://schemas.openxmlformats.org/officeDocument/2006/relationships'
P='http://schemas.openxmlformats.org/package/2006/relationships'
ET.register_namespace('',S)
ET.register_namespace('r',R)
with ZipFile(cfg['staged']) as z:
    entries={i.filename:z.read(i.filename) for i in z.infolist()}
for sheet in (1,2):
    name=f'xl/worksheets/sheet{sheet}.xml'
    relname=f'xl/worksheets/_rels/sheet{sheet}.xml.rels'
    ws=ET.fromstring(entries[name])
    rels=ET.fromstring(entries[relname]) if relname in entries else ET.Element(f'{{{P}}}Relationships')
    links=ws.find(f'{{{S}}}hyperlinks')
    if links is None:
        links=ET.Element(f'{{{S}}}hyperlinks')
        # CT_Worksheet: hyperlinks follow data validations, precede print/drawing/extensions.
        following={'printOptions','pageMargins','pageSetup','headerFooter','rowBreaks','colBreaks','customProperties','cellWatches','ignoredErrors','smartTags','drawing','legacyDrawing','legacyDrawingHF','picture','oleObjects','controls','webPublishItems','tableParts','extLst'}
        insert=next((i for i,c in enumerate(ws) if c.tag.split('}')[-1] in following),len(ws))
        ws.insert(insert,links)
    existing={r.get('Id') for r in rels}
    for x in [x for x in cfg['links'] if x['sheet']==sheet]:
        for old_link in list(links):
            if old_link.get('ref')==x['cell']: links.remove(old_link)
        idx=1
        while f'rIdStoreLink{idx}' in existing: idx+=1
        rid=f'rIdStoreLink{idx}'
        existing.add(rid)
        ET.SubElement(rels,f'{{{P}}}Relationship',{'Id':rid,'Type':R+'/hyperlink','Target':x['url'],'TargetMode':'External'})
        ET.SubElement(links,f'{{{S}}}hyperlink',{'ref':x['cell'],f'{{{R}}}id':rid})
    entries[name]=ET.tostring(ws,encoding='utf-8',xml_declaration=True)
    entries[relname]=ET.tostring(rels,encoding='utf-8',xml_declaration=True)
    if sheet==1 and len(cfg['links'])==4:
        commentrel=next((r for r in rels if r.get('Type','').endswith('/comments')),None)
        if commentrel is not None:
            target=commentrel.get('Target')
            commentpath=target.lstrip('/') if target.startswith('/') else posixpath.normpath(posixpath.join('xl/worksheets',target))
            comments=ET.fromstring(entries[commentpath])
            comment=comments.find(f"{{{S}}}commentList/{{{S}}}comment[@ref='F8']")
            assert comment is not None
            txt=comment.find('{'+S+'}text')
            txt.clear()
            ET.SubElement(txt,'{'+S+'}t').text='Updated 2026-10-24. Clickable source now points to Actual Shop generic webcam, selected 2K variant. PHP433 AFTER VOUCHER in user screenshots; regular price, voucher eligibility and shipping unknown. Seller claims Linux support and no extra drivers. UVC confirmation, exact model/native resolution, video modes/frame rates, viewing angle and maximum current still missing. Candidate assessment: Review Notes A81:F87. Earlier Circuitrocks PHP268 candidate retained in Review Notes A73:F79. Neither candidate replaces the Waveshare baseline; I8 remains PHP2500 and totals are unchanged. Shopee could not be independently accessed.'
            entries[commentpath]=ET.tostring(comments,encoding='utf-8',xml_declaration=True)
    for update in [u for u in cfg.get('noteUpdates',[]) if u['sheet']==sheet]:
        commentrel=next(r for r in rels if r.get('Type','').endswith('/comments'))
        target=commentrel.get('Target')
        commentpath=target.lstrip('/') if target.startswith('/') else posixpath.normpath(posixpath.join('xl/worksheets',target))
        comments=ET.fromstring(entries[commentpath])
        comment=comments.find(f"{{{S}}}commentList/{{{S}}}comment[@ref='{update['cell']}']")
        assert comment is not None
        txt=comment.find('{'+S+'}text'); txt.clear()
        ET.SubElement(txt,'{'+S+'}t').text=update['text']
        entries[commentpath]=ET.tostring(comments,encoding='utf-8',xml_declaration=True)
with ZipFile(cfg['file'],'w',ZIP_DEFLATED) as z:
    for k,v in entries.items(): z.writestr(k,v)

def cells(path,sheet):
    with ZipFile(path) as z:
        strings=[]
        if 'xl/sharedStrings.xml' in z.namelist():
            strings=[''.join(si.itertext()) for si in ET.fromstring(z.read('xl/sharedStrings.xml'))]
        ws=ET.fromstring(z.read(f'xl/worksheets/sheet{sheet}.xml'))
        out={}
        for c in ws.findall('.//{'+S+'}sheetData/{'+S+'}row/{'+S+'}c'):
            f=c.find('{'+S+'}f'); v=c.find('{'+S+'}v'); it=c.find('{'+S+'}is')
            val=v.text if v is not None else None
            if c.get('t')=='s': val=strings[int(val)]
            if it is not None: val=''.join(it.itertext())
            if f is not None or val is not None: out[c.get('r')]=(f.text if f is not None else None,val)
        return out,ws
backup=root/'tmp/review/bom-before-store-links.xlsx'
with ZipFile(backup) as original_zip:
    original_sheet_numbers=[int(n.split('sheet')[-1].split('.')[0]) for n in original_zip.namelist() if n.startswith('xl/worksheets/sheet') and n.endswith('.xml')]
for sh in original_sheet_numbers:
    old,ow=cells(backup,sh); new,nw=cells(cfg['file'],sh)
    for cell,value in old.items():
        changed=cfg.get('changedCells',{'1':['F8']}).get(str(sh),[])
        if cell in changed: continue
        assert new.get(cell)==value,(sh,cell,value,new.get(cell))
    def serialize(node): return ET.tostring(node) if node is not None else None
    assert serialize(ow.find('{'+S+'}dataValidations'))==serialize(nw.find('{'+S+'}dataValidations'))
    assert serialize(ow.find('{'+S+'}sheetViews'))==serialize(nw.find('{'+S+'}sheetViews'))
with ZipFile(cfg['file']) as z:
    for x in cfg['links']:
        ws=ET.fromstring(z.read(f"xl/worksheets/sheet{x['sheet']}.xml"))
        rel=ET.fromstring(z.read(f"xl/worksheets/_rels/sheet{x['sheet']}.xml.rels"))
        h=ws.find(f"{{{S}}}hyperlinks/{{{S}}}hyperlink[@ref='{x['cell']}']")
        target=next(r for r in rel if r.get('Id')==h.get('{'+R+'}id'))
        assert target.get('Target')==x['url'] and target.get('TargetMode')=='External'
    main,_=cells(cfg['file'],1)
    for cell,expected in cfg.get('expected',{'I8':2500,'J25':21645.6,'J41':1470,'J44':23115.6}).items():
        actual=main.get(cell,(None,None))[1]
        if expected is None:
            assert actual in (None,''),(cell,actual)
        elif isinstance(expected,str):
            assert actual==expected,(cell,actual,expected)
        else:
            assert abs(float(actual)-expected)<0.0001
print(f"Verified: {len(cfg['links'])} native clickable hyperlink targets; unrelated cells, validation and freeze panes preserved; expected totals correct.")
