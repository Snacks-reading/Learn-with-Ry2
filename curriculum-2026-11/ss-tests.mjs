import unit from '../data/ss-unit-tests.json' with {type:'json'};
import {personalizeLesson} from './assessment-order.mjs';
export const UNIT=unit.id;
const questionPool=[...unit.pool,...unit.repairPool];
export const objectives=Object.keys(unit.objectiveLabels);
export function questionFor(plan,index,user){
 const spec=plan.items[index];if(!spec)return null;
 const first=questionPool.find(q=>q.id===(typeof spec==='string'?spec:spec[0]));
 let q={...first,objectiveIds:first.objectiveIds||[first.objectiveId]};
 if(Array.isArray(spec)){
  const second=questionPool.find(q=>q.id===spec[1]);
  q={...first,prompt:`Answer both questions. Which pair has both answers correct?\n1. ${first.prompt}\n2. ${second.prompt}`,options:[`1: ${first.options[first.answer]} / 2: ${second.options[second.answer]}`,`1: ${first.options[(first.answer+1)%first.options.length]} / 2: ${second.options[second.answer]}`,`1: ${first.options[first.answer]} / 2: ${second.options[(second.answer+1)%second.options.length]}`],answer:0,rationale:`1. ${first.rationale}\n2. ${second.rationale}`,teaching:first.teaching+'\n'+second.teaching,objectiveIds:[...new Set([...(first.objectiveIds||[first.objectiveId]),...(second.objectiveIds||[second.objectiveId])])],sourceRefs:[first.sourceRef,second.sourceRef],sourceItemIds:spec};
 }
 q={...q,id:`${plan.id}:${index}`,sourceItemIds:q.sourceItemIds||[first.id],sourceLinks:(q.sourceRefs||[q.sourceRef]).map(ref=>({...ref,...unit.sources[ref.sourceId]}))};
 return personalizeLesson({id:UNIT,contentVersion:plan.id,practice:[q]},user).practice[0];
}
export function summary(records,plans,now=Date.now()){
 const ev=records.filter(r=>r.stage==='ss-test'),independent=ev.filter(r=>r.independent);
 const skills=objectives.map(id=>{const recent=independent.filter(r=>r.objectiveIds?.includes(id)).slice(-10);return {id,label:unit.objectiveLabels[id],answered:recent.length,correct:recent.filter(r=>r.correct).length,ready:recent.length>=4&&recent.filter(r=>r.correct).length/recent.length>=.9};});
 const tests=plans.map(p=>{const r=ev.filter(x=>x.runId===p.id);return {id:p.id,title:p.title,answered:r.length,total:p.items.length,correct:r.filter(x=>x.correct).length,independent:r.filter(x=>x.independent).length,percent:r.length?Math.round(100*r.filter(x=>x.correct).length/r.length):null,complete:r.length===p.items.length,createdAt:p.createdAt,completedAt:r.length===p.items.length?r.at(-1)?.createdAt:null};});
 const full=tests.filter(t=>(['A','B','C'].includes(t.id)||t.id.startsWith('M')));
 const latest=full.filter(t=>t.complete).sort((a,b)=>a.completedAt.localeCompare(b.completedAt)).at(-1);
 const practiceMastery=['A','B','C'].every(id=>full.some(t=>t.id===id&&t.complete))&&!!latest&&latest.correct/latest.total>=.9&&latest.independent===latest.total&&skills.every(s=>s.ready);
 const first=full.filter(t=>t.complete).map(t=>t.completedAt).sort()[0];
 const retention=[1,3,7,14,30].map(day=>({day,dueAt:first?new Date(Date.parse(first)+day*86400000).toISOString():null,passed:tests.some(t=>t.id.startsWith(`D${day}_`)&&t.complete&&t.correct/t.total>=.9&&t.independent===t.total)}));const nextRetention=retention.find(t=>!t.passed);const dueAt=nextRetention?.dueAt||null;
 const delayed=tests.filter(t=>t.id.startsWith('D1_')&&t.complete);
 const retained=practiceMastery&&delayed.some(t=>t.correct/t.total>=.9&&t.independent===t.total);
 return {tests,skills,practiceMastery,retained,retention,dueAt,delayedDue:!!dueAt&&now>=Date.parse(dueAt),status:retained?'Mastery demonstrated · day1 retention passed':practiceMastery?'Practice mastery reached · delayed retention pending':'Keep practicing · mastery not yet demonstrated',scope:unit.scope};
}
export function newPlan(kind,records,plans,now=Date.now()){
 const current=summary(records,plans,now);
 if(['A','B','C'].includes(kind))return plans.find(p=>p.id===kind)||{id:kind,title:`Egypt practice test ${kind}`,items:unit.forms[kind],createdAt:new Date(now).toISOString()};
 if(!['adaptive','delayed','mastery'].includes(kind))throw Error('Choose test A, B, C, missed-skill practice or later retrieval.');
 if(kind==='delayed'&&!current.delayedDue)throw Error('The fresh retention check opens24 hours after the first completed test.');
 if(kind!=='adaptive'&&!['A','B','C'].every(id=>current.tests.some(t=>t.id===id&&t.complete)))throw Error('Finish tests A, B and C first. Every saved answer is preserved.');
 const day=current.retention.find(t=>!t.passed)?.day;const prefix=kind==='delayed'?`D${day}_`:kind==='mastery'?'M':'R';const unfinished=plans.find(p=>p.id.startsWith(prefix)&&!current.tests.find(t=>t.id===p.id)?.complete);if(unfinished)return unfinished;
 const targets=kind==='delayed'||kind==='mastery'?objectives:current.skills.filter(s=>!s.ready&&(s.answered>0||['A','B','C'].every(id=>current.tests.some(t=>t.id===id&&t.complete)))).sort((a,b)=>(a.answered?a.correct/a.answered:1)-(b.answered?b.correct/b.answered:1)).map(s=>s.id);
 if(!targets.length&&kind==='adaptive')throw Error('Skill evidence is ready. Take a fresh full mastery test if the latest full test was below90%.');
 const used=new Set(plans.flatMap(p=>p.items.map(x=>JSON.stringify(x))));
 const items=[];const covered=new Set();
 for(const target of targets){if(covered.has(target))continue;
  const missed=records.filter(r=>!r.correct&&r.objectiveIds?.includes(target)).at(-1);const missedIds=missed?.sourceItemIds||[];const candidates=questionPool.filter(q=>(q.objectiveIds||[q.objectiveId]).includes(target)).sort((a,b)=>Number(missedIds.includes(b.repairOf))-Number(missedIds.includes(a.repairOf)));let pair;
  for(const a of candidates){for(const b of questionPool.filter(q=>q.chapterId===a.chapterId&&q.id!==a.id)){
   const spec=[a.id,b.id];if(!used.has(JSON.stringify(spec))){pair=spec;break;}
  }if(pair)break;}
  if(!pair)throw Error('No unseen source-verified comparison remains for this skill. Additional authored questions are required; saved scores remain available.');
  items.push(pair);used.add(JSON.stringify(pair));for(const id of questionFor({id:'preview',items:[pair]},0,'').objectiveIds)covered.add(id);
  if(kind==='adaptive'&&items.length>=10)break;
 }
 const n=plans.filter(p=>p.id.startsWith(prefix)).length+1;
 return {id:prefix+n,title:kind==='delayed'?`Day${day} fresh retention check ${n}`:kind==='mastery'?`Fresh full mastery test ${n}`:`Fresh missed-skill round ${n}`,items,createdAt:new Date(now).toISOString()};
}
export function safeQuestion(q){if(!q)return null;const {answer,rationale,repair,teaching,teach,terms,supported,correctAnswer,...shown}=q;return shown;}
