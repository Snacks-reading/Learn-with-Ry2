import unit from './ss-unit-tests.json' with {type:'json'};
import {personalizeLesson,formChoiceOrders,orderChoices,shuffleFor} from './assessment-order.mjs';
export const UNIT=unit.id;
const questionPool=[...unit.pool,...unit.repairPool];
export const objectives=Object.keys(unit.objectiveLabels);
const recallDays = [1, 3, 7, 14, 30];
const objectivesFor = item => item.objectiveIds || [item.objectiveId];
const scheduledObjectives = day => objectives.filter((_, index) => recallDays[index % recallDays.length] === day);
const reservedFormIds = Object.values(unit.forms).flat();
const cleanPrompt = item => item.prompt.trim().toLowerCase().replace(/\s+/g, ' ');
function sourceQuestionFor(plan,index,orderVersion=1){
 const spec=plan.items[index];if(!spec)return null;
 const first=questionPool.find(q=>q.id===(typeof spec==='string'?spec:spec[0]));
 let q={...first,objectiveIds:first.objectiveIds||[first.objectiveId]};
 if(Array.isArray(spec)){
  const second=questionPool.find(q=>q.id===spec[1]);
  q={...first,prompt:`Answer both questions. Which pair has both answers correct?\n1. ${first.prompt}\n2. ${second.prompt}`,options:[`1: ${first.options[first.answer]} / 2: ${second.options[second.answer]}`,`1: ${first.options[(first.answer+1)%first.options.length]} / 2: ${second.options[second.answer]}`,`1: ${first.options[first.answer]} / 2: ${second.options[(second.answer+1)%second.options.length]}`],answer:0,rationale:`1. ${first.rationale}\n2. ${second.rationale}`,teaching:first.teaching+'\n'+second.teaching,objectiveIds:[...new Set([...(first.objectiveIds||[first.objectiveId]),...(second.objectiveIds||[second.objectiveId])])],sourceRefs:[first.sourceRef,second.sourceRef],sourceItemIds:spec};
  if(orderVersion===2){
   const firstWrong=first.options[(first.answer+1)%first.options.length];
   const secondWrong=second.options[(second.answer+1)%second.options.length];
   q.options.push(`1: ${firstWrong} / 2: ${secondWrong}`);
  }
 }
 q={...q,id:`${plan.id}:${index}`,sourceItemIds:q.sourceItemIds||[first.id],sourceLinks:(q.sourceRefs||[q.sourceRef]).map(ref=>({...ref,...unit.sources[ref.sourceId]}))};
 return q;
}
export function questionFor(plan,index,user,orderVersion=1){
 const question=sourceQuestionFor(plan,index,orderVersion);
 if(!question)return null;
 if(!user||orderVersion!==2)return personalizeLesson({id:UNIT,contentVersion:plan.id,practice:[question]},user).practice[0];
 const seed=`ry-egypt-v2:${user}:${plan.id}`;
 const items=plan.items.map((_,i)=>sourceQuestionFor(plan,i,orderVersion));
 const orders=formChoiceOrders(items,seed);
 return {...orderChoices(question,seed,orders[question.id]),orderVersion};
}
export function summary(records, plans, now = Date.now()) {
 const ev = records.filter(r => r.stage === 'ss-test');
 const independent = ev.filter(r => r.independent && (r.sourceItemIds?.length ?? 1) === 1);
 const skills = objectives.map(id => {
  const recent = independent.filter(r => r.objectiveIds?.includes(id)).slice(-10);
  const correct = recent.filter(r => r.correct).length;
  return {id, label: unit.objectiveLabels[id], answered: recent.length, correct, ready: recent.length >= 4 && correct / recent.length >= .9};
 });
 const tests = plans.map(p => {
  const answers = ev.filter(x => x.runId === p.id);
  const correct = answers.filter(x => x.correct).length;
  const complete = answers.length === p.items.length;
  return {id: p.id, title: p.title, answered: answers.length, total: p.items.length,
   correct, independent: answers.filter(x => x.independent).length,
   percent: answers.length ? Math.round(100 * correct / answers.length) : null, complete,
   createdAt: p.createdAt, completedAt: complete ? answers.at(-1)?.createdAt : null};
 });
 const full = tests.filter(t => ['A', 'B', 'C'].includes(t.id) ||
  (t.id.startsWith('M') && plans.find(p => p.id === t.id)?.items.every(id => typeof id === 'string')));
 const completed = full.filter(t => t.complete).sort((a, b) => a.completedAt.localeCompare(b.completedAt));
 const latest = completed.at(-1);
 const practiceMastery = ['A', 'B', 'C'].every(id => completed.some(t => t.id === id)) &&
  !!latest && latest.correct / latest.total >= .9 && latest.independent === latest.total && skills.every(s => s.ready);
 const first = completed[0]?.completedAt;
 const retention = recallDays.map(day => {
  const prefix = `D${day}_`;
  const eligible = tests.filter(t => t.id.startsWith(prefix) && t.complete &&
   t.independent === t.total && plans.find(p => p.id === t.id)?.items.every(id => typeof id === 'string'));
  const eligibleIds = new Set(eligible.map(t => t.id));
  const demonstrated = new Set(independent.filter(r => eligibleIds.has(r.runId) && r.correct).flatMap(objectivesFor));
  return {day, dueAt: first ? new Date(Date.parse(first) + day * 86400000).toISOString() : null,
   passed: eligible.some(t => t.correct / t.total >= .9) && scheduledObjectives(day).every(id => demonstrated.has(id)),
   remaining: scheduledObjectives(day).filter(id => !demonstrated.has(id))};
 });
 const dueAt = retention.find(t => !t.passed)?.dueAt || null;
 const retained = practiceMastery && retention.every(t => t.passed);
 return {tests, skills, practiceMastery, retained, retention, dueAt, delayedDue: !!dueAt && now >= Date.parse(dueAt),
  status: retained ? 'Mastery demonstrated · all five recall checks passed' :
   practiceMastery ? 'Practice mastery reached · delayed retention pending' : 'Keep practicing · mastery not yet demonstrated', scope: unit.scope};
}

