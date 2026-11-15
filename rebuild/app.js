'use strict';
const CURRENT_KEY = 'learn-with-ry:2026-11-06';
const SUBJECTS = {ELA:{name:'ELA',topic:'Reading, writing and language'},MATH:{name:'Math',topic:'Numbers, expressions and reasoning'},SCI:{name:'Science',topic:'Ecosystems and connections'},SS:{name:'Social Studies',topic:'Ancient Egypt'},THEATER:{name:'Theatre',topic:'Performance and classroom projects'}};
const STAGES = ['Teach','Guided practice','Independent application','Assessment','Retention'];
let catalog, releaseGate, readingText = '';
const narrator = createNarration(document.querySelector('.narration'));
function isLessonReleased(l){return Boolean(l&&l.releaseStatus==='verified'&&l.assessmentEnabled&&releaseGate?.subjects[l.subject]?.verifiedStandaloneLessons?.includes(l.id));}
let state = {bookmarks:{},writing:{},visits:{},attempts:[]};
let storageAvailable = true;
try {const saved=JSON.parse(localStorage.getItem(CURRENT_KEY));if(saved && saved.resetId==='2026-11-06') state={...state,...saved};} catch(error){storageAvailable=false;}
function save(){try{localStorage.setItem(CURRENT_KEY,JSON.stringify({...state,resetId:'2026-11-06'}));}catch(error){storageAvailable=false;}}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function add(parent,tag,text,cls){const n=el(tag,text,cls);parent.append(n);return n;}
function link(parent,text,href,cls){const a=add(parent,'a',text,cls);a.href=href;return a;}
function stopAudio() { narrator.reset(); }
function speak(text) { narrator.say(text); }
function syncNarration(audioUrl = '') {
  const read = document.getElementById('read');
  narrator.setText(readingText, read.textContent, audioUrl);
}
function intro(main,kicker,title,text){add(main,'p',kicker,'eyebrow');add(main,'h1',title);if(text)add(main,'p',text);}
function stages(main){const ol=add(main,'ol',undefined,'path');STAGES.forEach(s=>add(ol,'li',s));}
function reviewNotice(main){const n=add(main,'div',undefined,'notice');add(n,'p','The wider classroom review is still open. Lessons marked Ready to learn cover the specific materials named in their scope. Additional lessons and tests will open as their sources pass review.');link(n,'See the sources and remaining checks','#sources');}
function parentProgress(main){
  intro(main,'Parent review','Current work on this device','These records belong to the fresh November 6 path. Prior scores are excluded.');
  add(main,'p','Open this page in the same browser Ry used. Scores and writing stay on this device and are not synchronized across devices.','notice');
  if(!storageAvailable)add(main,'p','This browser could not save reliably. Keep this page open and download device history before leaving.','notice');
  let count=0;
  for(const lesson of catalog.lessons.filter(isLessonReleased)){
    const work=state.lessonWork?.[lesson.id+':v1'];if(!work)continue;count++;
    const box=add(main,'section',undefined,'panel');add(box,'h2',lesson.title);
    add(box,'p','Current stage: '+STAGES[work.stage]+'. Completion alone does not establish mastery.');
    for(const stage of ['guided','independent','assessment','retention']){
      const answers=lesson[stage].map((_,i)=>work.answers[stage+'-'+i]).filter(Boolean);
      const label={guided:'Guided practice',independent:'Independent application',assessment:'Assessment',retention:'Day-one recall'}[stage];
      add(box,'p',label+': '+(answers.length?answers.filter(a=>a.correct).length+'/'+answers.length+' correct · '+answers.length+'/'+lesson[stage].length+' answered':'Not started'));
      const misses=lesson[stage].map((q,i)=>({q,a:work.answers[stage+'-'+i]})).filter(x=>x.a&&!x.a.correct);
      if(misses.length){const details=add(box,'details');add(details,'summary',label+' · review '+misses.length+' missed item(s)');misses.forEach(({q,a})=>{add(details,'h3',q.prompt);add(details,'p','Selected: '+q.options[a.selected]);add(details,'p',q.rationale);});}
    }
    const writing=add(box,'details');add(writing,'summary','Saved writing · '+(work.writingSaved?'awaiting review':'draft or not started'));
    lesson.writing.forEach((q,i)=>{add(writing,'h3',q.prompt);add(writing,'p',work.writing[i]?.trim()||'No response saved.');});
    add(box,'p','Mastery is not yet certified. Fresh missed-skill questions, later retrieval and reviewed writing remain separate requirements.','muted');
    link(box,'Resume lesson','#lesson/'+lesson.id,'button');
  }
  if(!count)add(main,'p','No current lesson work is saved in this browser.');
  link(main,'All practice','#practice');add(main,'p');const exportButton=add(main,'button','Download device history','secondary');exportButton.onclick=exportHistory;
}
function renderReconciliation(main){
  add(main,'h2','Reconciled release status · November 6');
  const wrap=add(main,'div',undefined,'table-wrap'),table=add(wrap,'table');
  const head=add(table,'thead'),row=add(head,'tr');['Subject','Ready lessons','Remaining coverage'].forEach(t=>add(row,'th',t));const body=add(table,'tbody');
  Object.entries(releaseGate.subjects).forEach(([id,g])=>{const row=add(body,'tr');add(row,'th',SUBJECTS[id].name);add(row,'td',String(catalog.lessons.filter(l=>l.subject===id&&isLessonReleased(l)).length));add(row,'td',g.blocker||'The full classroom scope is still under review.');});
  const requirements=catalog.recoveredTeacherRequirements;if(requirements){const details=add(main,'details');add(details,'summary','Recovered Egypt requirements · exact teacher vocabulary and social pyramid');add(details,'h3','24 teacher vocabulary terms');add(details,'p',requirements.egyptVocabulary.terms.join(' · '));add(details,'p',requirements.egyptVocabulary.definitionStatus);add(details,'h3','OER page 15 · tiers from top to bottom');const list=add(details,'ol');requirements.egyptSocialPyramid.tiersTopToBottom.forEach(t=>add(list,'li',t));}
  add(main,'p','Focused ELA/Math lessons remain available here. Science ecology has 14 lessons and three 42-question tests here. Earlier private records are not imported into this public reset. These releases are not complete-course certification.');
  link(main,'Read the reconciliation findings','RECONCILIATION_2026-11-06.md');
  add(main,'p');link(main,'View the objective and question coverage matrix','rebuild/COVERAGE_MATRIX.json');
}
function exportHistory(){const out={current:readWeekRecords(),archive:{}};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k!==WEEK_RECORDS_KEY&&/ry|egypt|speller|studio/i.test(k))out.archive[k]=localStorage.getItem(k);}}catch(error){alert('This browser could not read local history.');return;}const url=URL.createObjectURL(new Blob([JSON.stringify(out,null,2)],{type:'application/json'}));const a=el('a');a.href=url;a.download='Learn-With-Ry-history.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function sourceView(main){intro(main,'Classroom Sources','What supports each lesson','Check the original materials, the review status and the remaining classroom requirements.');appendCurrentSourceReview(main);link(main,'Social Studies binder source review','https://github.com/Snacks-reading/Learn-with-Ry2/blob/main/curriculum-2026-11/SOCIAL-STUDIES-BINDER-SOURCES.md');add(main,'p','A page opening successfully does not establish that every page, diagram or video was reviewed.','muted');const box=add(main,'div',undefined,'notice');add(box,'h2','Still needed for the complete rebuild');releaseGate.blockingSources.forEach(s=>add(box,'p',s));if(catalog.weeklyPriorities){add(main,'h2','Prior classroom records');catalog.weeklyPriorities.forEach(t=>{const row=add(main,'section',undefined,'source');add(row,'h3',t.title+' · '+t.date+(t.timeLabel?' · '+t.timeLabel:''));add(row,'p',t.detail);if(t.href)link(row,'Open '+t.title,t.href);add(row,'span',t.status,'badge');});}renderReconciliation(main);add(main,'h2','Source register');catalog.sources.forEach(s=>{const row=add(main,'section',undefined,'source');add(row,'h3',s.title);add(row,'span',s.reviewStatus.replaceAll('-',' '),'badge');add(row,'p',s.subjects.map(x=>SUBJECTS[x]?.name||x).join(' · '),'muted');if(s.notes)add(row,'p',s.notes);if(s.url)link(row,'Open original source',s.url);});link(main,'Full source ledger','SOURCE_LEDGER.md');add(main,'p');link(main,'Current governance','GOVERNANCE.md');}
function preview(main,id){const lesson=catalog.lessons.find(x=>x.id===id);if(!lesson){add(main,'h1','Lesson not found');return;}intro(main,lesson.releaseStatus==='verified'?'Learn With Ry':'Source review preview',lesson.title,lesson.releaseStatus==='verified'?lesson.scopeStatus:'Prior teaching is available here for review while the source bundle is reconciled.');if(lesson.releaseStatus!=='verified')reviewNotice(main);const paragraphs=Array.isArray(lesson.teach)?lesson.teach:[];paragraphs.forEach(t=>add(main,'p',typeof t==='string'?t:JSON.stringify(t)));readingText=[lesson.title,...paragraphs.filter(t=>typeof t==='string')].join('. ');document.getElementById('read').textContent='Read this lesson';if(lesson.model){add(main,'h2','Worked example');add(main,'p',lesson.model.prompt);add(main,'p',lesson.model.reasoning);add(main,'p',lesson.model.answer);readingText+=' '+[lesson.model.prompt,lesson.model.reasoning,lesson.model.answer].filter(Boolean).join('. ');}if(['ELA','MATH'].includes(lesson.subject)){const details=add(main,'details');add(details,'summary','Keep a review note');const area=add(details,'textarea');area.setAttribute('aria-label','Review note');area.value=state.writing[id]||'';area.oninput=()=>{state.writing[id]=area.value;save();};const read=add(details,'button','Read review prompt');read.type='button';read.onclick=()=>speak('What idea do you want to revisit? Use this space to keep a review note.');}const b=add(main,'button','Bookmark this lesson','secondary');b.onclick=()=>{state.bookmarks[id]=true;save();b.textContent='Bookmarked';};}
function render(){if(!catalog)return;stopAudio();const main=document.getElementById('main');main.replaceChildren();delete main.dataset.recording;readingText='';document.getElementById('read').textContent='Read this page';const [route='home', id, subId, index] = (location.hash.slice(1) || 'home').split('/');
document.body.classList.toggle('home-view', route === 'home');
const navRoute = ({study:'week', check:'practice', unit:'practice', subject:'contents'})[route] ?? route;
document.querySelectorAll('nav a').forEach(a => {
  if (a.hash === '#' + navRoute) a.setAttribute('aria-current','page');
  else a.removeAttribute('aria-current');
});
const titles = {home:'Home', week:'This week', study:'This week', contents:'Table of contents',
  subject:'Subjects', sources:'Classroom sources', practice:'Practice', check:'Practice',
  archive:'Prior weeks', progress:'Progress', preview:'Source review'};
document.getElementById('breadcrumb').textContent = titles[route] ?? 'Learn With Ry';
if (['audio','parent','listen'].includes(route)) {
  add(main,'h1','Rayna’s Audio');
  add(main,'p','Open the Rayna’s Audio chat in ChatGPT.');
  link(main,'Back to student lessons','#home');
  return;
}
if (route==='home') { renderStudyHome(main); }
else if (route==='contents') { renderContents(main); }
else if (route==='study') { renderWeekLesson(main,id,subId); }
else if (route==='check') { renderWeekPractice(main,id,subId,index,location.hash); }
else if(route==='subject'&&id==='SCI'){intro(main,'Science · classroom ecology','Your Science learning space','Study 33 teacher terms, try the lessons and work through three multiple-choice tests.');link(main,'This week’s Science lesson','#week/SCI','button');link(main,'Open Science lessons and tests','curriculum-2026-11/ecology/index.html','button');link(main,'Ecology supplemental lesson','#bridge/SCI','button secondary');}
else if(route==='subject'){const s=SUBJECTS[id];if(!s){location.hash='home';return;}intro(main,'Ry · Student Learning',s.name,s.topic);stages(main);
link(main,'This week’s '+s.name+' lesson','#week/'+id,'button');
link(main,'Supplemental lesson and recall','#bridge/'+id,'button secondary');
if(id==='MATH'&&route==='subject'){link(main,'Open Expressions Quiz Review','#unit/EXPR','button');link(main,'Open Spiral 12 practice','#unit/MATH','button');}
if(id==='SS'){
  link(main,'Open November 13 Egypt unit review','curriculum-2026-11/egypt-teaching.html#egypt-unit-review','button');
  link(main,'Open Egypt chapters and practice','#unit/SS','button');
  link(main,'Open Social Studies binder review','curriculum-2026-11/social-studies-binder.html','button');
  link(main,'Open binder practice forms','#unit/SSBINDER','button secondary');
}
if(id==='SS')link(main,'Open Egypt scores and practice →','#unit/SS','button');
if(id==='THEATER'){const card=add(main,'section',undefined,'panel');add(card,'h2','Music for Mimes');add(card,'p','Choose a track. Listen for a clear change, then show it with a change in your movement. Follow the teacher’s directions for the class performance.');link(card,'Open the teacher’s collection','https://wcschools.schoology.com/course/8432933229/materials/link/view/8628567219','button');}

const available=catalog.lessons.filter(l=>l.subject===id&&isLessonReleased(l));if(available.length){const ready=add(main,'section',undefined,'panel');add(ready,'h2','Ready to learn');available.forEach(l=>{add(ready,'p',l.scopeStatus);link(ready,l.title,'#lesson/'+l.id,'button');});}reviewNotice(main);link(main,'Go to all practice','#practice','button');const p=add(main,'details');add(p,'summary','Review prior teaching while sources are checked');const grid=add(p,'div',undefined,'grid');const list=catalog.lessons.filter(l=>l.subject===id&&!l.assessmentEnabled);if(!list.length&&id!=='THEATER')add(grid,'p','Additional classroom material is awaiting source review.');list.forEach(l=>{const card=add(grid,'article',undefined,'card');add(card,'h2',l.title);link(card,'Open teaching preview','#preview/'+l.id);});}
else if(route==='week') {
  if(id==='2026-11-09') renderWeeklyLessons(main,subId);
  else if (id && Object.hasOwn(SUBJECTS,id)) renderWeekLesson(main,id);
  else renderCurrentWeek(main);
}
else if(route==='unit'){const [,,form,index]=location.hash.slice(1).split('/');renderPublicPractice(main,id,form,index,location.hash);}
else if(route==='bridge')renderPublicBridge(main,id);
else if(route==='lesson')window.renderVerifiedLesson(main,id);
else if(route==='preview')preview(main,id);
else if(route==='sources')sourceView(main);
else if(route==='practice')renderCurrentPractice(main);
else if(route==='progress')renderWeekProgress(main);
else if(route==='history')parentProgress(main);
else if(route==='archive'){
  add(main,'h1','Prior weeks');
  weekTabs(main, 'archive');
  const p=add(main,'section',undefined,'panel');
  add(p,'h2','Earlier work on this device');
  link(p,'November 9–13 lessons','#week/2026-11-09','button');
  link(p,'November 6 and earlier','archive/2026-11-06/index.html','button secondary');
  link(p,'November 6 lesson records','#history','button secondary');
  link(p,'Earlier Ecology records','curriculum-2026-11/ecology/index.html#progress','button secondary');
  const b=add(p,'button','Download device history','secondary');b.onclick=exportHistory;
}
else { if (location.hash !== '#home') location.hash='home'; return; }
const ownNarration = ['preview','lesson','unit','bridge','study','check','week'].includes(route);
if (ownNarration && readingText) syncNarration(main.dataset.recording ?? '');
if (route === 'study' && index) {
  const target = document.getElementById('topic-' + index);
  if (target) {
    target.scrollIntoView({block: 'start'});
    target.querySelector('h3').focus({preventScroll: true});
    return;
  }
}
main.focus({preventScroll:true});
window.scrollTo(0,0);
}
document.querySelector('.skip').onclick = event => { event.preventDefault(); document.getElementById('main').focus(); };
window.addEventListener('hashchange',render);
Promise.all(['rebuild/catalog.json','SOURCE_COMPLETENESS_GATE.json'].map(path=>fetch(path,{cache:'no-store',signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error(path);return r.json();}))).then(([d,g])=>{if(d.resetId!==g.resetId)throw Error('Source gate version mismatch');catalog=d;releaseGate=g;render();}).catch(()=>{const main=document.getElementById('main');main.replaceChildren(el('h1','The learning space could not load.'));add(main,'p','Refresh this page to try again.');link(main,'Open source records','SOURCE_LEDGER.md');});

