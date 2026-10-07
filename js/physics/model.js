/* AeroLab: synthetic low-speed educational wing. See docs/PHYSICS_MODEL.md. */
(function(root){
'use strict';
const C=Object.freeze({g:9.81,slope:.09,oswald:.8,cleanCrit:16,negativeCrit:-16,rounding:2,postDecay:.085,postFloor:.18,neutralPoint:.35,stabilitySlope:4.8,staticPressure:101325,inletArea:1,ac:.25});
const configs=Object.freeze({clean:{name:'Clean',offset:0,crit:16,cd0:.026},flap:{name:'Plain flap',offset:.48,crit:14,cd0:.055},slat:{name:'Slat',offset:.06,crit:22,cd0:.035}});
const defaults=()=>({alpha:6,pitch:8,gamma:2,speed:50,rho:1.225,area:16,mass:1000,camber:2,thickness:12,ar:8,config:'clean',thrust:1200,throat:.65,cg:25,disturbance:4,load:1});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function wing(s){const f=configs[s.config]||configs.clean;return {...f,zero:-.9*s.camber-f.offset/C.slope,k:1/(Math.PI*C.oswald*s.ar),cmac:-.025*s.camber-(s.config==='flap'?.035:0)};}
function clAt(a,s){const w=wing(s),x=a-w.zero,sign=x<0?-1:1,lim=sign>0?w.crit-w.zero:w.zero-C.negativeCrit,u=Math.abs(x),r=C.rounding;
 const peak=C.slope*(lim-r/2);let cl;
 if(u<=lim-r)cl=C.slope*u;
 else if(u<=lim)cl=peak-C.slope*(lim-u)**2/(2*r);
 else cl=peak*(C.postFloor+(1-C.postFloor)*Math.exp(-C.postDecay*(u-lim)));
 return sign*cl;}
function tunnel(s){const inlet=s.speed,throat=inlet/s.throat,q1=.5*s.rho*inlet**2,q2=.5*s.rho*throat**2,total=C.staticPressure+q1;
 return {inlet,throat,q1,q2,total,static2:total-q2,massFlow:s.rho*inlet*C.inletArea};}
function dragAt(v,s,lift=s.mass*C.g){const w=wing(s),q=.5*s.rho*v*v,cl=lift/(q*s.area),parasite=q*s.area*w.cd0,induced=w.k*lift*lift/(q*s.area);return {speed:v,cl,parasite,induced,total:parasite+induced,feasible:cl<=clAt(w.crit,s),alpha:alphaFor(cl,s)};}
function alphaFor(cl,s){let lo=C.negativeCrit,hi=wing(s).crit;for(let i=0;i<40;i++){const mid=(lo+hi)/2;if(clAt(mid,s)<cl)lo=mid;else hi=mid;}return (lo+hi)/2;}
function solve(s,module){const w=wing(s);let alpha=(module==='angles'||module==='stall')?s.pitch-s.gamma:s.alpha;
 const q=.5*s.rho*s.speed**2,W=s.mass*C.g;let demand=null;
 if(module==='drag'||module==='efficiency'){demand=dragAt(s.speed,s);alpha=demand.alpha;}
 const cl=clAt(alpha,s),clmax=clAt(w.crit,s),margin=Math.min(w.crit-alpha,alpha-C.negativeCrit),stalled=margin<=0;
 const L=q*s.area*cl,parasite=q*s.area*w.cd0,induced=q*s.area*w.k*cl*cl;
 const separation=clamp((alpha-(w.crit-4))/12,0,1)+clamp((C.negativeCrit+4-alpha)/12,0,1);
 const extra=q*s.area*.035*Math.max(0,-margin),D=parasite+induced+extra;
 const g=s.gamma*Math.PI/180,normal=L-W*Math.cos(g),parallel=s.thrust-D-W*Math.sin(g);
 const vmd=Math.pow(4*w.k*W*W/(s.rho*s.rho*s.area*s.area*w.cd0),.25);
 const vs=Math.sqrt(2*W/(s.rho*s.area*clmax));
 const cp=!stalled&&Math.abs(cl)>.08?C.ac-w.cmac/cl:null;
 return {alpha,q,W,L,D,cl,clmax,margin,stalled,separation,parasite,induced,extra,ld:L/D,normal,parallel,an:normal/s.mass,ap:parallel/s.mass,vmd,vs,cp,cmac:w.cmac,critical:w.crit,zero:w.zero,demand,feasible:!demand||demand.feasible,load:L/W,requiredCL:s.load*W/(q*s.area),stallSpeedLoad:vs*Math.sqrt(s.load),cm:C.stabilitySlope*(s.cg/100-C.neutralPoint)*s.disturbance*Math.PI/180,staticMargin:C.neutralPoint-s.cg/100,flow:tunnel(s)};
}
root.AeroPhysics={C,configs,defaults,clamp,wing,clAt,alphaFor,dragAt,solve,tunnel};
if(typeof module!=='undefined')module.exports=root.AeroPhysics;
})(typeof window!=='undefined'?window:globalThis);
