import {env} from 'cloudflare:workers';
import unit from '../data/ss-unit-tests.json';
import catalog from '../data/catalog.json';
import {BUILD} from './mastery.mjs';
import {UNIT,summary,newPlan,questionFor,safeQuestion} from './ss-tests.mjs';
const query=async(sql:string,...args:any[])=>{const r=await env.DB!.prepare(sql).bind(...args).all();return r.results as any[]};
const parse=(s:string)=>JSON.parse(s);
async function load(user:string){
 const [a,p]=await Promise.all([query('SELECT * FROM attempts WHERE user_id=? AND build=? AND lesson_id=? ORDER BY created_at,id',user,BUILD,UNIT),query('SELECT * FROM reports WHERE user_id=? AND build=? ORDER BY created_at,id',user,BUILD)]);
 const records=a.map(r=>({...parse(r.feedback),id:r.id,answer:parse(r.answer),correct:!!r.correct,independent:!!r.independent,stage:r.stage,createdAt:r.created_at}));
 const plans=p.filter(r=>r.lesson_id===UNIT&&r.activity_key.startsWith('ss-plan:')).map(r=>parse(r.payload).plan);
 const learned=p.filter(r=>r.activity_key==='learning').map(r=>({lessonId:r.lesson_id,...parse(r.payload),createdAt:r.created_at}));
 return {records,plans,learned};
}
export async function testsState(user:string,runId?:string){const s=await load(user);const plan=s.plans.find(p=>p.id===runId);const saved=plan?s.records.filter(r=>r.runId===plan.id):[];const index=plan?plan.items.findIndex((_:any,i:number)=>!saved.some(r=>r.itemIndex===i)):-1;return {...summary(s.records,s.plans),learned:s.learned,history:s.records,active:plan?{id:plan.id,title:plan.title,index,total:plan.items.length,question:index>=0?safeQuestion(questionFor(plan,index,user)):null}:null};}
function fail(s:string):never{throw Object.assign(new Error(s),{status:400})}
export async function testAction(user:string,b:any){
 if(b.action==='attestLessons'){
  for(const l of catalog.filter(l=>l.verifiedReplacement))await env.DB!.prepare('INSERT INTO reports(id,user_id,build,lesson_id,activity_key,payload,created_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT DO NOTHING').bind(crypto.randomUUID(),user,BUILD,l.id,'learning',JSON.stringify({title:`Lesson completed · ${l.title}`,summary:'Parent reported the earlier lesson walkthrough completed. This is completion evidence, not a test score.',lessonId:l.id,kind:'learning',attested:true}),new Date().toISOString()).run();
  return testsState(user);
 }
 if(b.action==='learn'){
  const l=catalog.find(l=>l.id===b.lessonId&&l.verifiedReplacement);if(!l)fail('Choose a current Egypt lesson.');
  const report={title:`Lesson completed · ${l.title}`,summary:'Teaching and learning checks completed. Practice tests are scored separately.',lessonId:l.id,kind:'learning'};
  await env.DB!.prepare('INSERT INTO reports(id,user_id,build,lesson_id,activity_key,payload,created_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT DO NOTHING').bind(crypto.randomUUID(),user,BUILD,l.id,'learning',JSON.stringify(report),new Date().toISOString()).run();return testsState(user);
 }
 const s=await load(user);
 if(b.action==='start'){
  let plan;try{plan=newPlan(b.kind,s.records,s.plans)}catch(e:any){fail(e.message)}
  await env.DB!.prepare('INSERT INTO reports(id,user_id,build,lesson_id,activity_key,payload,created_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT DO NOTHING').bind(crypto.randomUUID(),user,BUILD,UNIT,'ss-plan:'+plan.id,JSON.stringify({title:plan.title+' · started',summary:'In progress; unanswered questions have no score.',plan}),plan.createdAt).run();return testsState(user,plan.id);
 }
 if(b.action!=='answer')fail('Choose an available test action.');
 const plan=s.plans.find(p=>p.id===b.runId);if(!plan)fail('Start or resume the test first.');
 const index=plan.items.findIndex((_:any,i:number)=>!s.records.some(r=>r.runId===plan.id&&r.itemIndex===i));
 const old=s.records.find(r=>r.runId===plan.id&&r.itemIndex===b.index);
 if(old)return {...await testsState(user,plan.id),feedback:old,preserved:true};
 if(index<0||b.index!==index)fail('Resume at the next unanswered question.');
 const q=questionFor(plan,index,user);if(!Number.isInteger(b.answer)||b.answer<0||b.answer>=q.options.length)fail('Choose one answer.');
 const feedback={runId:plan.id,itemIndex:index,prompt:q.prompt,options:q.options,correctAnswer:q.answer,feedback:q.rationale,teaching:q.teaching,sourceRef:q.sourceRef,sourceRefs:q.sourceRefs,chapterId:q.chapterId,objectiveId:q.objectiveId,objectiveIds:q.objectiveIds,sourceItemIds:q.sourceItemIds};
 const now=new Date().toISOString(),correct=q.answer===b.answer,independent=b.independent===true;
 await env.DB!.prepare('INSERT INTO attempts(id,user_id,build,lesson_id,item_id,stage,answer,correct,independent,reasoning,feedback,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT DO NOTHING').bind(crypto.randomUUID(),user,BUILD,UNIT,q.id,'ss-test',JSON.stringify(b.answer),correct?1:0,independent?1:0,'',JSON.stringify(feedback),now).run();
 const updated=await load(user);const result=summary(updated.records,updated.plans);const completed=result.tests.find((t:any)=>t.id===plan.id);
 if(completed?.complete){const report={title:plan.title+' · completed',summary:`${completed.correct}/${completed.total} correct · ${completed.percent}%. ${completed.independent}/${completed.total} answered independently.`,...completed,status:result.status,kind:'ss-test'};
  await env.DB!.prepare('INSERT INTO reports(id,user_id,build,lesson_id,activity_key,payload,created_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT DO NOTHING').bind(crypto.randomUUID(),user,BUILD,UNIT,'ss-result:'+plan.id,JSON.stringify(report),now).run();}
 const saved=updated.records.find(r=>r.runId===plan.id&&r.itemIndex===index);return {...await testsState(user,plan.id),feedback:saved};
}
