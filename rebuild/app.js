'use strict';
const CURRENT_KEY = 'learn-with-ry:2026-11-06';
const SUBJECTS = {ELA:{name:'ELA',topic:'Reading, writing and language'},MATH:{name:'Math',topic:'Numbers, expressions and reasoning'},SCI:{name:'Science',topic:'Ecosystems and connections'},SS:{name:'Social Studies',topic:'Ancient Egypt'},THEATER:{name:'Theater',topic:'Performance and classroom projects'}};
const STAGES = ['Teach','Guided practice','Independent application','Assessment','Retention'];
let catalog, releaseGate, readingText = '', generation = 0, recording = null, speechTimer;
const recordedLessons = new Set();
const audioStatus = document.getElementById('audio-status');
const recordedButton = document.getElementById('recorded');
function setRecordedLesson(id){
  recordedButton.hidden=!recordedLessons.has(id);
  recordedButton.style.display=recordedButton.hidden?'none':'';
  recordedButton.dataset.source=recordedButton.hidden?'':'rebuild/recorded/'+id+'.mp3';
}
function isLessonReleased(l){return Boolean(l&&l.releaseStatus==='verified'&&l.assessmentEnabled&&releaseGate?.subjects[l.subject]?.verifiedStandaloneLessons?.includes(l.id));}
let state = {bookmarks:{},writing:{},visits:{},attempts:[]};
let storageAvailable = true;
try {const saved=JSON.parse(localStorage.getItem(CURRENT_KEY));if(saved && saved.resetId==='2026-11-06') state={...state,...saved};} catch(error){storageAvailable=false;}
function save(){try{localStorage.setItem(CURRENT_KEY,JSON.stringify({...state,resetId:'2026-11-06'}));}catch(error){storageAvailable=false;}}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function add(parent,tag,text,cls){const n=el(tag,text,cls);parent.append(n);return n;}
function link(parent,text,href,cls){const a=add(parent,'a',text,cls);a.href=href;return a;}
function stopAudio(){
  generation++;
  clearTimeout(speechTimer);
  window.speechSynthesis?.cancel();
  if(recording){recording.pause();recording=null;}
  audioStatus.textContent='';
}
function voices(){const select=document.getElementById('voice');const old=select.value;select.replaceChildren(new Option('Available English voice',''));if(!('speechSynthesis'in window))return;window.speechSynthesis.getVoices().filter(v=>/^en/.test(v.lang)).forEach(v=>select.add(new Option(v.name,v.voiceURI)));select.value=old;}
function playRecording(){
  if(!recordedButton.dataset.source)return;
  stopAudio();
  const audio=recording=new Audio(recordedButton.dataset.source);
  audio.playbackRate=Number(document.getElementById('rate').value);
  audioStatus.textContent='Loading recorded audio…';
  function failed(){
    if(recording!==audio)return;
    stopAudio();
    audioStatus.textContent='The recording could not load. Tap Play recorded audio to retry.';
  }
  audio.onplaying=()=>{if(recording===audio){clearTimeout(speechTimer);audioStatus.textContent='Playing recorded audio.';}};
  audio.onended=()=>{if(recording===audio){recording=null;audioStatus.textContent='Finished reading.';}};
  audio.onerror=failed;
  speechTimer=setTimeout(failed,8000);
  audio.play().catch(failed);
}
function speak(text,allowRecording=false){
  stopAudio();
  if(!text.trim()){audioStatus.textContent='Choose a lesson or page to read.';return;}
  const synth=window.speechSynthesis;
  const available=synth?.getVoices().filter(v=>/^en/i.test(v.lang))||[];
  const hasRecording=allowRecording&&!recordedButton.hidden;
  if(hasRecording&&!available.length){playRecording();return;}
  if(!synth||typeof SpeechSynthesisUtterance==='undefined'){audioStatus.textContent='This browser does not provide a reading voice.';return;}
  const token=generation;
  const chosen=document.getElementById('voice').value;
  const voice=available.find(v=>v.voiceURI===chosen)||available.find(v=>v.lang==='en-US'&&/Samantha|Aria|Jenny|Karen|Natural/i.test(v.name))||available[0];
  const chunks=text.match(/.{1,180}(?:\s|$)|\S+/gs)||[text];
  let index=0;
  function fail(){
    if(token!==generation)return;
    stopAudio();
    audioStatus.textContent=hasRecording?'The device voice stopped. Use Play recorded audio.':'The device voice did not finish. Check your device’s English speech settings and try again.';
  }
  function next(){
    if(token!==generation)return;
    clearTimeout(speechTimer);
    if(index===chunks.length){audioStatus.textContent='Finished reading.';return;}
    const utterance=new SpeechSynthesisUtterance(chunks[index++]);
    utterance.lang='en-US';
    utterance.rate=Number(document.getElementById('rate').value);
    if(voice)utterance.voice=voice;
    function watchPlayback(){
      if(token!==generation)return;
      clearTimeout(speechTimer);
      audioStatus.textContent='Reading aloud.';
      speechTimer=setTimeout(fail,Math.max(30000,utterance.text.length*250/utterance.rate));
    }
    utterance.onstart=watchPlayback;
    utterance.onresume=watchPlayback;
    utterance.onend=next;
    utterance.onerror=fail;
    audioStatus.textContent='Starting read-aloud…';
    speechTimer=setTimeout(fail,6000);
    try{synth.speak(utterance);}catch{fail();}
  }
  synth.resume();
  next();
}
recordedButton.onclick=playRecording;
document.getElementById('read').onclick=()=>speak(readingText,true);
document.getElementById('pause').onclick=()=>{
  if(recording)recording.pause();
  else if(window.speechSynthesis?.speaking)window.speechSynthesis.pause();
  else return;
  clearTimeout(speechTimer);
  audioStatus.textContent='Paused.';
};
document.getElementById('resume').onclick=()=>{
  if(recording){
    const audio=recording;
    audio.play().catch(()=>{if(recording===audio)audioStatus.textContent='The recording could not resume.';});
  }else if(window.speechSynthesis?.paused){
    window.speechSynthesis.resume();
    audioStatus.textContent='Reading aloud.';
  }
};
document.getElementById('stop').onclick=stopAudio;
document.getElementById('rate').onchange=stopAudio;document.getElementById('voice').onchange=stopAudio;
if('speechSynthesis'in window){voices();window.speechSynthesis.addEventListener('voiceschanged',voices);}window.addEventListener('pagehide',stopAudio);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio();});
function intro(main,kicker,title,text){add(main,'p',kicker,'eyebrow');add(main,'h1',title);if(text)add(main,'p',text);}
function subjectCards(main){const grid=add(main,'div',undefined,'grid');Object.entries(SUBJECTS).forEach(([id,s])=>{const card=add(grid,'section',undefined,'card');add(card,'h2',s.name);add(card,'p',s.topic);link(card,'Open subject',id==='SCI'?'curriculum-2026-11/ecology/index.html':`#subject/${id}`,'button');});}
function stages(main){const ol=add(main,'ol',undefined,'path');STAGES.forEach(s=>add(ol,'li',s));}
function reviewNotice(main){const n=add(main,'div',undefined,'notice');add(n,'p','The wider classroom review is still open. Lessons marked Ready to learn cover the specific materials named in their scope. Additional lessons and tests will open as their sources pass review.');link(n,'See the sources and remaining checks','#sources');}
function parentProgress(main){
  intro(main,'Parent review','Current work on this device','These records belong to the fresh November 6 path. Prior scores are excluded.');
  add(main,'p','Open this page in the same browser Ry used. Scores and writing are not synchronized with the private Studio or another device.','notice');
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
  add(main,'p','Focused ELA/Math lessons remain available here. Science ecology has 14 lessons and three 42-question tests here. Open the private Studio to view its separately saved results. These releases are not complete-course certification.');
  link(main,'Read the reconciliation findings','RECONCILIATION_2026-11-06.md');
  add(main,'p');link(main,'View the objective and question coverage matrix','rebuild/COVERAGE_MATRIX.json');
}
function exportHistory(){const out={current:state,archive:{}};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k!==CURRENT_KEY&&/ry|egypt|speller|studio/i.test(k))out.archive[k]=localStorage.getItem(k);}}catch(error){alert('This browser could not read local history.');return;}const url=URL.createObjectURL(new Blob([JSON.stringify(out,null,2)],{type:'application/json'}));const a=el('a');a.href=url;a.download='Learn-With-Ry-history.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function sourceView(main){intro(main,'Classroom Sources','What supports each lesson','Check the original materials, the review status and the remaining classroom requirements.');link(main,'Social Studies binder source review','https://github.com/Snacks-reading/Learn-with-Ry2/blob/main/curriculum-2026-11/SOCIAL-STUDIES-BINDER-SOURCES.md');add(main,'p','A page opening successfully does not establish that every page, diagram or video was reviewed.','muted');const box=add(main,'div',undefined,'notice');add(box,'h2','Still needed for the complete rebuild');releaseGate.blockingSources.forEach(s=>add(box,'p',s));if(catalog.weeklyPriorities){add(main,'h2','Current classroom priorities');catalog.weeklyPriorities.forEach(t=>{const row=add(main,'section',undefined,'source');add(row,'h3',t.title+' · '+t.date+(t.timeLabel?' · '+t.timeLabel:''));add(row,'p',t.detail);if(t.href)link(row,'Open '+t.title,t.href);add(row,'span',t.status,'badge');});}renderReconciliation(main);add(main,'h2','Source register');catalog.sources.forEach(s=>{const row=add(main,'section',undefined,'source');add(row,'h3',s.title);add(row,'span',s.reviewStatus.replaceAll('-',' '),'badge');add(row,'p',s.subjects.map(x=>SUBJECTS[x]?.name||x).join(' · '),'muted');if(s.notes)add(row,'p',s.notes);if(s.url)link(row,'Open original source',s.url);});link(main,'Full source ledger','SOURCE_LEDGER.md');add(main,'p');link(main,'Current governance','GOVERNANCE.md');}
function preview(main,id){const lesson=catalog.lessons.find(x=>x.id===id);if(!lesson){add(main,'h1','Lesson not found');return;}intro(main,lesson.releaseStatus==='verified'?'Learn With Ry':'Source review preview',lesson.title,lesson.releaseStatus==='verified'?lesson.scopeStatus:'Prior teaching is available here for review while the source bundle is reconciled.');if(lesson.releaseStatus!=='verified')reviewNotice(main);else setRecordedLesson(lesson.id);const paragraphs=Array.isArray(lesson.teach)?lesson.teach:[];paragraphs.forEach(t=>add(main,'p',typeof t==='string'?t:JSON.stringify(t)));readingText=[lesson.title,...paragraphs.filter(t=>typeof t==='string')].join('. ');document.getElementById('read').textContent='Read this lesson';if(lesson.model){add(main,'h2','Worked example');add(main,'p',lesson.model.prompt);add(main,'p',lesson.model.reasoning);add(main,'p',lesson.model.answer);readingText+=' '+[lesson.model.prompt,lesson.model.reasoning,lesson.model.answer].filter(Boolean).join('. ');}if(['ELA','MATH'].includes(lesson.subject)){const details=add(main,'details');add(details,'summary','Keep a review note');const area=add(details,'textarea');area.setAttribute('aria-label','Review note');area.value=state.writing[id]||'';area.oninput=()=>{state.writing[id]=area.value;save();};const read=add(details,'button','Read review prompt');read.type='button';read.onclick=()=>speak('What idea do you want to revisit? Use this space to keep a review note.');}const b=add(main,'button','Bookmark this lesson','secondary');b.onclick=()=>{state.bookmarks[id]=true;save();b.textContent='Bookmarked';};}
function render(){if(!catalog)return;stopAudio();const main=document.getElementById('main');main.replaceChildren();readingText='';setRecordedLesson();document.getElementById('read').textContent='Read this page';const [route='home',id]=location.hash.slice(1).split('/');document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(['audio','parent','listen'].includes(route)){document.getElementById('breadcrumb').textContent='Learn With Ry';add(main,'h1','Rayna’s Audio');add(main,'p','Open the Rayna’s Audio chat in ChatGPT.');link(main,'Back to student lessons','#home');return;}const titles={home:'Ry · Student Learning',subject:'Ry · Student Learning',sources:'Classroom Sources',practice:'Assessments & Practice',archive:'Archive / Prior Weeks',progress:'Parent review',preview:'Source review'};document.getElementById('breadcrumb').textContent=titles[route]||titles.home;
if(route==='home'){intro(main,'Ry · Student Learning','What will you learn today?','Choose a subject. Your lesson, examples and practice follow one path.');stages(main);if(catalog.weeklyPriorities){const upcoming=add(main,'section',undefined,'panel');add(upcoming,'h2','Coming up');catalog.weeklyPriorities.forEach(t=>{const row=add(upcoming,'p');link(row,(SUBJECTS[t.subject]?.name||t.subject)+' · '+t.title+' · '+t.date+(t.timeLabel?' · '+t.timeLabel:''),t.href||'#subject/'+t.subject);});}subjectCards(main);const p=add(main,'section',undefined,'panel');add(p,'h2','Pick up where you left off');const bookmarks=Object.keys(state.bookmarks);if(!bookmarks.length)add(p,'p','Your bookmarked lessons will appear here.');bookmarks.forEach(id=>{const l=catalog.lessons.find(x=>x.id===id);if(l)link(p,l.title,'#'+(isLessonReleased(l)?'lesson':'preview')+'/'+id);});}
else if(route==='subject'&&id==='SCI'){intro(main,'Science · classroom ecology','Your Science learning space','Study 33 teacher terms, try the lessons and work through three multiple-choice tests.');link(main,'Open Science lessons and tests','curriculum-2026-11/ecology/index.html','button');link(main,'Ecology supplemental lesson','#bridge/SCI','button secondary');link(main,'Open private Studio scores','https://ry-learning-studio.raynastover.chatgpt.site/ecology','button secondary');}
else if(route==='subject'){const s=SUBJECTS[id];if(!s){location.hash='home';return;}intro(main,'Ry · Student Learning',s.name,s.topic);stages(main);const studio='https://ry-learning-studio.raynastover.chatgpt.site/';
link(main,'Supplemental lesson and recall','#bridge/'+id,'button secondary');
if(id==='MATH'&&route==='subject'){link(main,'Open Expressions Quiz Review','#unit/EXPR','button');link(main,'Open Spiral 12 practice','#unit/MATH','button');}
if(id==='SS'){
  link(main,'Open November 13 Egypt unit review','curriculum-2026-11/egypt-teaching.html#egypt-unit-review','button');
  link(main,'Open Egypt chapters and practice','#unit/SS','button');
  link(main,'Open Social Studies binder review','curriculum-2026-11/social-studies-binder.html','button');
  link(main,'Open binder practice forms','#unit/SSBINDER','button secondary');
}
if(id==='SS')link(main,'Open Studio scores and practice →',studio+'?ssTests=1','button');
if(id==='THEATER'){const card=add(main,'section',undefined,'panel');add(card,'h2','Music for Mimes');add(card,'p','Choose a track. Listen for a clear change, then show it with a change in your movement. Follow the teacher’s directions for the class performance.');link(card,'Open the teacher’s collection','https://wcschools.schoology.com/course/8432933229/materials/link/view/8628567219','button');}
if(id==='ELA'||id==='MATH'){const lesson=id==='ELA'?'ela_explanatory_writing_20261106':'math_expression_vocabulary_20261106';link(main,'Open this week’s focus in the private Studio →',studio+'?lesson='+lesson,'button secondary');}
const available=catalog.lessons.filter(l=>l.subject===id&&isLessonReleased(l));if(available.length){const ready=add(main,'section',undefined,'panel');add(ready,'h2','Ready to learn');available.forEach(l=>{add(ready,'p',l.scopeStatus);link(ready,l.title,'#lesson/'+l.id,'button');});}reviewNotice(main);link(main,'Go to all practice','#practice','button');const p=add(main,'details');add(p,'summary','Review prior teaching while sources are checked');const grid=add(p,'div',undefined,'grid');const list=catalog.lessons.filter(l=>l.subject===id&&!l.assessmentEnabled);if(!list.length&&id!=='THEATER')add(grid,'p','Additional classroom material is awaiting source review.');list.forEach(l=>{const card=add(grid,'article',undefined,'card');add(card,'h2',l.title);link(card,'Open teaching preview','#preview/'+l.id);});}
else if(route==='unit'){const [,,form,index]=location.hash.slice(1).split('/');renderPublicPractice(main,id,form,index,location.hash);}
else if(route==='bridge')renderPublicBridge(main,id);
else if(route==='lesson')window.renderVerifiedLesson(main,id);
else if(route==='preview')preview(main,id);
else if(route==='sources')sourceView(main);
else if(route==='practice'){intro(main,'Assessments & Practice','All practice in one place','Start or resume a ready lesson below. Its guided questions, independent practice, assessment and recall check stay together.');const science=add(main,'section',undefined,'panel');add(science,'h2','Science · Tests A, B and C');add(science,'p','Three 42-question tests, fresh missed-skill rounds and delayed recall. Results save in this browser.');link(science,'Open all Science tests','curriculum-2026-11/ecology/index.html#practice','button');const math=add(main,'section',undefined,'panel');add(math,'h2','Math');link(math,'Open Expressions Quiz Review','#unit/EXPR','button');link(math,'Open Spiral 12 practice','#unit/MATH','button');const egypt=add(main,'section',undefined,'panel');add(egypt,'h2','Social Studies');link(egypt,'Open November 13 classroom practice','#unit/SSEGYPTRVW','button');link(egypt,'Open the three Egypt practice tests','#unit/SS','button');link(egypt,'Open the three cumulative binder practice forms','#unit/SSBINDER','button');const p=add(main,'div',undefined,'panel');add(p,'h2','Current assessment record');add(p,'p',state.attempts.length?state.attempts.length+' current assessment attempt(s) on this device':'Unmeasured · no current attempts');state.attempts.forEach(t=>add(p,'p',(catalog.lessons.find(l=>l.id===t.lessonId)?.title||t.lessonId)+' · '+t.correct+'/'+t.total));link(p,'Parent review · scores and saved writing','#progress','button secondary');add(p,'p','Current results and writing save in this browser only. Open this page on Ry’s device to review them.','muted');const available=catalog.lessons.filter(l=>isLessonReleased(l));available.forEach(l=>link(p,'Start or resume '+l.title,'#lesson/'+l.id,'button'));add(p,'p','Prior assessment results are available only through the archive.','muted');subjectCards(main);reviewNotice(main);}
else if(route==='progress')parentProgress(main);
else if(route==='archive'){intro(main,'Archive / Prior Weeks','Your previous work','Prior teaching and device history are kept separately from the current learning path.');link(main,'Open prior teaching','archive/2026-11-06/index.html','button');add(main,'p','Use the private Studio to view its earlier records. This rebuild starts with fresh assessment records.');link(main,'Open private history','https://ry-learning-studio.raynastover.chatgpt.site/?parent=1');const p=add(main,'section',undefined,'panel');add(p,'h2','Device history');add(p,'p','Download history from this browser, including older Learn With Ry records. This does not retrieve records from another device or from the private Studio.');const b=add(p,'button','Download device history','secondary');b.onclick=exportHistory;}
else{location.hash='home';return;}if(!['preview','listen','lesson','unit','bridge'].includes(route))readingText=main.innerText;state.visits[route]=new Date().toISOString();save();main.focus({preventScroll:true});window.scrollTo(0,0);}
window.addEventListener('hashchange',render);
Promise.all(['rebuild/catalog.json','SOURCE_COMPLETENESS_GATE.json'].map(path=>fetch(path,{cache:'no-store',signal:AbortSignal.timeout(15000)}).then(r=>{if(!r.ok)throw Error(path);return r.json();}))).then(([d,g])=>{if(d.resetId!==g.resetId)throw Error('Source gate version mismatch');catalog=d;releaseGate=g;render();}).catch(()=>{const main=document.getElementById('main');main.replaceChildren(el('h1','The learning space could not load.'));add(main,'p','Refresh this page to try again.');link(main,'Open source records','SOURCE_LEDGER.md');});

