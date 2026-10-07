(function(){'use strict';
const key='flightlab.aerolab.v1',blank=()=>({version:1,lessons:{},scores:{},predictions:{},settings:{motion:true},achievements:[],unlockedModules:AeroCurriculum.map(x=>x.id)});let warning='';
function load(){try{const raw=localStorage.getItem(key);if(!raw)return blank();const x=JSON.parse(raw);if(!x||x.version!==1)throw Error('schema');const y=blank();for(const id of AeroCurriculum.map(x=>x.id)){if(x.lessons?.[id]===true)y.lessons[id]=true;if(x.predictions?.[id]===true)y.predictions[id]=true;for(let t=0;t<4;t++){const v=x.scores?.[id+'-'+t];if(Number.isFinite(v)&&v>=0&&v<=100)y.scores[id+'-'+t]=v;}}y.settings.motion=x.settings?.motion!==false;return y;}catch(e){warning='Saved progress was unavailable or invalid. A clean session is active.';return blank();}}
let data=load();function mastery(id){const weights=[10,15,20,25];return Math.round((data.lessons[id]?30:0)+weights.reduce((a,w,t)=>a+w*(data.scores[id+'-'+t]||0)/100,0));}
function badges(){const scores=Object.values(data.scores),lessons=Object.keys(data.lessons).length;data.achievements=[...(lessons>=1?['First discovery']:[]),...(lessons===8?['Lab graduate']:[]),...(scores.length>=8?['Test pilot']:[]),...(AeroCurriculum.every(x=>data.scores[x.id+'-3']>=80)?['AeroLab captain']:[])];}
function save(){badges();try{localStorage.setItem(key,JSON.stringify(data));}catch(e){warning='Progress cannot be saved in this browser. This session still works.';}}
function reset(){data=blank();save();}
function exportData(){badges();return JSON.parse(JSON.stringify({...data,mastery:Object.fromEntries(AeroCurriculum.map(x=>[x.id,mastery(x.id)]))}));}
window.AeroStore={get data(){return data;},get warning(){return warning;},save,reset,mastery,exportData};
window.FlightLabAeroLab={getMetadata:()=>({id:'aerolab',name:'AeroLab',subject:'Principles of Flight',category:'Aerodynamics',version:'0.1'}),getProgress:()=>{const p=exportData();return {...p,completion:Math.round(100*(Object.keys(p.lessons).length+Object.keys(p.scores).length)/40)};},exportProgress:exportData};
})();
