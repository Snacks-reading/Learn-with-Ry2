// A form's order is randomized once per learner and retained across reloads.
function randomFor(seed){let h=2166136261;for(const c of seed){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function shuffle(values,random){const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function itemVariant(q,seed){
 const r=q.repair?itemVariant(q.repair,seed+':repair'):undefined;
 if(!q.options?.length)return {...q,...(r?{repair:r}:{})};
 const order=shuffle(q.options.map((_,i)=>i),randomFor(seed+':choices'));
 const answer=Array.isArray(q.answer)?q.answer.map(i=>order.indexOf(i)):typeof q.answer==='number'?order.indexOf(q.answer):q.answer;
 return {...q,options:order.map(i=>q.options[i]),answer,...(r?{repair:r}:{})};
}
export function personalizeLesson(lesson,user){
 if(!user)return lesson;
 const out={...lesson};
 for(const stage of ['practice','independentCheck','masteryCheck','delayed']){
  const seed=`ry-order-v1:${user}:${lesson.id}:${lesson.contentVersion||'1'}:${stage}`;
  out[stage]=shuffle((lesson[stage]||[]).map(q=>itemVariant(q,seed+':'+q.id)),randomFor(seed+':questions'));
 }
 return out;
}
