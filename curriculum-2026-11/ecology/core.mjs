import './choice-layout.js?v=20261106-allqc';
export const NAMESPACE='learn-with-ry:ecology:2026-11-07-v1';
export const DAY=86400000;
export function freshState(){return {namespace:NAMESPACE,revision:0,lessons:{},runs:[],activeRun:null};}
export function shuffle(values){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function recallTargets(data, index) {
 return data.objectives.filter((_, i) => i % data.retentionDays.length === index);
}
function completedRecallSkills(data, runs, day) {
 const objectives = new Map(data.questions.map(q => [q.id, q.objectiveId]));
 return new Set(runs.filter(run => run.kind === 'retention' && run.day === day && run.independent && run.finishedAt)
  .flatMap(run => run.answers.filter(answer => answer.correct).map(answer => objectives.get(answer.itemId))));
}
function usedItems(data, state) {
 // Guided prompts can be viewed without recording a guided answer.
 return new Set([...state.runs.flatMap(run => run.items), ...data.chapters.map(chapter => chapter.guided.id)]);
}
export function practiceFormsComplete(runs){
 return [...'ABC'].every(form=>runs.some(run=>run.kind==='test'&&run.form===form&&run.finishedAt));
}
export function summary(data,state,now=Date.now()){
 const finished=state.runs.filter(r=>r.finishedAt).sort((a,b)=>a.finishedAt.localeCompare(b.finishedAt));
 const tests=finished.filter(r=>r.kind==='test'),anchor=tests[0]?.finishedAt;
 const evidence=data.objectives.map(objectiveId=>{const answers=finished.filter(r=>r.independent).flatMap(r=>r.answers.filter(a=>data.questions.find(q=>q.id===a.itemId)?.objectiveId===objectiveId));const recent=answers.sort((a,b)=>a.at.localeCompare(b.at)).slice(-10);return {objectiveId,answered:answers.length,correct:answers.filter(a=>a.correct).length,recentCorrect:recent.filter(a=>a.correct).length,recentTotal:recent.length,secure:recent.length>=4&&recent.filter(a=>a.correct).length/recent.length>=.9,delayed:finished.some(r=>r.kind==='retention'&&r.independent&&r.answers.some(a=>a.correct&&data.questions.find(q=>q.id===a.itemId)?.objectiveId===objectiveId))};});
 const latest=tests.filter(r=>r.independent).at(-1);const accuracy=latest?latest.answers.filter(a=>a.correct).length/latest.answers.length:null;
 const retention=data.retentionDays.map((day,i)=>{
  const completed=completedRecallSkills(data,finished,day);
  return {day,dueAt:anchor?new Date(Date.parse(anchor)+day*DAY).toISOString():null,due:!!anchor&&now>=Date.parse(anchor)+day*DAY,complete:recallTargets(data,i).every(objective=>completed.has(objective))};
 });
 return {tests,accuracy,evidence,retention,mastered:practiceFormsComplete(tests)&&accuracy>=.9&&evidence.every(e=>e.secure&&e.delayed)&&retention.every(r=>r.complete)};
}
export function act(data,state,action,now=Date.now()){
 if(state.namespace!==NAMESPACE)throw Error('This record belongs to another learning edition.');
 const stamp=new Date(now).toISOString();
 if(action.type==='lesson'){
  if(!data.chapters.some(c=>c.id===action.chapterId))throw Error('Unknown lesson.');
  if(action.guidedAnswer!==undefined){const q=data.chapters.find(c=>c.id===action.chapterId).guided;if(!Number.isInteger(action.guidedAnswer)||action.guidedAnswer<0||action.guidedAnswer>=q.options.length)throw Error('Choose an answer.');const w=state.lessons[action.chapterId]||{};if(w.guidedAnswer===undefined)state.lessons[action.chapterId]={...w,guidedAnswer:action.guidedAnswer,guidedCorrect:action.guidedAnswer===q.answer,at:stamp};}
  else state.lessons[action.chapterId]={...state.lessons[action.chapterId],read:true,at:stamp};
 }else if(action.type==='start'){
  let ids=[],day;
  if(action.kind==='test'){
   if(!data.forms[action.form])throw Error('Unknown test.');
   const prior=state.runs.find(r=>r.kind==='test'&&r.form===action.form);if(prior){state.activeRun=prior.id;return state;}
   if(action.form==='D'&&(!practiceFormsComplete(state.runs)||action.independent!==true))throw Error('Finish tests A, B and C and check the independent-work box to start the transfer check.');
   ids=data.forms[action.form];
  }else if(action.kind==='repair'){
   const ongoing=state.runs.find(r=>r.kind==='repair'&&!r.finishedAt);if(ongoing){state.activeRun=ongoing.id;return state;}
   const missed=new Set(state.runs.flatMap(r=>r.answers.filter(a=>!a.correct).map(a=>data.questions.find(q=>q.id===a.itemId)?.objectiveId)).filter(Boolean));
   const used=usedItems(data,state);
   const finishedPractice=practiceFormsComplete(state.runs);
   const target=summary(data,state,now).evidence.filter(e=>!e.secure&&(missed.has(e.objectiveId)||(finishedPractice&&e.answered<4)));
   ids=target.map(e=>data.questions.find(q=>q.objectiveId===e.objectiveId&&q.variant>=4&&!used.has(q.id)&&!data.forms.D.includes(q.id))?.id).filter(Boolean);
   if(!target.length)throw Error('No skills currently need a missed-skill round. Continue a full test or a due recall check.');
   if(!ids.length)throw Error('No unused missed-skill questions remain in this edition. Continue an uncompleted test or a due recall check; no old answer will be counted as fresh.');
  }else if(action.kind==='retention'){
   const info=summary(data,state,now),index=data.retentionDays.indexOf(action.day);day=action.day;
   if(index<0||!info.retention[index].due)throw Error('This recall check is not due yet.');
   const previous=state.runs.filter(r=>r.kind==='retention'&&r.day===day).at(-1);
   if(previous&&(!previous.finishedAt||info.retention[index].complete)){state.activeRun=previous.id;return state;}
   const used=usedItems(data,state);
   const completed=completedRecallSkills(data,state.runs,day);
   const target=recallTargets(data,index).filter(objective=>!completed.has(objective));
   ids=target.map(o=>data.questions.find(q=>q.objectiveId===o&&q.variant>=3&&!used.has(q.id)&&!data.forms.D.includes(q.id))?.id).filter(Boolean);
   if(!ids.length)throw Error('This recall needs additional unused questions before it can be retried. Your first score remains saved. Other tests and lessons are available.');
  }else throw Error('Unknown round.');
  const runId=globalThis.crypto.randomUUID();
  const items=shuffle(ids);
  const questions=items.map(id=>data.questions.find(q=>q.id===id));
  const orders=globalThis.RyChoiceLayout.orders(questions);
  state.runs.push({id:runId,kind:action.kind,form:action.form||null,day:day||null,independent:action.independent===true,startedAt:stamp,items,orders,answers:[]});
  state.activeRun=runId;
 }else if(action.type==='answer'){
  const run=state.runs.find(r=>r.id===action.runId);if(!run)throw Error('Saved round not found.');
  if(run.answers.some(a=>a.itemId===action.itemId))return state;
  if(run.finishedAt||run.items[run.answers.length]!==action.itemId)throw Error('Answer the current question.');
  const q=data.questions.find(q=>q.id===action.itemId);if(!Number.isInteger(action.selected)||action.selected<0||action.selected>=q.options.length)throw Error('Choose one answer.');
  run.answers.push({itemId:q.id,selected:action.selected,correct:action.selected===q.answer,at:stamp});
  if(run.answers.length===run.items.length)run.finishedAt=stamp;
 }else if(action.type==='resume'){
  if(!state.runs.some(r=>r.id===action.runId))throw Error('Round not found.');state.activeRun=action.runId;
 }else throw Error('Unknown action.');
 state.revision++;return state;
}
