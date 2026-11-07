import './ecology/choice-layout.js';
// A form's order is randomized once per learner and retained across reloads.
function randomFor(seed){let h=2166136261;for(const c of seed){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function shuffle(values,random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function shuffleFor(values, seed) {
 return shuffle(values, randomFor(seed));
}

function itemVariant(q,seed,arrangement){
 const r=q.repair?itemVariant(q.repair,seed+':repair'):undefined;
 if(!q.options?.length)return {...q,...(r?{repair:r}:{})};
 const order=arrangement||shuffle(q.options.map((_,i)=>i),randomFor(seed+':choices'));
 const answer=Array.isArray(q.answer)?q.answer.map(i=>order.indexOf(i)):typeof q.answer==='number'?order.indexOf(q.answer):q.answer;
 return {...q,options:order.map(i=>q.options[i]),answer,...(r?{repair:r}:{})};
}
export function formChoiceOrders(questions, seed){
 return globalThis.RyChoiceLayout.orders(questions,randomFor(seed));
}
export function orderChoices(question, seed, order){
 return itemVariant(question,seed,order);
}
export function personalizeLesson(lesson,user,orderVersion=1){
 if(!user)return lesson;
 const out={...lesson};
 for(const stage of ['practice','independentCheck','masteryCheck','delayed']){
  const seed=`ry-order-v1:${user}:${lesson.id}:${lesson.contentVersion||'1'}:${stage}`;
  const items=shuffle(lesson[stage]||[],randomFor(seed+':questions'));
  const orders=orderVersion>=2?formChoiceOrders(items,seed+':balanced-v2'):{};
  out[stage]=items.map(q=>({...itemVariant(q,seed+':'+q.id,orders[q.id]),...(orderVersion>=2?{orderVersion}:{})}));

 }
 if(orderVersion>=2&&lesson.guided?.options?.length)out.guided=itemVariant(lesson.guided,`ry-guided-v2:${user}:${lesson.id}`);
 if(lesson.subject==='SS'&&lesson.teachingSections)out.teachingSections=lesson.teachingSections.map(s=>{const seed=`ry-guided:${user}:${lesson.id}:${lesson.contentVersion}:${s.id}`;const choice=itemVariant({options:s.tryChoices,answer:s.tryAnswerIndex},seed);return {...s,tryChoices:choice.options,tryAnswerIndex:choice.answer,connections:(s.connections||[]).map(q=>itemVariant(q,seed+':'+q.id))};});
 return out;
}

// A stage revision can change v2 positions even when an individual item kept its ID.
const changedV2Stages = {
 fresh_math_order_powers: ['practice', 'check', 'delayed'],
 ss_verified_social_pyramid: ['practice'],
 ss_verified_writing_trade: ['practice']
};

export function requiresLayoutRefresh(lessonId, stage) {
 return changedV2Stages[lessonId]?.includes(stage) ?? false;
}

export function vocabularyRound(lesson, round, version = 1) {
 const words = lesson.vocabulary.map(item => item.word);
 const size = words.length;
 const target = words[round % size];
 if (version === 1) {
  const answer = round % 4;
  const options = Array.from({length: 4}, (_, index) => words[(round + (index - answer + 4) % 4) % size]);
  return { options, answer };
 }
 const pass = Math.floor(round / size);
 const seed = `ry-word-game-v2:${lesson.id}:${lesson.gameVersion || '1'}:${pass}`;
 const questions = words.map(word => ({
  id: word, answer: 0,
  options: [word, ...shuffleFor(words.filter(other => other !== word), seed + ':' + word).slice(0, 3)]
 }));
 const item = questions[round % size];
 const order = formChoiceOrders(questions, seed)[target];
 return {options: order.map(index => item.options[index]), answer: order.indexOf(0)};
}
