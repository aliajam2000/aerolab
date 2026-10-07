# Game design and interaction contract

## A small aerodynamic laboratory
The wind tunnel is the main play surface. Each module exposes only relevant controls and one synchronized relationship graph. Eight compact laboratories avoid an overloaded cockpit. Readouts and insight text share the exact physics state used by scoring; visuals that are not numerical solutions say so explicitly.

## Modes
**Learn:** a short physical task, a separate prediction/reveal experiment and measured completion. Before reveal, no after-state is applied. On leaving the prediction dialog, the player's working setup is restored. Correct predictions are saved but give no mastery without the hands-on goal. Opening content never awards points.

**Lab:** all relevant module controls, immediate consequences and a baseline snapshot. Changes are compared numerically; no score pressure. Baseline snapshots are session-only. A reset restores module defaults, not global learning progress.

**Mission:** a family-specific setup, goal, available controls and constraints. Four tiers per family change precision and/or conditions. A submission checks relative target error, extra constraints and physical feasibility. Failed attempts expose measured values and the reason for failure. A passed mission saves a best score and unlocks the next tier in that module. A run cannot be submitted repeatedly to farm points.

## Actual scoring implementation
For a passed mission:
- **Safety /40:** 40 minus twice the worst recorded critical-angle exceedance, with a maximum 20-point deduction. Deliberately stalled recovery missions are exempt from penalizing their initial/recovery state. Flow and intentional stability tests do not use wing-stall penalties. Final feasibility and required margins remain hard goal gates.
- **Accuracy /30:** 30 minus up to 10 points, proportionally to final target error / permitted tolerance.
- **Efficiency /20:** deduct .5 for each committed control adjustment beyond six and one for each failed submission; floor five. A drag movement counts at the `change` event, not every animation frame/input sample. Small keyboard steps can still count individually; this is a known interaction difference.
- **Time /10:** after 90 active seconds, deduct one point per 30 seconds, floor three. Hidden-tab time is excluded. Time cannot outweigh safety or accuracy; there is no forced timeout.

Total is rounded. Best scores only increase. Mastery = 30 for the demonstrated lesson + weighted best mission scores: 10%,15%,20%,25%. Prediction-only success contributes no mastery. A correct result with many explorations still passes, at a lower score. The design emphasizes safe completion over rapid clicking.

## Achievements
First discovery: ≥1 completed lesson. Lab graduate: all eight lessons. Test pilot: ≥8 distinct mission variants passed. AeroLab captain: all eight Captain scores ≥80. Achievements are recomputed from validated progress rather than trusted arbitrary storage strings.

## Visual and accessibility design
Navy technical panels, cyan controls/current point, green restoring/attached conditions, amber near limits, red invalid/stalled conditions. All color meanings are accompanied by words or signs. Native range/select/button controls are keyboard-operable, visibly labeled and focus-highlighted. Dialogs use native `dialog` behavior. Feedback is in a polite live region; continuous metrics avoid constant announcement spam. SVG has role and state-aware alternative labels.

Desktop: wind tunnel and graph beside controls and feedback. At ≤800px: horizontal module navigator followed by brief, simulation, controls, graph, feedback. Graphs retain minimum width with a focusable horizontally scrollable region, rather than shrinking all axis text. Motion is optional, CSS-only and limited to ten schematic paths. Reduced-motion media preference stops it; hiding the document pauses it too. Mobile motion control is also in the logbook. No particle simulation, game loop physics integration, network fetch, sound or external asset is required.

## Limitations of product validation
The game and all its mission handlers were exercised in DOM emulation. Layout, real touchscreen behavior, screen-reader announcements and native dialog/focus behavior still need testing in a real browser. The design decisions above describe implementation, not completed browser acceptance tests.
