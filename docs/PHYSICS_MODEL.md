# Physics model v0.1

Code authority: `js/physics/model.js`. SI internally: metres, seconds, kg, newtons, pascals; angles are degrees except where explicitly converted to radians. All displayed speeds are **TAS**, not IAS. `g=9.81 m/s²`. This is a low-speed, quasi-steady educational model, not aircraft data or a CFD solver.

## 1. Angle and reference frames
**Model/equation:** in Angle and Stall modules, `alpha = pitch - gamma`; wing incidence is zero, gamma is the air-relative flight path. Elsewhere alpha is directly controlled, except automatic trim in Drag/Efficiency. **Assumptions:** no sideslip or bank; no distinction between geometric and effective downwash-adjusted alpha. **Range:** selectable pitch −15…28°, gamma −16…16°; resulting alpha −31…44°. Extreme settings are purely conceptual/post-stall. **Purpose:** separate attitude from AoA. **Source:** pp.22, 399–400.

The wind-tunnel drawing is in a local airflow frame: air left→right, leading edge at left, positive alpha raises the nose relative to the trailing edge. The separate aircraft/force view has forward motion to the right in an earth frame. Lift is normal to the path, drag opposite aircraft motion, weight vertically downward. Streamline positions are drawn to clear a rotated-wing envelope, not solved flow paths.

## 2. Dynamic pressure and lift
**Equation:** `q=0.5*rho*V²`; `L=q*S*CL`; `W=mass*g`. **Assumptions:** incompressible quasi-steady wing with fixed numerical coefficients at each configuration. **Range:** wing V=20…80 m/s, rho=.6…1.225 kg/m³, S=10…24 m². Density is independently selected; there is no ISA altitude conversion. **Purpose:** speed-square, density, area and CL sensitivities. **Source:** pp.43–48. No assumption that L=W outside automatic trim.

## 3. Synthetic CL curve, camber and stall
**Educational constants:** lift slope `a=.09 per degree`; camber is percentage chord; `alpha0=-.9*camber - offset/a`. Presets:

| Preset | CL offset | Positive critical alpha | CD0 |
|---|---:|---:|---:|
| Clean | 0 | 16° | .026 |
| Plain flap | .48 | 14° | .055 |
| Slat | .06 | 22° | .035 |

These constants are original educational assumptions. The source supports the *directions of the effects*, not these exact values. Negative critical alpha is −16° for all presets, a deliberate simplification. Camber can be −4…+4% chord; thickness 8…18% changes only the drawn shape, not the coefficients. AR does not modify this lift slope; its effect on induced drag is modeled separately.

**Exact code relationship:** let `x=alpha-alpha0`, `u=abs(x)`, sign=sign(x). For positive x, `lim=alphaCrit-alpha0`; for negative x, `lim=alpha0-(-16)`. Let `r=2 degrees`, `peak=a*(lim-r/2)`.
- `u <= lim-r`: CL = sign × a × u.
- `lim-r < u <= lim`: CL = sign × [peak − a(lim-u)²/(2r)].
- Beyond critical: CL = sign × peak × [.18 + .82 exp(−.085(u−lim))].

The rounded shoulder avoids a slope jump at CLmax. Clean at camber +2% has CLmax 1.512, not a borrowed aircraft value. The positive critical angle is constant for a chosen preset as speed/load change. `margin=min(alphaCrit-alpha, alpha+16)`. At margin ≤0 the interface flags critical/stalled; further alpha reduces CL. Negative stall is handled too. **Range:** qualitative post-stall response only; no prediction of real deep stall, spin, reattachment hysteresis, buffeting or transient load. **Purpose:** connect CL–alpha, separation, force and stall margin. **Source:** pp.39–42, 48, 103–118, 185–194.

The separation overlay is `clamp((alpha-(crit-4))/12,0,1) + clamp((-12-alpha)/12,0,1)`. Its four-degree onset and twelve-degree transition are visual assumptions, not measured boundary-layer positions. The zero-to-one scalar controls a schematic separated wake.

## 4. Drag and automatic level-flight demand
**Model:** parabolic finite-wing polar. `k=1/(pi*e*AR)`, fixed `e=.8` (assumed span efficiency). `Dp=q*S*CD0`, `Di=q*S*k*CL²`. A purely qualitative post-stall penalty `Dsep=q*S*.035*max(0,-margin)` is added outside the critical range. `.035 per degree` is a synthetic drag-rise parameter, not source data. Total actual `D=Dp+Di+Dsep`. **Source:** pp.36–37, 63–66, 80–86.

In Drag and Efficiency only, required lift is W. Demand `CLreq=W/(qS)`. A 40-iteration bisection on the attached CL curve finds alpha. If CLreq>CLmax, alpha stops at the critical point; **actual lift falls short of W**. The curve/hollow operating point still shows the theoretical fixed-lift demand, with a red unavailable region. Metrics state actual forces. No fictitious equilibrium is assigned.

Fixed-lift curve: `Dp=q*S*CD0`; `Di=k*W²/(qS)`. Thus Dp grows with V², and Di falls with V². The inverse-speed rule does not apply if CL/AoA is held fixed instead. **Valid range:** attached, low-speed wing; constant CD0/e assumptions. Profile means friction+form; parasite additionally includes interference, all lumped here.

