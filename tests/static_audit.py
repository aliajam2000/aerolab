"""Static markup/source audit; does not render browser CSS."""
from pathlib import Path
import re
from html.parser import HTMLParser
root=Path(__file__).resolve().parent.parent
class Audit(HTMLParser):
    def __init__(self): super().__init__();self.ids=[];self.links=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='script':self.links.append(a.get('src',''))
        if tag=='link':self.links.append(a.get('href',''))
a=Audit();a.feed((root/'index.html').read_text())
assert len(a.ids)==len(set(a.ids)), 'Duplicate HTML IDs'
assert all((root/p).is_file() for p in a.links),'Missing runtime resource'
assert not any(p.startswith(('http:','https:','//')) for p in a.links),'Remote runtime resource'
js=(root/'js/app.js').read_text()
refs=set(re.findall(r"\$\('([^']+)'\)",js))
dynamic={'tierSelect','out-'}
assert refs-set(a.ids)-dynamic==set(),refs-set(a.ids)-dynamic
css=(root/'css/style.css').read_text()
for token in ['focus-visible','prefers-reduced-motion','@media(max-width:800px)','overflow-x:auto']:
    assert token in css,token
assert 'aria-live="polite"' in (root/'index.html').read_text()
for f in root.glob('js/**/*.js'):
    source=f.read_text()
    assert 'fetch(' not in source
    assert 'http://' not in source or 'www.w3.org/2000/svg' in source
for name in ['CURRICULUM.md','OXFORD_MAPPING.md','PHYSICS_MODEL.md','GAME_DESIGN.md','FLIGHTLAB_INTEGRATION.md','SOURCE_AUDIT.md','QA_REPORT.md']:
    assert (root/'docs'/name).is_file(),name
print('PASS static audit: unique IDs, all local runtime paths, no remote dependencies, DOM references, responsive/focus/reduced-motion CSS and required documentation.')
print('This is static analysis, not desktop/mobile rendering or assistive-technology testing.')