export function newPlan(kind, records, plans, now = Date.now(), user = '', seenInLessons = []) {
 if (['A', 'B', 'C'].includes(kind)) {
  const items = user ? shuffleFor(unit.forms[kind], `ry-egypt-question-order:${user}:${kind}`) : unit.forms[kind];
  return plans.find(p => p.id === kind) || {id: kind, title: `Egypt practice test ${kind}`, items, createdAt: new Date(now).toISOString()};
 }
 if (!['adaptive', 'delayed', 'mastery'].includes(kind)) throw Error('Choose test A, B, C, missed-skill practice or later retrieval.');
 const current = summary(records, plans, now);
 const allFormsComplete = ['A', 'B', 'C'].every(id => current.tests.some(t => t.id === id && t.complete));
 if (kind === 'delayed' && !current.delayedDue) throw Error('The first retention check opens 24 hours after the first completed test. Later checks open on their scheduled days.');
 if (kind !== 'adaptive' && !allFormsComplete) throw Error('Finish tests A, B and C first. Every saved answer is preserved.');
 const recall = current.retention.find(t => !t.passed);
 const prefix = kind === 'delayed' ? `D${recall.day}_` : kind === 'mastery' ? 'M' : 'R';
 const unfinished = plans.find(p => p.id.startsWith(prefix) && !current.tests.find(t => t.id === p.id)?.complete);
 if (unfinished) return unfinished;

 const missed = new Set(records.filter(r => r.correct === false).flatMap(objectivesFor));
 const weak = current.skills.filter(s => !s.ready && (allFormsComplete || missed.has(s.id)))
  .sort((a, b) => (a.answered ? a.correct / a.answered : 1) - (b.answered ? b.correct / b.answered : 1));
 const targets = kind === 'delayed' ? (recall.remaining.length ? recall.remaining : scheduledObjectives(recall.day)) :
  kind === 'mastery' ? objectives : weak.map(s => s.id);
 if (!targets.length) throw Error('No missed skill is ready for a new round. Continue your current test or take a fresh full mastery test.');

 const used = new Set([...reservedFormIds, ...plans.flatMap(p => p.items.flat()), ...seenInLessons]);
 const usedPrompts = new Set(questionPool.filter(q => used.has(q.id)).map(cleanPrompt));
 const candidates = questionPool.filter(q => !used.has(q.id) && !usedPrompts.has(cleanPrompt(q)));
 const items = [];
 const covered = new Set();
 for (const target of targets) {
  if (covered.has(target)) continue;
  const previousMiss = records.findLast(r => r.correct === false && r.objectiveIds?.includes(target));
  const priorIds = previousMiss?.sourceItemIds || [];
  const choices = candidates.filter(q => !usedPrompts.has(cleanPrompt(q)) && objectivesFor(q).includes(target));
  const next = choices.find(q => priorIds.includes(q.repairOf)) || choices[0];
  if (!next) {
   if (kind === 'adaptive') continue;
   throw Error('A skill has no unseen source-verified question left. Additional questions are needed. Your saved scores are available.');
  }
  items.push(next.id);
  usedPrompts.add(cleanPrompt(next));
  objectivesFor(next).forEach(id => covered.add(id));
  if (kind === 'adaptive' && items.length === 10) break;
 }
 if (!items.length) throw Error('These skills have no unseen source-verified questions left. Your saved scores are available.');
 const n = plans.filter(p => p.id.startsWith(prefix)).length + 1;
 const title = kind === 'delayed' ? `Day ${recall.day} fresh retention check ${n}` :
  kind === 'mastery' ? `Fresh full mastery test ${n}` : `Fresh missed-skill round ${n}`;
 return {id: prefix + n, title, items: user ? shuffleFor(items, `ry-egypt-question-order:${user}:${prefix}${n}`) : items, createdAt: new Date(now).toISOString()};
}

export function safeQuestion(q){if(!q)return null;const {answer,rationale,repair,teaching,teach,terms,supported,correctAnswer,...shown}=q;return shown;}
