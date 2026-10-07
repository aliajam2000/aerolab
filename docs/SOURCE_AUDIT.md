# Source audit — completed before implementation

Primary source: supplied CAE ATPL Ground Training Series, Book 14, 081 Principles of Flight, EASA Edition 2020 (often called Oxford CAE). References below use printed Arabic page numbers; PDF page = printed page + 12. The 462-page PDF was text-extracted; selected relevant sections were read, not every unrelated chapter. The lift equation was also checked visually because extraction omitted formula images.

## Curriculum priorities
Essential: continuity and pressure in a low-speed ideal streamtube; aerofoil geometry; relative airflow and angle of attack; lift equation and CL–alpha; critical angle and stall; force direction and equilibrium; fixed-lift drag curve.
Important: camber, qualitative pressure differences, high-lift configurations, L/D and still-air glide geometry, aspect ratio.
Advanced in v0.1: CP/AC distinction and static longitudinal stability relative to the whole-aircraft neutral point.
Deferred: compressible flow, swept-wing stall propagation, spins, dynamic stability, ground effect, detailed flap types, propulsion and full performance calculations.

## Source decisions and conflicts
1. Printed p.17 identifies steady flow with laminar flow and unsteady flow with turbulent flow. These are different classifications: steady describes time dependence; laminar/turbulent describes flow structure. AeroLab teaches continuity for steady ideal flow but does not teach their equivalence.
2. Printed p.45 mentions constant mass flow when explaining constant lift with changing density. Its own lift equation and worked density/speed example require constant rho V² for fixed S and CL, not constant rho V through a fixed area. The code follows that equation. Streamtube mass conservation is taught separately.
3. Printed p.200 says reduced CLmax decreases the 1g stall speed, in conflict with the stall-speed relation in p.194 and the subsequent discussion. This sentence is not implemented. Compressibility is outside v0.1.
4. Numerical angles in source figures (e.g. about 16° clean or 25° with slots) are examples, not universal aircraft constants. AeroLab uses labelled synthetic wing presets, with clean +16°, plain-flap +14°, slat +22°. It never calls these certified limits.
5. Source p.34 treats quarter-chord AC as fixed at low subsonic speed. AeroLab adopts this idealization only in attached flow, suppresses CP at near-zero lift, and does not extrapolate it through stall.

6. Printed p.63 discusses several competing flap/span-loading effects. AeroLab deliberately holds span efficiency constant across presets; it does not infer an induced-drag reduction just from a lower geometric AoA at unchanged required lift and speed. This is a declared model limitation.

All artwork, prose, missions and numerical wing presets are original. No book pages, extracted source text, question-bank items or source graphics ship in the ZIP.
