import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {act,freshState,summary,DAY} from './core.mjs';
const d=JSON.parse(readFileSync(new URL('./ecology.json',import.meta.url)));
assert.equal(d.chapters.flatMap(c=>c.terms).length,33);assert.equal(d.objectives.length,42);
assert.equal(new Set(d.questions.map(q=>q.id)).size,d.questions.length);
for(const q of d.questions){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);assert(q.rationale?.length>12);assert(d.chapters.some(c=>c.id===q.chapterId));}
for(const ids of Object.values(d.forms)){assert.equal(ids.length,42);assert.equal(new Set(ids.map(id=>d.questions.find(q=>q.id===id).objectiveId)).size,42);}
assert.equal(new Set(Object.values(d.forms).flat()).size,168);
let s=freshState(),now=Date.parse('2026-11-07T12:00:00Z');
const action=b=>s=act(d,s,b,now);
function finish(wrong=false){const r=s.runs.find(r=>r.id===s.activeRun);for(const id of r.items){const q=d.questions.find(q=>q.id===id);action({type:'answer',runId:r.id,itemId:id,selected:wrong?(q.answer+1)%4:q.answer});}}
action({type:'start',kind:'test',form:'A',independent:true});const first=s.runs[0],q=d.questions.find(q=>q.id===first.items[0]);
assert.throws(()=>action({type:'answer',runId:first.id,itemId:q.id,selected:99}));
action({type:'answer',runId:first.id,itemId:q.id,selected:q.answer});
action({type:'answer',runId:first.id,itemId:q.id,selected:(q.answer+1)%4});assert.equal(first.answers.length,1);assert.equal(first.answers[0].correct,true);
action({type:'start',kind:'test',form:'B',independent:true});assert.equal(s.runs.length,2);action({type:'resume',runId:first.id});
for(const id of first.items.slice(1)){const item=d.questions.find(q=>q.id===id);action({type:'answer',runId:first.id,itemId:id,selected:item.answer});}
for(const form of ['B','C']){action({type:'start',kind:'test',form,independent:true});finish();}
assert.equal(summary(d,s,now).mastered,false);
assert.throws(()=>action({type:'start',kind:'retention',day:1,independent:true}),/not due/);
for(const day of d.retentionDays){now=Date.parse(first.finishedAt)+day*DAY;action({type:'start',kind:'retention',day,independent:true});finish();}
assert.equal(summary(d,s,now).mastered,true);
const supported=structuredClone(s);supported.runs.forEach(r=>r.independent=false);assert.equal(summary(d,supported,now).mastered,false);
const historic=structuredClone(s);historic.runs[0].answers[0].correct=false;assert.equal(summary(d,historic,now).mastered,false);
let bad=freshState();bad=act(d,bad,{type:'start',kind:'test',form:'A',independent:true});const run=bad.runs[0];
for(const id of run.items){const q=d.questions.find(q=>q.id===id);bad=act(d,bad,{type:'answer',runId:run.id,itemId:id,selected:(q.answer+1)%4});}
bad=act(d,bad,{type:'start',kind:'repair',independent:true});const repair=bad.runs.at(-1);assert.equal(repair.items.length,42);assert(repair.items.every(id=>!run.items.includes(id)));assert(run.answers.every(a=>a.correct===false));
for(const c of d.chapters){assert(c.teach.length);assert(c.model.prompt&&c.model.reasoning&&c.model.answer);assert(c.guided.options.length===4);}
// A perfect supported recall must leave a fresh independent route available.
const recallState=structuredClone(s);
recallState.runs=recallState.runs.filter(run=>run.kind==='test');
const due=Date.parse(first.finishedAt)+DAY;
act(d,recallState,{type:'start',kind:'retention',day:1,independent:false},due);
const assisted=recallState.runs.at(-1);
for(const itemId of assisted.items){
 const question=d.questions.find(q=>q.id===itemId);
 act(d,recallState,{type:'answer',runId:assisted.id,itemId,selected:question.answer},due);
}
assert.equal(summary(d,recallState,due).retention[0].complete,false);
act(d,recallState,{type:'start',kind:'retention',day:1,independent:true},due);
const independentRecall=recallState.runs.at(-1);
assert.notEqual(independentRecall.id,assisted.id);
const guidedIds=new Set(d.chapters.map(c=>c.guided.id));
assert(independentRecall.items.every(itemId=>!assisted.items.includes(itemId)&&!guidedIds.has(itemId)));
for(const itemId of independentRecall.items){
 const question=d.questions.find(q=>q.id===itemId);
 const selected=itemId===independentRecall.items[0]?(question.answer+1)%4:question.answer;
 act(d,recallState,{type:'answer',runId:independentRecall.id,itemId,selected},due);
}
act(d,recallState,{type:'start',kind:'retention',day:1,independent:true},due);
const targeted=recallState.runs.at(-1);
assert.equal(targeted.items.length,1);
const target=d.questions.find(q=>q.id===targeted.items[0]);
act(d,recallState,{type:'answer',runId:targeted.id,itemId:target.id,selected:target.answer},due);
assert.equal(summary(d,recallState,due).retention[0].complete,true);
// A below-threshold independent test and a supported test must leave a fresh mastery route.
const recovery=freshState();
let clock=Date.parse('2026-11-07T12:00:00Z');
const apply=action=>act(d,recovery,action,clock++);
const questions=new Map(d.questions.map(question=>[question.id,question]));
function completeRound(misses=[]){
 const round=recovery.runs.find(r=>r.id===recovery.activeRun);
 for(const itemId of round.items){
  const question=questions.get(itemId);
  const selected=misses.includes(question.objectiveId)?(question.answer+1)%4:question.answer;
  apply({type:'answer',runId:round.id,itemId,selected});
 }
 return round;
}
assert.throws(()=>apply({type:'start',kind:'test',form:'D',independent:true}),/Finish tests/);
const missedObjectives=d.objectives.slice(0,5);
for(const form of 'ABC'){
 apply({type:'start',kind:'test',form,independent:form!=='B'});
 completeRound(form==='C'?missedObjectives:[]);
}
const originalC=structuredClone(recovery.runs.find(r=>r.form==='C'));
assert.equal(originalC.answers.filter(a=>a.correct).length,37);
assert.throws(()=>apply({type:'start',kind:'test',form:'D',independent:false}),/independent-work box/);
const anchor=Date.parse(recovery.runs[0].finishedAt);
for(const day of d.retentionDays){
 clock=anchor+day*DAY;
 apply({type:'start',kind:'retention',day,independent:true});
 completeRound();
}
for(let i=0;i<6;i++){
 apply({type:'start',kind:'repair',independent:true});
 completeRound();
}
assert.equal(summary(d,recovery,clock).mastered,false);
apply({type:'start',kind:'test',form:'D',independent:true});
const transfer=completeRound();
const positions=transfer.items.map(id=>transfer.orders[id].indexOf(questions.get(id).answer));
assert.equal(globalThis.RyChoiceLayout.hasPattern(positions),false);
assert.deepEqual(recovery.runs.find(r=>r.form==='C'),originalC);
assert.equal(new Set(recovery.runs.flatMap(r=>r.items)).size,recovery.runs.flatMap(r=>r.items).length);
for(const evidence of summary(d,recovery,clock).evidence.filter(e=>missedObjectives.includes(e.objectiveId))){
 assert.equal(evidence.recentCorrect,9);
 assert.equal(evidence.recentTotal,10);
}
assert.equal(summary(d,recovery,clock).mastered,true);
console.log('PASS: 42 objectives, three practice tests and a reserved transfer check, immutable scores, fresh recovery after misses, answer-order patterns, and all five recall rounds.');
