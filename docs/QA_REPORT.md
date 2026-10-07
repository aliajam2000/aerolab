# QA report — AeroLab v0.1

Build date: 2026-10-07 (Asia/Tehran). This report distinguishes executed tests from unverified behavior.

## Executed automated scientific tests
`node tests/physics.test.cjs`: **22 test groups passed**. Includes speed-square lift, density compensation, area scaling, pitch/path AoA, stall independent of speed, positive/negative camber, critical-angle CL maxima, CL continuity, fixed-lift drag scaling, analytic VMD, unattainable trim, load-speed scaling, mass-flow and pressure balance, positive tube pressures, stability signs, CP/moment identity, climb/descent force components, finite edge states, all eight lesson solutions and predictions, and **all 32 mission solutions quantized to the actual slider steps**.

## Executed application tests (DOM emulation)
`tests/gameplay.test.cjs` with LinkeDOM: **15 test groups passed**. Loads the actual HTML and every shipped game script, then dispatches events through the actual application handlers. Covers initial launch, all eight modules × all three modes, all predictions including a wrong answer, state restoration, no-action/no-farming rules, all lesson completions, all 32 mission passes/unlocks/scoring, logbook/achievements, integration completion, Lab baseline, settings, simulated reload, corrupted JSON, invalid scores, unavailable storage and full reset.

Native dialog methods, time scheduling and localStorage are emulated. This does **not** verify browser rendering, real persistent disk storage, browser console, native focus, screen-reader output or touchscreen events. Test logs are included in `tests/RESULTS.txt`.

## Static analysis and visual inspection
- Node syntax checks on every game JS file.
- Python static audit: unique HTML IDs, local dependency paths, referenced DOM IDs, no network-fetch runtime, required docs, focus/reduced-motion/mobile CSS hooks.
- Manual source review: force axes and units, CL and stall thresholds, mode-specific fixed-lift assumptions, source/implementation agreement, numerical constants and copyright boundaries.
- Wind-tunnel and earth-frame force SVG outputs rasterized with Sharp and visually inspected. This is inspection of scientific SVG illustrations, **not an application/browser screenshot**.
- The supplied source's printed p.44 lift equation was checked visually in addition to text extraction of relevant sections.

## Bugs found and fixed
1. Initial flight-path state in two Angle mission tiers indexed a number as if it were an array, producing undefined/NaN before manipulation. Corrected; all mode initial states now pass the no-invalid-SVG checks.
2. Earth-frame lift vector's horizontal sign was reversed for nonzero flight-path angle. Corrected to be normal to the path and consistent with numerical force equations.
3. Shape mission thickness tolerance did not match its briefing. Split thickness into an explicit ±0.5% chord constraint.
4. Small force arrows had oversized heads. Arrowhead size now scales down with vector length.
5. Displayed lift-vector application point changed to the valid displayed CP, rather than overlapping the AC without showing the compensating moment.
6. Streamtube inlet control limited to 40 m/s, keeping Lab local throat speed ≤100 m/s. Mission targets also stay ≤100 m/s.
7. Narrow-screen graph region retains legible diagram width and scrolls instead of shrinking all axes.
8. Prediction choice order randomized while retaining stable answer identities; every prediction is not visually “the first button”.

## Blocked actual browser QA — not passed
A Playwright Chromium install was attempted but the downloaded archive was invalid/truncated. A separate cloud-browser attempt to load the local HTTP test page was rejected by browser policy. No security bypass or alternate route around that rejection was used.

Therefore **real desktop/mobile browser acceptance tests were not completed**. No claim is made that a rendered desktop layout, mobile touch layout, browser console, keyboard focus trap, native dialogs, reduced-motion animation or real file-URL storage was observed working. Responsive CSS, semantic controls and error handling are implemented, and actual application logic passed DOM-emulation tests, but those are not substitutes for real browser testing.

## Remaining acceptance checks
Open the extracted folder in current Chrome/Firefox/Safari (including a phone), complete a Learn experiment and mission, reload to verify local progress, test portrait/landscape layouts, keyboard navigation, dialogs and reduced motion, and confirm no console errors. Test the GitHub Pages deployment separately. A host browser can restrict local-file scripts/storage, especially inside mobile file previewers.

## Educational limitations
All constants are synthetic. Pressure and streamline diagrams are qualitative. No CFD, compressibility, aircraft-specific data, dynamic aircraft motion, dynamic stability, wind, structural limits or official procedural training. These limitations are visible in the product and detailed in PHYSICS_MODEL.md.
