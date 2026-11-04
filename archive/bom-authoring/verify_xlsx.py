"""Read-only checks of the authored file and LibreOffice-recalculated copy."""
import json
import math
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET

ROOT = Path('/home/hans/repos/cctv-smoke-detector')
checks = json.loads((ROOT / 'tmp/review/workbook-checks.json').read_text())
NS = {'s': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

def cell_map(z, sheet):
    tree = ET.fromstring(z.read(f'xl/worksheets/sheet{sheet}.xml'))
    return tree, {c.attrib['r']: c for c in tree.findall('.//s:sheetData/s:row/s:c', NS)}

def number(cells, address):
    return float(cells[address].find('s:v', NS).text)

def verify(path):
    with ZipFile(path) as z:
        main_tree, main = cell_map(z, 1)
        notes_tree, notes = cell_map(z, 2)
        expected = {
            f'J{checks["aSub"]}': checks['aTotal'],
            f'J{checks["bSub"]}': checks['bTotal'],
            f'J{checks["grandRow"]}': checks['grand'],
        }
        for address, amount in expected.items():
            assert math.isclose(number(main, address), amount, abs_tol=.001), (path, address)
        for identifier, row in checks['rowMap'].items():
            assert main[f'J{row}'].find('s:f', NS) is not None, identifier
            assert math.isclose(number(main, f'G{row}') * number(main, f'I{row}'), number(main, f'J{row}'), abs_tol=.001), identifier
        assert math.isclose(number(notes, f'C{checks["pTotal"]}'), 2.5, abs_tol=.001)
        assert math.isclose(number(notes, f'E{checks["pTotal"]}'), 12.75, abs_tol=.001)
        assert main_tree.find('.//s:pane', NS).attrib['ySplit'] == '5'
        assert notes_tree.find('.//s:pane', NS).attrib['ySplit'] == '5'
        validations=main_tree.findall('.//s:dataValidation',NS)
        covered={area for rule in validations for area in rule.attrib['sqref'].split()}
        assert covered == {'G6:G24','I6:I24','G29:G40','I29:I40'}, covered
        errors = []
        for name in z.namelist():
            if name.startswith('xl/worksheets/sheet') and name.endswith('.xml'):
                t = ET.fromstring(z.read(name))
                errors.extend((name,c.attrib['r']) for c in t.findall('.//s:c',NS) if c.attrib.get('t')=='e')
        assert not errors, errors
        comment_files=[n for n in z.namelist() if n.startswith('xl/') and 'comment' in n.lower() and n.endswith('.xml')]
        comment_count=sum(len(ET.fromstring(z.read(n)).findall('.//s:comment',NS)) for n in comment_files)
        assert comment_count >= 31, comment_count
        return {'path':str(path),'main_totals':expected,'line_items':len(checks['rowMap']),'notes':comment_count,'formula_errors':0,'power_A':2.5,'power_W':12.75}

paths = [ROOT/'outputs/bom-review-2026-10-22-f01c1aae/Sentrion_SDS200_BOM.xlsx', ROOT/'tmp/review/native-check/Sentrion_SDS200_BOM.xlsx']
result=[verify(p) for p in paths]
(ROOT/'tmp/review/verification-result.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2))