`VMD=[4kW²/(rho²*S²*CD0)]^(1/4)`; `LDmax=1/(2sqrt(CD0*k))`. At VMD the two components are equal for this polar. Critical-speed threshold is `VS=sqrt(2W/(rho*S*CLmax))`. **Purpose:** discover the drag minimum while respecting available CL. No gear drag, engine model or thrust-available limit.

AR slider is 5…14. A rectangular planform inset gives `b=sqrt(S*AR)`, `c=S/b`; aspect ratio affects k but not the CL curve in v0.1. Presets retain the same e: configuration-induced changes to span loading are omitted.

## 5. Load and stall speed
**Equations:** actual `n=L/W`; requested-load `CLreq=n_requested*W/(qS)` and `VS,n=VS*sqrt(n_requested)`, n_requested=1…4. **Assumptions:** instantaneous lift demand, not a flown coordinated turn or structural g envelope. **Purpose:** show how a higher required load raises the necessary speed while leaving the preset critical angle unchanged. Required load is a reference, not a hidden override of actual lift. **Source:** pp.194, 198.

## 6. Four forces
**Equations:** along path `Fparallel=T-D-W*sin(gamma)`; normal `Fnormal=L-W*cos(gamma)`. Accelerations are the components divided by mass. Thrust is assumed aligned with the air-relative path, 0…4000 N. All vectors in the force panel use one instantaneous display scale. **Source:** pp.396, 399–405. **Purpose:** equilibrium is condition-dependent. **Range/simplification:** straight unbanked instantaneous states; no trajectory integration, moments, elevator or engine response. A changing force state is not mislabeled as a steady climb.

## 7. Ideal streamtube
**Equations:** A1=1 m²; A2/A1=.4…1.2; V2=V1/(A2/A1); mass flow=rho*V1*A1. Inlet static p1=101325 Pa. q1=.5rhoV1²; q2=.5rhoV2²; total=p1+q1; p2=total−q2.
**Assumptions:** horizontal, steady, incompressible, inviscid flow with external inlet conditions held fixed. Independent density does not implement a thermodynamic state equation. **Range:** Lab inlet 20…40 m/s; mission inlet at most45 m/s with prescribed targets keeping local speed ≤100 m/s. Quantitative realism declines approaching compressible flow. **Purpose:** mass conservation and pressure/speed trade. **Source:** pp.12–17. No assumption that steady means laminar, or that constant wing lift requires constant rhoV.

## 8. Geometry, pressure, CP and AC
**Geometry:** smooth original illustrative section using a thickness polynomial and parabolic mean camber `4*m*x*(1-x)`. Plain-flap drawing bends the aft mean line; slat drawing adds a separate leading-edge arc. Drawing units are pixels and normalized chord, not manufacturing coordinates. Maximum baseline thickness follows the selected percentage; flap geometry is illustrative. Geometric changes do not solve a pressure field.

**Pressure:** arrows indicate relative surface-loading direction and qualitative strength, driven by CL and q; they are not absolute local pressures, pressure coefficients, skin-friction vectors or a numerical integration used to recover L. The streamline and arrow diagrams are explicitly labeled schematic. Bernoulli is demonstrated quantitatively only in the separate tube model; no equal-transit-time myth is used.

**CP/AC:** `xac/c=.25`; `CmAC=-.025*camber - .035` for plain flap (the flap term is zero otherwise). `xCP/c=.25-CmAC/CL`, from the lift-moment balance. **Range:** attached flow and |CL|>.08. Outside that domain CP is suppressed; outside-chord values are reported numerically without an in-chord marker. When CP is valid and within the chord, the displayed lift vector is placed there; otherwise the vector is a force reference at quarter-chord. **Assumptions:** drag moment ignored, constant AC moment, no pitching-moment prediction through stall. Coefficients and suppression threshold are educational choices. **Purpose/source:** CP versus AC and moment interpretation, pp.19–24, 32–35.

## 9. Efficiency / glide estimate
**Equations:** actual L/D=L/D; approximate range from 1000 m = 1000*(L/D); glide angle magnitude `atan(1/(L/D))`. The plot uses fixed-L polar demand. **Assumptions:** near-level lift approximation in evaluating the polar, then ideal steady still-air glide geometry; no wind or energy transients. True steady glide has L=W cos(gamma), so a full trajectory would need its own trim solution. No claim of minimum sink, endurance or powered range. **Purpose/source:** connect aerodynamic efficiency to distance, pp.86, 405–407.

## 10. Static stability
**Equation:** `staticMargin=.35-CG/100`; `deltaCm=4.8*(CG/100-.35)*deltaAlpha*pi/180`. Positive Cm is nose-up. Neutral point .35 MAC and whole-aircraft lift slope 4.8/rad are educational assumptions distinct from the section curve and its AC. CG=15…45% MAC; disturbance=−6…+6°. **Assumptions:** stick-fixed linear whole-aircraft small-disturbance derivative, retrimmed baseline, fixed NP. **Purpose:** sign of restoring tendency and Cm–alpha slope. **Source:** pp.250–254, 259–264. No mass motion animation claims actual time evolution, damping, phugoid or guaranteed dynamic stability.

## Non-physical UI constants
SVG pixels, warning color at margin<3°, mission tolerances, score weights and mastery thresholds are instructional/interface choices, not aerodynamic limits. All synthetic model constants are centralized in `model.js` constants/preset definitions, except the explicit formulas above. No airframe certification data are implied.
