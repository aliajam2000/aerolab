# Oxford / CAE source mapping

Source: supplied **CAE ATPL Ground Training Series, Book 14, 081 Principles of Flight, EASA Edition 2020**. Printed page numbers below; add 12 for PDF viewer page numbers. These are concept references, not claims that the book supplied the synthetic coefficients. See SOURCE_AUDIT.md for conflicts and omissions. All game explanations, missions, graphics and numerical cases are original.

| Implemented concept | Source section and printed pages | What is taught | Interaction | Explicit simplification |
|---|---|---|---|---|
| SI force, mass, density, speed | 081.01.01.01, pp.3–5 | Mass differs from weight; quantities carry units | Mass control; lift/weight displays | Constant g = 9.81 m/s² |
| Static, dynamic, total pressure | 081.01.01.01, pp.12–14 | Static pressure falls as ideal flow accelerates; p+q conserved | Throat control and four simultaneous readings | Horizontal inviscid incompressible tube; no wall loss |
| Continuity / mass flow | 081.01.01.01, pp.14–15 | rho A V is conserved | Converging/diverging throat; speed curve | Fixed inlet area; no reservoir dynamics |
| Streamlines and relative flow | 081.01.01.02, pp.17–18 | Flow direction is relative to the wing; streamtube boundaries contain flow | Animated schematic tunnel | Curves are illustrative, not trajectories or CFD |
| Lift and drag direction | 081.01.01.03, pp.19–22 | Lift normal to relative flow; drag along it | Tunnel vectors and earth-frame force view | Section visualization paired with lumped finite-wing forces |
| Aerofoil geometry | 081.01.01.04, pp.23–24 | LE, TE, chord, thickness, mean camber, upper/lower surfaces | Camber/thickness shape editor | Thickness only changes geometry; no thickness-dependent coefficients |
| Symmetric / positive / negative camber | 081.01.01.04, p.24; 081.01.03.02, p.48 | Camber shifts zero-lift AoA | Camber control, live CL curve and zero-lift text | Linear zero-lift shift is an educational assumption |
| AoA versus pitch | 081.01.01.03, p.22; 081.08.01.02, pp.399–400 | Alpha = pitch minus air-relative flight-path angle for zero incidence | Separate pitch/path controls; descending missions | Zero wing incidence; no wind or bank |
| Pressure distribution | 081.01.02.03, pp.32–33 | Geometry/AoA alter surface loading; shear also contributes to drag | Qualitative pressure arrows synchronized with CL and q | No numerical Cp field; arrows not integrated to determine lift |
| CP and AC | 081.01.02.04, pp.33–35 | CP changes; AC carries a nearly constant pitching moment in attached flow | Colored CP/AC markers and Cm readout | Quarter-chord AC; CP relation used only away from zero lift and stall |
| Lift equation | 081.01.03.01–02, pp.43–47 | L = qSCL; V² and density effects | Lift lab with area, density, speed, AoA | Low-speed fixed wing coefficients; no Reynolds/Mach effects |
| CL–alpha, CLmax | 081.01.02.07–09, pp.39–42 | Linear region, rounded maximum, decline after critical angle | Live graph with moving operating point | Synthetic rounded piecewise curve; no aircraft polar copied |
| Boundary layer separation / stall | 081.03.01.01, pp.185–187, 193 | Adverse pressure gradient and critical AoA; speed alone does not remove stall | Separation overlay, nose-low recovery missions | Quasi-steady symmetric treatment of negative stall; no hysteresis or spin |
| Load and minimum speed | 081.03.01.02, pp.194, 198 | Required load raises minimum speed at unchanged critical angle | Requested-load slider; instantaneous-load missions | Not a turn/structural envelope; no g-limit assessment |
| Parasite vs profile drag | 081.01.02.06, pp.36–37; 081.01.05.01–03, pp.80–84 | Parasite includes friction, form and interference; profile means friction+form | Drag lab explanation and parasite curve | Aggregated CD0; components not individually solved |
| Induced drag | 081.01.04.03, pp.63–66 | Depends on lift squared and aspect ratio; inverse V² only at fixed lift | Automatic lift trim, mass and AR controls | Constant span efficiency; no detailed downwash field |
| Span, area, chord, AR | 081.01.01.05, pp.24–27 | AR=b²/S, rectangular mean chord=S/b | Planform inset changes with AR; span/chord values | No taper, sweep or lift-slope coupling |
| Drag curve and VMD | 081.01.05.05–07, pp.85–89 | Fixed-L minimum where induced and parasite contributions match | Three live curves; minimum-drag missions | Parabolic polar; infeasible low-speed demand explicitly marked |
| High-lift configurations | 081.01.09.01, pp.103–107; 09.02, pp.117–118 | Plain flap increases camber; slat delays positive stall angle | Configuration selector and moving lift curve | Three educational presets; not a device catalogue or certification data |
| L/D and glide distance | 081.01.05.05, p.86; 081.08.01.04, pp.405–407 | Maximum L/D gives best still-air distance, not minimum sink | Efficiency graph and height-to-distance missions | Near-level-polar estimate, no wind or integrated descent |
| Four forces / equilibrium | 081.08.01.01–03, pp.396, 399–405 | Straight steady climb/descent has balanced components, not always L=W/T=D | Thrust, pitch and path changes; live acceleration components | Thrust aligned with air path; moments omitted in this separate force view |
| Static longitudinal stability | 081.04.01, pp.250–254; 03.02–06, pp.259–264 | Whole-aircraft NP, static margin, sign of dCm/dalpha | CG manipulation and moment-slope graph | Fixed NP and lift slope; initial tendency only, no dynamic flight response |

## Terminology in the product
AeroLab calls the modeled lift-independent curve **parasite drag**, not “profile drag”. Profile drag is only friction plus form; interference is part of the whole-aircraft parasite category. In the static force lab positive flight-path angle means climb, positive pitch means nose-up, and positive pitching moment means nose-up.

## Do not generalize synthetic angles
The critical angles shown in controls are properties of the game's synthetic presets. They are not Oxford-mandated universal thresholds. Actual wing geometry, Reynolds/Mach number, contamination and devices can alter them. Similarly, this game's optimum L/D angle emerges from its polar rather than being fixed to a textbook illustrative angle.
