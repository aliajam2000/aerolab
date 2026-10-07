# Flight Lab integration

AeroLab runs independently. Its public, read-only snapshot API is available after the classic scripts load:

```js
const meta = window.FlightLabAeroLab.getMetadata();
// {id:'aerolab',name:'AeroLab',subject:'Principles of Flight',
//  category:'Aerodynamics',version:'0.1'}
const progress = window.FlightLabAeroLab.getProgress();
window.addEventListener('flightlab:progress', event => {
  console.log(event.detail); // fresh progress snapshot after a learning/score update
});
```

`getProgress()` returns schema version 1, `lessons` (module→true), `predictions` (module→true), `scores` (`module-tierIndex`→best 0–100 score), `mastery` (module→0–100), `settings.motion`, `unlockedModules`, `achievements` and `completion` (0–100). Completion counts eight completed lessons and 32 passed variants with equal weight, independently of mastery/score quality. All modules are available by design. Tier unlocks derive from predecessor scores; they are not separately trusted data.

`exportProgress()` returns a detached snapshot including mastery. Modifying returned objects does not mutate stored progress. There is no public score injection/import function. The UI exports JSON for backup/analysis; there is no UI restore/import in v0.1.

## Storage
Key: `flightlab.aerolab.v1`. Fields are filtered on load: only known module/tier keys, boolean completion and finite scores in [0,100] are retained. Unknown versions or malformed JSON start a clean session with a warning. Read/write exceptions do not prevent play. There is no account or cross-device sync. Browser profiles, file paths and web origins can have separate localStorage behavior; hosting a copy does not automatically migrate local-file progress.

## Embedding
For same-origin iframes, a parent may call `iframe.contentWindow.FlightLabAeroLab` after load and attach the event listener on that window. `flightlab:progress` is a window CustomEvent, not a cross-frame `postMessage`; it does not automatically bubble to a parent. Cross-origin parents cannot read the API directly. A future bridge must define and check specific allowed origins; no wildcard message listener is included.

All paths are relative, so the app can live at `/games/aerolab/` or a GitHub Pages project subpath. No platform adapter is required to play. There are no outbound data requests.
