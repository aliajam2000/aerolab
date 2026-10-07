# AeroLab — Feel the Physics of Flight

**Flight Lab · Master Aviation by Playing**

A complete, editable, offline browser game about foundational aerodynamics. Eight small laboratories connect controls, an original wind-tunnel visualization, live physical quantities and graphs. The supplied CAE/Oxford Book 14 (EASA 2020) informed the curriculum; the book itself is not redistributed.

## Start playing
1. Extract the entire ZIP.
2. Open `aerolab/index.html` in a modern browser. Keep `css/` and `js/` beside it.
3. Start in **Learn**: make a prediction, run that controlled test, return to the lab, perform the requested manipulation and record the discovery.
4. Use **Lab** to capture a baseline and compare changes. Use **Mission** to apply the concept; completing each tier unlocks the next in that module.

No installation, Node runtime, npm, account, internet, API or server is needed to play. On a phone, use a browser that can open an extracted HTML folder; some mobile file-preview apps block scripts. Static hosting is the more reliable mobile route. Local progress may be unavailable in private/restricted modes or vary with the file path/browser; the app remains playable and reports storage failures.

## What's inside
- Airflow: adjustable streamtube, continuity, static/dynamic/total pressure.
- The aerofoil: positive/negative/zero camber, thickness, chord, CP/AC, qualitative pressure loading.
- Angle of attack: separate pitch/path controls, aircraft inset, four-force components.
- Making lift: interactive speed, density, area, AoA and high-lift presets.
- Beyond the limit: CLmax, positive/negative critical angles, separation, load requirement and nose-low stalls.
- Drag lab: parasite/induced/total drag, automatic L=W trim, invalid-demand detection, mass/AR effects.
- The efficient wing: L/D, rectangular planform, approximate still-air glide distance.
- Restoring balance: CG, whole-aircraft NP and initial stable/neutral/unstable pitching tendency.

**8 hands-on lessons, 8 controlled prediction experiments, 32 mission variants** (8 families × Training, Standard, Advanced, Captain). Synthetic presets: clean, plain flap and slat. Mastery and best scores are persisted locally with a versioned, validated schema. Four milestone achievements, motion setting, session reset, full progress reset and JSON export are included. No sound assets are needed; the game is silent.

## Mission families
The throat gate · A wing with a purpose · The deceptive horizon · Same lift, thinner air · Fast, nose low, stalled · Minimum resistance · The distance reserve · The balance test.

Each goal is evaluated against the same physics model that drives the display. A failed submission reports the actual state. Score components are Safety 40, Accuracy 30, Efficiency 20, Time 10. Repeating submissions or just opening content does not accumulate mastery.

## Publish on GitHub Pages
1. Create or open a repository.
2. Upload the **contents of `aerolab/`** to the repository root, so `index.html`, `css/` and `js/` sit together. Alternatively keep the folder and use `/aerolab/` in the final URL.
3. In repository Settings → Pages, choose the source branch and root directory (the interface may vary).
4. Open the published URL after deployment. Relative resource paths support project repositories; no build step is required.

For optional local HTTP serving, run `python -m http.server 8000` inside `aerolab/` and visit `http://localhost:8000`. This is optional, not a runtime dependency of the game.

## Architecture
- `index.html`: semantic application shell, controls, native dialogs.
- `css/style.css`: dark Flight Lab visual system; responsive layout, focus and reduced motion.
- `js/physics/model.js`: coefficients, lift, drag, automatic trim, force balance, tube and static stability.
- `js/simulation/render.js`: original SVG drawings and reusable live graphs.
- `js/learning/curriculum.js`: source-connected lesson objectives and predictions.
- `js/learning/missions.js`: mission generation and numerical evaluation.
- `js/core/storage.js`: resilient progress schema, mastery, achievements, integration API.
- `js/app.js`: UI state, controls, scoring, feedback and navigation.
- `docs/`: curriculum, source audit/mapping, model, design, integration, QA.
- `tests/`: scientific assertions, DOM-emulation gameplay tests, static audit and recorded test output.

Classic deferred-by-order scripts are used instead of ES-module imports or fetch requests so `file://` can work. All graphics and typography are local/system resources. There are no telemetry requests or external assets.

## Flight Lab integration
Use `window.FlightLabAeroLab.getMetadata()` and `.getProgress()` in a same-origin embedding. Listen for the `flightlab:progress` window event. See `docs/FLIGHTLAB_INTEGRATION.md`. There is no cross-origin message listener or requirement to load the parent platform.

## QA and tests
See `docs/QA_REPORT.md` for the exact tests performed and important limits. Physics and full application handlers were tested automatically in Node and a DOM emulator. All mission solutions were checked at the slider step resolution. SVG scientific diagrams were rasterized and inspected separately.

**Actual browser desktop/mobile rendering, touch, native dialog/focus behavior and browser console checks could not be completed in the build environment.** A browser installation failed; cloud-browser access to the local test page was blocked. CSS responsiveness and semantic accessibility were inspected statically, not certified through browser execution. The project is delivered with this open verification limitation, not with a claim that browser QA passed.

Optional developer tests (Node required only for testing):

```sh
node tests/physics.test.cjs
npm install --prefix /tmp/aerolab-qa linkedom@0.18.13
LINKEDOM_PATH=/tmp/aerolab-qa/node_modules/linkedom node tests/gameplay.test.cjs
python tests/static_audit.py
```

`tests/gameplay.test.cjs` is **DOM emulation**, not a headless browser. The dependency is not bundled or needed to play.

## Known modeling simplifications
- Low-speed quasi-steady model; no CFD, Reynolds/Mach dependence, full trajectory or aircraft-specific coefficients.
- Critical angles, moment coefficients and device presets are educational assumptions, not universal thresholds.
- Pressure/streamline graphics are qualitative; equal-transit-time is not used.
- Thickness changes the illustration only. AR changes drag and rectangular geometry, not lift-curve slope.
- The drag polar is fixed-lift; unattainable low-speed demand is marked and never treated as valid trim.
- CP is suppressed at near-zero lift and stall. No post-stall moment model.
- Glide range uses a near-level-polar estimate in still air; no wind, terrain or operational reserve.
- Stability describes the initial tendency of a linear whole-aircraft model, not dynamic stability or real control response.
- English only; native mobile browsers vary in their treatment of local HTML folders. Narrow graph panels scroll horizontally to retain readable axes.

## Educational disclaimer
AeroLab is an educational supplement. It is **not approved flight training material, aircraft performance software, operational flight-planning software or certified training**. It is not a substitute for official manuals or an instructor. Do not apply its numbers, synthetic stall angles, control changes or mission outcomes to real flight.

No Oxford/CAE book pages, substantial verbatim passages, copied figures, tables or question-bank items are included. Source references document concepts, not endorsement by CAE, Oxford or a regulator.
