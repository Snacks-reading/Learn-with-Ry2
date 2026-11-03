import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,readdirSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import {createRequire} from 'node:module';
import unit from '../data/ss-unit-tests.json' with {type:'json'};
import {UNIT,newPlan,questionFor,summary,safeQuestion,objectives} from '../lib/ss-tests.mjs';
const all=new Set();
for(const id of ['A','B','C']){
 const plan=newPlan(id,[],[]);assert.equal(plan.items.length,50);
 const coverage=new Set(),chapters=new Set();
 for(let i=0;i<plan.items.length;i++){assert.ok(!all.has(plan.items[i]));all.add(plan.items[i]);const q=questionFor(plan,i,'synthetic-unit');q.objectiveIds.forEach(o=>coverage.add(o));chapters.add(q.chapterId);assert.ok(q.options[q.answer]);assert.ok(q.sourceRef.pages?.length);const safe=safeQuestion(q);assert.equal(safe.answer,undefined);assert.equal(safe.repair,undefined);assert.equal(safe.rationale,undefined);}
 assert.equal(coverage.size,objectives.length);assert.equal(chapters.size,13);
}
const basePlans=['A','B','C'].map(id=>newPlan(id,[],[]));
const records=basePlans.flatMap(p=>p.items.map((_,i)=>{const q=questionFor(p,i,'synthetic-unit');return {stage:'ss-test',runId:p.id,itemIndex:i,objectiveIds:q.objectiveIds,independent:true,correct:true,createdAt:new Date(Date.now()+i).toISOString()}}));
assert.equal(summary(records,basePlans).practiceMastery,false,'Three forms alone cannot bypass the four-response objective floor');
let generated=0;const plans=[...basePlans];
while(!summary(records,plans).practiceMastery&&generated<30){const p=newPlan('adaptive',records,plans);plans.push(p);for(let i=0;i<p.items.length;i++){const q=questionFor(p,i,'synthetic-unit');assert.ok(Array.isArray(p.items[i]));records.push({stage:'ss-test',runId:p.id,itemIndex:i,objectiveIds:q.objectiveIds,independent:true,correct:true,createdAt:new Date(Date.now()+1000+generated).toISOString()});}generated++;}
assert.ok(summary(records,plans).practiceMastery);assert.equal(summary(records,plans).retained,false);
assert.throws(()=>newPlan('delayed',records,plans),/24 hours/);
const delayed=newPlan('delayed',records,plans,Date.now()+2*86400000);assert.ok(delayed.id.startsWith('D1_'));const cover=new Set(delayed.items.flatMap((_,i)=>questionFor(delayed,i,'synthetic-unit').objectiveIds));assert.equal(cover.size,objectives.length);
const recovering=records.map(r=>({...r,correct:r.runId==='C'&&r.itemIndex<10?false:r.correct}));const recoveryPlans=[...plans];let rounds=0;
while(!summary(recovering,recoveryPlans).skills.every(s=>s.ready)&&rounds<60){const p=newPlan('adaptive',recovering,recoveryPlans);recoveryPlans.push(p);for(let i=0;i<p.items.length;i++){const q=questionFor(p,i,'synthetic-unit');recovering.push({stage:'ss-test',runId:p.id,itemIndex:i,objectiveIds:q.objectiveIds,independent:true,correct:true,createdAt:new Date(Date.now()+5000+rounds).toISOString()});}rounds++;}
assert.equal(summary(recovering,recoveryPlans).practiceMastery,false,'An80% comprehensive score is not mastery');
const freshMastery=newPlan('mastery',recovering,recoveryPlans);recoveryPlans.push(freshMastery);for(let i=0;i<freshMastery.items.length;i++){const q=questionFor(freshMastery,i,'synthetic-unit');recovering.push({stage:'ss-test',runId:freshMastery.id,itemIndex:i,objectiveIds:q.objectiveIds,independent:true,correct:true,createdAt:new Date(Date.now()+10000).toISOString()});}
assert.equal(summary(recovering,recoveryPlans).practiceMastery,true,'Fresh successful practice can recover from historical misses');assert.equal(summary(recovering,recoveryPlans).tests.find(t=>t.id==='C').percent,80,'Original score remains80%');
const supported=records.map(r=>({...r,independent:false}));assert.equal(summary(supported,plans).practiceMastery,false);
// In-memory private record integration: no production data or user writes.
const require=createRequire(import.meta.url);const {build}=require('../node_modules/.pnpm/esbuild@0.28.0/node_modules/esbuild/lib/main.js');
const sql=new DatabaseSync(':memory:');for(const f of readdirSync('drizzle').filter(x=>x.endsWith('.sql')).sort())sql.exec(readFileSync('drizzle/'+f,'utf8').replaceAll('--> statement-breakpoint',''));
const db={prepare(query){let v=[];return {bind(...args){v=args;return this},async all(){return {results:sql.prepare(query).all(...v)}},async run(){return sql.prepare(query).run(...v)}}}};globalThis.RY_TEST_ENV={DB:db};mkdirSync('.sites-runtime/qc',{recursive:true});
await build({entryPoints:['lib/ss-test-records.ts'],outfile:'.sites-runtime/qc/ss-unit.mjs',bundle:true,platform:'node',format:'esm',plugins:[{name:'test-env',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'env',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export const env=globalThis.RY_TEST_ENV;'}));}}]});
const m=await import('../.sites-runtime/qc/ss-unit.mjs?'+Date.now());const user='synthetic-unit';let s=await m.testsState(user);assert.equal(s.tests.length,0);
s=await m.testAction(user,{action:'start',kind:'C'});assert.equal(s.active.total,50,'No lesson/browser flag blocks any comprehensive form');
const p=newPlan('C',[],[]),q=questionFor(p,0,user);const wrong=(q.answer+1)%q.options.length;
s=await m.testAction(user,{action:'answer',runId:'C',index:0,answer:wrong,independent:true});assert.equal(s.feedback.correct,false);assert.equal(s.tests[0].answered,1);assert.ok(s.feedback.teaching);
s=await m.testAction(user,{action:'answer',runId:'C',index:0,answer:q.answer,independent:true});assert.equal(s.feedback.correct,false);assert.equal(s.preserved,true);
assert.equal((await m.testsState('synthetic-other')).tests.length,0);
const missState=await m.testsState(user);const missPlan=newPlan('adaptive',missState.history,[p]);const freshMiss=questionFor(missPlan,0,user);assert.ok(freshMiss.sourceItemIds.includes(unit.pool.find(x=>x.id===p.items[0]).repair.id));assert.equal(safeQuestion(freshMiss).teach,undefined);assert.notEqual(freshMiss.prompt,q.prompt);

for(let i=1;i<50;i++)await m.testAction(user,{action:'answer',runId:'C',index:i,answer:questionFor(p,i,user).answer,independent:true});
s=await m.testsState(user,'C');assert.equal(s.tests[0].correct,49);assert.equal(s.tests[0].percent,98);assert.equal(s.tests[0].complete,true);assert.equal(s.active.question,null);
const reports=sql.prepare("SELECT * FROM reports WHERE activity_key='ss-result:C'").all();assert.equal(reports.length,1);assert.match(JSON.parse(reports[0].payload).summary,/49\/50/);
await m.testAction(user,{action:'attestLessons'});await m.testAction(user,{action:'attestLessons'});s=await m.testsState(user);assert.equal(s.learned.length,13);assert.ok(s.learned.every(l=>l.attested));assert.equal(s.tests[0].correct,49,'Completion attestation cannot invent or change test scores');
console.log('Unit QC passed: three disjoint50-question forms cover47 objectives/all24 terms/13chapters; fresh adaptive evidence; support and delayed gates; resume, immutable original score, automatic private completion report, parent-attested lessons and account isolation.');
