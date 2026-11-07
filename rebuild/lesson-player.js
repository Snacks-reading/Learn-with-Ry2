'use strict';
window.renderVerifiedLesson = function(main, id) {
  const lesson = catalog.lessons.find(l=>l.id===id && isLessonReleased(l));
  if(!lesson){add(main,'h1','This lesson is awaiting source review.');return;}
  const key = id + ':v1';
  if(!state.lessonWork)state.lessonWork={};
  if(!state.lessonWork[key])state.lessonWork[key]={stage:0,index:0,answers:{},ratings:{},writing:{},startedAt:new Date().toISOString()};
  const work=state.lessonWork[key];
  const names=['Teach','Guided practice','Independent application','Assessment','Retention'];
  const stageKey=['teach','guided','independent','assessment','retention'][work.stage];
  const redraw=()=>{stopAudio();main.replaceChildren();window.renderVerifiedLesson(main,id);save();};
  intro(main,lesson.subject+' · Classroom-aligned lesson',lesson.title);
  add(main,'p',lesson.scopeStatus,'muted');
  const stages=add(main,'ol',undefined,'path');names.forEach((s,i)=>add(stages,'li',(i===work.stage?'Current · ':'')+s));
  setRecordedLesson(work.stage===0?lesson.id:undefined);
  if(work.stage===0){
    document.getElementById('read').textContent='Read this lesson';
    lesson.teach.forEach(t=>add(main,'p',t));
    add(main,'h2','See how the thinking works');add(main,'p',lesson.model.prompt);add(main,'p',lesson.model.reasoning);add(main,'p',lesson.model.answer);
    readingText=[lesson.title,...lesson.teach,lesson.model.prompt,lesson.model.reasoning,lesson.model.answer].join('. ');
    const guide=add(main,'section',undefined,'panel');guide.hidden=!lesson.opinions.length;add(guide,'h2','Your anticipation guide');add(guide,'p','Choose the rating that fits your own view. These opinions are not scored.');
    lesson.opinions.forEach((s,i)=>{const field=add(guide,'fieldset');add(field,'legend',s);['Strongly agree','Agree','Strongly disagree','Disagree'].forEach((rating,j)=>{const label=add(field,'label');const radio=add(label,'input');radio.type='radio';radio.name='opinion-'+i;radio.value=String(j);radio.checked=work.ratings[i]===j;radio.onchange=()=>{work.ratings[i]=j;save();};add(label,'span',rating);});});
    if(lesson.cards?.length){const cards=add(main,'section',undefined,'panel');add(cards,'h2','Recall cards');add(cards,'p','Say the meaning before opening the card. Close it and try again later.');lesson.cards.forEach(([front,back])=>{const card=add(cards,'details');add(card,'summary',front);add(card,'p',back);});}
    if(lesson.organizer?.length){const org=add(main,'details');add(org,'summary','Build your organizer');if(!work.organizer)work.organizer={};lesson.organizer.forEach((label,i)=>{add(org,'h3',label);const text=add(org,'textarea');text.setAttribute('aria-label',label);text.value=work.organizer[i]||'';text.oninput=()=>{work.organizer[i]=text.value;save();};});}
    const next=add(main,'button','Continue to guided practice');next.onclick=()=>{if(Object.keys(work.ratings).length<lesson.opinions.length){alert('Choose a rating for each statement.');return;}work.stage=1;work.index=0;redraw();};
    return;
  }
  if(work.stage===4){
    add(main,'h2','Remember it later');const elapsed=work.assessmentAt?Date.now()-Date.parse(work.assessmentAt):0;
    if(elapsed<86400000){const opens=work.assessmentAt?new Date(Date.parse(work.assessmentAt)+86400000):null;add(main,'p',opens?'Your fresh recall check opens '+opens.toLocaleString('en-US',{timeZone:'America/Chicago'})+' Central.':'Finish the assessment before starting the fresh recall check.');add(main,'p','Future checks are planned after 3, 7, 14 and 30 days. These need distinct questions before release.','muted');readingText='Your fresh recall check opens after a day. Return later to practice remembering.';link(main,'Return to subject','#subject/'+lesson.subject,'button');return;}
  }
  const questions=lesson[stageKey];
  if(work.index>=questions.length){
    const results=questions.map((q,i)=>work.answers[stageKey+'-'+i]);const correct=results.filter(x=>x&&x.correct).length;
    add(main,'h2',names[work.stage]+' complete');add(main,'p',correct+' of '+questions.length+' first answers correct.');
    if(work.stage===3){
      if(!work.assessmentAt){work.assessmentAt=new Date().toISOString();state.attempts.push({lessonId:id,version:'v1',kind:'assessment',correct,total:questions.length,at:work.assessmentAt});save();}
      add(main,'p','Your selected-response result is saved on this device. Writing and delayed recall are separate evidence.');
      const p=add(main,'section',undefined,'panel');add(p,'h2','Written application · saved for review');add(p,'p',lesson.passage);
      lesson.writing.forEach((q,i)=>{add(p,'h3',q.prompt);const b=add(p,'button','Read writing prompt','secondary');b.onclick=()=>speak(q.prompt);const text=add(p,'textarea');text.setAttribute('aria-label',q.prompt);text.value=work.writing[i]||'';text.oninput=()=>{work.writing[i]=text.value;save();};if(work.writingSaved)add(p,'p',q.criteria,'muted');});
      const status=add(p,'p',work.writingSaved?'Saved · awaiting parent review':'');const b=add(p,'button','Save written responses');b.onclick=()=>{if(lesson.writing.some((_,i)=>!work.writing[i]?.trim())){status.textContent='Complete all four written responses before saving for review.';return;}work.writingSaved=true;save();status.textContent='Saved on this device · awaiting parent review. These responses have not been submitted to Schoology.';};
    }
    if(work.stage<4){const b=add(main,'button','Continue to '+names[work.stage+1]);b.onclick=()=>{if(work.stage===3&&!work.writingSaved){alert('Save your written responses before continuing.');return;}work.stage++;work.index=0;redraw();};}else{add(main,'p','Delayed recall recorded. A complete mastery decision also needs reviewed writing and broader objective evidence.');}
    readingText=names[work.stage]+' complete. '+correct+' of '+questions.length+' first answers correct.';
    return;
  }
  const q=questions[work.index],answerKey=stageKey+'-'+work.index,saved=work.answers[answerKey];
  if(!work.choiceOrders)work.choiceOrders={};
  if(!work.choiceOrders[answerKey]){
    const unanswered=questions.map((question,index)=>({...question,id:stageKey+'-'+index}))
      .filter(question=>!work.choiceOrders[question.id]&&!work.answers[question.id]);
    Object.assign(work.choiceOrders,globalThis.RyChoiceLayout.orders(unanswered));
    if(!work.choiceOrders[answerKey])work.choiceOrders[answerKey]=q.options.map((_,i)=>i);
    save();
  }
  const optionOrder=work.choiceOrders[answerKey];
  add(main,'p','Question '+(work.index+1)+' of '+questions.length,'eyebrow');
  if(stageKey==='assessment'||stageKey==='guided'){add(main,'p',lesson.passage,'panel');}
  add(main,'p',q.prompt,'prompt');const field=add(main,'fieldset');add(field,'legend','Choose one answer');
  optionOrder.forEach((i,position)=>{const option=q.options[i];const label=add(field,'label');const radio=add(label,'input');radio.type='radio';radio.name='lesson-answer';radio.value=String(i);radio.checked=saved?.selected===i;radio.disabled=Boolean(saved);add(label,'span',String.fromCharCode(65+position)+'. '+option);});
  const feedback=add(main,'div',undefined,'feedback');feedback.hidden=!saved;
  function showFeedback(record){feedback.hidden=false;feedback.replaceChildren();add(feedback,'p',(record.correct?'Correct. ':'Review this idea. ')+q.rationale);if(!record.correct){add(feedback,'p','Review the explanation, then revisit the worked example before continuing.');const reteach=add(feedback,'button','Review the teaching','secondary');reteach.onclick=()=>{work.stage=0;work.index=0;redraw();};}}
  if(saved)showFeedback(saved);
  const submit=add(main,'button',saved?'Answer saved':'Submit answer');submit.disabled=Boolean(saved);
  const next=add(main,'button','Next','secondary');next.disabled=!saved;
  const speakFeedback=add(main,'button','Read feedback','secondary');speakFeedback.disabled=!saved;speakFeedback.onclick=()=>{if(work.answers[answerKey])speak(feedback.innerText);};
  submit.onclick=()=>{const selected=field.querySelector('input:checked');if(!selected){alert('Choose an answer first.');return;}if(work.answers[answerKey])return;const record={selected:Number(selected.value),correct:Number(selected.value)===q.answer,at:new Date().toISOString()};work.answers[answerKey]=record;save();showFeedback(record);field.querySelectorAll('input').forEach(x=>x.disabled=true);submit.disabled=true;next.disabled=false;speakFeedback.disabled=false;};
  next.onclick=()=>{work.index++;redraw();};
  const pause=add(main,'button','Save and pause','secondary');pause.onclick=()=>{save();stopAudio();location.hash='subject/'+lesson.subject;};
  readingText=(stageKey==='assessment'||stageKey==='guided'?lesson.passage+'. ':'')+q.prompt+'. '+optionOrder.map((i,position)=>String.fromCharCode(65+position)+'. '+q.options[i]).join('. ');
  document.getElementById('read').textContent='Read question and choices';
};

